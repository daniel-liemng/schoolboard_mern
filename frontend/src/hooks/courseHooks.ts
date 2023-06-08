import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CourseData } from '../types/CourseInfo';

export const useGetAllCoursesQuery = () =>
  useQuery({
    queryKey: ['all-courses'],
    queryFn: async () => (await axios.get('/api/courses')).data,
  });

export const useRegisterCourseMutation = () =>
  useMutation({
    mutationFn: async (courseId) =>
      (await axios.patch('/api/courses/register-course', { courseId })).data,
    retry: false,
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
  });

// export const useGetUserCoursesQuery = () =>
//   useQuery({
//     queryKey: ['user-courses'],
//     queryFn: async () => (await axios.get('/api/courses/user/courses')).data,
//   });
