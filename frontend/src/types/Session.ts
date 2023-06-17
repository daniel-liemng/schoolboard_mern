import { User } from './User';

export type Session =
  | {
      _id?: string;
      date: string;
      courseId: string;
      attendedStudentIds: User[];
    }
  | undefined;
