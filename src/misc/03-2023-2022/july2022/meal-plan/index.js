const getProdmulti = ({ cost1, cost2, qty1, qty2, mealK }) => {
  console.log({ cost1, cost2, qty1, qty2, mealK });
  if (cost1 <= cost2) {
    // shop 1 is cheaper
    if (qty1 >= mealK) {
      // shop1 has enough qty.
      return mealK * cost1;
    }
    // if shop1 doesn't have enough qty.
    // remainder is bought from shop2.
    return qty1 * cost1 + cost2 * (mealK - qty1);
  }
  // shop2 is cheaper and it has enough qty.
  if (qty2 >= mealK) {
    return mealK * cost2;
  }
  return qty2 * cost2 + cost1 * (mealK - qty2);
};

const getCostsMulti = ({ meal, quantities, costs }) => {
  let min = -1;
  for (let i = 0; i < costs.length - 1; i++) {
    for (let j = i + 1; j < costs.length; j++) {
      let cost = 0;
      for (let k = 0; k < meal.length; k++) {
        // there is not enough qty in both shops.
        if (quantities[i][k] + quantities[j][k] < meal[k]) {
          cost = 0;
          break;
        }
        // both shops have enough qty
        const temp = getProdmulti({
          cost1: costs[i][k],
          cost2: costs[j][k],
          qty1: quantities[i][k],
          qty2: quantities[j][k],
          mealK: meal[k]
        });
        cost += temp;
        console.log({ temp, cost });
      }

      if (min === -1) {
        min = cost;
      } else if (cost !== 0 && cost < min) {
        min = cost;
      }
      console.log({ min, cost });
    }
  }
  return min;
};

const solution = ({ cntProducts, quantities, costs, meals }) => {
  const res = [];
  for (let i = 0; i < meals.length; i++) {
    res.push(getCostsMulti({ meal: meals[i], quantities, costs }));
    console.log(res);
  }
  return res;
};
module.exports.mealPlan = { solution };
