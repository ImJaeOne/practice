import { createSlice } from "@reduxjs/toolkit";


const initialState = [];

const handleMedalSlice = createSlice({
    name: 'medalLists',
    initialState,
    reducers:{
        fetchMedal: (state, action) => {
            return action.payload
        },
        addMedal: (state, action) => {
            return [...state, action.payload];
        },
        updateMedal: (state, action) => {
            return state.map((medal, idx) =>
                idx === action.payload.idx ? action.payload.value : medal
            );
        },
        deleteMedal: (state,action) => {
            return [...state].filter((list) => list.country !== action.payload.country)
        },
        sortMedal : (state, action) => {
            if (action.payload.mode === 'gold') {
                return [...state].sort((a, b) => b.gold - a.gold);
            }
            if (action.payload.mode === 'total') {
                return [...state].sort((a, b) => b.gold + b.silver + b.bronze - (a.gold + a.silver + a.bronze));
            }
            return state;
        }
    }
})

export const {fetchMedal, addMedal, updateMedal, deleteMedal, sortMedal} = handleMedalSlice.actions;
export default handleMedalSlice.reducer;