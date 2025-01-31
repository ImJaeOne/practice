import MedalForm from './components/MedalForm';
import RadioForm from './components/RadioForm';
import MedalList from './components/MedalList';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMedal } from './redux/slices/handleMedalSlice';
import supabase from './supabaseClient';
import { useEffect } from 'react';

function App() {
    const medalList = useSelector((state) => state.medalLists);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('MEDAL_LIST').select('*');
            if (error) {
                console.error('error => ', error);
            } else {
                console.log('data => ', data);
                dispatch(fetchMedal(data));
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <header>
                <h2>Olympic Medal Tracker</h2>
            </header>
            <MedalForm medalList={medalList} />
            <RadioForm />
            <MedalList medalList={medalList} />
        </>
    );
}

export default App;
