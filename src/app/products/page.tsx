import { ContentLayout } from '@/components/dashboard/content-layout'
import { Card, CardHeader } from '@/components/ui/card'
import { Product } from '@/zod'
import { ProductsTable } from './components/products-table'

async function getData(): Promise<Product[]> {
  // Fetch data from your API here.
  return [
    { id: '728ed52f', name: 'T-Shirt', price: 1000, quantity: 10, category: 'Clothing' },
    { id: '82fd4b7a', name: 'Jeans', price: 2000, quantity: 5, category: 'Clothing' },
    { id: '9a3d1c2e', name: 'Sneakers', price: 1500, quantity: 8, category: 'Footwear' },
    { id: 'b7fa4c3d', name: 'Hoodie', price: 2500, quantity: 7 },
    { id: 'c6bd5d4f', name: 'Jacket', price: 3000, quantity: 4, category: 'Clothing' },
    { id: 'd5af6e7g', name: 'Cap', price: 500, quantity: 12 },
    { id: 'e7bd8f2h', name: 'Socks', price: 200, quantity: 20, category: 'Accessories' },
    { id: 'f9ge9h4j', name: 'Backpack', price: 1200, quantity: 6 },
    { id: 'h2ik1j5k', name: 'Belt', price: 600, quantity: 15, category: 'Accessories' },
    { id: 'j4lm2n3p', name: 'Watch', price: 5000, quantity: 3, category: 'Accessories' },
    { id: 'k6no4p5q', name: 'Sunglasses', price: 800, quantity: 9 },
    { id: 'l7pq6r2s', name: 'Scarf', price: 700, quantity: 11 },
    { id: 'm8rs7t3v', name: 'Gloves', price: 900, quantity: 13, category: 'Accessories' },
    { id: 'n9tu8w4x', name: 'Boots', price: 2200, quantity: 5, category: 'Footwear' },
    { id: 'o1vw9y6z', name: 'Wallet', price: 1100, quantity: 7 }
  ]
}

export default async function ProductsPage() {
  const data = await getData()

  return (
    <ContentLayout title="All Products">
      <Card className="w-full">
        <CardHeader></CardHeader>
        <ProductsTable data={data} />
      </Card>
    </ContentLayout>
  )
}
