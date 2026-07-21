// 973. K Closest Points to Origin
// https://leetcode.com/problems/k-closest-points-to-origin/
// Medium
//
// Given an array of points where points[i] = [xi, yi] represents a point
// on the X-Y plane and an integer k, return the k closest points to the
// origin (0, 0).
//
// The distance between two points on the X-Y plane is the Euclidean
// distance (i.e., √(x1 - x2)2 + (y1 - y2)2).
//
// You may return the answer in any order. The answer is guaranteed
// to be unique (except for the order that it is in).

class MaxHeap {
  constructor() {
    this.data = [];
  }

  size() {
    return this.data.length;
  }

  peek() {
    return this.data[0];
  }

  push(item) {
    this.data.push(item);
    this.#bubbleUp(this.data.length - 1);
  }

  pop() {
    const max = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this.#bubbleDown(0);
    }
    return max;
  }

  #bubbleUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.data[parent][0] >= this.data[i][0]) break;
      [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
      i = parent;
    }
  }

  #bubbleDown(i) {
    const n = this.data.length;
    while (true) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && this.data[left][0] > this.data[largest][0]) largest = left;
      if (right < n && this.data[right][0] > this.data[largest][0]) largest = right;
      if (largest === i) break;
      [this.data[i], this.data[largest]] = [this.data[largest], this.data[i]];
      i = largest;
    }
  }
}

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function (points, k) {
  // Max-heap of size k by squared distance
  const heap = new MaxHeap();

  for (const [x, y] of points) {
    const dist = x * x + y * y;
    heap.push([dist, x, y]);
    if (heap.size() > k) {
      heap.pop();
    }
  }

  return heap.data.map(([, x, y]) => [x, y]);
};

console.log(kClosest([[1, 3], [-2, 2]], 1)); // [[-2, 2]]
console.log(kClosest([[3, 3], [5, -1], [-2, 4]], 2)); // [[3, 3], [-2, 4]]
