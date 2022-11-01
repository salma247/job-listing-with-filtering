import React, { useState, useEffect } from 'react'
import classes from './Filter.module.css'

import { listActions } from '../store/list-slice';
import { useSelector, useDispatch } from 'react-redux';

function Filter() {
    const dispatch = useDispatch();

    const filter = useSelector((state) => state.list.filter);
    const [allFilters, setAllFilters] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch('https://react-http-6429f-default-rtdb.firebaseio.com/filter.json');
            const data = await response.json();
            const allFilters = [];
            //[{id: 1, ...}, {id: 2, ...}]
            for (const key in data) {
                allFilters.push(data[key]);
            }
            setAllFilters(allFilters);
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleFilter = (target) => {
        const item = target.value;
        if (item === '0') return;
        const newFilter = {
            id: item,
            value: item
        }
        dispatch(listActions.addFilter(newFilter));
        dispatch(listActions.filterList());

        target.value = '0';
    }

    const handleClose = (item) => {
        dispatch(listActions.removeFilter(item));
        dispatch(listActions.filterList());
    }


    return (
        <div className={classes.filter}>
            <div className={classes.filter__container}>
                {
                    loading && <p>Loading...</p>
                }

                {
                    !loading && 
                        allFilters.map((filter) => {
                            return (
                                <div key={filter.id} className={classes.filter__container__item}>
                                    <div className={classes.filter__container__item__values}>
                                        <select className={classes.filter__container__item__values__select} onChange={(e) => handleFilter(e.target)}>
                                            <option value="0">{filter.name}</option>
                                            {
                                                filter.values.map((item) => {
                                                    return (
                                                        <option key={item.id} value={item.name}>{item.name}</option>
                                                    )
                                                }
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                            )
                        })
                    
                }


                {
                    filter.map((item) =>
                        <div className={classes.filter__tag} key={item.id}>
                            <span>{item.value}</span>
                            <button className={classes.filter__tag__close} onClick={() => handleClose(item)}>X</button>
                        </div>
                    )
                }
            </div>

            <div className={classes.filter__clear}>
                {
                    filter.length > 0 && <button className={classes.filter__clear__button} aria-label="clear-filter" onClick={() => {
                        dispatch(listActions.clearFilter());
                        dispatch(listActions.filterList());
                    }}>Clear</button>
                }
            </div>

        </div>
    )
}

export default Filter
