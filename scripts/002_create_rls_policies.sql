-- Row Level Security Policies for E-commerce SaaS Platform

-- Tenants policies (Super admins can manage all tenants)
CREATE POLICY "Super admins can view all tenants" ON tenants FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() AND users.role = 'SUPER_ADMIN'
  )
);

CREATE POLICY "Super admins can manage all tenants" ON tenants FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() AND users.role = 'SUPER_ADMIN'
  )
);

-- Users policies
CREATE POLICY "Users can view their own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Super admins can view all users" ON users FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() AND users.role = 'SUPER_ADMIN'
  )
);

-- Customers policies (customers can only see their own data within their tenant)
CREATE POLICY "Customers can view their own data" ON customers FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Customers can update their own data" ON customers FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Store owners can view customers in their tenant" ON customers FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.tenant_id = customers.tenant_id 
    AND users.role = 'STORE_OWNER'
  )
);

-- Addresses policies
CREATE POLICY "Customers can manage their own addresses" ON addresses FOR ALL USING (
  EXISTS (
    SELECT 1 FROM customers 
    WHERE customers.id = addresses.customer_id AND customers.id = auth.uid()
  )
);

-- Categories policies (public read, store owners can manage within tenant)
CREATE POLICY "Anyone can view active categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Store owners can manage categories in their tenant" ON categories FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.tenant_id = categories.tenant_id 
    AND users.role = 'STORE_OWNER'
  )
);

-- Products policies (public read for active products, store owners can manage)
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (status = 'ACTIVE');
CREATE POLICY "Store owners can manage products in their tenant" ON products FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.tenant_id = products.tenant_id 
    AND users.role = 'STORE_OWNER'
  )
);

-- Product images policies
CREATE POLICY "Anyone can view product images" ON product_images FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM products 
    WHERE products.id = product_images.product_id AND products.status = 'ACTIVE'
  )
);
CREATE POLICY "Store owners can manage product images" ON product_images FOR ALL USING (
  EXISTS (
    SELECT 1 FROM products 
    JOIN users ON users.tenant_id = products.tenant_id 
    WHERE products.id = product_images.product_id 
    AND users.id = auth.uid() 
    AND users.role = 'STORE_OWNER'
  )
);

-- Product categories policies
CREATE POLICY "Anyone can view product categories" ON product_categories FOR SELECT USING (true);
CREATE POLICY "Store owners can manage product categories" ON product_categories FOR ALL USING (
  EXISTS (
    SELECT 1 FROM products 
    JOIN users ON users.tenant_id = products.tenant_id 
    WHERE products.id = product_categories.product_id 
    AND users.id = auth.uid() 
    AND users.role = 'STORE_OWNER'
  )
);

-- Product variants policies
CREATE POLICY "Anyone can view product variants" ON product_variants FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM products 
    WHERE products.id = product_variants.product_id AND products.status = 'ACTIVE'
  )
);
CREATE POLICY "Store owners can manage product variants" ON product_variants FOR ALL USING (
  EXISTS (
    SELECT 1 FROM products 
    JOIN users ON users.tenant_id = products.tenant_id 
    WHERE products.id = product_variants.product_id 
    AND users.id = auth.uid() 
    AND users.role = 'STORE_OWNER'
  )
);

-- Cart items policies
CREATE POLICY "Customers can manage their own cart items" ON cart_items FOR ALL USING (
  EXISTS (
    SELECT 1 FROM customers 
    WHERE customers.id = cart_items.customer_id AND customers.id = auth.uid()
  )
);

-- Wishlist items policies
CREATE POLICY "Customers can manage their own wishlist items" ON wishlist_items FOR ALL USING (
  EXISTS (
    SELECT 1 FROM customers 
    WHERE customers.id = wishlist_items.customer_id AND customers.id = auth.uid()
  )
);

-- Orders policies
CREATE POLICY "Customers can view their own orders" ON orders FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM customers 
    WHERE customers.id = orders.customer_id AND customers.id = auth.uid()
  )
);
CREATE POLICY "Store owners can view orders in their tenant" ON orders FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.tenant_id = orders.tenant_id 
    AND users.role = 'STORE_OWNER'
  )
);
CREATE POLICY "Store owners can update orders in their tenant" ON orders FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.tenant_id = orders.tenant_id 
    AND users.role = 'STORE_OWNER'
  )
);

-- Order items policies
CREATE POLICY "Customers can view their own order items" ON order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders 
    JOIN customers ON customers.id = orders.customer_id 
    WHERE orders.id = order_items.order_id AND customers.id = auth.uid()
  )
);
CREATE POLICY "Store owners can view order items in their tenant" ON order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders 
    JOIN users ON users.tenant_id = orders.tenant_id 
    WHERE orders.id = order_items.order_id 
    AND users.id = auth.uid() 
    AND users.role = 'STORE_OWNER'
  )
);

-- Payments policies
CREATE POLICY "Customers can view their own payments" ON payments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders 
    JOIN customers ON customers.id = orders.customer_id 
    WHERE orders.id = payments.order_id AND customers.id = auth.uid()
  )
);
CREATE POLICY "Store owners can view payments in their tenant" ON payments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders 
    JOIN users ON users.tenant_id = orders.tenant_id 
    WHERE orders.id = payments.order_id 
    AND users.id = auth.uid() 
    AND users.role = 'STORE_OWNER'
  )
);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Customers can manage their own reviews" ON reviews FOR ALL USING (
  EXISTS (
    SELECT 1 FROM customers 
    WHERE customers.id = reviews.customer_id AND customers.id = auth.uid()
  )
);
