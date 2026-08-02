const { MEMBER_CATEGORIES } = require('./constants');

// Returns an array of error messages; empty array means valid.
function validateMember(member, { isPartial = false } = {}) {
  const errors = [];

  if (!isPartial && !member.name) {
    errors.push('name is required');
  }
  if (!isPartial && !member.role) {
    errors.push('role is required');
  }

  if (member.photoUrl && !isValidHttpUrl(member.photoUrl)) {
    errors.push(`photoUrl must be a valid http(s) URL: ${member.photoUrl}`);
  }
  if (member.email && !isValidEmail(member.email)) {
    errors.push(`email is not a valid address: ${member.email}`);
  }
  if (member.category && !Object.values(MEMBER_CATEGORIES).includes(member.category)) {
    errors.push(`category must be one of: ${Object.values(MEMBER_CATEGORIES).join(', ')}`);
  }

  return errors;
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function isValidEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

module.exports = { validateMember };
