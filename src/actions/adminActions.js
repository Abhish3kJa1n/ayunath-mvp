import { HttpError } from 'wasp/server'

export const adminCreateProduct = async (args, context) => {
  if (!context.user || !context.user.isAdmin) { throw new HttpError(403) };

  const { name, description, price, variants } = args;

  // Create the product first
  const product = await context.entities.Product.create({
    data: {
      name,
      description,
      price
    }
  });

  // Create the variants for the product
  for (const variant of variants) {
    await context.entities.Variant.create({
      data: {
        color: variant.color,
        size: variant.size,
        productId: product.id
      }
    });
  }

  return product;
}
