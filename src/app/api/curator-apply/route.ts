import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email, location, story, social } = body

  if (!name || !email || !story) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const submission = {
    id: Date.now().toString(),
    name,
    email,
    location: location || '',
    story,
    social: social || '',
    submittedAt: new Date().toISOString(),
  }

  const curatorsPath = path.join(process.cwd(), 'data/curators.json')
  const existing = JSON.parse(fs.readFileSync(curatorsPath, 'utf-8'))
  existing.push(submission)
  fs.writeFileSync(curatorsPath, JSON.stringify(existing, null, 2))

  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.ADMIN_EMAIL
  ) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT ?? '587'),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: `Long Lost Yogi <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Curator Application — ${name}`,
        text: `
New curator application received.

Name: ${name}
Email: ${email}
Location: ${location}
Social: ${social}

Story:
${story}

Submitted: ${submission.submittedAt}
        `.trim(),
      })
    } catch {
      // Email failure does not block the submission
    }
  }

  return NextResponse.json({ ok: true })
}
