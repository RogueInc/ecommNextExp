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
  const { dispatch, state } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   // Check if the user is already authenticated
  //   if (state.isAuthenticated) {
  //     // Redirect to the homepage if already logged in
  //     router.push('/Account');
  //   }
  // }, [state.isAuthenticated, router]);

  const [formData, setFormData] = useState({
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
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      console.log(data.userId);
      console.log(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", data.userId);

      dispatch({
        type: "LOGIN",
        payload: { user: data.userId },
      });
      router.push("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // useEffect(() => {
  //   fetch("http://localhost:8080")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setMessage(data.message);
  //     });
  // }, []);

  return (
    <div className={styles.logpage}>
        {/* {message} */}
        <Image
          src="/Images/login.jpg"
          fill
          style={{ objectFit: "cover",zIndex:-10 }}
        ></Image>
      <div className={styles.loginpage}>
        <form className={styles.form} onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <h2>
          Don't have an account?
          <Link href="/Signup">
            <b>Sign up</b>
          </Link>
        </h2>
      </div>
    </div>
  );
}
