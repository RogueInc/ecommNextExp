'use client'
import styles from './Explore.module.css'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

function Exploreimg() {
    const[blurMen,setBlurMen]=useState(styles.exploremen)
    const[blurWomen,setBlurWomen]=useState(styles.explorewomen)
    const router = useRouter()

    const handleRedirectMen = () => {
        router.push('/Men')
      }
    const handleRedirectWomen = () => {
        router.push('/Women')
      }

    function handleimghover(){
        setBlurWomen(styles.explorewomen2)
    }
    function handleimghoverremove(){
        setBlurWomen(styles.explorewomen)
    }
    function handleimghoverwomen(){
        setBlurMen(styles.exploremen2)
    }
    function handleimghoverremovewomen(){
        setBlurMen(styles.exploremen)
    }
  return (
    <div className={styles.exploreimgs}>
          <div className={blurMen} style={{ position: "relative" }} onMouseEnter={handleimghover} onMouseLeave={handleimghoverremove} onClick={handleRedirectMen}>
            <Image
              src="/Images/exploremen.jpg"
              fill
              style={{ objectFit: "cover" }}
            ></Image>
            <h1 className={styles.exploretitle}>For him</h1>
          </div>
          <div className={blurWomen} style={{ position: "relative" }} onMouseEnter={handleimghoverwomen} onMouseLeave={handleimghoverremovewomen} onClick={handleRedirectWomen}>
            <Image
              src="/Images/explorewomen.jpg"
              fill
              style={{ objectFit: "cover" }}
            ></Image>
            <h1 className={styles.exploretitle}>For her</h1>
          </div>
        </div>
  )
}

export default Exploreimg