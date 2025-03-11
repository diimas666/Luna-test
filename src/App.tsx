import { useState } from 'react';
import { Pokemon, PokemonDetails, getPokemonsDetails } from './api';
// компоненты
import PokemonSelect from './components/PokemonSelect';
import TrainerCard from './components/TrainerCard';

function App() {
  const [trainer, setTrainer] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);

  const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);
  const [pokemonSprites, setPokemonSprites] = useState<PokemonDetails[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTrainerSubmit = (data: {
    firstName: string;
    lastName: string;
  }) => {
    setTrainer(data);
  };

  const handlePokemonSelect = async (pokemon: Pokemon) => {
    if (
      selectedPokemons.length < 4 &&
      !selectedPokemons.some((p) => p.name === pokemon.name)
    ) {
      setSelectedPokemons([...selectedPokemons, pokemon]);

      if (selectedPokemons.length === 3) {
        const details = await Promise.all(
          [...selectedPokemons, pokemon].map((p) => getPokemonsDetails(p.url))
        );
        setPokemonSprites(details);
        setIsModalOpen(true);
      }
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {!trainer ? (
        <TrainerCard onSubmit={setTrainer} />
      ) : (
        <div className="flex flex-col w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            {trainer.firstName}, выбери 4 покемонов:
          </h2>

          <div className="flex flex-row gap-8">
            {/* Выбор покемонов */}
            <div className="w-1/2">
              <PokemonSelect
                selectedPokemons={selectedPokemons}
                onSelect={handlePokemonSelect}
              />
            </div>

            {/* Выбранные покемоны */}
            <div className="w-1/2 bg-blue-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-center">Твоя команда</h3>
              <ul className="mt-4 space-y-2 text-center">
                {selectedPokemons.map((pokemon) => (
                  <li key={pokemon.name} className="text-blue-600 font-semibold">
                    {pokemon.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {selectedPokemons.length === 4 && (
            <button
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition mx-auto block"
              onClick={async () => {
                const details = await Promise.all(
                  selectedPokemons.map((p) => getPokemonsDetails(p.url))
                );
                setPokemonSprites(details);
                setIsModalOpen(true);
              }}
            >
              Показать команду
            </button>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-xl relative w-96">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold text-center mb-4">Твоя команда Pokémon</h2>
            <div className="grid grid-cols-2 gap-4">
              {pokemonSprites.map((details) => (
                <div key={details.id} className="text-center">
                  <img
                    src={details.sprites.front_default}
                    alt={details.name}
                    className="mx-auto"
                  />
                  <p className="capitalize font-semibold text-blue-700">{details.name}</p>
                  <p className="text-sm text-gray-600">
                    {details.types.map((t) => (
                      <span key={t.type.name}>{t.type.name} </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
