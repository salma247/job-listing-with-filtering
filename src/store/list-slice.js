import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    jobs: [],
    filter: [],
    filteredJobs: []
}
//call api to get data
const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        setList(state, action) {
            state.jobs = action.payload;
            state.filteredJobs = action.payload;
        },
        addFilter(state, action) {
            const newFilter = action.payload;
            const existingFilter = state.filter.find(item => item.id === newFilter.id);
            if (!existingFilter) {
                state.filter.push({
                    id: newFilter.id,
                    value: newFilter.value
                });
            }
            else {
                existingFilter.value = newFilter.value;
            }
        },
        removeFilter(state, action) {
            const id = action.payload.id;
            const existingFilter = state.filter.find(item => item.id === id);
            if (existingFilter) {
                state.filter = state.filter.filter(item => item.id !== id);
            }
        },
        clearFilter(state) {
            state.filter = [];
        },
        filterList(state) {
            const filter = current(state.filter);
            const jobs = current(state.jobs);
            
            if (filter.length !== 0) {
                const newFilteredJobs = jobs.filter((job) => {
                    let isMatch = false;
                    for (const item of filter) {
                        console.log(job.languages);
                        if (job.languages?.includes(item.value) || job.tools?.includes(item.value) || job.role === item.value || job.level === item.value) {
                            isMatch = true;
                        }
                    }
                    return isMatch;
                });
                state.filteredJobs = newFilteredJobs;
            }

            else {
                state.filteredJobs = jobs;
            }
        }
    }
});

export const listActions = listSlice.actions;

export default listSlice;