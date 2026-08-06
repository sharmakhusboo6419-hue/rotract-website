const FACULTY_ROLES = {
  HOD: 'hod',
  HEAD_OF_ROTARACT: 'head-of-rotaract',
  FACULTY: 'faculty'
};

const facultyList = [
  {
    name: 'Ms. Noreen Alexeena Datta',
    role: 'HOD',
    department: 'Political Science',
    bio: 'Specialization in Political Science',
    photoUrl: '/images/noreen-datta.jpeg',
    category: FACULTY_ROLES.HOD
  },
  {
    name: 'Ms. Poojashree C',
    role: 'Assistant Professor',
    department: 'Finance & Taxation',
    bio: 'Specialization in Finance & Taxation',
    photoUrl: '/images/poojashree-c.jpeg',
    category: FACULTY_ROLES.FACULTY
  },
  {
    name: 'Ms. P. Uma Mageswari',
    role: 'Assistant Professor',
    bio: 'Assistant Professor',
    photoUrl: '/images/uma-mageswari.jpeg',
    category: FACULTY_ROLES.FACULTY
  }
];

module.exports = { facultyList, FACULTY_ROLES };
