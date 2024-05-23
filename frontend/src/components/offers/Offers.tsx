import React, { useEffect, useState } from "react";
import classes from './styles.module.scss'
import { useGetAllOfferCategoriesQuery } from "../../app/services/offer/offerCategoryApi";
import { useLazyGetAllOffersQuery } from "../../app/services/offer/offerApi";
import { FullOfferData } from "../../types/api/offerTypes";
import OfferCard from "./offerCard/OfferCard";

const defaultCard = {
    pk: 0,
    name: "",
    reward_from: "",
    reward_to: "",
    image: "",
    target_action_data: { name: "" },
    dummy: true,
}

const Offers: React.FC = () => {
    const { data: mountCategories, error: categoriesError, isLoading: categoriesIsLoading } = useGetAllOfferCategoriesQuery();
    const [categories, setCategories] = useState<{ pk: number, name: string }[]>([])
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [getOffers, { error: offersError, isLoading: offersIsLoading }] = useLazyGetAllOffersQuery();
    const [offers, setOffers] = useState<FullOfferData[]>([])

    const allCategories = { pk: 0, name: 'Все офферы' };

    useEffect(() => {
        if (mountCategories) {
            const combinedCategories = [allCategories, ...mountCategories]; // Вставляем свою категорию в начало
            setCategories(combinedCategories);
            if (combinedCategories.length > 0) {
                const defaultCategoryPk = combinedCategories[0].pk;
                setActiveCategory(defaultCategoryPk);
                fetchOffers(defaultCategoryPk);
            }
        }
    }, [mountCategories])

    const fetchOffers = async (categoryId: number) => {
        try {
            const response = await getOffers({ category_pk: categoryId }).unwrap();
            setOffers(response);
        } catch (error) {
            setOffers([])
        }
    };

    const handleCategoryClick = async (categoryId: number) => {
        await fetchOffers(categoryId)
        setActiveCategory(categoryId);
    };

    const chunkArray = (arr: any[], size: number) => {
        const newArr = arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);
        if (offers.length % size) {
            newArr[newArr.length - 1].push(defaultCard)
        }
        return newArr
    };

    const pairedOffers = chunkArray(offers, 2);


    return (
        <>
            <div className={classes.offers_controls_container}>
                <h1 className={classes.content_header}>
                    Офферы
                </h1>
                <div className={classes.offers_types_container}>
                    {categories.map((category) => (
                        <button
                            key={category.pk}
                            className={`${classes.offer_type} ${activeCategory === category.pk ? classes.active : ''}`}
                            onClick={() => handleCategoryClick(category.pk)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className={classes.offers_vertical_container}>
                {
                    offers.length > 0 ?
                        pairedOffers.map((pair: FullOfferData[], index: number) => (
                            <div key={index} className={classes.horizontal_container}>
                                {pair.map((offer, offerIndex) => (
                                    <OfferCard
                                        key={offerIndex}
                                        pk={offer.pk}
                                        name={offer.name}
                                        reward_from={offer.reward_from}
                                        reward_to={offer.reward_to}
                                        image={offer.image}
                                        target_action={offer.target_action_data.name}
                                        dummy={offer.pk === 0 }
                                    />
                                ))}
                            </div>
                        ))
                        :
                        <>
                            К сожалению, ничего не нашлось
                        </>
                }
            </div>
        </>
    )
}


export default Offers
