import { ClienteForm } from './components/ClienteForm';
import { ListaClientes } from './components/ListaClientes';
import { Cake } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Cake className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">
              Sistema de Facturación - Excursión 4º Eso
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          <ClienteForm />
          <ListaClientes />
        </div>
      </main>
    </div>
  );
}

export default App;