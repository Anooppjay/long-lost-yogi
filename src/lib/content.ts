import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Story {
  slug: string
  title: string
  origin: string
  category: string
  maker: string
  makerInitials: string
  curator: string
  curatorRole: string
  date: string
  excerpt: string
  product_slug: string
  images: string[]
  quote: string
  location_bleed: string
  content: string
}

export interface Product {
  slug: string
  title: string
  maker: string
  makerInitials: string
  makerLocation: string
  origin: string
  category: string
  price: string
  priceNumber: number
  story_slug: string
  images: string[]
  excerpt: string
  shipping: string
  giving_back: string
  dimensions: string
  material: string
  content: string
}

const storiesDir = path.join(process.cwd(), 'content/stories')
const productsDir = path.join(process.cwd(), 'content/products')

export function getAllStories(): Story[] {
  const files = fs.readdirSync(storiesDir)
  return files
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const slug = f.replace('.md', '')
      return getStoryBySlug(slug)!
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getStoryBySlug(slug: string): Story | null {
  try {
    const filePath = path.join(storiesDir, `${slug}.md`)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    return { slug, ...data, content } as Story
  } catch {
    return null
  }
}

export function getAllProducts(): Product[] {
  const files = fs.readdirSync(productsDir)
  return files
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const slug = f.replace('.md', '')
      return getProductBySlug(slug)!
    })
    .filter(Boolean)
}

export function getProductBySlug(slug: string): Product | null {
  try {
    const filePath = path.join(productsDir, `${slug}.md`)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    return { slug, ...data, content } as Product
  } catch {
    return null
  }
}

export function getGivingBackTotal(): { total: number; currency: string } {
  const filePath = path.join(process.cwd(), 'data/givingback.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

export function getOrders(): unknown[] {
  const filePath = path.join(process.cwd(), 'data/orders.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

export function getCurators(): unknown[] {
  const filePath = path.join(process.cwd(), 'data/curators.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}
