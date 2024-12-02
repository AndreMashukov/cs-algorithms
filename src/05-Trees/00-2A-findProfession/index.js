// Consider a special family of Engineers and Doctors. This family has the following rules:

// Everybody has two children.
// The first child of an Engineer is an Engineer and the second child is a Doctor.
// The first child of a Doctor is a Doctor and the second child is an Engineer.
// All generations of Doctors and Engineers start with an Engineer.

// Given the level and position of a person in the ancestor tree above,
// find the profession of the person.

function solution (level, pos) {
  if (level === 1) {
    return 'Engineer'
  }
  // Math.ceil(pos / 2) is the parent position
  const parent = solution(level - 1, Math.ceil(pos / 2))

  if (parent === 'Engineer') {
    // if parent is Engineer, then the position is Doctor if even, Engineer if odd
    if (pos % 2 === 0) {
      return 'Doctor'
    } else {
      return 'Engineer'
    }
  } else {
    if (pos % 2 === 0) {
      return 'Engineer'
    } else {
      return 'Doctor'
    }
  }
}

// Consider we want to find the profession of the person at level 3, position 4
// in the family tree described by the rules in the comments.

// Start with level 3, position 4.

// Since level is not 1, we find the parent's position:
// Math.ceil(4 / 2) = 2. So, the parent is at level 2, position 2.
// Move to level 2, position 2.

// Again, level is not 1, so we find this parent's position:
//  Math.ceil(2 / 2) = 1. The parent is at level 1, position 1.
// This time, since we are at level 1, the function returns 'Engineer'
// because the first generation starts with an Engineer.
// Back to level 2, position 2, with the parent being an Engineer.

// Since the parent is an Engineer and we are looking at position 2,
// according to the rules, this position would be a Doctor.
// (Engineer's second child is a Doctor.)
// Finally, back to level 3, position 4, with the parent being a Doctor.

// Since the parent is a Doctor and we are looking at position 4,
// which is even, this position would be an Engineer.
// (Doctor's second child is an Engineer.)
