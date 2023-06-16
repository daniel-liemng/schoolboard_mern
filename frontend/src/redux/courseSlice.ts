import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Course } from '../types/Course';

interface CourseState {
  courses: Course[];
}

const initialState: CourseState = {
  courses: [],
};

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourses: (state: CourseState, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
  },
});

export const { setCourses } = courseSlice.actions;

export default courseSlice.reducer;
