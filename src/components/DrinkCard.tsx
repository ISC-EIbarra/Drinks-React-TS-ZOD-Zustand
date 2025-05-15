import { Drink } from '../types';

type DrinkCardProps = {
  drink: Drink;
};

export default function DrinkCard({ drink }: DrinkCardProps) {
  return (
    <>
      <p>{drink.strDrink}</p>
    </>
  );
}
