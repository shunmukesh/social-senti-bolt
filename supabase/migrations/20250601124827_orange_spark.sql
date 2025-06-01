-- Create detected_accounts table
CREATE TABLE detected_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT NOT NULL,
  platform TEXT NOT NULL,
  profile_url TEXT,
  profile_image TEXT,
  creation_date TIMESTAMP WITH TIME ZONE,
  follower_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  bio TEXT,
  location TEXT,
  detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  detected_by TEXT NOT NULL,
  confidence_score FLOAT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New',
  verified_by TEXT,
  verified_at TIMESTAMP WITH TIME ZONE,
  suspicious_activity_count INTEGER DEFAULT 0,
  detection_reasons JSONB,
  evidence JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES detected_accounts(id),
  account_name TEXT NOT NULL,
  platform TEXT NOT NULL,
  reported_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  reported_by TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  evidence JSONB,
  platform_response TEXT,
  resolution_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create network_connections table
CREATE TABLE network_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES detected_accounts(id),
  connected_account_id UUID REFERENCES detected_accounts(id),
  connection_type TEXT NOT NULL,
  suspicious_score FLOAT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(account_id, connected_account_id)
);

-- Create suspicious_activity table
CREATE TABLE suspicious_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES detected_accounts(id),
  activity_type TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE detected_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE network_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE suspicious_activity ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow read access for authenticated users"
  ON detected_accounts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access for authenticated users"
  ON reports FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access for authenticated users"
  ON network_connections FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access for authenticated users"
  ON suspicious_activity FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for service role
CREATE POLICY "Allow full access for service role"
  ON detected_accounts FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow full access for service role"
  ON reports FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow full access for service role"
  ON network_connections FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow full access for service role"
  ON suspicious_activity FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_detected_accounts_updated_at
  BEFORE UPDATE ON detected_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_network_connections_updated_at
  BEFORE UPDATE ON network_connections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suspicious_activity_updated_at
  BEFORE UPDATE ON suspicious_activity
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();