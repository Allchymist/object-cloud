import { useState } from "react";

import api from "../../../services/api";

const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)*$/i;

export function ForgotPasswordForm() {

  const [ email, setEmail ] = useState('');
  const [ message, setMessage ] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email) return setMessage('Você não inseriu um email.');

    setMessage('Enviando de recuperação...');

    api.post('/account/forgot-password', {
      email
    }).then((response) => {
      setMessage(response.data.message);
    }).catch((err) => {
      const { error } = err.response.data;
      console.log(error);
      setMessage(error);
    });
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className='Form'>
          <label>
            Recuperação de senha:
            <input
              placeholder="Digite seu email cadastrado"
              type="text"
              name="email"
              onChange={e => {
                setEmail(e.target.value);

                if (e.target.value && !regex.test(e.target.value)) return setMessage('Email inválido.');
                }} 
              />
          </label>
          <br />
          <button type="submit">Enviar</button>
          <div className={'Forgot'}>
            <a href="/register">Criar uma nova conta</a>{`  |  `}<a href="/login">Lembrou a senha?</a>
          </div>
        </form>
      </div>
    </>
  )
}