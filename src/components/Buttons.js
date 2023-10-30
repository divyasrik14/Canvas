import React from 'react'
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import InstructionModal from './InstructionModal';

const Buttons = ({handleOpenModal, handleMarkClick, handleDrawClick, handleRemoveModeClick, isModalVisible, isRemoveMode, handleCloseModal}) => {
  return (
    <div>
      <span>
        <InfoCircleOutlined className="icon one" />
        <button onClick={handleOpenModal}>
          Click here to view Instructions
        </button>
      </span>

      <span>
        <EditOutlined className="icon two" />
        <button onClick={handleMarkClick}>Mark / Unmark Points using this</button>
      </span>

      <span>
        <LineChartOutlined className="icon three" />
        <button onClick={handleDrawClick}>Draw Lines Using this</button>
      </span>

      <span>
        <DeleteOutlined className="icon four" />
        <button onClick={handleRemoveModeClick}>
          {isRemoveMode ? "Exit Remove Mode" : "Enter Remove Mode"}
        </button>
      </span>

      <InstructionModal visible={isModalVisible} onClose={handleCloseModal} />
    </div>
  );
}

export default Buttons