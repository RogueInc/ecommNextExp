'use client'
import { useState,useEffect } from 'react';
import React from 'react'

function page() {
const [message, setMessage] = useState("loading");
      useEffect(() => {
        fetch('http://localhost:8080/testlog', {
            headers: {
              'Authorization': `Bearer accessToken`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setMessage(data);
            });
  }, []);
  return (
    <div>{message}</div>
  )
}

export default page