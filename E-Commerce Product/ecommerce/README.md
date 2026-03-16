# E-Commerce Database Schema

PostgreSQL database schema for an e-commerce platform with dynamic product attributes using JSONB.

## Features

- **Dynamic Product Attributes**: JSONB for flexible product specifications
- **Relational Integrity**: Foreign keys and constraints ensure data consistency
- **Inventory Management**: Track available and reserved stock
- **Order Processing**: Complete order lifecycle with payment tracking
- **Performance**: GIN indexes on JSONB for fast queries

## Schema Overview

### Core Tables

- **users**: Customer accounts
- **addresses**: Shipping and billing addresses
- **categories**: Hierarchical product categories
- **products**: Products with JSONB attributes for dynamic specifications
- **inventory**: Stock management with reserved quantities
- **orders**: Order records with status tracking
- **order_items**: Line items with product snapshots
- **payments**: Payment transactions with flexible details

## Setup

```bash
# Create database
createdb ecommerce_db

# Run schema
psql -d ecommerce_db -f schema.sql

# Load sample data
psql -d ecommerce_db -f sample_data.sql
```

## JSONB Usage

Products use JSONB for dynamic attributes:

```sql
-- Laptops have: processor, ram, storage
-- Phones have: camera, 5g, storage
-- Clothing has: material, sizes, colors
```

Query by attributes:
```sql
SELECT * FROM products WHERE attributes @> '{"brand": "Apple"}';
```

## Key Constraints

- Inventory: `reserved_quantity <= quantity`
- Prices: `>= 0`
- Order status: Enum validation
- Cascading deletes for dependent records
