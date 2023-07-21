import React, { useState , useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactModal from "react-modal";
import Maplocation from '../components/maplocation';

const ElectricalAccident = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    area: '',
    coordinates: '',
    cause: '',
    id: uuid(),
    location: '',
    damage: '',
    time: '',
    title: '',
  });

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '20px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      minWidth: '700px',
      maxWidth: '700px',
      maxHeight: '700px',
      maxHeight: '700px',
    },
  };
  const handleMapClick = (coordinates) => {
    console.log('coordinates');
    console.log(coordinates);
    console.log('coordinates');
    // setModalIsOpen(false)
    setFormData({
        ...formData,
        coordinates: coordinates
      });
  };

  const handleButtonClick = () => {
    setModalIsOpen(true)
    console.log(formData.coordinates);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
      const earthquakeRef = doc(db, 'electrical-accident', uuid()); 
      await setDoc(earthquakeRef, formData);

      setFormData({
        area: '',
        coordinates: '',
        cause: '',
        location: '',
        damage: '',
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
      <h2>Electrical Accident Details Form</h2>
      <button onClick={handleButtonClick}>Get Coordinates</button>
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
          <label htmlFor="damage">Damage:</label>
          <input type="text" id="damage" name="damage" value={formData.damage} onChange={handleChange} />
        </div>
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
          <label htmlFor="cause">Cause:</label>
          <input
            type="text"
            id="cause"
            name="cause"
            value={formData.cause}
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
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
        >
         <Maplocation
         onMapClick={handleMapClick}
         />
        </ReactModal>
    </div>
  );
};

export default ElectricalAccident;
