import { subDays } from 'date-fns';
import { random, sample } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { GroceryListItem, ItemType } from './ordoApi';

export const mockItemTypes: ItemType[] = [
  {
    id: uuidv4(),
    name: 'Skummet melk',
    amountMetric: 'kartong',
    amountMultiplier: 1,
  },
  {
    id: uuidv4(),
    name: 'Olivenolje',
    amountMetric: 'flaske',
    amountMultiplier: 1,
  },
  { id: uuidv4(), name: 'Eple', amountMetric: 'stk', amountMultiplier: 1 },
  {
    id: uuidv4(),
    name: 'Havregryn',
    amountMetric: 'pakke',
    amountMultiplier: 1,
  },
  { id: uuidv4(), name: 'Pære', amountMetric: 'stk', amountMultiplier: 1 },
  { id: uuidv4(), name: 'Banan', amountMetric: 'stk', amountMultiplier: 1 },
  {
    id: uuidv4(),
    name: 'Sjokomelk',
    amountMetric: 'kartong',
    amountMultiplier: 1,
  },
  { id: uuidv4(), name: 'Agurk', amountMetric: 'stk', amountMultiplier: 1 },
  { id: uuidv4(), name: 'Avokado', amountMetric: 'stk', amountMultiplier: 1 },
];

export const mockGroceryList: GroceryListItem[] = [];
for (let i = 0; i < random(5, 10); i++) {
  mockGroceryList.push({
    id: uuidv4(),
    type: sample(mockItemTypes)!,
    status: 'todo',
    amount: random(1, 3),
  });
}
for (let daysAgo = 0; daysAgo < 5; daysAgo++) {
  for (let i = 0; i < random(2, 5); i++) {
    mockGroceryList.push({
      id: uuidv4(),
      type: sample(mockItemTypes)!,
      status: 'bought',
      boughtAt: subDays(new Date(), daysAgo),
      amount: random(1, 3),
    });
  }
}
