import { useForm } from 'react-hook-form';

interface TrainerFormInfo {
  firstName: string;
  lastName: string;
}
interface TrainerFormProps {
  onSubmit: (data: TrainerFormInfo) => void;
}
const TrainerForm = ({ onSubmit }: TrainerFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrainerFormInfo>();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col  gap-2.5"
    >
      <input
      className='p-2 rounded'
        type="text"
        placeholder="First name"
        {...register('firstName', {
          required: 'Введите имя',
          pattern: {
            value: /^[A-Za-z]{2,12}$/,
            message: 'Только буквы Eng (2-12 символов)',
          },
        })}
      />
      {/* конец инпута для имени */}

      {/* ошибка  */}
      {errors.firstName && <p>{errors.firstName.message}</p>}

      {/* второй инпут  */}

      <input
      className='p-2 rounded'
        type="text"
        placeholder="Last Name"
        {...register('lastName', {
          required: 'Введите фамилию',
          pattern: {
            value: /^[A-Za-z]{2,12}$/,
            message: 'Только буквы Eng (2-12 символов)',
          },
        })}
      />
      {/* конец инпута для фамилии */}

      {/* ошибка  */}
      {errors.lastName && <p>{errors.lastName.message}</p>}
      <button className='p-2 rounded bg-blue-500 text-white'
       type="submit">Отправить</button>
    </form>
  );
};

export default TrainerForm;
