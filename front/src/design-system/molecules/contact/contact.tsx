import { PropsWithChildren } from 'react';
import './style.scss'


interface ISpanStyle {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
}
const S = ({bold = false, italic = false, underline = false, children}: PropsWithChildren<ISpanStyle>) => {
    return <span className={`${bold ? 'bold' : ''} ${italic ? 'italic' : ''} ${underline ? 'underline' : ''}`}>{children}</span>;
}


export const Contact = () => {



    return <div className={'contact'}>
        <div className={'contact-list'}>
            <div className={'contact-list-search'}>
                <div className={'contact-list-search-svg'}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.6464 13.3536C12.8417 13.5488 13.1583 13.5488 13.3536 13.3536C13.5488 13.1583 13.5488 12.8417 13.3536 12.6464L12.6464 13.3536ZM10.5 6C10.5 8.48528 8.48528 10.5 6 10.5V11.5C9.03757 11.5 11.5 9.03757 11.5 6H10.5ZM6 10.5C3.51472 10.5 1.5 8.48528 1.5 6H0.5C0.5 9.03757 2.96243 11.5 6 11.5V10.5ZM1.5 6C1.5 3.51472 3.51472 1.5 6 1.5V0.5C2.96243 0.5 0.5 2.96243 0.5 6H1.5ZM6 1.5C8.48528 1.5 10.5 3.51472 10.5 6H11.5C11.5 2.96243 9.03757 0.5 6 0.5V1.5ZM9.14645 9.85355L12.6464 13.3536L13.3536 12.6464L9.85355 9.14645L9.14645 9.85355Z"
                            fill="white"/>
                    </svg>
                </div>

                <input type={'search'} placeholder={'Rechercher'} name={''} id={''} autoComplete={'off'}/>
            </div>
            <div className={'contact-list-az'}>
                <span className={'contact-list-az-letter'}>M</span>
                <hr className={'contact-list-az-hr'}/>
                <ul className={'contact-list-az-list'}>
                    <li className={'active'}><a>Mon <S bold>Contact</S></a></li>
                    <li className={''}><a href={'https://github.com/69Nesta'} target={'_blank'}>Mon <S bold>GitHub</S></a></li>
                    <li className={''}><a href={'https://linkedin.com/in/romeo-petit'} target={'_blank'}>Mon <S bold>Linkedin</S></a></li>
                </ul>
            </div>
        </div>
        <div className={'contact-content'}>
            <div className={'contact-content-banner'}>
                <ul>
                    <li>
                        <a href={'tel:+330664889971'}>
                            <svg width="22" height="21" viewBox="0 0 22 21" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.54876 15.2976L9.86585 15.8493C10.8899 16.0932 10.8849 17.5521 9.85912 17.7888C9.73142 17.8182 9.6108 17.8726 9.50416 17.9488L8.33575 18.7834C7.67056 19.2585 6.93807 19.6315 6.16256 19.89L4.5067 20.442C4.39123 20.4805 4.2703 20.5001 4.14858 20.5001H3.91165C3.5657 20.5001 3.25857 20.2787 3.14917 19.9505C3.05655 19.6727 3.12241 19.3664 3.32107 19.1512L4.64817 17.7135C4.8805 17.4618 5.06999 17.1737 5.2091 16.8607L5.36498 16.51C5.55939 16.0726 5.8998 15.7164 6.32794 15.5023L6.49358 15.4195C6.82009 15.2562 7.19364 15.2131 7.54876 15.2976Z"
                                    fill="white"/>
                                <ellipse cx="11" cy="9.16667" rx="11" ry="8.66667" fill="white"/>
                            </svg>
                            message
                        </a>
                    </li>
                    <li>
                        <a href={'tel:+330664889971'}>
                            <svg width="22" height="21" viewBox="0 0 22 21" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.29043 7.04632L7.316 9.19008C7.14435 9.56769 7.20956 10.0108 7.4827 10.323C8.78982 11.8168 10.2367 13.1824 11.8035 14.401L11.9204 14.4919C12.2972 14.785 12.8192 14.8041 13.2163 14.5393L14.513 13.6748C15.201 13.2162 16.1002 13.2282 16.7757 13.705L19.5211 15.6429C20.4758 16.3168 20.4461 17.7424 19.4641 18.3759L18.5957 18.9362C17.0791 19.9147 15.177 20.0811 13.5136 19.3806C8.87664 17.4282 5.05543 13.9356 2.69501 9.49242L2.12302 8.41573C1.14088 6.567 1.43744 4.29907 2.8619 2.76503L3.46812 2.11218C4.23594 1.28529 5.57226 1.38308 6.21153 2.31293L8.11778 5.08566C8.51519 5.66371 8.58071 6.40771 8.29043 7.04632Z"
                                    fill="white"/>
                            </svg>
                            telephone
                        </a>
                    </li>
                    <li>
                        <a href={'https://linkedin.com/in/romeo-petit'} target={'_blank'}>
                            <svg width="18" height="19" viewBox="0 0 18 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5V16.5C18 17.0304 17.7893 17.5391 17.4142 17.9142C17.0391 18.2893 16.5304 18.5 16 18.5H2C1.46957 18.5 0.960859 18.2893 0.585786 17.9142C0.210714 17.5391 0 17.0304 0 16.5V2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5H16ZM15.5 16V10.7C15.5 9.83539 15.1565 9.0062 14.5452 8.39483C13.9338 7.78346 13.1046 7.44 12.24 7.44C11.39 7.44 10.4 7.96 9.92 8.74V7.63H7.13V16H9.92V11.07C9.92 10.3 10.54 9.67 11.31 9.67C11.6813 9.67 12.0374 9.8175 12.2999 10.0801C12.5625 10.3426 12.71 10.6987 12.71 11.07V16H15.5ZM3.88 6.06C4.32556 6.06 4.75288 5.883 5.06794 5.56794C5.383 5.25288 5.56 4.82556 5.56 4.38C5.56 3.45 4.81 2.69 3.88 2.69C3.43178 2.69 3.00193 2.86805 2.68499 3.18499C2.36805 3.50193 2.19 3.93178 2.19 4.38C2.19 5.31 2.95 6.06 3.88 6.06ZM5.27 16V7.63H2.5V16H5.27Z"
                                    fill="white"/>
                            </svg>
                            linkedin
                        </a>
                    </li>
                    <li>
                        <a href={'mailto:petitromeo74@gmail.com'}>
                            <svg width="24" height="17" viewBox="0 0 24 17" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M21.4544 0.774146C21.0727 0.598162 20.6477 0.5 20.1998 0.5H3.7998C3.32878 0.5 2.8831 0.608555 2.48643 0.802012L10.3936 7.91844C11.1388 8.58918 12.2656 8.60443 13.0287 7.95412L21.4544 0.774146ZM1.08178 2.22854C0.900879 2.61459 0.799805 3.04549 0.799805 3.5V13.5C0.799805 13.9311 0.890736 14.341 1.05447 14.7115L7.81168 8.28546L1.08178 2.22854ZM3.7998 16.5C3.30455 16.5 2.83733 16.38 2.42564 16.1675L9.31279 9.61792C10.7254 10.692 12.6874 10.7055 14.1157 9.64377L21.4377 16.2335C21.0603 16.4047 20.6412 16.5 20.1998 16.5H3.7998ZM22.8829 14.8435C23.0857 14.4393 23.1998 13.983 23.1998 13.5V3.5C23.1998 3.02484 23.0893 2.57548 22.8927 2.1762L15.6581 8.34116L22.8829 14.8435Z"
                                      fill="white"/>
                            </svg>
                            mail
                        </a>
                    </li>
                </ul>
            </div>
            <div className={'contact-content-body'}>
                <div className={'contact-content-body-flex'}>
                    <a href={'tel:+330664889971'} className={'card card-name'}>
                        <h4>Telephone</h4>
                        <span>06 64 88 99 71</span>
                    </a>
                    <a href={'mailto:petitromeo74@gmail.com'} className={'card card-email'}>
                        <h4>Email</h4>
                        <span>petitromeo74@gmail.com</span>
                    </a>
                </div>
                <div className={'contact-content-body-flex'}>
                    <a href={'https://linkedin.com/in/romeo-petit'} target={'_blank'} className={'card card-linkedin'}>
                        <h4>Linkedin</h4>
                        <span>linkedin.com/in/romeo-petit</span>
                    </a>
                    <a href={'https://github.com/69Nesta'} target={'_blank'} className={'card card-email'}>
                        <h4>GitHub</h4>
                        <span>github.com/69Nesta</span>
                    </a>
                </div>
                <a className={'contact-content-body-full card'}
                   href={'https://www.google.fr/maps/place/Annecy/@45.9008323,5.535645,10z/data=!3m1!4b1!4m6!3m5!1s0x478b8fe55861febb:0x6a90ac32b5ab892b!8m2!3d45.9058956!4d6.1259117!16s%2Fg%2F11bc5n2nv3?entry=ttu&g_ep=EgoyMDI1MDEwOC4wIKXMDSoASAFQAw%3D%3D'}
                   target={'_blank'}>
                    <h4>Adresse</h4>
                    <span>France, Haute-Savoie, Annecy - 74000</span>
                </a>
            </div>
            <div className={'contact-content-credit'}>
                &copy; - {new Date().getFullYear()} - Romeo Petit
            </div>
        </div>
    </div>
}
