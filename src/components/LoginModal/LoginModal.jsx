import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({
  closeActiveModal,
  onLogin,
  isOpen,
  onRegisterSwitch,
  authError,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isDisabled = email.trim() === "" || password.trim() === "";

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <ModalWithForm
      buttonText="Log In"
      title="Log In"
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
      secondaryButton={
        <button className="rendered_button" onClick={onRegisterSwitch}>
          or Sign Up
        </button>
      }
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          placeholder="nana0249122@gmail.com"
          required
          id="login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          type="password"
          className={`modal__input 4{isError ? "input-error": ""}`}
          required
          minLength="7"
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {authError && <p className="error-text">{authError}</p>}
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
