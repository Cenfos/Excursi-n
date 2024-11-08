import { useEffect, useState } from 'react';
import netlifyIdentity, { User } from 'netlify-identity-widget'; 
import { ClienteForm } from './components/ClienteForm';
import { ListaClientes } from './components/ListaClientes';
import { Cake } from 'lucide-react';

function App() {
  const [user, setUser] = useState<User | null>(null); 

  useEffect(() => {
    // Inicializa Netlify Identity
    netlifyIdentity.init();

    // Establece el usuario autenticado
    netlifyIdentity.on('login', (user) => {
      setUser(user); // Ahora TypeScript sabe que user puede ser de tipo User o null
      netlifyIdentity.close();
    });
    // Elimina el usuario al cerrar sesión
    netlifyIdentity.on('logout', () => setUser(null));
  }, []);

  const handleLogin = () => {
    netlifyIdentity.open();
  };

  const handleLogout = () => {
    netlifyIdentity.logout();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cake className="text-blue-600" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">
                Sistema de Facturación - Excursión 4º ESO
              </h1>
            </div>
            <div>
              {user ? (
                <button onClick={handleLogout} className="text-blue-600">
                  Cerrar sesión
                </button>
              ) : (
                <button onClick={handleLogin} className="text-blue-600">
                  Iniciar sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user ? (
          <div className="grid gap-8">
            <ClienteForm />
            <ListaClientes />
          </div>
        ) : (
          <p className="text-center text-gray-700">
            Debes iniciar sesión para acceder al sistema de facturación.
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
