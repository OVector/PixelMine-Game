import React from "react";

import { Box, Props as BoxProps } from "./Box";

import {
  Inventory,
  ItemName,
  items,
} from "../../types/crafting";

import "./Inventory.css";
import { ActionableItem } from "../../types/contract";

interface Props {
  selectedItem?: ActionableItem;
  onSelectItem?: (item: ActionableItem) => void;
  inventory: Inventory;
}

export const InventoryItems: React.FC<Props> = ({
  selectedItem,
  onSelectItem,
  inventory,
}) => {
  const boxes: BoxProps[] = Object.keys(inventory)
    // Don't show tokens here
    .filter((name) => name !== "sunflowerTokens")
    .map((name) => {
      const item = items.find((i) => i.name === (name as ItemName));

      return {
        count: Number(inventory[name as ItemName]),
        onClick: onSelectItem ? () => onSelectItem(item) : undefined,
        isSelected: selectedItem?.name === item.name,
        image: item.image,
        disabled: !onSelectItem,
      };
    })
    .filter((item) => item.count > 0);

  // Pad array with empty boxes
  for (let i = boxes.length; i < 10; i++) {
    boxes.push({ disabled: true });
  }

  return (
    <div id="inventory">
      {boxes.map((box) => (
        <Box
          count={box.count}
          onClick={box.onClick}
          image={box.image}
          isSelected={box.isSelected}
          disabled={box.disabled}
        />
      ))}
    </div>
  );
};
