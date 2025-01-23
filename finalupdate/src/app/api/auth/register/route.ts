// /app/api/auth/register/route.ts
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

    const hashed = await bcrypt.hash(password, 10)
    const user = await UserModel.create({ email, password: hashed })
    return NextResponse.json({ user: { email: user.email } }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Register failed' }, { status: 500 })
  }
}
