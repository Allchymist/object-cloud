import { useState } from 'react'

import { api } from '../../../services/api'

export function RegisterForm(){

	const [name, setName] = useState('');
  const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.]).{8,}$/g;

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault()

		if(!name || !email || !password || !username) {
			setMessage('Você não informou todos os dados.');

			return setTimeout(() => setMessage(''), 2000);
		}

		if(password !== confirmPassword) {
			setMessage('As senhas não conferem.');

			return setTimeout(() => setMessage(''), 2000);
		}

		api.post('/account/register', {
			name,
			username,
			email,
			password
		}).then(response => {
			console.log(response)        
		}).catch(err => {
			const { error } = err.response.data
			alert(error)
		})
	}

	return (
			<div >
				<form onSubmit={handleSubmit} className='Form'>
					<label>
						Nome:
						<input 
							placeholder='Digite seu nome completo'
							type="text" 
							name="name"
							value={name} 
							onChange={e => {
								setName(e.target.value);
							}} 
						/>
					</label>
					<br />
					<label>
						Apelido:
						<input 
							placeholder='Digite seu nome de usuário'
							type="text" 
							name="username"
							value={username} 
							onChange={e => {
								setUsername(e.target.value);
							}} 
						/>
					</label>
					<br />
					<label>
						E-mail:
						<input 
							placeholder='Digite seu e-mail'
							type="email" 
							name="e-mail"
							value={email} 
							onChange={e => {
								setEmail(e.target.value);
							}}
						/>
					</label>
					<br />
					<label>
						Senha:
						<input 
							placeholder='Digite sua nova senha'
							type="password" 
							name="password" 
							value={password} 
							onChange={e => {
								setPassword(e.target.value);
							}}
						/>
					</label>
					<br />
					<label>
						Confirme sua senha:
						<input
							placeholder='Digite sua senha novamente'
							type="password" 
							name="confirmPassword" 
							value={confirmPassword} 
							onChange={e => {
								setConfirmPassword(e.target.value);
							}}
						/>
					</label>
					<button type="submit">Cadastrar</button>
					<div className='Register'> Já tem a conta? <a href="/login">Entrar</a></div>
				</form>
			</div>
	)
}