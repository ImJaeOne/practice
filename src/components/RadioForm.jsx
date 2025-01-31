import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortMedal } from '../redux/slices/handleMedalSlice';

const RadioForm = () => {
    const [mode, setMode] = useState('gold');
    const handleChangeMode = (e) => {
        setMode(e.target.value);
        dispatch(sortMedal({ mode: e.target.value }));
    };
    const dispatch = useDispatch();

    return (
        <div>
            <label>
                <input value="gold" checked={mode === 'gold'} onChange={handleChangeMode} type="radio" />
                Gold
            </label>

            <label>
                <input value="total" checked={mode === 'total'} onChange={handleChangeMode} type="radio" />
                Total
            </label>
        </div>
    );
};

export default RadioForm;
