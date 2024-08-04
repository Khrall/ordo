export type ItemType = {
  id: string;
  name: string;
  amountMetric: string;
  amountMultiplier: number;
};

export type GroceryListItem = {
  id: string;
  type: ItemType;
  status: 'todo' | 'picked up' | 'bought';
  pickedUpAt?: Date;
  boughtAt?: Date;
  amount: number;
};
