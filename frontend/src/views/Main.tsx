import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { format } from 'date-fns';
import { capitalize, find, initial, last } from 'lodash';
import { useMemo, useState } from 'react';
import { FaBasketShopping, FaRotateLeft, FaXmark } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';

import { GroceryListItem, ItemType, ordoApi } from '../api/ordoApi';
import CompletedGroceryListItem from '../components/CompletedGroceryListItem';
import TodoGroceryListItem from '../components/TodoGroceryListItem';
import styles from './Main.module.scss';

type GroceryEvent = {
  type:
    | 'ADD_ITEM'
    | 'REMOVE_ITEM'
    | 'COMPLETE_ITEM'
    | 'INCREASE_AMOUNT'
    | 'DECRASE_AMOUNT';
  item: GroceryListItem;
};

type GroceryHistory = GroceryEvent[];

type Suggestion = ItemType & {
  matchedTodoGroceryItem?: GroceryListItem;
};

function Main() {
  const [isShopping, setIsShopping] = useState<boolean>(false);
  const [history, setHistory] = useState<GroceryHistory>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [inputValue, setInputValue] = useState('');

  const queryClient = useQueryClient();

  const {
    isPending: groceryItemsPending,
    data: groceryItems,
    error: groceryItemsError,
  } = useQuery({
    queryKey: ['grocery-items'],
    queryFn: ordoApi.getGroceryItems,
  });

  const {
    isPending: itemTypesPending,
    data: itemTypes,
    error: itemTypesError,
  } = useQuery({ queryKey: ['item-types'], queryFn: ordoApi.getItemTypes });

  const createItemType = useMutation({
    mutationFn: ordoApi.createItemType,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['item-types'] });
    },
  });

  const updateItemType = useMutation({
    mutationFn: ordoApi.updateItemType,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['item-types'] });
    },
  });

  const deleteItemType = useMutation({
    mutationFn: ordoApi.deleteItemType,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['item-types'] });
    },
  });

  const createGroceryItem = useMutation({
    mutationFn: ordoApi.createGroceryItem,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['grocery-items'] });
    },
  });

  const updateGroceryItem = useMutation({
    mutationFn: ordoApi.updateGroceryItem,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['grocery-items'] });
    },
  });

  const deleteGroceryItem = useMutation({
    mutationFn: ordoApi.deleteGroceryItem,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['grocery-items'] });
    },
  });

  const undo = () => {
    const lastEvent = last(history);
    if (lastEvent != null) {
      switch (lastEvent.type) {
        case 'ADD_ITEM':
          removeGroceryItem(lastEvent.item, false);
          break;
        case 'REMOVE_ITEM':
          addGroceryItem(lastEvent.item, false);
          break;
        case 'COMPLETE_ITEM':
          revertCompleteItem(lastEvent.item);
          break;
        case 'INCREASE_AMOUNT':
          decreaseAmount(lastEvent.item, false);
          break;
        case 'DECRASE_AMOUNT':
          increaseAmount(lastEvent.item, false);
          break;
      }
      setHistory((history) => initial(history));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === '' || itemTypes == null) {
      setSuggestions([]);
    } else {
      const suggestions: Suggestion[] = itemTypes
        .filter(
          (item) => item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
        )
        .map((itemType) => ({
          ...itemType,
          matchedTodoGroceryItem: find(
            todoItems,
            (todoItem) => todoItem.type.id === itemType.id
          ),
        }));
      setSuggestions(suggestions);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (itemTypes == null) {
      // TODO: Handle
      console.error(
        `Expected itemTypes to have been fetched, but they do not seem to have been.`
      );
      return;
    }

    resetInputValue();

    // Search for matching item type
    let itemType = itemTypes.find(
      (item) => item.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (itemType === undefined) {
      // Create new item type
      itemType = await createItemType.mutateAsync({
        name: capitalize(inputValue),
        amountMetric: 'stk',
        amountMultiplier: 1,
      });
    }

    addGroceryItem(
      {
        id: uuidv4(),
        type: itemType,
        status: 'todo',
        amount: 1,
      },
      true
    );
  };

  const addGroceryItem = (item: GroceryListItem, saveInHistory: boolean) => {
    console.debug('Add', item);
    createGroceryItem.mutate({
      ...item,
      typeId: item.type.id,
    });
    if (saveInHistory) {
      setHistory((history) => [
        ...history,
        {
          type: 'ADD_ITEM',
          item,
        },
      ]);
    }
  };

  const removeGroceryItem = (item: GroceryListItem, saveInHistory: boolean) => {
    console.debug('Remove', item);
    deleteGroceryItem.mutate(item.id);
    if (saveInHistory) {
      setHistory((history) => [
        ...history,
        {
          type: 'REMOVE_ITEM',
          item,
        },
      ]);
    }
  };

  const increaseAmount = (item: GroceryListItem, saveInHistory: boolean) => {
    const updatedItem = {
      ...item,
      amount: item.amount + item.type.amountMultiplier,
    };
    updateGroceryItem.mutate(updatedItem);
    if (saveInHistory) {
      setHistory((history) => [
        ...history,
        {
          type: 'INCREASE_AMOUNT',
          item: updatedItem,
        },
      ]);
    }
  };

  const decreaseAmount = (item: GroceryListItem, saveInHistory: boolean) => {
    const updatedItem = {
      ...item,
      amount: item.amount - item.type.amountMultiplier,
    };
    updateGroceryItem.mutate(updatedItem);
    if (saveInHistory) {
      setHistory((history) => [
        ...history,
        {
          type: 'DECRASE_AMOUNT',
          item: updatedItem,
        },
      ]);
    }
  };

  const completeGroceryItem = (
    item: GroceryListItem,
    saveInHistory: boolean
  ) => {
    console.debug('Complete', item);
    const updatedItem: GroceryListItem = {
      ...item,
      status: 'bought',
      boughtAt: new Date(),
    };
    updateGroceryItem.mutate(updatedItem);
    if (saveInHistory) {
      setHistory((history) => [
        ...history,
        {
          type: 'COMPLETE_ITEM',
          item: updatedItem,
        },
      ]);
    }
  };

  const revertCompleteItem = (item: GroceryListItem) => {
    console.debug('Revert complete', item);
    const updatedItem: GroceryListItem = {
      ...item,
      status: 'todo',
      boughtAt: undefined,
    };
    updateGroceryItem.mutate(updatedItem);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    resetInputValue();
    if (suggestion.matchedTodoGroceryItem != null) {
      handleIncreaseGroceryItemAmount(suggestion.matchedTodoGroceryItem);
    } else {
      addGroceryItem(
        {
          id: uuidv4(),
          type: suggestion,
          status: 'todo',
          amount: 1,
        },
        true
      );
    }
  };

  const resetInputValue = () => {
    setInputValue('');
    setSuggestions([]);
  };

  const handleRemoveGroceryItem = (item: GroceryListItem) =>
    removeGroceryItem(item, true);
  const handleCompleteGroceryItem = (item: GroceryListItem) =>
    completeGroceryItem(item, true);

  const handleIncreaseGroceryItemAmount = (
    itemToIncreaseAmount: GroceryListItem
  ) => increaseAmount(itemToIncreaseAmount, true);

  const handleDecreaseGroceryItemAmount = (
    itemToDecreaseAmount: GroceryListItem
  ) => decreaseAmount(itemToDecreaseAmount, true);

  const todoItems = useMemo(
    () => groceryItems?.filter(({ status }) => status === 'todo'),
    [groceryItems]
  );
  const completedItemsByDate: { [key: string]: GroceryListItem[] } | undefined =
    useMemo(
      () =>
        groceryItems
          ?.filter(({ status }) => status === 'bought')
          .reduce((prev, item) => {
            const key = format(item.boughtAt!, 'dd.MM.yyyy');
            const prevByKey = prev[key] || [];
            return {
              ...prev,
              [key]: [...prevByKey, item],
            };
          }, {} as { [key: string]: GroceryListItem[] }),
      [groceryItems]
    );

  const exactSuggestionMatch = suggestions.find(
    (item) => item.name.toLowerCase() === inputValue.toLowerCase()
  );

  if (groceryItemsPending || itemTypesPending) {
    return <div>Loading ...</div>;
  }

  if (groceryItemsError || itemTypesError) {
    return <div>Error ...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.itemSearch}>
        <form className={styles.itemSearchForm} onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Søk etter vare"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
          />
          {inputValue.length > 0 && (
            <button
              className={styles.resetInputButton}
              type="button"
              onClick={resetInputValue}
            >
              <FaXmark />
            </button>
          )}
        </form>
        <div className={styles.suggestions}>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className={styles.suggestionName}>{suggestion.name}</span>
              {suggestion.matchedTodoGroceryItem && (
                <span className={styles.suggestionIsInTodoList}>
                  I handlelisten
                </span>
              )}
            </div>
          ))}
          {inputValue.length > 0 && exactSuggestionMatch == null && (
            <div onClick={handleSubmit}>Legg til "{inputValue}"</div>
          )}
        </div>
      </div>
      <div className={styles.groceryList}>
        <div className={styles.section}>
          <p className={styles.sectionHeader}>Til innkjøp</p>
          {todoItems?.map((groceryItem) => (
            <TodoGroceryListItem
              key={groceryItem.id}
              item={groceryItem}
              onRemove={handleRemoveGroceryItem}
              onComplete={handleCompleteGroceryItem}
              onIncreaseAmount={handleIncreaseGroceryItemAmount}
              onDecreaseAmount={handleDecreaseGroceryItemAmount}
            />
          ))}
        </div>
        {completedItemsByDate &&
          Object.keys(completedItemsByDate).map((date) => (
            <div key={`completed-at-${date}`} className={styles.section}>
              <p className={styles.sectionHeader}>{date}</p>
              {completedItemsByDate[date].map((groceryItem) => (
                <CompletedGroceryListItem
                  key={groceryItem.id}
                  item={groceryItem}
                />
              ))}
            </div>
          ))}
      </div>

      <div className={styles.actionsMenu}>
        <div className={styles.leftAction}></div>
        <div
          onClick={() => setIsShopping(!isShopping)}
          className={classNames(styles.centerAction, {
            [styles.active]: isShopping,
          })}
        >
          <FaBasketShopping />
        </div>
        <div
          className={classNames(styles.rightAction, {
            [styles.disabled]: history.length === 0,
          })}
          onClick={undo}
        >
          <FaRotateLeft />
        </div>
      </div>
    </div>
  );
}

export default Main;
