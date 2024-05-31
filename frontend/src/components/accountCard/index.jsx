import { faChevronRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import "./accountCard.css";
import { Link } from "react-router-dom";
library.add(faChevronRight, faClose);

export default function AccountCard(props) {
  const { account, isHomeProfile } = props;
  if (isHomeProfile) {
    return (
      <Link className="account" to={"/profile/" + account.accountId}>
        <div className="account-content-wrapper">
          <h3 className="account-title">
            {account.accountName} ({account.accountNumber})
          </h3>
          <p className="account-amount">{account.amount}</p>
          <p className="account-amount-description">
            {account.amountDescription}
          </p>
        </div>
        <div className="account-content-wrapper cta">
          <FontAwesomeIcon
            icon={faChevronRight}
            size="2xl"
            className="account-content-icon"
          />
        </div>
      </Link>
    );
  } else {
    return (
      <div className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">
            {account.accountName} ({account.accountNumber})
          </h3>
          <p className="account-amount">{account.amount}</p>
          <p className="account-amount-description">
            {account.amountDescription}
          </p>
        </div>
        <div className="account-content-wrapper cta">
          <Link to="/profile" className="account-content-close">
            <FontAwesomeIcon
              icon={faClose}
              size="2xl"
              className="account-content-icon"
            />
          </Link>
        </div>
      </div>
    );
  }
}
