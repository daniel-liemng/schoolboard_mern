export type User = {
  _id?: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  phone?: string;
  gender?: string;
  dob?: string;
  registeredCourseIds?: string[];
  createdCourseIds?: string[];
} | null;
