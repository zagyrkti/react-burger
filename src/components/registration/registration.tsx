import styles from './registration.module.css'
import { FC } from "react";

const Registration: FC = ({ children }) => {

  return (
      <main className={styles.main}>
        <section className={styles.registration}>
          {children}
        </section>
      </main>
  )
}

export default Registration;

