import React from "react";

const Axes = ({
  yValues,
  xValues,
  handleXChange,
  handleYChange,
  inputFieldsDisabled,
}) => {
  return (
    <div>
      <div className="y-values">
        <p>Velocity (m/s)</p>
        <div className="y-values-inputs">
          {Object.keys(yValues).map((key) => (
            <div key={key}>
              <input
                value={yValues[key]}
                type="number"
                onChange={(e) => handleYChange(e.target.value, key)}
                disabled={inputFieldsDisabled}
              />
            </div>
          ))}
        </div>
      </div>

      <input
        type="number"
        disabled={true}
        value="0"
        className="disabled-input"
      />

      <div className="x-values">
        <div className="x-values-inputs">
          {Object.keys(xValues).map((key) => (
            <div key={key}>
              <input
                value={xValues[key]}
                type="number"
                onChange={(e) => handleXChange(e.target.value, key)}
                disabled={inputFieldsDisabled}
              />
            </div>
          ))}
        </div>
        <p>Time (s) </p>
      </div>
    </div>
  );
};

export default Axes;
