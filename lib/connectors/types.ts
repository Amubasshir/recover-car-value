export type ReportType = 'DV' | 'TOTAL_LOSS'
export type SourceSystem = 'clio' | 'litify' | 'filevine'

export interface NormalizedPayload {
  reportType: ReportType
  sourceSystem: SourceSystem
  sourceRecordId: string
  client: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  vehicle: {
    year: number
    make: string
    model: string
    trim: string
    mileage: number
    vin?: string
    zip: string
    state: string
  }
  claim: {
    carrier: string
    claimNumber: string
    adjusterName: string
    adjusterEmail: string
    dateOfLoss: string // YYYY-MM-DD
  }
  options?: {
    rerun?: boolean
    marketRadiusMiles?: number
  }
}

export interface ValuationSummary {
  preAccidentFMV: number
  postAccidentFMV: number
  diminishedValue: number
  dvPercent: number
  compsUsed: number
  method: string
  r2: number
  confidence: 'high' | 'medium' | 'low'
}

export interface ValuationResult {
  status: 'success' | 'partial' | 'error'
  summary: ValuationSummary
  pdf: {
    filename: string
    base64: string
    size: number
  }
  artifacts?: {
    scatterPlotPngBase64?: string
    compsCsv?: string
    rawData?: any
  }
  warnings?: string[]
  missingFields?: string[]
}

export interface AuthContext {
  accessToken: string
  refreshToken?: string
  expiresAt?: Date
  baseUrl?: string
}

export interface ConnectorContext {
  auth: AuthContext
  recordId: string
  reportType: ReportType
  tenantId: string
}

export interface ValidationResult {
  isValid: boolean
  missingFields: string[]
  invalidFields: string[]
  warnings: string[]
}