export type Course = {
  _id?: string;
  title: string;
  course_code: string;
  instructor: string;
  category: string;
  desc: string;
  start_date: string;
  day: string;
  time: string;
  period: string;
  fee: string;
  total_student: number;
  status: string;
  registeredUserIds: string[];
  sessionIds?: string[];
  createdAt?: string;
};
