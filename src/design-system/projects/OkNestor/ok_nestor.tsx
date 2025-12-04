import '@atoms/project_template/style.scss'
import './style.scss'

import Image1 from './assets/image_1.png'
import Image2 from './assets/image_2.png'

export const OkNestorProject = () => {
    return <div className={'project'}>
        <div className={'project-header'}>
            <div className={'project-header-left'}>
                <h1 className={'project-header-left-title project-pr-title'}>
                    OkNestor
                </h1>
                <div className={'project-header-left-sub-title project-sc-title'}>
                    Assistant vocal IA
                </div>
            </div>

            <div className={'project-header-right project-pr-link'}>
                Été 2023
            </div>
        </div>
        <div className={'project-body'}>
            <div className={'project-body-preview oknestor'}>

            </div>
            <div className={'project-body-section'}>
                <h2 className={'project-body-section-title project-sc-title'}>
                    L’origine du projet :
                </h2>
                <p className={'project-body-section-text project-pr-text'}>
                    L’été 2023 a marqué un tournant dans l’adoption massive de l’Intelligence Artificielle. Pourtant,
                    aucun des outils populaires comme Siri, Alexa, ou OkGoogle ne proposait encore de tirer parti des IA
                    avancées pour une interaction naturelle par la voix.
                    <br/><br/>
                    C’est face à ce constat que nous avons eu l’idée de développer OkNestor, un assistant vocal novateur
                    capable d'exploiter la puissance de ChatGPT pour offrir une expérience utilisateur inédite.
                </p>

                <div className={'project-body-section-images'}>
                    <img src={Image1} alt=""/>
                    <img src={Image2} alt=""/>
                </div>
            </div>
            <div className={'project-body-section'}>
                <h2 className={'project-body-section-title project-sc-title'}>
                    Notre proposition de valeur :
                </h2>
                <p className={'project-body-section-text project-pr-text'}>
                    Allier la reconnaissance vocale à l’IA pour enrichir l’expérience des assistants vocaux. Avec
                    OkNestor, l’assistant vocal devient bien plus qu’un simple outil : c’est une véritable interface
                    intelligente et humaine, à l’écoute et capable de répondre à vos besoins de manière fluide.
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
                    <li className={'project-pr-text'}>Reconnaissance vocale précise : Détecter efficacement la voix de
                        l’utilisateur pour initier une interaction sans friction.
                    </li>
                    <li className={'project-pr-text'}>Utilisation de l’API OpenAI : Connecter l’assistant à ChatGPT pour
                        fournir des réponses contextuelles et pertinentes en temps réel.
                    </li>
                    <li className={'project-pr-text'}>Synthèse vocale humaine : Intégrer la technologie de voix réaliste
                        d’ElevenLabs pour une sortie vocale qui imite parfaitement l’intonation et le ton naturels.
                    </li>
                </ul>
            </div>

            <div className={'project-body-section'}>
                <p className={'project-body-section-text project-pr-text'}>
                    OkNestor, c’est l’avenir des assistants vocaux, enrichi par la puissance des technologies les plus
                    avancées.
                </p>
            </div>
        </div>
        <div className={'project-demo'}>
            <h2 className={'project-demo-title project-sc-title'}>Demo</h2>

            <div className={'project-demo-content'}>
                <div></div>
                <div className='project-demo-content-video'>
                    <a href='https://youtu.be/O9ZZR2-Mp3c' target={'_blank'}
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
