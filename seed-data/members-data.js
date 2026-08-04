const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop';
const MEMBER_CATEGORIES = { LEADERSHIP: 'leadership', MEMBER: 'member' };

const teamMembers = [
  {
    name: 'Avnish kumar',
    role: 'vice-president',
    bio: 'The Vice-President assists the President in leading the Rotaract Club and may take on additional responsibilities as needed.',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    name: 'Patan Anif',
    role: 'Sergeant-at-Arms',
    bio: 'The Sergeant-at-Arms is responsible for maintaining order and decorum during club meetings and events. This role involves ensuring that meetings run smoothly, enforcing rules and procedures, and assisting with the setup and organization of events.',
    photoUrl: '/home/khusboo/Downloads/IMG-20260610-WA0007.jpg (1).jpeg',
  },
  {
    name: 'Khusboo Sharma',
    role: 'Cultural Event Director',
    bio:
      'The Cultural Event Director in  Rotaract Club is responsible for planning and managing all cultural and entertainment activities that strengthen fellowship, celebrate diversity, and encourage member participation. While each club may define director roles differently, Rotaract clubs commonly assign directors to lead specific areas and organize activities aligned with the club\'s annual goals.',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    name: 'Dolly Gupta',
    role: 'Secretary',
    bio:
      'The Secretary is one of the most important office bearers in a Rotaract Club. The Secretary is responsible for the club\'s administration, documentation, communication, and ensuring that club activities are properly recorded and reported.',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    name: 'deepak kumar barik',
    role: 'Operation Secretary',
    bio:
      'The Secretary is one of the most important office bearers in a Rotaract Club. The Secretary is responsible for the club\'s administration, documentation, communication, and ensuring that club activities are properly recorded and reported.',
    photoUrl: '/home/khusboo/Downloads/IMG_20260803_225704.jpg (1).jpeg',
  },
  {
    name: 'Sibhi Solanki',
    role: ' club treasurer',
    bio: 'The Club Treasurer is responsible for managing the club\'s finances, including budgeting, accounting, and ensuring financial transparency.',
    photoUrl: '/home/khusboo/Downloads/IMG-20260609-WA0452.jpg (1).jpeg',
  },
  {
    name: 'Sandhya Kumari',
    role: 'Public Relations Director',
    bio:
      'The Public Relations (PR) Director in a Rotaract Club is responsible for building the club\'s image, promoting its activities, and maintaining communication with members, the public, and the media.',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    name: 'Ramya',
    role: 'Public Relations Director',
    bio:
      'The Public Relations (PR) Director in a Rotaract Club is responsible for building the club\'s image, promoting its activities, and maintaining communication with members, the public, and the media.',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    name: 'Adithyian Vinod',
    role: 'Community Service Director',
    bio: 'The community service director is responsible for overseeing the club\'s community service projects, ensuring that they align with the club\'s mission and provide value to the community.',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    name: 'Monisha kumari',
    role: 'Community Service Director',
    bio: 'The community service director is responsible for overseeing the club\'s community service projects, ensuring that they align with the club\'s mission and provide value to the community.',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    name: 'kishan pandey',
    role: 'Professional Development Director',
    bio: 'The professional development director is responsible for planning and organizing workshops, training sessions, and other development opportunities for club members.',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    name: 'Hamid Ashraf',
    role: 'club service director',
    bio: 'The club service director is responsible for overseeing the club\'s internal operations, ensuring that meetings, events, and activities run smoothly and efficiently.',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    name: 'Kaneez Fatima',
    role: 'club service director',
    bio: 'The club service director is responsible for overseeing the club\'s internal operations, ensuring that meetings, events, and activities run smoothly and efficiently.',
    photoUrl: '/home/khusboo/Downloads/C8A4CDD4-C593-41DB-A574-4F7A4F43AFF8_Original.jpg (1).jpeg',
  },
  {
    name: 'Noor Hoorain',
    role: 'Professional Development Director',
    bio: 'The professional development director is responsible for planning and organizing workshops, training sessions, and other development opportunities for club members.',
    photoUrl: '/home/khusboo/Downloads/Noor ji .jpg (1).jpeg',
  },
].map((member) => ({ ...member, category: MEMBER_CATEGORIES.LEADERSHIP }));

const membersList = [
  {
    name: 'skanda',
    role: 'President',
    bio: 'The President is the chief executive officer of the Rotaract Club, responsible for leading the club, presiding over meetings, and representing the club in official functions. The President provides vision, direction, and leadership to ensure the club achieves its goals and fulfills its mission.',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    name: 'vani ray',
    role: 'director of events',
    bio: 'The Director of Events is responsible for planning, organizing, and executing events and activities for the Rotaract Club. This role involves coordinating with members, managing logistics, and ensuring that events align with the club\'s objectives and values.',
    photoUrl: '/home/khusboo/Downloads/3F8DD29C-CEFC-47FA-AAB1-8906143AB416.JPG.jpeg',
  },
  {
    name: 'Dithipriya dutta',
    role: 'public relational director',
    bio: 'The Public Relations Director is responsible for managing the club\'s image, promoting its activities, and maintaining communication with members, the public, and the media. This role involves creating marketing materials, managing social media accounts, and fostering positive relationships with stakeholders.',
    photoUrl: '/images/dithi-priya.jpeg',
  },
  {
    name: 'sathwik',
    role: 'Club Treasurer',
    bio: 'The Club Treasurer is responsible for managing the club\'s finances, including budgeting, accounting, and ensuring financial transparency.',
    photoUrl: '/home/khusboo/Downloads/Club-Treasurer-Photo.jpg',
  },
  {
    name: 'Dhanush',
    role: 'international service director',
    bio: 'A dedicated member of the Rotaract Club, contributing to various initiatives and activities.',
    photoUrl: '/home/khusboo/Downloads/Dhanush-Photo.jpg',
  }
].map((member) => ({ ...member, category: MEMBER_CATEGORIES.MEMBER }));

module.exports = { teamMembers, membersList };
