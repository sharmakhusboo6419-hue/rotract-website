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
  const initials = String(name || 'RCPC')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase() || 'R';

  const palette = ['d4af37', 'b8860b', '8b6914', 'c69c2e', 'e0b84b', 'a8801f', '5c4310'];
  const hash = [...String(name || 'RCPC')].reduce((value, character) => value + character.charCodeAt(0), 0);
  const background = palette[hash % palette.length];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="${escapeXml(name || 'Member')}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#${background}" />
          <stop offset="100%" stop-color="#3a2e00" />
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
    name: 'Rtr. Skanda',
    role: 'President',
    bio: `Leader, Passionate, Kind.`,
    photoUrl: '/images/skanda.jpeg'
  },
  {
    name: 'Rtr. Avnish Kumar',
    role: 'Vice President',
    bio: `Creative, Strategic Thinker.`,
    photoUrl: '/images/avnish-kumar-2026.jpeg'
  },
  {
    name: 'Rtr. Dolly Gupta',
    role: 'Secretary',
    bio: `Friendly, Compassionate, Supportive.`,
    photoUrl: '/images/dolly-gupta.jpeg'
  },
  {
    name: 'Rtr. Deepak Kumar Barik',
    role: 'Operation Secretary',
    bio: `Creative, Strategic Thinker.`,  
    photoUrl: '/images/deepak-kumar-barik.jpeg'
  },
  {
    name: 'Rtr. Patan Anif',
    role: 'Sergeant-At-Arms',
    bio: `Discipline, Leadership, Integrity.`,
    photoUrl: '/images/patan-anif.jpeg',
  },
  
  {
    name: 'Rtr. Sathwik',
    role: 'Club Treasurer',
    bio: `Hope, Justice, Purpose.`,
    photoUrl: '/images/sathwik-new.jpeg'
  },
  
  
  {
    name: 'Rtr. Sibhi Solanki',
    role: 'Club Treasurer',
    bio: `Introvert, Friendly, Calm.`,
    photoUrl: '/images/sibhi-solanki.jpeg',
  },
  {
    name: 'Rtr. Sandhya Kumari',
    role: 'Public Relations Director',
    bio: `Funny, Ambitious, Supportive.`,
    photoUrl: '/images/sandhya-new.jpeg'
  },
  {
    name: 'Rtr. Ramya',
    role: 'Public Relations Director',
    bio: `Confident, Positive, Brave.`,
    photoUrl: '/images/ramya.jpeg'
  },
  
  {
    name: 'Rtr. Dithipriya Dutta',
    role: 'Public Relational Director',
    bio: `Calm, Confident, Observant.`,
    photoUrl: '/images/dithi-priya.jpeg',
  },
  {
    name: 'Rtr. Kaneez Fatima',
    role: 'Club Service Director',
    bio: `Compassionate, Dedicated, Supportive.`,
    photoUrl: '/images/kaneez-fatima.jpeg',
  },
  {
    name: 'Rtr. Hamid Ashraf',
    role: 'Club Service Director',
    bio: `Dedicated, Supportive, Reliable.`,
    photoUrl: '/images/hamid-ashraf.jpeg'
  },
  {
    name: 'Rtr. Khusboo Sharma',
    role: 'Cultural Event Director',
    bio: `Creative, Enthusiastic, Organized.`,
    photoUrl: '/images/khusboo-sharma.jpeg'
  },
  {
    name: 'Rtr. Iman Shariff',
    role: 'Cultural Event Director',
    bio: `Introvert, Shy,confident.`,
    photoUrl: '/images/iman-shariff.jpeg'
  },
  {
    name: 'Rtr. Vani Ray',
    role: 'Director of Events',
    bio: `Vibrant, Goofy, Expressive.`,
    photoUrl: '/images/vani-ray.jpeg',
  },
  {
    name: 'Rtr. Aditya Raj',
    role: 'Director of Events',
    bio: `Extrovert, Adaptable, Empathetic.`,
    photoUrl: '/images/aditya-raj.jpeg',
  },
  {
    name: 'Rtr. Adithyian Vinod',
    role: 'Community Service Director',
    bio: `Dedicated, Supportive, Reliable.`,
    photoUrl: '/images/adithyian-vinod.png'
  },
  {
    name: 'Rtr. Monisha Kumari',
    role: 'Community Service Director',
    bio: `Dedicated, Supportive, Reliable.`,
    photoUrl: '/images/monisha-kumari.jpeg'
  },
  {
    name: 'Rtr. Dhanush',
    role: 'International Service Director',
    bio: `Dedicated, Supportive, Reliable.`,
    photoUrl: '/images/dhanush.jpeg'
  }, 
  {
    name: 'Rtr. Noor Hoorain',
    role: 'Professional Development Director',
    bio: `Empathetic,Resilient, Bold.`,
    photoUrl: '/images/noor-hoorain.jpeg',
  },
  {
    name: 'Rtr. Syed Mohd Zayeed',
    role: 'Professional Development Director',
    bio: `Dedicated, Supportive, Reliable.`,
    photoUrl: '/images/syed-zayeed.jpeg'
  },
  {
    name: 'Rtr. Kishan Pandey',
    role: 'Professional Development Director',
    bio: `Dedicated, Supportive, Reliable.`,
    photoUrl: '/images/kishan-pandey.jpeg'
  },
].map((member) => ({ ...member, category: MEMBER_CATEGORIES.LEADERSHIP }));

const membersList = [
 
  
  
].map((member) => ({ ...member, category: MEMBER_CATEGORIES.MEMBER }));

module.exports = { teamMembers, membersList };
