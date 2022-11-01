import React from 'react'
import classes from './ListItem.module.css'

import { useDispatch } from 'react-redux';
import { listActions } from '../store/list-slice';
const images = require.context('../Assests/images', true)

function ListItem({ item }) {
    const dispatch = useDispatch();

    const handleFilter = (item) => {
        const newFilter = {
            id: item,
            value: item
        }
        dispatch(listActions.addFilter(newFilter));
        dispatch(listActions.filterList());
    }

    return (
        <div className={`${classes.list__item} ${ item.featured ? classes.featured : ''}`}>
            <div className={classes.list__item__info}>
                <div className={classes.list__item__info__logo}>
                    <img src={`${images(`./${item.logo}`)}`} alt="logo" />
                </div>
                <div className={classes.list__item__info__details}>
                    <div className={classes.list__item__info__details__company}>
                        <h3>{item.company}</h3>
                        {item.new && <span className={classes.new}>New!</span>}
                        {item.featured && <span className={classes.featured}>Featured</span>}
                    </div>
                    <div className={classes.list__item__info__details__position}>
                        <h2>{item.position}</h2>
                    </div>
                    <div className={classes.list__item__info__details__details}>
                        <span>{item.postedAt}</span>
                        <span>{item.contract}</span>
                        <span>{item.location}</span>
                    </div>
                </div>

                <div className={classes.list__item__info__tags}>
                    <span onClick={() => handleFilter(item.role)}>{item.role}</span>
                    <span onClick={() => handleFilter(item.level)}>{item.level}</span>
                    {
                        // loop through the languages array and display each item
                        item.languages?.map((language) => {
                            return (
                                <span key={language} onClick={() => handleFilter(language)}>{language}</span>
                            )
                        })
                    }
                    {
                        item.tools?.map((tool) => {
                            return (
                                <span key={tool} onClick={() => handleFilter(tool)}>{tool}</span>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ListItem
