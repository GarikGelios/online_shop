export default {
    SET_PRODUCTS_TO_STATE: (state, products) => {
        state.products = products;
    },
    SET_CART: (state, product) => { //принимает обект из экшена, когда нажали кнопку и добавляет его в массив cart: [] 
        if (state.cart.length) {
            let isProductExists = false;
            state.cart.map(function(item) {
                if (item.article === product.article) {
                    isProductExists = true;
                    item.quantity++
                }
            })
            if (!isProductExists) {
                state.cart.push({ ...product, quantity: 1 })
            }
        } else {
            state.cart.push({ ...product, quantity: 1 })
        }
    },
    REMOVE_FROM_CART: (state, index) => {
        state.cart.splice(index, 1)
    },
    DECREMENT(state, index) {
        if (state.cart[index].quantity > 1) {
            state.cart[index].quantity--
        }
    },
    INCREMENT(state, index) {
        state.cart[index].quantity++
    },
    CHANGE_WINDOW_SIZE(state, size) {
        state.windowSize = size;
    },
    SET_SEARCH_VALUE(state, value) {
        state.searchValue = value
    }
}