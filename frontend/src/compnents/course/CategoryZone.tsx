import { Box, Button } from '@mui/material';
import { Category } from '../../types/Category';

interface CategoryProps {
  allCategories: string[];
}

const CategoryZone: React.FC<CategoryProps> = ({ allCategories }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {allCategories?.map((cat, index) => (
        <Button variant='contained' key={index}>
          {cat}
        </Button>
      ))}
    </Box>
  );
};

export default CategoryZone;
