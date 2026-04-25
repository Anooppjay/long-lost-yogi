import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const slug = formData.get('slug') as string | null
  const type = formData.get('type') as string | null

  if (!file || !slug || !type) {
    return NextResponse.json({ error: 'Missing file, slug, or type' }, { status: 400 })
  }

  if (type !== 'product' && type !== 'story') {
    return NextResponse.json({ error: 'type must be product or story' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const filename = `${slug}-${Date.now()}.${ext}`
  const saveDir = path.join(process.cwd(), 'public', 'images', `${type}s`)

  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true })
  }

  const savePath = path.join(saveDir, filename)
  const bytes = await file.arrayBuffer()
  fs.writeFileSync(savePath, Buffer.from(bytes))

  const imagePath = `/images/${type}s/${filename}`

  const contentDir = type === 'story' ? 'content/stories' : 'content/products'
  const mdPath = path.join(process.cwd(), contentDir, `${slug}.md`)

  if (fs.existsSync(mdPath)) {
    const raw = fs.readFileSync(mdPath, 'utf-8')
    const parsed = matter(raw)
    const images: string[] = parsed.data.images ?? []
    images.push(imagePath)
    parsed.data.images = images
    fs.writeFileSync(mdPath, matter.stringify(parsed.content, parsed.data))
  }

  return NextResponse.json({ path: imagePath })
}
