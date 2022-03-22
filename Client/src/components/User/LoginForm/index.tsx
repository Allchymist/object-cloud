import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdLogIn } from 'react-icons/io'

import { AuthContext } from '../../../contexts/Auth/AuthContext'
import Container from './styles';

interface IMessage {
  data?: string;
  type?: string;
  warn: boolean;
}

export function LoginForm() {

  const [ Login, setLogin ] = useState('')
  const [ password, setPassword ] = useState('')
	const [ message, setMessage ] = useState({ warn: false } as IMessage)
  const { signIn } = useContext(AuthContext)
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    if(!Login) {
			setMessage({
				data: 'Você precisa digitar seu usuário.',
				type: 'error',
				warn: true
			});

			return setTimeout(() => setMessage({ warn: false }), 2000);
		}

		if (!password) {
			setMessage({
				data: 'Você precisa digitar sua senha.',
				type: 'error',
				warn: true
			});
			
			return setTimeout(() => setMessage({ warn: false }), 2000);
		}

		setMessage({
			data: 'Logando...',
			type: 'load',
			warn: true
		});
    
		signIn(Login, password).then((response) => {
			setMessage({
				data: 'Logado com sucesso.',
				type: 'sucess',
				warn: true
			});

			navigate('/')
		}).catch((err) => {
			const { error } = err.response.data;
			setMessage({
				data: error,
				type: 'error',
				warn: true
			});
		});
  }

	return (
		<Container>
			<div>
				<form onSubmit={handleSubmit} className='Form'>
					<>{message.warn ?
						<label> 
							<div className={
								message.type === 'sucess' ? 'Sucess' :
								message.type === 'error' ? 'Warn' : 'Load'
							}> {message.data}
							</div>
						<br />
						</label>
				: null }</>
				<label>
					Usuário:
					<input 
						placeholder='Digite seu nome de usuário ou e-mail'
						type="text" 
						name="username"
						onChange={e => setLogin(e.target.value)} />
				</label>
				<br />
				<label>
				Senha:
					<input 
						placeholder='Digite sua senha'
						type="password" 
						name="password" 
						onChange={e => setPassword(e.target.value)}/>
				</label>
					<button type="submit"><IoMdLogIn size ="18"/> Entrar</button>
					<div className='Register'>
						<a href="/register">Criar uma nova conta</a>{` | `}<a href="/forgot-password">Esqueci a senha</a>
					</div>
				</form>
			</div>
		</Container>
	)
}