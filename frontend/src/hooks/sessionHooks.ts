import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from '../main';

export const useGetAllSessions = (courseId: string) =>
  useQuery({
    queryKey: ['all-sessions'],
    queryFn: async () => (await axios.get(`/api/sessions/${courseId}`)).data,
  });

export const useCreateSessionMutation = () =>
  useMutation({
    mutationFn: async (sesData) =>
      (await axios.post('/api/sessions', sesData)).data,
    onSuccess: () => queryClient.invalidateQueries(['all-sessions']),
  });
