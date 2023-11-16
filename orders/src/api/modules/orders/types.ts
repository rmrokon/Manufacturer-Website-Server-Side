interface ProductDocument {
    name: string
    price: number
    image?: string
    quantity: number
    min_order: number
    description?: string
} 

export interface OrderDocument {
    total: number
    quantity: number
    paid: boolean
    phone?: number
    shipped: boolean
    products: ProductDocument[]
    email: string
}