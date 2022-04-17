import React, { ReactNode, useMemo, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';
import IngredientCard from "../ingredient-card/ingredient-card";
import { useAppSelector } from "../../hooks/redux";
import { IIngredient } from "../../shared/types/types";

function BurgerIngredients() {

  const ingredients: Array<IIngredient> = useAppSelector((store) => store.ingredients.ingredients);

  const [current, setCurrent] = React.useState<string>('one')

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tabName: string) => {
    setCurrent(tabName);
    switch (tabName) {
      case 'one': {
        bunRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'two': {
        sauceRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'three': {
        mainRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      default:
    }
  }

  const setNearestTab = () => {

    const bunRect = bunRef.current?.getBoundingClientRect();
    const sauceRect = sauceRef.current?.getBoundingClientRect();
    const mainRect = mainRef.current?.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (!containerRect || !mainRect || !sauceRect || !bunRect) {
      return;
    }

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

  const ingredientsCards = useMemo(() => {
    const buns: Array<ReactNode> = [];
    const sauce: Array<ReactNode> = [];
    const main: Array<ReactNode> = [];

    ingredients.forEach((ingredient) => {
      switch (ingredient.type) {
        case 'main':
          main.push(
              <IngredientCard key={ingredient._id} ingredient={ingredient} />
          );
          break
        case 'sauce':
          sauce.push(
              <IngredientCard key={ingredient._id} ingredient={ingredient} />
          );
          break
        case 'bun':
          buns.push(
              <IngredientCard key={ingredient._id} ingredient={ingredient} />
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
        <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
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

        <div className={`${styles.ingredientsList} custom-scroll pr-2`} ref={containerRef} onScroll={setNearestTab}>
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

        {/*        {clickedIngredient.name &&
            <Modal onClose={handleIngredientDetailsClose}>
              <IngredientDetails/>
            </Modal>
        }*/}

      </section>
  )
}

export default BurgerIngredients;
