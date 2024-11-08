import React, { useMemo } from 'react';
import { useStore } from '../store';
import { Trash2, Printer } from 'lucide-react';
import { usePDF } from 'react-to-pdf';
import { PRECIOS } from './ClienteForm';
import { ListaClientesFrecuencia } from './ListaClientesFrecuencia';

export function ListaClientes() {
  const { clientes, removeCliente } = useStore();
  const { toPDF, targetRef } = usePDF({ filename: 'facturacion.pdf' });

  const clientesPorFrecuencia = useMemo(() => {
    return {
      semanal: clientes.filter((c) => c.frecuencia === 'semanal'),
      quincenal: clientes.filter((c) => c.frecuencia === 'quincenal'),
      mensual: clientes.filter((c) => c.frecuencia === 'mensual'),
    };
  }, [clientes]);

  // Calcular totales generales
  const totales = clientes.reduce(
    (acc, cliente) => {
      const pedido = cliente.pedido;
      return {
        ventas:
          acc.ventas +
          pedido.rosquillas.precio +
          pedido.bica.precio +
          pedido.magdalenas.precio +
          pedido.queso.precio +
          pedido.loteria.precio,
        costos:
          acc.costos +
          pedido.rosquillas.costo +
          pedido.bica.costo +
          pedido.magdalenas.costo +
          pedido.queso.costo +
          pedido.loteria.costo,
        ganancias:
          acc.ganancias +
          pedido.rosquillas.ganancia +
          pedido.bica.ganancia +
          pedido.magdalenas.ganancia +
          pedido.queso.ganancia +
          pedido.loteria.ganancia,
      };
    },
    { ventas: 0, costos: 0, ganancias: 0 }
  );

  // Calcular totales específicos para "quesos"
  const totalesQuesos = clientes.reduce(
    (acc, cliente) => {
      const pedido = cliente.pedido;
      return {
        ventas: acc.ventas + pedido.queso.precio,
        costos: acc.costos + pedido.queso.costo,
        ganancias: acc.ganancias + pedido.queso.ganancia,
      };
    },
    { ventas: 0, costos: 0, ganancias: 0 }
  );

  return (
    <div className="mt-8" ref={targetRef}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Lista de Clientes</h2>
        <button
          onClick={() => toPDF()}
          className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
        >
          <Printer size={20} />
          Imprimir Facturas
        </button>
      </div>

      <div className="space-y-8">
        <ListaClientesFrecuencia
          titulo="Clientes Semanales"
          clientes={clientesPorFrecuencia.semanal}
          removeCliente={removeCliente}
          bgColor="bg-blue-50"
        />

        <ListaClientesFrecuencia
          titulo="Clientes Quincenales"
          clientes={clientesPorFrecuencia.quincenal}
          removeCliente={removeCliente}
          bgColor="bg-green-50"
        />

        <ListaClientesFrecuencia
          titulo="Clientes Mensuales"
          clientes={clientesPorFrecuencia.mensual}
          removeCliente={removeCliente}
          bgColor="bg-purple-50"
        />

        {/* Sección de resumen financiero total */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Resumen Financiero Total</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-lg font-bold">Ventas Totales</p>
              <p className="text-2xl">{totales.ventas.toFixed(2)}€</p>
            </div>
            <div className="p-4 rounded-lg bg-red-50">
              <p className="text-lg font-bold text-red-700">Costos Totales</p>
              <p className="text-2xl text-red-700">{totales.costos.toFixed(2)}€</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50">
              <p className="text-lg font-bold text-green-700">Ganancias Totales</p>
              <p className="text-2xl text-green-700">{totales.ganancias.toFixed(2)}€</p>
            </div>
          </div>
        </div>

        {/* Sección de resumen específico para "quesos" */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Resumen Específico de Quesos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-lg font-bold">Ventas de Quesos</p>
              <p className="text-2xl">{totalesQuesos.ventas.toFixed(2)}€</p>
            </div>
            <div className="p-4 rounded-lg bg-red-50">
              <p className="text-lg font-bold text-red-700">Costos de Quesos</p>
              <p className="text-2xl text-red-700">{totalesQuesos.costos.toFixed(2)}€</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50">
              <p className="text-lg font-bold text-green-700">Ganancias de Quesos</p>
              <p className="text-2xl text-green-700">{totalesQuesos.ganancias.toFixed(2)}€</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
