/**
 * @param {array} coordinates
 * @param {object} interval
 * @return {boolean}
 */
function checkIfIntervalIsOverlapping(coordinates, interval) {
  const stack = [];
  coordinatesSorted = coordinates.sort((a1, a2) => a1.x1 - a2.x1);

  // add first interval to stack
  stack.push(coordinatesSorted[0]);

  // now iterate through rest of the intervals
  for (let i = 1; i < coordinatesSorted.length; i++) {
    const current = coordinatesSorted[i];
    // check if this interval can be merged with top interval in the stack
    const previous = stack[0];
    // if end of previous >= start of current
    if (previous.x2 >= current.x1) {
      // merge them
      previous.x2 = current.x2;
      stack.shift();
      stack.push(previous);
    } else {
      // cannot be merged, push new interval to stack
      stack.push(current);
    }
  }

  // check if given coordinate is overlapping
  // const result = false;
  while (stack.length > 0) {
    const coordinate = stack.shift();
    if (coordinate.x1 <= interval.x1 && coordinate.x2 >= interval.x2) {
      // System.out.println("Given interval is COVERED in coordinates");
      return true;
    }
  }
  // System.out.println("Given interval is NOT COVERED in coordinates");
  return false;
}

module.exports.checkIfIntervalIsOverlapping = checkIfIntervalIsOverlapping;
