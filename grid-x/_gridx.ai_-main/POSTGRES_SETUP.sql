-- GridX Database Initialization Script
-- Run this in your Vercel Postgres SQL Editor to create all necessary tables

-- Drop tables if they exist (optional, use with caution)
-- DROP TABLE IF EXISTS energy_meters;
-- DROP TABLE IF EXISTS grid_metrics;
-- DROP TABLE IF EXISTS grid_emergency_log;
-- DROP TABLE IF EXISTS grid_nodes;
-- DROP TABLE IF EXISTS carbon_transactions;
-- DROP TABLE IF EXISTS carbon_wallet;
-- DROP TABLE IF EXISTS energy_trades;
-- DROP TABLE IF EXISTS energy_production;
-- DROP TABLE IF EXISTS houses;
-- DROP TABLE IF EXISTS users;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'buyer',
    wallet_address VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Houses Table
CREATE TABLE IF NOT EXISTS houses (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    capacity NUMERIC(10, 2),
    latitude NUMERIC(10, 6),
    longitude NUMERIC(10, 6),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Energy Production Table
CREATE TABLE IF NOT EXISTS energy_production (
    id UUID PRIMARY KEY,
    house_id UUID NOT NULL REFERENCES houses(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    production NUMERIC(10, 2),
    temperature NUMERIC(5, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Energy Trades Table
CREATE TABLE IF NOT EXISTS energy_trades (
    id UUID PRIMARY KEY,
    seller_id UUID NOT NULL REFERENCES users(id),
    buyer_id UUID NOT NULL REFERENCES users(id),
    energy_kwh NUMERIC(10, 2) NOT NULL,
    price_per_kwh NUMERIC(10, 4) NOT NULL,
    tx_hash VARCHAR(255),
    carbon_saved NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Carbon Wallet Table
CREATE TABLE IF NOT EXISTS carbon_wallet (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    balance NUMERIC(15, 2) DEFAULT 0,
    total_earned NUMERIC(15, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Carbon Transactions Table
CREATE TABLE IF NOT EXISTS carbon_transactions (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(15, 2) NOT NULL,
    tx_type VARCHAR(50),
    related_trade_id UUID REFERENCES energy_trades(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Grid Metrics Table
CREATE TABLE IF NOT EXISTS grid_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supply NUMERIC(10, 2) NOT NULL,
    demand NUMERIC(10, 2) NOT NULL,
    imbalance NUMERIC(10, 2) NOT NULL,
    grid_status VARCHAR(50) NOT NULL,
    price NUMERIC(10, 4) NOT NULL,
    health_score NUMERIC(5, 2) DEFAULT 100,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Energy Meters Table
CREATE TABLE IF NOT EXISTS energy_meters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    energy_imported NUMERIC(10, 4) DEFAULT 0,
    energy_exported NUMERIC(10, 4) DEFAULT 0,
    net_energy NUMERIC(10, 4) DEFAULT 0,
    user_role VARCHAR(20) DEFAULT 'Prosumer',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_latest UNIQUE (user_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_energy_meters_user_id ON energy_meters(user_id);
CREATE INDEX IF NOT EXISTS idx_energy_meters_timestamp ON energy_meters(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_grid_metrics_timestamp ON grid_metrics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_energy_trades_seller ON energy_trades(seller_id);
CREATE INDEX IF NOT EXISTS idx_energy_trades_buyer ON energy_trades(buyer_id);

-- Insert Demo Data (Optional)
-- INSERT INTO users (id, name, email, password_hash, role) VALUES 
-- ('1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p', 'Arjun Solar Farm', 'arjun@solargrid.in', '$2a$10$W6X0t5v5E... (hashed password)', 'seller'),
-- ('2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p', 'Rohan Energy Consumer', 'rohan@consumer.in', '$2a$10$W6X0t5v5E... (hashed password)', 'buyer');
