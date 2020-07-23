/**
 * @param {array} activities
 * @return {array}
 */
function maxActivities(activities) {
  // sort the activities in ascending order of meeting finish time
  // System.out.println("Given Activities: " + activities);
  actSorted = activities.sort((a1, a2) => a1.end - a2.end);

  const selectedActivities = [];
  let currentEnd = -1;
  for (let i = 0; i < actSorted.length; i++) {
    const currentActivity = actSorted[i];
    if (currentActivity.start > currentEnd) {
      selectedActivities.push(currentActivity);
      currentEnd = currentActivity.end;
    }
  }

  return selectedActivities.map((activity) => activity.toString());
}

module.exports.maxActivities = maxActivities;

// Algorithm: Greedy
// Sort all the activities according to their end time.
// Select the first activity and note the end time, call it as current_end.
// Now iterate through the rest of the activities. For each current_activity
// If start time of current_activity > current_end
// Select current_activity.
// Update current_end = end time of current_activity.
// Else
// Ignore the current_acitvity.
// Time Complexity: O(nlogn)
