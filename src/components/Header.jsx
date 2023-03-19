import ControlPresupuesto from "./ControlPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto";

const Header = ({
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  gastos,
  setGastos
}) => {
  return (
    <header>

    {/* esto es un ternario que si un presupuesto es valido (isValidPresupuesto = true) muestra un componente u otro componente */}
      <h1> Control de Gastos</h1>
      {isValidPresupuesto ? (
        <ControlPresupuesto
        gastos={gastos}
        setGastos={setGastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )}
    </header>
  );
};

export default Header;
