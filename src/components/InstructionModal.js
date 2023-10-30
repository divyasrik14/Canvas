// InstructionModal.js
import React from "react";
import { Modal } from "antd";

const InstructionModal = ({ visible, onClose }) => {
  return (
    <Modal
      title="Instructions"
      open={visible}
      onOk={onClose}
      onCancel={onClose}
      okText="Ok"
      centered
      width={1000}
    >
      <p>Here are the instructions on how to use the app:</p>
      <ul>
        <li>First enter all the x-axis , y-axis values.</li>
        <li>Mark / Unmark points by clicking on the canvas.</li>
        <li>Draw lines by clicking between points.</li>
        <li>Enter Remove Mode to remove lines, once done don't forget to tap on Exit Remove Mode</li>
      </ul>
    </Modal>
  );
};

export default InstructionModal;
