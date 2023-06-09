import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { User } from '../../types/User';

interface UserTableProps {
  data: User[];
}

const UserTable: React.FC<UserTableProps> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='left'>Email</TableCell>
            <TableCell align='left'>Role</TableCell>
            <TableCell align='left'>Gender</TableCell>
            <TableCell align='left'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((user, index: number) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {user.name}
              </TableCell>
              <TableCell align='left'>{user.email}</TableCell>
              <TableCell align='left'>{user.role}</TableCell>
              <TableCell align='left'>
                {user?.gender?.slice(0, 1).toUpperCase()}
              </TableCell>
              <TableCell align='left'>
                <Button variant='contained' size='small' sx={{ mr: '0.5rem' }}>
                  Details
                </Button>
                <Button
                  variant='contained'
                  size='small'
                  color='secondary'
                  sx={{ mr: '0.5rem' }}
                >
                  Update
                </Button>
                <Button variant='contained' size='small' color='error'>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
