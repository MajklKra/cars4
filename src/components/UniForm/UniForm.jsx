import React from "react";
import "./UniForm.css";

function UniForm({ data, handleNewData, handleUpdate, id }) {
  const handleChange = (e) => {
    let temp = { ...data };
    const { name, value } = e.target;
    switch (name) {
      case `${id}-brand`: {
        temp.brand = value;
        break;
      }
      case `${id}-model`: {
        temp.model = value;
        break;
      }
      case `${id}-reg`: {
        temp.reg = value;
        break;
      }
      case `${id}-km`: {
        temp.km = parseInt(value) || 0;
        break;
      }
      case `${id}-year`: {
        temp.year = parseInt(value) || 0;
        break;
      }
      default:
        break;
    }
    handleNewData(temp, id);
  };
  return (
    <div id={id}>
      <div>
        <input
          type="text"
          name={`${id}-brand`}
          id={`${id}-brand`}
          value={data.brand}
          onChange={handleChange}
        />
        <label htmlFor={`${id}-brand`}> Značka</label>
      </div>
      <div>
        <input
          type="text"
          name={`${id}-model`}
          id={`${id}-model`}
          value={data.model}
          onChange={handleChange}
        />
        <label htmlFor={`${id}-model`}> Model</label>
      </div>
      <div>
        <input
          type="text"
          name={`${id}-reg`}
          id={`${id}-reg`}
          value={data.reg}
          onChange={handleChange}
        />
        <label htmlFor={`${id}-reg`}> Reg. značka</label>
      </div>
      <div>
        <input
          type="number"
          name={`${id}-km`}
          id={`${id}-km`}
          value={data.km}
          onChange={handleChange}
        />
        <label htmlFor={`${id}-km`}> Najeto</label>
      </div>
      <div>
        <input
          type="number"
          name={`${id}-year`}
          id={`${id}-year`}
          value={data.year}
          onChange={handleChange}
        />
        <label htmlFor={`${id}-year`}> Rok výroby</label>
      </div>
      <div>
        <button onClick={() => handleUpdate(id)}> Odešli</button>
      </div>
    </div>
  );
}

export default UniForm;
