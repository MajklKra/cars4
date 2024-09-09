import "./App.css"
import { useEffect, useState } from "react"
import CarTable from "./components/CarTable/CarTable"
import UniForm from "./components/UniForm/UniForm"
import FilterForm from "./components/FilterForm/FilterForm"
import axios from "axios"

function App() {
  const [cars, setCars] = useState([])
  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  })
  const [carToChange, setCarToChange] = useState({
    id: 0,
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  })
  const [carsToShow, setCarsToShow] = useState([])

  //vsechy auta z database
  const getCars = () => {
    axios
      .get("http://michal-kraninger.cz/projects/cars/server/?action=getAll")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCars(response.data)
          setCarsToShow(response.data)
        } else {
          console.error("Odpověď serveru není pole.")
        }
      })
      .catch((error) => {
        console.error("Nastala chyba!", error)
        alert(`Chyba: ${error}`)
      })
  }
  useEffect(() => {
    getCars()
  }, [])

  // specificka auta z database

  const filterCars = (ids) => {
    const param = ids.join()
    axios
      .get(`http://michal-kraninger.cz/projects/cars/server/?action=getSpec&ids=${param}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCarsToShow(response.data)
        }
      })
      .catch((error) => {
        console.error("Nastala chyba!", error)
        alert(`Chyba: ${error}`)
      })
  }
  // mazani auta z database

  const deleteCar = (id) => {
    //http://localhost/carsBackend/5  ... vymazat 5 id auto
    axios
      .delete(`http://michal-kraninger.cz/projects/cars/server/${id}`)
      .then((response) => {
        console.log(response.data)
        getCars()
        alert("Auto bylo úspěšně smazáno !!")
      })
      .catch((error) => {
        console.error("Nastala chyba!", error)
        alert(`Chyba: ${error}`)
      })
  }
  //pridani kaary
  const insertCar = (car) => {
    axios
      .post("http://michal-kraninger.cz/projects/cars/server/", car)
      .then((response) => {
        console.log(response.data)
        getCars()
        alert("Auto bylo úspěšně přidáno !!")
      })
      .catch((error) => {
        console.error("Nastala chyba!", error)
        alert(`Chyba: ${error}`)
      })
  }

  // ----- editace auta v db:   updateCar

  const updateCar = (car) => {
    axios
      .put("http://michal-kraninger.cz/projects/cars/server/", car)
      .then((response) => {
        console.log(response.data)
        getCars()
        alert("Auto bylo úspěšně upraveno !!")
      })
      .catch((error) => {
        console.error("Nastala chyba!", error)
        alert(`Chyba: ${error}`)
      })
  }

  const handleNewData = (updatedCar, source) => {
    switch (source) {
      case "add-car-form": {
        setNewCar(updatedCar)
        break
      }
      case "change-car-form": {
        setCarToChange(updatedCar)
        break
      }
      default:
        break
    }
  }

  const fillEmptyInfos = (car) => {
    const filledCar = {
      ...car,
      brand: car.brand.trim() ? car.brand : "empty",
      model: car.model.trim() ? car.model : "empty",
      reg: car.reg.trim() ? car.reg : "empty",
      km: parseInt(car.km) || 0,
      year: parseInt(car.year) || 0,
    }
    return filledCar
  }

  const confirmCar = (car) => {
    return window.confirm(
      "Opravdu chcete odeslat data?\n" +
        `Značka: ${car.brand}\n` +
        `Model: ${car.model}\n` +
        `Reg.značka: ${car.reg}\n` +
        `Kilometry: ${car.km}\n` +
        `Rok výroby: ${car.year}\n`
    )
  }

  const handleUpdate = (source) => {
    let temp
    switch (source) {
      case "add-car-form": {
        temp = fillEmptyInfos(newCar)
        if (confirmCar(temp)) {
          insertCar(temp)
          setNewCar({
            brand: "",
            model: "",
            reg: "",
            km: "",
            year: "",
          })
          alert("Data byla úspěšně odeslána")
        } else {
          alert("Odeslání dat bylo zrušeno")
        }
        break
      }
      case "change-car-form": {
        temp = fillEmptyInfos(carToChange)
        if (confirmCar(temp)) {
          const index = cars.findIndex((car) => car.id === temp.id)
          if (index !== -1) {
            updateCar(temp)
            setCarToChange({
              id: 0,
              brand: "",
              model: "",
              reg: "",
              km: "",
              year: "",
            })
            alert("Aktualizace dat úspěšná")
          } else {
            alert("Auto s daným id nebylo nalezeno")
            setCarToChange({
              id: 0,
              brand: "",
              model: "",
              reg: "",
              km: "",
              year: "",
            })
          }
        } else {
          alert("Aktualizace neproběhla")
        }
        break
      }
      default:
        break
    }
  }

  const handleDelete = (idToDel) => {
    // const temp = cars.filter((car) => car.id !== idToDel)
    // setCars(temp)
    // setCarsToShow(temp)
    deleteCar(idToDel)
  }

  const handleChange = (idToChange) => {
    const temp = cars.filter((car) => car.id === idToChange)
    setCarToChange(...temp)
  }
  // useEffect(() => {
  //   console.log(carToChange);
  // }, [carToChange]);

  // useEffect(() => {
  //   console.log(cars);
  // }, [cars]);

  const handleFilterData = (filteredCars) => {
    const ids = filteredCars.map((car) => car.id)
    filterCars(ids)
  }

  return (
    <div className="container">
      <h1 id="h1">Seznam vozidel</h1>
      <FilterForm class="filter-form" data={cars} handleFilterData={handleFilterData} />
      <CarTable
        data={carsToShow}
        handleDelete={handleDelete}
        handleChange={handleChange}
      />
      <p>Přidání nového auta</p>
      <UniForm
        id="add-car-form"
        data={newCar}
        handleNewData={handleNewData}
        handleUpdate={handleUpdate}
      />
      <p>Úpravy existujícího auta</p>
      <UniForm
        id="change-car-form"
        data={carToChange}
        handleNewData={handleNewData}
        handleUpdate={handleUpdate}
      />
    </div>
  )
}

export default App
