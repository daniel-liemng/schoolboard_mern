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
import { Link } from 'react-router-dom';
import { menu, userMenu } from '../data/data';
import {
  Avatar,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  useTheme,
} from '@mui/material';
import { ColorModeContext } from '../App';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAppSelector } from '../hooks/hooks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

interface NavbarProps {
  window?: () => Window;
}

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = (props: NavbarProps) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const { isAuthenticated, user } = useAppSelector((state) => state.user);

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

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        Tech School
      </Typography>
      <Divider />
      <List>
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
        {isAuthenticated && (
          <ListItem>
            <Tooltip title={`Hello ${user?.name || user?.email}`}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' /> */}
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
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
              {userMenu.map((item) => (
                <MenuItem key={item.name} onClick={handleCloseUserMenu}>
                  <Link to={item.link}>
                    <Typography textAlign='center'>{item.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </ListItem>
        )}

        <ListItem onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </ListItem>
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
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
                textTransform: 'uppercase',
              }}
            >
              Tech School
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {appMenu.map((item) => (
              <Link to={item.link} key={item.name}>
                <Button sx={{ color: '#fff' }}>{item.name}</Button>
              </Link>
            ))}
            {isAuthenticated && (
              <>
                <Tooltip title={`Hello ${user?.name || user?.email}`}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                    {/* <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' /> */}
                    <AccountCircleIcon fontSize='large' />
                  </IconButton>
                </Tooltip>
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
                  {userMenu.map((item) => (
                    <MenuItem key={item.name} onClick={handleCloseUserMenu}>
                      <Link to={item.link}>
                        <Typography textAlign='center'>{item.name}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === 'dark' ? (
                <DarkModeIcon fontSize='large' />
              ) : (
                <LightModeIcon fontSize='large' />
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
