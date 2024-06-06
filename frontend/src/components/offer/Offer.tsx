import React, { useEffect, useRef, useState } from "react";
import classes from './styles.module.scss'
import { useConnectOfferMutation, useGetOfferQuery } from "../../app/services/offer/offerApi";
import { useParams } from "react-router-dom";
import CheckBox from "../common/checkBox/CheckBox";
import { formatReward } from "../../utils/utils";
import { ReactComponent as ArrowIcon } from '../../images/arrowIcon.svg'
import { splitTextByLineCount } from './utils'
import { ReactComponent as ImageIcon } from '../../images/imageIcon.svg'
import { ReactComponent as DownloadIcon } from '../../images/downloadIcon.svg'
import { BaseOfferMediaData } from "../../types/api/offerMediaTypes";
import { ReactComponent as FolderIcon } from "../../images/folderIcon.svg"
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Offer: React.FC = () => {
    const { pk } = useParams();
    const { data: offerData, error, isLoading } = useGetOfferQuery({ pk: pk ? pk : 0 })
    const [isActive, setIsActive] = useState(false)
    const [isRulesOpened, setRulesOpened] = useState(false);
    const [rulesStyle, setRulesStyle] = useState({ height: 0 })
    const [connectOffer] = useConnectOfferMutation();

    const leftPartRef = useRef<HTMLDivElement>(null);
    const rightPartRef = useRef<HTMLDivElement>(null);

    const [leftText, setLeftText] = useState<string>('');
    const [rightText, setRightText] = useState<string>('');

    const [link, setLink] = useState("")

    const user = useSelector((state: RootState) => state.user.user)


    useEffect(() => {
        if (leftPartRef.current && rightPartRef.current) {
            const { leftText, rightText } = splitTextByLineCount(offerData.rules, 10, leftPartRef.current);
            setLeftText(leftText);
            setRightText(rightText);
        }
        if (offerData) {
            console.log(offerData)
            setIsActive(offerData.is_connected)
        }
    }, [offerData]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (isRulesOpened) {
                updateHeight();
            }
        });

        if (leftPartRef.current) {
            resizeObserver.observe(leftPartRef.current);
        }

        if (rightPartRef.current) {
            resizeObserver.observe(rightPartRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [isRulesOpened]);

    const updateHeight = () => {
        const left = leftPartRef.current ? leftPartRef.current.scrollHeight : 0;
        const right = rightPartRef.current ? rightPartRef.current.scrollHeight : 0;
        const height = Math.max(left, right);
        setRulesStyle({ height });
    };

    const toggleRules = () => {
        if (!isRulesOpened) {
            updateHeight();
        } else {
            setRulesStyle({ height: 0 });
        }
        setRulesOpened(!isRulesOpened)
    }

    const generateLink = () => {
        if (!link) {
            const personal_link = `${process.env.REACT_APP_API_BASE_URL}offers/${offerData.pk}/?partner=${user?.pk}`
            setLink(personal_link)
        }
    }

    const SelectIcon = (type: string) => {
        switch (type) {
            case "image": return <ImageIcon className={classes.logo} />
            default: return <FolderIcon className={classes.logo} />
        }
    }

    const handleConnection = async () => {
        try {
            const agreementCheckbox = document.getElementById("agreement") as HTMLInputElement;
            if (agreementCheckbox && agreementCheckbox.checked) {
                await connectOffer({ pk: offerData.pk })
                setIsActive(true)
            }
        } catch (err) {
            console.log(err)
        }
    }


    return offerData ? (
        <>
            <h1 className={classes.content_header}>
                {offerData.name}
            </h1>
            <div className={classes.offer_ver_container}>
                <div className={classes.offer_hor_container}>
                    <div className={`${classes.offer_section_container} ${classes.main} ${classes.first}`}>
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
                            }
                                checked={isActive} />
                            {
                                isActive ?
                                    <button className={classes.active}>
                                        Активен
                                    </button>
                                    :
                                    <button className={classes.big_btn} onClick={handleConnection}>
                                        Подключить
                                    </button>
                            }
                        </div>
                        <div className={classes.img_container}>
                            <img src={offerData.image} />
                        </div>
                    </div>
                    <div className={`${classes.offer_section_container} ${classes.pay}`}>
                        <div className={classes.pay_info_container}>
                            <h1 className={classes.content_header}>
                                Вознаграждение
                            </h1>
                            <div className={classes.pay_info_data_container}>
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
                <div className={classes.offer_ver_container}>
                    <div className={`${classes.offer_section_container} ${classes.resize} ${isRulesOpened ? classes.open : ""}`} >
                        <div className={`${classes.content_resize}`} onClick={toggleRules}>
                            <h1 className={classes.content_header}>
                                Правила оффера
                            </h1>
                            <ArrowIcon className={classes.arrow_container} />
                        </div>
                        <div className={`${classes.info_container} ${classes.hor_container}`} style={rulesStyle}>
                            <span ref={leftPartRef} className={classes.visible}>
                                {leftText}
                            </span>
                            <span ref={rightPartRef} className={rightText ? classes.visible : ""}>
                                {rightText}
                            </span>
                        </div>

                    </div>
                </div>
                <div className={classes.offer_ver_container}>
                    <div className={classes.offer_hor_container}>
                        <div className={`${classes.offer_section_container} ${classes.resize} ${classes.first} ${classes.opened}`}>
                            <div className={`${classes.content_resize}`} onClick={toggleRules}>
                                <h1 className={classes.content_header}>
                                    Прикрепленные файлы
                                </h1>
                            </div>
                            <div className={`${classes.info_container} ${classes.attached_files}`}>
                                {
                                    offerData.medias.map((media: BaseOfferMediaData, index: number) => (
                                        <a key={index} className={classes.item} href={media.src} target="_blank">
                                            <div className={classes.info_container}>
                                                <div className={classes.logo_container}>
                                                    {SelectIcon(media.file_type)}
                                                </div>
                                                {media.alt}
                                            </div>
                                            <DownloadIcon className={classes.logo} />
                                        </a>
                                    ))
                                }
                            </div>

                        </div>
                        <div className={`${classes.offer_section_container} ${classes.resize} ${classes.opened}`}>
                            <div className={`${classes.content_resize}`} onClick={toggleRules}>
                                <h1 className={classes.content_header}>
                                    Мои ссылки
                                </h1>
                            </div>
                            <div className={`${classes.info_container} ${classes.link}`}>
                                <div className={classes.link_caption}>
                                    <span className={classes.section_link} onClick={generateLink}>Сгенерировать</span> <span>быструю ссылку</span>
                                </div>
                                {
                                    link &&
                                    <input value={link} disabled />
                                }
                            </div>

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