import {
  Box,
  Button,
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
import DoneIcon from '@mui/icons-material/Done';
import { SignalWifiStatusbarNullSharp } from '@mui/icons-material';

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
    toast.error(error?.response?.data?.message || 'Something went wrong');
  }

  console.log('7788', coursesData);

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
            mb: '1.5rem',
          }}
        >
          <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {allCategories?.map((cat, index) => (
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
          ?.filter(
            (item) =>
              item.category.title.toLowerCase() === selectedCat.toLowerCase() ||
              selectedCat === 'all'
          )
          ?.filter(
            (item) =>
              item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              searchTerm === ''
          )
          ?.sort((item1, item2) =>
            sortTerm === 'z-a' && item1.title > item2.title ? 1 : -1
          )
          ?.sort((item1, item2) =>
            sortTerm === 'a-z' && item1.title > item2.title ? -1 : 1
          )
          ?.sort((item1, item2) =>
            sortTerm === 'old' && item1.createdAt > item2.createdAt ? 1 : -1
          )
          ?.sort((item1, item2) =>
            sortTerm === 'new' && item1.createdAt > item2.createdAt ? -1 : 1
          )
          ?.map((course, index) => (
            <CourseItem key={index} course={course} />
          ))}
      </Box>
    </Box>
  );
};

export default CoursesPage;
