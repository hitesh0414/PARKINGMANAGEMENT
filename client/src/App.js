// App.js
//import Navbar from "./Component/Navbar";
//import Footer from "./Component/Footer";
//import SignUp from "./Component/SignUp";
// App.js
import React from 'react';
import './App.css';
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import SignUp from "./Component/SignUp";
import ParkingBooking from "./Component/ParkingBooking";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SignUp/>
      <ParkingBooking />
      <Footer />
    </div>
  );
}

export default App;


