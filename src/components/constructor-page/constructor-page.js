import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './constructor-page.module.css';
import PropTypes from "prop-types";
import ingredientShape from "../../utils/proptypes";

function ConstructorPage(props) {

  const ingredientsDataExist =
      props.ingredientsData.main.length
      && props.ingredientsData.buns.length
      && props.ingredientsData.sauce.length;

  return (
      <main className={styles.main}>
        {ingredientsDataExist && <BurgerIngredients ingredientData={props.ingredientsData}/>}
        {ingredientsDataExist && <BurgerConstructor />}
      </main>
  )
}

BurgerIngredients.propTypes = {
  ingredientData: PropTypes.shape({
    buns: PropTypes.arrayOf(ingredientShape),
    main: PropTypes.arrayOf(ingredientShape),
    sauce: PropTypes.arrayOf(ingredientShape),
  })
}

export default ConstructorPage;
