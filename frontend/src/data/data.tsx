import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const menu = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Courses',
    link: '/courses',
  },
  {
    name: 'Login',
    link: '/login',
  },
];

export const userNav = [
  {
    name: 'Profile',
    link: '/profile',
  },
  {
    name: 'Courses',
    link: '/user/courses',
  },
];

export const instructorNav = [
  {
    name: 'Courses',
    link: '/instructor/courses',
    icon: <LibraryBooksOutlinedIcon fontSize='large' />,
  },
  {
    name: 'Students',
    link: '/instructor/students',
    icon: <GroupsOutlinedIcon fontSize='large' />,
  },
];

export const adminNav = [
  {
    name: 'Dashboard',
    link: '/admin/dashboard',
    icon: <DvrOutlinedIcon fontSize='large' />,
  },
  {
    name: 'Users',
    link: '/admin/users',
    icon: <GroupsOutlinedIcon fontSize='large' />,
  },
  {
    name: 'Categories',
    link: '/admin/categories',
    icon: <ListAltOutlinedIcon fontSize='large' />,
  },
  {
    name: 'Courses',
    link: '/admin/courses',
    icon: <LibraryBooksOutlinedIcon fontSize='large' />,
  },
  {
    name: 'Settings',
    link: '/admin/settings',
    icon: <SettingsOutlinedIcon fontSize='large' />,
  },
];
