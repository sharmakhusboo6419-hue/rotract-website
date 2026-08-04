const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop';
const MEMBER_CATEGORIES = { LEADERSHIP: 'leadership', MEMBER: 'member' };

const teamMembers = [
  {
    name: 'Avnish kumar',
    role: 'vice-president',
    bio: 'The Vice-President assists the President in leading the Rotaract Club and may take on additional responsibilities as needed.',
    photoUrl: '/images/avnish-kumar.jpeg',
  },
  {
    name: 'Patan Anif',
    role: 'Sergeant-at-Arms',
    bio: 'The Sergeant-at-Arms is responsible for maintaining order and decorum during club meetings and events. This role involves ensuring that meetings run smoothly, enforcing rules and procedures, and assisting with the setup and organization of events.',
    photoUrl: '/images/avnish-kumar.jpeg',
  },
  {
    name: 'Khusboo Sharma',
    role: 'Cultural Event Director',
    bio:
      'The Cultural Event Director in  Rotaract Club is responsible for planning and managing all cultural and entertainment activities that strengthen fellowship, celebrate diversity, and encourage member participation. While each club may define director roles differently, Rotaract clubs commonly assign directors to lead specific areas and organize activities aligned with the club\'s annual goals.',
    photoUrl: 'https://drive.google.com/uc?export=view&id=1WZN_PHbSauz6praJ-YluZwnH3e5gfxDL',
  },
  {
    name: 'Dolly Gupta',
    role: 'Secretary',
    bio:
      'The Secretary is one of the most important office bearers in a Rotaract Club. The Secretary is responsible for the club\'s administration, documentation, communication, and ensuring that club activities are properly recorded and reported.',
    photoUrl: 'https://drive.google.com/uc?export=view&id=1vTpqisw4xj-urRm4JDt92_xKzCWGClhW',
  },
  {
    name: 'Deepak kumar barik',
    role: 'Operation Secretary',
    bio:
      'The Secretary is one of the most important office bearers in a Rotaract Club. The Secretary is responsible for the club\'s administration, documentation, communication, and ensuring that club activities are properly recorded and reported.',
    photoUrl: 'https://drive.google.com/uc?export=view&id=1fXa0HVvtuO5CScfOL7bV9kzQ2nPZAvIcZ',
  },
  {
    name: 'Sibhi Solanki',
    role: ' club treasurer',
    bio: 'The Club Treasurer is responsible for managing the club\'s finances, including budgeting, accounting, and ensuring financial transparency.',
    photoUrl: '/images/sibhi-solanki.jpeg',
  },
  {
    name: 'Sandhya Kumari',
    role: 'Public Relations Director',
    bio:
      'The Public Relations (PR) Director in a Rotaract Club is responsible for building the club\'s image, promoting its activities, and maintaining communication with members, the public, and the media.',
    photoUrl: '/images/sandhya-kumari.jpeg',
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
    photoUrl: '/home/khusboo/Downloads/file_0000000066a082118da2d06ae1ec659a.png',
  },
  {
    name: 'Monisha kumari',
    role: 'Community Service Director',
    bio: 'The community service director is responsible for overseeing the club\'s community service projects, ensuring that they align with the club\'s mission and provide value to the community.',
    photoUrl: 'https://drive.google.com/uc?export=view&id=1DdDVfc5x_5-nGdd8UflzDayyocSsyHtD',
  },
  {
    name: 'kishan pandey',
    role: 'Professional Development Director',
    bio: 'The professional development director is responsible for planning and organizing workshops, training sessions, and other development opportunities for club members.',
    photoUrl: 'https://drive.google.com/uc?export=view&id=18Qz8v5X5X5X5X5X5X5X5X5X5X5X5X5X',
  },
  {
    name: 'Hamid Ashraf',
    role: 'club service director',
    bio: 'The club service director is responsible for overseeing the club\'s internal operations, ensuring that meetings, events, and activities run smoothly and efficiently.',
    photoUrl: 'https://drive.google.com/uc?export=view&id=1Xa0HVvtuO5CScfOL7bV9kzQ2nPZAvIcZ',
  },
  {
    name: 'Kaneez Fatima',
    role: 'club service director',
    bio: 'The club service director is responsible for overseeing the club\'s internal operations, ensuring that meetings, events, and activities run smoothly and efficiently.',
    photoUrl: '/images/kaneez-fatima.jpeg',
  },
  {
    name: 'Noor Hoorain',
    role: 'Professional Development Director',
    bio: 'The professional development director is responsible for planning and organizing workshops, training sessions, and other development opportunities for club members.',
    photoUrl: '/images/noor-hoorain.jpeg',
  },
].map((member) => ({ ...member, category: MEMBER_CATEGORIES.LEADERSHIP }));

const membersList = [
  {
    name: 'skanda',
    role: 'President',
    bio: 'The President is the chief executive officer of the Rotaract Club, responsible for leading the club, presiding over meetings, and representing the club in official functions. The President provides vision, direction, and leadership to ensure the club achieves its goals and fulfills its mission.',
    photoUrl: '/images/skanda.jpeg',
  },
  {
    name: 'vani ray',
    role: 'director of events',
    bio: 'The Director of Events is responsible for planning, organizing, and executing events and activities for the Rotaract Club. This role involves coordinating with members, managing logistics, and ensuring that events align with the club\'s objectives and values.',
    photoUrl: '/images/vani-ray.jpeg',
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
    photoUrl: '/home/khusboo/Downloads/IMG-20260803-WA0032.jpg.jpeg',
  },
  {
    name: 'Dhanush',
    role: 'international service director',
    bio: 'A dedicated member of the Rotaract Club, contributing to various initiatives and activities.',
    photoUrl: '/images/dhanush.jpeg',
  }
].map((member) => ({ ...member, category: MEMBER_CATEGORIES.MEMBER }));

module.exports = { teamMembers, membersList };
