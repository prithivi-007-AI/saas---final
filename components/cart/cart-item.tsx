"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/lib/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import type { CartItem as CartItemType } from "@/lib/cart/cart-context"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()
  const [quantity, setQuantity] = useState(item.quantity)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
    updateQuantity(item.id, newQuantity)
  }

  const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number.parseInt(e.target.value) || 1
    handleQuantityChange(newQuantity)
  }

  const itemPrice = item.product.price + (item.selectedVariant?.priceModifier || 0)
  const totalPrice = itemPrice * item.quantity

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <Link href={`/products/${item.product.slug}`}>
              <img
                src={
                  item.product.images?.[0]?.url ||
                  `/placeholder.svg?height=120&width=120&query=${item.product.name || "/placeholder.svg"}`
                }
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <Link href={`/products/${item.product.slug}`}>
                  <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2">
                    {item.product.name}
                  </h3>
                </Link>
                {item.selectedVariant && (
                  <p className="text-sm text-muted-foreground">
                    {item.selectedVariant.name}: {item.selectedVariant.value}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityInputChange}
                  className="w-16 h-8 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="font-semibold text-lg">${totalPrice.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">${itemPrice.toFixed(2)} each</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
