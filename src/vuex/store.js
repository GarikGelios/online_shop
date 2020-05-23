import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations/mutations'
import commonActions from './actions/actions'
import apiRequest from './actions/api-request'
import getters from './getters/getters'

const actions = {...commonActions, ...apiRequest}

Vue.use(Vuex); //указал Vue использовать Vuex

let store = new Vuex.Store({
    state: { //хранилище данных
        products: [], //пустой массив, в него будем передавать данные
        cart: [] 
    }, 
    mutations, //синхронные функции изменяющие store 
    actions, //асинфронные функции
    getters //короткий путь до данных в state
        

});

export default store; //экспортируем, чтобы потом импортировать его в main.js