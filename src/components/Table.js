import React, { useState } from "react";

const Table = () => {
  const [value, setValue] = useState();

  const handleSubmit = () => {
    if (!value) {
      alert("Please answer acceleration value");
    }
    alert(`Therefore the acceleration value is ${value} `);
  };

  return (
    <div className="table">
      <h1>Table Data</h1>
      <table>
        <thead>
          <tr>
            <th>Time (s)</th>
            <th>Velocity (m/s)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>5</td>
          </tr>
          <tr>
            <td>1</td>
            <td>9</td>
          </tr>
          <tr>
            <td>2</td>
            <td>13</td>
          </tr>
          <tr>
            <td>3</td>
            <td>17</td>
          </tr>
          <tr>
            <td>4</td>
            <td>21</td>
          </tr>
          <tr>
            <td>5</td>
            <td>25</td>
          </tr>
        </tbody>
      </table>

      <div className="acceleration-fields">
        <span>
          {" "}
          <p>Acceleration (m/s) :</p>{" "}
          <input
            type="number"
            name="acc"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></input>
        </span>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Table;
