import React, { useState } from 'react';
import { useStore } from '../store';
import { Cliente } from '../types';
import { PlusCircle } from 'lucide-react';

export const PRECIOS = {
  rosquillas: {
    venta: 5,
    costo: 3,
    ganancia: 2
  },
  bica: {
    venta: 6.5,
    costo: 4.5,
    ganancia: 2
  },
  magdalenas: {
    normales: {
      venta: 6.5,
      costo: 5,
      ganancia: 1.5
    },
    chocolate: {
      venta: 7,
      costo: 5.5,
      ganancia: 1.5
    }
  },
  queso: {
    venta: 10,
    costo: 7.5,
    ganancia: 2.5
  },
  loteria: {
    venta: 5,
    costo: 4,
    ganancia: 1
  }
};

export function ClienteForm() {
  const addCliente = useStore((state) => state.addCliente);
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    frecuencia: 'semanal',
    rosquillaTipo: 'blancas',
    rosquillaCantidad: 0,
    bicaCantidad: 0,
    magdalenaTipo: 'normales',
    magdalenaCantidad: 0,
    quesoCantidad: 0,
    loteriaCantidad: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cliente: Cliente = {
      id: Date.now().toString(),
      nombre: formData.nombre,
      direccion: formData.direccion,
      frecuencia: formData.frecuencia as 'semanal' | 'quincenal' | 'mensual',
      pedido: {
        rosquillas: {
          tipo: formData.rosquillaTipo as 'blancas' | 'hojaldre' | 'trozos',
          cantidad: formData.rosquillaCantidad,
          precio: PRECIOS.rosquillas.venta * formData.rosquillaCantidad,
          costo: PRECIOS.rosquillas.costo * formData.rosquillaCantidad,
          ganancia: PRECIOS.rosquillas.ganancia * formData.rosquillaCantidad
        },
        bica: {
          cantidad: formData.bicaCantidad,
          precio: PRECIOS.bica.venta * formData.bicaCantidad,
          costo: PRECIOS.bica.costo * formData.bicaCantidad,
          ganancia: PRECIOS.bica.ganancia * formData.bicaCantidad
        },
        magdalenas: {
          tipo: formData.magdalenaTipo as 'normales' | 'chocolate',
          cantidad: formData.magdalenaCantidad,
          precio: PRECIOS.magdalenas[formData.magdalenaTipo as 'normales' | 'chocolate'].venta * formData.magdalenaCantidad,
          costo: PRECIOS.magdalenas[formData.magdalenaTipo as 'normales' | 'chocolate'].costo * formData.magdalenaCantidad,
          ganancia: PRECIOS.magdalenas[formData.magdalenaTipo as 'normales' | 'chocolate'].ganancia * formData.magdalenaCantidad
        },
        queso: {
          cantidad: formData.quesoCantidad,
          precio: PRECIOS.queso.venta * formData.quesoCantidad,
          costo: PRECIOS.queso.costo * formData.quesoCantidad,
          ganancia: PRECIOS.queso.ganancia * formData.quesoCantidad
        },
        loteria: {
          cantidad: formData.loteriaCantidad,
          precio: PRECIOS.loteria.venta * formData.loteriaCantidad,
          costo: PRECIOS.loteria.costo * formData.loteriaCantidad,
          ganancia: PRECIOS.loteria.ganancia * formData.loteriaCantidad
        },
      },
    };

    addCliente(cliente);
    setFormData({
      nombre: '',
      direccion: '',
      frecuencia: 'semanal',
      rosquillaTipo: 'blancas',
      rosquillaCantidad: 0,
      bicaCantidad: 0,
      magdalenaTipo: 'normales',
      magdalenaCantidad: 0,
      quesoCantidad: 0,
      loteriaCantidad: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md form-container">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Nuevo Cliente</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            required
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            required
            value={formData.direccion}
            onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
            className="input-field"          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Frecuencia</label>
          <select
            value={formData.frecuencia}
            onChange={(e) => setFormData({ ...formData, frecuencia: e.target.value })}
            className="input-field"
                      >
            <option value="semanal">Semanal</option>
            <option value="quincenal">Quincenal</option>
            <option value="mensual">Mensual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rosquillas ({PRECIOS.rosquillas.venta}€)</label>
          <div className="flex gap-2">
            <select
              value={formData.rosquillaTipo}
              onChange={(e) => setFormData({ ...formData, rosquillaTipo: e.target.value })}
              className="input-field"
                          >
              <option value="blancas">Blancas</option>
              <option value="hojaldre">Hojaldre</option>
              <option value="trozos">Trozos</option>
            </select>
            <input
              type="number"
              min="0"
              value={formData.rosquillaCantidad}
              onChange={(e) => setFormData({ ...formData, rosquillaCantidad: parseInt(e.target.value) })}
              className="input-field"
                          />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bica ({PRECIOS.bica.venta}€)</label>
          <input
            type="number"
            min="0"
            value={formData.bicaCantidad}
            onChange={(e) => setFormData({ ...formData, bicaCantidad: parseInt(e.target.value) })}
            className="input-field"
                      />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Magdalenas ({formData.magdalenaTipo === 'normales' ? PRECIOS.magdalenas.normales.venta : PRECIOS.magdalenas.chocolate.venta}€)
          </label>
          <div className="flex gap-2">
            <select
              value={formData.magdalenaTipo}
              onChange={(e) => setFormData({ ...formData, magdalenaTipo: e.target.value })}
              className="input-field"
                          >
              <option value="normales">Normales</option>
              <option value="chocolate">Chocolate</option>
            </select>
            <input
              type="number"
              min="0"
              value={formData.magdalenaCantidad}
              onChange={(e) => setFormData({ ...formData, magdalenaCantidad: parseInt(e.target.value) })}
              className="input-field"
                          />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Queso ({PRECIOS.queso.venta}€)</label>
          <input
            type="number"
            min="0"
            value={formData.quesoCantidad}
            onChange={(e) => setFormData({ ...formData, quesoCantidad: parseInt(e.target.value) })}
            className="input-field"
                      />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Lotería ({PRECIOS.loteria.venta}€)</label>
          <input
            type="number"
            min="0"
            value={formData.loteriaCantidad}
            onChange={(e) => setFormData({ ...formData, loteriaCantidad: parseInt(e.target.value) })}
            className="input-field"
                      />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        <PlusCircle size={20} />
        Añadir Cliente
      </button>
    </form>
  );
}