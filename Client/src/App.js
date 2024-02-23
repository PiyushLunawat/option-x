import React, { useState, useEffect } from 'react';
import './Style.css';
import Navbar from './Components/Navbar/Navbar';
import Window from './Components/Window/Window';
import Footer from './Components/Footer/Footer';
import axios from 'axios';

function App() {
  const [stockSymbol, setStockSymbol] = useState("HDFC");
  const [time, setTime] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [currPrice, setCurrPrice]= useState("");
  const [currQuantity, setCurrQuantity]= useState("");


  const handleStockSymbol = (data) => {
    setStockSymbol(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5681/data');

        const n = response.data[`${stockSymbol}p`].length;
        

        // Dynamically set state based on the stockSymbol
        setTime(response.data[`${stockSymbol}t`]); 
        setPrice(response.data[`${stockSymbol}p`]);  setCurrPrice(response.data[`${stockSymbol}p`][n-1]);
        setQuantity(response.data[`${stockSymbol}q`]);  setCurrQuantity(response.data[`${stockSymbol}q`][n-1]);

        console.log(n,currPrice,currQuantity);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // Fetch data initially
    fetchData();
    // Fetch data every 5 seconds
    const interval = setInterval(fetchData, 5000);

    // Cleanup function to clear interval
    return () => clearInterval(interval);

  }, [stockSymbol]); // Run useEffect when stockSymbol changes

  return (
    <div className="App">
      <Navbar onData={handleStockSymbol} />
      <Window
        stockSymbol={stockSymbol}
        time={time}
        price={price}
        quantity={quantity}
        currPrice={currPrice}
        currQuantity={currQuantity}
      />
      <Footer />
    </div>
  );
}

export default App;
