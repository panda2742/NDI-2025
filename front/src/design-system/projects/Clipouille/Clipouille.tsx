import './style.scss';

import { useEffect, useRef, useState } from 'react'
import '@atoms/project_template/style.scss'

import SendIcon from '../../../assets/clipouille/send.svg'

type Message = {
	id: number
	sender: 'user' | 'assistant'
	text: string
}

export const Clipouille = () => {
	const [messages, setMessages] = useState<Message[]>([
		{ id: 1, sender: 'assistant', text: "Bonjour ! Je suis ton assistant virtuel. Envoie un message pour commencer la discussion." },
	])
	const [input, setInput] = useState('')
	const nextId = useRef(2)
	const endRef = useRef<HTMLDivElement | null>(null)
	const [isThinking, setIsThinking] = useState(false)
	const [isInputShaking, setIsInputShaking] = useState(false)

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	const shakeInputError = () => {
		setIsInputShaking(true);
		setTimeout(() => {	
			setIsInputShaking(false);
		}, 200);
	}

	const sendMessage = () => {
		if (isThinking) return shakeInputError();
		const text = input.trim()
		if (!text) return shakeInputError();

		const userMsg: Message = { id: nextId.current++, sender: 'user', text }
		setMessages((prev) => [...prev, userMsg])
		setInput('')
		setIsThinking(true)

		setTimeout(() => {
			const reply: Message = {
				id: nextId.current++,
				sender: 'assistant',
				text: `Réponse fixe de l'assistant : j'ai reçu "${text}".`,
			}
			setMessages((prev) => [...prev, reply])
			setIsThinking(false)
		}, 800)
	}

	return (
		<div className="clipouille">
			<div className="messages-box">
				{messages.map((m) => (
					<div key={m.id} className={`message ${m.sender}`}>
						{m.text}
					</div>
				))}
					{isThinking && (
						<div className={`message assistant typing`} aria-hidden>
							<span className="typing-dot"/>
							<span className="typing-dot"/>
							<span className="typing-dot"/>
						</div>
					)}
				<div ref={endRef} />
			</div>

			<form
				className={`composer ${isInputShaking ? 'error' : ''}`}
				onSubmit={(e) => {
					e.preventDefault()
					sendMessage()
				}}
			>
				<input
					className="composer-input"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Écrire un message..."
				/>
				<button className="composer-send" type="submit">
					<img src={SendIcon} alt="send" />
				</button>
			</form>
		</div>
	)
}
