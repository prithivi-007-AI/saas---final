"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/lib/cart/cart-context"
import type { Product } from "@/lib/database/types"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  variant?: {
    id: string
    name: string
    value: string
    priceModifier?: number
  }
  className?: string
  size?: "sm" | "default" | "lg"
  disabled?: boolean
}

export function AddToCartButton({
  product,
  quantity = 1,
  variant,
  className,
  size = "default",
  disabled = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addItem(product, quantity, variant)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Button onClick={handleAddToCart} disabled={disabled || isAdded} className={className} size={size}>
      {isAdded ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
