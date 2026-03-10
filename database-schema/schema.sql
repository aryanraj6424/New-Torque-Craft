-- Torque Craft Database Schema
-- Database: PostgreSQL

-- TODO: Enable PostGIS for dealer location searching if needed
-- TODO: Configure indexing for ElasticSearch on 'products' table

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user', -- 'user', 'admin', 'dealer'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    category VARCHAR(100),
    stock_quantity INTEGER DEFAULT 0,
    specs JSONB, -- Store technical specifications
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles Table (Fitment Data)
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    make VARCHAR(100),
    model VARCHAR(100),
    year_start INTEGER,
    year_end INTEGER,
    engine_type VARCHAR(100)
);

-- Product Fitment Mapping
CREATE TABLE product_fitment (
    product_id INTEGER REFERENCES products(id),
    vehicle_id INTEGER REFERENCES vehicles(id),
    PRIMARY KEY (product_id, vehicle_id)
);

-- Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'shipped', 'delivered'
    payment_intent_id VARCHAR(255), -- Stripe/PayPal reference
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- QR Codes Table (Pre-generated for production)
CREATE TABLE qr_codes (
    id SERIAL PRIMARY KEY,
    serial VARCHAR(100) UNIQUE NOT NULL,
    product_id INTEGER REFERENCES products(id),
    batch_number VARCHAR(100),
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Warranty Table
CREATE TABLE warranties (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    qr_code_id INTEGER REFERENCES qr_codes(id),
    activated_at TIMESTAMP NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INDEXING
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_qr_serial ON qr_codes(serial);
CREATE INDEX idx_warranty_user ON warranties(user_id);
