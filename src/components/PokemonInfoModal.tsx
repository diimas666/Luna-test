import { useEffect, useState } from 'react';
import { getPokemonsDetails, PokemonDetails } from '../api';
import clouse from '../assets/Clouse.svg';
interface PokemonInfoModalProps {
  url: string;
  onClose: () => void;
}
const PokemonInfoModal = ({ url, onClose }: PokemonInfoModalProps) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    getPokemonsDetails(url).then(setDetails);
  }, [url]);
  if (!details) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-4 rounded shadow-xl relative">
        <button onClick={onClose} className="w-6 h-6 absolute top-3 right-3">
          <img src={clouse} alt="close" /> 
        </button>
        <img
          src={details.sprites.front_default}
          alt={details.name}
          className="mx-auto"
        />

        <p>
          Type:{' '}
          {details.types.map((t) => (
            <span key={t.type.name} className="capitalize">
              {t.type.name}{' '}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default PokemonInfoModal;
