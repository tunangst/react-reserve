const calculateCartTotal = products => {
    const total = products.reduce((accumulator, element) => {
        accumulator += element.product.price * element.quantity;
        return accumulator;
    }, 0);
    const cartTotal = ((total * 100) / 100).toFixed(2);
    const stripeTotal = Number((total * 100).toFixed(2));

    return { cartTotal, stripeTotal };
};

export default calculateCartTotal;
