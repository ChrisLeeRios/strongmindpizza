import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import AddToppingButton from "../components/AddToppingButton";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import AddTopping from "../components/AddTopping";
import { useEffect } from "react";

//admin added for auth

export default function Home({pizzaList, admin }) {
// export default function Home({pizzaList, admin }) {
  // this next line also for cookie auth for amin
  const [close, setClose] = useState(true);
  const [closeTopping, setCloseTopping] = useState(true);
  const [toppings, setToppings] = useState([]);
  // const [res, setRes] = useState(null);
  // const [pizzaList, setPizzaList] = useState(null);
  

  // useEffect(()=>{
  //   const results =  axios.get("http://localhost:3000/api/products");
  //   setRes(results)
  //   setPizzaList(results.data)

  // },[])

  return (
    <div className={styles.container}>
      <Head>
        <title>Strong Mind Pizza</title>
        <meta name="description" content="Please Hire Me =)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />

      {/* added for cookie auth */}
      {admin && <AddButton setClose={setClose} setToppings={setToppings} />}
      {admin && <AddToppingButton setCloseTopping={setCloseTopping} />}

      <PizzaList pizzaList={pizzaList} />

      {/* added for cookie auth */}
      {!close && <Add setClose={setClose} toppings={toppings} />}
      {!closeTopping && <AddTopping setCloseTopping={setCloseTopping} />}
    </div>
  );
}

// With cookie auth

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  console.log("**********BEFORE************")
  const res = await axios.get("http://localhost:3000/api/products");
  console.log("*******************************",res.data)
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };

};



// Without cookie auth

// export const getServerSideProps = async () => {
//   const res = await axios.get("http://localhost:3000/api/products")
//   return{
//     props:{
//       pizzaList: res.data
//     },
//   };
// };
