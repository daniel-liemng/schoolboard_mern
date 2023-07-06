import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import {
  DatePicker,
  LocalizationProvider,
  MobileTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { useGetAllCategoriesQuery } from '../../hooks/categoryHooks';
import { useAppSelector } from '../../hooks/hooks';
import { Category } from '../../types/Category';
import {
  useGetCourseQuery,
  useUpdateCourseMutation,
} from '../../hooks/courseHooks';
import { useParams } from 'react-router-dom';
import Loading from '../../compnents/Loading';

type FormValues = {
  title: string;
  course_code: string;
  category: string;
  desc: string;
  start_date?: Dayjs;
  day?: string;
  time_from: Dayjs;
  time_to: Dayjs;
  period?: string;
  fee?: string;
  total_student?: string;
};

const validationRules = {
  title: {
    required: 'Please provide title',
  },
  course_code: {
    required: 'Please provide course code',
  },
  category: {
    required: 'Please choose category',
  },
  desc: {
    required: 'Please provide description',
  },
  start_date: {
    validate: (val: Dayjs | null) => {
      if (val === null) {
        return 'Please select the start date';
      }

      if (!val.format('MMDDYYYY').match(/^\d{8}$/g)) {
        return 'Invalid date formats';
      }

      return true;
    },
  },
  day: {
    required: 'Please provide day',
  },
  time_from: {
    validate: (val: Dayjs | null) => {
      if (val === null) {
        return 'Please select the start time';
      }

      return true;
    },
  },
  time_to: {
    validate: (val: Dayjs | null) => {
      if (val === null) {
        return 'Please select the start time';
      }

      return true;
    },
  },
  period: {
    required: 'Please provide time period',
  },
  fee: {
    required: 'Please provide fee',
  },
  total_student: {
    required: 'Please provide total student',
  },
};

const AdminUpdateCoursePage = () => {
  const { courseId } = useParams();

  // const { user } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const { data: course, isLoading: isCourseLoading } = useGetCourseQuery(
    courseId as string
  );

  const { data: categories, isLoading: isCatLoading } =
    useGetAllCategoriesQuery();

  const { mutateAsync: updateCourse } = useUpdateCourseMutation();

  const { control, handleSubmit } = useForm<FormValues>({
    mode: 'onChange',
  });

  const getTime = (time: string, index: number) => {
    const specificTime = time.split(' - ')[index].trim();

    const formattedTime = dayjs(`1/1/1 ${specificTime}`).format('HH:mm');

    return `2023-06-10T${formattedTime}`;
  };

  const onSubmit = async (data: FormValues) => {
    const courseData = {
      title: data.title,
      course_code: data.course_code,
      instructor: course?.instructor?._id,
      category: data.category,
      desc: data.desc,
      start_date: dayjs(data.start_date).format('MM/DD/YYYY'),
      day: data.day,
      time: `${dayjs(data.time_from).format('hh:mm A')} - ${dayjs(
        data.time_to
      ).format('hh:mm A')}`,
      period: data.period,
      fee: data.fee,
      total_student: data.total_student,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await updateCourse({ courseId, courseData });
    toast.success('Course Updated');
    navigate(-1);
    // navigate('/user-courses');
  };

  if (isCourseLoading || isCatLoading) {
    return <Loading />;
  }

  return (
    <Box sx={{ padding: '3rem' }}>
      <Typography variant='h4' align='center' sx={{ mb: '3rem' }}>
        Update course
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name='title'
              control={control}
              defaultValue={course?.title || ''}
              rules={validationRules.title}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  type='text'
                  label='Title'
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  sx={{ marginBottom: '1rem' }}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name='course_code'
              control={control}
              defaultValue={course?.course_code || ''}
              rules={validationRules.course_code}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  type='text'
                  label='Course Code'
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  sx={{ marginBottom: '1rem' }}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name='category'
              control={control}
              defaultValue={course?.category?._id || ''}
              rules={validationRules.category}
              render={({ field, fieldState }) => (
                <FormControl
                  fullWidth
                  error={!!fieldState.error?.message}
                  sx={{ marginBottom: '1rem' }}
                >
                  <InputLabel id='gender'>Category</InputLabel>
                  <Select {...field} label='Category' labelId='category'>
                    <MenuItem disabled sx={{ color: 'gray', fontSize: '14px' }}>
                      Please choose the category
                    </MenuItem>
                    {categories?.map((item: Category) => (
                      <MenuItem value={item._id} key={item._id}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name='fee'
              control={control}
              defaultValue={course?.fee || ''}
              rules={validationRules.fee}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  type='text'
                  label='Fee (USD)'
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  sx={{ marginBottom: '1rem' }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name='desc'
              control={control}
              defaultValue={course?.desc || ''}
              rules={validationRules.desc}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  type='text'
                  label='Description'
                  multiline
                  rows={3}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  sx={{ marginBottom: '1rem' }}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name='start_date'
              control={control}
              defaultValue={dayjs(course.start_date) || dayjs('')}
              // rules={validationRules.dob}
              render={({ field, fieldState }) => (
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale='en'
                >
                  <DatePicker
                    {...field}
                    label='Start Date'
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        fullWidth: true,
                      },
                    }}
                    onChange={(date) => field.onChange(date)}
                  />
                  <FormHelperText
                    sx={{
                      color: 'red',
                      marginLeft: '1rem',
                    }}
                  >
                    {fieldState.error?.message}
                  </FormHelperText>
                </LocalizationProvider>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name='day'
              control={control}
              defaultValue={course?.day || ''}
              rules={validationRules.day}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  type='text'
                  label='Day'
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  sx={{ marginBottom: '1rem' }}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name='time_from'
              control={control}
              defaultValue={
                dayjs(getTime(course?.time, 0)) || dayjs('2023-06-10T12:00')
              }
              // rules={validationRules.dob}
              render={({ field, fieldState }) => (
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale='en'
                >
                  <MobileTimePicker
                    {...field}
                    label='Time (from)'
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        fullWidth: true,
                      },
                    }}
                    onChange={(date) => field.onChange(date)}
                  />
                  <FormHelperText
                    sx={{
                      color: 'red',
                      marginLeft: '1rem',
                    }}
                  >
                    {fieldState.error?.message}
                  </FormHelperText>
                </LocalizationProvider>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name='time_to'
              control={control}
              defaultValue={
                dayjs(getTime(course?.time, 1)) || dayjs('2023-06-10T12:00')
              }
              // rules={validationRules.dob}
              render={({ field, fieldState }) => (
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale='en'
                >
                  <MobileTimePicker
                    {...field}
                    label='Time (to)'
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        fullWidth: true,
                      },
                    }}
                    onChange={(date) => field.onChange(date)}
                  />
                  <FormHelperText
                    sx={{
                      color: 'red',
                      marginLeft: '1rem',
                    }}
                  >
                    {fieldState.error?.message}
                  </FormHelperText>
                </LocalizationProvider>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name='period'
              control={control}
              defaultValue={course?.period || ''}
              rules={validationRules.period}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  type='text'
                  label='Period'
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  sx={{ marginBottom: '1rem' }}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name='total_student'
              control={control}
              defaultValue={course?.total_student || ''}
              rules={validationRules.total_student}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  type='text'
                  label='Total Student'
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  sx={{ marginBottom: '1rem' }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: '1rem',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Button
            // component={Link}
            // to='/user-courses'
            onClick={() => navigate(-1)}
            variant='contained'
            // fullWidth
            disableElevation
            size='large'
            color='secondary'
            sx={{ marginTop: '1rem' }}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            // fullWidth
            disableElevation
            size='large'
            sx={{ marginTop: '1rem' }}
          >
            Update
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AdminUpdateCoursePage;
