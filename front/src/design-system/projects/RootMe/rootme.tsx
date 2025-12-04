import '@atoms/project_template/style.scss'

import './style.scss'

import Image1 from './assets/image_1.png'
import Image2 from './assets/image_2.png'

export const RootmeProject = () => {
    return <div className={'project'}>
        <div className={'project-header'}>
            <div className={'project-header-left'}>
                <h1 className={'project-header-left-title project-pr-title'}>
                    RootMe
                </h1>
                <div className={'project-header-left-sub-title project-sc-title'}>
                    Cybersécurité
                </div>
            </div>

            <div className={'project-header-right project-pr-link'}>
                Fin 2022
            </div>
        </div>
        <div className={'project-body'}>
            <div className={'project-body-preview rootme'}>

            </div>
            <div className={'project-body-section'}>
                <h2 className={'project-body-section-title project-sc-title'}>
                    L’objectif :
                </h2>
                <p className={'project-body-section-text project-pr-text'}>
                    Apprendre à se protéger des cyberattaques et intégrer une approche "sécurité" dans mes projets de
                    développement.
                    <br/><br/>
                    Lors de la rentrée 2022, je me suis inscrit sur le site RootMe dans le but d’améliorer mes
                    compétences en cybersécurité. L’objectif était clair : protéger mon serveur, mes applications et mes
                    données, tout en me formant aux pratiques de sécurisation nécessaires pour mes projets actuels et
                    futurs.
                </p>

                <div className={'project-body-section-images'}>
                    <img src={Image1} alt=""/>
                    <img src={Image2} alt=""/>
                </div>
            </div>
            <div className={'project-body-section'}>
                <h2 className={'project-body-section-title project-sc-title'}>
                    Pourquoi RootMe ?
                </h2>
                <p className={'project-body-section-text project-pr-text'}>
                    RootMe est une plateforme de formation à la cybersécurité qui permet de s’exercer principalement en
                    tant qu'attaquant. Cette approche m’a appris à anticiper les vulnérabilités et à intégrer les
                    meilleures pratiques de sécurité dans mes développements.
                </p>
            </div>
            <div className={'project-body-section'}>
                <h2 className={'project-body-section-title project-sc-title'}>
                    Les résultats :
                </h2>
                <ul>
                    <li className={'project-pr-text'}>565 points obtenus, ce qui me classe dans le top 9% mondial des
                        utilisateurs (24 756e sur 265 522 inscrits).
                    </li>
                    <li className={'project-pr-text'}>De nombreux challenges réalisés, attribuant des points selon le
                        niveau de difficulté et couvrant divers domaines.
                    </li>
                </ul>
            </div>
            <div className={'project-body-section'}>
                <h2 className={'project-body-section-title project-sc-title'}>
                    Catégories explorées :
                </h2>
                <ul>
                    <li className={'project-pr-text'}>Web - Client : Identifier et exploiter les failles côté
                        utilisateur.
                    </li>
                    <li className={'project-pr-text'}>Web - Serveur : Tester la robustesse des systèmes backend.
                    </li>
                    <li className={'project-pr-text'}>Réseau : Comprendre et sécuriser les communications réseau.
                    </li>
                    <li className={'project-pr-text'}>Réaliste : Résoudre des scénarios pratiques inspirés de cas
                        concrets.
                    </li>
                </ul>
            </div>
            <div className={'project-body-section'}>
                <h2 className={'project-body-section-title project-sc-title'}>
                    Ce que j’ai appris :
                </h2>
                <ul>
                    <li className={'project-pr-text'}>Anticiper et sécuriser les failles courantes dans mes projets.
                    </li>
                    <li className={'project-pr-text'}>Améliorer ma compréhension des principes de cybersécurité,
                        essentiels pour protéger mes infrastructures.
                    </li>
                    <li className={'project-pr-text'}>Réseau : Comprendre et sécuriser les communications réseau.
                    </li>
                    <li className={'project-pr-text'}>Adopter une méthodologie de travail orientée vers la prévention
                        des cyberattaques.
                    </li>
                </ul>
            </div>

            <div className={'project-body-section'}>
                <p className={'project-body-section-text project-pr-text'}>
                    Grâce à cette expérience, j’ai intégré une véritable sensibilité à la sécurité dans mes projets, ce
                    qui me permet aujourd’hui de concevoir des applications plus robustes et sûres.
                </p>
            </div>

            {/*  */}

            <div className={'project-demo'}>
                <h2 className={'project-demo-title project-sc-title'}></h2>

                <div className={'project-demo-content'}>
                    <div></div>
                    <div className='project-demo-content-video'>
                        <a href='https://www.root-me.org/69Nesta?lang=fr' target={'_blank'}
                           className={'btn-watch-demo'}>Voir mon profil RootMe
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.292893 11.2929C-0.0976311 11.6834 -0.0976311 12.3166 0.292893 12.7071C0.683418 13.0976 1.31658 13.0976 1.70711 12.7071L0.292893 11.2929ZM13 0.999999C13 0.447714 12.5523 -8.70777e-07 12 -8.70777e-07L3 -8.70777e-07C2.44772 -8.70777e-07 2 0.447714 2 0.999999C2 1.55228 2.44772 2 3 2H11V10C11 10.5523 11.4477 11 12 11C12.5523 11 13 10.5523 13 10L13 0.999999ZM1.70711 12.7071L12.7071 1.70711L11.2929 0.292892L0.292893 11.2929L1.70711 12.7071Z"
                                    fill="white"/>
                            </svg>
                        </a>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
}
