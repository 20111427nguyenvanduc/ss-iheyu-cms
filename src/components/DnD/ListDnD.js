import React, { useEffect, useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Grid, Paper } from '@mui/material';
import { arrayMoveImmutable } from 'array-move';

const SortableItem = SortableElement(({ item, renderItem }) => (
  <Grid item xs={6} sm={4} md={3}>
    {renderItem(item)}
  </Grid>
));

const SortableList = SortableContainer(({ items, renderItem }) => {
  return (
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <SortableItem key={`item-${item._id}`} index={index} item={item} renderItem={renderItem} />
      ))}
    </Grid>
  );
});

const ListManager = ({ items, setItems, isOrdered, renderItem = () => null }) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const reorderedItems = arrayMoveImmutable(items, oldIndex, newIndex);
    setItems(reorderedItems.map((item, order) => ({ ...item, order })));
  };

  return <SortableList items={items} onSortEnd={onSortEnd} axis={'xy'} renderItem={renderItem} useDragHandle={!isOrdered} lockAxis={'xy'} />;
};

export default ListManager;
