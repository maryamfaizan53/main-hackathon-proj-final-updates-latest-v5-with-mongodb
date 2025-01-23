import { type SchemaTypeDefinition } from 'sanity'
import product from "../schemas/product";
import blog from "../schemas/blog";
import category from '../schemas/category';
import order from '../schemas/order';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, blog, category, order],
}
