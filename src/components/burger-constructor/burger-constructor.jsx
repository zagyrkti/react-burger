import styles from './burger-constructor.module.css';
import {ConstructorElement, DragIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import currencyIconBig from '../../images/Subtract.svg'
import React from "react";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import ingredientShape from "../../utils/proptypes";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";

function BurgerConstructor(props) {

  const [modalState, setModalState] = React.useState(false);

  const handleModal = () => {
    setModalState(!modalState);
  }

  const buns = props.ingredientData.buns;
  /*const sauce = props.ingredientData.sauce;*/
  const main = props.ingredientData.main;


  return (
      <section className={`${styles.burgerConstructor} mt-25 pl-4`}>
        <div className={`${styles.constructedBurger}`}>
          <span className="pl-2">
              <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${buns[0].name} (верх)`}
                  price={buns[0].price}
                  thumbnail={buns[0].image}
              />
          </span>

          <div className={`${styles.innerIngredients} custom-scroll pr-2`}>
            {
              main.map((item) =>
                  <div className={styles.innerIngredient} key={item._id}>
                    <DragIcon type="primary"/>
                    <span className="pl-2"> </span>
                    <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                    />
                  </div>
              )}
          </div>
          <span className="pl-2">
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${buns[0].name} (низ)`}
                price={buns[0].price}
                thumbnail={buns[0].image}
            />
          </span>
        </div>
        <div className={`${styles.info} mt-10 pr-4`}>
          <span className="text text_type_digits-medium mr-2">610</span>
          <img src={currencyIconBig} alt=""/>
          <span className="pr-10"> </span>
          <Button type="primary" size="large" onClick={handleModal}>
            Оформить заказ
          </Button>
        </div>

        {modalState &&
        <Modal onClose={handleModal}>
          <OrderDetails />
        </Modal>
        }

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

export default BurgerConstructor;
