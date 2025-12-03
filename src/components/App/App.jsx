// External library imports
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
// Internal component imports
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import DeleteItemModal from "../DeleteModal/DeleteModal";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectectedRoute/ProtectedRoute";
import { CurrentTemperatureUnitContext } from "../../Context/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../context/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

// Utility/API imports
import { register, authorization, getProfile } from "../../utils/auth";
import {
  getItems,
  addItems,
  deleteItems,
  addCardLike,
  removeCardLike,
  getCurrentUser,
  updateProfile,
} from "../../utils/Api";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: " ",
    temp: { F: 999 },
    city: " ",
  });
  // Modal State
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState("");

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleOpenDelete = () => {
    setActiveModal("delete-modal");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleProfileEdit = () => {
    setActiveModal("edit__profile");
  };
  const handleCloseEditModal = () => setActiveModal("");

  const onAddItem = (item) => {
    const token = localStorage.getItem("jwt");
    return addItems(item, token)
      .then((newItem) => {
        setClothingItems((clothingItems) => [newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to add item. Please try again", err);
      });
  };

  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    return deleteItems(id, token)
      .then(() => {
        setClothingItems((clothingItems) =>
          clothingItems.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to delete item. Please try again", err);
      });
  };

  const handleCardLike = (id, isLiked) => {
    const token = localStorage.getItem("jwt");
    const request = isLiked ? removeCardLike : addCardLike;

    request(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((c) => (c._id === id ? updatedCard : c))
        );
      })
      .catch((err) => {
        console.error("like erro:", err);
      });
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    setIsSavingProfile(true);
    updateProfile({ name, avatar }, token)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(console.error)
      .finally(() => setIsSavingProfile(false));
  };

  // Auth Handlers
  const handleRegister = (formData) => {
    setAuthError("");
    return register(formData)
      .then(() => handleLogin(formData))

      .catch((err) => {
        setAuthError(err?.message || "Signup failed");
      });
  };

  const handleLogin = (formData) => {
    setAuthError("");
    return authorization(formData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return getCurrentUser(res.token);
      })
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch((err) => {
        const message =
          err?.message || err?.err || "Incorrect email or password";
        setAuthError(message);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Effects
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch((err) => {
        console.error("Failed getting the weather. Please try again", err);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error("Failed getting an item. Please try again", err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    getCurrentUser(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  // Renderer

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={() => setActiveModal("register")}
              isLoggedIn={isLoggedIn}
              onSignOut={handleLogout}
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
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddClick={handleAddClick}
                      currentUser={currentUser}
                      onLogout={handleLogout}
                      onProfileEdit={handleProfileEdit}
                      isLoggedIn={isLoggedIn}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <EditProfileModal
              isOpen={activeModal === "edit__profile"}
              onClose={handleCloseEditModal}
              isSaving={isSavingProfile}
              onSubmit={handleUpdateProfile}
            />

            <AddItemModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItem={onAddItem}
            />

            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              onDelete={handleOpenDelete}
            />
            <DeleteItemModal
              isOpen={activeModal === "delete-modal"}
              handleDeleteItem={handleDeleteItem}
              onCloseDelete={closeActiveModal}
              card={selectedCard}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              closeActiveModal={closeActiveModal}
              onRegister={handleRegister}
              onLoginSwitch={() => setActiveModal("login")}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              closeActiveModal={closeActiveModal}
              onLogin={handleLogin}
              onRegisterSwitch={() => setActiveModal("register")}
              authError={authError}
            />

            <Footer />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
