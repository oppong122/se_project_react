import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../utils/Context/CurrentTemperatureUnitContext";
import WeatherCard from "/src/components/WeatherCard/WeatherCard";
import ItemCard from "/src/components/ItemCard/ItemCard";
import "./Main.css";

function Main({
  weatherData,
  handleCardClick,
  // currentTemperatureUnit,
  clothingItems,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard
        weatherData={weatherData}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <section className="cards">
        <p className="card__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;
          {currentTemperatureUnit}. You may want to wear:
        </p>
        <ul className="card__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
