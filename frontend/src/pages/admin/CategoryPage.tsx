import { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from '../../hooks/categoryHooks';
import { Category } from '../../types/Category';

// import DeleteCourseModal from '../../compnents/modal/DeleteCourseModal';
import CreateCategoryModal from '../../compnents/modal/CreateCategoryModal';
import DeleteCategoryModal from '../../compnents/modal/DeleteCategoryModal';

const CategoryPage = () => {
  const { data: categories } = useGetAllCategoriesQuery();

  const [isCreateCatModalOpen, setIsCreateCatModalOpen] = useState(false);
  const [isDeleteCatModalOpen, setIsDeleteCatModalOpen] = useState(false);

  return (
    <Paper sx={{ m: '2rem', height: '100%', p: '2.5rem' }}>
      <Typography variant='h4' align='center'>
        Category
      </Typography>

      <Grid container spacing={2} mt='1.5rem'>
        <Grid item xs={8}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align='left'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories?.map((cat: Category, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {cat.title}
                    </TableCell>

                    <TableCell align='left'>
                      <Button
                        variant='contained'
                        size='small'
                        color='secondary'
                        sx={{ mr: '0.5rem' }}
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => setIsDeleteCatModalOpen(true)}
                        variant='contained'
                        size='small'
                        color='error'
                      >
                        Delete
                      </Button>
                      <DeleteCategoryModal
                        cat={cat}
                        isModalOpen={isDeleteCatModalOpen}
                        handleClose={() => setIsDeleteCatModalOpen(false)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => setIsCreateCatModalOpen(true)}
              variant='contained'
              sx={{ my: '1rem' }}
            >
              Create category
            </Button>
            <CreateCategoryModal
              isModalOpen={isCreateCatModalOpen}
              handleClose={() => setIsCreateCatModalOpen(false)}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CategoryPage;
