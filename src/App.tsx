import { useEffect, useState } from 'react';
import netlifyIdentity, { User } from 'netlify-identity-widget'; 
import { ClienteForm } from './components/ClienteForm';
import { ListaClientes } from './components/ListaClientes';
import { Cake } from 'lucide-react';
import './index.css';
function App() {
  const [user, setUser] = useState<User | null>(null); 

  useEffect(() => {
    // Inicializa Netlify Identity
    netlifyIdentity.init();

    // Establece el usuario autenticado
    netlifyIdentity.on('login', (user) => {
      setUser(user);
      netlifyIdentity.close();
    });
    netlifyIdentity.on('logout', () => setUser(null));
  }, []);

  const handleLogin = () => {
    netlifyIdentity.open();
  };

  const handleLogout = () => {
    netlifyIdentity.logout();
  };

  return (
    <div className="app-background min-h-screen flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <Cake className="text-blue-600" size={24} />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
              Sistema de Facturación - Excursión 4º ESO
            </h1>
          </div>
          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-sm sm:text-base font-semibold text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                Cerrar sesión
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="text-sm sm:text-base font-semibold text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {user ? (
          <div className="grid gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ClienteForm />
            <ListaClientes />
          </div>
        ) : (
          <p className="text-center text-white text-700 mt-8 sm:mt-16 text-lg sm:text-xl">
            Debes iniciar sesión para acceder al sistema de facturación.
          </p>
        )}
      </main>

      <footer className="bg-white text-center text-gray-600 text-xs sm:text-sm py-4 mt-8">
        &copy; 2024 Sistema de Facturación - Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App;
