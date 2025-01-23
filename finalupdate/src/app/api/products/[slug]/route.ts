// /app/api/products/[slug]/route.ts
import { NextResponse } from 'next/server'
import { sanityClient } from "../../../../sanity/lib/client"
import { singleProductBySlugQuery } from '../../../../sanity/queries'


// // /app/api/products/[slug]/route.ts
// import { NextResponse } from 'next/server'
// import { sanityClient } from '@/sanity/lib/client'
// import { singleProductBySlugQuery } from '@/sanity/queries'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: Request, context: any) {
    
    const slug = context?.params?.slug
  
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }
  
    try {
      const product = await sanityClient.fetch(singleProductBySlugQuery, { slug })
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }
      return NextResponse.json({ product })
    } catch (error) {
      console.error('Failed to fetch product:', error)
      return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
    }
  }

// export async function GET(
//   request: Request,
//   // The second argument must match exactly this shape
//   { params }: { params: { slug: string } }
// ) {
//   const { slug } = params

//   if (!slug) {
//     return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
//   }

//   try {
//     const product = await sanityClient.fetch(singleProductBySlugQuery, { slug })
//     if (!product) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 })
//     }
//     return NextResponse.json({ product })
//   } catch (error) {
//     console.error('Failed to fetch product:', error)
//     return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
//   }
// }



// // 1) (Optional) Force Next.js to treat route as dynamic
// export const dynamic = 'force-dynamic' 
// // or export const revalidate = 0

// interface Params {
//   slug: string
// }

// export async function GET(
//   request: NextRequest,
//   context: { params: Params }
// ) {
//   // 2) Access your slug from context.params
//   const { slug } = context.params

//   if (!slug) {
//     return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
//   }

//   try {
//     const product = await sanityClient.fetch(singleProductBySlugQuery, { slug })
//     if (!product) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 })
//     }
//     return NextResponse.json({ product })
//   } catch (error) {
//     console.error('Failed to fetch product:', error)
//     return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
//   }
// }


// // /app/api/products/[slug]/route.ts

// import { NextRequest, NextResponse } from 'next/server'
// import { sanityClient } from "../../../../sanity/lib/client"
// import { singleProductBySlugQuery } from '../../../../sanity/queries'

// interface Params {
//   slug: string
// }

// export async function GET(
//   request: NextRequest,
//   { params }: { params: Params }
// ) {
//   const { slug } = params
//   if (!slug) {
//     return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
//   }

//   try {
//     const product = await sanityClient.fetch(singleProductBySlugQuery, { slug })
//     if (!product) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 })
//     }

//     // Return the product in JSON form
//     return NextResponse.json({ product })
//   } catch (error) {
//     console.error('Failed to fetch product by slug:', error)
//     return NextResponse.json({ error: 'Server error' }, { status: 500 })
//   }
// }
