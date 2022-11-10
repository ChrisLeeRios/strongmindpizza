import styles from "../styles/Add.module.css";

const AddToppingButton = ({ setCloseTopping, setToppings }) => {

    const handleClick = () =>{
        setCloseTopping(false);
    }



    return (
        <div onClick={handleClick} className={styles.mainAddButton}>
            Add New Topping
        </div>
    );
};

export default AddToppingButton;