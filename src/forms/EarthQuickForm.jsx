import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";


const EarthQuickForm = () => {
  const [formData, setFormData] = useState({
    area: '',
    coordinates: '',
    depth: '',
    id: uuid(),
    location: '',
    magnitude: '',
    time: '',
    title: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add the form data to Firestore
      const earthquakeRef = doc(db, 'earthquake' , uuid()); // Replace 'earthquakes' with your collection name
      await setDoc(earthquakeRef, formData);

      // Optionally, you can reset the form after successful submission
      setFormData({
        area: '',
        coordinates: '',
        depth: '',
        location: '',
        magnitude: '',
        time: '',
        title: '',
      });

      console.log('Form data added to Firestore!');
    } catch (error) {
      console.error('Error adding form data to Firestore:', error);
    }
  };

  return (
    <div className="form-container1">
      <h2>Earthquake Details Form</h2>
      <form className="form1" onSubmit={handleSubmit}>
        <div className="form-field1">
          <label htmlFor="area">Area:</label>
          <input type="text" id="area" name="area" value={formData.area} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label htmlFor="coordinates">Coordinates:</label>
          <input
            type="text"
            id="coordinates"
            name="coordinates"
            value={formData.coordinates}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="depth">Depth:</label>
          <input type="text" id="depth" name="depth" value={formData.depth} onChange={handleChange} />
        </div>
        {/* <div className="form-field">
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} />
        </div> */}
        <div className="form-field">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="magnitude">Magnitude:</label>
          <input
            type="text"
            id="magnitude"
            name="magnitude"
            value={formData.magnitude}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="time">Time:</label>
          <input type="text" id="time" name="time" value={formData.time} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EarthQuickForm;
