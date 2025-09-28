import type { Category } from "@/lib/database/types"

interface CategoryHeaderProps {
  category: Category
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <section className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{category.name}</h1>
          {category.description && <p className="text-xl text-muted-foreground">{category.description}</p>}
        </div>
      </div>
    </section>
  )
}
