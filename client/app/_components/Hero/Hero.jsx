
import styles from "./Hero.module.css";
import Exploreimgs from '../../_components/Exploreimg/Exploreimg'

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.explore}>
        <div className={styles.explorevideo}>
          <video autoPlay muted loop>
            <source src="/Videos/explorevid2.mp4" type="video/mp4"/>
          </video>
          <h1 className={styles.exploretitlevid}>Fashion for your soul</h1>
        </div>
        <Exploreimgs/>
      </div>
    </section>
  );
}

export default Hero;
