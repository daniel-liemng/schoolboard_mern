import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { CourseData } from '../types/CourseInfo';
import { queryClient } from '../main';

export const useGetAllCoursesQuery = () =>
  useQuery({
    queryKey: ['all-courses'],
    queryFn: async () => (await axios.get('/api/courses')).data,
  });

export const useRegisterCourseMutation = () =>
  useMutation({
    mutationFn: async (courseId) =>
      (await axios.patch('/api/courses/register-course', { courseId })).data,
    onSuccess: () => queryClient.invalidateQueries(['all-courses']),
  });

export const useCreateCourseMutation = () =>
  useMutation({
    mutationFn: async (courseData) =>
      (await axios.post('/api/courses', courseData)).data,
  });

export const useGetCourseQuery = (courseId: string) =>
  useQuery({
    queryKey: ['course-detail', courseId],
    queryFn: async () => (await axios.get(`/api/courses/${courseId}`)).data,
    enabled: !!courseId,
  });

export const useUpdateCourseMutation = () =>
  useMutation({
    mutationFn: async ({
      courseId,
      courseData,
    }: {
      courseId: string;
      courseData: CourseData;
    }) => (await axios.put(`/api/courses/${courseId}`, courseData)).data,
    onSuccess: () => queryClient.invalidateQueries('user-courses'),
  });

export const useDeleteCourseMutation = () =>
  useMutation({
    mutationFn: async (courseId) =>
      (await axios.delete(`/api/courses/${courseId}`)).data,
  });

export const useGetInstructorCoursesQuery = () =>
  useQuery({
    queryKey: ['instructor-courses'],
    queryFn: async () =>
      (await axios.get('/api/courses/instructor-courses')).data,
  });
