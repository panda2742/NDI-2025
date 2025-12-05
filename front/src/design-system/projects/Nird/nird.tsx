import { useMemo, useState, useRef, useEffect } from 'react'
import '@atoms/project_template/style.scss'
import './style.scss'

interface Answer {
	text: string;
	value: string;
	name: string;
	ancientScore: number;
	sovereignScore: number;
}

interface FormData {
	question: string;
	answers: Answer[];
}

interface Idea {
	title: string;
	desc: string;
	minimalAncientScore: number;
	minimalSovereignScore: number;
}

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

	// when completed, mark all ideas visible and show recap (no scrolling required)
	useEffect(() => {
		if (!completed) return
		// move to actions selection stage when questionnaire completes
		setStage('actions')
	}, [completed, ideas])

	// modal for detailed plan
	const [showPlanModal, setShowPlanModal] = useState(false)

	// no scroll handler needed — ideas will be laid out directly on the page

	// no pointer drag handlers — static layout

	// compute deterministic per-card offsets so they look naturally scattered
	const ideaOffsets = useMemo(() => {
		return ideas.map((_, i) => {
			// deterministic pseudo-random based on index
			const rnd = Math.abs(Math.sin(i * 12.9898))
			const x = ((rnd * 40) - 20) * (i % 2 === 0 ? -1 : 1) // -20..20, alternate sides
			const rot = (rnd * 8) - 4 // -4..4 deg
			return { x: Math.round(x), rot: Math.round(rot * 10) / 10 }
		})
	}, [ideas])

	// Speedometer component (canvas-based)
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
				// background arc
				ctx.lineWidth = 12
				ctx.strokeStyle = '#f0f0f3'
				ctx.beginPath()
				ctx.arc(cx, cy, radius, startAngle, startAngle + sweep)
				ctx.stroke()

				// colored arc
				const to = startAngle + (Math.min(100, Math.max(0, current)) / 100) * sweep
				const grad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius)
				grad.addColorStop(0, color)
				grad.addColorStop(1, '#ffd1a8')
				ctx.strokeStyle = grad
				ctx.lineWidth = 12
				ctx.beginPath()
				ctx.arc(cx, cy, radius, startAngle, to)
				ctx.stroke()

				// ticks
				for (let i = 0; i <= 10; i++) {
					const t = i / 10
					const ang = startAngle + t * sweep
					const x1 = cx + Math.cos(ang) * (radius + 8)
					const y1 = cy + Math.sin(ang) * (radius + 8)
					const x2 = cx + Math.cos(ang) * (radius - 6)
					const y2 = cy + Math.sin(ang) * (radius - 6)
					ctx.strokeStyle = 'rgba(0,0,0,0.06)'
					ctx.lineWidth = 2
					ctx.beginPath()
					ctx.moveTo(x1, y1)
					ctx.lineTo(x2, y2)
					ctx.stroke()
				}

				// needle
				const needleAngle = startAngle + (Math.min(100, Math.max(0, current)) / 100) * sweep
				const nx = cx + Math.cos(needleAngle) * (radius - 6)
				const ny = cy + Math.sin(needleAngle) * (radius - 6)
				ctx.beginPath()
				ctx.lineWidth = 2
				ctx.strokeStyle = 'rgba(0,0,0,0.6)'
				ctx.moveTo(cx, cy)
				ctx.lineTo(nx, ny)
				ctx.stroke()

				// center dot
				ctx.beginPath()
				ctx.fillStyle = '#111'
				ctx.arc(cx, cy, 6, 0, Math.PI * 2)
				ctx.fill()

				// decorative center (no numeric percent shown)
				ctx.beginPath()
				ctx.fillStyle = '#ffffff'
				ctx.arc(cx, cy, 12, 0, Math.PI * 2)
				ctx.fill()
				ctx.lineWidth = 2
				ctx.strokeStyle = 'rgba(255,255,255,0.18)'
				ctx.stroke()
			}

			const step = () => {
				// move current toward percent with easing; allow both increase and decrease
				const delta = (percent - current) * 0.12
				current += delta
				// if the change is very small, snap to target to finish animation
				if (Math.abs(delta) < 0.25) current = percent
				draw()
				if (Math.abs(current - percent) > 0.001) animRef.current = requestAnimationFrame(step)
			}

			step()
			return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
		}, [percent, color, size])

		return <div className="speedometer" style={{ width: size }}>
			<canvas ref={canvasRef} />
			<div className="label">{label}</div>
			<div className="sub">(plus haut = plus péjoratif)</div>
		</div>
	}

	return <div className={'main'}>
		<header className="nird-header">
			<div className="nird-hero-text">
				<h1>Ton École — Village Numérique Résistant</h1>
				<p className="subtitle">Un diagnostic simple et un plan d'actions pour rendre ton établissement plus autonome et sûr.</p>
			</div>
		</header>

		{
			stage === 'intro' ? (
				<div className="question-block">
					<h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>Bienvenue — Avant de commencer</h2>
					<p className="lead">Cette simulation vous guide pas à pas pour évaluer l'autonomie numérique de votre établissement et obtenir un plan d'actions concret. Avant de répondre, lisez cette présentation complète du NIRD pour comprendre les enjeux et les ressources disponibles.</p>

					{/* Full NIRD presentation for the intro (long, airy, readable) */}
					<section style={{ marginTop: 14, lineHeight: 1.7 }}>
						<h3>Qu'est-ce que le NIRD ?</h3>
						<p>Le NIRD (Nœud d'Initiatives pour la Résilience Digitale) accompagne les établissements scolaires vers plus d'autonomie numérique. Il fournit des guides, des checklists, des parcours d'expérimentation et des outils pour :</p>
						<ul>
							<li>Réemployer et moderniser le parc informatique</li>
							<li>Sécuriser les réseaux et les accès</li>
							<li>Favoriser les logiciels libres et la souveraineté des données</li>
							<li>Former des référents locaux et monter en compétences</li>
						</ul>
					</section>

					{/* Full project document from NIRD.md integrated below */}
					<section style={{ marginTop: 18 }}>
						<h2>Présentation complète du NIRD</h2>
						<p>Le NIRD est une initiative visant à proposer un « numérique éducatif » inclusif, responsable et durable dans les établissements scolaires. L'idée est de repenser non seulement les outils informatiques, mais aussi <strong>les usages, les valeurs et les pratiques</strong> autour du numérique : inclusion, solidarité, autonomie, sobriété.</p>

						<h3>Principes et piliers fondamentaux</h3>
						<p>Le NIRD s'appuie sur plusieurs axes :</p>
						<h4>Inclusion numérique et citoyenne</h4>
						<ul>
							<li>Reconditionner des ordinateurs pour les distribuer à des élèves ou écoles défavorisées.</li>
							<li>Favoriser l'accès à tous, donner la possibilité à chacun d'utiliser un ordinateur, sans barrière financière ni technique.</li>
							<li>Permettre aux élèves d'être acteurs — les impliquer dans le reconditionnement, l'installation et la maintenance.</li>
						</ul>

						<h4>Responsabilité & émancipation numérique</h4>
						<ul>
							<li>Préconiser les logiciels libres et systèmes ouverts (GNU/Linux) pour donner la liberté d'utiliser, modifier et partager les outils.</li>
							<li>Sensibiliser la communauté éducative aux enjeux : souveraineté, dépendance logicielle, protection des données.</li>
							<li>Fournir formation, documentation et retours d'expérience accessibles.</li>
						</ul>

						<h4>Durabilité & sobriété numérique</h4>
						<ul>
							<li>Reconditionner les machines plutôt que d'acheter systématiquement du neuf.</li>
							<li>Utiliser des systèmes légers pour prolonger la durée de vie des machines et réduire la consommation d'énergie.</li>
							<li>Réduire les coûts de licences et d'entretien pour rendre le numérique plus accessible et pérenne.</li>
						</ul>

						<h4>Partage, mutualisation, documentation ouverte</h4>
						<p>Publier protocoles, retours d'expérience et supports pédagogiques sous licences ouvertes afin qu'ils soient adaptables et réutilisables par d'autres établissements.</p>
					</section>

					<section style={{ marginTop: 18 }}>
						<h3>Mise en œuvre — Cas d'étude</h3>
						<p>Exemple : Lycée Carnot de Bruay‑la‑Buissière — le projet a permis de reconditionner des machines, monter un club NIRD, et distribuer du matériel reconditionné aux écoles locales.</p>
						<ul>
							<li>Pendant le confinement 2020, des mini-ordinateurs (Raspberry Pi) sous Linux ont été fournis pour assurer la continuité pédagogique.</li>
							<li>Un club « informatique / NIRD » a été mis en place : les élèves réparent, installent un OS libre et redistribuent les machines.</li>
							<li>Bilan (campagne 2024‑2025) : 132 ordinateurs reconditionnés offerts à 11 écoles primaires, couvrant près de 800 élèves.</li>
						</ul>
					</section>

					<section style={{ marginTop: 18 }}>
						<h3>Intérêts et bénéfices</h3>
						<ul>
							<li>Réduction de la fracture numérique</li>
							<li>Autonomie et émancipation des élèves</li>
							<li>Réduction des coûts et de l'empreinte écologique</li>
							<li>Culture du libre et mutualisation des ressources</li>
						</ul>
					</section>

					<section style={{ marginTop: 18 }}>
						<h3>Déploiement et soutien</h3>
						<p>Le projet a essaimé dans plusieurs académies et bénéficie d'un soutien institutionnel (CNLL, académies), mais il nécessite une mobilisation locale (enseignants, collectivités).</p>
					</section>

					<section style={{ marginTop: 18 }}>
						<h3>Limites et contraintes</h3>
						<ul>
							<li>Le succès dépend d'une mobilisation humaine : temps, formation et maintenance.</li>
							<li>Le reconditionnement dépend souvent de partenariats et dons.</li>
							<li>Certains usages pédagogiques spécifiques peuvent nécessiter des logiciels propriétaires.</li>
						</ul>
					</section>

					<section style={{ marginTop: 18 }}>
						<h3>Conclusion</h3>
						<p>Le NIRD propose une approche pragmatique et solidaire : logiciel libre + réemploi + formation locale. C'est une alternative viable et reproductible pour rendre le numérique scolaire plus durable et accessible.</p>
					</section>

					<section style={{ marginTop: 18 }}>
						<h3>Pourquoi c'est utile pour un lycée</h3>
						<p>Améliorer l'autonomie numérique protège les données scolaires, réduit les coûts à long terme et crée des compétences pratiques pour les élèves et le personnel. Le NIRD propose des solutions adaptées : expérimentations sur petites séries, guides de réemploi, et formations pour référents.</p>
					</section>

					<section style={{ marginTop: 18 }}>
						<h3>Ressources disponibles</h3>
						<ul>
							<li>Documentation complète (guides, checklists)</li>
							<li>Tutoriels pas-à-pas d'installation et de maintenance</li>
							<li>Programmes de formation pour référents locaux</li>
							<li>Exemples de projets menés dans d'autres établissements</li>
						</ul>
					</section>

					<section style={{ marginTop: 18 }}>
						<h3>FAQ rapide</h3>
						<ul>
							<li>Combien ça coûte ? → Le NIRD privilégie des solutions low-cost et des ressources gratuites.</li>
							<li>Faut-il un technicien ? → Non, commencez par une expérimentation et formez un référent.</li>
							<li>Est-ce sécurisé ? → Oui, l'approche intègre des bonnes pratiques de sécurité et de sauvegarde.</li>
						</ul>
					</section>

					<section style={{ marginTop: 18 }}>
						<h3>Suggestions concrètes pour démarrer</h3>
						<ol>
							<li>Inventaire rapide de 10 machines (âge, OS) — 30 minutes</li>
							<li>Tester une mise à jour ou une distribution légère sur 3 à 5 machines — 1 journée</li>
							<li>Nommer un référent et planifier une réunion de restitution — 2 heures</li>
						</ol>
					</section>

					<div style={{ textAlign: 'center', marginTop: 20 }}>
						<button onClick={() => { setStage('questions'); setCurrentIndex(0); }} className="btn-playful">Démarrer la simulation</button>
					</div>
				</div>
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

					<div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
						<button onClick={goPrev} disabled={currentIndex === 0}>Précédent</button>
						<button onClick={() => { goNext(); if (currentIndex === items.length - 1) setStage('actions'); }} style={{ marginLeft: 'auto' }}>{currentIndex === items.length - 1 ? 'Terminer' : 'Suivant'}</button>
					</div>
					<div style={{ marginTop: 8 }}>Question {currentIndex + 1} / {items.length}</div>
				</div>
			) : stage === 'actions' ? (
				<div style={{ marginTop: 18 }}>
					<div className="question-block">
						<h3>Choisissez 2 actions pour commencer</h3>
						<p>Parmi les propositions ci-dessous, sélectionnez jusqu'à deux actions prioritaires. Ces choix vous permettront d'obtenir un plan simple et des étapes concrètes.</p>
						<div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 }}>
							{ideas.map((idea, i) => {
								const selected = selectedActions.includes(i)
								const offset = ideaOffsets[i] || { x: 0, rot: 0 }
								return (
									<div key={i} onClick={() => {
										setSelectedActions(prev => prev.includes(i) ? prev.filter(x => x !== i) : (prev.length < 2 ? [...prev, i] : prev))
									}} className="idea-card" style={{ cursor: 'pointer', width: 280, opacity: selected ? 1 : 0.95, border: selected ? `2px solid var(--accent)` : '1px solid rgba(0,0,0,0.06)', boxShadow: selected ? '0 12px 30px rgba(221,72,20,0.12)' : '0 6px 18px rgba(15,15,15,0.04)', transform: `translateX(${offset.x}px) rotate(${offset.rot}deg)` }}>
									<h4 style={{ margin: '0 0 10px', fontWeight: 700 }}>{idea.title}</h4>
									<p style={{ margin: 0 }}>{idea.desc}</p>
									<div style={{ marginTop: 8, fontSize: 12, color: 'var(--muted)' }}>{selected ? 'Sélectionnée' : 'Cliquer pour sélectionner'}</div>
									</div>
								)
							})}
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
							<div>Actions choisies : {selectedActions.length} / 2</div>
							<div>
								<button onClick={() => setStage('questions')} style={{ marginRight: 8 }}>Modifier réponses</button>
								<button disabled={selectedActions.length < 2} onClick={() => setStage('results')}>Voir les résultats</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				// results
				<div style={{ marginTop: 18 }}>
					<div className="question-block">
						<h3>Résultats et plan d'action</h3>
						<p>Voici un résumé de votre diagnostic et un plan d'actions concret pour démarrer.</p>
						{/* friendly recap for lycée audience */}
						<div className="nird-recap">
							<h3>Récap rapide — Ce que tu peux faire maintenant</h3>
							<p className="lead">Simple, concret et utile — ce plan est pensé pour que des lycéens, des profs ou un responsable puissent démarrer en quelques heures.</p>
							<div className="recap-grid">
								<div>
									<h4>Pourquoi commencer ?</h4>
									<p>Améliorer la sécurité et l'autonomie permet de protéger les données scolaires, réduire les coûts et créer des compétences locales utiles pour les élèves.</p>
								</div>
								<div>
									<h4>Avantages concrets</h4>
									<ul>
										<li>Sécurité renforcée</li>
										<li>Économies sur le long terme</li>
										<li>Compétences locales développées</li>
									</ul>
								</div>
							</div>
							<div style={{ marginTop: 10 }}>
								<h4>Plan en 3 étapes (rapide)</h4>
								<ol>
									<li><strong>Inventaire</strong> — 30 min : lister 10 machines et noter l'âge et le système.</li>
									<li><strong>Expérimentation</strong> — 1 jour : tester une mise à jour ou installer une distribution légère sur 5 machines.</li>
									<li><strong>Suivi</strong> — former un référent (2h) et planifier un entretien mensuel.</li>
								</ol>
							</div>
							<div className="recap-links" style={{ marginTop: 12 }}>
								<h4>Liens et ressources</h4>
								<ul>
									<li><a href="#" target="_blank" rel="noopener">Forge NIRD — outils et guides</a></li>
									<li><a href="#" target="_blank" rel="noopener">Site officiel NIRD (à remplacer par l'URL officielle)</a></li>
									<li><a href="#" target="_blank" rel="noopener">Guide de réemploi et d'installation (tutoriel pas-à-pas)</a></li>
								</ul>
							</div>
							<p className="final-note">En cas de doute, commence par une sauvegarde et teste sur une petite parcelle. Même une action modeste change beaucoup.</p>
						</div>
						{/* Impacts summary */}
						<div style={{ display: 'flex', gap: 18, marginTop: 12, flexWrap: 'wrap', justifyContent: 'space-between' }}>
							<div style={{ flex: '1 1 220px', background: 'white', padding: 16, borderRadius: 12, boxShadow: '0 8px 26px rgba(15,15,15,0.06)' }}>
								<strong style={{ display: 'block', fontSize: '1.4rem' }}>{Math.max(0, Math.round(((100 - totals.percentBadAncient) * 40 + (100 - totals.percentBadSovereign) * 20) * 10))} €</strong>
								<div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>Économie potentielle indicative</div>
							</div>
							<div style={{ flex: '1 1 220px', background: 'white', padding: 16, borderRadius: 12, boxShadow: '0 8px 26px rgba(15,15,15,0.06)' }}>
								<strong style={{ display: 'block', fontSize: '1.4rem' }}>{Math.max(0, Math.round((100 - totals.percentBadAncient)/50 * 3))} ans</strong>
								<div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>Prolongation moyenne de la durée de vie des équipements</div>
							</div>
							<div style={{ flex: '1 1 220px', background: 'white', padding: 16, borderRadius: 12, boxShadow: '0 8px 26px rgba(15,15,15,0.06)' }}>
								<strong style={{ display: 'block', fontSize: '1.4rem' }}>{Math.round(totals.percentGoodSovereign)}%</strong>
								<div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>Dépendance estimée (plus c'est haut, plus vous êtes souverain)</div>
							</div>
						</div>

						{/* Vos premiers pas (open in modal) */}
						<div style={{ marginTop: 18 }}>
							<h4>Vos premiers pas</h4>
							<p>Vous avez choisi vos actions — visualisez le plan détaillé :</p>
							<div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
								<button onClick={() => setShowPlanModal(true)}>Voir le plan d'action</button>
								<button onClick={() => { setSelectedActions([]); setStage('actions'); }}>Modifier les actions</button>
							</div>
						</div>

						{/* Resources and contact */}
						<div style={{ marginTop: 18, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
							<div style={{ flex: '1 1 320px' }}>
								<h4>Ressources immédiates</h4>
								<ul>
									<li><a href="#">Forge NIRD — outils et guides</a></li>
									<li><a href="#">Guide de réemploi et installation Linux</a></li>
									<li><a href="#">Checklist sécurité réseau</a></li>
								</ul>
							</div>
							<div style={{ flex: '1 1 320px' }}>
								<h4>Témoignage</h4>
								<blockquote style={{ margin: 0 }}>
									<p>"Nous avons commencé petit — 10 machines et une formation. En 6 mois, l'équipe a gagné en autonomie et nous avons réduit nos coûts."</p>
									<footer style={{ fontSize: 12, color: 'var(--muted)' }}>— Collège de la vallée</footer>
								</blockquote>
							</div>
						</div>

						{/* actions: copy plan / restart / contact form */}
						<div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
							<button onClick={() => {
								const plan = `Plan NIRD\nActions choisies:\n${selectedActions.map(i => `- ${ideas[i].title}`).join('\n')}\n\nPremières étapes:\n- Voir la checklist et contacter un référent local.`
								navigator.clipboard.writeText(plan).then(() => alert('Plan copié dans le presse-papier'))
							}}>📋 Copier mon plan</button>
							<button onClick={() => {
								// reset all
								setSelections({})
								setCurrentIndex(0)
								setCompleted(false)
								setSelectedActions([])
								setStage('intro')
							}}>🔄 Recommencer</button>
						</div>

						{/* Plan modal (detailed steps) */}
						{showPlanModal && (
							<div className="nird-modal-overlay" role="dialog" aria-modal="true">
								<div className="nird-modal">
									<button className="nird-modal-close" onClick={() => setShowPlanModal(false)}>✕</button>
									<h3>Plan d'action détaillé</h3>
									<p>Voici les étapes concrètes pour mettre en œuvre les actions choisies. Imprime-les ou copie-les pour les partager.</p>
									{selectedActions.map(i => (
										<div key={i} className="modal-plan-card">
											<strong>{ideas[i].title}</strong>
											<p style={{ marginTop: 8 }}>{ideas[i].desc}</p>
											<ol style={{ marginTop: 8 }}>
												<li>Préparer : réaliser un inventaire rapide (liste, âge, système).</li>
												<li>Expérimenter : tester sur 5 machines (mise à jour/installation légère).</li>
												<li>Déployer : planifier la montée en charge et la maintenance.</li>
											</ol>
										</div>
									))}
									<div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
										<button onClick={() => {
											const plan = `Plan NIRD\nActions choisies:\n${selectedActions.map(i => `- ${ideas[i].title}`).join('\n')}`
											navigator.clipboard.writeText(plan).then(() => alert('Plan copié dans le presse-papier'))
										}}>📋 Copier</button>
										<button onClick={() => setShowPlanModal(false)}>Fermer</button>
									</div>
								</div>
							</div>
						)}

						{/* A propos du NIRD - section longue, aérée et séparée du plan modal */}
						<div className="nird-about" style={{ marginTop: 28 }}>
							<div style={{ background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 12px 40px rgba(15,15,15,0.04)' }}>
								<h3>À propos du NIRD</h3>
								<p style={{ marginTop: 8, lineHeight: 1.6 }}>
									Le NIRD (Nœud d'Initiatives pour la Résilience Digitale) accompagne les établissements scolaires vers plus d'autonomie numérique.
									Il propose des ressources, des guides et des outils pour réemployer du matériel, sécuriser les réseaux et privilégier des logiciels libres quand c'est pertinent.
								</p>
								<p style={{ marginTop: 8, lineHeight: 1.6 }}>
									Pourquoi c'est utile pour un lycée : vous protégez les données des élèves, développez des compétences techniques locales et réduisez les coûts à long terme. Le NIRD facilite ces démarches avec des parcours prêts à l'emploi.
								</p>
								<div style={{ display: 'flex', gap: 18, marginTop: 14, flexWrap: 'wrap' }}>
									<div style={{ flex: '1 1 360px' }}>
										<h4>Ressources clés</h4>
										<ul>
											<li><a href="#" target="_blank" rel="noopener">Documentation complète NIRD (guides, checklists)</a></li>
											<li><a href="#" target="_blank" rel="noopener">Tutoriels d'installation pas-à-pas</a></li>
											<li><a href="#" target="_blank" rel="noopener">Programme de formation pour référents locaux</a></li>
										</ul>
									</div>
									<div style={{ flex: '1 1 320px' }}>
										<h4>FAQ rapide</h4>
										<ul>
											<li>Combien ça coûte ? → Le NIRD propose des solutions low-cost et des ressources gratuites.</li>
											<li>Faut-il un technicien ? → Non, commencez par une petite expérimentation et formez un référent.</li>
											<li>Est-ce sécurisé ? → Oui, l'approche privilégie la sécurité et la traçabilité des actions.</li>
										</ul>
									</div>
								</div>
								<div style={{ marginTop: 14 }}>
									<h4>Suggestions concrètes pour débuter</h4>
									<ol>
										<li>Faire un inventaire de 10 machines (âge, OS) — 30 minutes.</li>
										<li>Tester une mise à jour ou une distribution légère sur 3 à 5 machines — 1 journée.</li>
										<li>Nommer un référent et planifier une réunion de restitution — 2 heures.</li>
									</ol>
								</div>
								<p style={{ marginTop: 12, color: 'var(--muted)' }}>Si vous souhaitez, nous pouvons intégrer des liens officiels du NIRD ici — fournissez-les et je les replace.</p>
							</div>
						</div>
					</div>
				</div>
			)
		}

		{stage === 'results' && (
			<div className="nird-barometer" style={{ marginTop: 24 }}>
				<p style={{ marginBottom: 10 }}>Réponses remplies: {totals.answeredCount} / {items.length}</p>

				<div className="nird-speedometers">
					<Speedometer percent={totals.percentBadAncient} label={`Obsolescence`} color="#ff7aa2" size={220} />
					<Speedometer percent={totals.percentBadSovereign} label={`Dépendance`} color="#00d4ff" size={220} />
				</div>
			</div>
		)}
	</div>
}
