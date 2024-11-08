import React from 'react';
import { Cliente } from '../types';
import { Trash2 } from 'lucide-react';
import { PRECIOS } from './ClienteForm';

interface Props {
  titulo: string;
  clientes: Cliente[];
  removeCliente: (id: string) => void;
  bgColor: string;
}

export function ListaClientesFrecuencia({ titulo, clientes, removeCliente, bgColor }: Props) {
  if (clientes.length === 0) return null;

  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${bgColor}`}>
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">{titulo}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dirección
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pedido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clientes.map((cliente) => {
              const total =
                cliente.pedido.rosquillas.precio +
                cliente.pedido.bica.precio +
                cliente.pedido.magdalenas.precio +
                cliente.pedido.queso.precio +
                cliente.pedido.loteria.precio;

              return (
                <tr key={cliente.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cliente.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cliente.direccion}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul>
                      {cliente.pedido.rosquillas.cantidad > 0 && (
                        <li>
                          Rosquillas {cliente.pedido.rosquillas.tipo}:{' '}
                          {cliente.pedido.rosquillas.cantidad} x {PRECIOS.rosquillas.venta}€
                        </li>
                      )}
                      {cliente.pedido.bica.cantidad > 0 && (
                        <li>
                          Bica: {cliente.pedido.bica.cantidad} x {PRECIOS.bica.venta}€
                        </li>
                      )}
                      {cliente.pedido.magdalenas.cantidad > 0 && (
                        <li>
                          Magdalenas {cliente.pedido.magdalenas.tipo}:{' '}
                          {cliente.pedido.magdalenas.cantidad} x{' '}
                          {cliente.pedido.magdalenas.tipo === 'normales'
                            ? PRECIOS.magdalenas.normales.venta
                            : PRECIOS.magdalenas.chocolate.venta}
                          €
                        </li>
                      )}
                      {cliente.pedido.queso.cantidad > 0 && (
                        <li>
                          Queso: {cliente.pedido.queso.cantidad} x {PRECIOS.queso.venta}€
                        </li>
                      )}
                      {cliente.pedido.loteria.cantidad > 0 && (
                        <li>
                          Lotería: {cliente.pedido.loteria.cantidad} x {PRECIOS.loteria.venta}€
                        </li>
                      )}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {total.toFixed(2)}€
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => removeCliente(cliente.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}