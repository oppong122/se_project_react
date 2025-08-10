import { useEffect, useState } from "react";

import { getItems, addItems, deleteItems } from "../../Api";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import DeleteItemModal from "../DeleteModal/DeleteModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../utils/Context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
// import { defaultClothingItems } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: " ",
    temp: { F: 999 },
    city: " ",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  // const [isDelete, setIsDelete] = useState(false);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  // handleDeleteClick = () => {
  //   setIsDelete("");
  // };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleOpenDelete = () => {
    setActiveModal("delete-modal");
    // setIsDelete(card);
  };

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const onAddItem = (item) => {
    return addItems(item) // calls the API method to add the item
      .then((newItem) => {
        setClothingItems((clothingItems) => [newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.log("Fetch error", err);
      });
  };

  const handleDeleteItem = (id) => {
    return deleteItems(id)
      .then(() => {
        setClothingItems((clothingItems) =>
          clothingItems.filter((item) => item._id !== id)
        );
        closeActiveModal();
        //use the arry method to iterate throught the current clothing items and remove the clothing itme by its id and use the setclothing itme function to set the value to return our
      })
      .catch((err) => {
        console.log("Delete error", err);
      });
  };

  // console.log(clothingItems);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch((err) => {
        console.log("Fetch error", err);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
        // console.log("", data);
      })
      .catch((err) => {
        console.log("Fetch error", err);
      });
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            onToggleChange={setIsToggled}
            isToggle={isToggled}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  isToggled={isToggled}
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  currentTemperatureUnit={currentTemperatureUnit}
                  clothingItems={clothingItems}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>

          <AddItemModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            handleOpenDelete={handleOpenDelete}
          />
          <DeleteItemModal
            isOpen={activeModal === "delete-modal"}
            handleDeleteItem={handleDeleteItem}
            onCloseDelete={closeActiveModal}
            card={selectedCard}
            // confirmDelete={handleDeleteClick}
          />

          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
