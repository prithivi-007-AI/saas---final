// Database types for the E-commerce SaaS platform

export interface Tenant {
  id: string
  name: string
  subdomain: string
  customDomain?: string
  logo?: string
  primaryColor: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TenantSettings {
  id: string
  tenantId: string
  storeName: string
  storeDescription?: string
  currency: string
  taxRate: number
  shippingRate: number
  freeShippingMin?: number
}

export interface User {
  id: string
  email: string
  name: string
  password: string
  role: "SUPER_ADMIN" | "STORE_OWNER"
  avatar?: string
  isActive: boolean
  tenantId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Customer {
  id: string
  email: string
  name: string
  phone?: string
  password?: string
  avatar?: string
  dateOfBirth?: Date
  tenantId: string
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  id: string
  customerId: string
  name: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  tenantId: string
  isActive: boolean
  sortOrder: number
  createdAt: Date
  updatedAt: Date
  children?: Category[]
  parent?: Category
}

export interface Product {
  id: string
  name: string
  slug: string
  description?: string
  shortDescription?: string
  sku: string
  price: number
  comparePrice?: number
  cost?: number
  trackQuantity: boolean
  quantity: number
  lowStockThreshold: number
  weight?: number
  dimensions?: string
  status: "DRAFT" | "ACTIVE" | "ARCHIVED"
  isFeatured: boolean
  metaTitle?: string
  metaDescription?: string
  tenantId: string
  createdAt: Date
  updatedAt: Date
  images?: ProductImage[]
  variants?: ProductVariant[]
  categories?: Category[]
  reviews?: Review[]
}

export interface ProductImage {
  id: string
  productId: string
  url: string
  alt?: string
  sortOrder: number
}

export interface ProductVariant {
  id: string
  productId: string
  name: string
  value: string
  price?: number
  quantity: number
  sku?: string
}

export interface CartItem {
  id: string
  customerId: string
  productId: string
  variantId?: string
  quantity: number
  createdAt: Date
  product?: Product
  variant?: ProductVariant
}

export interface WishlistItem {
  id: string
  customerId: string
  productId: string
  createdAt: Date
  product?: Product
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  tenantId: string
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED"
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED"
  subtotal: number
  taxAmount: number
  shippingAmount: number
  discountAmount: number
  totalAmount: number
  currency: string
  billingName: string
  billingEmail: string
  billingPhone?: string
  billingAddress: string
  billingCity: string
  billingState: string
  billingPostal: string
  billingCountry: string
  shippingName: string
  shippingPhone?: string
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingPostal: string
  shippingCountry: string
  notes?: string
  createdAt: Date
  updatedAt: Date
  items?: OrderItem[]
  customer?: Customer
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  variantId?: string
  productName: string
  variantName?: string
  quantity: number
  price: number
  totalPrice: number
  product?: Product
  variant?: ProductVariant
}

export interface Payment {
  id: string
  orderId: string
  stripePaymentId?: string
  amount: number
  currency: string
  status: "PENDING" | "PAID" | "FAILED" | "REFUNDED"
  method?: string
  createdAt: Date
}

export interface Review {
  id: string
  productId: string
  customerId: string
  rating: number
  title?: string
  comment?: string
  isVerified: boolean
  createdAt: Date
  customer?: Customer
  product?: Product
}
