import { HttpError } from 'wasp/server'

export const getProducts = async (args, context) => {
  return context.entities.Product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      variants: {
        select: {
          id: true,
          color: true,
          size: true
        }
      },
      media: {
        select: {
          id: true,
          url: true
        }
      }
    }
  });
}

export const getProductDetails = async ({ slug }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const product = await context.entities.Product.findUnique({
    where: { slug },
    include: {
      variants: true,
      media: true
    }
  });

  if (!product) throw new HttpError(404, 'No product found with the provided slug.');

  return product;
}
