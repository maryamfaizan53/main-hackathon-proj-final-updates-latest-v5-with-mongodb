// /sanity/queries.ts

// Query all products (return whatever fields you need, including slug)
export const allProductsQuery = `
  *[_type == "product"]{
    name,
    "slug": slug.current,
    price,
    description,
    discountPercentage,
    isFeaturedProduct,
    stockLevel,
    category->{
      title
    },
    "image": imagePath
  }
`

// Query a single product by matching slug
// We use `[0]` to return just one product, not an array.
export const singleProductBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0]{
    name,
    "slug": slug.current,
    price,
    description,
    discountPercentage,
    isFeaturedProduct,
    stockLevel,
    category->{
      title
    },
    "image": imagePath
  }
`











export const allBlogsQuery = `
  *[_type == "blog"]{
    "id": customId,
    title,
    description,
    date,
    category,
    author,
    "image": image.asset->url
  }
`;


