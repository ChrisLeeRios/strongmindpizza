import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";
// import { useRouter } from "next/router";

const Add = ({ setClose, toppings }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [prices, setPrices] = useState([]);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extra, setExtra] = useState(null);

    // console.log(toppings[0].title)

    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices(currentPrices);
    };

    const handleExtraInput = (e) => {
        setExtra({ ...extra, title: e.target.value });
    };

    // let obj = {
    //     title: 'title',
    //     desc: 'desc',
    //     extraOptions: [
    //         1,2,4
    //     ],
    //     _id: 1231231

    // }

    const handleExtra = (e) => {
        setExtraOptions((prev) => [...prev, extra]);
    };

    const handleCreate = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads");
        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/debesd8bc/image/upload",
                data
            );

            const { url } = uploadRes.data;
            const newProduct = {
                title,
                desc,
                prices,
                extraOptions,
                img: url,
            };

            await axios.post("https://strongmindpizza-x9qh.vercel.app/api/products", newProduct);
            setClose(true);
        } catch (err) {
            console.log("err is this", err.response.data.error.message);
            console.log("err is this", err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span onClick={() => setClose(true)} className={styles.close}>
                    X
                </span>
                <h1>Add a new Pizza</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Choose an image</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Title</label>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Desc</label>
                    <textarea
                        rows={4}
                        type="text"
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
                            onChange={(e) => changePrice(e, 0)}
                        />
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder="Medium"
                            onChange={(e) => changePrice(e, 1)}
                        />
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder="Large"
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
                        /> */}
                        {/* <input
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
                    <div className={styles.extraItems}>
                        {/* This is where I need to list the ingredients and avoid adding duplicates */}
                        {extraOptions.map((option) => {
                            console.log("this is the option", option)
                            return (
                                <span key={option.title} className={styles.extraItem}>
                                    {option.title}
                                </span>
                            )
                        })}
                    </div>
                </div>
                <button className={styles.addButton} onClick={handleCreate}>
                    Create
                </button>
            </div>
        </div>
    );
};

export default Add;