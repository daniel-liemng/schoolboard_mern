import { Box } from '@mui/material';
import { Course } from '../../types/Course';
import CourseItem from './CourseItem';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';

interface CourseZoneProps {
  courses: Course[];
  // setFetchAgain: () => boolean;
}

const CourseZone: React.FC<CourseZoneProps> = ({ courses }) => {
  // const { courses: allCourses } = useAppSelector((state) => state.course);

  // const [coursesToFitler, setCoursesToFitler] = useState<Course[]>(allCourses);

  // const filterSelectedCategory = (arr) => {
  //   if (selectedCat === 'all') {
  //     return arr;
  //   }
  //   return arr.filter(
  //     (item: Course) =>
  //       item?.category?.title.toLowerCase() === selectedCat.toLowerCase()
  //   );
  // };

  // const filterName = (arr) => {
  //   return arr.filter((item: Course) =>
  //     item.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // };

  // useEffect(() => {
  //   let result = allCourses;
  //   result = filterSelectedCategory(result);
  //   result = filterName(result);

  //   console.log('result', result);

  //   setCoursesToFitler(result);
  // }, [searchTerm, selectedCat]);

  // console.log('course-111', courses);
  // console.log('course', coursesToFitler);

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
