import Logo from '../assets/logos/LunaEdgeLogo.svg';
import TrainerForm from './TrainerForm';

interface TrainerData {
  firstName: string;
  lastName: string;
}
interface TrainerFormProps {
  onSubmit: (data: TrainerData) => void;
}
const TrainerCard = ({ onSubmit }: TrainerFormProps) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200 bg-[#33c4ff]">
      <div className="flex flex-col items-center">
        <img src={Logo} alt="logo" className="w-300 h-16 mb-4 imgTrainerCard" />
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2 h2-title">
          Добро пожаловать!
        </h2>
        <p className="text-center text-gray-800 mb-4 p-text">
          Введите ваше <strong>имя</strong> и <strong>фамилию</strong>, чтобы начать выбирать команду Pokémon.
        </p>

        <TrainerForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default TrainerCard;
