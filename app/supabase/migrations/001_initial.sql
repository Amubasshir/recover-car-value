-- OAuth tokens for CRM connections
CREATE TABLE oauth_tokens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    provider TEXT NOT NULL CHECK (provider IN ('clio', 'litify', 'filevine')),
    org_id TEXT NOT NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    scopes TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(provider, org_id)
);

-- Report runs for analytics and idempotency
CREATE TABLE report_runs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    idempotency_key TEXT UNIQUE NOT NULL,
    source_system TEXT NOT NULL,
    source_record_id TEXT NOT NULL,
    report_type TEXT NOT NULL CHECK (report_type IN ('DV', 'TOTAL_LOSS')),
    status TEXT NOT NULL CHECK (status IN ('started', 'completed', 'failed')),
    pre_accident_fmv DECIMAL(10,2),
    post_accident_fmv DECIMAL(10,2),
    diminished_value DECIMAL(10,2),
    dv_percent DECIMAL(5,2),
    comps_used INTEGER,
    r2 DECIMAL(4,3),
    pdf_path TEXT,
    scatter_plot_path TEXT,
    comps_csv_path TEXT,
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    finished_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_report_runs_idempotency ON report_runs(idempotency_key);
CREATE INDEX idx_report_runs_source ON report_runs(source_system, source_record_id);
CREATE INDEX idx_report_runs_created ON report_runs(created_at);
CREATE INDEX idx_oauth_tokens_provider_org ON oauth_tokens(provider, org_id);