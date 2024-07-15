"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";

function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/findreviews?product=${productId}`
        );
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {reviews.map((Review) => (
        <div className={styles.Reviewsbox}>
          <div className={styles.firstline}>
            <button className={styles.rating}>
              {Review.stars}
              <Image src="/Images/star.png" width={10} height={10} />
            </button>
            <h1>{Review.head}</h1>
          </div>
          <div className={styles.secondline}>
            <p>{Review.desc}</p>
          </div>
          <div className={styles.thirdline}>
            <h1>Fit:{Review.fit}</h1>
            <h1>{Review.user.name}</h1>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Reviews;
