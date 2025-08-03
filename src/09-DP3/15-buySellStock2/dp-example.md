
# Best Time to Buy and Sell Stock II - Dynamic Programming Example

Let's trace through the DP solution with the same example: `prices = [1, 3, 2]`

## Initial Setup

- `n = 3` (three days)
- `dp[i][0]` = max profit on day `i` when **NOT holding** stock
- `dp[i][1]` = max profit on day `i` when **holding** stock

```
      Day 0 (price=1)     Day 1 (price=3)     Day 2 (price=2)
    +-------------------+-------------------+-------------------+
dp[0] | Not Holding: 0    | Not Holding: ?    | Not Holding: ?    |
      | Holding: -1       | Holding: ?        | Holding: ?        |
      +-------------------+-------------------+-------------------+
dp[1] |                   |                   |                   |
      +-------------------+-------------------+-------------------+
dp[2] |                   |                   |                   |
      +-------------------+-------------------+-------------------+
```

## Step 1: Initialize base cases for day 0

- `dp[0][0] = 0` (not holding stock, no transactions yet)
- `dp[0][1] = -1` (holding stock, bought at price 1)

## Step 2: Calculate for day 1 (i = 1, price = 3)

- `dp[1][0] = max(dp[0][0], dp[0][1] + prices[1]) = max(0, -1 + 3) = 2`
  (Either we rest, or we sell the stock we bought yesterday)
- `dp[1][1] = max(dp[0][1], dp[0][0] - prices[1]) = max(-1, 0 - 3) = -1`
  (Either we keep holding, or we buy new stock today)

```
      Day 0 (price=1)     Day 1 (price=3)     Day 2 (price=2)
      +-------------------+-------------------+-------------------+
dp[0] | Not Holding: 0    | Not Holding: 2    | Not Holding: ?    |
      | Holding: -1       | Holding: -1       | Holding: ?        |
      +-------------------+-------------------+-------------------+
```

## Step 3: Calculate for day 2 (i = 2, price = 2)

- `dp[2][0] = max(dp[1][0], dp[1][1] + prices[2]) = max(2, -1 + 2) = 2`
  (Keep profit of 2 is better than selling now for a profit of 1)
- `dp[2][1] = max(dp[1][1], dp[1][0] - prices[2]) = max(-1, 2 - 2) = 0`
  (Buying today after having a profit of 2 is better than holding old stock)

## Final DP Table

```
      Day 0 (price=1)     Day 1 (price=3)     Day 2 (price=2)
      +-------------------+-------------------+-------------------+
dp[0] | Not Holding: 0    | Not Holding: 2    | Not Holding: 2    |
      | Holding: -1       | Holding: -1       | Holding: 0        |
      +-------------------+-------------------+-------------------+
```

## Result

`dp[2][0] = 2` (maximum profit ending without stock)

The optimal trades:
- Buy on day 0 at price 1
- Sell on day 1 at price 3
- Profit = 3 - 1 = 2
