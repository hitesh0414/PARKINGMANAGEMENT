// ParkingBooking.js
import React, { useState } from 'react';
import "../Styles/ParkingSlot.css";

const ParkingBooking = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [slots, setSlots] = useState(
    Array(10).fill(null) // 10 slots initially
  );

  const handleVehicleTypeChange = (e) => setVehicleType(e.target.value);

  const handleSlotBooking = (index) => {
    const updatedSlots = [...slots];
    if (!updatedSlots[index]) {
      updatedSlots[index] = vehicleType;
      setSlots(updatedSlots);
      alert(`Slot ${index + 1} booked for a ${vehicleType}`);
    } else {
      alert(`Slot ${index + 1} is already booked!`);
    }
  };

  return (
    <div className="parking-container">
      <h2>Book a Parking Slot</h2>

      <label>Select Vehicle Type:</label>
      <select value={vehicleType} onChange={handleVehicleTypeChange}>
        <option value="">Select...</option>
        <option value="2-wheeler">2-Wheeler</option>
        <option value="3-wheeler">3-Wheeler</option>
        <option value="4-wheeler">4-Wheeler</option>
      </select>

      <div className="slots">
        {slots.map((slot, index) => (
          <div
            key={index}
            className={`slot ${slot ? 'booked' : 'available'}`}
            onClick={() => handleSlotBooking(index)}
          >
            {slot ? `${slot}` : `Slot ${index + 1}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingBooking;
