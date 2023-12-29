import React, { useState } from "react";

const BookingForm = ({ showtimeId, onSubmit }) => {
  const [formData, setFormData] = useState({
    seatNumber: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/showtimes/${showtimeId}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successful booking
        const data = await response.json();
        onSubmit(data); // Pass the booked data to the parent component
      } else {
        throw new Error("Failed to book tickets");
      }
    } catch (error) {
      console.error("Error booking tickets:", error);
    }
  };

  return (
    <div>
      <h2>Book Tickets</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Seat Number:
          <input
            type="text"
            name="seatNumber"
            value={formData.seatNumber}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookingForm;
