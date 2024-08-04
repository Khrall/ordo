import React from 'react';
import { GroceryListItem } from '../api/ordoApi';
import styles from './GroceryListItem.module.scss';
import { ELEMENT_HEIGHT } from './TodoGroceryListItem';

type Props = {
  item: GroceryListItem;
};

const CompletedGroceryListItem: React.FC<Props> = ({ item }) => {
  return (
    <div className={styles.wrapper} style={{ height: ELEMENT_HEIGHT }}>
      <div className={styles.groceryListItem}>
        <p>{item.type.name}</p>
      </div>
    </div>
  );
};

export default CompletedGroceryListItem;
