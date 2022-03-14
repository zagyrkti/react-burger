import React, { useEffect, useMemo, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';
import IngredientDetails from "../ingredient-details/ingredient-details";
import IngredientCard from "../ingredient-card/ingredient-card";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_INGREDIENT_TO_SELECTED,
  RESET_SELECTED_INGREDIENT,
  SWITCH_INGREDIENT_DETAILS_MODAL_STATE
} from '../../services/actions';

function BurgerIngredients() {
  const dispatch = useDispatch();

  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const modalState = useSelector((store) => store.IngredientDetails.isModalOpen);
  const clickedIngredient = useSelector((store) => store.IngredientDetails.selectedIngredient)

  const [current, setCurrent] = React.useState('one')

  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();
  const containerRef = useRef();

  const handleTabClick = (tabName) => {
    setCurrent(tabName);
    switch (tabName) {
      case 'one': {
        bunRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'two': {
        sauceRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'three': {
        mainRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      default:
    }
  }

  const handleIngredientDetailsClose = () => {
    dispatch({
      type: SWITCH_INGREDIENT_DETAILS_MODAL_STATE
    })
    dispatch({
      type: RESET_SELECTED_INGREDIENT
    })
  }

  const handleIngredientClick = (event, item) => {
    dispatch({
      type: ADD_INGREDIENT_TO_SELECTED,
      payload: item,
    });
    dispatch({
      type: SWITCH_INGREDIENT_DETAILS_MODAL_STATE
    })
  }

  useEffect(() => {
    const setNearestTab = () => {

      const bunRect = bunRef.current?.getBoundingClientRect();
      const sauceRect = sauceRef.current?.getBoundingClientRect();
      const mainRect = mainRef.current?.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();

      if (Math.abs(containerRect.top - bunRect.top) < 140) {
        setCurrent('one')
        return;
      }

      if (Math.abs(containerRect.top - sauceRect.top) < 140) {
        setCurrent('two')
        return;
      }

      if (Math.abs(containerRect.top - mainRect.top) < 140) {
        setCurrent('three')
      }
    }

    containerRef.current.addEventListener("scroll", setNearestTab);

    return () => {
      containerRef.current.removeEventListener('scroll', setNearestTab)
    };

  }, [containerRef])

  const ingredientsCards = useMemo(() => {
    const buns = [];
    const sauce = [];
    const main = [];

    ingredients.forEach((ingredient) => {
      switch (ingredient.type) {
        case 'main':
          main.push(
              <IngredientCard key={ingredient._id} ingredient={ingredient}
                              onClick={handleIngredientClick} />
          );
          break
        case 'sauce':
          sauce.push(
              <IngredientCard key={ingredient._id} ingredient={ingredient}
                              onClick={handleIngredientClick} />
          );
          break
        case 'bun':
          buns.push(
              <IngredientCard key={ingredient._id} ingredient={ingredient}
                              onClick={handleIngredientClick} />
          );
          break;
        default:
          console.log('ingredients switch fail')
      }
    })

    return { buns, sauce, main }
  }, [ingredients])


  return (
      <section className={styles.ingredients}>
        <h2 className="text text_type_main-large mt-10">Соберите бургер</h2>
        <div className={`${styles.tabs} mt-5 mb-10`}>
          <Tab value="one" active={current === 'one'} onClick={handleTabClick}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={handleTabClick}>
            Соусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={handleTabClick}>
            Начинки
          </Tab>
        </div>

        <div className={`${styles.ingredientsList} custom-scroll pr-2`} ref={containerRef}>
          <div className={`${styles.ingredientsSubtype} mb-10`} ref={bunRef}>
            <h2 className="text text_type_main-medium">Булки</h2>
            <div className={`${styles.ingredientsSubtypeList} pl-4`}>
              {ingredientsCards.buns}
            </div>
          </div>

          <div className={`${styles.ingredientsSubtype} mb-10`} ref={sauceRef}>
            <h2 className="text text_type_main-medium">Соусы</h2>
            <div className={`${styles.ingredientsSubtypeList} pl-4`}>
              {ingredientsCards.sauce}
            </div>
          </div>

          <div className={`${styles.ingredientsSubtype} mb-10`} ref={mainRef}>
            <h2 className="text text_type_main-medium">Начинки</h2>
            <div className={`${styles.ingredientsSubtypeList} pl-4`}>
              {ingredientsCards.main}
            </div>
          </div>
        </div>

        {modalState &&
            <Modal onClose={handleIngredientDetailsClose}>
              <IngredientDetails ingredient={clickedIngredient} />
            </Modal>
        }

      </section>
  )
}

export default BurgerIngredients;
