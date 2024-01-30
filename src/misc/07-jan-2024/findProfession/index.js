// Consider a special family of Engineers and Doctors. This family has the following rules:

// Everybody has two children.
// The first child of an Engineer is an Engineer and the second child is a Doctor.
// The first child of a Doctor is a Doctor and the second child is an Engineer.
// All generations of Doctors and Engineers start with an Engineer.

// Given the level and position of a person in the ancestor tree above, find the profession of the person.

function solution (level, pos) {
  if (level === 1) {
    return 'Engineer'
  }
  const parent = solution(level - 1, Math.ceil(pos / 2))
  return parent === 'Engineer' ? pos % 2 === 0 ? 'Doctor' : 'Engineer' : pos % 2 === 0 ? 'Engineer' : 'Doctor'
}
