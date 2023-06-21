import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from '../main';

export const useGetAllUsersQuery = () =>
  useQuery({
    queryKey: ['all-users'],
    queryFn: async () => (await axios.get('/api/admin/all-users')).data,
  });

export const useResetPasswordMutation = () =>
  useMutation({
    mutationFn: async (userId: string) =>
      (await axios.post('/api/admin/reset-password', { userId })).data,
  });

export const useChangeRoleMutation = () =>
  useMutation({
    mutationFn: async ({
      userId,
      role,
    }: {
      userId: string | undefined;
      role: string;
    }) => (await axios.put('/api/admin/change-role', { userId, role })).data,
    onSuccess: () => queryClient.invalidateQueries(['all-users']),
  });

export const useDeleteUserMutation = () =>
  useMutation({
    mutationFn: async (userId: string) =>
      (await axios.delete(`/api/admin/users/${userId}`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries(['all-sessions']);
      queryClient.invalidateQueries(['all-users']);
      queryClient.invalidateQueries(['all-courses']);
    },
  });
