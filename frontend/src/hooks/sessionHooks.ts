import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from '../main';

export const useGetAllSessionsByCourseIdQuery = (courseId: string) =>
  useQuery({
    queryKey: ['all-sessions'],
    queryFn: async () =>
      (await axios.get(`/api/sessions/all/${courseId}`)).data,
  });

export const useCreateSessionMutation = () =>
  useMutation({
    mutationFn: async (sesData) =>
      (await axios.post('/api/sessions', sesData)).data,
    onSuccess: () => queryClient.invalidateQueries(['all-sessions']),
  });

export const useUpdateStudentIdsMutation = () =>
  useMutation({
    mutationFn: async ({
      sessionId,
      studentData,
    }: {
      sessionId: string;
      studentData: string[];
    }) => {
      console.log(sessionId);

      return (
        await axios.put(`/api/sessions/${sessionId}`, {
          studentIds: studentData,
        })
      ).data;
    },
  });

export const useGetSessionQuery = (sessionId: string) =>
  useQuery({
    queryKey: ['session', sessionId],
    queryFn: async () => (await axios.get(`/api/sessions/${sessionId}`)).data,
    enabled: !!sessionId,
  });

export const useDeleteSessionMutation = (courseId: string) =>
  useMutation({
    mutationFn: async (sessionId: string) =>
      (await axios.delete(`/api/sessions/${sessionId}`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries(['all-sessions']);
      queryClient.invalidateQueries(['course-detail', courseId]);
      queryClient.invalidateQueries(['all-courses']);
    },
  });
