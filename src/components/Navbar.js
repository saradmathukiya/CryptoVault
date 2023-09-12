import React, { useContext } from "react";
import "../App.css";
import {CryptoContext} from "../CryptoContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const { currency, setCurrency} = useContext(CryptoContext);

    function changeHandler(e){ 
        setCurrency(e.target.value);
    }

  return (
    <div className="Navbar">
      <h2 onClick={ () => {navigate('/')}} > Crypto Buzz</h2>
      <div>
        <label className="Label"> 
            Currency :  
            <select className="Select" name="Currency" value={currency} onChange={changeHandler}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            </select>
        </label>
      </div>
      
    </div>
  );
};

export default Navbar;
