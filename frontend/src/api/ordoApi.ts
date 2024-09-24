import axios from 'axios';

import { CreateGroceryItemDto } from 'ordo-api/dist/create-grocery-item.dto';
import { CreateItemTypeDto } from 'ordo-api/dist/create-item-type.dto';

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

const ordoService = axios.create({
  baseURL: 'http://localhost:4000/',
});

/**
 * ITEM TYPE API
 */
const getItemTypes = () =>
  ordoService.get(`/item-types`).then((res) => res.data as ItemType[]);

const createItemType = (itemType: CreateItemTypeDto) =>
  ordoService.post(`/item-types`, itemType).then((res) => res.data as ItemType);

const updateItemType = (itemType: ItemType) =>
  ordoService.patch(`/item-types/${itemType.id}`, itemType);

const deleteItemType = (id: string) => ordoService.delete(`/item-types/${id}`);

/**
 * GROCERY ITEM API
 */
const getGroceryItems = () =>
  ordoService
    .get(`/grocery-items`)
    .then((res) => res.data as GroceryListItem[]);

const createGroceryItem = (item: CreateGroceryItemDto) =>
  ordoService
    .post(`/grocery-items`, item)
    .then((res) => res.data as GroceryListItem);

const updateGroceryItem = (item: GroceryListItem) =>
  ordoService.patch(`/grocery-items/${item.id}`, item);

const deleteGroceryItem = (id: string) =>
  ordoService.delete(`/grocery-items/${id}`);

export const ordoApi = {
  getItemTypes,
  createItemType,
  updateItemType,
  deleteItemType,
  // groceryItems
  getGroceryItems,
  createGroceryItem,
  updateGroceryItem,
  deleteGroceryItem,
};
