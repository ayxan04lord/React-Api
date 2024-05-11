import React from 'react';

const TransactionForm = ({ transaction, handleSubmit, handleChange, buttonText }) => {
    return (
        <div className="plusLi">
            <ul className="plusLi-ul">
                <li className="plusLi-li">
                    <input type="text" id="from" name="from" placeholder="From" value={transaction.from} onChange={handleChange} />
                </li>
                <li><input type="text" id="to" name="to" placeholder="to" value={transaction.to} onChange={handleChange} /></li>
                <li>
                    <input type="text" id="amount" name="amount" placeholder="amount" value={transaction.amount} onChange={handleChange} />
                </li>
            </ul>
            <div className="plus" onClick={handleSubmit}>{buttonText}</div>
        </div>
    );
};

export default TransactionForm;
