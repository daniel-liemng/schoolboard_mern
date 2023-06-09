import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetAllUsersQuery = () =>
  useQuery({
    queryKey: ['all-users'],
    queryFn: async () => (await axios.get('/api/admin/all-users')).data,
  });
