'use client'
import Image from "next/image";
import styles from "./style.module.css";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const womenswear = [
  {
    category: "shirts",
    image:
      "/Images/shirtwomen.jpg",
  },
  {
    category: "trousers",
    image:
      "/Images/trouserwomen.jpg",
  },
  {
    category: "jackets",
    image:
      "/Images/jacketwomen.jpg",
  },
  {
    category: "winterwear",
    image:
      "/Images/winterwomen.jpg",
  },
  {
    category: "liesurewear",
    image:
      "/Images/liesurewomen.jpg",
  },
  {
    category: "officewear",
    image:
      "/Images/officewomen.jpg",
  },
];
function page() {
  const router=useRouter()
  const pathname = usePathname()

  return (
    <div className={styles.women}>
      {womenswear.map((item, index) => (
        <div key={index} className={styles.catcard} onClick={()=>{
          router.push(`${pathname}/${item.category}`)
        }}>
          <h2>{item.category}</h2>
          <Image src={item.image} fill style={{ objectFit: "cover" }}></Image>
        </div>
      ))}
    </div>
  );
}

export default page;
