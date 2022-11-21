import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";

const AddTopping = ({ setCloseTopping }) => {
    const [title, setTitle] = useState(null);

    const handleCreate = async () => {
        try {
            const newTopping = {
                title
            };

            await axios.post("https://strongmindpizza-x9qh-j872e9wfp-chrisleerios.vercel.app/api/toppings", newTopping);
            setCloseTopping(true);
        } catch (err) {
            console.log("err is this", err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span onClick={() => setCloseTopping(true)} className={styles.close}>
                    X
                </span>
                <h1>Add a new Topping</h1>
                
                <div className={styles.item}>
                    <label className={styles.label}>Title</label>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button className={styles.addButton} onClick={handleCreate}>
                    Create
                </button>
            </div>
        </div>
    );
};

export default AddTopping;