-- Diminished value calculation results (used by /api/diminished-value and dashboard)
CREATE TABLE IF NOT EXISTS diminished_car_value (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Vehicle
    year INTEGER NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    trim TEXT DEFAULT '',

    -- Accident
    accident_mileage INTEGER,
    accident_date TEXT,
    accident_zip TEXT,
    repair_cost NUMERIC(12,2) DEFAULT 0,

    -- Valuation
    average_clean_price_top5 INTEGER NOT NULL,
    average_damaged_price_bottom5 INTEGER NOT NULL,
    estimated_diminished_value INTEGER NOT NULL,
    diminished_value_percentage TEXT NOT NULL,

    -- Quality
    quality_score INTEGER,
    is_within_dv_range BOOLEAN,
    pre_accident_r_squared TEXT,
    post_accident_r_squared TEXT,
    pre_accident_slope TEXT,
    post_accident_slope TEXT,
    pre_accident_comps INTEGER,
    post_accident_comps INTEGER,

    -- Search
    clean_radius_used_miles INTEGER DEFAULT 0,
    damaged_radius_used_miles INTEGER DEFAULT 0,
    mileage_range_searched TEXT,
    post_plot_generated BOOLEAN DEFAULT true,

    -- UI
    heading TEXT,
    dealer_name TEXT DEFAULT '',

    -- JSONB for comps and context
    top_clean_listings JSONB DEFAULT '[]',
    bottom_damaged_listings JSONB DEFAULT '[]',
    client_info JSONB,
    qualify_answers JSONB,
    selected_method TEXT DEFAULT 'standard',
    qa_report TEXT
);

CREATE INDEX IF NOT EXISTS idx_diminished_car_value_created_at ON diminished_car_value(created_at DESC);

-- Allow anon/authenticated to insert and select (adjust RLS as needed for your project)
ALTER TABLE diminished_car_value ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow insert for diminished_car_value" ON diminished_car_value;
CREATE POLICY "Allow insert for diminished_car_value" ON diminished_car_value
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow select for diminished_car_value" ON diminished_car_value;
CREATE POLICY "Allow select for diminished_car_value" ON diminished_car_value
    FOR SELECT USING (true);
