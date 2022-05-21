import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import React, { FC, useCallback } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import disableScroll from 'disable-scroll';

const modalRoot = document.getElementById("modal")!;

interface IModal {
  onClose: () => void;
}

const Modal: FC<IModal> = (props) => {

  const { onClose } = props;

  const handleCloseByEsc = useCallback((event) => {
    if (event.key === "Escape") {
      onClose();
    }
  }, [onClose])

  React.useEffect(() => {
    document.addEventListener("keydown", handleCloseByEsc);
    /*disableScroll.on();*/

    return () => {
      document.removeEventListener("keydown", handleCloseByEsc);
      /*disableScroll.off();*/
    }
  }, [handleCloseByEsc])


  return ReactDOM.createPortal(
      <ModalOverlay onClick={props.onClose}>
        <div className={`${styles.modal}`} data-test='modal'>
          <span className={styles.closeButton} data-test='modal_close-button'><CloseIcon type="primary" onClick={props.onClose}/></span>
          {props.children}
        </div>
      </ModalOverlay>,
      modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default Modal;
