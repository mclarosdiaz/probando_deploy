import { useNavigate } from "react-router-dom";
import { serviciosIniciales } from "../../mockdata/Servicios"; // Ajustá la ruta según tu carpeta
import "./ServiciosPage.css";

const ServiciosPage = () => {
  const navigate = useNavigate();

  // Unificamos especialidades y prácticas en un solo array para mostrarlas
  const todosLosServicios = [
    ...serviciosIniciales.especialidad.map(s => ({ ...s, tipo: "Especialidad" })),
    ...serviciosIniciales.practica.map(s => ({ ...s, tipo: "Práctica" })),
  ];

  const handleClickServicio = (nombreServicio) => {
    // Redirigimos a la página de búsqueda pasándole el nombre en el "state"
    navigate("/busquedaDeTurnos", { state: { servicioSeleccionado: nombreServicio } });
  };

  return (
    <div className="servicios-page">
      <h1 className="servicios-titulo">Nuestros Servicios</h1>
      <p className="servicios-subtitulo">Hacé clic en un servicio para buscar turnos disponibles</p>
      
      <div className="servicios-grid">
        {todosLosServicios.map((servicio) => (
          <div 
            key={`${servicio.tipo}-${servicio.id}`} 
            className="servicio-card"
            onClick={() => handleClickServicio(servicio.nombre)}
          >
            <h3>{servicio.nombre}</h3>
            <span className={`badge badge-${servicio.tipo.toLowerCase()}`}>{servicio.tipo}</span>
            <div className="servicio-info">
              <p>⏱ {servicio.duracionTurnoEnMins} min</p>
              <p>💲 ${servicio.costo.toLocaleString("es-AR")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiciosPage;