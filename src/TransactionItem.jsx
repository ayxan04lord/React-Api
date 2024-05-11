import React from 'react';

const TransactionItem = ({ transaction, handleEdit, handleDelete }) => {
    return (
        <li className="newLi">
            <div className="divSec">
                <span>From {transaction.from}</span>
                <span> to {transaction.to}</span>
                <span> {transaction.amount}$</span>
            </div>
            <div className="divThird">
                <button className="buttonEdit" onClick={() => handleEdit(transaction)}>!</button>
                <button className="buttonDelete" onClick={() => handleDelete(transaction.id)}>x</button>
            </div>
        </li>
    );
};

export default TransactionItem;
