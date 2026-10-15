import { useState, useEffect } from 'react';
import type { Pokemon } from './types/pokemon';
import { PokemonCard } from './components/PokemonCard';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // Cargar los primeros 20 Pokémon como ejemplo
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await res.json();

        const detailedPokemons = await Promise.all(
          data.results.map(async (item: { url: string }) => {
            const pokeRes = await fetch(item.url);
            return await pokeRes.json();
          })
        );

        setPokemons(detailedPokemons);
      } catch (error) {
        console.error('Error cargando Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      <header className="bg-danger text-white py-4 mb-4 text-center shadow">
        <h1><i className="bi bi-circle-fill text-warning me-2"></i>Pokédex React + TS</h1>
      </header>

      <main className="container">
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;