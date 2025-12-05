import { useMemo, useState, useRef, useEffect } from 'react'
import '@atoms/project_template/style.scss'
import './style.scss'
import { Idea, FormData } from './types'
import { Intro } from './Intro'


export const NirdProject = () => {
	const [selections, setSelections] = useState<Record<string, string>>({})
	const items: FormData[] = useMemo(() => [
		{
			question: "Ton école utilise principalement...",
			answers: [
				{
					text: "Windows 7",
					value: "w7",
					name: "q1",
					ancientScore: 2,
					sovereignScore: 2
				},
				{
					text: "Windows 10",
					value: "w10",
					name: "q1",
					ancientScore: 1,
					sovereignScore: 2
				},
				{
					text: "Windows 11",
					value: "w11",
					name: "q1",
					ancientScore: 0,
					sovereignScore: 2
				},
				{
					text: "MacOS",
					value: "mac",
					name: "q1",
					ancientScore: 1,
					sovereignScore: 1
				},
				{
					text: "Distribution Linux",
					value: "linux",
					name: "q1",
					ancientScore: 0,
					sovereignScore: 0
				},
				{
					text: "Autre",
					value: "other",
					name: "q1",
					ancientScore: 1,
					sovereignScore: 1
				}
			]
		},
		{
			question: "La plupart des ordinateurs ont...",
			answers: [
				{
					text: "Moins de 3 ans",
					value: "r1",
					name: "q2",
					ancientScore: 0,
					sovereignScore: 0
				},
				{
					text: "3-7 ans",
					value: "r2",
					name: "q2",
					ancientScore: 1,
					sovereignScore: 0
				},
				{
					text: "8 ans ou +",
					value: "r3",
					name: "q2",
					ancientScore: 2,
					sovereignScore: 0
				},
				{
					text: "Je ne sais pas, mais ils sont vieux !",
					value: "r4",
					name: "q2",
					ancientScore: 2,
					sovereignScore: 0
				}
			]
		},
		{
			question: "Les logiciels utilisés par ton établissement appartiennent à :",
			answers: [
				{
					text: "Microsoft (Office 365, Word, Excel, PowerPoint, OneNote, Outlook, OneDrive, Teams)",
					value: "s1",
					name: "q3",
					ancientScore: 1,
					sovereignScore: 2
				},
				{
					text: "Google (Workspace for Education, Gmail, Google Drive, Google Docs, Google Sheets, Google Slides, Classroom, Meet)",
					value: "s2",
					name: "q3",
					ancientScore: 1,
					sovereignScore: 2
				},
				{
					text: "Apple (iCloud, Pages, Numbers, Keynote, iCloud Drive)",
					value: "s3",
					name: "q3",
					ancientScore: 1,
					sovereignScore: 2
				},
				{
					text: "Personne, ils sont libres (LibreOffice, OnlyOffice, ownCloud, Nextcloud, Gimp)",
					value: "s4",
					name: "q3",
					ancientScore: 0,
					sovereignScore: 0
				},
				{
					text: "Je ne sais pas",
					value: "s5",
					name: "q3",
					ancientScore: 1,
					sovereignScore: 1
				}
			]
		},
		{
			question: "Le parc informatique comprend surtout :",
			answers: [
				{
					text: "Des ordinateurs de bureau",
					value: "t1",
					name: "q4",
					ancientScore: 2,
					sovereignScore: 0
				},
				{
					text: "Des ordinateurs portables",
					value: "t2",
					name: "q4",
					ancientScore: 1,
					sovereignScore: 0
				},
				{
					text: "Des tablettes",
					value: "t3",
					name: "q4",
					ancientScore: 1,
					sovereignScore: 0
				},
				{
					text: "Un mélange de tout ça",
					value: "t4",
					name: "q4",
					ancientScore: 1,
					sovereignScore: 0
				},
			]
		},
		{
			question: "Le wifi de ton établissement est :",
			answers: [
				{
					text: "Ouvert à tous, sans mot de passe",
					value: "u1",
					name: "q5",
					ancientScore: 2,
					sovereignScore: 0
				},
				{
					text: "Protégé par un mot de passe partagé à toute l'école",
					value: "u2",
					name: "q5",
					ancientScore: 1,
					sovereignScore: 0
				},
				{
					text: "Chaque utilisateur a son propre identifiant et mot de passe",
					value: "u3",
					name: "q5",
					ancientScore: 0,
					sovereignScore: 0
				},
				{
					text: "Il n'y a pas de wifi dans mon établissement",
					value: "u5",
					name: "q5",
					ancientScore: 1,
					sovereignScore: 0
				},
				{
					text: "Les élèves n'y ont pas accès",
					value: "u6",
					name: "q5",
					ancientScore: 0,
					sovereignScore: 0
				},
				{
					text: "Je ne sais pas",
					value: "u4",
					name: "q5",
					ancientScore: 1,
					sovereignScore: 0
				}
			]
		},
		{
			question: "Qui gère le parc informatique de ton établissement ?",
			answers: [
				{
					text: "Un prestataire externe",
					value: "v1",
					name: "q6",
					ancientScore: 2,
					sovereignScore: 1
				},
				{
					text: "Un technicien informatique interne",
					value: "v2",
					name: "q6",
					ancientScore: 0,
					sovereignScore: 0
				},
				{
					text: "Un enseignant ou un membre du personnel administratif",
					value: "v3",
					name: "q6",
					ancientScore: 1,
					sovereignScore: 0
				},
				{
					text: "Personne, c'est le bazar !",
					value: "v4",
					name: "q6",
					ancientScore: 2,
					sovereignScore: 0
				}
			]
		}
	], []);

	const totals = useMemo(() => {
		let ancient = 0
		let sovereign = 0
		let answeredCount = 0

		let maxAncient = 0
		let maxSovereign = 0

		items.forEach(item => {
			let qMaxAncient = 0
			let qMaxSovereign = 0
			item.answers.forEach(a => {
				if (a.ancientScore > qMaxAncient) qMaxAncient = a.ancientScore
				if (a.sovereignScore > qMaxSovereign) qMaxSovereign = a.sovereignScore
			})
			maxAncient += qMaxAncient
			maxSovereign += qMaxSovereign

			const sel = selections[item.answers[0].name]
			if (!sel) return
			const found = item.answers.find(a => a.value === sel)
			if (!found) return
			ancient += found.ancientScore
			sovereign += found.sovereignScore
			answeredCount += 1
		})

		const percentBadAncient = maxAncient === 0 ? 0 : Math.round((ancient / maxAncient) * 1000) / 10 // one decimal
		const percentBadSovereign = maxSovereign === 0 ? 0 : Math.round((sovereign / maxSovereign) * 1000) / 10 // one decimal
		const percentGoodAncient = Math.round((100 - percentBadAncient) * 10) / 10
		const percentGoodSovereign = Math.round((100 - percentBadSovereign) * 10) / 10

		return {
			ancient,
			sovereign,
			maxAncient,
			maxSovereign,
			percentBadAncient,
			percentBadSovereign,
			percentGoodAncient,
			percentGoodSovereign,
			answeredCount
		}
	}, [selections, items])

	const autoAdvanceRef = useRef<number | null>(null)

	const onChange = (name: string, value: string) => {
		setSelections(prev => ({ ...prev, [name]: value }))

		// auto-advance shortly after selection (no need to press Suivant)
		if (!completed) {
			if (autoAdvanceRef.current) window.clearTimeout(autoAdvanceRef.current)
			// small delay to let user see the selection
			autoAdvanceRef.current = window.setTimeout(() => {
				if (currentIndex >= items.length - 1) {
					setCompleted(true)
				} else {
					setCurrentIndex(ci => Math.min(items.length - 1, ci + 1))
				}
				autoAdvanceRef.current = null
			}, 360) as unknown as number
		}
	}

	// UI state for stepper
	const [currentIndex, setCurrentIndex] = useState(0)
	const [completed, setCompleted] = useState(false)

	// overall stage: landing -> intro -> questions -> actions -> results
	// default to 'intro' so users arrive on the start page with full NIRD description
	const [stage, setStage] = useState<'landing'|'intro'|'questions'|'actions'|'results'>('intro')

	// selected actions (indexes into ideas), max 2
	const [selectedActions, setSelectedActions] = useState<number[]>([])

	const questionNameForIndex = (i: number) => items[i].answers[0].name

	const goNext = () => {
		if (!selections[questionNameForIndex(currentIndex)]) return // require answer
		if (currentIndex >= items.length - 1) {
			setCompleted(true)
			return
		}
		setCurrentIndex(ci => Math.min(items.length - 1, ci + 1))
	}

	const goPrev = () => setCurrentIndex(ci => Math.max(0, ci - 1))

	// (removed visibleIndices - we show all cards once completed)

	// unified ideas list (title/desc + minimal scores)
	const ideas: Idea[] = useMemo(() => [
		{
			title: 'Explorer les systèmes d\'exploitation libres comme Linux',
			desc: 'Réduire la dépendance aux logiciels propriétaires aide à garder le contrôle des données et à adapter les outils.',
			minimalAncientScore: 0,
			minimalSovereignScore: 0
		},
		{
			title: 'Mettre à jour le parc informatique',
			desc: 'Remplacer les machines très anciennes améliore la sécurité et la performance.',
			minimalAncientScore: 1,
			minimalSovereignScore: 0
		},
		{
			title: 'Adopter des suites bureautiques libres (LibreOffice)',
			desc: 'Les suites libres favorisent l\'autonomie et limitent la dépendance aux grands acteurs.',
			minimalAncientScore: 0,
			minimalSovereignScore: 0
		},
		{
			title: 'Diversifier le matériel (portables, tablettes)',
			desc: 'Un parc diversifié répond mieux aux besoins et peut être modernisé progressivement.',
			minimalAncientScore: 1,
			minimalSovereignScore: 0
		},
		{
			title: 'Sécuriser le réseau wifi',
			desc: 'Donner un identifiant par utilisateur réduit le risque d\'intrusion et facilite la gestion.',
			minimalAncientScore: 0,
			minimalSovereignScore: 0
		},
		{
			title: 'Former un référent local',
			desc: 'Avoir une personne formée en interne permet d\'agir rapidement et de construire des compétences locales.',
			minimalAncientScore: 1,
			minimalSovereignScore: 0
		},
		{
			title: 'Sensibiliser la communauté scolaire',
			desc: 'Expliquer pourquoi l\'autonomie numérique importe aide à obtenir l\'adhésion.',
			minimalAncientScore: 0,
			minimalSovereignScore: 0
		},
		{
			title: 'Maintenance préventive',
			desc: 'Entretenir le matériel prolonge sa durée de vie et évite les pannes.',
			minimalAncientScore: 1,
			minimalSovereignScore: 0
		}
	], [])

	useEffect(() => {
		if (!completed) return
		setStage('actions')
	}, [completed, ideas])


	const Speedometer: React.FC<{ percent: number; label: string; color?: string; size?: number }> = ({ percent, label, color = '#e55353', size = 200 }) => {
		const canvasRef = useRef<HTMLCanvasElement | null>(null)
		const animRef = useRef<number | null>(null)

		useEffect(() => {
			const canvas = canvasRef.current
			if (!canvas) return
			const ctx = canvas.getContext('2d')!
			const dpr = window.devicePixelRatio || 1
			const w = size
			const h = size
			canvas.width = w * dpr
			canvas.height = h * dpr
			canvas.style.width = `${w}px`
			canvas.style.height = `${h}px`
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

			const cx = w / 2
			const cy = w / 2
			const radius = Math.min(w, h) * 0.38
			const startAngle = Math.PI * 0.75
			const sweep = Math.PI * 1.5
			let current = 0

			const draw = () => {
				ctx.clearRect(0, 0, w, h)
				ctx.lineWidth = 12
				ctx.strokeStyle = '#bfbfbfff'
				ctx.beginPath()
				ctx.arc(cx, cy, radius, startAngle, startAngle + sweep)
				ctx.stroke()

				const to = startAngle + (Math.min(100, Math.max(0, current)) / 100) * sweep
				const grad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius)
				grad.addColorStop(0, color)
				grad.addColorStop(1, '#ff8b25ff')
				ctx.strokeStyle = grad
				ctx.lineWidth = 12
				ctx.beginPath()
				ctx.arc(cx, cy, radius, startAngle, to)
				ctx.stroke()

				const needleAngle = startAngle + (Math.min(100, Math.max(0, current)) / 100) * sweep
				const nx = cx + Math.cos(needleAngle) * (radius - 6)
				const ny = cy + Math.sin(needleAngle) * (radius - 6)
				ctx.beginPath()
				ctx.lineWidth = 2
				ctx.strokeStyle = 'rgba(215, 215, 215, 0.83)'
				ctx.moveTo(cx, cy)
				ctx.lineTo(nx, ny)
				ctx.stroke()

				ctx.beginPath()
				ctx.fillStyle = '#d6d6d6ff'
				ctx.arc(cx, cy, 6, 0, Math.PI * 2)
				ctx.fill()

				ctx.beginPath()
				ctx.fillStyle = '#ffffff'
				ctx.arc(cx, cy, 12, 0, Math.PI * 2)
				ctx.fill()
				ctx.lineWidth = 2
				ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)'
				ctx.stroke()
			}

			const step = () => {
				const delta = (percent - current) * 0.12
				current += delta
				if (Math.abs(delta) < 0.25) current = percent
				draw()
				if (Math.abs(current - percent) > 0.001) animRef.current = requestAnimationFrame(step)
			}

			step()
			return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
		}, [percent, color, size])

		return <div className="speedometer">
			<canvas ref={canvasRef} />
			<div className="label">{label}</div>
		</div>
	}

	return <div className={'main'}>
		<header className="nird-header">
			<img src="https://nird.forge.apps.education.fr/img/logo+text206px.png" alt="Logo NIRD" className="intro-logo" />
			<div className="nird-hero-text">
				<h1>Ton École — Village Numérique Résistant</h1>
				<p className="subtitle">Un diagnostic simple et un plan d'actions pour rendre ton établissement plus autonome et sûr.</p>
			</div>
		</header>

		{
			stage === 'intro' ? (
				<Intro setStage={setStage} setCurrentIndex={setCurrentIndex}></Intro>
			) : stage === 'questions' ? (
				<div className="question-block">
					<h3>{items[currentIndex].question}</h3>
					{items[currentIndex].answers.map((answer, aIndex) => (
						<div key={aIndex} className="answer-option">
							<input
								type="radio"
								id={answer.value}
								name={answer.name}
								value={answer.value}
								checked={selections[answer.name] === answer.value}
								onChange={() => onChange(answer.name, answer.value)}
							/>
							<label htmlFor={answer.value}>{answer.text}</label>
						</div>
					))}

					<div>
						<button onClick={goPrev} disabled={currentIndex === 0}>Précédent</button>
						<button onClick={() => { goNext(); if (currentIndex === items.length - 1) setStage('actions'); }}>{currentIndex === items.length - 1 ? 'Terminer' : 'Suivant'}</button>
					</div>
					<div>Question {currentIndex + 1} / {items.length}</div>
				</div>
			) : stage === 'actions' ? (
				<div>
					<div className="question-block">
						<h3>Choisissez 2 actions pour commencer</h3>
						<p>Parmi les propositions ci-dessous, sélectionnez jusqu'à deux actions prioritaires. Ces choix vous permettront d'obtenir un plan simple et des étapes concrètes.</p>
						<div className="ideas-grid">
							{ideas.map((idea, i) => {
								const selected = selectedActions.includes(i)
								return (
									<div key={i} onClick={() => {
										setSelectedActions(prev => prev.includes(i) ? prev.filter(x => x !== i) : (prev.length < 2 ? [...prev, i] : prev))
									}} className={`idea-card ${selected ? 'idea-card-selected' : ''}`}>
										<div>
											<h4>{idea.title}</h4>
											<p>{idea.desc}</p>
										</div>
										<div className={`${selected ? 'selecteddd' : ''}`}>{selected ? 'Sélectionnée' : 'Cliquer pour sélectionner'}</div>
									</div>
								)
							})}
						</div>
						<div>
							<div style={{marginBottom: "10px"}}>Actions choisies : {selectedActions.length} / 2</div>
							<div>
								<button onClick={() => setStage('questions')}>Modifier réponses</button>
								<button disabled={selectedActions.length < 2} onClick={() => setStage('results')}>Voir les résultats</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div>
					{stage === 'results' && (
						<div className="nird-barometer">
							<div className="nird-speedometers">
								<Speedometer percent={totals.percentBadAncient} label={`Obsolescence`} color="#ff7aa2" size={220} />
								<Speedometer percent={totals.percentBadSovereign} label={`Dépendance`} color="#00d4ff" size={220} />
							</div>
						</div>
					)}
					<div className="question-block">
						<h2>Résultats et plan d'action</h2>
						<p>Voici un résumé de votre diagnostic et un plan d'actions concret pour démarrer.</p>
						<div className='res-cards'>
							<div className="res-card">
								<h2>{Math.max(0, Math.round(((100 - totals.percentBadAncient) * 40 + (100 - totals.percentBadSovereign) * 20) * 10))} €</h2>
								<div>Économie potentielle indicative</div>
							</div>
							<div className="res-card">
								<h2>{Math.max(0, Math.round((100 - totals.percentBadAncient)/50 * 3))} ans</h2>
								<div>Prolongation moyenne de la durée de vie des équipements</div>
							</div>
							<div className="res-card">
								<h2>{Math.round(totals.percentGoodSovereign)}%</h2>
								<div>Dépendance estimée (plus c'est haut, plus vous êtes souverain)</div>
							</div>
						</div>

						<div>
							<div>
								<button onClick={() => { setSelectedActions([]); setStage('actions'); }}>Modifier les actions</button>
								<button onClick={() => {
									const plan = `Plan NIRD\nActions choisies:\n${selectedActions.map(i => `- ${ideas[i].title}`).join('\n')}\n\nPremières étapes:\n- Voir la checklist et contacter un référent local.`
									navigator.clipboard.writeText(plan).then(() => alert('Plan copié dans le presse-papier'))
								}}>📋 Copier mon plan</button>
								<button onClick={() => {
									setSelections({})
									setCurrentIndex(0)
									setCompleted(false)
									setSelectedActions([])
									setStage('intro')
								}}>🔄 Recommencer</button>
							</div>
						</div>

						<div className="nird-about">
							<div>
								<section>
									<h3>À propos du NIRD</h3>
									<p>
										Le NIRD (Nœud d'Initiatives pour la Résilience Digitale) accompagne les établissements scolaires vers plus d'autonomie numérique.
										Il propose des ressources, des guides et des outils pour réemployer du matériel, sécuriser les réseaux et privilégier des logiciels libres quand c'est pertinent.
									</p>
								</section>
								<section>
									<h3>Pourquoi c'est utile pour un lycée :</h3>
									<p>
										Vous protégez les données des élèves, développez des compétences techniques locales et réduisez les coûts à long terme. Le NIRD facilite ces démarches avec des parcours prêts à l'emploi.
									</p>
									<div>
										<h4>Ressources clés</h4>
										<ul>
											<li><a href="#" target="_blank" rel="noopener">Documentation complète NIRD (guides, checklists)</a></li>
											<li><a href="#" target="_blank" rel="noopener">Tutoriels d'installation pas-à-pas</a></li>
											<li><a href="#" target="_blank" rel="noopener">Programme de formation pour référents locaux</a></li>
										</ul>
									</div>
								</section>
								<section>
									<h3>FAQ rapide</h3>
									<ul>
										<li>Combien ça coûte ? → Le NIRD propose des solutions low-cost et des ressources gratuites.</li>
										<li>Faut-il un technicien ? → Non, commencez par une petite expérimentation et formez un référent.</li>
										<li>Est-ce sécurisé ? → Oui, l'approche privilégie la sécurité et la traçabilité des actions.</li>
									</ul>
								</section>
							</div>
						</div>
					</div>
				</div>
			)
		}
	</div>
}
