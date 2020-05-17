import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex); //указал Vue использовать Vuex

let store = new Vuex.Store({
    state: { //хранилище данных
        products: [], //пустой массив, в него будем передавать данные
        cart: [] 
    }, 
    mutations: { //синхронные функции изменяющие store
        SET_PRODUCTS_TO_STATE: (state, products) => {
            state.products = products;
        },
        SET_CART: (state, product) => { //принимает обект из экшена, когда нажали кнопку и добавляет его в массив cart: [] 
            state.cart.push(product)
        }
    }, 
    actions: { //асинфронные функции
        GET_PRODUCTS_FROM_API({commit}) {
            const url = 'http://localhost:3000/products';
            return Axios(url, {
                method: 'GET'
            })
            .then((products) => {
                commit('SET_PRODUCTS_TO_STATE', products.data);
                return products;
            })
            .catch((error) => { //если вдруг ошибка
                console.log(error);
                return error;
            })
        },
        ADD_TO_CART({commit}, product) { //функция реагирует на нажатие кнопки @click="addToCart" и отправляет на мутацию обект
            commit('SET_CART', product)
        }
    }, 
    getters: { //короткий путь до данных в state
        PRODUCTS(state) {
            return state.products; //реактивно получает данные из массива products: [], который в state
        },
        CART(state) {
            return state.cart;
        }
    } 

});

export default store; //экспортируем, чтобы потом импортировать его в main.js