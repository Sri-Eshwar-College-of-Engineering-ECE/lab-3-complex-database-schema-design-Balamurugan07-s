-- Query Examples for E-Commerce System

-- 1. Search Products by JSONB Attributes (e.g., find laptops with 16GB RAM)
SELECT product_id, name, base_price, attributes
FROM products
WHERE attributes @> '{"ram": "16GB"}';

-- 2. Get Products by Brand using JSONB
SELECT product_id, name, base_price, attributes->>'brand' AS brand
FROM products
WHERE attributes->>'brand' = 'Apple';

-- 3. Check Available Inventory (quantity - reserved_quantity)
SELECT p.product_id, p.name, p.sku, 
       i.quantity, i.reserved_quantity,
       (i.quantity - i.reserved_quantity) AS available_quantity
FROM products p
JOIN inventory i ON p.product_id = i.product_id
WHERE (i.quantity - i.reserved_quantity) > 0;

-- 4. Get Order Details with Items and Payment
SELECT o.order_number, o.status, o.total_amount,
       u.full_name, u.email,
       oi.quantity, oi.unit_price, p.name AS product_name,
       pay.payment_method, pay.status AS payment_status
FROM orders o
JOIN users u ON o.user_id = u.user_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
LEFT JOIN payments pay ON o.order_id = pay.order_id
WHERE o.order_id = 1;

-- 5. Update Inventory After Order (Reserve Stock)
UPDATE inventory
SET reserved_quantity = reserved_quantity + 1
WHERE product_id = 1 AND (quantity - reserved_quantity) >= 1;

-- 6. Get User Order History
SELECT o.order_number, o.status, o.total_amount, o.created_at,
       COUNT(oi.order_item_id) AS item_count
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.user_id = 1
GROUP BY o.order_id
ORDER BY o.created_at DESC;

-- 7. Products Low in Stock (available < 10)
SELECT p.name, p.sku, 
       (i.quantity - i.reserved_quantity) AS available
FROM products p
JOIN inventory i ON p.product_id = i.product_id
WHERE (i.quantity - i.reserved_quantity) < 10;

-- 8. Revenue by Product
SELECT p.product_id, p.name, 
       SUM(oi.subtotal) AS total_revenue,
       SUM(oi.quantity) AS units_sold
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.status != 'cancelled'
GROUP BY p.product_id
ORDER BY total_revenue DESC;

-- 9. Search Products with Multiple JSONB Conditions
SELECT name, base_price, attributes
FROM products
WHERE attributes @> '{"brand": "Apple"}'
  AND (attributes->>'storage')::TEXT LIKE '%256GB%';

-- 10. Update Product Attributes (Add/Modify JSONB field)
UPDATE products
SET attributes = attributes || '{"warranty": "2 years"}'
WHERE product_id = 1;
