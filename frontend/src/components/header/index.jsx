import "./header.css";
import logo from "../../assets/imgs/argentBankLogo.webp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUserData, signOut } from "../../store";

export default function Header() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.status === 200) {
          dispatch(setUserData(data.body));
        } else {
          dispatch(signOut());
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations utilisateur",
          error
        );
      }
    }

    if (token && !userData) {
      getUserInfo();
    }
  }, [token, userData, dispatch]); // Ajout de 'dispatch' comme dépendance

  const isConnected = !!token;

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
      </a>
      <div className="main-nav-utility">
        {isConnected ? (
          <>
            <a className="main-nav-item" href="/profile">
              <p>
                {userData?.userName ||
                  "Échec de la récupération du nom d'utilisateur"}
              </p>
              <i className="fa fa-user-circle fa-2xl"></i>
            </a>
            <a className="main-nav-item" href="/profile">
              <i className="fa fa-gear fa-2xl"></i>
            </a>
            <a
              className="main-nav-item"
              onClick={() => dispatch(signOut())}
              href="/login"
            >
              <i className="fa fa-power-off fa-2xl"></i>
            </a>
          </>
        ) : (
          <a className="main-nav-item" href="/login">
            <i className="fa fa-user-circle"></i>
            Se connecter
          </a>
        )}
      </div>
    </nav>
  );
}
