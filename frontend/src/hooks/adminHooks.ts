import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from '../main';
import { Course } from '../types/Course';

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

export const useUpdateUserProfileMutation = () =>
  useMutation({
    mutationFn: async (userData: {
      name: string;
      email: string;
      phone: string | undefined;
      gender: string | undefined;
      dob: string;
    }) => (await axios.put('/api/admin/update-user-profile', userData)).data,
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

export const useChangeCourseStatusMutation = () =>
  useMutation({
    mutationFn: async ({
      courseId,
      status,
    }: {
      courseId: string | undefined;
      status: string;
    }) =>
      (await axios.put(`/api/admin/course/change-status`, { courseId, status }))
        .data,
    onSuccess: () => {
      queryClient.invalidateQueries(['all-courses']);
    },
  });

export const useAdminUpdateCourseMutation = () =>
  useMutation({
    mutationFn: async ({
      courseId,
      courseData,
    }: {
      courseId: string | undefined;
      courseData: Course;
    }) =>
      (await axios.put(`/api/admin/course/update/${courseId}`, courseData))
        .data,
    onSuccess: () => queryClient.invalidateQueries(['all-courses']),
  });

export const useAdminGetInstructorCourses = () =>
  useQuery({
    queryKey: ['admin-instructor-courses'],
    queryFn: async () =>
      (await axios.get('/api/admin/instructor-courses')).data,
  });
