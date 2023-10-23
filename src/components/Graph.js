import React, { useState } from "react";
import graph from "../images/graph.jpg";
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
    setCursor((prevState) => {
      if (prevState === "crosshair") {
        return "pointer";
      }
      return "crosshair";
    });
  };

  console.log(values);

  return (
    <div className="graph">
      <div className="graph-contents" style={{ cursor: cursor }}>
        <div className="velocity-fields">
          <p> Velocity (m/s)</p>
          <div className="input-column">
            <input
              type="number"
              value={values.input1}
              onChange={(e) => handleChange(e)}
              name="input1"
            />
            <input
              type="number"
              value={values.input2}
              onChange={(e) => handleChange(e)}
              name="input2"
            />
            <input
              type="number"
              value={values.input3}
              onChange={(e) => handleChange(e)}
              name="input3"
            />
            <input
              type="number"
              value={values.input4}
              onChange={(e) => handleChange(e)}
              name="input4"
            />
            <input
              type="number"
              value={values.input5}
              onChange={(e) => handleChange(e)}
              name="input5"
            />
            <input
              type="number"
              value={values.input6}
              onChange={(e) => handleChange(e)}
              name="input6"
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
            />
            <input
              type="number"
              value={values.input9}
              onChange={(e) => handleChange(e)}
              name="input9"
            />
            <input
              type="number"
              value={values.input10}
              onChange={(e) => handleChange(e)}
              name="input10"
            />
            <input
              type="number"
              value={values.input11}
              onChange={(e) => handleChange(e)}
              name="input11"
            />
            <input
              type="number"
              value={values.input12}
              onChange={(e) => handleChange(e)}
              name="input12"
            />
            <input
              type="number"
              value={values.input13}
              onChange={(e) => handleChange(e)}
              name="input13"
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
          <button> Draw lines using this </button>
        </span>
      </div>
    </div>
  );
};

export default Graph;
