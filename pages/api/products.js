// import products from '../../static/products.json';
import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
    const { page, size } = req.query;
    //convert querystring values to numbers
    const pageNum = Number(page);
    const pageSize = Number(size);
    const totalDocs = await Product.countDocuments();
    const totalPages = Math.ceil(totalDocs / pageSize);

    let products = [];
    if (pageNum === 1) {
        products = await Product.find()
            .sort({ name: 'asc' })
            .limit(pageSize);
    } else {
        const skips = pageSize * (pageNum - 1);
        products = await Product.find()
            .skip(skips)
            .limit(pageSize);
    }
    // const products = await Product.find();
    res.status(200).json({ products, totalPages });
};
