import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data/givingback.json')

export async function GET() {
  const raw = fs.readFileSync(filePath, 'utf-8')
  return NextResponse.json(JSON.parse(raw))
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-admin-secret')
  if (secret !== process.env.ADMIN_SECRET && secret !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const total = parseFloat(body.total)
  if (isNaN(total) || total < 0) {
    return NextResponse.json({ error: 'Invalid total' }, { status: 400 })
  }

  const current = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const updated = { ...current, total }
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2))
  return NextResponse.json({ ok: true, total })
}
