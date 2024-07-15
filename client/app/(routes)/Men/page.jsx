'use client'
import Image from "next/image";
import styles from "./style.module.css";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const menswear = [
  {
    category: "shirts",
    image:
      "/Images/shirtmen.jpg",
  },
  {
    category: "trousers",
    image:
      "/Images/trousermen.jpg",
  },
  {
    category: "jackets",
    image:
      "/Images/jacketmen.jpg",
  },
  {
    category: "winterwear",
    image:
      "/Images/wintermen.jpg",
  },
  {
    category: "liesurewear",
    image:
      "/Images/liesuremen.jpg",
  },
  {
    category: "officewear",
    image:
      "/Images/officemen.jpg",
  },
];
function page() {
  const router=useRouter()
  const pathname = usePathname()

  return (
    <div className={styles.men}>
      {menswear.map((item, index) => (
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
