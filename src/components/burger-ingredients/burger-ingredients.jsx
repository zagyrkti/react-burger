import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';
import IngredientDetails from "../ingredient-details/ingredient-details";
import ingredientShape from '../../utils/proptypes'
import PropTypes from "prop-types";
import IngredientCard from "../ingredient-card/ingredient-card";

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one')

  const [modalState, setModalState] = React.useState(false);
  const [clickedIngredient, setClickedIngredient] = React.useState({})

  const changeModalState = () => {
    setModalState(!modalState);
  }

  const handleIngredientClick = (event, item) => {
    changeModalState();
    setClickedIngredient(item);
  }

  const buns = props.ingredientData.buns;
  const sauce = props.ingredientData.sauce;
  const main = props.ingredientData.main;


  return (
      <section className={styles.ingredients}>
        <h2 className="text text_type_main-large mt-10">Соберите бургер</h2>
        <div className={`${styles.tabs} mt-5 mb-10`}>
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>

        <div className={`${styles.ingredientsList} custom-scroll pr-2`}>

          <div className={`${styles.ingredientsSubtype} mb-10`}>
            <h2 className="text text_type_main-medium">Булки</h2>
            <div className={`${styles.ingredientsSubtypeList} pl-4`}>

              {buns.map((item) =>
                  <IngredientCard key={item._id} ingredient={item}
                                  onClick={handleIngredientClick}
                  />
              )}

            </div>
          </div>

          <div className={`${styles.ingredientsSubtype} mb-10`}>
            <h2 className="text text_type_main-medium">Соусы</h2>
            <div className={`${styles.ingredientsSubtypeList} pl-4`}>

              {sauce.map((item) =>
                <IngredientCard key={item._id} ingredient={item}
                                onClick={handleIngredientClick}
                />
              )}

            </div>
          </div>

          <div className={`${styles.ingredientsSubtype} mb-10`}>
            <h2 className="text text_type_main-medium">Начинки</h2>
            <div className={`${styles.ingredientsSubtypeList} pl-4`}>

              {main.map((item) =>
                  <IngredientCard key={item._id} ingredient={item}
                                  onClick={handleIngredientClick}
                  />
              )}

            </div>
          </div>

        </div>

        {modalState &&
        <IngredientDetails onClose={changeModalState} ingredient={clickedIngredient}/>}

      </section>
  )
}

BurgerIngredients.propTypes = {
  ingredientData: PropTypes.shape({
    buns: PropTypes.arrayOf(ingredientShape).isRequired,
    main: PropTypes.arrayOf(ingredientShape).isRequired,
    sauce: PropTypes.arrayOf(ingredientShape).isRequired,
  }).isRequired
}

export default BurgerIngredients;
