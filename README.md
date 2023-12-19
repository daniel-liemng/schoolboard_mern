# School Board

MERN Stack - Material UI

Deploy on Vercel

[Live website](https://schoolboard.vercel.app)

## Table of Contents

* [About The Project](#about)

* [Tech Stack](#tech-stack)

* [Work flow](#work-flow)

* [Getting started](#getting-started)

## About The Project

A MERN stack web application where students can registered the listed courses. Students need to login to be able to register the desired courses.

There are 3 main user roles with the 3 different UI layouts accordingly.
- Student
- Instructor
- Admin

## Tech Stack

  * ##### MERN: MongoDB, Express, ReactJS, NodeJS
  * ##### Material-UI, Redux Toolkit, React Query, React Hook Form, Cloudinary
  * ##### Mongoose, JSON Web Token
  * ##### Dark Mode
  
## Work Flow

* ##### Admin Credentials for testing
   - Email: admin@gmail.com
   - Password: 123456

* ##### Instructor Credentials for testing
   - Email: dan@gmail.com
   - Password: 123456
  
* Student: Feel free to create a new account

* At homepage or courses, any users can access to view a list of available courses.

![Image](https://github.com/daniel-liemng/schoolboard_mern/blob/master/screenshots/Home.PNG)

![Image](https://github.com/daniel-liemng/schoolboard_mern/blob/master/screenshots/AllCourses.PNG)

* Users sign up or log in to access the User Dashboard page where they can register the courses, upload the profile image, change password, and update the profile info.

![Image](https://github.com/daniel-liemng/schoolboard_mern/blob/master/screenshots/Profile.PNG)

* Instructors can access the Instructor Dashboard to view all their own courses and students of each course. Especially, instructors can create the sessions and check the student attendance of that course.

![Image](https://github.com/daniel-liemng/schoolboard_mern/blob/master/screenshots/InstructorDashboard.PNG)

![Image](https://github.com/daniel-liemng/schoolboard_mern/blob/master/screenshots/InstructorStudent.PNG)

![Image](https://github.com/daniel-liemng/schoolboard_mern/blob/master/screenshots/InstructorCheckAttendance.PNG)


* Admin can access the Admin Dashboard to 

![Image](https://github.com/daniel-liemng/schoolboard_mern/blob/master/screenshots/AdminDashboard.PNG)

![Image](https://github.com/daniel-liemng/schoolboard_mern/blob/master/screenshots/AdminCourses.PNG)

![Image](https://github.com/daniel-liemng/schoolboard_mern/blob/master/screenshots/AdminCategory.PNG)

![Image](https://github.com/daniel-liemng/schoolboard_mern/blob/master/screenshots/AdminCourses.PNG)

![Image](https://github.com/daniel-liemng/schoolboard_mern/blob/master/screenshots/AdminUpdateCourses.PNG)

![Image](https://github.com/daniel-liemng/schoolboard_mern/blob/master/screenshots/AdminChangeUserRole.PNG)

![Image](https://github.com/daniel-liemng/schoolboard_mern/blob/master/screenshots/AdminResetPassword.PNG)

* User can switch to the Dark Mode

![Image](https://github.com/daniel-liemng/schoolboard_mern/blob/master/screenshots/DarkMode.PNG)

## Getting started

**1.** In order to run this app, you need to have `node.js` and package manager like npm or yarn installed.

**2.** Clone the Git Repository: `git clone https://github.com/daniel-liemng/schoolboard_mern.git`

**3.** Install server-side and client-side dependencies

##### Environment variables

Create `.env` file in backend folder

```
NODE_ENV=development
PORT=5000
MONGO_URI=<MONGO_URI>
JWT_SECRET=<JWT_SECRET>
```

Create `.env` file in frontend folder.
Create Cloudinary account at <a href='https://cloudinary.com'>https://cloudinary.com</a>

```
VITE_CLOUDINARY_UPLOAD_PRESET=<VITE_CLOUDINARY_UPLOAD_PRESET>
VITE_CLOUDINARY_NAME=<VITE_CLOUDINARY_NAME>
```

Server-side

```
cd backend
npm install
npm run dev
```

Client-side

```
cd client
npm install
npm run dev
```



