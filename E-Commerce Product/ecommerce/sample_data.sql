-- Sample Data with JSONB Dynamic Attributes

-- Insert Users
INSERT INTO users (email, password_hash, full_name, phone) VALUES
('john@example.com', '$2b$12$hash1', 'John Doe', '+1234567890'),
('jane@example.com', '$2b$12$hash2', 'Jane Smith', '+1234567891');

-- Insert Addresses
INSERT INTO addresses (user_id, address_type, street, city, state, postal_code, country, is_default) VALUES
(1, 'shipping', '123 Main St', 'New York', 'NY', '10001', 'USA', TRUE),
(1, 'billing', '123 Main St', 'New York', 'NY', '10001', 'USA', TRUE),
(2, 'shipping', '456 Oak Ave', 'Los Angeles', 'CA', '90001', 'USA', TRUE);

-- Insert Categories
INSERT INTO categories (name, parent_id, description) VALUES
('Electronics', NULL, 'Electronic devices'),
('Laptops', 1, 'Portable computers'),
('Smartphones', 1, 'Mobile phones'),
('Clothing', NULL, 'Apparel and accessories');

-- Insert Products with JSONB Attributes
INSERT INTO products (category_id, name, description, base_price, sku, attributes) VALUES
(2, 'Dell XPS 15', 'High-performance laptop', 1499.99, 'LAPTOP-001', 
 '{"brand": "Dell", "processor": "Intel i7", "ram": "16GB", "storage": "512GB SSD", "screen_size": "15.6 inch", "color": "Silver"}'),
(2, 'MacBook Pro', 'Apple laptop', 2399.99, 'LAPTOP-002',
 '{"brand": "Apple", "processor": "M2", "ram": "16GB", "storage": "1TB SSD", "screen_size": "14 inch", "color": "Space Gray"}'),
(3, 'iPhone 14 Pro', 'Latest iPhone', 999.99, 'PHONE-001',
 '{"brand": "Apple", "storage": "256GB", "color": "Deep Purple", "camera": "48MP", "5g": true}'),
(4, 'Cotton T-Shirt', 'Comfortable cotton tee', 29.99, 'SHIRT-001',
 '{"material": "100% Cotton", "sizes": ["S", "M", "L", "XL"], "colors": ["Black", "White", "Blue"], "care": "Machine wash"}');

-- Insert Inventory
INSERT INTO inventory (product_id, quantity, reserved_quantity, warehouse_location, last_restocked) VALUES
(1, 50, 5, 'Warehouse A', CURRENT_TIMESTAMP),
(2, 30, 2, 'Warehouse A', CURRENT_TIMESTAMP),
(3, 100, 10, 'Warehouse B', CURRENT_TIMESTAMP),
(4, 200, 15, 'Warehouse C', CURRENT_TIMESTAMP);

-- Insert Orders
INSERT INTO orders (user_id, order_number, status, total_amount, shipping_address_id, billing_address_id) VALUES
(1, 'ORD-2024-001', 'delivered', 1529.98, 1, 2),
(2, 'ORD-2024-002', 'processing', 999.99, 3, 3);

-- Insert Order Items
INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal, product_snapshot) VALUES
(1, 1, 1, 1499.99, 1499.99, '{"name": "Dell XPS 15", "sku": "LAPTOP-001", "attributes": {"brand": "Dell", "processor": "Intel i7"}}'),
(1, 4, 1, 29.99, 29.99, '{"name": "Cotton T-Shirt", "sku": "SHIRT-001", "attributes": {"material": "100% Cotton", "color": "Black", "size": "L"}}'),
(2, 3, 1, 999.99, 999.99, '{"name": "iPhone 14 Pro", "sku": "PHONE-001", "attributes": {"brand": "Apple", "storage": "256GB"}}');

-- Insert Payments
INSERT INTO payments (order_id, payment_method, amount, status, transaction_id, payment_details) VALUES
(1, 'credit_card', 1529.98, 'completed', 'TXN-001', '{"card_last4": "4242", "card_brand": "Visa"}'),
(2, 'paypal', 999.99, 'completed', 'TXN-002', '{"paypal_email": "jane@example.com"}');
