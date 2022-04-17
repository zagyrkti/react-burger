import React, { FC, SyntheticEvent } from "react";
import styles from './modal-overlay.module.css';

interface IModalOverlay {
  onClick: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ onClick, children }) => {

  const modalOverlayRef = React.useRef<HTMLDivElement>(null);

  const onOverlayClick = (event: SyntheticEvent) => {
    if (event.target === modalOverlayRef.current) {
      onClick();
    }
  }

  return (
      <div className={styles.modalOverlay} onClick={onOverlayClick} ref={modalOverlayRef}>
        {children}
      </div>
  );
}

export default ModalOverlay;

