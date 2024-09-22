export type ItemType = {
  id: string;
  name: string;
  amountMetric: string;
  amountMultiplier: number;
};

export type GroceryListItem = {
  id: string;
  type: ItemType;
  status: 'todo' | 'bought';
  boughtAt?: Date;
  amount: number;
};
