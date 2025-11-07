import { HttpError } from 'wasp/server'

export const createOrder = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  // Fetch cart contents from args, which could be passed from client-side.
  const { cartItems } = args;

  // Calculate total price and prepare order items.
  const orderItems = await Promise.all(cartItems.map(async item => {
    const product = await context.entities.Product.findUnique({ where: { id: item.productId } });
    if (!product) { throw new HttpError(400, 'Product not found') }

    return {
      productId: product.id,
      quantity: item.quantity,
      price: product.price * item.quantity
    };
  }));

  const totalPrice = orderItems.reduce((sum, item) => sum + item.price, 0);

  // Create new order.
  const order = await context.entities.Order.create({
    data: {
      userId: context.user.id,
      totalPrice,
      items: {
        create: orderItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      }
    }
  });

  return order;
}
