import { NextResponse } from "next/server"
import { sanityClient } from "../../../sanity/lib/client"
import { allProductsQuery } from "../../../sanity/queries"

export async function GET() {
  try {
    // Fetch all products from Sanity using your GROQ query
    const products = await sanityClient.fetch(allProductsQuery)

    // Return them as JSON
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
