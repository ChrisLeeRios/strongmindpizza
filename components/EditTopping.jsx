import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";

const EditTopping = ({ setCloseTopping , editId,theTopping, setToppingList}) => {
    const [title, setTitle] = useState(theTopping[0].title);
    console.log(theTopping)


    const handleClick = ()=> {
        // settheTopping(null);
        setCloseTopping(true);
    }


    const handleUpdate = async () => {

        try {
            const newProductData = {
                title
            };

            const updatedProduct =  await axios.put(`https://strongmindpizza-x9qh.vercel.app/api/toppings/${theTopping[0]._id}`, newProductData);
            setCloseTopping(true);
            setToppingList((toppingList) => {
                return toppingList.map((topping) => {
                    if(topping._id === theTopping[0]._id){
                        return updatedProduct.data
                    }
                    return topping
                })
            })

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span onClick={() => handleClick()} className={styles.close}>
                    X
                </span>
                <h1>Update Topping</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Title</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button className={styles.addButton} onClick={handleUpdate}>
                    Update
                </button>
            </div>
        </div>
    );
};

export default EditTopping;