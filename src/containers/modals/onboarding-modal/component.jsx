import { Modal } from 'he-components';
import React from 'react';
import styles from './styles.module';
import { T } from '@transifex/react';

export const OnBoardingModalComponent = ({
  isOpen,
  title,
  description,
  handleBack,
  handleClose,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
      <div className={styles.modalContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttons}>
          <button className={styles.backBtn} onClick={handleBack} type="button">
            <T _str="Back home" />
          </button>
          <button
            className={styles.exploreBtn}
            onClick={handleClose}
            type="button"
          >
            <T _str="Explore" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OnBoardingModalComponent;
