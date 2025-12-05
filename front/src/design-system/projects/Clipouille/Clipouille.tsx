import './style.scss';

import { useEffect, useRef, useState } from 'react'
import '@atoms/project_template/style.scss'

import SendIcon from '../../../assets/clipouille/send.svg'

type Message = {
	role: 'user' | 'model' | 'error'
	parts: [{
		text: string
	}]
}

export const Clipouille = () => {
	const [messages, setMessages] = useState<Message[]>([
		{ role: "model", parts: [{ text: "Ceci est un test" }] },
	])
	const [input, setInput] = useState('')
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

	const sendMessage = async () => {
		if (isThinking) return shakeInputError();
		const text = input.trim()
		if (!text) return shakeInputError();

		const userMsg: Message = { role: 'user', parts: [{ text: text }] }
		setMessages((prev) => [...prev, userMsg])
		setInput('')
		setIsThinking(true)

		const historyToSend = [...messages, userMsg];

		const response = await fetch("/api/chatbot/message", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ history: historyToSend })
		});

		const data = await response.json();

		if (response.status !== 200) {
			const reply: Message = {
				role: 'error',
				parts: [{ text: `Une erreur s'est produite : ${data.error}` }]
			}
			setMessages((prev) => [...prev, reply])
			setIsThinking(false)
			return ;
		}

		setMessages(data.history);
		setIsThinking(false);
	}

	return (
		<div className="clipouille">
			<div className="messages-box">
				{messages.map((m, i) => (
					<div key={i} className={`message ${m.role}`}>
						{m.parts[0].text}
					</div>
				))}
					{isThinking && (
						<div className={`message model typing`} aria-hidden>
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
