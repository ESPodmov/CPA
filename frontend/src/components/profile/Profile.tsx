import React, { useRef, useState, useEffect, FormEvent } from 'react';
import classes from './styles.module.scss'
import ProfileInput from './profileInput/ProfileInput';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import ProfileAction from './profileAction/ProfileAction';
import { ReactComponent as deleteIcon } from '../../images/deleteIcon.svg'
import { ReactComponent as editIcon } from '../../images/editIcon.svg'
import { ReactComponent as emailIcon } from '../../images/emailIcon.svg'
import { ReactComponent as userIcon } from '../../images/userIcon.svg'
import ProfileTooltip from './profileTooltip/ProfileTooltip';
import { useLazyGetUserQuery, useUpdateUserMutation } from '../../app/services/userApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../app/futures/user/userSlice';

const Profile: React.FC = () => {
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user.user)

    const hasData: boolean = !!(user?.phone && user?.name)
    const [tabs, setTabs] = useState({ profile: hasData, profileEdit: !hasData })

    const [fio, setFio] = useState(user ? user.fio : "")
    const [phone, setPhone] = useState(user?.phone ? `+${user.phone}` : "")
    const [link, setLink] = useState(user ? user.link : "")
    const [tgUsername, setTgUsername] = useState(user?.tgUsername ? `@${user.tgUsername}` : "")
    const [name, setName] = useState(user ? user.name : "")
    const [activity, setActivity] = useState(user ? user.activity : "")

    const [showTooltip, setShowTooltip] = useState(false)
    const [tooltipTarget, setTooltipTarget] = useState<HTMLElement | null>(null)
    const [tootipCaption, setTooltipCaption] = useState("")
    const tooltipRefer = useRef<HTMLDivElement>(null)

    const formRef = useRef<HTMLFormElement>(null);

    const [nameInputError, setNameInputError] = useState("");
    const [phoneInputError, setPhoneInputError] = useState("");

    const [updateUser] = useUpdateUserMutation();
    const [getUser, { data, error }] = useLazyGetUserQuery();


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showTooltip && tooltipRefer.current && !tooltipRefer.current.contains(event.target as Node) &&
                tooltipTarget && !tooltipTarget.contains(event.target as Node)) {
                setShowTooltip(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    })


    const onFioChange = (value: string) => {
        setFio(value)
    }

    const onPhoneChange = (value: string) => {
        setPhone(value)
        setPhoneInputError("")
    }

    const onLinkChange = (value: string) => {
        setLink(value)
    }

    const onTgUsernameChange = (value: string) => {
        setTgUsername(value)
    }

    const onNameChange = (value: string) => {
        setName(value)
        setNameInputError("")
    }

    const onActivityChange = (value: string) => {
        setActivity(value)
    }

    const closeTooltip = () => {
        setShowTooltip(false)
    }

    const toggleTooltip = (target: HTMLElement | null, caption: string) => {
        if (showTooltip) {
            setShowTooltip(false)
        } else {
            setTooltipTarget(target)
            setTooltipCaption(caption)
            setShowTooltip(true)
        }
    }

    const validateForm = (data: { [k: string]: FormDataEntryValue }) => {
        let validated = true
        if (!data.hasOwnProperty('phone')) {
            setPhoneInputError("Телефон является обязательным полем")
            validated = false
        }

        if (!data.hasOwnProperty('name')) {
            setNameInputError("Название партнера/агентства является обязательным полем")
            validated = false
        }

        return validated
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (formRef.current) {
            const data: { [key: string]: any } = {};

            const elements = formRef.current.elements as HTMLFormControlsCollection;
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                if (element.name && element.value !== "" && (element.type !== 'submit' && element.type !== 'button')) {
                    data[element.name] = element.value;
                }
            }
            console.log('Form Data:', data);

            if (!validateForm(data)) {
                return
            }


            try {
                const response = await updateUser(data).unwrap();
                console.log(response)
                const userData = await getUser().unwrap();
                dispatch(setUser(userData))
            } catch (error) {
                console.log(error)
            }
        }
    }

    const getTabClassName = (isActive: boolean) => {
        return `${classes.profile_tab} ${isActive ? classes.active : ""}`
    }

    const handleTabChange = (tabName: string) => {
        return () => {
            console.log("in switch")
            switch (tabName) {
                case "profile":
                    setTabs({ profile: true, profileEdit: false })
                    break
                case "profileEdit":
                    setTabs({ profileEdit: true, profile: false })
                    break

            }
        }
    }

    const inputs = [
        [
            {
                placeholder: 'Фамилия Имя Отчество',
                changable: true,
                value: fio,
                name: 'fio',
                setChange: onFioChange
            },
            {
                placeholder: 'Телефон*',
                changable: user?.phone ? false : true,
                value: phone,
                name: 'phone',
                setChange: onPhoneChange,
                caption: 'Введите телефон в формате +7 000 000-00-00',
                error: phoneInputError,
            }
        ],
        [
            {
                placeholder: 'Ссылка на основной сайт',
                changable: true,
                value: link,
                name: 'link',
                setChange: onLinkChange
            },
            {
                placeholder: 'Ссылка на аккаунт телеграмм',
                changable: true,
                value: tgUsername,
                name: 'tg_username',
                setChange: onTgUsernameChange
            }
        ],
        [
            {
                placeholder: 'Название партнера/агентства*',
                changable: user?.name ? false : true,
                value: name,
                name: 'name',
                setChange: onNameChange,
                caption: "Пожалуйста, используйте только латинские буквы, цифры и дефисы",
                error: nameInputError,
            },
            {
                placeholder: 'Род деятельности',
                changable: true,
                value: activity,
                name: 'activity',
                setChange: onActivityChange
            }
        ]
    ];


    const actions = [
        {
            icon: deleteIcon,
            text: "Удаление аккаунта",
            caption: "удалить аккаунт",
        },
        {
            icon: editIcon,
            text: "Изменение пароля",
            caption: "изменить пароль",
        },
        {
            icon: emailIcon,
            text: "Изменение email",
            caption: "изменить email",
        },
        {
            icon: userIcon,
            text: "Изменение телефона/Названия партнера",
            caption: "изменить телефон и/или название партнера/агентства",
        },
    ]


    return (
        <>
            <h1 className={classes.content_header}>
                Профиль
            </h1>
            <div className={classes.profile_tabs_container}>
                <span className={getTabClassName(tabs.profile)} onClick={handleTabChange("profile")}>
                    Мой профиль
                </span>
                <span className={getTabClassName(tabs.profileEdit)} onClick={handleTabChange("profileEdit")}>
                    Изменить профиль
                </span>
            </div>
            {
                tabs.profileEdit &&
                <form className={classes.edit_profile_form} onSubmit={handleSubmit} ref={formRef}>
                    <div className={classes.edit_profile_container}>
                        <div className={classes.edit_profile__input_container}>
                            {
                                inputs.map((pair, index) => (
                                    <div key={index} className={classes.horizontal_group}>
                                        {pair.map((inputData, idx) => (
                                            <ProfileInput
                                                key={idx}
                                                placeholder={inputData.placeholder}
                                                changable={inputData.changable}
                                                value={inputData.value}
                                                name={inputData.name}
                                                setChange={inputData.setChange}
                                                caption={inputData.caption}
                                                error={inputData.error}
                                            />
                                        ))}
                                    </div>
                                ))
                            }
                        </div>
                        <div className={classes.edit_profile__actions_container}>
                            {
                                actions.map((action, index) => (
                                    <ProfileAction
                                        key={index}
                                        caption={action.caption}
                                        text={action.text}
                                        Icon={action.icon}
                                        onClick={toggleTooltip}
                                    />
                                ))
                            }
                            {
                                showTooltip &&
                                <ProfileTooltip target={tooltipTarget} refer={tooltipRefer} caption={tootipCaption} close={closeTooltip} />
                            }
                        </div>
                    </div>
                    <button className={classes.big_btn} type='submit'>
                        Сохранить
                    </button>
                </form>
            }
            {
                tabs.profile &&
                <>
                    <div className={classes.edit_profile_container}>
                        <div className={classes.edit_profile__input_container}>
                            {
                                inputs.map((pair, index) => (
                                    <div key={index} className={classes.horizontal_group}>
                                        {pair.map((inputData, idx) => (
                                            <ProfileInput
                                                key={idx}
                                                placeholder={inputData.placeholder}
                                                changable={false}
                                                value={inputData.value}
                                                name={inputData.name}
                                                setChange={inputData.setChange}
                                                caption={inputData.caption}
                                                error={inputData.error}
                                            />
                                        ))}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <button onClick={handleTabChange("profileEdit")} className={classes.big_btn}>Изменить профиль</button>
                </>
            }
        </>
    )
}


export default Profile