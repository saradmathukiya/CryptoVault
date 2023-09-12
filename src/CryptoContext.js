import React, { createContext, useEffect, useState } from "react";

export const CryptoContext  = createContext();

export default function CryptoContextProvider({children}){
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ currency, setCurrency, symbol, numberWithCommas}}>
      {children}
    </CryptoContext.Provider>
  );
};

