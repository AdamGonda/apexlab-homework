import { Link, Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export const Root = () => {
  const location = useLocation();

  return (
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <header className="bg-gray-800 p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Crypto Alerts</h1>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className={`hover:text-gray-300 ${location.pathname === '/' ? 'underline' : ''}`}>
                  Monitor
                </Link>
              </li>
              <li>
                <Link to="/alerts" className={`hover:text-gray-300 ${location.pathname === '/alerts' ? 'underline' : ''}`}> 
                  Alerts
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main id="detail" className="flex-grow container mx-auto p-4" >
          <Outlet />
        </main>
      </div>
  );
};
