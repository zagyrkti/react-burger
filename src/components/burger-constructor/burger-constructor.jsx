import styles from './burger-constructor.module.css';
import { ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import currencyIconBig from '../../images/Subtract.svg'
import React, { useEffect } from "react";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import ConstructorToppingCard from '../constructor-topping-card/constructor-topping-card';
import {
  ADD_BUN_TO_CONSTRUCTOR, ADD_TOPPING_TO_CONSTRUCTOR,
  CALCULATE_CONSTRUCTOR_TOTAL, REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  placeOrderAction, SWITCH_ORDER_DETAILS_MODAL_STATE, UPDATE_TOPPING_ORDER
} from '../../services/actions';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.order.isModalOpen);

  const constructorIngredients = useSelector((store) => store.burgerConstructor.topping);
  const bun = useSelector((store) => store.burgerConstructor.bun);
  const total = useSelector((store) => store.burgerConstructor.constructorTotal);


  const changeOderModalState = () => {
    dispatch({
      type: SWITCH_ORDER_DETAILS_MODAL_STATE
    })
  }

  const getIngredientsPropertyValues = (topping, bun, property) => {
    const id = [];
    topping.forEach((ingredient) => id.push(ingredient[property]));
    if (bun) {
      id.push(bun[property])
      id.push(bun[property])
    }
    return id;
  }

  const handleOrder = () => {
    setTimeout(changeOderModalState, 250);
    const idList = getIngredientsPropertyValues(constructorIngredients, bun, '_id')
    dispatch(placeOrderAction(idList));
  }


  const handleDeleteBtnClick = (uuid) => {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      payload: uuid,
    })
  }

  const onDropHandler = ({ ingredient }) => {
    const uuid = uuidv4();
    if (ingredient.type !== 'bun') {
      dispatch({
        type: ADD_TOPPING_TO_CONSTRUCTOR,
        payload: { ...ingredient, uuid }
      })
    }
    if (ingredient.type === 'bun') {
      dispatch({
        type: ADD_BUN_TO_CONSTRUCTOR,
        payload: ingredient
      })
    }
  }

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = constructorIngredients[dragIndex];

    const coppiedStateArray = [...constructorIngredients];
    coppiedStateArray.splice(dragIndex, 1,);
    coppiedStateArray.splice(hoverIndex, 0, dragItem);

    dispatch({
      type: UPDATE_TOPPING_ORDER,
      payload: coppiedStateArray
    });
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      onDropHandler(ingredient);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  useEffect(() => {
    dispatch({
      type: CALCULATE_CONSTRUCTOR_TOTAL
    })
  }, [constructorIngredients, bun])


  const constructedBurgerTargeted = isHover ? styles.constructedBurgerTargeted : '';

  return (
      <section className={`${styles.burgerConstructor} mt-20 pl-4`}>
        <div className={`${styles.constructedBurger} ${constructedBurgerTargeted} pt-5 pb-5`} ref={dropTarget}>
          <div className={`pl-7 ${styles.bunWrapper}`} >
              {!!bun.type &&
                  <ConstructorElement type="top"
                                      isLocked={true}
                                      text={`${bun.name} (верх)`}
                                      price={bun.price}
                                      thumbnail={bun.image}
                  />}

            {!bun.type &&
                <div className={`${styles.placeholderBun} ${styles.placeholderBunTypeTop}`}>Перетащите булку по вкусу</div>
                }
          </div>

          <div className={`${styles.innerIngredients} custom-scroll pr-2`}>
            {constructorIngredients.map((ingredient, index) => {
                  return (
                      <ConstructorToppingCard key={ingredient.uuid}
                                              ingredient={ingredient}
                                              index={index}
                                              moveCard={moveCardHandler}
                                              onClose={handleDeleteBtnClick}
                      />
                  )
                }
            )}
            {!constructorIngredients.length &&
              <p className={styles.callText}>Накидайте начинки</p>
            }
          </div>

          <div className={`pl-7 ${styles.bunWrapper}`} >
            {!!bun.type &&
                <ConstructorElement type="bottom"
                                    isLocked={true}
                                    text={`${bun.name} (низ)`}
                                    price={bun.price}
                                    thumbnail={bun.image}
                />}
            {!bun.type &&
                <div className={`${styles.placeholderBun} ${styles.placeholderBunTypeBottom}`}>Перетащите булку по вкусу</div>
            }
          </div>
        </div>

        <div className={`${styles.info} mt-5 pr-4`}>
          <span className="text text_type_digits-medium mr-2">{total}</span>
          <img src={currencyIconBig} alt="" />
          <span className="pr-10"> </span>
          <Button type="primary" size="large" onClick={handleOrder}>
            Оформить заказ
          </Button>
        </div>

        {modalState &&
            <Modal onClose={changeOderModalState}>
              <OrderDetails />
            </Modal>
        }

      </section>
  )
}

export default BurgerConstructor;
