const houseRobber = (nums) => {
  let rob1 = 0
  let rob2 = 0

  for (let i = 0; i < nums.length; i += 1) {
    const newRob = Math.max(rob1 + nums[i], rob2)
    rob1 = rob2
    rob2 = newRob
  }

  return rob2
};
