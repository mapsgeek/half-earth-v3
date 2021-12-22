import React from "react";
import { Modal } from "he-components";

// components
import ProtectedAreasTable from 'components/protected-areas-table';

// styles
import styles from "./styles.module";

const ProtectedAreasModal = ({
  isOpen,
  handleModalClose,
  data,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={handleModalClose} theme={styles}>
      <div className={styles.modalContainer}>
        <h1>Protected areas in </h1>
        <ProtectedAreasTable data={data} />
      </div>
    </Modal>
  );
};

export default ProtectedAreasModal;
