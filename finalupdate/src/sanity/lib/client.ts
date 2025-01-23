//sanity/sanityClient.ts
import { createClient } from "next-sanity";



export const sanityClient = createClient({
  projectId: "dys4b966",
  dataset: "production",
  apiVersion: "2023-10-01",
  token: "skLiDOBgf3VdYbD6h2XLGBgDmfmUmNtnNGCdQsfp2L2hkoLPYnuzKVKA1VKRKF0QmoMSFZ9qcTlfNmeWSJLjGrm168hT5Hn5aruimdEOJCcJRjtBDIN6ztRRT6T2eeE0HVnwCoYWtyUaUbSN8ZiwWJCQ2ytJg5guMDU851dCqRsQ0LkfT0ve",
  useCdn: false,           
});


