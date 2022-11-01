import React, { useEffect } from 'react'
import classes from './List.module.css'
import ListItem from './ListItem'

import { useSelector, useDispatch } from 'react-redux';
import { listActions } from '../store/list-slice';

function List() {
    const dispatch = useDispatch();

    const filteredJobs = useSelector((state) => state.list.filteredJobs);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://react-http-6429f-default-rtdb.firebaseio.com/data.json');
            const data = await response.json();
            const allJobs = [];
            //[{id: 1, ...}, {id: 2, ...}]
            for (const key in data) {
                allJobs.push(data[key]);
            }
            dispatch(listActions.setList(allJobs));
            dispatch(listActions.filterList());
        }
        fetchData();
    }, [dispatch]);



    return (
        <div className={classes.list}>
            <div className={classes.list__container}>
                {
                    filteredJobs.map((job) => {
                        return (
                            <ListItem key={job.id} item={job} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default List
