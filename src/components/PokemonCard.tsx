import React from 'react';
import type { Pokemon } from '../types/pokemon';

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const image = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 text-center shadow-sm">
        <img src={image} className="card-img-top p-3" alt={pokemon.name} style={{ height: '200px', objectFit: 'contain' }} />
        <div className="card-body bg-light">
          <span className="badge bg-secondary mb-2">#{String(pokemon.id).padStart(3, '0')}</span>
          <h5 className="card-title text-capitalize">{pokemon.name}</h5>
          <div className="d-flex justify-content-center gap-2 mt-2">
            {pokemon.types.map((t) => (
              <span key={t.type.name} className="badge bg-primary text-capitalize">
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};