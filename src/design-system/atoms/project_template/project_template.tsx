import './style.scss'
import {PropsWithChildren, useRef} from "react";

export const Copy = ({value, children}: PropsWithChildren<{value: string}>) => {
    const svgCopyRef = useRef<SVGSVGElement>(null);
    const svgCopiedRef = useRef<SVGSVGElement>(null);

    const handleClick = () => {
        navigator.clipboard.writeText(value)

        if (svgCopyRef.current && svgCopiedRef.current) {
            svgCopyRef.current.style.display = 'none';
            svgCopiedRef.current.style.display = 'block';

            // Remet l'icône de copie après 2 secondes
            setTimeout(() => {
                svgCopyRef.current!.style.display = 'block';
                svgCopiedRef.current!.style.display = 'none';
            }, 800);
        }
    }

    return <div onClick={handleClick} className={'copy-text-component'} title={'Click pour copier !'}>
        {children}
        <div className="icon">
            <svg ref={svgCopyRef} width="14" height="14" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="5" width="15" height="15" rx="3" stroke="white" strokeWidth="2"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M8 2H17C18.1046 2 19 2.89543 19 4V13C19 14.1046 18.1046 15 17 15V17C19.2091 17 21 15.2091 21 13V4C21 1.79086 19.2091 0 17 0H8C5.79086 0 4 1.79086 4 4H6C6 2.89543 6.89543 2 8 2Z"
                      fill="white"/>
            </svg>

            <svg ref={svgCopiedRef} style={{display: 'none'}} width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5L4 9L12 1.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        </div>
    </div>;
}

interface ISpanStyle {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
}
export const S = ({bold = false, italic = false, underline = false, children}: PropsWithChildren<ISpanStyle>) => {
    return <span className={`${bold ? 'bold' : ''} ${italic ? 'italic' : ''} ${underline ? 'underline' : ''}`}>{children}</span>;
}

export const ProjectTemplate = () => {
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
            <div className={'project-body-preview'}>

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
                    <img src="" alt=""/>
                    <img src="" alt=""/>
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
                    <a href='https://www.youtube.com/watch?v=qsX7QknTrW0' target={'_blank'}
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
