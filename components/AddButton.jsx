import styles from "../styles/Add.module.css";
import axios from "axios"

const AddButton = ({ setClose, setToppings }) => {

    const handleClick = () =>{
        setClose(false);
        axios.get("http://localhost:3000/api/toppings")
        .then((res) => {
            setToppings(res.data);
            console.log("this is the Response", res)
            console.log(res.data)
        })
    }

    return (
        <div onClick={handleClick} className={styles.mainAddButton}>
            Add New Pizza
        </div>
    );
};

export default AddButton;