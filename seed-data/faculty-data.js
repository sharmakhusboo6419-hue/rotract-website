const FACULTY_ROLES = {
  FACULTY_COORDINATOR: 'faculty-coordinator',
  FACULTY: 'faculty'
};

const facultyList = [
  {
    name: 'Ms. Noreen Alexeena Datta',
    role: 'Faculty Coordinator',
    department: 'Political Science',
    bio: 'The Head of our Rotaract Club of Presidency College.',
    photoUrl: '/images/noreen-datta.jpeg',
    category: FACULTY_ROLES.FACULTY_COORDINATOR
  },
  {
    name: 'Ms. Poojashree C',
    role: 'Faculty Coordinator',
    department: 'BBA & BCom',
    bio: "The Faculty Coordinator for the BBA and BCom Departments. Your guidance, encouragement, and positive attitude inspire students to achieve their best. Your commitment and care have played an important role in the success of our club activities.",
    photoUrl: '/images/poojashree-c.jpeg',
    category: FACULTY_ROLES.FACULTY
  },
  {
    name: 'Ms. P. Uma Mageswari',
    role: 'Faculty Coordinator',
    department: 'BCA',
    bio: "Dear Uma Ma'am, thank you for being a wonderful Faculty Coordinator for the BCA Department. Your constant guidance, encouragement, and support inspire us to give our best every day.",
    photoUrl: '/images/uma-mageswari.jpeg',
    category: FACULTY_ROLES.FACULTY
  }
];

module.exports = { facultyList, FACULTY_ROLES };
