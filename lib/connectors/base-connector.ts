import { 
  Connector, 
  AuthContext, 
  ConnectorContext, 
  NormalizedPayload, 
  ValuationResult,
  ValidationResult 
} from './types'

export abstract class BaseConnector implements Connector {
  abstract provider: string
  
  abstract authenticate(config: any): Promise<AuthContext>
  abstract fetchIntakeData(ctx: ConnectorContext): Promise<any>
  abstract normalizeData(rawData: any, reportType: string): NormalizedPayload
  abstract writeBackResults(ctx: ConnectorContext, result: ValuationResult): Promise<void>

  async refreshAuth(auth: AuthContext): Promise<AuthContext> {
    // Default implementation - override in child classes if needed
    return auth
  }

  async generateReport(payload: NormalizedPayload): Promise<ValuationResult> {
    const apiUrl = process.env.MARKETVERIFY_API_URL || `${process.env.APP_URL}/api/reports/generate`
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  validateReadiness(payload: NormalizedPayload): ValidationResult {
    const missingFields: string[] = []
    const invalidFields: string[] = []
    const warnings: string[] = []

    // Required fields
    if (!payload.client.firstName) missingFields.push('Client First Name')
    if (!payload.client.lastName) missingFields.push('Client Last Name')
    if (!payload.vehicle.year) missingFields.push('Vehicle Year')
    if (!payload.vehicle.make) missingFields.push('Vehicle Make')
    if (!payload.vehicle.model) missingFields.push('Vehicle Model')
    if (!payload.vehicle.mileage) missingFields.push('Vehicle Mileage')
    if (!payload.vehicle.zip) missingFields.push('Vehicle ZIP Code')
    if (!payload.vehicle.state) missingFields.push('Vehicle State')
    if (!payload.claim.claimNumber) missingFields.push('Claim Number')
    if (!payload.claim.dateOfLoss) missingFields.push('Date of Loss')

    // Validation rules
    if (payload.vehicle.year && (payload.vehicle.year < 1990 || payload.vehicle.year > new Date().getFullYear() + 1)) {
      invalidFields.push('Vehicle Year')
    }

    if (payload.vehicle.mileage && payload.vehicle.mileage < 0) {
      invalidFields.push('Vehicle Mileage')
    }

    if (!payload.vehicle.vin) {
      warnings.push('VIN is missing - this may affect valuation accuracy')
    }

    return {
      isReady: missingFields.length === 0 && invalidFields.length === 0,
      missingFields,
      invalidFields,
      warnings
    }
  }

  protected async getOAuthTokens(orgId: string) {
    const { data, error } = await require('@/lib/supabase').supabase
      .from('oauth_tokens')
      .select('*')
      .eq('provider', this.provider)
      .eq('org_id', orgId)
      .single()

    if (error) throw new Error(`No OAuth tokens found for ${this.provider}: ${error.message}`)
    return data
  }

  protected async storeOAuthTokens(orgId: string, auth: AuthContext) {
    const { error } = await require('@/lib/supabase').supabase
      .from('oauth_tokens')
      .upsert({
        provider: this.provider,
        org_id: orgId,
        access_token: auth.accessToken,
        refresh_token: auth.refreshToken,
        expires_at: auth.expiresAt?.toISOString(),
        updated_at: new Date().toISOString()
      })

    if (error) throw new Error(`Failed to store OAuth tokens: ${error.message}`)
  }
}