import React from "react";
import styles from "./Loader.module.css";
import { motion } from "framer-motion";

function Loader(){
  const loaderVariants = {
    animationOne: {
      x: [-10,120,240,360,480,620,740,860],
    //   y: [0, -80, 0, -80, 0, -80, 0,-80,0,-80,0,-80,0,-80,0,-80,0,-80,0,],
    //   rotate:[0,45,90,135,180,225,270,315,360],
      rotate:360,
      transition: {
        rotate:{
            yoyo:Infinity,
            duration:2,
            ease:"linear",
        },
        x: {
          yoyo: Infinity,
          duration: 2,
          ease: "linear",
        },
        // y: {
        //   yoyo: Infinity,
        //   duration: 4,
        //   ease: "linear",
        // },
      },
    },
  };

  return (
    <motion.section
    // initial={{opacity:1,y:0}}
    // animate={{opacity:0,y:-1000}}
    // transition={{duration: 0.3, delay: 2, ease: "easeOut" }}
    className={styles.load}>
      <motion.div
        variants={loaderVariants}
        animate="animationOne"
        className={styles.ball}
      >
        <motion.img src="/Images/Loader.svg"></motion.img>
      </motion.div>
      <h1 className={styles.title}>Loading...</h1>
    </motion.section>
  );
};

export default Loader;
