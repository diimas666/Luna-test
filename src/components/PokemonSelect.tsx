import { getPokemons, Pokemon } from '../api';
import { useEffect, useState } from 'react';
import arrowDown from '../assets/dropdown-select.svg';

interface PokemonSelectProps {
  selectedPokemons: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
}

const PokemonSelect = ({ selectedPokemons, onSelect }: PokemonSelectProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    getPokemons().then(setPokemons);
  }, []);

  const handleSelect = (pokemon: Pokemon) => {
    if (selectedPokemons.length >= 4) {
      setError('Можно выбрать только 4 покемонов.');
      return;
    }
    setError('');
    onSelect(pokemon);
    setSearch('');
    setIsDropdownOpen(false);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-sm mx-auto relative">
      <label
        htmlFor="pokemon-search"
        className="block mb-2 text-lg font-semibold text-gray-700"
      >
        Поиск покемона:
      </label>
      <input
        type="search"
        id="pokemon-search"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        placeholder="Введите имя покемона"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsDropdownOpen(true);
        }}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
      />

      {isDropdownOpen && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 max-h-40 overflow-auto z-10">
          {filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon) => (
              <li
                key={pokemon.name}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onMouseDown={() => handleSelect(pokemon)}
              >
                {pokemon.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">Не найдено</li>
          )}
        </ul>
      )}

      <label
        htmlFor="pokemon-select"
        className="block mt-4 mb-2 text-lg font-semibold text-gray-700"
      >
        Выберите покемона:
      </label>
      <div className="relative w-full">
        <select
          id="pokemon-select"
          className="w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg shadow-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition cursor-pointer text-lg"
          onChange={(e) => {
            const selectedPokemon = pokemons.find((p) => p.name === e.target.value);
            if (selectedPokemon) handleSelect(selectedPokemon);
          }}
          value=""
        >
          <option value="" disabled>
            Выберите покемона
          </option>
          {pokemons.map((pokemon) => (
            <option key={pokemon.name} value={pokemon.name}>
              {pokemon.name}
            </option>
          ))}
        </select>

        {/* Кастомная стрелка */}
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <img className="w-5 h-5" src={arrowDown} alt="arrow" />
        </div>
      </div>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default PokemonSelect;