import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Category } from "@/lib/database/types"

interface CategoriesGridProps {
  categories: Category[]
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.slug}`}>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                <img
                  src={category.image || `/placeholder.svg?height=120&width=120&query=${category.name} category icon`}
                  alt={category.name}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
              <p className="text-muted-foreground line-clamp-3">{category.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
