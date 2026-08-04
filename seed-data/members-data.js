const MEMBER_CATEGORIES = { LEADERSHIP: 'leadership', MEMBER: 'member' };

function escapeXml(value) {
  return String(value).replace(/[&<>"]|'/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;'
  }[character]));
}

function buildAvatarDataUri(name) {
  const initials = String(name || 'RACPC')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase() || 'R';

  const palette = ['1d4ed8', '0f766e', 'b45309', '7c3aed', 'be123c', '0f172a', '2563eb'];
  const hash = [...String(name || 'RACPC')].reduce((value, character) => value + character.charCodeAt(0), 0);
  const background = palette[hash % palette.length];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="${escapeXml(name || 'Member')}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#${background}" />
          <stop offset="100%" stop-color="#1e40af" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="48" fill="url(#g)" />
      <circle cx="200" cy="170" r="74" fill="rgba(255,255,255,0.16)" />
      <text x="50%" y="56%" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="112" font-weight="700">${escapeXml(initials)}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.replace(/\s{2,}/g, ' ').trim())}`;
}

const teamMembers = [
  {
    name: 'Avnish kumar',
    role: 'vice-president',
    bio: 'The Vice-President assists the President in leading the Rotaract Club and may take on additional responsibilities as needed.',
    photoUrl: buildAvatarDataUri('Avnish kumar')
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
    photoUrl: buildAvatarDataUri('Khusboo Sharma')
  },
  {
    name: 'Dolly Gupta',
    role: 'Secretary',
    bio:
      'The Secretary is one of the most important office bearers in a Rotaract Club. The Secretary is responsible for the club\'s administration, documentation, communication, and ensuring that club activities are properly recorded and reported.',
    photoUrl: buildAvatarDataUri('Dolly Gupta')
  },
  {
    name: 'Deepak kumar barik',
    role: 'Operation Secretary',
    bio:
      'The Secretary is one of the most important office bearers in a Rotaract Club. The Secretary is responsible for the club\'s administration, documentation, communication, and ensuring that club activities are properly recorded and reported.',
    photoUrl: '/images/deepak-kumar-barik.jpeg'
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
    photoUrl: buildAvatarDataUri('Sandhya Kumari')
  },
  {
    name: 'Ramya',
    role: 'Public Relations Director',
    bio:
      'The Public Relations (PR) Director in a Rotaract Club is responsible for building the club\'s image, promoting its activities, and maintaining communication with members, the public, and the media.',
    photoUrl: buildAvatarDataUri('Ramya')
  },
  {
    name: 'Adithyian Vinod',
    role: 'Community Service Director',
    bio: 'The community service director is responsible for overseeing the club\'s community service projects, ensuring that they align with the club\'s mission and provide value to the community.',
    photoUrl: buildAvatarDataUri('Adithyian Vinod')
  },
  {
    name: 'Monisha kumari',
    role: 'Community Service Director',
    bio: 'The community service director is responsible for overseeing the club\'s community service projects, ensuring that they align with the club\'s mission and provide value to the community.',
    photoUrl: buildAvatarDataUri('Monisha kumari')
  },
  {
    name: 'kishan pandey',
    role: 'Professional Development Director',
    bio: 'The professional development director is responsible for planning and organizing workshops, training sessions, and other development opportunities for club members.',
    photoUrl: buildAvatarDataUri('kishan pandey')
  },
  {
    name: 'Hamid Ashraf',
    role: 'club service director',
    bio: 'The club service director is responsible for overseeing the club\'s internal operations, ensuring that meetings, events, and activities run smoothly and efficiently.',
    photoUrl: buildAvatarDataUri('Hamid Ashraf')
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
    photoUrl: buildAvatarDataUri('skanda')
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
    photoUrl: buildAvatarDataUri('sathwik')
  },
  {
    name: 'Dhanush',
    role: 'international service director',
    bio: 'A dedicated member of the Rotaract Club, contributing to various initiatives and activities.',
    photoUrl: buildAvatarDataUri('Dhanush')
  }
].map((member) => ({ ...member, category: MEMBER_CATEGORIES.MEMBER }));

module.exports = { teamMembers, membersList };
