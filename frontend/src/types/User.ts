export type User = {
  _id: string;
  name: string;
  email: string;
  token?: string;
  role?: string;
  photo?: string;
  phone?: string;
  gender?: string;
  dob?: string;
  registeredCourseIds?: string[];
};
