import './style.scss';

import { useEffect, useRef, useState } from 'react'
import '@atoms/project_template/style.scss'

import SendIcon from '../../../assets/clipouille/send.svg'

type Message = {
	role: 'user' | 'model' | 'tool' | 'error'
	parts: [{
		text?: string
		functionResponse?: {
			name: string
			response: {
				content: string
			}
		}
	}]
}

export const Clipouille = () => {
	const [messages, setMessages] = useState<Message[]>([
		// { role: 'tool', parts: [{ functionResponse: { name: "test", response: { content: "result" } } }] }
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
				{messages.map((m, i) => {
					const part = m.parts[0];
					console.log(part)
					if (!part.functionResponse && !part.text) return ;
					return (
						<div key={i} className={`message ${m.role}`}>
							{part.functionResponse ? (
								<div className="function-response" role="group" aria-label={`function response ${part.functionResponse.name}`}>
									<div className="fr-header">{part.functionResponse.name}</div>
									<pre className="fr-content">{part.functionResponse.response.content}</pre>
								</div>
							) : (
								<span>{part.text}</span>
							)}
						</div>
					)
				})}
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
