export default {
    PRODUCTS(state) {
        return state.products; //реактивно получает данные из массива products: [], который в state
    },
    CART(state) {
        return state.cart;
    }    
}