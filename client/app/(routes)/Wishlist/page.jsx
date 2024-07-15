"use client";
import { useEffect, useState } from "react";
import styles from './page.module.css'
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "@/app/_components/Loader/Loader";

function Cart() {
  const [items, setItems] = useState([]);
    const router=useRouter()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/wishlist?userId=${localStorage.getItem("user")}`
        );
        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.cart}>
      {items ? items.map((item) => (
            <div className={styles.productcards} key={item._id}  onClick={()=>{router.push(`/${item.product.gender}/trousers/${item.product._id}`)}}>
            <Image
              src={item.product.images[0]}
              fill
              style={{ objectFit: "cover" }}
            ></Image>
            <div className={styles.cardcontent}>
              <div className={styles.titlebox}>
                <h1 className={styles.cardtitle}>{item.product.name}</h1>
              </div>
              <div className={styles.iconbox}>
                <h1 className={styles.cardtitle}>{item.product.price}</h1>
                <button className={styles.cardbutton}>
                  <Image src="/Images/wishlist.png" width={20} height={20} />
                </button>
              </div>
            </div>
          </div>
        )) : <Loader/>}
    </div>
  );
}

export default Cart;
