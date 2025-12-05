import { Copy, S } from '@atoms/project_template/project_template.tsx';
import '@atoms/project_template/style.scss'
import './style.scss'

// import test from './assets/image_1.png'

// import { useToast } from '#/lib/toast';
// import { svc } from '#/services/ScoreService';

export const WhatsWebProject = () => {
    // const toast = useToast(); // <-- Appelle le hook ici !

    return <div className={'project'}>
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
                    <a
                        onClick={async (e) => {
                            e.preventDefault();
                            // console.log(await svc.createScore({
                            //     player_name: "The Goat 69",
                            //     score: parseInt((Math.random() * 1000).toFixed(0))
                            // }))
                            // console.log(await svc.getScores());
                            // console.log((await svc.getRank("The Goat 69")).best_score);
                            // toast.success("Liam", (Math.random() * 1000).toString(), <img src={test} />);
                        }}
                        className={'btn-watch-demo'}
                    >
                        Regarder la vidéo
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.292893 11.2929C-0.0976311 11.6834 -0.0976311 12.3166 0.292893 12.7071C0.683418 13.0976 1.31658 13.0976 1.70711 12.7071L0.292893 11.2929ZM13 0.999999C13 0.447714 12.5523 -8.70777e-07 12 -8.70777e-07L3 -8.70777e-07C2.44772 -8.70777e-07 2 0.447714 2 0.999999C2 1.55228 2.44772 2 3 2H11V10C11 10.5523 11.4477 11 12 11C12.5523 11 13 10.5523 13 10L13 0.999999ZM1.70711 12.7071L12.7071 1.70711L11.2929 0.292892L0.292893 11.2929L1.70711 12.7071Z"
                                fill="white" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
}
