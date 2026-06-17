import { useNavigate } from "react-router-dom";
import { medicosMock } from "../../mockdata/Medicos";
import "./MedicosPage.css";

const MedicosPage = () => {
  const navigate = useNavigate();

  const handleClickMedico = (nombreMedico) => {
    // Redirigimos pasándole el nombre del médico en el state
    navigate("/busquedaDeTurnos", { state: { medicoSeleccionado: nombreMedico } });
  };

  return (
    <div className="medicos-page">
      <h1 className="medicos-titulo">Nuestro Equipo Médico</h1>
      <p className="medicos-subtitulo">Hacé clic en un profesional para buscar sus turnos disponibles</p>
      
      <div className="medicos-grid">
        {medicosMock.map((medico) => (
          <div 
            key={medico.id} 
            className="medico-card"
            onClick={() => handleClickMedico(medico.nombre)}
          >
            <h7>Dr/a.</h7>
            <h3> {medico.nombre}</h3>
            <div className="medico-info">
              <p><strong>Matrícula:</strong> {medico.matricula}</p>
              <p><strong>Sedes:</strong> {medico.sedes.join(" - ")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicosPage;