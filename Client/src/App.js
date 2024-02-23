import { useState,useEffect } from 'react';
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

  const handleStockSymbol = (data) => {
    setStockSymbol(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5681/data');

        setTime(response.data.HDFCt);
        setPrice(response.data.HDFCp);
        setQuantity(response.data.HDFCq);
        // console.log(response.data.HDFCt);

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
  }, []);

  return (
    <div className="App">
      <Navbar onData={handleStockSymbol}/>
      <Window stockSymbol={stockSymbol} 
        time={time}
        price={price}
        quantity={quantity}
      />
      <Footer/>
    </div>
  );
}

export default App;
