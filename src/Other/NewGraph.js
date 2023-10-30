import React, { useState, useRef, useEffect } from "react";
import {
  EditOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

const Graph = () => {
  const [values, setValues] = useState({
    input1: 0,
    input2: 0,
    input3: 0,
    input4: 0,
    input5: 0,
    input6: 0,
    input7: 0,
    input8: 0,
    input9: 0,
    input10: 0,
    input11: 0,
    input12: 0,
    input13: 0,
  });

  const [cursor, setCursor] = useState("auto");
  const [inputFieldsDisabled, setInputFieldsDisabled] = useState(false);
  const [letDraw, setLetDraw] = useState(false);
  const [markedPoints, setMarkedPoints] = useState([]);
  const [drawnLines, setDrawnLines] = useState([]);
  const [canRemovePoints, setCanRemovePoints] = useState(false);

  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const lineDrawingModeRef = useRef(false);

  const startPointRef = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  const handleMarkClick = () => {
    setLetDraw(true);
    lineDrawingModeRef.current = false;
    setCursor("crosshair");
    setInputFieldsDisabled(true);
    setCanRemovePoints(true);
  };

  const drawDot = (x, y) => {
    if (!letDraw) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d");

    console.log(x, y);

    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fill();
    const markedPoint = { x, y };
    pointsRef.current.push(markedPoint); 
    setMarkedPoints([...markedPoints, markedPoint]);
  };

  console.log(markedPoints);

  const handleCanvasClick = (e) => {
    const x = e.clientX - canvasRef.current.getBoundingClientRect().left;
    const y = e.clientY - canvasRef.current.getBoundingClientRect().top;

    const radius = 6;
    const clickedPointIndex = markedPoints.findIndex((point) => {
      const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
      return distance <= radius;
    });

    if (canRemovePoints && clickedPointIndex !== -1) {
      markedPoints.splice(clickedPointIndex, 1);
      setMarkedPoints([...markedPoints]);
      drawCanvas();
      return;
    }

    if (lineDrawingModeRef.current) {
      if (startPointRef.current) {
        const startPoint = startPointRef.current;
        drawLine(startPoint.x, startPoint.y, x, y);
        startPointRef.current = null;
      } else {
        startPointRef.current = { x, y };
      }
    } else {
      const proximity = 5; 
      const clickedLineIndex = drawnLines.findIndex((line) => {
        const distToStart = Math.sqrt((line.x1 - x) ** 2 + (line.y1 - y) ** 2);
        const distToEnd = Math.sqrt((line.x2 - x) ** 2 + (line.y2 - y) ** 2);
        return distToStart + distToEnd <= proximity;
      });

      if (clickedLineIndex !== -1) {
        drawnLines.splice(clickedLineIndex, 1);
        setDrawnLines([...drawnLines]);
        drawCanvas();                   
      } else {
        drawDot(x, y);
      }
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    markedPoints.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
      ctx.fill();
    });

    drawnLines.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.stroke();
    });
  };

  const drawLine = (x1, y1, x2, y2) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    const drawnLine = { x1, y1, x2, y2 };
    setDrawnLines([...drawnLines, drawnLine]); 
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    pointsRef.current.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });
  }, []);

  //   console.log(values);

  return (
    <div className="graph">
      <div className="graph-contents" style={{ cursor: cursor }}>
        <canvas
          ref={canvasRef}
          width={425}
          height={450}
          style={{
            position: "absolute",
            marginLeft: "70px",
          }}
          onClick={handleCanvasClick}
        />
        <div className="velocity-fields">
          <p> Velocity (m/s)</p>
          <div className="input-column">
            <input
              type="number"
              value={values.input1}
              onChange={(e) => handleChange(e)}
              name="input1"
              disabled={inputFieldsDisabled}
            />
            <input
              type="number"
              value={values.input2}
              onChange={(e) => handleChange(e)}
              name="input2"
              disabled={inputFieldsDisabled}
            />
            <input
              type="number"
              value={values.input3}
              onChange={(e) => handleChange(e)}
              name="input3"
              disabled={inputFieldsDisabled}
            />
            <input
              type="number"
              value={values.input4}
              onChange={(e) => handleChange(e)}
              name="input4"
              disabled={inputFieldsDisabled}
            />
            <input
              type="number"
              value={values.input5}
              onChange={(e) => handleChange(e)}
              name="input5"
              disabled={inputFieldsDisabled}
            />
            <input
              type="number"
              value={values.input6}
              onChange={(e) => handleChange(e)}
              name="input6"
              disabled={inputFieldsDisabled}
            />
            <input type="number" readOnly value={values.input7}></input>
          </div>
        </div>

        <div className="time-fields">
          <div className="input-row">
            <input
              type="number"
              value={values.input8}
              onChange={(e) => handleChange(e)}
              name="input8"
              disabled={inputFieldsDisabled}
            />
            <input
              type="number"
              value={values.input9}
              onChange={(e) => handleChange(e)}
              name="input9"
              disabled={inputFieldsDisabled}
            />
            <input
              type="number"
              value={values.input10}
              onChange={(e) => handleChange(e)}
              name="input10"
              disabled={inputFieldsDisabled}
            />
            <input
              type="number"
              value={values.input11}
              onChange={(e) => handleChange(e)}
              name="input11"
              disabled={inputFieldsDisabled}
            />
            <input
              type="number"
              value={values.input12}
              onChange={(e) => handleChange(e)}
              name="input12"
              disabled={inputFieldsDisabled}
            />
            <input
              type="number"
              value={values.input13}
              onChange={(e) => handleChange(e)}
              name="input13"
              disabled={inputFieldsDisabled}
            />
          </div>
          <p> Time (s) </p>
        </div>
      </div>

      <div className="buttons">
        <span>
          <InfoCircleOutlined className="icon one" />
          <button> Click Here to view Instructions</button>
        </span>

        <span>
          <EditOutlined className="icon two" />
          <button onClick={handleMarkClick}> Mark Points using this</button>
        </span>

        <span>
          <LineChartOutlined className="icon three" />
          <button
            onClick={() => (
              (lineDrawingModeRef.current = true), setCanRemovePoints(false)
            )}
          >
            {" "}
            Draw lines using this
          </button>
        </span>
      </div>
    </div>
  );
};

export default Graph;
