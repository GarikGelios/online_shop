import Axios from 'axios'

export default {
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
    }
}