import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Edit = ({ setClose, editId, thePizza, setPizzaList, toppings }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(thePizza[0].title);
    const [desc, setDesc] = useState(thePizza[0].desc);
    const [prices, setPrices] = useState(thePizza[0].prices);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extra, setExtra] = useState(null);

    useEffect(()=>{
        setExtraOptions(thePizza[0].extraOptions)
    }, [extraOptions])

    console.log(thePizza)
    console.log("this is the extra options",extraOptions)

    const handleDeleteTopping = (id) => {
        setExtraOptions(extraOptions.filter((option) => option._id !== id));
    console.log("this is the extra options now",extraOptions)
    }

    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices(currentPrices);
    };

    const handleExtraInput = (e) => {
        // setExtra({ ...extra, [e.target.name]: e.target.value });
        setExtra({ ...extra, title: e.target.value });

    };

    const handleExtra = (e) => {
        // setExtraOptions([...thePizza[0].extraOptions, extra]);
        setExtraOptions((prev) => [...prev, extra]);
    };

    const handleClick = () => {
        // setThePizza(null);
        setClose(true);
    }


    const handleUpdate = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads");
        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/debesd8bc/image/upload",
                data
            );

            const { url } = uploadRes.data;
            const newProductData = {
                title,
                desc,
                prices,
                extraOptions,
                img: url,
            };

            const updatedProduct = await axios.put(`http://localhost:3000/api/products/${thePizza[0]._id}`, newProductData);
            setClose(true);
            setPizzaList((pizzaList) => {
                return pizzaList.map((pizza) => {
                    if (pizza._id === thePizza[0]._id) {
                        return updatedProduct.data
                    }
                    return pizza
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
                <h1>Update Pizza</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Choose an image</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Title</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Desc</label>
                    <textarea
                        rows={4}
                        type="text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Prices</label>
                    <div className={styles.priceContainer}>
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder="Small"
                            value={prices[0]}
                            onChange={(e) => changePrice(e, 0)}
                        />
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder="Medium"
                            value={prices[1]}
                            onChange={(e) => changePrice(e, 1)}
                        />
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder="Large"
                            value={prices[2]}
                            onChange={(e) => changePrice(e, 2)}
                        />
                    </div>
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Toppings</label>
                    <div className={styles.extra}>
                        <select id="toppingSelection" onChange={(e) => { handleExtraInput(e) }} >
                            <option value="">Select your option</option>
                            {toppings.map((topping) => (
                                <option value={topping.title} key={topping.title} className={styles.extraItem}>
                                    {topping.title}
                                </option>
                            ))}
                        </select>
                        {/* <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="text"
                            placeholder="Item"
                            name="text"
                            onChange={handleExtraInput}
                        />
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder="Price"
                            name="price"
                            onChange={handleExtraInput}
                        /> */}
                        <button className={styles.extraButton} onClick={handleExtra}>
                            Add
                        </button>
                    </div>
                        <h4>CLick Topping To Delete</h4>
                    <div className={styles.extraItems}>
                        {/* This is where I need to list the ingredients and avoid adding duplicates */}
                        {extraOptions.map((option) => (
                            <span key={option._id} className={styles.extraItem} onClick={() => handleDeleteTopping(option._id)} >
                                {option.title}
                            </span>
                        ))}
                    </div>
                </div>
                <button className={styles.addButton} onClick={handleUpdate}>
                    Update
                </button>
            </div>
        </div>
    );
};

export default Edit;