import { useState } from 'react';
import { requestData, requestSvg } from '../services/requests';
import pikachu from '../assets/pikachu.png';
import { pokemonList } from '../utils/pokemonList';

interface workout {
  wodData?: Record<string, any>;
}

const PokemonFilter = () => {
  const [currentFilter, setCurrentFilter] = useState('Selecione um Pokémon');
  const [invisible, setInvisible] = useState(true);
  const [workout, setWorkout] = useState<workout>({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');

  const fetchWorkout = async (id: string) => {
    try {
      setLoading(true);
      const pokemonSvg = await requestSvg(`/${id}.svg`)
      const response = await requestData(`/workouts/pokemon/${id}`);
      setImage(pokemonSvg);
      setWorkout(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCurrentFilter = () => {
    setInvisible(false);
    const selectElement = document.getElementById('pokemon-filter') as HTMLSelectElement
    const selectedIndex = selectElement.selectedIndex;
    const selectedKey = selectElement.options[selectedIndex].getAttribute('data-key') || '';
    const idMatch = selectedKey.match(/\/(\d+)\/$/);
    const id = idMatch ? idMatch[1] : '1';
    setCurrentFilter(id);
    fetchWorkout(id);
  };

  return (
    <div>
      <div>
        <h2>Escolha o seu Pokémon favorito e descubra qual WOD mais combina com você!</h2>
        <div className="filter-container">
          <label htmlFor="pokemon-filter">
            <select
              id="pokemon-filter"
              defaultValue={currentFilter}
              className="pokemon-filter"
            >
              {
                pokemonList.map((pokemon: { name: string, url: string }) => (
                  <option key={pokemon.name} data-key={pokemon.url}>{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }</option>
                ))
              }
            </select>
          </label>
          <button
            type="button"
            onClick={() => handleCurrentFilter()}
            className="pokemon-search"
            >
            Buscar
          </button>
        </div>
      </div>
      {
        !invisible && (
          <div>
            <h2>O WOD mais indicado para você</h2>
            {loading ? <div className="loading-container"><img src={pikachu} className="loading" alt="Loading icon" /></div> : (
              <div className="wod-container">
                <div className="background-image">
                  <img
                    src={image}
                    alt="Pokemon sprite"
                  />
                </div>
                <div className="container-left">
                  <div className="text-content">
                    <h2 className="wod-title">{workout?.wodData?.title}</h2>
                    <h3 className="wod-subtitle">{workout?.wodData?.subtitle}</h3>
                  </div>
                </div>
                <div className="container-right">
                  {workout?.wodData?.workout.map((exercise: string, index: number) => (
                    <p
                      key={index}
                      className={`wod-exercises ${index === 0 ? 'bold' : ''}`}
                    >{exercise.replace(/:/, "")}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      }
    </div>
  );
};

export default PokemonFilter;
