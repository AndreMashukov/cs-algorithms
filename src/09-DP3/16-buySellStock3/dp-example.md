# Best Time to Buy and Sell Stock III - Dynamic Programming Example

Let's trace the DP solution with `prices = [1, 4, 2]` and `k = 2` (max transactions).

## DP State

- `dp[i][j][0]`: Max profit on day `i` with at most `j` transactions, **NOT holding** stock.
- `dp[i][j][1]`: Max profit on day `i` with at most `j` transactions, **holding** stock.

A "transaction" is a buy-sell pair. The transaction count `j` increases when we **sell**.

## Initial State (Day 0)

On day 0, we can only buy, which starts a transaction but doesn't complete one.

- `dp[0][j][0] = 0` (No profit if we don't hold)
- `dp[0][j][1] = -1` (We buy at price 1, so our balance is -1)

```
      j=1 (Tx <= 1)       j=2 (Tx <= 2)
    +-------------------+-------------------+
D   | Not Holding: 0    | Not Holding: 0    |
a   | Holding: -1       | Holding: -1       |
y   +-------------------+-------------------+
0
```

## Day 1 (price = 4)

### For j = 1 (at most 1 transaction)
- **Not Holding `dp[1][1][0]`**: `max(dp[0][1][0], dp[0][1][1] + 4) = max(0, -1 + 4) = 3`
  (Max of not doing anything vs. selling the stock we bought on day 0)
- **Holding `dp[1][1][1]`**: `max(dp[0][1][1], dp[0][0][0] - 4) = max(-1, 0 - 4) = -1`
  (Max of holding from yesterday vs. buying today after 0 transactions)

### For j = 2 (at most 2 transactions)
- **Not Holding `dp[1][2][0]`**: `max(dp[0][2][0], dp[0][2][1] + 4) = max(0, -1 + 4) = 3`
- **Holding `dp[1][2][1]`**: `max(dp[0][2][1], dp[0][1][0] - 4) = max(-1, 0 - 4) = -1`
  (Max of holding vs. buying today after making 1 transaction)

```
      j=1 (Tx <= 1)       j=2 (Tx <= 2)
    +-------------------+-------------------+
D   | Not Holding: 3    | Not Holding: 3    |
a   | Holding: -1       | Holding: -1       |
y   +-------------------+-------------------+
1
```

## Day 2 (price = 2)

### For j = 1 (at most 1 transaction)
- **Not Holding `dp[2][1][0]`**: `max(dp[1][1][0], dp[1][1][1] + 2) = max(3, -1 + 2) = 3`
  (Better to keep the profit of 3 than to sell for a smaller profit)
- **Holding `dp[2][1][1]`**: `max(dp[1][1][1], dp[1][0][0] - 2) = max(-1, 0 - 2) = -1`
  (Better to keep holding the original stock)

### For j = 2 (at most 2 transactions)
- **Not Holding `dp[2][2][0]`**: `max(dp[1][2][0], dp[1][2][1] + 2) = max(3, -1 + 2) = 3`
  (Keep the profit from the first transaction)
- **Holding `dp[2][2][1]`**: `max(dp[1][2][1], dp[1][1][0] - 2) = max(-1, 3 - 2) = 1`
  (Better to buy a new stock today. We had a profit of 3, now we buy at 2, so our net is 1)

## Final DP Table

```
      j=1 (Tx <= 1)       j=2 (Tx <= 2)
    +-------------------+-------------------+
D   | Not Holding: 3    | Not Holding: 3    |
a   | Holding: -1       | Holding: 1        |
y   +-------------------+-------------------+
2
```

## Result

The final answer is `dp[n-1][k][0]`, which is `dp[2][2][0] = 3`.

The optimal strategy is to buy on day 0 (price 1) and sell on day 1 (price 4), for a profit of 3. We only need one transaction.
