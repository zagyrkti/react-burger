import styles from './registration.module.css'

function Registration({ children }) {

  return (
      <main className={styles.main}>
        <section className={styles.registration}>
          {children}
        </section>
      </main>
  )
}

export default Registration;

