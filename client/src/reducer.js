export const initialState = {
    basket: [],
};

export const getBasketTotal = (basket) => basket?.reduce((amount, item) => parseFloat(item.price) + amount, 0);

export const isBasketEmpty = (basket) => {
    return basket.length === 0;
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1);
            }
            return {...state, basket: newBasket}

        default:
            return state;

            case 'CLEAR_BASKET':
                return {
                    ...state,
                    basket: [] // Reset the basket to an empty array
                };
    }
}

export default reducer;