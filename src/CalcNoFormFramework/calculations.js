export const initialData = { items: [], subTotal: 0, taxes: 0, shipping: 0, total: 0 };

const updateItemExtendedPrice = (item) => {
  return { ...item, extendedPrice: (Number(item.quantity) || 0.0) * (Number(item.unitPrice) || 0.0) }
};

const updateTotals = (data) => {
  const subTotal = data.items.reduce((total, item) => total + item.extendedPrice, 0.0);
  return { ...data, subTotal, total: subTotal + (Number(data.taxes) || 0) + (Number(data.shipping) || 0) }
};

const createNItems = (startId, numItems) => {
  const newItems = [];
  for (let i = 0; i < numItems; i++) {
    newItems.push({ itemId: startId + i, itemName: `Item name ${startId + i}`, quantity: 0, unitPrice: 0, extendedPrice: 0 });
  }
  return newItems;
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ITEM_UPDATE":
      return updateTotals({
        ...state,
        items: state.items.map(item =>
          item.itemId === action.itemId ? updateItemExtendedPrice({ ...item, [action.name]: action.value }) : item)
      });
    case "ITEM_ADD":
      const startId = state.items.length + 1;
      return {
        ...state,
        items: [...state.items, ...createNItems(startId, action.numItems || 1)]
      };
    case "COST_UPDATE":
      return updateTotals({
        ...state,
        [action.name]: action.value
      });
    case "RESET":
      return {...initialData};
    default:
      return state;
  }
};