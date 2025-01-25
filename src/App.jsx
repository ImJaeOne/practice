import { useState } from 'react';
import './App.css';

function App() {
    const [medalLists, setMedalLists] = useState([]);

    const [newMedalList, setNewMedalList] = useState({
        country: '',
        gold: 0,
        silver: 0,
        bronze: 0,
    });

    const[mode, setMode] = useState('gold');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (medalLists.some((medalList) => medalList.country === newMedalList.country)) {
            alert('이미 추가된 국가입니다.');
            setNewMedalList({
                country: '',
                gold: 0,
                silver: 0,
                bronze: 0,
            });
            return;
        }

        setMedalLists((prev) => [...prev, newMedalList]);
        setNewMedalList({
            country: '',
            gold: 0,
            silver: 0,
            bronze: 0,
        });
    };

    const handleClickBtn = (e) => {
        e.preventDefault();
        const updateIndex = medalLists.findIndex((medalList) => medalList.country === newMedalList.country);
        if (updateIndex === -1) {
            alert('메달 리스트에 존재하지 않는 국가입니다. 국가를 추가해주세요.');
            setNewMedalList({
                country: '',
                gold: 0,
                silver: 0,
                bronze: 0,
            });
            return;
        }
        const updatedMedalList = [...medalLists];
        updatedMedalList[updateIndex] = newMedalList;
        setMedalLists(updatedMedalList);
        setNewMedalList({
            country: '',
            gold: 0,
            silver: 0,
            bronze: 0,
        });
    };

    const handleDeleteBtn = (country) => {
        const updatedMedalList = medalLists.filter((medalList) => medalList.country !== country);
        setMedalLists(updatedMedalList);
    };
    

    const handleChangeMode = () => {
      setMode((prev) => prev === 'gold' ? 'total' : 'gold');
    }
    
    const sortByModeLists = (mode) => {
      if(mode === 'gold'){
        return [...medalLists].sort((a, b) => b.gold - a.gold);
      }
      if(mode === 'total'){
        return[...medalLists].sort((a, b) => (b.gold + b.silver + b.bronze) - (a.gold + a.silver + a.bronze));
      }
    }

    return (
        <>
            <header>
                <h2>Olympic Medal Tricker</h2>
            </header>
            <form onSubmit={handleSubmit}>
                <input id="country" type="text" value={newMedalList.country} onChange={handleChangeValue} required/>
                <input id="gold" type="number" value={newMedalList.gold} onChange={handleChangeValue} required/>
                <input id="silver" type="number" value={newMedalList.silver} onChange={handleChangeValue} required/>
                <input id="bronze" type="number" value={newMedalList.bronze} onChange={handleChangeValue} required/>
                <button type="submit">add</button>
                <button onClick={handleClickBtn}>update</button>
            </form>
            <div>
                <label>
                    <input checked={mode === 'gold'} onChange={handleChangeMode} type="radio" />
                    Gold
                </label>

                <label>
                    <input checked={mode === 'total'} onChange={handleChangeMode} type="radio" />
                    Total
                </label>
                {medalLists.length === 0 ? (
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
                            {sortByModeLists(mode).map((medalList) => {
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
        </>
    );
}

export default App;
