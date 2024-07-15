"use client";
import React from "react";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useAuth } from "../../_context/authcontext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function page() {
  // const [message, setMessage] = useState("loading");
  const { dispatch } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      //   console.log(data)
      //   console.log(data.userId)
      //   console.log(data.accessToken)
      //   localStorage.setItem('accessToken', data.accessToken);
      //   localStorage.setItem('user', data.userId);

      //   dispatch({
      //     type: 'LOGIN',
      //     payload: { user: data.userId },
      //   });
      router.push("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={styles.signpage}>
      <Image
        src="/Images/signupbg.jpg"
        fill
        style={{ objectFit: "cover", zIndex: -10 }}
      ></Image>
      <div className={styles.signuppage}>
        {/* {message} */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          {/* Add other form fields as needed */}
          <button type="submit">Create account</button>
        </form>
        <h2>
          Already have an account?
          <Link href="/login">
            <b>Login</b>
          </Link>
        </h2>
      </div>
    </div>
  );
}
