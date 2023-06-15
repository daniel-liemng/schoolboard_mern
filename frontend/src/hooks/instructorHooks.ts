import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetInstructorAllStudentsQuery = () =>
  useQuery({
    queryKey: ['all-students'],
    queryFn: async () => (await axios.get('/api/instructor/students')).data,
  });
