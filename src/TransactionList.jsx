import React from 'react';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions, handleEdit, handleDelete }) => {
    return (
        <div className="list">
            <ul>
                {transactions.map(transaction => (
                    <TransactionItem key={transaction.id} transaction={transaction} handleEdit={handleEdit} handleDelete={handleDelete} />
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
