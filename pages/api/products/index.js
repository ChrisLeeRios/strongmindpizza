import dbConnect from "../../../utilities/mongo"
import Product from "../../../models/Product"

export default async function handler(req, res) {
    // adding cookies for auth
    // const {method, cookies} = req;
    const {method, } = req;

    // adding this for auth
    // const token = cookies.token

    await dbConnect();

    if(method === "GET"){
        try{
            const products = await Product.find();
            res.status(200).json(products);
        }catch(err){
            res.status(500).json(err)
        }
    }

    if(method === "POST"){
        // for auth

        // if(!token || token !== process.env.token){
        //     return res.status(401).json("Not Authenticated!")
        // }

        try{
            //1. check if product exists with the name from form (req.body.title contains the pizza name) -> const await Product.find
            const duplicateProduct = await Product.findOne({title: req.body.title})
            console.log("***********DUPLICATE PRODUCT", duplicateProduct);
            if(duplicateProduct ===null ){
                console.log('ENTERED IF', req.body)
                const product = await Product.create(req.body);
                console.log('AFTER PRODUCT')
                res.status(201).json(product)
            }else{
                throw{errors: {title: {message: "Pizza name is taken"}}}
            }
        }catch(err){
            console.log(err)
        }
    }
}