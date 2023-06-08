import { Box } from '@mui/material';
import { useGetAllCategoriesQuery } from '../hooks/categoryHooks';
import CategoryZone from '../compnents/course/CategoryZone';
import { convertCategory } from '../utils/convertCategory';
import CourseZone from '../compnents/course/CourseZone';
import { useGetAllCoursesQuery } from '../hooks/courseHooks';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setCourses } from '../redux/courseSlice';
import { useEffect, useState } from 'react';

const CoursesPage = () => {
  const { data: categories } = useGetAllCategoriesQuery();
  const { data, isLoading, error } = useGetAllCoursesQuery();

  const [fetchAgain, setFetchAgain] = useState(false);

  const { courses } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();

  const allCategories = categories && ['All', ...convertCategory(categories)];

  useEffect(() => {
    dispatch(setCourses(data));
  }, [dispatch, data, fetchAgain]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1rem',
        height: '100%',
      }}
    >
      <Box sx={{ bgcolor: 'white', width: '200px', padding: '1rem' }}>
        <CategoryZone allCategories={allCategories} />
      </Box>
      <Box sx={{ bgcolor: 'white', flex: '1', padding: '1rem' }}>
        <CourseZone courses={courses} setFetchAgain={setFetchAgain} />
      </Box>
    </Box>
  );
};

export default CoursesPage;
