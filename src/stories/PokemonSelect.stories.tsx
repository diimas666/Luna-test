import type { Meta, StoryObj } from '@storybook/react';
import PokemonSelect from '../components/PokemonSelect';
import { Pokemon } from '../api';

const meta: Meta<typeof PokemonSelect> = {
  title: 'Components/PokemonSelect',
  component: PokemonSelect,
  parameters: {
    docs: {
      description: {
        component: 'Компонент выбора покемонов с возможностью фильтрации.',
      },
    },
  },
};

export default meta;

const samplePokemons: Pokemon[] = [
  { name: 'pikachu', url: '#' },
  { name: 'bulbasaur', url: '#' },
  { name: 'charmander', url: '#' },
  { name: 'squirtle', url: '#' },
];

type Story = StoryObj<typeof PokemonSelect>;

export const Default: Story = {
  args: {
    selectedPokemons: [],
    onSelect: (pokemon) => alert(`Выбран покемон: ${pokemon.name}`),
  },
};
