import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import Edit from "../../components/Edit"
import EditTopping from "../../components/EditTopping";

const Index = ({ orders, products, toppings }) => {
    const [close, setClose] = useState(true);
    const [closeTopping, setCloseTopping] = useState(true);
    const [editId, setEditId] = useState(0)
    const [pizzaList, setPizzaList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const [toppingList, setToppingList] = useState(toppings);
    // const [thePizzaOptions, setThePizzaOptions] = useState([]);
    
    const status = ["preparing", "on the way", "delivered"];

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const res = await axios.delete(
                "https://strongmindpizza-x9qh.vercel.app/api/products/" + id
            );
            setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteTopping = async (id) => {
        console.log(id);
        try {
            const res = await axios.delete(
                "https://strongmindpizza-x9qh.vercel.app/api/toppings/" + id
            );
            setToppingList(toppingList.filter((topping) => topping._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    // This is new
    const handleEdit = (id) => {
        setEditId(id);
        setClose(false);
            console.log(id)
        };

    // This is new
    const handleEditTopping = (id) => {
        setEditId(id);
        setCloseTopping(false);
            console.log(id)
        };

    const handleStatus = async (id) => {
        const item = orderList.filter((order) => order._id === id)[0];
        const currentStatus = item.status;

        try {
            const res = await axios.put("https://strongmindpizza-x9qh.vercel.app/api/orders/" + id, {
                status: currentStatus + 1,
            });
            setOrderList([
                res.data,
                ...orderList.filter((order) => order._id !== id),
            ]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.container} >
            <div className={styles.item} >
                <h1 className={styles.title} >Products</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </tbody>
                    {pizzaList.map((product) => (
                        <tbody key={product._id}>
                            <tr className={styles.trTitle}>
                                <td>
                                    <Image
                                        src={product.img}
                                        width={50}
                                        height={50}
                                        style={{ objectFit: "cover" }}
                                        alt=""
                                    />
                                </td>
                                <td>{product._id.slice(0, 5)}...</td>
                                <td>{product.title}</td>
                                <td>${product.prices[0]}</td>
                                <td>
                                    <button className={styles.button} onClick={() => handleEdit(product._id)} >Edit</button>
                                    <button
                                        className={styles.button}
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            <div className={styles.item} >
                <h1 className={styles.title} >Toppings</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Title</th>
                        </tr>
                    </tbody>
                    {toppingList.map((topping) => (
                        <tbody key={topping._id}>
                            <tr className={styles.trTitle}>
                                <td>{topping.title}</td>
                                <td>
                                    <button className={styles.button} onClick={() => handleEditTopping(topping._id)} >Edit</button>
                                    <button
                                        className={styles.button}
                                        onClick={() => handleDeleteTopping(topping._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            {/* <div className={styles.item} >
                <h1 className={styles.title} >Orders</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Id</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </tbody>
                    {orderList.map((order) => (
                        <tbody key={order._id} >
                            <tr className={styles.trTitle}>
                                <td>{order._id.slice(0, 5)}...</td>
                                <td>{order.customer}</td>
                                <td>${order.total}</td>
                                <td>
                                    {order.method === 0 ? <span>Cash</span> : <span>Paid</span>}
                                </td>
                                <td>{status[order.status]}</td>
                                <td>
                                    <button onClick={() => handleStatus(order._id)}>Next Stage</button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div> */}
            {!close && <Edit toppings={toppings} setPizzaList={setPizzaList} setClose={setClose} editId={editId} thePizza={pizzaList.filter((pizza) => pizza._id === editId)}  />}
            {!closeTopping && <EditTopping setToppingList={setToppingList} setCloseTopping={setCloseTopping} editId={editId} theTopping={toppingList.filter((topping) => topping._id === editId)}  />}
        </div>
    )
};

// with cookie authentification

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";

    if (myCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            },
        };
    }

    const productRes = await axios.get("https://strongmindpizza-x9qh.vercel.app/api/products");
    const orderRes = await axios.get("https://strongmindpizza-x9qh.vercel.app/api/orders");
    const toppingRes = await axios.get("https://strongmindpizza-x9qh.vercel.app/api/toppings");

    return {
        props: {
            orders: orderRes.data,
            products: productRes.data,
            toppings: toppingRes.data,
        },
    };
};

// Without cookie authentification

// export const getServerSideProps = async () => {
//     const productRes = await axios.get("https://strongmindpizza-x9qh.vercel.app/api/products");
//     const orderRes = await axios.get("https://strongmindpizza-x9qh.vercel.app/api/orders");

//     return {
//         props: {
//             orders: orderRes.data,
//             products: productRes.data
//         },
//     };
// };

export default Index;