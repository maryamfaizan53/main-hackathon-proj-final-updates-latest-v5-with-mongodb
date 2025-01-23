// /lib/mongoose.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/furniture'

if (!global._mongoose) {
  global._mongoose = mongoose.connect(MONGODB_URI)
}

export const dbConnect = global._mongoose // type is Promise<typeof mongoose> | undefined

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: String,
  // any other fields
})

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema)
