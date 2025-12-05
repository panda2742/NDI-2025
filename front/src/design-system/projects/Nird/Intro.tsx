import '@atoms/project_template/style.scss'
import './style.scss'

export const Intro = ({setStage, setCurrentIndex }: { setStage: any, setCurrentIndex: any }) => {
	return <div className="question-block">
		<section>
			<h3>Avant de commencer</h3>
			<p>Cette simulation vous guide pas à pas pour évaluer l'autonomie numérique de votre établissement
					et obtenir un plan d'actions concret. Avant de répondre, lisez cette présentation complète du NIRD
					pour comprendre les enjeux et les ressources disponibles.</p>
		</section>

		<section>
			<h3>Qu'est-ce que le NIRD ?</h3>
			<p>Le NIRD (Nœud d'Initiatives pour la Résilience Digitale) accompagne les établissements scolaires vers plus d'autonomie numérique. Il fournit des guides, des checklists, des parcours d'expérimentation et des outils.</p>
		</section>

		<section>
			<h3>Présentation complète du NIRD</h3>
			<p>Le NIRD est une initiative visant à proposer un « numérique éducatif » inclusif, responsable et durable dans les établissements scolaires. L'idée est de repenser non seulement les outils informatiques, mais aussi <strong>les usages, les valeurs et les pratiques</strong> autour du numérique : inclusion, solidarité, autonomie, sobriété.</p>
			<p>Le NIRD s'appuie sur plusieurs axes :</p>
			<ul>
				<li>Inclusion numérique et citoyenne</li>
				<li>Responsabilité & émancipation numérique</li>
				<li>Durabilité & sobriété numérique</li>
				<li>Partage, mutualisation, documentation ouverte</li>
			</ul>
		</section>

		<section>
			<h3>Pourquoi c'est utile pour un établissement ?</h3>
			<p>Améliorer l'autonomie numérique protège les données scolaires, réduit les coûts à long terme et crée des compétences pratiques pour les élèves et le personnel. Le NIRD propose des solutions adaptées : expérimentations sur petites séries, guides de réemploi, et formations pour référents.</p>
		</section>

		<section>
			<h3>FAQ rapide</h3>
			<ul>
				<li>Combien ça coûte ? → Le NIRD privilégie des solutions low-cost et des ressources gratuites.</li>
				<li>Faut-il un technicien ? → Non, commencez par une expérimentation et formez un référent.</li>
				<li>Est-ce sécurisé ? → Oui, l'approche intègre des bonnes pratiques de sécurité et de sauvegarde.</li>
			</ul>
		</section>

		<div>
			<button onClick={() => { setStage('questions'); setCurrentIndex(0); }} className="btn-playful">Démarrer la simulation</button>
		</div>
	</div>
}
