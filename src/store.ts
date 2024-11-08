import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cliente } from './types';

interface State {
  clientes: Cliente[];
  addCliente: (cliente: Cliente) => void;
  removeCliente: (id: string) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      clientes: [],
      addCliente: (cliente) =>
        set((state) => ({ clientes: [...state.clientes, cliente] })),
      removeCliente: (id) =>
        set((state) => ({
          clientes: state.clientes.filter((cliente) => cliente.id !== id),
        })),
    }),
    {
      name: 'clientes-storage',
    }
  )
);