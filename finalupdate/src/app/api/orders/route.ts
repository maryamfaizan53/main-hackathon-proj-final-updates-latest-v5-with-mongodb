// /app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '../../../sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // console.log("Creating order with body:", body)
    // if (!body.userEmail || !body.items || body.items.length === 0) {
    //     //       return NextResponse.json({ error: 'Invalid order data' }, { status: 400 })
    //     //     }

    // Build doc
    const newOrder = {
      _type: "order",
      userEmail: body.userEmail,
      items: body.items,
      total: body.total,
      status: body.status || "pending",
      shipping: body.shipping,  // store shipping if present
      createdAt: new Date().toISOString(),
    }

    const created = await sanityClient.create(newOrder)
    return NextResponse.json({ order: created }, { status: 201 })
  } catch (err) {
    console.error("Error creating order:", err)
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 })
  }
}


// import { NextRequest, NextResponse } from 'next/server'
// import { sanityClient } from '../../../sanity/lib/client'
// // If using the new Next 15 approach for route handlers, we can do:
// type Body = {
//   userEmail: string
//   items: {
//     id: string
//     name: string
//     price: number
//     quantity: number
//     image: string
//   }[]
//   total: number
//   status?: string
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json() as Body

//     // Validate input
//     if (!body.userEmail || !body.items || body.items.length === 0) {
//       return NextResponse.json({ error: 'Invalid order data' }, { status: 400 })
//     }

//     // Build the new order doc
//     const newOrder = {
//       _type: 'order',
//       userEmail: body.userEmail,
//       items: body.items,
//       total: body.total,
//       status: body.status || 'pending',
//       createdAt: new Date().toISOString(),
//     }

//     // Create the document in Sanity
//     const created = await sanityClient.create(newOrder)

//     return NextResponse.json({ order: created }, { status: 201 })
//   } catch (error) {
//     console.error('Error creating order:', error)
//     return NextResponse.json({ error: 'Order creation failed' }, { status: 500 })
//   }
// }
