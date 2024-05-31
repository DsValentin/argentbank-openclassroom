import React, { useState } from "react";
import AccountCard from "../../components/accountCard";
import accountsList from "../../assets/datas/accounts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronDown,
  faChevronUp,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import "./showAccount.css";
import { useSelector } from "react-redux";

library.add(faChevronDown, faChevronUp, faPen);

export default function ShowAccount() {
  const accountId = useParams().accountId;
  const accounts = accountsList.accounts;
  const account = accounts.find((account) => account.accountId === accountId);
  const transactionCategories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Home",
    "Leisure",
    "Other",
  ];
  const connected = useSelector((state) => state.token);

  const [modifiedTransactions, setModifiedTransactions] = useState(
    account.transactions
  );

  const handleCategoryChange = (index, category) => {
    const updatedTransactions = [...modifiedTransactions];
    updatedTransactions[index].category = category;
    setModifiedTransactions(updatedTransactions);
  };

  const handleNoteChange = (index, note) => {
    const updatedTransactions = [...modifiedTransactions];
    updatedTransactions[index].note = note;
    setModifiedTransactions(updatedTransactions);
  };

  if (!connected) {
    window.location.href = "/login";
    return null; // ou un composant de chargement par exemple
  }

  return (
    <>
      <AccountCard account={account} />
      <div className="transaction">
        <div className="tableHeader">
          <div className="tableContainerGlobal">
            <div className="tableContainer1-2">
              <div className="tableColumn1">Date</div>
              <div className="tableColumn2">Description</div>
            </div>
            <div className="tableContainer3-4">
              <div className="tableColumn3">Amount</div>
              <div className="tableColumn4">Balance</div>
            </div>
          </div>
          <div className="tableColumn5" />
        </div>
        <div className="tableBody">
          {modifiedTransactions.map((transaction, index) => (
            <details key={index} className="table-row-body">
              <summary>
                <div className="tableContainerGlobal">
                  <div className="tableContainer1-2">
                    <p className="tableColumn1">{transaction.date}</p>
                    <p className="tableColumn2">{transaction.description}</p>
                  </div>
                  <div className="tableContainer3-4">
                    <p className="tableColumn3">{"$" + transaction.amount}</p>
                    <p className="tableColumn4">{account.amount}</p>
                  </div>
                </div>
                <div className="tableColumn5">
                  <FontAwesomeIcon icon="chevron-down" />
                </div>
              </summary>
              <div className="table-row-details">
                <div className="tableTransactionInfos">
                  <p className="tableColumn1">Transaction Type</p>
                  <p className="tableColumn2">{transaction.transactionType}</p>
                </div>
                <div className="tableTransactionInfos">
                  <p className="tableColumn1">Category</p>
                  <select
                    className="tableColumn2"
                    value={transaction.category}
                    onChange={(e) =>
                      handleCategoryChange(index, e.target.value)
                    }
                  >
                    {transactionCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon icon={faPen} />
                </div>
                <div className="tableTransactionInfos">
                  <p className="tableColumn1">Note</p>
                  <input
                    type="text"
                    className="tableColumn2"
                    value={transaction.note}
                    onChange={(e) => handleNoteChange(index, e.target.value)}
                  />
                  <FontAwesomeIcon icon={faPen} />
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
