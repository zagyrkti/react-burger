import styles from './ingredient-page.module.css'
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

function IngredientPage() {

  return (
      <main className={styles.main}>
        <section className={styles.ingredient}>
          <IngredientDetails />
        </section>
      </main>
  )
}

export default IngredientPage;