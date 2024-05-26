export const addSpaces = (num: string | number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const formatReward = (reward_from: number | null, reward_to: number | null) => {
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