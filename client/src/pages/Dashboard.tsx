import React, { useState } from 'react';
import axios from 'axios';

type Repo = {
  id: number;
  name: string;
  stargazers_count: number;
  language: string;
  description: string;
  html_url: string;
};

const Dashboard: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`/search/${encodeURIComponent(keyword)}`);
      setRepos(res.data.items || []);
    } catch (err) {
      setError('Failed to search repositories');
    }
    setLoading(false);
  };

  const addToFavorites = async (repo: Repo) => {
    try {
      await axios.post('/favorites', {
        repoId: repo.id,
        name: repo.name,
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
        description: repo.description
      });
      alert('Added to favorites!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to add to favorites');
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="Search GitHub repositories..."
            className="flex-1 border px-3 py-2 rounded"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid gap-4">
        {repos.length === 0 && !loading && <p>No results.</p>}
        {repos.map(repo => (
          <div key={repo.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold mb-2">
              <a href={repo.html_url} target="_blank" className="text-blue-600 hover:underline">
                {repo.name}
              </a>
            </h2>
            <p className="text-gray-700 mb-2">{repo.description}</p>
            <p className="text-sm mb-1">
              <strong>Language:</strong> {repo.language || 'N/A'}
            </p>
            <p className="text-sm mb-3">
              <strong>Stars:</strong> {repo.stargazers_count}
            </p>
            <button 
              onClick={() => addToFavorites(repo)}
              className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
            >
               Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;