import { useState } from "react";
import "./Disponibilidad.css" 

const mockDisponibilidad = [ //por ahora mock, despues supongo que podemos poner la del medico
  { dia: "lunes",    horaDesde: "09:00", horaHasta: "13:00" },
  { dia: "miercoles", horaDesde: "14:00", horaHasta: "18:00" },
  { dia: "viernes",  horaDesde: "08:00", horaHasta: "12:00" },
];

const DIAS = [
  { value: "lunes",     label: "Lunes" },
  { value: "martes",    label: "Martes" },
  { value: "miercoles", label: "Miércoles" },
  { value: "jueves",    label: "Jueves" },
  { value: "viernes",   label: "Viernes" },
  { value: "sabado",    label: "Sábado" },
  { value: "domingo",   label: "Domingo" },
];
// de 6 a 22 horas , horarios disponibles, se crea cada 30 minutos las opciones
const HORARIOS = (() => {
  const slots = [];
  for (let h = 6; h <= 22; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 22) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
})();

const filaVacia = () => ({ dia: "", horaDesde: "", horaHasta: "" });
const labelDia = (value) => DIAS.find((d) => d.value === value)?.label ?? value;

const horasHasta = (horaDesde) => { 
  if (!horaDesde) return HORARIOS; //si no tengo hora desde, no puedo poner hora hasta
  return HORARIOS.filter((h) => h > horaDesde);
};

export default function Disponibilidad(){
    const [disponibilidades, setDisponibilidades] = useState(mockDisponibilidad);
    const [editando, setEditando] = useState(false);
    const [filas, setFilas] = useState([]);
    const [errores, setErrores] = useState([]);
    const [errorGlobal, setErrorGlobal] = useState(null);
    const [alerta, setAlerta] = useState(null);

    const mostrarAlerta = (mensaje, variante = "exito") => {
        setAlerta({ mensaje, variante });
        setTimeout(() => setAlerta(null), 3000);
    };

     const abrirEdicion = () => {
    setFilas(disponibilidades.map((d) => ({ ...d })));
    setErrores([]);
    setErrorGlobal(null);
    setEditando(true);
  };

  const cerrarEdicion = () => {
    setEditando(false);
    setFilas([]);
    setErrores([]);
    setErrorGlobal(null);
  };

  
  const agregarFila = () => {
    setFilas((prev) => [...prev, filaVacia()]);
    setErrores((prev) => [...prev, {}]);
  };

  const eliminarFila = (idx) => {
    setFilas((prev) => prev.filter((_, i) => i !== idx));
    setErrores((prev) => prev.filter((_, i) => i !== idx));
  };
  const handleChange = (idx, campo, valor) => {
    setFilas((prev) => {
      const copia = prev.map((f) => ({ ...f }));
      copia[idx][campo] = valor;
      // Si cambia horaDesde y horaHasta ya no es válida, la limpiamos
      if (campo === "horaDesde" && copia[idx].horaHasta <= valor) {
        copia[idx].horaHasta = "";
      }
      return copia;
    });
    // Limpiar error del campo tocado
    setErrores((prev) => {
      const copia = prev.map((e) => ({ ...e }));
      if (copia[idx]) delete copia[idx][campo];
      return copia;
    });
    setErrorGlobal(null);
  };
   const validar = () => {
    if (filas.length === 0) {
      setErrorGlobal("Agregá al menos una disponibilidad.");
      return false;
    }
    
    const nuevosErrores = filas.map((f) => {
      const e = {};
      if (!f.dia)       e.dia       = "Requerido";
      if (!f.horaDesde) e.horaDesde = "Requerido";
      if (!f.horaHasta) e.horaHasta = "Requerido";
      return e;
    });

    const hayErrores = nuevosErrores.some((e) => Object.keys(e).length > 0);
    if (hayErrores) {
      setErrores(nuevosErrores);
      setErrorGlobal("Completá todos los campos antes de confirmar.");
      return false;
    }

    return true;
  };
  const handleConfirmar = () => {
    if (!validar()) return;
    // Payload al backend: filas (lista completa que sobreescribe)
    setDisponibilidades(filas.map((f) => ({ ...f })));
    cerrarEdicion();
    mostrarAlerta("Disponibilidad actualizada correctamente.");
  };
   return (
    <div className="gs-page">
      {alerta && (
        <div className={`gs-toast gs-toast--${alerta.variante}`}>
          {alerta.variante === "exito" ? "✓" : "⚠"} {alerta.mensaje}
        </div>
      )}

      <h1 className="gs-titulo">Disponibilidad horaria</h1>

      {/* ── Tarjetas actuales ── */}
      {disponibilidades.length === 0 ? (
        <p className="gs-vacio">No hay disponibilidades registradas.</p>
      ) : (
        <div className="gs-cards">
          {disponibilidades.map((d, i) => (
            <div className="gs-card" key={i}>
              <span className="gs-card__dia">{labelDia(d.dia)}</span>
              <span className="gs-card__horario">
                <span>{d.horaDesde}</span> — <span>{d.horaHasta}</span>
              </span>
              <span className="gs-card__icono">🕐</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Botón de acción ── */}
      {!editando && (
        <div className="gs-acciones">
          <button
            className="gs-btn gs-btn--activo"
            onClick={abrirEdicion}
          >
            ✎ Modificar disponibilidades
          </button>
        </div>
      )}

      {/* ── Formulario de edición ── */}
      {editando && (
        <div className="gs-form">
          <h2 className="gs-form__titulo">Modificar disponibilidades</h2>
          <p className="gs-form__subtitulo">
            Definí la nueva lista completa. Al confirmar se reemplaza la anterior.
          </p>

          {filas.length > 0 && (
            <>
              <div className="gs-disp-header">
                <span>Día</span>
                <span>Desde</span>
                <span>Hasta</span>
                <span>·</span>
              </div>

              <div className="gs-disp-lista">
                {filas.map((fila, idx) => (
                  <div className="gs-disp-fila" key={idx}>
                    {/* Día */}
                    <select
                      value={fila.dia}
                      onChange={(e) => handleChange(idx, "dia", e.target.value)}
                      className={errores[idx]?.dia ? "gs-input--error" : ""}
                    >
                      <option value="">Día</option>
                      {DIAS.map((d) => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </select>

                    {/* Hora desde */}
                    <select
                      value={fila.horaDesde}
                      onChange={(e) => handleChange(idx, "horaDesde", e.target.value)}
                      className={errores[idx]?.horaDesde ? "gs-input--error" : ""}
                    >
                      <option value="">Desde</option>
                      {HORARIOS.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>

                    {/* Hora hasta */}
                    <select
                      value={fila.horaHasta}
                      onChange={(e) => handleChange(idx, "horaHasta", e.target.value)}
                      className={errores[idx]?.horaHasta ? "gs-input--error" : ""}
                      disabled={!fila.horaDesde}
                    >
                      <option value="">Hasta</option>
                      {horasHasta(fila.horaDesde).map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>

                    {/* Eliminar fila */}
                    <button
                      type="button"
                      className="gs-btn--icono"
                      onClick={() => eliminarFila(idx)}
                      title="Eliminar"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Agregar fila */}
          <button
            type="button"
            className="gs-btn--secundario"
            onClick={agregarFila}
          >
            + Agregar franja horaria
          </button>

          {errorGlobal && (
            <p className="gs-error-global">⚠ {errorGlobal}</p>
          )}

          {/* Acciones del form */}
          <div className="gs-acciones" style={{ marginBottom: 0 }}>
            <button className="gs-btn gs-btn--primario" onClick={handleConfirmar}>
              Confirmar cambios
            </button>
            <button className="gs-btn" onClick={cerrarEdicion}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );

}