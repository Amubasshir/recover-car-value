import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { NormalizedPayload, ValuationResult } from '@/lib/connectors/types'

// Mock functions - replace with your actual business logic
async function runValuation(payload: NormalizedPayload) {
  // This is where your existing valuation logic goes
  // For now, we'll return mock data
  return {
    summary: {
      preAccidentFMV: 25000,
      postAccidentFMV: 21000,
      diminishedValue: 4000,
      dvPercent: 16,
      compsUsed: 12,
      method: 'Market Comparison',
      r2: 0.89,
      confidence: 'high' as const
    },
    artifacts: {
      scatterPlotPngBase64: 'mock_base64_string',
      compsCsv: 'mock_csv_data'
    },
    warnings: [] as string[]
  }
}

async function generatePdfReport(data: any) {
  // This is where your existing PDF generation logic goes
  // For now, we'll return a mock PDF
  const mockPdfBase64 = 'mock_pdf_base64_content_here'
  return {
    base64: mockPdfBase64,
    size: mockPdfBase64.length,
    filename: `DV_Report_${data.client.lastName}_${Date.now()}.pdf`
  }
}

function validatePayload(payload: any): { isValid: boolean; missingFields: string[]; invalidFields: string[] } {
  const missingFields: string[] = []
  const invalidFields: string[] = []

  // Required fields validation
  if (!payload.reportType) missingFields.push('reportType')
  if (!payload.sourceSystem) missingFields.push('sourceSystem')
  if (!payload.sourceRecordId) missingFields.push('sourceRecordId')

  // Client validation
  if (!payload.client?.firstName) missingFields.push('client.firstName')
  if (!payload.client?.lastName) missingFields.push('client.lastName')

  // Vehicle validation
  if (!payload.vehicle?.year) missingFields.push('vehicle.year')
  if (!payload.vehicle?.make) missingFields.push('vehicle.make')
  if (!payload.vehicle?.model) missingFields.push('vehicle.model')
  if (!payload.vehicle?.mileage) missingFields.push('vehicle.mileage')
  if (!payload.vehicle?.zip) missingFields.push('vehicle.zip')
  if (!payload.vehicle?.state) missingFields.push('vehicle.state')

  // Claim validation
  if (!payload.claim?.claimNumber) missingFields.push('claim.claimNumber')
  if (!payload.claim?.dateOfLoss) missingFields.push('claim.dateOfLoss')

  // Data type validation
  if (payload.vehicle?.year && (payload.vehicle.year < 1990 || payload.vehicle.year > new Date().getFullYear() + 1)) {
    invalidFields.push('vehicle.year')
  }

  return {
    isValid: missingFields.length === 0 && invalidFields.length === 0,
    missingFields,
    invalidFields
  }
}

function generateIdempotencyKey(sourceSystem: string, sourceRecordId: string, reportType: string): string {
  const crypto = require('crypto')
  const rawKey = `${sourceSystem}|${sourceRecordId}|${reportType}`
  return crypto.createHash('sha256').update(rawKey).digest('hex')
}

async function checkIdempotency(idempotencyKey: string) {
  const { data, error } = await supabase
    .from('report_runs')
    .select('*')
    .eq('idempotency_key', idempotencyKey)
    .eq('status', 'completed')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error || !data) return null

  // Return within last 24 hours to be considered valid cache
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
  if (new Date(data.created_at) < twentyFourHoursAgo) return null

  return data
}

async function logRun(params: {
  idempotencyKey: string
  sourceSystem: string
  sourceRecordId: string
  reportType: string
  status: 'started' | 'completed' | 'failed'
  summary?: any
  storagePaths?: any
  duration?: number
  errorMessage?: string
}) {
  const { data, error } = await supabase
    .from('report_runs')
    .insert({
      idempotency_key: params.idempotencyKey,
      source_system: params.sourceSystem,
      source_record_id: params.sourceRecordId,
      report_type: params.reportType,
      status: params.status,
      pre_accident_fmv: params.summary?.preAccidentFMV,
      post_accident_fmv: params.summary?.postAccidentFMV,
      diminished_value: params.summary?.diminishedValue,
      dv_percent: params.summary?.dvPercent,
      comps_used: params.summary?.compsUsed,
      r2: params.summary?.r2,
      pdf_path: params.storagePaths?.pdf,
      scatter_plot_path: params.storagePaths?.scatterPlot,
      comps_csv_path: params.storagePaths?.compsCsv,
      error_message: params.errorMessage,
      finished_at: params.status !== 'started' ? new Date().toISOString() : null
    })
    .select()
    .single()

  if (error) {
    console.error('Failed to log run:', error)
  }

  return data
}

export async function POST(request: NextRequest) {
  try {
    const startTime = Date.now()
    const payload: NormalizedPayload = await request.json()

    // 1. Validate payload
    const validation = validatePayload(payload)
    if (!validation.isValid) {
      await logRun({
        idempotencyKey: 'validation_failed',
        sourceSystem: payload.sourceSystem,
        sourceRecordId: payload.sourceRecordId,
        reportType: payload.reportType,
        status: 'failed',
        errorMessage: `Validation failed: Missing ${validation.missingFields.join(', ')}`
      })

      return NextResponse.json(
        {
          status: 'error',
          error: 'VALIDATION_FAILED',
          missingFields: validation.missingFields,
          invalidFields: validation.invalidFields
        },
        { status: 400 }
      )
    }

    // 2. Check idempotency
    const idempotencyKey = generateIdempotencyKey(
      payload.sourceSystem,
      payload.sourceRecordId,
      payload.reportType
    )

    // Log start of run
    await logRun({
      idempotencyKey,
      sourceSystem: payload.sourceSystem,
      sourceRecordId: payload.sourceRecordId,
      reportType: payload.reportType,
      status: 'started'
    })

    const existingRun = await checkIdempotency(idempotencyKey)
    if (existingRun && !payload.options?.rerun) {
      return NextResponse.json({
        status: 'success',
        summary: {
          preAccidentFMV: existingRun.pre_accident_fmv,
          postAccidentFMV: existingRun.post_accident_fmv,
          diminishedValue: existingRun.diminished_value,
          dvPercent: existingRun.dv_percent,
          compsUsed: existingRun.comps_used,
          method: 'Market Comparison',
          r2: existingRun.r2,
          confidence: 'high'
        },
        pdf: {
          filename: `Cached_Report_${payload.sourceRecordId}.pdf`,
          base64: 'cached_content',
          size: 0
        },
        cached: true
      })
    }

    // 3. Run valuation
    const valuationResult = await runValuation(payload)

    // 4. Generate PDF
    const pdfResult = await generatePdfReport({
      summary: valuationResult.summary,
      client: payload.client,
      vehicle: payload.vehicle,
      claim: payload.claim
    })

    // 5. Store artifacts (in real implementation, upload to cloud storage)
    const storagePaths = {
      pdf: `reports/${idempotencyKey}.pdf`,
      scatterPlot: `artifacts/${idempotencyKey}_scatter.png`,
      compsCsv: `artifacts/${idempotencyKey}_comps.csv`
    }

    // 6. Log successful completion
    await logRun({
      idempotencyKey,
      sourceSystem: payload.sourceSystem,
      sourceRecordId: payload.sourceRecordId,
      reportType: payload.reportType,
      status: 'completed',
      summary: valuationResult.summary,
      storagePaths,
      duration: Date.now() - startTime
    })

    // 7. Return response
    const response: ValuationResult = {
      status: 'success',
      summary: valuationResult.summary,
      pdf: pdfResult,
      artifacts: valuationResult.artifacts,
      warnings: valuationResult.warnings
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Valuation API Error:', error)

    // Log failed run
    const payload = await request.json().catch(() => ({}))
    await logRun({
      idempotencyKey: 'error_' + Date.now(),
      sourceSystem: payload.sourceSystem || 'unknown',
      sourceRecordId: payload.sourceRecordId || 'unknown',
      reportType: payload.reportType || 'DV',
      status: 'failed',
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json(
      {
        status: 'error',
        error: 'PROCESSING_FAILED',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Add OPTIONS handler for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}