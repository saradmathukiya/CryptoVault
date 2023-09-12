import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React, { useState, useContext, useEffect } from "react";
import { CoinList } from "../api";
import { CryptoContext } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import "../App.css";

const CoinTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const { currency, symbol, numberWithCommas } = useContext(CryptoContext);
  const [coins, setCoins] = useState([]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toString().toLowerCase()) ||
        coin.symbol.includes(search.toString().toLowerCase())
    );
  };

  let pages = [];

  for (let i = 1; i <= Math.ceil(handleSearch().length / postsPerPage); i++) {
    pages.push(i);
  }

  let fetchCoin = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    } catch (error) {
      console.log("Error Occured in Fetching API of CoinList");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line
  }, [currency]);

  const navigate = useNavigate();

  return (
    <div className="tableContainer">
      <h1>Cryptocurrency Prices by Market Cap</h1>
      <input
        type="text"
        onChange={(e) => {
          setCurrentPage(1);
          setSearch(e.target.value);
        }}
        placeholder="Search For a Crypto Currency.."
      ></input>
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
        <table>
          <thead>
            <tr>
              {["Coin", "Price", "24h Change", "Market Cap"].map(
                (data, index) => (
                  <th
                    key={index}
                    style={{ textAlign: data === "Coin" ? "left" : "right" }}
                  >
                    {data}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {handleSearch()
              .slice(firstPostIndex, lastPostIndex)
              .map((data) => {
                let profit = data?.price_change_percentage_24h >= 0;

                return (
                  <tr
                    className="coinsRow"
                    key={data.name}
                    onClick={() => {
                      navigate(`/coin/${data.id}`);
                    }}
                  >
                    <td className="firstColData">
                      <img
                        src={data.image}
                        alt={data.name}
                        style={{
                          height: 50,
                          width: 50,
                        }}
                      />
                      <div style={{ paddingLeft: 20 }}>
                        <div style={{ fontWeight: 600, fontSize: 20 }}>
                          {data.symbol.toUpperCase()}
                        </div>
                        <div>{data.name}</div>
                      </div>
                    </td>
                    <td className="colData">
                      {symbol} {numberWithCommas(data.current_price.toFixed(2))}
                    </td>
                    <td
                      className="colData"
                      style={{ color: profit > 0 ? "green" : "red" }}
                    >
                      {profit && "+"}
                      {data.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className="colData">
                      {symbol}{" "}
                      {numberWithCommas(
                        data.market_cap.toString().slice(0, -6)
                      )}{" "}
                      M
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button
          onClick={() => {
            if (currentPage !== 1) setCurrentPage(currentPage - 1);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IoIosArrowBack style={{ width: 30, height: 30 }} />
        </button>
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(page);
                window.scroll(0, 450);
              }}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          );
        })}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IoIosArrowForward
            onClick={() => {
              if (currentPage !== pages.length) setCurrentPage(currentPage + 1);
            }}
            style={{ width: 30, height: 30 }}
          />
        </button>
      </div>
    </div>
  );
};

export default CoinTable;
