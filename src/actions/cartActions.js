import { HttpError } from 'wasp/server'

export const addToCart = async ({ variantId, quantity }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const variant = await context.entities.Variant.findUnique({
    where: { id: variantId }
  });
  if (!variant) { throw new HttpError(404, 'Variant not found') };

  // Assuming we have a function to sync localStorage cart with server
  await syncCartWithServer(context.user.id, variantId, quantity);

  return { success: true };
}
