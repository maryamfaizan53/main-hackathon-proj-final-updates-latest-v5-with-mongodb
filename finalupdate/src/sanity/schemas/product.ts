import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Human-readable product name (e.g. "Nike Air Jordan")',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'SEO-friendly unique URL segment generated from name',
      options: {
        source: 'name',    // Auto-generate from the "name" field
        maxLength: 96,     // Limit the length of the slug
        // Optional custom slugify function:
        // slugify: input =>
        //   input.toLowerCase().replace(/\s+/g, '-').slice(0, 96)
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'discountPercentage',
      title: 'Discount Percentage',
      type: 'number',
    }),
    defineField({
      name: 'isFeaturedProduct',
      title: 'Is Featured Product',
      type: 'boolean',
    }),
    defineField({
      name: 'stockLevel',
      title: 'Stock Level',
      type: 'number',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'imagePath',
      title: 'Image Path',
      type: 'url',
      description: 'URL of the product image (hosted externally)',
    }),
  ],
})

