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
  UserCoursesPage,
} from './pages';
import Layout from './compnents/Layout';
import CssBaseline from '@mui/material/CssBaseline';
import { createContext, useMemo, useState } from 'react';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { Toaster } from 'react-hot-toast';

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
    path: '/profile',
    element: (
      <Layout>
        <ProfilePage />
      </Layout>
    ),
  },
  {
    path: '/user-courses',
    element: (
      <Layout>
        <UserCoursesPage />
      </Layout>
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
  const [mode, setMode] = useState<PaletteMode>('light');
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

  // const theme = useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode,
  //       },
  //     }),
  //   [mode]
  // );

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
