import React from "react";
import "./CarTable.css";

function CarTable({ data, handleDelete, handleChange }) {
  if (data.length === 0) {
    return <p>žádná data k zobrazení</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Značka</th>
          <th>Model</th>
          <th>Reg. značka</th>
          <th>Najeto km</th>
          <th>Rok výroby</th>
          <th colSpan={2}></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.brand}</td>
            <td>{item.model}</td>
            <td>{item.reg}</td>
            <td>{item.km}</td>
            <td>{item.year}</td>
            <td>
              <button onClick={() => handleChange(item.id)}>Edituj</button>
            </td>
            <td>
              <button onClick={() => handleDelete(item.id)}>Smaž</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CarTable;
