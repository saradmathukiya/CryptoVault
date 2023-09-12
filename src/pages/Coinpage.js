import React, { useContext, useEffect, useState } from "react";
import CoinInfo from "../components/CoinInfo";
import axios from "axios";
import { SingleCoin } from "../api";
import { useParams } from "react-router-dom";
import { CryptoContext } from "../CryptoContext";
import { TailSpin } from "react-loader-spinner";
import '../App.css'

const Coinpage = () => {
  const [loading, setLoading] = useState(false);
  const { currency, symbol, numberWithCommas } = useContext(CryptoContext);
  const [coin, setCoin] = useState([]);
  const { id } = useParams();

  const fetchSingleCoin = async () => {
    setLoading(true);
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleCoin();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="coinPage">
      {loading ? (
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
      ) : (
        <div className="aboutCoin">
          <div className="upperPart">
            <img
              src={coin.image?.large}
              style={{ height: 200, width: 200 }}
              alt="LOGO"
            />
            <h1>{coin.name}</h1>
          </div>
          <div className="lowerPart">
            <p>{coin?.description?.en?.split(". ")[0]}.</p>
            <h3>Rank : {coin?.market_cap_rank}</h3>
            <h3>
              Current Price : {symbol}{" "}
              {numberWithCommas(
                coin?.market_data?.current_price[currency.toLowerCase()]
              )}
            </h3>
            <h3>
              Market Cap : {symbol}{" "}
              {numberWithCommas(
                coin?.market_data?.market_cap[currency.toLowerCase()]
              )}
            </h3>
          </div>
        </div>
      )}
      <CoinInfo coin={id} />
    </div>
  );
};

export default Coinpage;
