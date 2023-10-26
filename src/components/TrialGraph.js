import React, { useEffect, useRef, useState } from "react";
import "../TrialGraph.css";
import pointToLineDistance from "../helperFunctions/pointToLineDistance";
import Axes from "./Axes";
import Buttons from "./Buttons";

const TrialGraph = () => {
  const [xValues, setXValues] = useState({
    input1: 0,
    input2: 0,
    input3: 0,
    input4: 0,
    input5: 0,
    input6: 0,
  });
  const [yValues, setYValues] = useState({
    input8: 0,
    input9: 0,
    input10: 0,
    input11: 0,
    input12: 0,
    input13: 0,
  });
  const [inputFieldsDisabled, setInputFieldsDisabled] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [markedPoints, setMarkedPoints] = useState([]);
  const [connectingPoints, setConnectingPoints] = useState([]);
  const [connectingLines, setConnectingLines] = useState([]);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // ref's
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const handleCanvasClick = (event) => {
      const x = event.clientX - canvas.getBoundingClientRect().left;
      const y = event.clientY - canvas.getBoundingClientRect().top;

      if (isRemoveMode) {
        const x = event.clientX - canvas.getBoundingClientRect().left;
        const y = event.clientY - canvas.getBoundingClientRect().top;
        const lineToRemove = getLineToRemove(x, y);
        if (lineToRemove) {
          removeLine(lineToRemove);
        }
      } else if (isDrawing) {
        const radius = 5;
        const existingPointIndex = markedPoints.findIndex((point) => {
          const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
          return distance <= radius;
        });

        if (existingPointIndex !== -1) {
          markedPoints.splice(existingPointIndex, 1); // Do nothing when a point is clicked while in drawing mode
        } else {
          markedPoints.push({ x, y });
        }
      } else {
        const x = event.clientX - canvas.getBoundingClientRect().left;
        const y = event.clientY - canvas.getBoundingClientRect().top;

        connectingPoints.push({ x, y });

        if (connectingPoints.length === 2) {
          const [start, end] = connectingPoints;
          connectingLines.push({
            start: { ...start },
            end: { ...end },
          });
          setConnectingPoints([]);
          drawCanvas();
        }
        // }
      }
      drawCanvas();
    };

    function drawCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines
      connectingLines.forEach((line) => {
        context.strokeStyle = "blue";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(line.start.x, line.start.y);
        context.lineTo(line.end.x, line.end.y);
        context.stroke();
      });

      // Draw marked points
      markedPoints.forEach((point) => {
        context.fillStyle = "black";
        context.beginPath();
        context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        context.fill();
      });
    }

    drawCanvas();

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [
    isDrawing,
    markedPoints,
    connectingPoints,
    connectingLines,
    isRemoveMode,
  ]);

  const getLineToRemove = (x, y) => {
    return connectingLines.find((line) => {
      const { start, end } = line;
      return pointToLineDistance({ x, y }, start, end) <= 5;
    });
  };

  const removeLine = (lineToRemove) => {
    const updatedLines = connectingLines.filter(
      (line) => line !== lineToRemove
    );
    setConnectingLines(updatedLines);
  };

  const handleXChange = (newValue, key) => {
    setXValues((prevXValues) => ({
      ...prevXValues,
      [key]: newValue,
    }));
  };

  const handleYChange = (newValue, key) => {
    setYValues((prevYValues) => ({
      ...prevYValues,
      [key]: newValue,
    }));
  };

  const handleMarkClick = () => {
    setInputFieldsDisabled(true);
    setIsDrawing(true);
  };

  const handleDrawClick = () => {
    setIsDrawing(false);
  };

  const handleRemoveModeClick = () => {
    setIsRemoveMode(!isRemoveMode); // Toggle remove mode
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="trial">
      <div className="graph-contents">
        <canvas
          ref={canvasRef}
          width={425}
          height={450}
          style={{
            position: "absolute",
            marginLeft: "70px",
          }}
        />
        <Axes
          yValues={yValues}
          xValues={xValues}
          handleXChange={handleXChange}
          handleYChange={handleYChange}
          inputFieldsDisabled={inputFieldsDisabled}
        />
      </div>

      <div className="buttons">
        <Buttons
          handleOpenModal={handleOpenModal}
          handleMarkClick={handleMarkClick}
          handleDrawClick={handleDrawClick}
          handleRemoveModeClick={handleRemoveModeClick}
          isRemoveMode={isRemoveMode}
          isModalVisible={isModalVisible}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default TrialGraph;
