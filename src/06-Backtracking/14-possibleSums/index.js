// https://www.hackerearth.com/problem/algorithm/all-possible-sums/
// You have a collection of coins, and you know the values of the coins
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
// As you can see, there are 9 distinct sums that can be created
// from non-empty groupings of your coins.

const main = (input) => {
  const sums = new Set()
  const coins = input[0]
  const quantities = input[1]

  const dfs = (i, sum) => {
    if (i === coins.length) {
      sums.add(sum)
      return
    }

    for (let j = 0; j <= quantities[i]; j++) {
      dfs(i + 1, sum + j * coins[i])
    }
  }

  dfs(0, 0)
  console.log(sums.size - 1)
  return sums.size - 1
}

if (require.main === module) {
  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const lines = []
  rl.on('line', (line) => lines.push(line.trim()))
  rl.on('close', () => {
    // Parse input lines
    const coins = lines[0].split(' ').map(Number)
    const quantities = lines[1].split(' ').map(Number)
    const answer = main([coins, quantities])
    // console.log(answer); // prints with newline
  })
}
// Let's consider a simple example with coins [1, 2]
// and quantities [1, 1]. This means we have one coin
// of value 1 and one coin of value 2.
// We want to find all possible sums
// we can make with these coins.

// Start (sum = 0)
// |
// |-- Include 0 coins of 1 (sum = 0)
// |   |
// |   |-- Include 0 coins of 2 (sum = 0)
// |   |-- Include 1 coin of 2 (sum = 2)
// |
// |-- Include 1 coin of 1 (sum = 1)
//     |
//     |-- Include 0 coins of 2 (sum = 1)
//     |-- Include 1 coin of 2 (sum = 3)

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
