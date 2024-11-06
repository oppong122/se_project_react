import WeatherCard from "../WeatherCard/WeatherCard";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p className="card__text">Today is 75 &deg; F/ You may want to wear:</p>
        {/* {TODO - add the cards later} */}
      </section>
    </main>
  );
}

export default Main;
