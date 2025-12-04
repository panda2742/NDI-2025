import {Copy, S} from '@atoms/project_template/project_template.tsx';
import '@atoms/project_template/style.scss'
import './style.scss'

import Image1 from './assets/image_1.png'
import Image2 from './assets/image_2.png'

export const WhatsWebProject = () => {
    return <div className={'project'}>
        <div className={'project-header'}>
            <div className={'project-header-left'}>
                <h1 className={'project-header-left-title project-pr-title'}>
                    WhatsWeb
                </h1>
                <div className={'project-header-left-sub-title project-sc-title'}>
                    Application de messagerie
                </div>
            </div>

            <div className={'project-header-right project-pr-link'}>
                2021-2023
            </div>
        </div>
        <div className={'project-body'}>
            <div className={'project-body-preview whatsweb'}>

            </div>
            <div className={'project-body-section'}>
                <h2 className={'project-body-section-title project-sc-title'}>
                    Proposition de valeur
                </h2>
                <p className={'project-body-section-text project-pr-text'}>
                    En 2021, Meta a modifié les conditions générales d’utilisation de WhatsApp, réduisant la
                    confidentialité des données des utilisateurs. Face à cette décision unilatérale, nous avons décidé,
                    avec un ami, de recréer une version web de la messagerie WhatsApp, axée sur une meilleure protection
                    des données.
                </p>

                <div className={'project-body-section-images'}>
                    <img src={Image1} alt=""/>
                    <img src={Image2} alt=""/>
                </div>
            </div>
            <div className={'project-body-section'}>
                <h2 className={'project-body-section-title project-sc-title'}>
                    Le Défi
                </h2>
                <p className={'project-body-section-text project-pr-text'}>
                    Pour ce premier projet web, nous avons débuté le développement en PHP. Cependant, nous avons
                    rapidement réalisé que ce langage était peu adapté aux applications web en temps réel. Cela nous a
                    conduits à repenser toute l'architecture back-end en utilisant Node.js, un environnement plus adapté
                    pour gérer les communications en temps réel.
                </p>
            </div>
            <div className={'project-body-section'}>
                <h2 className={'project-body-section-title project-sc-title'}>
                    Solution mise en place
                </h2>
                <p className={'project-body-section-text project-pr-text'}>
                    Grâce à cette transition, nous avons également intégré des fonctionnalités clés :
                </p>
                <ul>
                    <li className={'project-pr-text'}>Sessions actives : plusieurs connexions sur un même compte.</li>
                    <li className={'project-pr-text'}>Système de contacts : ajout, gestion et organisation des
                        utilisateurs.
                    </li>
                    <li className={'project-pr-text'}>Groupes et permissions : gestion collaborative et hiérarchique des
                        utilisateurs.
                    </li>
                </ul>
            </div>

            <div className={'project-body-section'}>
                <h2 className={'project-body-section-title project-sc-title'}>
                    Mes apprentissages
                </h2>
                <p className={'project-body-section-text project-pr-text'}>
                    Ce projet a été une expérience riche, qui m'a permis de développer de nombreuses compétences,
                    notamment :
                </p>
                <ul>
                    <li className={'project-pr-text'}>Travail en équipe et communication efficace.</li>
                    <li className={'project-pr-text'}>Autonomie d’apprentissage, en explorant de nouvelles technologies.</li>
                    <li className={'project-pr-text'}>Gestion des WebSocket pour une messagerie en temps réel.</li>
                    <li className={'project-pr-text'}>Implémentation de notifications dynamiques.</li>
                    <li className={'project-pr-text'}>Gestion et optimisation des bases de données SQL.</li>
                    <li className={'project-pr-text'}>Et bien plus encore.</li>
                </ul>
            </div>
        </div>
        <div className={'project-demo'}>
            <h2 className={'project-demo-title project-sc-title'}>Demo</h2>

            <div className={'project-demo-content'}>
                <div className={'project-demo-content-interactive'}>
                    <div className={'project-pr-text'}><S underline>URL</S>: <a href="https://whatsweb.fr"
                                                                              target={'_blank'}>whatsweb.fr</a></div>
                    <div className={'project-pr-text'}><S underline>Email</S>: <Copy value={'demo@whatsweb.fr'}>demo@whatsweb.fr</Copy></div>
                    <div className={'project-pr-text'}><S underline>Password</S>: <Copy value={'demo1234'}>demo1234</Copy></div>
                </div>

                <h3 className={''}>Ou</h3>

                <div className='project-demo-content-video'>
                    <a href='https://youtu.be/qsX7QknTrW0' target={'_blank'}
                       className={'btn-watch-demo'}>Regarder la vidéo
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.292893 11.2929C-0.0976311 11.6834 -0.0976311 12.3166 0.292893 12.7071C0.683418 13.0976 1.31658 13.0976 1.70711 12.7071L0.292893 11.2929ZM13 0.999999C13 0.447714 12.5523 -8.70777e-07 12 -8.70777e-07L3 -8.70777e-07C2.44772 -8.70777e-07 2 0.447714 2 0.999999C2 1.55228 2.44772 2 3 2H11V10C11 10.5523 11.4477 11 12 11C12.5523 11 13 10.5523 13 10L13 0.999999ZM1.70711 12.7071L12.7071 1.70711L11.2929 0.292892L0.292893 11.2929L1.70711 12.7071Z"
                                fill="white"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
}
