// /app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { dbConnect, UserModel } from '../../../../lib/mongoose'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  try {
    await dbConnect
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const user = await UserModel.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Minimal: store user email in a cookie (not secure, just a demo)
    const response = NextResponse.json({ success: true, user: { email: user.email } })
    response.cookies.set('user', user.email, { path: '/' })
    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
