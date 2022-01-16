import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import React from "react";
import PropTypes from "prop-types";

function Modal(props) {


  return (
      <ModalOverlay onClick={props.onClose}>
        <div className={`${styles.modal}`}>
          <span className={styles.closeButton}><CloseIcon type="primary" onClick={props.onClose}/></span>
          {props.children}
        </div>
      </ModalOverlay>
  )
}

Modal.propTypes = {
  onClose:PropTypes.func,
}

export default Modal;
