import React from 'react';
import { Component } from "react";
import Plot from 'react-plotly.js';
import "./Window.css";
import img from "../../Assets/image.png"


class Window extends Component {

  constructor(props) {


    super(props);
    this.state = {
      stockSymbol: props.stockSymbol, // Retrieve stockSymbol from props
      time: props.time, // Retrieve time array from props
      price: props.price, // Retrieve price array from props
      quantity: props.quantity // Retrieve quantity array from props
      
    };
  }

  handleYClick = (selected) => {
    // Update yData and yTitle based on the button clicked
    if (selected === 'Price') {
      this.setState({ yData: this.state.price, yTitle: "Price" });
    } else if (selected === 'Quantity') {
      this.setState({ yData: this.state.quantity, yTitle: "Quantity" });
    }
  }
  componentDidUpdate(prevProps) {
    // Check if the props have changed
    if (prevProps !== this.props) {
      // Update the state with the new props
      this.setState({
        stockSymbol: this.props.stockSymbol,
        time: this.props.time,
        price: this.props.price,
        quantity: this.props.quantity
      });
    }
  }

  render() {
  //  let time=this.state.stockData[0],price=this.state.stockData[1],quantity=[];
  const { stockSymbol, time, yData, yTitle } = this.state;
  var w,h;

    function handleResize() {
      if (window.innerWidth < 768) {
        // Code to execute for smaller screen sizes
        w=window.innerWidth*.95;
        h=window.innerWidth*1.25;
      } else {
        // Code to execute for larger screen sizes
        w=window.innerWidth*.6;
        h=window.innerWidth*.3;
      }
    }
    handleResize();
// Add event listener for window resize
window.addEventListener('resize', handleResize);


  return (
    <div className='Container'>
        
      {/* {this.state.stockSymbol ? <div></div>:<div className='first-window'>
        <div className={this.state.stockSymbol ?'heading-txt':'heading-txt active'}>
        Trade With Unleashed Speed And Execution
        </div>
        <img src={img} alt='IMAGE' className={this.state.stockSymbol ?'image':'image active'}></img>
      </div>} */}

      <div className={this.state.stockSymbol?'data-plot active':'data-plot'}>
          <Plot 
              data={[
                {
                x: this.props.time, y: this.state.yData || this.state.price, type: 'scatter', marker: {color: 'red'},
                 },
              ]}
              layout={{   
                width: w, height: h,    
                font: {
                 color: '#000', size: 11.5, family: 'monospace',
                },
                paper_bgcolor: '#f7f7f7', plot_bgcolor: 'white',
                xaxis: {
                  title: 'Time', tickmode: 'auto', tick0: 0, dtick: 10, mirror: true, ticks: 'outside', showline: false,
                },
                yaxis: {
                  range: [0, 300], title: yTitle || "Price",
                },hovermode: 'closest'
              }} 
              config={{scrollZoom:true,responsive: true,}}
          />

          <div className='switch-btn'>
            <button onClick={() => this.handleYClick("Price")}>Price</button>
            <button onClick={() => this.handleYClick("Quantity")}>Quantity</button>
          </div>

            
          <div className={this.state.stockSymbol?'current-data':'current-data active'}>
          <b>
          Stock : {this.state.stockSymbol}<br></br>
              Price : <br></br>
              Quantity : 
          </b>
          </div>
      </div>
    </div>
    );
  }
}

export default Window;