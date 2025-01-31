import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMedal, updateMedal } from '../redux/slices/handleMedalSlice';
import supabase from '../supabaseClient';

const MedalForm = ({ medalList }) => {
    const dispatch = useDispatch();

    const [newMedalList, setNewMedalList] = useState({
        country: '',
        gold: 0,
        silver: 0,
        bronze: 0,
    });

    const resetForm = () => {
        setNewMedalList({
            country: '',
            gold: 0,
            silver: 0,
            bronze: 0,
        });
    };
    const handleChangeValue = (e) => {
        const valueId = e.target.id;
        let value = e.target.value;
        if (valueId === 'country') {
            value = value.trim();
        } else {
            value = Number(value);
        }
        setNewMedalList({ ...newMedalList, [valueId]: value });
    };
    const addData = async (newMedalList) => {
        const { data, error } = await supabase.from('MEDAL_LIST').insert({
            country: newMedalList.country,
            gold: newMedalList.gold,
            silver: newMedalList.silver,
            bronze: newMedalList.bronze,
        });
        if (error) {
            console.error('error => ', error);
        } else {
            console.log('data => ', data);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (medalList.some((medalList) => medalList.country === newMedalList.country)) {
            alert('이미 추가된 국가입니다.');
            resetForm();
            return;
        }
        dispatch(addMedal(newMedalList));
        addData(newMedalList);
        resetForm();
    };
    const updateData = async (newMedalList) => {
        const { data, error } = await supabase
            .from('MEDAL_LIST')
            .update({
                country: newMedalList.country,
                gold: newMedalList.gold,
                silver: newMedalList.silver,
                bronze: newMedalList.bronze,
            })
            .eq('country', newMedalList.country);
        if (error) {
            console.error('error => ', error);
        } else {
            console.log('data => ', data);
        }
    };
    const handleClickBtn = (e) => {
        e.preventDefault();
        const updateIndex = medalList.findIndex((medalList) => medalList.country === newMedalList.country);
        if (updateIndex === -1) {
            alert('메달 리스트에 존재하지 않는 국가입니다. 국가를 추가해주세요.');
            resetForm();
            return;
        }
        dispatch(updateMedal({ idx: updateIndex, value: newMedalList }));
        updateData(newMedalList);
        resetForm();
    };
    return (
        <form onSubmit={handleSubmit}>
            <input id="country" type="text" value={newMedalList.country} onChange={handleChangeValue} required />
            <input id="gold" type="number" value={newMedalList.gold} onChange={handleChangeValue} required />
            <input id="silver" type="number" value={newMedalList.silver} onChange={handleChangeValue} required />
            <input id="bronze" type="number" value={newMedalList.bronze} onChange={handleChangeValue} required />
            <button type="submit">add</button>
            <button onClick={handleClickBtn}>update</button>
        </form>
    );
};

export default MedalForm;
