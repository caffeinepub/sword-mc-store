# Sword MC Store

## Current State
The store has a Coins section with a single package: 100 Coins for ₹89 (max 5 purchases). The CoinsSection renders one centered card. The PaymentModal handles UPI payment + screenshot upload. Purchase counts are tracked in AuthContext.

## Requested Changes (Diff)

### Add
- 500 Coins package at ₹399 (bulk: saves ₹46 vs buying 5×100)
- 1000 Coins package at ₹749 (bulk: saves ₹141 vs buying 10×100)
- "Best Value" badge on the 1000 Coins card
- "Popular" badge on the 500 Coins card

### Modify
- CoinsSection: change from single centered card to a 3-column grid (like RanksSection) showing all 3 packages side by side
- Each coin package card follows the same card design pattern as the existing 100 Coins card
- Display savings label under price for 500 and 1000 packages (e.g. "Save ₹46 vs 5×100")

### Remove
- Nothing removed

## Implementation Plan
1. Update COIN_PACKAGES array in CoinsSection.tsx to include all 3 tiers (100, 500, 1000 coins)
2. Add savings info and badge fields to coin package data
3. Rework CoinsSection layout from single card to 3-column grid matching the RanksSection pattern
4. Ensure each package uses AuthContext purchaseCounts with its own key (e.g. "100 Coins", "500 Coins", "1000 Coins")
5. Each card has its own PaymentModal state to handle purchase flow independently
