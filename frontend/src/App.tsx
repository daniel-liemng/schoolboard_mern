import axios from 'axios';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  CategoryPage,
  CourseDetailsPage,
  CoursesPage,
  CreateCoursePage,
  ErrorPage,
  HomePage,
  LoginPage,
  ProfilePage,
  SignupPage,
  UpdateCoursePage,
  InstructorCoursesPage,
  UsersPage,
  UserCoursesPage,
  AttendancePage,
  CourseSummaryPage,
  DashboardPage,
  SettingsPage,
  StudentsPage,
  AdminCoursesPage,
} from './pages';
import Layout from './compnents/Layout';
import CssBaseline from '@mui/material/CssBaseline';
import { createContext, useEffect, useMemo, useState } from 'react';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { blue, blueGrey, grey } from '@mui/material/colors';
import { Toaster } from 'react-hot-toast';
import AdminLayout from './compnents/admin/AdminLayout';
import InstructorLayout from './compnents/instructor/InstructorLayout';
import { useAppDispatch } from './hooks/hooks';
import { useGetCurrentUserQuery } from './hooks/userHooks';
import { setCurrentUser } from './redux/userSlice';
import AdminProtectedRoute from './routes/AdminProtectedRoute';
import InstructorProtectedRoute from './routes/InstructorProtectedRoute';
import { useGetAllCoursesQuery } from './hooks/courseHooks';
import { setCourses } from './redux/courseSlice';
import AdminUpdateCoursePage from './pages/admin/AdminUpdateCoursePage';

// axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.baseURL = 'https://schoolboard-mern-api.vercel.app';
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  // SHARED
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
  {
    path: '/signup',
    element: (
      <Layout>
        <SignupPage />
      </Layout>
    ),
  },
  {
    path: '/courses',
    element: (
      <Layout>
        <CoursesPage />
      </Layout>
    ),
  },
  // END SHARED

  // USER
  {
    path: '/user/courses',
    element: (
      <Layout>
        <UserCoursesPage />
      </Layout>
    ),
  },
  {
    path: '/user/profile',
    element: (
      <Layout>
        <ProfilePage />
      </Layout>
    ),
  },
  // END USER

  // INSTRUCTOR
  {
    path: '/instructor/courses',
    element: (
      <InstructorProtectedRoute>
        <InstructorLayout>
          <InstructorCoursesPage />
        </InstructorLayout>
      </InstructorProtectedRoute>
    ),
  },
  {
    path: '/instructor/course/:courseId',
    element: (
      <InstructorProtectedRoute>
        <InstructorLayout>
          <CourseSummaryPage />
        </InstructorLayout>
      </InstructorProtectedRoute>
    ),
  },
  {
    path: '/instructor/course/update/:courseId',
    element: (
      <InstructorProtectedRoute>
        <InstructorLayout>
          <UpdateCoursePage />
        </InstructorLayout>
      </InstructorProtectedRoute>
    ),
  },
  {
    path: '/instructor/course/attendance/:courseId',
    element: (
      <InstructorProtectedRoute>
        <InstructorLayout>
          <AttendancePage />
        </InstructorLayout>
      </InstructorProtectedRoute>
    ),
  },
  {
    path: '/instructor/students',
    element: (
      <InstructorProtectedRoute>
        <InstructorLayout>
          <StudentsPage />
        </InstructorLayout>
      </InstructorProtectedRoute>
    ),
  },
  // END INSTRUCTOR

  // ADMIN
  {
    path: '/admin/dashboard',
    element: (
      <AdminProtectedRoute>
        <AdminLayout>
          <DashboardPage />
        </AdminLayout>
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <AdminProtectedRoute>
        <AdminLayout>
          <UsersPage />
        </AdminLayout>
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/categories',
    element: (
      <AdminProtectedRoute>
        <AdminLayout>
          <CategoryPage />
        </AdminLayout>
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/courses',
    element: (
      <AdminProtectedRoute>
        <AdminLayout>
          <AdminCoursesPage />
        </AdminLayout>
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/settings',
    element: (
      <AdminProtectedRoute>
        <AdminLayout>
          <SettingsPage />
        </AdminLayout>
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/course/:courseId',
    element: (
      <AdminProtectedRoute>
        <AdminLayout>
          <CourseDetailsPage />
        </AdminLayout>
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/course/create-course',
    element: (
      <Layout>
        <CreateCoursePage />
      </Layout>
    ),
  },
  {
    path: '/admin/course/update/:courseId',
    element: (
      <AdminProtectedRoute>
        <AdminLayout>
          <AdminUpdateCoursePage />
        </AdminLayout>
      </AdminProtectedRoute>
    ),
  },
  // {
  //   path: '/admin/course/update-course/:courseId',
  //   element: (
  //     <Layout>
  //       <UpdateCoursePage />
  //     </Layout>
  //   ),
  // },
  {
    path: '/admin/attendance/:courseId',
    element: (
      <Layout>
        <AttendancePage />
      </Layout>
    ),
  },
  // END ADMIN

  // {
  //   path: '/instructor/course/:courseId',
  //   element: (
  //     <InstructorLayout>
  //       <CourseSummaryPage />
  //     </InstructorLayout>
  //   ),
  // },
  {
    path: '*',
    element: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
  },
]);

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...blue,
      ...(mode === 'dark' && {
        main: blueGrey[700],
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: grey[700],
        paper: grey[700],
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
          }
        : {
            primary: '#fff',
          }),
    },
  },
});

const App = () => {
  const dispatch = useAppDispatch();

  const [mode, setMode] = useState<PaletteMode>('light');

  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: allCourses } = useGetAllCoursesQuery();

  useEffect(() => {
    if (currentUser) {
      const {
        _id,
        name,
        email,
        phone,
        gender,
        dob,
        role,
        registeredCourseIds,
        avatar,
      } = currentUser;
      dispatch(
        setCurrentUser({
          _id,
          name,
          email,
          phone,
          gender,
          dob,
          role,
          registeredCourseIds,
          avatar,
        })
      );
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    dispatch(setCourses(allCourses));
  }, [allCourses, dispatch]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        );
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster position='top-center' toastOptions={{ duration: 5000 }} />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default App;
