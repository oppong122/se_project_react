import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import RenderCard from "../renderCard/renderCard";
import "./Main.css";

function Main({ weatherData, handleCardClick }) {
  //   console.log(item.weather);
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p className="card__text">Today is 75 &deg; F/ You may want to wear:</p>
        <ul className="card__list">
          {defaultClothingItems
            // .filter((item) => {
            //   return item.weather === weatherData.type;
            // })
            .map((item) => {
              return (
                <RenderCard
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
