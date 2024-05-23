import React from 'react';
import classes from './styles.module.scss'

interface OfferCardProps {
    pk: string | number;
    name: string;
    reward_from: number | null;
    reward_to: number | null;
    image: string;
    target_action: string;
    dummy: boolean
}

const OfferCard: React.FC<OfferCardProps> = ({ pk, name, reward_from, reward_to, image, target_action, dummy }) => {

    const addSpaces = (num: string | number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const formatReward = () => {
        const rew_from = reward_from ? reward_from : null;
        const rew_to = reward_to ? reward_to : null;

        if (rew_from !== null && rew_to !== null) {
            if (rew_from === rew_to) {
                return `${addSpaces(rew_from)} ₽`;
            } else {
                return `${addSpaces(rew_from)} - ${addSpaces(rew_to)} ₽`;
            }
        } else if (rew_from !== null) {
            return `от ${addSpaces(rew_from)} ₽`;
        } else if (rew_to !== null) {
            return `до ${addSpaces(rew_to)} ₽`;
        } else {
            return 'Не указано';
        }
    };

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
                                Вознаграждение: <span>{formatReward()}</span>
                            </div>
                            <div className={classes.info}>
                                Целевое действие: <span>{target_action}</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.controls_container}>
                        <button className={`${classes.secondary}`}>
                            Подробнее
                        </button>
                        <button>
                            Подключить
                        </button>
                    </div>
                </div>
            </div >
        )
}


export default OfferCard