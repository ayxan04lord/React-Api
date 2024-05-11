// redux/actions.js
import axios from 'axios';

export const fetchTransactions = () => dispatch => {
    axios.get("https://acb-api.algoritmika.org/api/transaction")
        .then(res => {
            dispatch({
                type: 'FETCH_TRANSACTIONS',
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
        });
};

export const addTransaction = (transaction) => dispatch => {
    return axios.post("https://acb-api.algoritmika.org/api/transaction", transaction)
        .then(res => {
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
        });
};


export const editTransaction = (id, transaction) => dispatch => {
    return axios.put(`https://acb-api.algoritmika.org/api/transaction/${id}`, transaction)
        .then(() => {
            dispatch({
                type: 'EDIT_TRANSACTION',
                payload: transaction
            });
        })
        .catch(err => {
            console.log(err);
        });
};

export const deleteTransaction = (id) => dispatch => {
    return axios.delete(`https://acb-api.algoritmika.org/api/transaction/${id}`)
        .then(() => {
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        })
        .catch(err => {
            console.log(err);
        });
};


export const setEditId = (id) => {
    return {
        type: 'SET_EDIT_ID',
        payload: id
    };
};

export const resetEditId = () => {
    return {
        type: 'RESET_EDIT_ID'
    };
};

export const toggleAddForm = () => {
    return {
        type: 'TOGGLE_ADD_FORM'
    };
};

export const toggleEditForm = () => {
    return {
        type: 'TOGGLE_EDIT_FORM'
    };
};
