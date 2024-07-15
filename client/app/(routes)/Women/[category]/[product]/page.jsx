"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Reviews from "../../../../_components/Reviews/page";
import Loader from '../../../../_components/Loader/Loader'

function page() {
  const [product, setProduct] = useState([]);
  const par = useParams();
  const sizes = ["S", "M", "L", "XL", "XXL"];
  // console.log(par);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/filter?_id=${par.product}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, []);

  async function addToCart() {
    // Get the token from wherever you're storing it (localStorage, cookies, etc.)
    const productId=par.product
    console.log(localStorage)
    console.log(par.product)
    const token = localStorage.getItem("accessToken");
    console.log(token);
    const UserId = localStorage.getItem("user");
    console.log(UserId);
    const quantity=1;
    try {
      const response = await fetch("http://localhost:8080/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, UserId,quantity }),
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

  async function addToWishlist() {
    // Get the token from wherever you're storing it (localStorage, cookies, etc.)
    const productId=par.product
    console.log(par.product)
    const token = localStorage.getItem("accessToken");
    console.log(token);
    const UserId = localStorage.getItem("user");
    console.log(UserId);
    const quantity=1;
    try {
      const response = await fetch("http://localhost:8080/add-to-wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, UserId,quantity }),
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

  const pr = product[0];
  return (
    <div>
      {pr ? (
        <div className={styles.productpage}>
          <div className={styles.overview}>
            <div className={styles.leftbox}>
              <div className={styles.imgbox}>
                <Image
                  className={styles.leftimg}
                  src={pr.images[0]}
                  fill
                ></Image>
              </div>
            </div>
            <div className={styles.rightbox}>
              <h1>{pr.name}</h1>

              <button className={styles.rating}>
                4.1
                <Image src="/Images/star.png" width={20} height={20} />
              </button>
              <hr></hr>
              <div className={styles.size}>
                <h1>
                  <b>Select a size</b>
                </h1>
                {sizes.map((size) => (
                  <button className={styles.sizebutton}>{size}</button>
                ))}
                <hr />
              </div>
              <div className={styles.desc}>
                <h1>
                  <b>Description</b>
                </h1>
                <p>{pr.description}</p>
              </div>
              <div className={styles.fit}>
                <h1>
                  <b>Fit</b>
                </h1>
                <ul>
                  <li>Slim Fit</li>
                  <li>Size worn by the model: M</li>
                  <li>Chest: 39"</li>
                  <li>Height: 6'</li>
                </ul>
              </div>
              <div className={styles.material}>
                <h1>Material</h1>
                <ul>
                  <li>100% Cotton</li>
                  <li>Machine Wash</li>
                </ul>
              </div>
              <button
                className={styles.addtocart}
                onClick={() => addToCart()}
              >
                <Image
                  src="/Images/shoppingcart.png"
                  width={25}
                  height={25}
                ></Image>
                Add to cart
              </button>
              <button 
               onClick={() => addToWishlist()}
              className={styles.wishlist}>
                <Image
                  src="/Images/wishlist.png"
                  width={25}
                  height={25}
                ></Image>
                Wishlist
              </button>
            </div>
          </div>
          <h1>
            <b>Reviews</b>
          </h1>
          <hr />
          <Reviews productId={pr._id} />
        </div>
      ) : (
        <Loader/>
      )}
    </div>
  );
}

export default page;
