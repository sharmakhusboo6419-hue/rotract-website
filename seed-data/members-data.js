const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop';
const MEMBER_CATEGORIES = { LEADERSHIP: 'leadership', MEMBER: 'member' };

const teamMembers = [
  {
    name: 'Khusboo Sharma',
    role: 'Cultural Event Director',
    bio:
      'The Cultural Event Director in a Rotaract Club is responsible for planning and managing all cultural and entertainment activities that strengthen fellowship, celebrate diversity, and encourage member participation. While each club may define director roles differently, Rotaract clubs commonly assign directors to lead specific areas and organize activities aligned with the club\'s annual goals.',
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
    role: ' opration Secretary',
    bio:
      'The Secretary is one of the most important office bearers in a Rotaract Club. The Secretary is responsible for the club\'s administration, documentation, communication, and ensuring that club activities are properly recorded and reported.',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    name: 'Sandhya Kumari',
    role: 'Public Relations Director',
    bio:
      'The Public Relations (PR) Director in a Rotaract Club is responsible for building the club\'s image, promoting its activities, and maintaining communication with members, the public, and the media.',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    name: 'ramya',
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
    name: 'Noor Hoorain',
    role: 'Professional Development Director',
    bio: 'The professional development director is responsible for planning and organizing workshops, training sessions, and other development opportunities for club members.',
    photoUrl: DEFAULT_AVATAR,
  },
].map((member) => ({ ...member, category: MEMBER_CATEGORIES.LEADERSHIP }));

const membersList = [
  {
    name: 'skanda',
    role: 'President',
    email: 'president.racpc@presidency.edu.in',
    year: '2025-26',
    bio: 'President of Rotaract Club of Presidency College.',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    name: 'vaani ray',
    role: 'director of events',
    email: 'pr.racpc@presidency.edu.in',
    year: '2026-27',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    name: 'Sweeta',
    role: 'Club Secretary',
    email: 'secretary.racpc@presidency.edu.in',
    year: '2024-25',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    name: 'Trisha',
    role: 'Board Member',
    year: '2024-25',
    photoUrl: DEFAULT_AVATAR,
  },
].map((member) => ({ ...member, category: MEMBER_CATEGORIES.MEMBER }));

module.exports = { teamMembers, membersList };
