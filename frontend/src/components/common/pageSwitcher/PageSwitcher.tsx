import React, { useState } from 'react';
import classes from './styles.module.scss'
import { ReactComponent as ArrowIcon } from '../../../images/arrowIcon.svg'

interface PageSwitcherProps {
    totalPages: number;
    performSwitch: Function
}

const PageSwitcher: React.FC<PageSwitcherProps> = ({ totalPages, performSwitch }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const nextPage = async () => {
        await performSwitch(currentPage + 1)
        setCurrentPage(currentPage + 1);

    };

    const prevPage = async () => {
        await performSwitch(currentPage - 1)
        setCurrentPage(currentPage - 1);
    };


    const setPage = async (page: number) => {
        try{
            await performSwitch(page);
        } catch (e) {
            return
        }
        setCurrentPage(page);
    }

    const renderPages = () => {
        const pages = [];

        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + 4);

        if (end - start < 4) {
            start = Math.max(1, end - 4);
        }

        for (let i = start; i <= end; i++) {
            pages.push(
                <button key={i} onClick={() => setPage(i)} className={currentPage === i ? classes.active : ""}>
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className={classes.page_switcher_container}>
            <button onClick={prevPage} disabled={currentPage === 1}>
                <ArrowIcon className={`${classes.arrow} ${classes.left}`} />
            </button>
            <div className={classes.pages_container}>
                {renderPages()}
            </div>
            <button onClick={nextPage} disabled={currentPage === totalPages}>
                <ArrowIcon className={classes.arrow} />
            </button>
        </div>
    );
};

export default PageSwitcher;