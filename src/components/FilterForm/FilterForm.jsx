import React, { useEffect, useState } from "react";
import "./FilterForm.css";

function FilterForm({ data, handleFilterData }) {
  const [brands, setBrands] = useState([]);
  const [selBrands, setSelBrands] = useState([]);
  const [selRegistration, setSelRegistration] = useState("");
  const [criteria, setCriteria] = useState("brand");
  useEffect(() => {
    setBrands(Array.from(new Set(data.map((car) => car.brand))));
  }, [data]);

  const handleChange = (e) => {
    const { value, selectedOptions, name } = e.target;
    switch (name) {
      case "brand": {
        const tempBrands = Array.from(selectedOptions).map(
          (option) => option.value
        );
        setSelBrands(tempBrands);
        break;
      }
      case "reg": {
        setSelRegistration(value.trim());
        break;
      }
      default:
        break;
    }
  };

  //   useEffect(() => {
  //     console.log(selBrands);
  //   }, [selBrands]);

  const handleFilter = () => {
    let filtered;
    switch (criteria) {
      case "brand": {
        filtered = data.filter((car) => selBrands.includes(car.brand));
        break;
      }
      case "reg": {
        filtered = data.filter((car) => car.reg === selRegistration);
        break;
      }
      default:
        break;
    }
    handleFilterData(filtered);
  };

  const handleCriteria = (e) => {
    setCriteria(e.target.value);
  };

  const handleReset = () => {
    handleFilterData(data);
    setSelBrands([]);
    setSelRegistration("");
  };

  return (
    <fieldset>
      <legend><h1>Vyhledávání</h1></legend>
      <div>
        <input
          type="radio"
          name="filter-criteria"
          id="brand-criteria"
          value="brand"
          checked={criteria === "brand"}
          onChange={handleCriteria}
        />
        <label htmlFor="brand-criteria">hledání podle značky vozidla</label>
      </div>
      <div>
        <input
          type="radio"
          name="filter-criteria"
          id="reg-criteria"
          value="reg"
          checked={criteria === "reg"}
          onChange={handleCriteria}
        />
        <label htmlFor="reg-criteria">hledání podle registrační značky</label>
      </div>
      <div>
        <select
          disabled={criteria === "reg"}
          name="brand"
          id="brand"
          multiple
          value={selBrands}
          onChange={handleChange}
        >
          {brands.map((brand) => (
            <option key={brand}>{brand}</option>
          ))}
        </select>
      </div>
      <div>
        <input
          disabled={criteria === "brand"}
          type="text"
          id="reg"
          name="reg"
          value={selRegistration}
          onChange={handleChange}
        />
      </div>
      <div>
        <button onClick={handleFilter}>Filtruj</button>
        <button onClick={handleReset}>Resetuj</button>
      </div>
    </fieldset>
  );
}

export default FilterForm;
