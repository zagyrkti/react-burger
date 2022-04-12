import styles from './ingredient-page.module.css'
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useSelector } from 'react-redux';

function IngredientPage({children}) {

  const clickedIngredient = useSelector((store) => store.ingredientDetails.selectedIngredient)

  return (
      <main className={styles.main}>
        <section className={styles.ingredient}>
          <IngredientDetails ingredient={clickedIngredient} />
        </section>
      </main>
  )
}

export default IngredientPage;