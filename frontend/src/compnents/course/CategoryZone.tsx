import { Box, Button } from '@mui/material';

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
