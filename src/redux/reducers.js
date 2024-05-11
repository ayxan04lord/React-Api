import { combineReducers } from 'redux';

const initialState = {
  transactions: [],
  transaction: { from: '', to: '', amount: '' },
  editId: null,
  showAddForm: false,
  showEditForm: false
};

const transactionsReducer = (state = initialState.transactions, action) => {
  switch (action.type) {
    case 'FETCH_TRANSACTIONS':
      return action.payload;
    case 'ADD_TRANSACTION':
      return [...state, action.payload];
    case 'EDIT_TRANSACTION':
      return state.map(transaction => (transaction.id === action.payload.id ? action.payload : transaction));
    case 'DELETE_TRANSACTION':
      return state.filter(transaction => transaction.id !== action.payload);
    default:
      return state;
  }
};

const transactionReducer = (state = initialState.transaction, action) => {
  switch (action.type) {
    case 'SET_TRANSACTION':
      return { ...state, [action.payload.field]: action.payload.value };
    default:
      return state;
  }
};

const editIdReducer = (state = initialState.editId, action) => {
  switch (action.type) {
    case 'SET_EDIT_ID':
      return action.payload;
    case 'RESET_EDIT_ID':
      return initialState.editId;
    default:
      return state;
  }
};

const showAddFormReducer = (state = initialState.showAddForm, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_FORM':
      return !state;
    case 'TOGGLE_EDIT_FORM':
      return false;
    default:
      return state;
  }
};

const showEditFormReducer = (state = initialState.showEditForm, action) => {
  switch (action.type) {
    case 'TOGGLE_EDIT_FORM':
      return !state;
    case 'TOGGLE_ADD_FORM':
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  transactions: transactionsReducer,
  transaction: transactionReducer,
  editId: editIdReducer,
  showAddForm: showAddFormReducer,
  showEditForm: showEditFormReducer
});
