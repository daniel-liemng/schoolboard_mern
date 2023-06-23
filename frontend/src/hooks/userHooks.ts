import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from '../main';

export const useLoginUserMutation = () =>
  useMutation({
    mutationFn: async (loginData: { email: string; password: string }) =>
      (await axios.post('/api/users/login', loginData)).data,
  });

export const useLogoutUserMutation = () =>
  useMutation({
    mutationFn: async () => (await axios.post('/api/users/logout')).data,
  });

export const useSignupUserMutation = () =>
  useMutation({
    mutationFn: async (signupData: {
      name: string;
      email: string;
      password: string;
    }) => (await axios.post('/api/users/signup', signupData)).data,
  });

export const useGetCurrentUserQuery = () =>
  useQuery({
    queryKey: ['current-user'],
    queryFn: async () => (await axios.get('/api/users/get-current-user')).data,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
  });

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async (profileData: {
      name: string;
      email: string;
      phone: string | undefined;
      gender: string | undefined;
      dob: string;
    }) => (await axios.put('/api/users/update-profile', profileData)).data,
    onSuccess: () => queryClient.invalidateQueries(['current-user']),
  });

export const useSaveAvatarMutation = () =>
  useMutation({
    mutationFn: async (avatar) =>
      (await axios.put('/api/users/save-avatar', { avatar })).data,
    onSuccess: () => queryClient.invalidateQueries(['current-user']),
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
