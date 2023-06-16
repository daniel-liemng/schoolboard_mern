import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from '../main';

export const useLoginUserMutation = () =>
  useMutation({
    mutationFn: async (loginData) =>
      (await axios.post('/api/users/login', loginData)).data,
  });

export const useLogoutUserMutation = () =>
  useMutation({
    mutationFn: async () => (await axios.post('/api/users/logout')).data,
  });

export const useSignupUserMutation = () =>
  useMutation({
    mutationFn: async (signupData) =>
      (await axios.post('/api/users/signup', signupData)).data,
  });

export const useGetCurrentUserQuery = () =>
  useQuery({
    queryKey: ['current-user'],
    queryFn: async () => (await axios.get('/api/users/get-current-user')).data,
  });

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async (profileData) =>
      (await axios.put('/api/users/update-profile', profileData)).data,
    onSuccess: () => queryClient.invalidateQueries('current-user'),
  });

export const useSaveAvatarMutation = () =>
  useMutation({
    mutationFn: async (avatar) =>
      (await axios.put('/api/users/save-avatar', { avatar })).data,
    onSuccess: () => queryClient.invalidateQueries('current-user'),
  });

export const useChangePasswordMutation = () =>
  useMutation({
    mutationFn: async (passwordData) =>
      (await axios.patch('/api/users/change-password', passwordData)).data,
  });

export const useGetUserCoursesQuery = () =>
  useQuery({
    queryKey: ['user-courses'],
    queryFn: async () => (await axios.get('/api/users/courses')).data,
  });
