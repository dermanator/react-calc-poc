import { reducer, initialData } from './calculations';

describe('calculations', () => {
  describe('reducer', () => {
    let initState;

    beforeEach(() => {
      initState = {
        ...initialData, items: [{ itemId: 1, itemName: `Item name 1`, quantity: 0, unitPrice: 0, extendedPrice: 0 }]
      }
    })

    it('should add items', () => {
      let state = initState;

      state = reducer(state, { type: "ITEM_ADD" });

      expect(initState.items).toHaveLength(1);
      expect(state.items).toHaveLength(2);
    });

    it('should update items', () => {
      let state = initState;
       
      state = reducer(state, { type: "ITEM_UPDATE", itemId: 1, name: "itemName", value: "New Name 1" });

      expect(initState.items[0].itemName).toEqual("Item name 1");
      expect(state.items[0].itemName).toEqual("New Name 1");
    });

    it('should calculate item extended price', () => {
      let  state = initState;

      state = reducer(state, { type: "ITEM_UPDATE", itemId: 1, name: "quantity", value: "10" });
      state = reducer(state, { type: "ITEM_UPDATE", itemId: 1, name: "unitPrice", value: "16.57" });

      expect(initState.items[0].extendedPrice).toEqual(0);
      expect(state.items[0].extendedPrice).toEqual(165.7);
    });

    it('should calculate sub-total', () => {
      let state = initState;

      state = reducer(state, { type: "ITEM_UPDATE", itemId: 1, name: "quantity", value: "10" });
      state = reducer(state, { type: "ITEM_UPDATE", itemId: 1, name: "unitPrice", value: "16.57" });
      state = reducer(state, { type: "ITEM_ADD" });
      state = reducer(state, { type: "ITEM_UPDATE", itemId: 2, name: "quantity", value: "11" });
      state = reducer(state, { type: "ITEM_UPDATE", itemId: 2, name: "unitPrice", value: "22.25" });

      expect(initState.subTotal).toEqual(0);
      expect(state.subTotal).toEqual(410.45);
    });

    it('should add taxes to total', () => {
      let state = initState;

      state = reducer(state, { type: "ITEM_UPDATE", itemId: 1, name: "quantity", value: "10" });
      state = reducer(state, { type: "ITEM_UPDATE", itemId: 1, name: "unitPrice", value: "16.57" });
      state = reducer(state, { type: "ITEM_ADD" });
      state = reducer(state, { type: "ITEM_UPDATE", itemId: 2, name: "quantity", value: "11" });
      state = reducer(state, { type: "ITEM_UPDATE", itemId: 2, name: "unitPrice", value: "22.25" });
      state = reducer(state, { type: "COST_UPDATE", name: "taxes", value: "24.63" });

      expect(initState.total).toEqual(0);
      expect(state.total).toEqual(435.08);
    });

    it('should add shipping to total', () => {
      let state = initState;

      state = reducer(state, { type: "ITEM_UPDATE", itemId: 1, name: "quantity", value: "10" });
      state = reducer(state, { type: "ITEM_UPDATE", itemId: 1, name: "unitPrice", value: "16.57" });
      state = reducer(state, { type: "ITEM_ADD" });
      state = reducer(state, { type: "ITEM_UPDATE", itemId: 2, name: "quantity", value: "11" });
      state = reducer(state, { type: "ITEM_UPDATE", itemId: 2, name: "unitPrice", value: "22.25" });
      state = reducer(state, { type: "COST_UPDATE", name: "taxes", value: "24.63" });
      state = reducer(state, { type: "COST_UPDATE", name: "shipping", value: "25.26" });

      expect(initState.total).toEqual(0);
      expect(state.total).toEqual(460.34);
    });

    //  Really throw the kitchen sink at it
    it('should update totals when item changes', () => {
      let state = initState;

      state = reducer(state, { type: "ITEM_UPDATE", itemId: 1, name: "quantity", value: "10" });
      state = reducer(state, { type: "ITEM_UPDATE", itemId: 1, name: "unitPrice", value: "16.57" });
      state = reducer(state, { type: "ITEM_ADD" });
      state = reducer(state, { type: "ITEM_UPDATE", itemId: 2, name: "quantity", value: "11" });
      state = reducer(state, { type: "ITEM_UPDATE", itemId: 2, name: "unitPrice", value: "22.25" });
      state = reducer(state, { type: "COST_UPDATE", name: "taxes", value: "24.63" });
      state = reducer(state, { type: "COST_UPDATE", name: "shipping", value: "25.26" });
      state = reducer(state, { type: "ITEM_ADD" });
      state = reducer(state, { type: "ITEM_UPDATE", itemId: 3, name: "quantity", value: "12" });
      state = reducer(state, { type: "ITEM_UPDATE", itemId: 3, name: "unitPrice", value: "12.65" });

      expect(initState.total).toEqual(0);
      expect(state.total).toEqual(612.14);
    });
  });
})