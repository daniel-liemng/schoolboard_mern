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
  TextField,
  Typography,
} from '@mui/material';
import {
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from '../../hooks/categoryHooks';
import { Category } from '../../types/Category';

import CreateCategoryModal from '../../compnents/modal/CreateCategoryModal';
import DeleteCategoryModal from '../../compnents/modal/DeleteCategoryModal';

import { toast } from 'react-hot-toast';

const CategoryPage = () => {
  const { data: categories } = useGetAllCategoriesQuery();

  const { mutateAsync: updateCategory, isLoading: isUpdateLoading } =
    useUpdateCategoryMutation();

  const [isCreateCatModalOpen, setIsCreateCatModalOpen] = useState(false);
  const [isDeleteCatModalOpen, setIsDeleteCatModalOpen] = useState(false);

  // update
  const [selectedIndex, setSelectedIndex] = useState();
  const [catTitle, setCatTitle] = useState('');

  //delete
  const [selectedCat, setSelectedCat] = useState<Category>();

  const handleEditSubmit = async (catId: string) => {
    await updateCategory({ catId, catData: { title: catTitle } });

    toast.success('Category Updated');
    setSelectedIndex(undefined);
  };

  return (
    <Box sx={{ p: '2rem', height: '100%' }}>
      <Typography variant='h4' align='center' sx={{ mt: '0.5rem' }}>
        Category
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
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
                  {selectedIndex === index && (
                    <form>
                      <TextField
                        fullWidth
                        variant='standard'
                        id='title'
                        name='title'
                        value={catTitle || cat?.title}
                        onChange={(e) => setCatTitle(e.target.value)}
                      />

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: '0.5rem',
                          mt: '0.5rem',
                        }}
                      >
                        <Button
                          type='button'
                          onClick={() => handleEditSubmit(cat?._id)}
                          variant='contained'
                          size='small'
                          disabled={isUpdateLoading}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => setSelectedIndex(undefined)}
                          variant='contained'
                          size='small'
                          color='secondary'
                        >
                          Cancel
                        </Button>
                      </Box>
                    </form>
                  )}
                  {selectedIndex !== index && (
                    <Typography>{cat?.title}</Typography>
                  )}
                </TableCell>

                <TableCell align='left'>
                  <Button
                    onClick={() => setSelectedIndex(index)}
                    variant='contained'
                    size='small'
                    color='secondary'
                    sx={{ mr: '0.5rem' }}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      setIsDeleteCatModalOpen(true);
                      setSelectedCat(cat);
                    }}
                    variant='contained'
                    size='small'
                    color='error'
                  >
                    Delete
                  </Button>
                  <DeleteCategoryModal
                    cat={selectedCat}
                    isModalOpen={isDeleteCatModalOpen}
                    handleClose={() => setIsDeleteCatModalOpen(false)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CategoryPage;
