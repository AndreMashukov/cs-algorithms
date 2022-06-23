/* eslint-disable require-jsdoc */
function minPoints(points, n) {
  // Sort the list of tuples by
  // their second element.
  points.sort((a, b) => a[1] - b[1]);

  // console.log({ points });
  // To store the solution
  const coordinates = [];
  let i = 0;

  // Iterate over all the segments
  while (i < n) {
    const seg = points[i][1];

    coordinates.push(seg);
    let p = i + 1;
    // console.log({ i, p, seg });
    if (p >= n) break;

    // Get the start point of next segment
    let arrived = points[p][0];

    // Loop over all those segments whose
    // start point is less than the end
    // point of current segment
    while (seg >= arrived) {
      p += 1;
      if (p >= n) break;
      arrived = points[p][0];
    }
    i = p;
  }

  // Print the possibles values of M
  return coordinates;
}

const naive = (segments) => {
  const n = segments.length;

  const p = minPoints(segments, n);
  return p.length;
};

module.exports.segments = { naive };
