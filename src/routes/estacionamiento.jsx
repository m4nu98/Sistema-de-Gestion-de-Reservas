import React, { useState, useEffect } from "react";
import axios from "axios";
import CardTicket from "../components/CardTicket";
import styles from "../assets/styles/Estacionamiento.module.css";
import { Link } from 'react-router-dom';

const Estacionamiento = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSpot, setCurrentSpot] = useState(null);
  const [formData, setFormData] = useState({ plate: "", model: "", dueno: "" });

  // Obtener datos del backend
  const fetchParkingSpots = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/estacionamiento");
      setParkingSpots(response.data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchParkingSpots();
  }, []);

  // Abrir el modal para editar
  const handleCardClick = (spot) => {
    setCurrentSpot(spot);
    setFormData({
      plate: spot.patenteH || "",
      model: spot.marcamodeloH || "",
      dueno: `${spot.nombreH ?? ""} ${spot.apellidoH ?? ""}`.trim(),
    });
    setIsModalOpen(true);
  };

  // Guardar los cambios en el backend
  const handleSave = async () => {
    if (currentSpot) {
      try {
        await axios.put(`http://localhost:5000/api/estacionamiento/actualizar`, {
            idHuesped: currentSpot.idHuesped,
          });
        setIsModalOpen(false);
        fetchParkingSpots(); // Actualizar datos después de guardar
      } catch (error) {
        console.error("Error al guardar cambios:", error);
      }
    }
  };

  return (
    <div className={styles.estacionamientoContainer}>
      <h2>Estacionamiento</h2>
      <button onClick={handleSave}>Actualizar</button>

      <div className={styles.gridContainer}>


        {parkingSpots.map((spot) => (
          <div key={spot.id} onClick={() => handleCardClick(spot)}>
            <CardTicket
              ticket={spot.idHuesped ? "close" : "pending"}
              totalTickets={spot.idEstacionamiento}
              text={
                spot.patenteH
                  ? ` ‎‎  ${spot.marcamodeloH}   ‎ ‎ ‎ ‎ ‎ 
                     ‎ ${spot.patenteH}‎  `
                  : "Libre"
              }
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
  <div className={`${styles.modalOverlay} ${isModalOpen ? styles.showModal : ''}`}>
    <div className={`${styles.modal} ${isModalOpen ? styles.showModal : ''}`}>
      <button className={styles.modalClose} onClick={() => setIsModalOpen(false)}>×</button>
      <h3>Informacion</h3>
      <h4>Huésped: {formData.dueno}</h4>
      <h4>Vehículo: {formData.model} </h4>
      <h4>Patente: {formData.plate}</h4>


    </div>
  </div>
)}

<Link to="/admin" className='a'>
        <button style={{ position: 'fixed', bottom: '3%', right: '3%', width: '10%' }}>ATRAS</button>
      </Link>
    </div>
  );
};


export default Estacionamiento;