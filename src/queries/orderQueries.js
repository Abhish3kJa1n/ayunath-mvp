import { HttpError } from 'wasp/server'

export const getOrderHistory = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const orders = await context.entities.Order.findMany({
    where: { userId: context.user.id },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  return orders.map(order => ({
    id: order.id,
    totalPrice: order.totalPrice,
    items: order.items.map(item => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        description: item.product.description,
        price: item.product.price
      }
    }))
  }));
}
