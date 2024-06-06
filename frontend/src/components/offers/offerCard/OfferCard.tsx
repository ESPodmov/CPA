import React from 'react';
import classes from './styles.module.scss'
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/Routes';
import { addSpaces, formatReward } from '../../../utils/utils';

interface OfferCardProps {
    pk: string | number;
    name: string;
    reward_from: number | null;
    reward_to: number | null;
    image: string;
    target_action: string;
    dummy: boolean;
    isConnected: boolean
}

const OfferCard: React.FC<OfferCardProps> = ({ pk, name, reward_from, reward_to, image, target_action, dummy, isConnected }) => {
    const navigate = useNavigate();



    const handleAboutBtnClick = () => {
        navigate(routes.offer.path.replace(":pk", String(pk)))
    }

    return dummy ?
        (
            <div className={classes.dummy_container}></div>
        )
        :
        (
            < div className={classes.offer_card_container} >
                <img className={classes.offer_img_conainer} src={image} alt={name} />
                <div className={classes.info_controls_container}>
                    <div className={classes.info_container}>
                        <h1>
                            {name}
                        </h1>
                        <div className={classes.datas_container}>
                            <div className={classes.info}>
                                Вознаграждение: <span>{formatReward(reward_from, reward_to)}</span>
                            </div>
                            <div className={classes.info}>
                                Целевое действие: <span>{target_action}</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.controls_container}>
                        <button className={`${classes.secondary}`} onClick={handleAboutBtnClick}>
                            Подробнее
                        </button>
                        {
                            isConnected ?
                                <button className={classes.active}>
                                    Активен
                                </button>
                                :
                                <button onClick={handleAboutBtnClick}>
                                    Подключить
                                </button>
                        }
                    </div>
                </div>
            </div >
        )
}


export default OfferCard