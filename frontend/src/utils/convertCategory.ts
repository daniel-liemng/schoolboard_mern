import { Category } from '../types/Category';

export const convertCategory = (cats: Category[]) => {
  return cats.map((item) => item.title);
};
