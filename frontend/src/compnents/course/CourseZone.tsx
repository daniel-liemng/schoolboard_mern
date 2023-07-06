import { Box } from '@mui/material';
import { Course } from '../../types/Course';
import CourseItem from './CourseItem';

interface CourseZoneProps {
  courses: Course[];
}

const CourseZone: React.FC<CourseZoneProps> = ({ courses }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      {courses?.map((course, index) => (
        <CourseItem key={index} course={course} />
      ))}
    </Box>
  );
};

export default CourseZone;
