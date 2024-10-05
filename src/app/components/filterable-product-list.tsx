'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Category, CategoryEntity, ProductEntity } from '@/zod'
import { useState } from 'react'

interface FilterableProductListProps {
  categories: CategoryEntity[]
  products: ProductEntity[]
}
export default function FilterableProductList({ categories, products }: FilterableProductListProps) {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])

  const minPrice = Math.min(...products.map((p) => p.sale_price))
  const maxPrice = Math.max(...products.map((p) => p.sale_price))
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice])

  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter((product) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category_id!)) {
      return false
    }
    if (product.sale_price < priceRange[0] || product.sale_price > priceRange[1]) {
      return false
    }
    if (searchQuery.length > 0 && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  const addToCart = (_id: number) => {}

  function findCategory(id: number): Category {
    return categories.find((c) => c.id === id)!
  }

  return (
    <div className="w-full mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Search</h3>
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    placeholder="Search Products"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Categories</h3>
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id={category.id.toString()}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) => {
                          setSelectedCategories(
                            checked
                              ? [...selectedCategories, category.id]
                              : selectedCategories.filter((c) => c !== category.id)
                          )
                        }}
                      />
                      <Label htmlFor={category.id!.toString()}>{category.name}</Label>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                  <Slider
                    min={minPrice}
                    max={maxPrice}
                    step={1}
                    value={priceRange}
                    onValueChange={([a, b]) => setPriceRange([a, b])}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2">
                    <span>{priceRange[0]} IQD</span>
                    <span>{priceRange[1]} IQD</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-3 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {filteredProducts.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{findCategory(product.category_id!)?.name}</p>
                  <p className="font-semibold font-mono">{product.sale_price.toFixed(2)} IQD</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => addToCart(product.id!)}>Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
