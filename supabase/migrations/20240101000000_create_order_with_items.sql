create or replace function create_order_with_items(
  p_user_id uuid,
  p_store_id int,
  p_total_amount float,
  p_shipping_address jsonb,
  p_payment_method text,
  p_payment_intent_id text,
  p_items jsonb
)
returns jsonb as $$
declare
  v_order_id int;
  v_order_data jsonb;
  item jsonb;
begin
  -- Create the order
  insert into public.orders (user_id, store_id, total_amount, status, shipping_address, payment_method, payment_intent_id)
  values (p_user_id, p_store_id, p_total_amount, 'confirmed', p_shipping_address, p_payment_method, p_payment_intent_id)
  returning id into v_order_id;

  -- Create order items and update product stock
  for item in select * from jsonb_array_elements(p_items)
  loop
    insert into public.order_items (order_id, product_id, quantity, price, variant_id)
    values (
      v_order_id,
      (item->>'product_id')::int,
      (item->>'quantity')::int,
      (item->>'price')::numeric,
      (item->>'variant_id')::int
    );

    update public.products
    set stock_quantity = stock_quantity - (item->>'quantity')::int
    where id = (item->>'product_id')::int;
  end loop;

  -- Fetch the created order and its items to return
  select jsonb_build_object(
    'id', o.id,
    'user_id', o.user_id,
    'store_id', o.store_id,
    'total_amount', o.total_amount,
    'status', o.status,
    'shipping_address', o.shipping_address,
    'payment_method', o.payment_method,
    'payment_intent_id', o.payment_intent_id,
    'created_at', o.created_at,
    'items', (select jsonb_agg(oi) from public.order_items oi where oi.order_id = v_order_id)
  )
  into v_order_data
  from public.orders o
  where o.id = v_order_id;

  return v_order_data;
end;
$$ language plpgsql volatile;