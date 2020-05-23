export default {
    ADD_TO_CART({commit}, product) { //функция реагирует на нажатие кнопки @click="addToCart" и отправляет на мутацию обект
        commit('SET_CART', product)
    },

    DECREMENT_CART_ITEM({commit}, index) {
        commit('DECREMENT', index)
    },

    INCREMENT_CART_ITEM({commit}, index) {
        commit('INCREMENT', index)
    },
    
    DELETE_FROM_CART({commit}, index) {
        commit('REMOVE_FROM_CART', index)
    }    
}