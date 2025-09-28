-- Seed Sample Data for E-commerce SaaS Platform

-- Insert sample tenant
INSERT INTO tenants (id, name, subdomain, custom_domain, logo, primary_color, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'TechStore Pro', 'techstore', 'techstore.com', '/logos/techstore.png', '#2563EB', true);

-- Insert tenant settings
INSERT INTO tenant_settings (tenant_id, store_name, store_description, currency, tax_rate, shipping_rate, free_shipping_min) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'TechStore Pro', 'Your one-stop shop for the latest technology and gadgets', 'USD', 0.0875, 9.99, 75.00);

-- Insert sample store owner
INSERT INTO users (id, email, name, password, role, tenant_id, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'owner@techstore.com', 'John Smith', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STORE_OWNER', '550e8400-e29b-41d4-a716-446655440000', true);

-- Insert sample super admin
INSERT INTO users (id, email, name, password, role, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'admin@platform.com', 'Platform Admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'SUPER_ADMIN', true);

-- Insert sample categories
INSERT INTO categories (id, name, slug, description, image, tenant_id, is_active, sort_order) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'Electronics', 'electronics', 'Latest smartphones, laptops, and electronic gadgets', '/categories/electronics.jpg', '550e8400-e29b-41d4-a716-446655440000', true, 1),
('550e8400-e29b-41d4-a716-446655440011', 'Fashion', 'fashion', 'Trendy clothing, shoes, and accessories', '/categories/fashion.jpg', '550e8400-e29b-41d4-a716-446655440000', true, 2),
('550e8400-e29b-41d4-a716-446655440012', 'Home & Garden', 'home-garden', 'Home appliances, furniture, and garden tools', '/categories/home-garden.jpg', '550e8400-e29b-41d4-a716-446655440000', true, 3),
('550e8400-e29b-41d4-a716-446655440013', 'Sports & Fitness', 'sports-fitness', 'Sports equipment, fitness gear, and outdoor activities', '/categories/sports.jpg', '550e8400-e29b-41d4-a716-446655440000', true, 4),
('550e8400-e29b-41d4-a716-446655440014', 'Books & Media', 'books-media', 'Books, movies, music, and digital media', '/categories/books.jpg', '550e8400-e29b-41d4-a716-446655440000', true, 5),
('550e8400-e29b-41d4-a716-446655440015', 'Beauty & Health', 'beauty-health', 'Skincare, makeup, health supplements, and wellness products', '/categories/beauty.jpg', '550e8400-e29b-41d4-a716-446655440000', true, 6),
('550e8400-e29b-41d4-a716-446655440016', 'Automotive', 'automotive', 'Car accessories, parts, and automotive tools', '/categories/automotive.jpg', '550e8400-e29b-41d4-a716-446655440000', true, 7),
('550e8400-e29b-41d4-a716-446655440017', 'Toys & Games', 'toys-games', 'Toys for kids, board games, and gaming accessories', '/categories/toys.jpg', '550e8400-e29b-41d4-a716-446655440000', true, 8);

-- Insert subcategories for Electronics
INSERT INTO categories (id, name, slug, description, parent_id, tenant_id, is_active, sort_order) VALUES
('550e8400-e29b-41d4-a716-446655440020', 'Smartphones', 'smartphones', 'Latest smartphones and mobile devices', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', true, 1),
('550e8400-e29b-41d4-a716-446655440021', 'Laptops', 'laptops', 'Laptops and portable computers', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', true, 2),
('550e8400-e29b-41d4-a716-446655440022', 'Audio Equipment', 'audio-equipment', 'Headphones, speakers, and audio accessories', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', true, 3);

-- Insert sample products for Electronics category
INSERT INTO products (id, name, slug, description, short_description, sku, price, compare_price, cost, quantity, status, is_featured, tenant_id) VALUES
('550e8400-e29b-41d4-a716-446655440100', 'iPhone 15 Pro Max', 'iphone-15-pro-max', 'The most advanced iPhone ever with titanium design, A17 Pro chip, and Pro camera system. Features a 6.7-inch Super Retina XDR display, advanced camera system with 5x Telephoto zoom, and all-day battery life. Built with aerospace-grade titanium for incredible durability and a lighter feel.', 'The most advanced iPhone ever with titanium design and A17 Pro chip', 'APPLE-IP15PM-256-NT', 1199.00, 1299.00, 899.00, 145, 'ACTIVE', true, '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440101', 'Samsung Galaxy S24 Ultra', 'samsung-galaxy-s24-ultra', 'Ultimate productivity with built-in S Pen and AI-powered camera. Features a 6.8-inch Dynamic AMOLED 2X display, 200MP camera with Space Zoom, and Galaxy AI for enhanced productivity. The built-in S Pen transforms your phone into a powerful creative tool.', 'Ultimate productivity with built-in S Pen and AI-powered camera', 'SAMSUNG-GS24U-256-GRAY', 1199.00, 1299.00, 899.00, 89, 'ACTIVE', true, '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440102', 'MacBook Air M3 15"', 'macbook-air-m3-15', 'Supercharged by M3 chip with all-day battery life. Features a stunning 15.3-inch Liquid Retina display, up to 18 hours of battery life, and the power of Apple silicon. Perfect for work, creativity, and everything in between.', 'Supercharged by M3 chip with all-day battery life', 'APPLE-MBA15-M3-256-MIDNIGHT', 1299.00, 1399.00, 999.00, 234, 'ACTIVE', true, '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440103', 'Sony WH-1000XM5 Headphones', 'sony-wh-1000xm5-headphones', 'Industry-leading noise canceling with 30-hour battery life. Features two processors controlling 8 microphones for unprecedented noise canceling quality. Lightweight design with soft fit leather for all-day comfort.', 'Industry-leading noise canceling with 30-hour battery', 'SONY-WH1000XM5-BLACK', 349.00, 399.00, 249.00, 445, 'ACTIVE', true, '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440104', 'iPad Pro 12.9"', 'ipad-pro-12-9', 'The ultimate iPad experience with M2 chip and Liquid Retina XDR display. Features the powerful M2 chip, stunning 12.9-inch Liquid Retina XDR display, and all-day battery life. Perfect for creative professionals and power users.', 'Ultimate iPad experience with M2 chip and XDR display', 'APPLE-IPADPRO-129-256-GRAY', 799.00, 899.00, 599.00, 156, 'ACTIVE', false, '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440105', 'Dell XPS 13 Laptop', 'dell-xps-13-laptop', 'Premium ultrabook with InfinityEdge display and 12th Gen Intel processors. Features a stunning 13.4-inch InfinityEdge display, premium materials, and exceptional performance in an ultra-portable design.', 'Premium ultrabook with InfinityEdge display', 'DELL-XPS13P-I7-512-PLAT', 1199.00, 1399.00, 899.00, 156, 'ACTIVE', false, '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440106', 'Nintendo Switch OLED', 'nintendo-switch-oled', '7-inch OLED screen with enhanced audio and 64GB internal storage. Features a vibrant 7-inch OLED screen, enhanced audio, wide adjustable stand, and dock with wired LAN port for TV mode.', '7-inch OLED screen with enhanced audio', 'NINTENDO-SWITCH-OLED-NEON', 349.00, 379.00, 249.00, 234, 'ACTIVE', false, '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440107', 'AirPods Pro 2nd Gen', 'airpods-pro-2nd-gen', 'Adaptive Transparency and Personalized Spatial Audio with dynamic head tracking. Features the H2 chip for smarter noise cancellation, Adaptive Transparency, and Personalized Spatial Audio.', 'Adaptive Transparency and Personalized Spatial Audio', 'APPLE-AIRPODS-PRO2-WHITE', 249.00, 279.00, 179.00, 890, 'ACTIVE', false, '550e8400-e29b-41d4-a716-446655440000');

-- Insert sample products for Fashion category
INSERT INTO products (id, name, slug, description, short_description, sku, price, compare_price, cost, quantity, status, is_featured, tenant_id) VALUES
('550e8400-e29b-41d4-a716-446655440200', 'Nike Air Jordan 1 Retro High', 'nike-air-jordan-1-retro-high', 'The shoe that started it all, Michael Jordan''s first signature shoe. Features premium leather construction, classic colorways, and the iconic Jumpman logo. A timeless design that never goes out of style.', 'The shoe that started it all, Michael Jordan''s first signature', 'NIKE-AJ1-RETRO-BRED', 170.00, 190.00, 120.00, 567, 'ACTIVE', true, '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440201', 'Levi''s 501 Original Jeans', 'levis-501-original-jeans', 'The original straight fit jean since 1873. Made with premium denim and classic five-pocket styling. The 501 Original is the gold standard of jeans, with a straight fit through the seat and thigh.', 'The original straight fit jean since 1873', 'LEVIS-501-ORIG-INDIGO', 89.00, 109.00, 59.00, 1200, 'ACTIVE', false, '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440202', 'Adidas Ultraboost 22', 'adidas-ultraboost-22', 'Running shoe with BOOST midsole technology for incredible energy return. Features a Primeknit upper, Continental rubber outsole, and responsive BOOST cushioning for maximum comfort.', 'Running shoe with BOOST midsole technology', 'ADIDAS-UB22-WOMEN-WHITE', 190.00, 220.00, 130.00, 234, 'ACTIVE', false, '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440203', 'Ray-Ban Aviator Sunglasses', 'ray-ban-aviator-sunglasses', 'Classic aviator sunglasses with premium crystal lenses and gold-tone frames. The original pilot sunglasses that have been a style icon for decades. Features 100% UV protection.', 'Classic aviator sunglasses with premium crystal lenses', 'RAYBAN-AVIATOR-GOLD-GREEN', 154.00, 174.00, 104.00, 345, 'ACTIVE', false, '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440204', 'North Face Puffer Jacket', 'north-face-puffer-jacket', 'Insulated puffer jacket with 700-fill down insulation. Features a water-resistant finish, adjustable hood, and secure zip pockets. Perfect for cold weather adventures.', 'Insulated puffer jacket with 700-fill down insulation', 'TNF-PUFFER-700-BLACK', 299.00, 349.00, 199.00, 123, 'ACTIVE', false, '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440205', 'Converse Chuck Taylor All Star', 'converse-chuck-taylor-all-star', 'The iconic canvas sneaker that started it all. Features a timeless silhouette, durable canvas upper, and the classic rubber toe cap. A wardrobe essential for any style.', 'The iconic canvas sneaker that started it all', 'CONVERSE-CHUCK-CLASSIC-WHITE', 65.00, 75.00, 35.00, 789, 'ACTIVE', false, '550e8400-e29b-41d4-a716-446655440000');

-- Insert sample products for Home & Garden category
INSERT INTO products (id, name, slug, description, short_description, sku, price, compare_price, cost, quantity, status, is_featured, tenant_id) VALUES
('550e8400-e29b-41d4-a716-446655440300', 'KitchenAid Artisan Stand Mixer', 'kitchenaid-artisan-stand-mixer', 'Iconic stand mixer with 10-speed solid state control and 5-quart stainless steel bowl. Features a powerful motor, planetary mixing action, and over 15 optional attachments available. Perfect for baking and cooking enthusiasts.', 'Iconic stand mixer with 10-speed solid state control', 'KITCHENAID-ARTISAN-5QT-RED', 449.00, 529.00, 329.00, 123, 'ACTIVE', true, '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440301', 'Dyson V15 Detect Vacuum', 'dyson-v15-detect-vacuum', 'Cordless vacuum with laser reveal and LCD screen showing real-time particle count. Features powerful suction, up to 60 minutes of run time, and advanced filtration system.', 'Cordless vacuum with laser reveal and LCD screen', 'DYSON-V15-DETECT-GOLD', 649.00, 749.00, 449.00, 89, 'ACTIVE', false, '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440302', 'Ninja Foodi 8-Qt Air Fryer', 'ninja-foodi-8-qt-air-fryer', 'Pressure cooker that crisps with TenderCrisp technology. Features 8-quart capacity, 14 cooking functions, and ceramic-coated pot. Perfect for families and meal prep.', 'Pressure cooker that crisps with TenderCrisp technology', 'NINJA-FOODI-8QT-BLACK', 199.00, 249.00, 139.00, 167, 'ACTIVE', false, '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440303', 'Instant Pot Duo 7-in-1', 'instant-pot-duo-7-in-1', 'Multi-use pressure cooker with 7 appliances in 1. Functions as pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer. Perfect for quick and easy meals.', 'Multi-use pressure cooker with 7 appliances in 1', 'INSTANTPOT-DUO-6QT-BLACK', 79.00, 99.00, 49.00, 234, 'ACTIVE', false, '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440304', 'Philips Hue Smart Bulbs', 'philips-hue-smart-bulbs', 'Smart LED bulbs with 16 million colors and voice control compatibility. Features app control, scheduling, and integration with smart home systems. Set includes 4 bulbs and bridge.', 'Smart LED bulbs with 16 million colors', 'PHILIPS-HUE-4PACK-COLOR', 49.00, 69.00, 29.00, 345, 'ACTIVE', false, '550e8400-e29b-41d4-a716-446655440000');

-- Insert product images for sample products
INSERT INTO product_images (product_id, url, alt, sort_order) VALUES
-- iPhone 15 Pro Max images
('550e8400-e29b-41d4-a716-446655440100', '/placeholder.svg?height=600&width=600', 'iPhone 15 Pro Max front view', 0),
('550e8400-e29b-41d4-a716-446655440100', '/placeholder.svg?height=600&width=600', 'iPhone 15 Pro Max back view', 1),
('550e8400-e29b-41d4-a716-446655440100', '/placeholder.svg?height=600&width=600', 'iPhone 15 Pro Max side view', 2),
('550e8400-e29b-41d4-a716-446655440100', '/placeholder.svg?height=600&width=600', 'iPhone 15 Pro Max screen', 3),
('550e8400-e29b-41d4-a716-446655440100', '/placeholder.svg?height=600&width=600', 'iPhone 15 Pro Max accessories', 4),

-- Samsung Galaxy S24 Ultra images
('550e8400-e29b-41d4-a716-446655440101', '/placeholder.svg?height=600&width=600', 'Samsung Galaxy S24 Ultra front', 0),
('550e8400-e29b-41d4-a716-446655440101', '/placeholder.svg?height=600&width=600', 'Samsung Galaxy S24 Ultra with S Pen', 1),
('550e8400-e29b-41d4-a716-446655440101', '/placeholder.svg?height=600&width=600', 'Samsung Galaxy S24 Ultra camera', 2),
('550e8400-e29b-41d4-a716-446655440101', '/placeholder.svg?height=600&width=600', 'Samsung Galaxy S24 Ultra back', 3),
('550e8400-e29b-41d4-a716-446655440101', '/placeholder.svg?height=600&width=600', 'Samsung Galaxy S24 Ultra angles', 4),

-- MacBook Air M3 images
('550e8400-e29b-41d4-a716-446655440102', '/placeholder.svg?height=600&width=600', 'MacBook Air M3 15 inch open', 0),
('550e8400-e29b-41d4-a716-446655440102', '/placeholder.svg?height=600&width=600', 'MacBook Air M3 closed', 1),
('550e8400-e29b-41d4-a716-446655440102', '/placeholder.svg?height=600&width=600', 'MacBook Air M3 side profile', 2),
('550e8400-e29b-41d4-a716-446655440102', '/placeholder.svg?height=600&width=600', 'MacBook Air M3 keyboard', 3),
('550e8400-e29b-41d4-a716-446655440102', '/placeholder.svg?height=600&width=600', 'MacBook Air M3 ports', 4);

-- Link products to categories
INSERT INTO product_categories (product_id, category_id) VALUES
-- Electronics products
('550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655440010'), -- iPhone to Electronics
('550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655440020'), -- iPhone to Smartphones
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440010'), -- Samsung to Electronics
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440020'), -- Samsung to Smartphones
('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440010'), -- MacBook to Electronics
('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440021'), -- MacBook to Laptops
('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440010'), -- Sony headphones to Electronics
('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440022'), -- Sony headphones to Audio
('550e8400-e29b-41d4-a716-446655440104', '550e8400-e29b-41d4-a716-446655440010'), -- iPad to Electronics
('550e8400-e29b-41d4-a716-446655440105', '550e8400-e29b-41d4-a716-446655440010'), -- Dell to Electronics
('550e8400-e29b-41d4-a716-446655440105', '550e8400-e29b-41d4-a716-446655440021'), -- Dell to Laptops
('550e8400-e29b-41d4-a716-446655440106', '550e8400-e29b-41d4-a716-446655440010'), -- Nintendo to Electronics
('550e8400-e29b-41d4-a716-446655440107', '550e8400-e29b-41d4-a716-446655440010'), -- AirPods to Electronics
('550e8400-e29b-41d4-a716-446655440107', '550e8400-e29b-41d4-a716-446655440022'), -- AirPods to Audio

-- Fashion products
('550e8400-e29b-41d4-a716-446655440200', '550e8400-e29b-41d4-a716-446655440011'), -- Jordan to Fashion
('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440011'), -- Levi's to Fashion
('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440011'), -- Adidas to Fashion
('550e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440011'), -- Ray-Ban to Fashion
('550e8400-e29b-41d4-a716-446655440204', '550e8400-e29b-41d4-a716-446655440011'), -- North Face to Fashion
('550e8400-e29b-41d4-a716-446655440205', '550e8400-e29b-41d4-a716-446655440011'), -- Converse to Fashion

-- Home & Garden products
('550e8400-e29b-41d4-a716-446655440300', '550e8400-e29b-41d4-a716-446655440012'), -- KitchenAid to Home & Garden
('550e8400-e29b-41d4-a716-446655440301', '550e8400-e29b-41d4-a716-446655440012'), -- Dyson to Home & Garden
('550e8400-e29b-41d4-a716-446655440302', '550e8400-e29b-41d4-a716-446655440012'), -- Ninja to Home & Garden
('550e8400-e29b-41d4-a716-446655440303', '550e8400-e29b-41d4-a716-446655440012'), -- Instant Pot to Home & Garden
('550e8400-e29b-41d4-a716-446655440304', '550e8400-e29b-41d4-a716-446655440012'); -- Philips to Home & Garden

-- Insert product variants for fashion items
INSERT INTO product_variants (product_id, name, value, price, quantity, sku) VALUES
-- Nike Air Jordan 1 sizes
('550e8400-e29b-41d4-a716-446655440200', 'Size', 'US 7', 170.00, 45, 'NIKE-AJ1-RETRO-BRED-7'),
('550e8400-e29b-41d4-a716-446655440200', 'Size', 'US 8', 170.00, 67, 'NIKE-AJ1-RETRO-BRED-8'),
('550e8400-e29b-41d4-a716-446655440200', 'Size', 'US 9', 170.00, 89, 'NIKE-AJ1-RETRO-BRED-9'),
('550e8400-e29b-41d4-a716-446655440200', 'Size', 'US 10', 170.00, 123, 'NIKE-AJ1-RETRO-BRED-10'),
('550e8400-e29b-41d4-a716-446655440200', 'Size', 'US 11', 170.00, 98, 'NIKE-AJ1-RETRO-BRED-11'),
('550e8400-e29b-41d4-a716-446655440200', 'Size', 'US 12', 170.00, 76, 'NIKE-AJ1-RETRO-BRED-12'),

-- Levi's 501 sizes and colors
('550e8400-e29b-41d4-a716-446655440201', 'Size', '32x32', 89.00, 150, 'LEVIS-501-ORIG-INDIGO-32X32'),
('550e8400-e29b-41d4-a716-446655440201', 'Size', '34x32', 89.00, 200, 'LEVIS-501-ORIG-INDIGO-34X32'),
('550e8400-e29b-41d4-a716-446655440201', 'Size', '36x32', 89.00, 180, 'LEVIS-501-ORIG-INDIGO-36X32'),
('550e8400-e29b-41d4-a716-446655440201', 'Color', 'Indigo', 89.00, 400, 'LEVIS-501-ORIG-INDIGO'),
('550e8400-e29b-41d4-a716-446655440201', 'Color', 'Black', 89.00, 350, 'LEVIS-501-ORIG-BLACK'),
('550e8400-e29b-41d4-a716-446655440201', 'Color', 'Light Wash', 89.00, 250, 'LEVIS-501-ORIG-LIGHT'),

-- KitchenAid colors
('550e8400-e29b-41d4-a716-446655440300', 'Color', 'Empire Red', 449.00, 45, 'KITCHENAID-ARTISAN-5QT-RED'),
('550e8400-e29b-41d4-a716-446655440300', 'Color', 'Onyx Black', 449.00, 23, 'KITCHENAID-ARTISAN-5QT-BLACK'),
('550e8400-e29b-41d4-a716-446655440300', 'Color', 'White', 449.00, 34, 'KITCHENAID-ARTISAN-5QT-WHITE'),
('550e8400-e29b-41d4-a716-446655440300', 'Color', 'Silver', 449.00, 21, 'KITCHENAID-ARTISAN-5QT-SILVER');

-- Insert sample reviews
INSERT INTO reviews (product_id, customer_id, rating, title, comment, is_verified, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655440500', 5, 'Amazing phone!', 'The iPhone 15 Pro Max is incredible. The camera quality is outstanding and the titanium build feels premium.', true, NOW() - INTERVAL '5 days'),
('550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655440501', 4, 'Great upgrade', 'Upgraded from iPhone 13 and the difference is noticeable. Battery life is excellent.', true, NOW() - INTERVAL '10 days'),
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440502', 5, 'S Pen is game changer', 'The built-in S Pen makes this phone incredibly productive. Love the AI features too.', true, NOW() - INTERVAL '3 days'),
('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440503', 5, 'Perfect laptop', 'The M3 chip is blazing fast and the 15-inch screen is perfect for work. Highly recommend!', true, NOW() - INTERVAL '7 days'),
('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440504', 4, 'Excellent noise cancellation', 'These headphones block out everything. Perfect for flights and commuting.', true, NOW() - INTERVAL '12 days');

-- Insert sample customers (these would normally be created through auth signup)
INSERT INTO customers (id, email, name, phone, tenant_id) VALUES
('550e8400-e29b-41d4-a716-446655440500', 'customer1@example.com', 'Alice Johnson', '+1-555-0101', '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440501', 'customer2@example.com', 'Bob Smith', '+1-555-0102', '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440502', 'customer3@example.com', 'Carol Davis', '+1-555-0103', '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440503', 'customer4@example.com', 'David Wilson', '+1-555-0104', '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440504', 'customer5@example.com', 'Eva Brown', '+1-555-0105', '550e8400-e29b-41d4-a716-446655440000');
