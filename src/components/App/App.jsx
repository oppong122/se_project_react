import { useEffect, useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../Context/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: " ",
    temp: { F: 999 },
    city: " ",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    console.log("is this firing");
    setActiveModal("");
  };

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);
  // console.log(currentTemperatureUnit);
  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />

          <ModalWithForm
            buttonText="Add garment"
            title="New Garment"
            // activeModal={activeModal}
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
          >
            <label htmlFor="name" className="modal__label">
              Name
              <input
                type="text"
                className="modal__input"
                placeholder="name"
                id="name"
                required
                minLength="1"
              />
            </label>
            <label htmlFor="imageUrl" className="modal__label">
              Image
              <input
                type="URL"
                className="modal__input"
                placeholder="Image URL"
                id="imageUrl"
                required
                minLength="1"
              />
            </label>
            <fieldset className="modal__radio-buttons">
              <legend className="modal__legend">
                Select the weather type:
              </legend>
              <label
                htmlFor="hot"
                className="modal__label modal__label_type_radio"
              >
                <input
                  name="weatherTemp"
                  id="hot"
                  type="radio"
                  className="modal__radio_input"
                />
                Hot
              </label>
              <label
                htmlFor="warm"
                className="modal__label modal__label_type_radio"
              >
                <input
                  name="weatherTemp"
                  id="warm"
                  type="radio"
                  className="modal__radio_input"
                />
                Warm
              </label>
              <label
                htmlFor="cold"
                className="modal__label modal__label_type_radio"
              >
                <input
                  name="weatherTemp"
                  id="cold"
                  type="radio"
                  className="modal__radio_input"
                />
                Cold
              </label>
            </fieldset>
          </ModalWithForm>
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
          />

          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
