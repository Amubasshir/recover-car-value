import { BaseConnector } from '../base-connector'
import { AuthContext, ConnectorContext, NormalizedPayload, ValuationResult } from '../types'

export class ClioConnector extends BaseConnector {
  provider = 'clio'
  private baseUrl = 'https://app.clio.com'

  async authenticate(config: any): Promise<AuthContext> {
    if (config.code) {
      // OAuth flow
      return this.handleOAuthCallback(config.code)
    } else if (config.accessToken) {
      // Already authenticated
      return {
        accessToken: config.accessToken,
        baseUrl: this.baseUrl
      }
    } else {
      throw new Error('No authentication method provided')
    }
  }

  private async handleOAuthCallback(code: string): Promise<AuthContext> {
    const response = await fetch(`${this.baseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.CLIO_CLIENT_ID!,
        client_secret: process.env.CLIO_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: `${process.env.APP_URL}/api/integrations/clio/callback`
      })
    })

    if (!response.ok) {
      throw new Error(`OAuth token request failed: ${response.statusText}`)
    }

    const data = await response.json()
    
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: new Date(Date.now() + data.expires_in * 1000),
      baseUrl: this.baseUrl
    }
  }

  async fetchIntakeData(ctx: ConnectorContext): Promise<any> {
    const { auth, recordId } = ctx
    
    // Fetch matter with custom fields
    const response = await fetch(
      `${this.baseUrl}/api/v4/matters/${recordId}.json?fields=id,display_number,client,description,custom_field_values`,
      {
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch Clio matter: ${response.statusText}`)
    }

    return await response.json()
  }

  normalizeData(rawData: any, reportType: string): NormalizedPayload {
    const customFields = this.extractCustomFields(rawData.data.custom_field_values)
    
    return {
      reportType: reportType as any,
      sourceSystem: 'clio',
      sourceRecordId: rawData.data.id,
      client: {
        firstName: customFields.rcv_client_first_name || '',
        lastName: customFields.rcv_client_last_name || '',
        email: customFields.rcv_client_email || '',
        phone: customFields.rcv_client_phone || ''
      },
      vehicle: {
        year: parseInt(customFields.rcv_vehicle_year) || 0,
        make: customFields.rcv_vehicle_make || '',
        model: customFields.rcv_vehicle_model || '',
        trim: customFields.rcv_vehicle_trim || '',
        mileage: parseInt(customFields.rcv_vehicle_mileage) || 0,
        vin: customFields.rcv_vehicle_vin,
        zip: customFields.rcv_vehicle_zip || '',
        state: customFields.rcv_vehicle_state || ''
      },
      claim: {
        carrier: customFields.rcv_claim_carrier || '',
        claimNumber: customFields.rcv_claim_number || '',
        adjusterName: customFields.rcv_adjuster_name || '',
        adjusterEmail: customFields.rcv_adjuster_email || '',
        dateOfLoss: customFields.rcv_date_of_loss || ''
      }
    }
  }

  async writeBackResults(ctx: ConnectorContext, result: ValuationResult): Promise<void> {
    const { auth, recordId } = ctx

    // 1. Upload PDF as document
    await this.uploadDocument(auth, recordId, result)
    
    // 2. Add summary as activity note
    await this.addActivityNote(auth, recordId, result)
  }

  private async uploadDocument(auth: AuthContext, matterId: string, result: ValuationResult) {
    const documentResponse = await fetch(`${this.baseUrl}/api/v4/documents.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        document: {
          name: result.pdf.filename,
          matter_id: matterId,
          content: result.pdf.base64
        }
      })
    })

    if (!documentResponse.ok) {
      throw new Error(`Failed to upload document to Clio: ${documentResponse.statusText}`)
    }
  }

  private async addActivityNote(auth: AuthContext, matterId: string, result: ValuationResult) {
    const noteResponse = await fetch(`${this.baseUrl}/api/v4/activities.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        activity: {
          type: 'Note',
          matter_id: matterId,
          description: this.formatSummaryNote(result.summary)
        }
      })
    })

    if (!noteResponse.ok) {
      console.warn('Failed to add activity note, but continuing:', noteResponse.statusText)
    }
  }

  private extractCustomFields(fieldValues: any[]): Record<string, string> {
    const fields: Record<string, string> = {}
    
    if (!fieldValues) return fields

    fieldValues.forEach(field => {
      if (field.name && field.value) {
        // Convert field name to consistent format
        const fieldName = field.name.toLowerCase().replace(/\s+/g, '_')
        fields[fieldName] = field.value
      }
    })

    return fields
  }

  private formatSummaryNote(summary: any): string {
    return `🚗 Diminished Value Report Generated

📊 Valuation Summary:
• Pre-Accident FMV: $${summary.preAccidentFMV?.toLocaleString() || 'N/A'}
• Post-Accident FMV: $${summary.postAccidentFMV?.toLocaleString() || 'N/A'}
• Diminished Value: $${summary.diminishedValue?.toLocaleString() || 'N/A'}
• DV Percentage: ${summary.dvPercent || 'N/A'}%
• Comparable Vehicles Used: ${summary.compsUsed || 'N/A'}
• Confidence Level: ${summary.confidence || 'N/A'}

Generated by MarketVerify on ${new Date().toLocaleDateString()}`
  }
}