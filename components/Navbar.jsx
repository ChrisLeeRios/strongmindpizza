import styles from "../styles/Navbar.module.css"
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {

    const quantity = useSelector((state) => state.cart.quantity);
    return (
        <div className={styles.container} >
            <div className={styles.item}>
                <div className={styles.callButton} >
                    <Image src="/img/telephone.png" alt="" height="32" width="32" />
                </div>
                <div className={styles.texts} >
                    <div className={styles.text} >ORDER NOW!</div>
                    <div className={styles.text} >347 373 3061</div>
                </div>
            </div>
            <div className={styles.item}>
                <ul className={styles.list} >
                    <Link href="/" >
                        <li className={styles.listItem} >Homepage</li>
                    </Link>
                    <Link href="/admin" >
                        <li className={styles.listItem} >Admin </li>
                    </Link>
                    <li className={styles.listItem} >Menu</li>
                    <Image src="/img/logo.png" alt="" width="260" height="120" />
                    <li className={styles.listItem} >Events</li>
                    <li className={styles.listItem} >Blog</li>
                    <li className={styles.listItem} >Contact</li>
                </ul>
            </div>
            <Link href="/cart" >
                <div className={styles.item}>
                    <div className={styles.cart} >
                        <Image src="/img/cart.png" alt="" width="30" height="30" />
                        <div className={styles.counter} >{quantity}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Navbar;