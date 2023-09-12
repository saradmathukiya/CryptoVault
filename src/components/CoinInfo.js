import React, { useState, useContext, useEffect } from "react";
import { CryptoContext } from "../CryptoContext";
import { chartDays } from "../data";
import '../App.css'
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { HistoricalChart } from "../api";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const CoinInfo = ({ coin }) => {
  // const coinId = coin;
  const { currency } = useContext(CryptoContext);
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  // const [flag, setFlag] = useState(false);

  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coin, currency, days));
      // console.log(data);
      setHistoricData(data.prices);
      // setFlag(true);
    } catch (error) {
      console.log("Error in Chart API");
    }
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line
  }, [days, currency]);

  return (
    <div className="chart">
      {!historicData ? (
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
        <Line
          data={{
            labels: historicData?.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),

            datasets: [
              {
                data: historicData?.map((coin) => coin[1]),
                label: `Price ( Past ${days} Days ) in ${currency}`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={{
            responsive: true,
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
      )}
      <div className="chartButtons">
        {chartDays.map((day) => (
          <button className="chartControlButton"
            key={day.value}
            onClick={() => {
              setDays(day.value);
            }}
          >
            {day.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoinInfo;
