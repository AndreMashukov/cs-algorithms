const { mealPlan } = require('../../../src/misc/july2022/meal-plan');

describe('misc.july2022.meal-plan', () => {
  it('should return [3, 8, 19]', () => {
    const cntProducts = 2;
    const quantities = [
      [1, 3],
      [2, 1],
      [1, 3]
    ];

    const costs = [
      [2, 4],
      [5, 2],
      [4, 1]
    ];

    const meals = [
      [1, 1],
      [2, 2],
      [3, 4]
    ];
    const result = mealPlan.solution({ cntProducts, quantities, costs, meals });
    expect(result).toStrictEqual([3, 8, 19]);
  });

  it('should return [1002000]', () => {
    const cntProducts = 2;
    const quantities = [
      [1000, 1000],
      [1000, 0]
    ];

    const costs = [
      [1, 1],
      [1000, 1000]
    ];

    const meals = [[2000, 1000]];
    const result = mealPlan.solution({ cntProducts, quantities, costs, meals });
    expect(result).toStrictEqual([1002000]);
  });

  it('should return [8, 21, 9, 23]', () => {
    const cntProducts = 2;
    const quantities = [
      [2, 4, 1],
      [5, 2, 0]
    ];

    const costs = [
      [4, 4, 1],
      [1, 2, 3]
    ];

    const meals = [
      [3, 2, 1],
      [7, 3, 0],
      [4, 2, 1],
      [3, 6, 0]
    ];
    const result = mealPlan.solution({ cntProducts, quantities, costs, meals });
    expect(result).toStrictEqual([8, 21, 9, 23]);
  });
});

// You've created a meal plan for the next few days,
//     and prepared a list of products
//     that you'll need as ingredients for each day's meal.
// There are many shops around you that
//     sell the products you're looking for,
//     but you only have time to visit one or two stores each day.

// Given the following information, your task is to find the minimum cost you'll need to spend on each meal:

// cntProducts - an integer representing the total number of products
//     you'll be using in all of your meals;
// quantities - a rectangular matrix of integers,
//     where quantities[i][j] represents the amount
//     of product j available in shop i;
// costs - a rectangular matrix of integers, where costs[i][j]
//     represents the cost of buying product j from shop i;
// meals - a rectangular matrix of integers,
//     where meals[m][j] represents the amount of product j
//     required to make the mth meal.
// Return an array of length meals.length representing
//     the minimum cost of each meal (assuming
//     you can only visit up to two shops each day).

// You only like to use fresh ingredients, so you'll need to buy new products
//     from the shops each day (you may not use leftovers from a previous day).
// Each store re-stocks their merchandise every night,
//     so the amounts in the quantities array are available each day.
// It's guaranteed that it will always be possible
//     to buy all the products needed
//     for each meal by visiting only one or two shops.

// Example
// For cntProducts = 2,
// quantities = [[1, 3], // shop 0, product 0 => q = 1. shop 0, product 1 => q = 3.
//               [2, 1], // shop 1, product 1 => q = 1.
//               [1, 3]] // shop 2, product 1 => q = 3.
// costs = [[2, 4], // shop 0, product 0 => c = 2.
//          [5, 2], // shop 1, product 0 => c = 5.
//          [4, 1]] // shop 2, product 1 => c = 1.
// and

// meals = [[1, 1], // meal 0, product 0 => amount 1.
//          [2, 2],
//          [3, 4]].

// the output should be
//     solution(cntProducts, quantities, costs, meals) = [3, 8, 19].
// There are 3 shops and 2 products in total.

// const temp = getProdmulti({
//   cost1: costs[i][k], // price of product k in shop i.
//   cost2: costs[j][k], // price of product k in shop j.
//   qty1: quantities[i][k], // qty of product k in shop i.
//   qty2: quantities[i][k], // qty of product k in shop j.
//   mealK: meal[k]
// });

// 0. Iterate through each meal of meals matrix.
// 1. Iterate through the matrix of quantities
//     1.1. Checking a pair of shops.
// 2. For each pair of shops we calculate the cost
//     of products from a certain meal.

// To cook the first meal you need to buy one product 0 and one product 1.
//     meals[0] = [1,1] => product 0 => amount = 1, product 1 => amount = 1.
//     The most optimal way is to buy them in the first and third shops respectively:
//     shop 0, product 0 => c = 2.
//     shop 2, product 1 => c = 1.
//     buying one product 0 in the first shop costs 2 * 1 = 2
//     and buying one product 1 in the third shop costs 1 * 1 = 1.
//     So you pay 2 + 1 = 3 units of money for this meal.

// To cook the second meal you need to buy two of product 0 and two of product 1.
//     meals[1] = [2, 2] => product 0 => amount = 2, product 1 => amount = 2.
//     The optimal way is to buy one product 0 in the first shop,
//         and then buy one product 0 and two product 1s in the third shop.
//         shop 0, product 0 => c = 2. // but the quantity is only 1.
//         shop 2, product 0 => c = 4.
//         shop 2, product 1 => c = 1.
//         This way, you spend (1 * 2) + (1 * 4 + 2 * 1) = 8 units of money.

// To cook the third meal you need to buy three of product 0 and four of product 1.
//     The optimal way is to buy two product 0s and one product 1 in the second shop,
//     and then buy one product 0 and three product 1s in the third shop.
//     This way, you spend (2 * 5 + 1 * 2) + (1 * 4 + 3 * 1) = 19 units of money.
