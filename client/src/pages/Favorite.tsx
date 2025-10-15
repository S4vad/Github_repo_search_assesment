import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface Repo {
  _id: string;
  repoId: number;
  name: string;
  url: string;
  stars: number;
  language: string;
  description: string;
}

const Favorite = () => {
  const [favorites, setFavorites] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/favorites');
        setFavorites(response.data.favorites);
      } catch (error) {
        console.error('Failed to fetch favorites');
      }
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  const deleteRepo = async (id: string) => {
    try {
      await axios.delete(`/favorites/${id}`);
      setFavorites(favorites.filter(repo => repo._id !== id));
    } catch (error) {
      alert('Failed to remove from favorites');
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Favorite Repositories</h1>
      {favorites.length === 0 ? (
        <p>No favorite repositories found.</p>
      ) : (
        <div className="grid gap-4">
          {favorites.map(repo => (
            <div key={repo._id} className="border p-4 rounded">
              <h2 className="text-xl font-bold mb-2">
                <a href={repo.url} target="_blank" className="text-blue-600 hover:underline">
                  {repo.name}
                </a>
              </h2>
              <p className="text-gray-700 mb-2">{repo.description}</p>
              <p className="text-sm mb-1">
                <strong>Language:</strong> {repo.language || 'N/A'}
              </p>
              <p className="text-sm mb-3">
                <strong>Stars:</strong> {repo.stars}
              </p>
              <button 
                onClick={() => deleteRepo(repo._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;