"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
import styles from "./page.module.css";
import Image from "next/image";

function page() {
  const router=useRouter()
  const [items, setItems] = useState([]);
  const par = useParams();
  const pathname = usePathname()
  console.log(par);
  useEffect(() => {
    // Fetch the entire list of items
    const fetchData = async () => {
      try {
        // Replace the following line with your actual API call to fetch items
        const response = await fetch(
          `http://localhost:8080/filter?category=${par.category}&gender=Women`
        );
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.products}>
      {items.map((item) => (
        <div className={styles.productcards} onClick={()=>{router.push(`${pathname}/${item._id}`)}}>
          <Image
            src={item.images[0]}
            fill
            style={{ objectFit: "cover" }}
          ></Image>
          <div className={styles.cardcontent}>
            <div className={styles.titlebox}>
              <h1 className={styles.cardtitle}>{item.name}</h1>
            </div>
            <div className={styles.iconbox}>
              <h1 className={styles.cardtitle}>{item.price}</h1>
              <button className={styles.cardbutton}>
                <Image src="/Images/wishlist.png" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default page;
