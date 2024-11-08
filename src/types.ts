export interface Cliente {
  id: string;
  nombre: string;
  direccion: string;
  frecuencia: 'semanal' | 'quincenal' | 'mensual';
  pedido: {
    rosquillas: {
      tipo: 'blancas' | 'hojaldre' | 'trozos';
      cantidad: number;
      precio: number;
      costo: number;
      ganancia: number;
    };
    bica: {
      cantidad: number;
      precio: number;
      costo: number;
      ganancia: number;
    };
    magdalenas: {
      tipo: 'normales' | 'chocolate';
      cantidad: number;
      precio: number;
      costo: number;
      ganancia: number;
    };
    queso: {
      cantidad: number;
      precio: number;
      costo: number;
      ganancia: number;
    };
    loteria: {
      cantidad: number;
      precio: number;
      costo: number;
      ganancia: number;
    };
  };
}