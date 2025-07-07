impl Solution {
  fn swap(nums: &mut Vec<i32>, i: usize, j: usize) {
      nums.swap(i, j);
  }
  fn reverse(nums: &mut Vec<i32>, start: usize) {
      let mut i = start;
      let mut j = nums.len() - 1; 
      while i < j {
          Self::swap(nums, i, j);
          i += 1;
          j -= 1;
      }
  }

  pub fn next_permutation(nums: &mut Vec<i32>) {
    if nums.len() <= 1 {
        return;
    }

    // Find the first index 'i' from the right where nums[i] < nums[i + 1]
    let mut i: isize = (nums.len() - 2) as isize;
    while i >= 0 && nums[i as usize] >= nums[(i + 1) as usize] {
        i -= 1;
    }

    // If such a pivot exists, find the next larger element in the suffix and swap.
    if i >= 0 {
        let pivot = i as usize;
        let mut j = nums.len() - 1;
        while nums[j] <= nums[pivot] {
            j -= 1;
        }
        Self::swap(nums, pivot, j);
    }

    // Reverse the suffix starting at i + 1.
    Self::reverse(nums, (i + 1) as usize);
  }
}

// isize is a signed integer type, meaning 
// it can represent both negative and positive numbers. 
// usize is an unsigned integer type, used to represent 
// sizes and indices, so it cannot represent negative values. 
// Both are pointer-sized, meaning their size depends on the architecture