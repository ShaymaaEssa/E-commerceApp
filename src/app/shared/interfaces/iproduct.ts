import { ICategory } from "./icategory"

export interface IProduct {
    sold: number
    images: string[]
    subcategory: Subcategory[]
    ratingsQuantity: number
    _id: string
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    imageCover: string
    category: ICategory
    brand: Brand
    ratingsAverage: number
    createdAt: string
    updatedAt: string
    id: string
  }
  
  export interface Subcategory {
    _id: string
    name: string
    slug: string
    category: string
  }
  
  
  export interface Brand {
    _id: string
    name: string
    slug: string
    image: string
  }
  