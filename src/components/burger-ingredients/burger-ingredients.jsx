import React from "react";
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';
import IngredientDetails from "../ingredient-details/ingredient-details";
import ingredientShape from '../../utils/proptypes'
import PropTypes from "prop-types";

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
                  <div className={`${styles.ingredientCard} mt-6`} key={item._id}
                       onClick={(event) => handleIngredientClick(event, item)}
                  >
                    <Counter count={1} size="default"/>
                    <img src={item.image} alt="" className={`${styles.ingredientImage} pl-4 pr-4`}/>
                    <div className={`${styles.price} mt-1`}>
                      <span className="text text_type_digits-default mr-2">{item.price}</span>
                      <CurrencyIcon type="primary"/>
                    </div>
                    <p className={`${styles.ingredientName} mt-2 text text_type_main-default`}>{item.name}</p>
                  </div>
              )}

            </div>
          </div>

          <div className={`${styles.ingredientsSubtype} mb-10`}>
            <h2 className="text text_type_main-medium">Соусы</h2>
            <div className={`${styles.ingredientsSubtypeList} pl-4`}>

              {sauce.map((item) =>
                  <div className={`${styles.ingredientCard} mt-6`} key={item._id}
                       onClick={(event) => handleIngredientClick(event, item)}
                  >
                    <Counter count={1} size="default"/>
                    <img src={item.image} alt="" className={`${styles.ingredientImage} pl-4 pr-4`}/>
                    <div className={`${styles.price} mt-1`}>
                      <span className="text text_type_digits-default mr-2">{item.price}</span>
                      <CurrencyIcon type="primary"/>
                    </div>
                    <p className={`${styles.ingredientName} mt-2 text text_type_main-default`}>{item.name}</p>
                  </div>
              )}

            </div>
          </div>

          <div className={`${styles.ingredientsSubtype} mb-10`}>
            <h2 className="text text_type_main-medium">Начинки</h2>
            <div className={`${styles.ingredientsSubtypeList} pl-4`}>

              {main.map((item) =>
                  <div className={`${styles.ingredientCard} mt-6`} key={item._id}
                       onClick={(event) => handleIngredientClick(event, item)}
                  >
                    <Counter count={1} size="default"/>
                    <img src={item.image} alt="" className={`${styles.ingredientImage} pl-4 pr-4`}/>
                    <div className={`${styles.price} mt-1`}>
                      <span className="text text_type_digits-default mr-2">{item.price}</span>
                      <CurrencyIcon type="primary"/>
                    </div>
                    <p className={`${styles.ingredientName} mt-2 text text_type_main-default`}>{item.name}</p>
                  </div>
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
    buns: PropTypes.arrayOf(ingredientShape),
    main: PropTypes.arrayOf(ingredientShape),
    sauce: PropTypes.arrayOf(ingredientShape),
  })
}

export default BurgerIngredients;
