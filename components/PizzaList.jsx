import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({pizzaList}) => {
    return (
        <div className={styles.container} >
            <h1 className={styles.title} >PIZZA FOR THE STRONGEST MINDS</h1>
            <p className={styles.desc}>This Pizza Will Add Plus 10 Intellect. Its flavor
                alone will blow your mind but alas, as your mind is blown, it will expand beyond
                your wildest dreams. This is because your dreams are limited by your mind which
                is actively being expanded by the aformentioned pizza.</p>
            <div className={styles.wrapper} >
                {pizzaList.map((pizza) =>(
                    <PizzaCard key={pizza._id} pizza={pizza}/>
                ))}
            </div>
        </div>
    );
};

export default PizzaList;