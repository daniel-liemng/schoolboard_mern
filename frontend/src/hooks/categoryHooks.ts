import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetAllCategoriesQuery = () =>
  useQuery({
    queryKey: ['all-cat'],
    queryFn: async () => (await axios.get('/api/categories')).data,
  });

export const useCreateCategoryMutation = () =>
  useMutation({
    mutationFn: async (catData) =>
      (await axios.post('/api/categories', catData)).data,
  });

export const useUpdateCategoryMutation = () =>
  useMutation({
    mutationFn: async ({
      catId,
      catData,
    }: {
      catId: string;
      catData: { title: string };
    }) => (await axios.put(`/api/categories/${catId}`, catData)).data,
  });

export const useDeleteCategoryMutation = () =>
  useMutation({
    mutationFn: async (catId) =>
      (await axios.delete(`/api/categories/${catId}`)).data,
  });
