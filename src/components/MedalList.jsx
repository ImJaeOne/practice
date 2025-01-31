import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteMedal } from '../redux/slices/handleMedalSlice';
import supabase from '../supabaseClient';

const MedalList = ({ medalList }) => {
    const dispatch = useDispatch();
    const deleteData = async (country) => {
        const { data, error } = await supabase
            .from('MEDAL_LIST')
            .delete()
            .eq('country', country);
        if (error) {
            console.error('error => ', error);
        } else {
            console.log('data => ', data);
        }
    };
    const handleDeleteBtn = (country) => {
        dispatch(deleteMedal({ country }));
        deleteData(country);
    };
    return (
        <div>
            {medalList?.length === 0 ? (
                <div>등록된 국가가 없습니다.</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>국가명</th>
                            <th>금메달</th>
                            <th>은메달</th>
                            <th>동메달</th>
                            <th>액션</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medalList.map((medalList) => {
                            return (
                                <tr key={medalList.country}>
                                    <td>{medalList.country}</td>
                                    <td>{medalList.gold}</td>
                                    <td>{medalList.silver}</td>
                                    <td>{medalList.bronze}</td>
                                    <td>
                                        <button onClick={() => handleDeleteBtn(medalList.country)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MedalList;
