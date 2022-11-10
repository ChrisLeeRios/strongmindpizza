import dbConnect from "../../../utilities/mongo"
import Topping from "../../../models/Topping"

export default async function handler(req, res) {
    // adding cookies for auth
    // const {method, cookies} = req;
    const {method, } = req;

    // adding this for auth
    // const token = cookies.token

    dbConnect();

    if(method === "GET"){
        try{
            const toppings = await Topping.find();
            res.status(200).json(toppings);
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
            //1. check if Topping exists with the name from form (req.body.title contains the pizza name) -> const await Topping.find
            const duplicateTopping = await Topping.findOne({title: req.body.title})
            console.log("***********DUPLICATE Topping", duplicateTopping);
            if(duplicateTopping === null){
                const topping = await Topping.create(req.body);
                res.status(201).json(topping)
            }else{
                throw{errors: {title: {message: "Pizza name is taken"}}}
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
}