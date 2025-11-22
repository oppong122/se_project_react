import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../Context/CurrentTemperatureUnitContext.jx";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({
  weatherData,
  handleCardClick,
  clothingItems = [],
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const items = Array.isArray(clothingItems) ? clothingItems : [];
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
              return item.weather === weatherData?.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={onCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
