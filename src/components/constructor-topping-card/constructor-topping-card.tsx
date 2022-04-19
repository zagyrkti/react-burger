import styles from './constructor-topping-card.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IIngredient, TMoveCardHandler } from "../../shared/types/types";

interface IConstructorToppingCard {
  ingredient: IIngredient,
  index: number,
  onClose: (uuid: string) => void,
  moveCard: TMoveCardHandler,
}

const ConstructorToppingCard: FC<IConstructorToppingCard> = ({ ingredient, index, onClose, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isHover }, drop] = useDrop({

    accept: 'topping',

    collect(monitor) {
      return {
        isHover: monitor.isOver(),
      };
    },
    /* хз как этот unknown item забороть вроде всю цепочку последовательно проверил */
    /*то что существвует проверил то что обджект проверил то что ключ есть проверил, тип ключа проверил*/
    /*все одно ts ошибку не снимает*/
    /*сдался поставил any так или иначе проверка полная вроде*/
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      if (!item || !(typeof item === 'object') || !('index' in item) || (typeof item.index !== 'number')) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()!;
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'topping',
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const draggingStyle = isDragging ? styles.innerIngredientDragging : '';
  /* const stl = isHover ? styles.innerIngredientHover : ''*/

  drop(ref);
  drag(ref);

  return (
      <div className={`${styles.innerIngredient} ${draggingStyle}`} ref={ref}>
        <DragIcon type="primary" />
        <span className="pl-2"> </span>
        <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={() => onClose(ingredient.uuid)}
        />
      </div>
  )
}

export default ConstructorToppingCard;