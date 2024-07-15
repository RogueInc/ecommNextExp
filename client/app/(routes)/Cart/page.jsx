"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from '../../_components/Loader/Loader'

function Cart() {
  const [items, setItems] = useState([]);
  const[quantity,setQuantity]=useState(0);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/cart?userId=${localStorage.getItem("user")}`
        );
        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, []);
  async function handleQuantityChange(productId,change) {
    console.log(change)
    const token = localStorage.getItem("accessToken");
    const UserId = localStorage.getItem("user");
    try {
      const response = await fetch("http://localhost:8080/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, UserId, quantity:change }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const cart = await response.json();

      console.log(cart);
    } catch (error) {
      console.error("Error:", error);
    }
  }
 
  async function handleDeleteProduct(productId) {
    const token = localStorage.getItem("accessToken");
    const UserId = localStorage.getItem("user");
    try {
      const response = await fetch("http://localhost:8080/remove-from-cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, UserId }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      // Update the items state after successful removal
      const updatedItems = items.filter((item) => item.product._id !== productId);
      setItems(updatedItems);
    } catch (error) {
      console.error("Error:", error);
    }
  }


  console.log(items);
  return (
    <div className={styles.cart}>
      <Image src='/Images/cartbg.jpg' fill  style={{ objectFit: "cover",zIndex:-10 }}></Image>
      {items
        ? items.map((item) => (
            <div className={styles.productcards} key={item._id}>
              <div className={styles.cardimg}>
                <Image
                  src={item.product.images[0]}
                  fill
                  style={{ objectFit: "cover", zIndex: 10 }}
                  onClick={() => {
                    router.push(
                      `/${item.product.gender}/trousers/${item.product._id}`
                    );
                  }}
                ></Image>
              </div>
              <div className={styles.cardinfo}>
                <p>{item.product.name}</p>
                <p>{item.product.price}</p>
                <div className={styles.quantity}>
                  <button onClick={()=>{handleDeleteProduct(item.product._id)}}>
                    <Image
                      width={18}
                      height={18}
                      src={"/Images/delete.png"}
                    ></Image>
                  </button>
                  <div className={styles.buttonbox}>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          1
                        )
                      }
                    >
                      +
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          -1
                        )
                      }
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        : <Loader/>}
    </div>
  );
}

export default Cart;
