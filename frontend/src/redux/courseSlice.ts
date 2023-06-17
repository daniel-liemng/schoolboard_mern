import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Course } from '../types/Course';
import { Category } from '../types/Category';

interface CourseState {
  courses: Course[];
  categories: Category[];
}

const initialState: CourseState = {
  courses: [],
  categories: [],
};

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourses: (state: CourseState, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    setCategories: (state: CourseState, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCourses, setCategories } = courseSlice.actions;

export default courseSlice.reducer;
