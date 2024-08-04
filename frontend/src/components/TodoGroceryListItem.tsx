import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import React, { useRef, useState } from 'react';
import {
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaRegTrashCan,
} from 'react-icons/fa6';
import { GroceryListItem } from '../api/ordoApi';
import styles from './GroceryListItem.module.scss';

type Props = {
  item: GroceryListItem;
  onRemove: (item: GroceryListItem) => void;
  onComplete: (item: GroceryListItem) => void;
  onIncreaseAmount: (item: GroceryListItem) => void;
  onDecreaseAmount: (item: GroceryListItem) => void;
};

const MAX_DRAG = 60;
const MIN_ICON_SIZE = 8;
const MAX_ICON_SIZE = 14;
export const ELEMENT_HEIGHT = 32;

const TodoGroceryListItem: React.FC<Props> = ({
  item,
  onComplete,
  onRemove,
  onDecreaseAmount,
  onIncreaseAmount,
}) => {
  const [isSwiping, setIsSwiping] = useState<'left' | 'right' | undefined>(
    undefined
  );
  const [{ x, iconBackgroundColor, iconSize, height }, api] = useSpring(() => ({
    x: 0,
    iconBackgroundColor: '#10b981',
    iconSize: MIN_ICON_SIZE,
    height: ELEMENT_HEIGHT,
  }));

  const ref = useRef<HTMLDivElement>(null);

  const handleSwipe = (direction: 'left' | 'right') => {
    setIsSwiping(direction);
    const elementWidth = ref.current?.getBoundingClientRect().width || 0;

    // 1. Animate list element to move off screen
    api.start({
      x: direction === 'left' ? -elementWidth : elementWidth,
      iconSize: MAX_ICON_SIZE,
    });

    setTimeout(() => {
      // 2. Animate height of entire area to be reduced to 0
      api.start({ height: 0 });
      setTimeout(() => {
        // 3. Call onComplete/onRemove to clean up
        if (direction === 'left') {
          onComplete(item);
        } else {
          onRemove(item);
        }
      }, 200);
    }, 300);
  };

  const bind = useDrag(
    ({ down, movement: [mx] }) => {
      // Handle swipe if released and dragged far enough
      if (!down && Math.abs(mx) >= MAX_DRAG) {
        if (isSwiping === undefined) {
          handleSwipe(mx > 0 ? 'right' : 'left');
        }
        return;
      }

      // Default animation
      const iconSize = Math.abs(mx) >= MAX_DRAG ? MAX_ICON_SIZE : MIN_ICON_SIZE;
      const iconBackgroundColor = mx > 0 ? '#f43f5e' : '#10b981';

      api.start({
        x: down ? mx : 0,
        iconBackgroundColor,
        iconSize,
        immediate: down,
      });
    },
    {
      axis: 'x',
      rubberband: true,
      preventScroll: true,
    }
  );

  return (
    <animated.div
      ref={ref}
      className={styles.wrapper}
      {...bind()}
      style={{
        height,
      }}
    >
      <animated.div
        className={styles.background}
        {...bind()}
        style={{ fontSize: iconSize, backgroundColor: iconBackgroundColor }}
      >
        <div className={styles.trash}>
          {isSwiping !== 'left' && <FaRegTrashCan />}
        </div>
        <div className={styles.complete}>
          {isSwiping !== 'right' && <FaCheck />}
        </div>
      </animated.div>
      <animated.div
        className={styles.groceryListItem}
        {...bind()}
        style={{
          x,
        }}
      >
        <p>{item.type.name}</p>

        <div className={styles.amount}>
          <FaChevronLeft onClick={() => onDecreaseAmount(item)} />
          <span>{item.amount}</span>
          <FaChevronRight onClick={() => onIncreaseAmount(item)} />
        </div>
      </animated.div>
    </animated.div>
  );
};

export default TodoGroceryListItem;
