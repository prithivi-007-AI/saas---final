import { createClient } from "@/lib/supabase/server"
import type { Product, Category, Customer, Order } from "./types"

// Product queries
export async function getProducts(
  tenantId: string,
  options?: {
    categoryId?: string
    featured?: boolean
    limit?: number
    offset?: number
    search?: string
    status?: string
  },
) {
  const supabase = await createClient()

  let query = supabase
    .from("products")
    .select(`
      *,
      images:product_images(*),
      categories:product_categories(
        category:categories(*)
      ),
      reviews:reviews(rating)
    `)
    .eq("tenant_id", tenantId)

  if (options?.status) {
    query = query.eq("status", options.status)
  } else {
    query = query.eq("status", "ACTIVE")
  }

  if (options?.featured) {
    query = query.eq("is_featured", true)
  }

  if (options?.categoryId) {
    query = query.contains("categories", [{ category_id: options.categoryId }])
  }

  if (options?.search) {
    query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) throw error
  return data as Product[]
}

export async function getProductBySlug(slug: string, tenantId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      images:product_images(*),
      variants:product_variants(*),
      categories:product_categories(
        category:categories(*)
      ),
      reviews:reviews(
        *,
        customer:customers(name, avatar)
      )
    `)
    .eq("slug", slug)
    .eq("tenant_id", tenantId)
    .eq("status", "ACTIVE")
    .single()

  if (error) throw error
  return data as Product
}

// Category queries
export async function getCategories(tenantId: string, parentId?: string) {
  const supabase = await createClient()

  let query = supabase.from("categories").select("*").eq("tenant_id", tenantId).eq("is_active", true)

  if (parentId === null) {
    query = query.is("parent_id", null)
  } else if (parentId) {
    query = query.eq("parent_id", parentId)
  }

  const { data, error } = await query.order("sort_order")

  if (error) throw error
  return data as Category[]
}

export async function getCategoryBySlug(slug: string, tenantId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("categories")
    .select(`
      *,
      children:categories!parent_id(*)
    `)
    .eq("slug", slug)
    .eq("tenant_id", tenantId)
    .eq("is_active", true)
    .single()

  if (error) throw error
  return data as Category
}

// Customer queries
export async function getCustomerByEmail(email: string, tenantId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("email", email)
    .eq("tenant_id", tenantId)
    .single()

  if (error && error.code !== "PGRST116") throw error
  return data as Customer | null
}

// Order queries
export async function getCustomerOrders(customerId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      items:order_items(
        *,
        product:products(name, images:product_images(url))
      )
    `)
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Order[]
}

export async function getOrderByNumber(orderNumber: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      items:order_items(*),
      customer:customers(name, email)
    `)
    .eq("order_number", orderNumber)
    .single()

  if (error) throw error
  return data as Order
}

// Cart queries
export async function getCartItems(customerId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      *,
      product:products(
        *,
        images:product_images(url)
      ),
      variant:product_variants(*)
    `)
    .eq("customer_id", customerId)

  if (error) throw error
  return data
}

// Wishlist queries
export async function getWishlistItems(customerId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("wishlist_items")
    .select(`
      *,
      product:products(
        *,
        images:product_images(url)
      )
    `)
    .eq("customer_id", customerId)

  if (error) throw error
  return data
}

// Search queries
export async function searchProducts(
  query: string,
  tenantId: string,
  options?: {
    categoryId?: string
    minPrice?: number
    maxPrice?: number
    limit?: number
  },
) {
  const supabase = await createClient()

  let dbQuery = supabase
    .from("products")
    .select(`
      *,
      images:product_images(*),
      categories:product_categories(
        category:categories(*)
      )
    `)
    .eq("tenant_id", tenantId)
    .eq("status", "ACTIVE")
    .or(`name.ilike.%${query}%,description.ilike.%${query}%,short_description.ilike.%${query}%`)

  if (options?.categoryId) {
    dbQuery = dbQuery.contains("categories", [{ category_id: options.categoryId }])
  }

  if (options?.minPrice) {
    dbQuery = dbQuery.gte("price", options.minPrice)
  }

  if (options?.maxPrice) {
    dbQuery = dbQuery.lte("price", options.maxPrice)
  }

  if (options?.limit) {
    dbQuery = dbQuery.limit(options.limit)
  }

  const { data, error } = await dbQuery.order("created_at", { ascending: false })

  if (error) throw error
  return data as Product[]
}
