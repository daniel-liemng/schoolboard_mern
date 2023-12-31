/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useGetAllCategoriesQuery } from '../hooks/categoryHooks';
import { convertCategory } from '../utils/convertCategory';
import { useGetAllCoursesQuery } from '../hooks/courseHooks';
import { useAppDispatch } from '../hooks/hooks';
import { setCategories, setCourses } from '../redux/courseSlice';
import { useEffect, useState } from 'react';
import Loading from '../compnents/Loading';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import CourseItem from '../compnents/course/CourseItem';
import { Course } from '../types/Course';

const CoursesPage = () => {
  const dispatch = useAppDispatch();

  const { data: categoriesData, isLoading, error } = useGetAllCategoriesQuery();
  const {
    data: coursesData,
    isLoading: isCatLoading,
    error: catError,
  } = useGetAllCoursesQuery();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortTerm, setSortTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const allCategories = categoriesData && [
    'All',
    ...convertCategory(categoriesData),
  ];

  useEffect(() => {
    dispatch(setCourses(coursesData));
    dispatch(setCategories(categoriesData));
  }, [dispatch, coursesData, categoriesData]);

  if (isCatLoading || isLoading) {
    return <Loading />;
  }

  if (error instanceof AxiosError) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
  }

  if (catError instanceof AxiosError) {
    toast.error(catError?.response?.data?.message || 'Something went wrong');
  }

  return (
    <Box
      sx={{
        height: '100%',
        p: '2rem',
      }}
    >
      <Box>
        <TextField
          // fullWidth
          size='small'
          label='Search Course'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: '1.5rem', width: '50%' }}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            mb: '1.5rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {allCategories?.map((cat: string, index: number) => (
              <Chip
                label={cat}
                onClick={() => setSelectedCat(cat.toLowerCase())}
                variant='outlined'
                key={index}
                sx={{
                  backgroundColor: '#ffc107',
                  ...(cat.toLowerCase() === selectedCat.toLowerCase() && {
                    backgroundColor: '#00bcd4',
                  }),
                }}
              />
            ))}
          </Box>
          <Box sx={{ width: '200px' }}>
            <FormControl fullWidth size='small'>
              <InputLabel id='sort-course'>Sort By</InputLabel>
              <Select
                labelId='sort-course'
                id='demo-simple-select'
                label='Sort By'
                value={sortTerm}
                onChange={(e) => setSortTerm(e.target.value)}
              >
                <MenuItem value='a-z'>Name: A - Z</MenuItem>
                <MenuItem value='z-a'>Name: Z - A</MenuItem>
                <MenuItem value='new'>Date: Newest</MenuItem>
                <MenuItem value='old'>Date: Oldest</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {coursesData
          ?.filter((item: Course) => item.status !== 'inactive')
          ?.filter(
            (item: Course) =>
              item.category.title.toLowerCase() === selectedCat.toLowerCase() ||
              selectedCat === 'all'
          )
          ?.filter(
            (item: Course) =>
              item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              searchTerm === ''
          )
          ?.sort((item1: Course, item2: Course) =>
            sortTerm === 'z-a' && item1.title > item2.title ? 1 : -1
          )
          ?.sort((item1: Course, item2: Course) =>
            sortTerm === 'a-z' && item1.title > item2.title ? -1 : 1
          )
          ?.sort((item1: Course, item2: Course) =>
            sortTerm === 'old' && item1.start_date > item2.start_date ? 1 : -1
          )
          ?.sort((item1: Course, item2: Course) =>
            sortTerm === 'new' && item1.start_date > item2.start_date ? -1 : 1
          )
          ?.map((course: Course, index: number) => (
            <CourseItem key={index} course={course} />
          ))}
      </Box>
    </Box>
  );
};

export default CoursesPage;
