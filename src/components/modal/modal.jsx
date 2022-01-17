import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import React, {useCallback} from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal");

function Modal(props) {

  const {onClose} = props;

  const handleCloseByEsc = useCallback((event) => {
    if (event.key === "Escape") {
      onClose();
    }
  },[onClose])

  React.useEffect(() => {
    document.addEventListener("keydown", handleCloseByEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener("keydown", handleCloseByEsc);
      document.body.style.overflow = 'unset';
    }
  }, [handleCloseByEsc])


  return ReactDOM.createPortal(
      <ModalOverlay onClick={props.onClose}>
        <div className={`${styles.modal}`}>
          <span className={styles.closeButton}><CloseIcon type="primary" onClick={props.onClose}/></span>
          {props.children}
        </div>
      </ModalOverlay>,
      modalRoot
  );
}

Modal.propTypes = {
  onClose:PropTypes.func.isRequired,
}

export default Modal;
