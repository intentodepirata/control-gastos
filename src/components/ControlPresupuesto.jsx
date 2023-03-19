import { useState, useEffect } from "react";
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({ 
  presupuesto,
   gastos,
   setGastos,
  setPresupuesto,
  setIsValidPresupuesto
}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [disponible, setDisponible] = useState(0);

  const handleResetear = ()=>{
    const resultado = confirm('Desear reiniciar presupuesto y gastos?')
    if(resultado){
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
      
    }
  }


  // Cada vez que gastos cambie, useEffect va estar ejecutando el codigo de dentro
  useEffect(() => {
    const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total,0);
    const totalDisponible = presupuesto - totalGastado;

    //calcular porcentaje gastado
    const nuevoPorcentaje = ((( presupuesto-totalDisponible)/presupuesto) * 100).toFixed(2)

    setGastado(totalGastado);
    setDisponible(totalDisponible);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 150);

  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    //funcion que toma una cantidad y lo formatea a euros sin mutar el original
    return cantidad.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <CircularProgressbar
        styles={buildStyles({
          pathTransitionDuration: 2,
          pathColor: porcentaje > 100 ? '#dc2626': '#3B82F6',
          textColor: porcentaje > 100 ? '#dc2626': '#3B82F6',
          trailColor: '#f5f5f5',
          strokeLinecap: 'round'

        })}
        value={porcentaje}
        text={`${porcentaje}% Gastado `}
      />
      <div className="contenido-presupuesto">
      <button className="reset-app" type="button" onClick={handleResetear}>
        Resetear App
      </button>
        <p>
          <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : undefined}`}>
          <span>Disponible:</span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
