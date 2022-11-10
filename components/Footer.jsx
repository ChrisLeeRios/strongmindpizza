import Image from "next/image";
import styles from "../styles/Footer.module.css"

const Footer = () => {
    return (
        <div className={styles.container} >
            <div className={styles.item} >
                <Image src="/img/bg.png" style={{objectFit:"cover"}} fill alt="" />
            </div>
            <div className={styles.item} >
                <div className={styles.card} >
                    <h2 className={styles.motto} >
                        THE ALL NEW "I REALLY HOPE YOU HIRE ME" PIZZA IS AVAILABLE!
                    </h2>
                </div>
                <div className={styles.card} >
                    <h1 className={styles.title} >FIND OUR RESTAURANTS</h1>
                    <p className={styles.text} >
                        1930 Newbold Ave #917
                        <br /> Bronx, New York, 10472
                        <br /> 347 373 3061
                    </p>
                    <p className={styles.text} >
                        1930 Newbold Ave #917
                        <br /> Bronx, New York, 10472
                        <br /> 347 373 3061
                    </p>
                    <p className={styles.text} >
                        1930 Newbold Ave #917
                        <br /> Bronx, New York, 10472
                        <br /> 347 373 3061
                    </p>
                    <p className={styles.text} >
                        1930 Newbold Ave #917
                        <br /> Bronx, New York, 10472
                        <br /> 347 373 3061
                    </p>
                </div>
                <div className={styles.card} >
                    <h1 className={styles.title} >WORKING HOURS</h1>
                    <p className={styles.text} >
                        MONDAY - FRIDAY
                        <br/> 12:00 - 8:00
                    </p>
                    <p className={styles.text} >
                        SATURDAY - SUNDAY
                        <br/> 12:00 - 10:00
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;