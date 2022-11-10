import dbConnect from "../../../utilities/mongo";
import Topping from "../../../models/Topping";

export default async function handler(req, res) {
    const {
        method,
        query: { id },
    } = req;

    dbConnect();

    if (method === "GET") {
        try {
            const topping = await Topping.findById(id);
            res.status(200).json(topping);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    if (method === "PUT") {
        try {
            const topping = await Topping.findByIdAndUpdate(id, req.body,{
                new:true,
            });
            res.status(201).json(topping);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    if (method === "DELETE") {
        try {
            await Topping.findByIdAndDelete(id);
            res.status(200).json("Topping Deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
