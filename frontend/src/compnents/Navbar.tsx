import { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { menu } from '../data/data';
import { Avatar, Menu, MenuItem, Tooltip, useTheme } from '@mui/material';
import { ColorModeContext } from '../App';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

import { setCurrentUser } from '../redux/userSlice';
import { useLogoutUserMutation } from '../hooks/userHooks';
import Logo from '../assets/logo.svg';

const drawerWidth = 240;

interface NavbarProps {
  window?: () => Window;
}

const Navbar = (props: NavbarProps) => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const { mutateAsync: logout } = useLogoutUserMutation();

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const appMenu = isAuthenticated ? menu.slice(0, 2) : menu;

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState: boolean) => !prevState);
  };

  const isAdmin = user?.role === 'admin';
  const isInstructor = user?.role === 'instructor';
  const isStudent = user?.role === 'user';

  const logoutHandler = async () => {
    await logout();
    dispatch(setCurrentUser(null));
    localStorage.clear();

    navigate('/');
  };

  const AccountMenu = () => (
    <Menu
      sx={{ mt: '45px' }}
      id='menu-appbar'
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {isAdmin && (
        <MenuItem
          component={Link}
          to='/admin/dashboard'
          onClick={handleCloseUserMenu}
        >
          <Typography textAlign='center'>Dashboard</Typography>
        </MenuItem>
      )}
      {isInstructor && (
        <MenuItem
          component={Link}
          to='/instructor/courses'
          onClick={handleCloseUserMenu}
        >
          <Typography textAlign='center'>I Dashboard</Typography>
        </MenuItem>
      )}
      {isStudent && (
        <MenuItem
          component={Link}
          to='/user/courses'
          onClick={handleCloseUserMenu}
        >
          <Typography textAlign='center'>My courses</Typography>
        </MenuItem>
      )}
      <MenuItem
        component={Link}
        to='/user/profile'
        onClick={handleCloseUserMenu}
      >
        <Typography textAlign='center'>Profile</Typography>
      </MenuItem>
      <MenuItem onClick={logoutHandler}>
        <Typography textAlign='center'>Logout</Typography>
      </MenuItem>
    </Menu>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          m: '1rem',
        }}
      >
        <img src={Logo} alt='logo' style={{ width: '2rem', height: '2rem' }} />
        <Typography variant='h6' sx={{ textTransform: 'uppercase' }}>
          School board
        </Typography>
      </Box>

      <Divider />
      <List>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {isAuthenticated && (
            <ListItem>
              <Tooltip title={`Hello ${user?.name || user?.email}`}>
                {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon />
              </IconButton> */}
                {user?.avatar ? (
                  <img
                    src={user?.avatar}
                    alt='profile'
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      border: '1px solid #fff',
                    }}
                  />
                ) : (
                  <Avatar sx={{ width: 50, height: 50 }} />
                )}
              </Tooltip>
            </ListItem>
          )}
          <ListItem onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? (
              <LightModeIcon fontSize='large' />
            ) : (
              <DarkModeIcon fontSize='large' />
            )}
          </ListItem>
        </Box>

        {appMenu.map((item) => (
          <ListItem
            key={item.name}
            sx={{
              textAlign: 'center',
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            <Link to={item.link}>
              <ListItemText primary={item.name} />
            </Link>
          </ListItem>
        ))}

        {isAdmin && (
          <ListItem
            component={Link}
            to='/admin/dashboard'
            onClick={handleCloseUserMenu}
          >
            <Typography textAlign='center'>Dashboard</Typography>
          </ListItem>
        )}
        {isInstructor && (
          <ListItem
            component={Link}
            to='/instructor/courses'
            onClick={handleCloseUserMenu}
          >
            <Typography textAlign='center'>I Dashboard</Typography>
          </ListItem>
        )}
        {isStudent && (
          <ListItem
            component={Link}
            to='/user/courses'
            onClick={handleCloseUserMenu}
          >
            <Typography textAlign='center'>My courses</Typography>
          </ListItem>
        )}

        {isAuthenticated && (
          <>
            <ListItem
              component={Link}
              to='/user/profile'
              onClick={handleCloseUserMenu}
            >
              <Typography textAlign='center'>Profile</Typography>
            </ListItem>
            <ListItem onClick={logoutHandler} sx={{ cursor: 'pointer' }}>
              <Typography textAlign='center'>Logout</Typography>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Link to='/'>
            <Typography
              variant='h6'
              component='div'
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                gap: '0.5rem',
                textTransform: 'uppercase',
              }}
            >
              <img
                src={Logo}
                alt='logo'
                style={{ width: '2rem', height: '2rem' }}
              />
              School Board
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: { sm: 'center' },
              gap: { sm: '1rem' },
            }}
          >
            {appMenu.map((item) => (
              <Link to={item.link} key={item.name}>
                <Button sx={{ color: '#fff' }}>{item.name}</Button>
              </Link>
            ))}

            {isAuthenticated && (
              <>
                <Tooltip title={`Hello ${user?.name || user?.email}`}>
                  {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                    <AccountCircleIcon fontSize='large' />
                  </IconButton> */}
                  {user?.avatar ? (
                    <img
                      src={user?.avatar}
                      alt='profile'
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        border: '1px solid #fff',
                      }}
                      onClick={handleOpenUserMenu}
                    />
                  ) : (
                    <Avatar
                      sx={{ width: 35, height: 35 }}
                      onClick={handleOpenUserMenu}
                    />
                  )}
                </Tooltip>
                <AccountMenu />
              </>
            )}
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === 'dark' ? (
                <LightModeIcon fontSize='small' />
              ) : (
                <DarkModeIcon fontSize='small' />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
