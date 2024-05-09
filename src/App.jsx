import React, { useState, useEffect } from 'react';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';
import './App.css';

function App() {
    const [transactions, setTransactions] = useState([]);
    const [transaction, setTransaction] = useState({ from: '', to: '', amount: '' });
    const [editId, setEditId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = () => {
        fetch("https://acb-api.algoritmika.org/api/transaction")
            .then(res => res.json())
            .then(data => setTransactions(data));
    }

    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    }

    const handleAddTransaction = () => {
        fetch(`https://acb-api.algoritmika.org/api/transaction`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(transaction)
        }).then(() => {
            fetchTransactions();
            setTransaction({ from: '', to: '', amount: '' });
            setShowAddForm(false);
        });
    }

    const handleEditTransaction = () => {
        fetch(`https://acb-api.algoritmika.org/api/transaction/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(transaction)
        }).then(() => {
            fetchTransactions();
            setEditId(null);
            setTransaction({ from: '', to: '', amount: '' });
            setShowEditForm(false);
        });
    }

    const handleEdit = (transaction) => {
        setEditId(transaction.id);
        setTransaction({ from: transaction.from, to: transaction.to, amount: transaction.amount });
        setShowEditForm(true);
        setShowAddForm(false);
    }

    const handleDelete = (id) => {
        fetch(`https://acb-api.algoritmika.org/api/transaction/${id}`, {
            method: "DELETE"
        }).then(() => {
            fetchTransactions();
        });
    }

    return (
        <div className="container">
            <div className="heading">
                <h1>Transaction</h1>
            </div>
            <TransactionList transactions={transactions} handleEdit={handleEdit} handleDelete={handleDelete} />
            <div className="addBtn">
                <button onClick={() => { setShowAddForm(!showAddForm); setShowEditForm(false); setTransaction({ from: '', to: '', amount: '' }); }}>Add +</button>
            </div>
            {(showAddForm || showEditForm) &&
                <TransactionForm
                    transaction={transaction}
                    handleSubmit={showEditForm ? handleEditTransaction : handleAddTransaction}
                    handleChange={handleChange}
                    buttonText={showEditForm ? 'Save' : '+'}
                />
            }
        </div>
    );
}

export default App;
