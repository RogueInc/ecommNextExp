'use client'
import Link from "next/link";
import styles from './Navbar.module.css'
import Image from "next/image";
import {useState } from "react";
import {useAuth} from '../../_context/authcontext'
import { useRouter } from "next/navigation";

function navbar() {
  const[signedIn,setSignedIn]=useState(false)
  const{state}=useAuth()
  const router = useRouter();
  function handleClick(){
    setSignedIn(!signedIn)
  }
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h2 onClick={()=>{router.push('/')}}>LAnz.inc</h2>
      </div>
      <div className={styles.menu}>
        <Link href='/'><h2>Orders</h2></Link>
        <Link href={state.isAuthenticated?'/Account':'/login'}><button onClick={handleClick}>{(!state.isAuthenticated)?<h1>SignIn</h1>:<h1>Account</h1>}</button></Link>
        <Link href='/Wishlist'><button><Image src='/Images/wishlist.png' width={20} height={20}></Image></button></Link>
        <Link href='/Cart'><button><Image src='/Images/shoppingcart.png' width={20} height={20}></Image></button></Link>
      </div>
    </div>
  )
}

export default navbar