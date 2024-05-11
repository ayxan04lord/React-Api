import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';
import { fetchTransactions, addTransaction, editTransaction, deleteTransaction, setEditId, resetEditId, toggleAddForm, toggleEditForm } from './redux/actions';
import './App.css';

const App = () => {
    const dispatch = useDispatch();

    const transactions = useSelector(state => state.transactions);
    const transaction = useSelector(state => state.transaction);
    const editId = useSelector(state => state.editId);
    const showAddForm = useSelector(state => state.showAddForm);
    const showEditForm = useSelector(state => state.showEditForm);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const handleChange = (e) => {
        dispatch({
            type: 'SET_TRANSACTION',
            payload: { field: e.target.name, value: e.target.value }
        });
    };

    const handleAddTransaction = () => {
        dispatch(addTransaction(transaction))
            .then(() => {
                dispatch(resetEditId());
                dispatch(toggleAddForm(false));
                dispatch({ type: 'RESET_TRANSACTION' }); 
            })
            .then(() => dispatch(fetchTransactions())); 
    };


    const handleEditTransaction = () => {
        dispatch(editTransaction(editId, transaction))
            .then(() => dispatch(fetchTransactions())) 
            .then(() => dispatch(toggleEditForm(false))); 
    };

    const handleEdit = (transaction) => {
        dispatch(setEditId(transaction.id));
        dispatch({
            type: 'SET_TRANSACTION',
            payload: { field: 'from', value: transaction.from }
        });
        dispatch({
            type: 'SET_TRANSACTION',
            payload: { field: 'to', value: transaction.to }
        });
        dispatch({
            type: 'SET_TRANSACTION',
            payload: { field: 'amount', value: transaction.amount }
        });
        dispatch(toggleEditForm(true));
    };

    const handleDelete = (id) => {
        dispatch(deleteTransaction(id))
            .then(() => dispatch(fetchTransactions())); 
    };

    return (
        <div className="container">
            <div className="heading">
                <h1>Transaction</h1>
            </div>
            <TransactionList transactions={transactions} handleEdit={handleEdit} handleDelete={handleDelete} />
            <div className="addBtn">
                <button onClick={() => { dispatch(toggleAddForm(true)); dispatch(resetEditId()); }}>Add +</button>
            </div>
            {(showAddForm || showEditForm) &&
                <TransactionForm
                    transaction={transaction}
                    handleChange={handleChange}
                    handleSubmit={showEditForm ? handleEditTransaction : handleAddTransaction}
                    buttonText={showEditForm ? 'Save' : '+'}
                />
            }
        </div>
    );
};

export default App;
