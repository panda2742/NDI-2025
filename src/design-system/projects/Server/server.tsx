import '@atoms/project_template/style.scss'

import './style.scss'

import Image1 from './assets/image_1.png'
import Image2 from './assets/image_2.png'

export const ServerProject = () => {
    return <div className={'project'}>
        <div className={'project-header'}>
            <div className={'project-header-left'}>
                <h1 className={'project-header-left-title project-pr-title'}>
                    Home Server
                </h1>
                <div className={'project-header-left-sub-title project-sc-title'}>
                    Application de messagerie
                </div>
            </div>

            <div className={'project-header-right project-pr-link'}>
                Mi 2021
            </div>
        </div>
        <div className={'project-body'}>
            <div className={'project-body-preview server'}>

            </div>
            <div className={'project-body-section'}>
                <h2 className={'project-body-section-title project-sc-title'}>
                    La genèse du projet
                </h2>
                <p className={'project-body-section-text project-pr-text'}>
                    En 2020, alors collégien, je n’avais pas les moyens de souscrire à un abonnement chez un hébergeur professionnel. Pour mon anniversaire, j’ai demandé un mini PC Raspberry Pi 4 avec un objectif clair : en faire un serveur personnel.
                    <br /><br />
                    L’installation était, disons, “artisanale” : un système de refroidissement fait maison et une configuration un peu risquée, puisque j’avais placé mon serveur sur le compteur électrique. Avec le recul, j’ai pris conscience des dangers liés à cette installation, mais c’était un excellent apprentissage !
                </p>

                <div className={'project-body-section-images'}>
                    <img src={Image1} alt=""/>
                    <img src={Image2} alt=""/>
                </div>
            </div>
            <div className={'project-body-section'}>
                <h2 className={'project-body-section-title project-sc-title'}>
                    Mes premières réalisations :
                </h2>
                <p className={'project-body-section-text project-pr-text'}>
                    J’ai développé plusieurs scripts utiles, comme :
                </p>
                <ul>
                    <li className={'project-pr-text'}>La mise à jour automatique de l’adresse IP associée à mon nom de domaine (car je ne disposais pas d’une IP statique).</li>
                    <li className={'project-pr-text'}>Un Dashboard pour surveiller l’utilisation des ressources du serveur (CPU, mémoire, etc.).
                        J’ai aussi appris à installer et configurer des applications telles que Nginx ou des outils de partage de fichiers locaux.
                    </li>
                </ul>
            </div>
            <div className={'project-body-section'}>
                <h2 className={'project-body-section-title project-sc-title'}>
                    L’évolution
                </h2>
                <p className={'project-body-section-text project-pr-text'}>
                    Avec le temps, les besoins ont évolué : la demande croissante en puissance de calcul pour mes
                    applications et mes projets m’a poussé à migrer vers une machine plus performante.
                    <br/>
                    J’ai également installé Pterodactyl, une plateforme permettant de gérer facilement des serveurs
                    dédiés pour Minecraft, d’autres jeux en ligne, ou même des bots. Cet outil m’a permis de simplifier
                    la gestion et la maintenance de mes serveurs tout en explorant de nouveaux usages.
                    <br/><br/>
                    Mes apprentissages clés :
                </p>
                <ul>
                    <li className={'project-pr-text'}>Mise en place et gestion d’un serveur (configuration SSH, sécurité, etc.).</li>
                    <li className={'project-pr-text'}>Les bases du réseau (IP publique, IP locale, ouverture et redirection des ports, DNS, etc.).</li>
                    <li className={'project-pr-text'}>L’installation et la gestion d’applications sur serveur, comme Pterodactyl pour gérer des serveurs de jeux ou des bots.</li>
                </ul>
            </div>
        </div>
        <div className={'project-demo'}>
            <h2 className={'project-demo-title project-sc-title'}>Demo</h2>

            <div className={'project-demo-content'}>
                <div></div>
                <div className='project-demo-content-video'>
                    <a href='https://youtu.be/_tOfMbJ6Ij4' target={'_blank'}
                       className={'btn-watch-demo'}>Regarder la vidéo
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
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
}
