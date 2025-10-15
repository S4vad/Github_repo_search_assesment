import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/favorites');
        setIsChecking(false);
      } catch (error) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      navigate('/login');
    }
  };

  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray-800 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex gap-4 items-center">
          <Link to="/" className="hover:text-gray-300 font-medium">
            Dashboard
          </Link>
          <Link to="/favorites" className="hover:text-gray-300 font-medium">
            Favorites
          </Link>
          <button 
            onClick={handleLogout}
            className="ml-auto px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;