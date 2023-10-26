// InstructionModal.js
import React from "react";
import { Modal } from "antd";

const InstructionModal = ({ visible, onClose }) => {
  return (
    <Modal
      title="Instructions"
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      okText="Close"
    >
      <p>Here are the instructions on how to use the app:</p>
      <ul>
        <li>Mark points by clicking on the canvas.</li>
        <li>Draw lines by clicking between points.</li>
        <li>Enter Remove Mode to remove lines.</li>
      </ul>
    </Modal>
  );
};

export default InstructionModal;
