export default {
    PRODUCTS(state) {
        return state.products; //реактивно получает данные из массива products: [], который в state
    },
    CART(state) {
        return state.cart;
    },
    WINDOW_TYPE(state) {
        return state.windowSize;
    },
    SEARCH_VALUE(state) {
        return state.searchValue
    }
}