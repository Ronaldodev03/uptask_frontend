import { useState, useEffect } from "react";

type LoaderMensajeProps = {
  className?: string;
};

const LoaderMensaje = ({ className }: LoaderMensajeProps) => {
  const [mensaje, setMensaje] = useState<string>("Cargando...");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMensaje(
        "  Cargando... El servidor está en modo de hibernación. La primera carga puede tardar unos 30 segundos."
      );
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return <p className={className}>{mensaje}</p>;
};

export default LoaderMensaje;
