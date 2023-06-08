import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetAllCategoriesQuery = () =>
  useQuery({
    queryKey: ['all-cat'],
    queryFn: async () => (await axios.get('/api/categories')).data,
  });
