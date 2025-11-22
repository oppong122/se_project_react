import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  closeActiveModal,
  onRegister,
  isOpen,
  onLoginSwitch,
}) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isDisabled =
    name.trim() === "" ||
    avatar.trim() === "" ||
    email.trim() === "" ||
    password.trim() === "";

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password }).then(() => {
      setName("");
      setAvatar("");
      setEmail("");
      setPassword("");
    });
  };

  return (
    <ModalWithForm
      buttonText="Sign up"
      title="Create account"
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
      secodaryButton={
        <button className="rendered_button" onClick={onLoginSwitch}>
          or Log In
        </button>
      }
    >
      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          placeholder="name"
          id="register-name"
          value={name}
          required
          minLength="2"
          maxLength="30"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar
        <input
          type="URL"
          className="modal__input"
          id="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>

      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="nana0249122@gmail.com"
          required
          id="register-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          required
          minLength="7"
          id="register-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
