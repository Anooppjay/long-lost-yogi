import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { slug, type, field, value } = body

  if (!slug || !type || !field || value === undefined) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const dir = type === 'story' ? 'content/stories' : 'content/products'
  const filePath = path.join(process.cwd(), dir, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const parsed = matter(raw)

  if (field === 'content') {
    parsed.content = value
  } else {
    parsed.data[field] = value
  }

  const updated = matter.stringify(parsed.content, parsed.data)
  fs.writeFileSync(filePath, updated)

  return NextResponse.json({ ok: true })
}
