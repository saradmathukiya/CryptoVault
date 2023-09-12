import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CryptoContext } from "../CryptoContext";
import axios from "axios";
import { TrendingCoins } from "../api";
import { Link } from "react-router-dom";
import "../App.css";
import { TailSpin } from "react-loader-spinner";

const Banner = () => {
  const [loading, setLoading] = useState(false);
  const { currency, symbol, numberWithCommas } = useContext(CryptoContext);
  const [trend, setTrend] = useState([]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  async function fetchData() {
    setLoading(true);
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrend(data);
    } catch (error) {
      console.log("Error Occured in Fetching API of Trending coins");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currency]);

  return (
    <div>
      <div className="banner">
        <div className="bannerTitle">
          <h1>Crypto Buzz</h1>
        </div>
        <p>Get All The Info Regarding Your Favorite Crypto Currency</p>
      </div>
      {loading ? (
        <div className="loader">
          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1000}
          arrows={false}
          customTransition="transform 1s ease-in-out"
          transitionDuration={1000}
        >
          {trend.map((coin, id) => {
            let profit = coin?.price_change_percentage_24h >= 0;

            return (
              <Link key={id} className="slider" to={`/coin/${coin.id}`}>
                <img src={coin?.image} alt={coin.name} height="80" />
                <span>
                  {coin?.symbol.toUpperCase()}
                  &nbsp;
                  <span
                    style={{
                      color: profit ? "green" : "red",
                    }}
                  >
                    {profit && "+"}
                    {coin?.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </span>
                <span className="trendPrice">
                  {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
              </Link>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default Banner;
