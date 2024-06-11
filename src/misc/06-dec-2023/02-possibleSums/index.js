// You have a collection of coins, and you know the values of the coins\
// and the quantity of each type of coin in it.
// You want to know how many distinct sums you can make
// from non-empty groupings of these coins.

// Example

// For coins = [10, 50, 100] and quantity = [1, 2, 1], the output should be
// solution(coins, quantity) = 9.

// Here are all the possible sums:

// 50 = 50;
// 10 + 50 = 60;
// 50 + 100 = 150;
// 10 + 50 + 100 = 160;
// 50 + 50 = 100;
// 10 + 50 + 50 = 110;
// 50 + 50 + 100 = 200;
// 10 + 50 + 50 + 100 = 210;
// 10 = 10;
// 100 = 100;
// 10 + 100 = 110.
// As you can see, there are 9 distinct sums that can be created from non-empty groupings of your coins.

const solution = (coins, quantity) => {
  const sums = new Set()
  const recurse = (index, sum) => {
    // base case: if we've considered all the coins, add the sum to the set and return
    if (index === coins.length) {
      // add sum from the params
      sums.add(sum)
      // break the recursion
      return
    }

    // consider all possible quantities of the current coin
    // iterate up to quantity[index] inclusive
    // quantity[index] and not quantity[i]
    for (let i = 0; i <= quantity[index]; i++) {
      // consider the next coin and a new sum that includes i copies of the current coin
      recurse(index + 1, sum + i * coins[index])
    }
  }

  recurse(0, 0)

  return sums.size - 1
}

// The recursive function is used here to explore
// all possible combinations of coins.
// This is a common approach in problems where you need to consider all subsets
/// or combinations of a set of items, which is the case here.

// In this problem, for each coin,
// you have a certain quantity of that coin available.
// For each coin, you can choose to include any number
// of that coin from 0 up to the quantity available.
//  This creates a tree of possibilities
// where each level of the tree represents a coin
// and each branch represents a choice of how many
// of that coin to include.

// A recursive function is a natural way to traverse this tree of possibilities.
//  Starting with the first coin, the function calls itself
// for each possible number of that coin to include,
// each time moving on to the next coin and a new sum.
//  When it has considered all coins,
// it adds the sum to the set of sums.

// coins: [10, 50, 100]
// quantity: [1, 2, 1]
// sum index
// 0 0
// 1 0
// 2 0
// 3 0
// 3 100
// 2 50
// 3 50
// 3 150
// 2 100
// 3 100
// 3 200
// 1 10
// 2 10
// 3 10
// 3 110
// 2 60
// 3 60
// 3 160
// 2 110
// 3 110
// 3 210
