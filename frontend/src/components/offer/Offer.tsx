import React from "react";
import classes from './styles.module.scss'
import { useGetOfferQuery } from "../../app/services/offer/offerApi";
import { useParams } from "react-router-dom";
import CheckBox from "../common/checkBox/CheckBox";
import { formatReward } from "../../utils/utils";

const Offer: React.FC = () => {
    const { pk } = useParams();
    const { data: offerData, error, isLoading } = useGetOfferQuery({ pk: pk ? pk : 0 })
    console.log(offerData)


    return offerData ? (
        <>
            <h1 className={classes.content_header}>
                {offerData.name}
            </h1>
            <div className={classes.offer_ver_container}>
                <div className={classes.offer_hor_container}>
                    <div className={`${classes.offer_section_container} ${classes.main}`}>
                        <div className={classes.main_info_container}>
                            <h1 className={classes.content_header}>
                                {offerData.name}
                            </h1>
                            <div>
                                {offerData.description}
                            </div>
                            <CheckBox caption={
                                <div className={classes.checkmark_caption}>
                                    <span>Я согласен</span>
                                    <span className={classes.section_link}>с правилами оффера</span>
                                </div>
                            } />
                            <button className={classes.big_btn}>
                                Подключить
                            </button>
                        </div>
                        <div className={classes.img_container}>
                            <img src={offerData.image} />
                        </div>
                    </div>
                    <div className={`${classes.offer_section_container} ${classes.pay}`}>
                        <h1 className={classes.content_header}>
                            Вознаграждение
                        </h1>
                        <div className={classes.pay_info_container}>
                            <span>
                                <span>Целевое действие:</span><span className={classes.main}>{offerData.target_action_data.name}</span>
                            </span>
                            <span>
                                <span>Вознаграждение:</span><span className={classes.main}>{formatReward(offerData.reward_from, offerData.reward_to)}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <></>
    )
}


export default Offer