import axios from 'axios';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';
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
import { amber, deepOrange, grey } from '@mui/material/colors';
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

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
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
  {
    path: '/admin',
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
  {
    path: '/admin/course/update-course/:courseId',
    element: (
      <Layout>
        <UpdateCoursePage />
      </Layout>
    ),
  },
  {
    path: '/admin/course/:courseId',
    element: (
      <Layout>
        <CourseDetailsPage />
      </Layout>
    ),
  },
  {
    path: '/admin/category',
    element: (
      <Layout>
        <CategoryPage />
      </Layout>
    ),
  },

  {
    path: '/admin/attendance/:courseId',
    element: (
      <Layout>
        <AttendancePage />
      </Layout>
    ),
  },
  {
    path: '/instructor/course/:courseId',
    element: (
      <InstructorLayout>
        <CourseSummaryPage />
      </InstructorLayout>
    ),
  },
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
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: '#000',
            secondary: grey[500],
          },
        }),
  },
});

const App = () => {
  const dispatch = useAppDispatch();

  const [mode, setMode] = useState<PaletteMode>('light');

  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: allCourses } = useGetAllCoursesQuery();

  console.log('CURRENT-APP', currentUser);

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
  }, [allCourses]);

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
