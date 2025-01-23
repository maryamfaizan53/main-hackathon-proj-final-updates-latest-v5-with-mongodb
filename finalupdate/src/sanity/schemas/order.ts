// /sanity/schemas/order.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "order",            // The document type name in Sanity
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "userEmail",
      title: "User Email",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "name", type: "string" },
            { name: "price", type: "number" },
            { name: "quantity", type: "number" },
            { name: "image", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "total",
      title: "Total Amount",
      type: "number",
    }),
    defineField({
      name: "shipping",
      title: "Shipping Details",
      type: "object",
      fields: [
        { name: "firstName", type: "string" },
        { name: "lastName", type: "string" },
        { name: "company", type: "string" },
        { name: "country", type: "string" },
        { name: "address", type: "string" },
        { name: "city", type: "string" },
        { name: "province", type: "string" },
        { name: "zip", type: "string" },
        { name: "phone", type: "string" },
        { name: "email", type: "string" },
        { name: "additionalInfo", type: "text" },
      ],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      // automatically set creation date
      initialValue: (new Date()).toISOString(),
    }),
  ],
});
