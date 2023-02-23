import React, {useEffect, useState} from 'react';
import './index.scss';
import {Collection} from "./Collection";

function App() {
    const [collections, setCollections] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        fetch("https://63f74ad1e40e087c958b69db.mockapi.io/collections")
            .then(res => res.json())
            .then(json => setCollections(json))
            .catch(err => {
                console.warn(err);
                alert("Ошибка запроса коллекций!");
            });
    }, []);

    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    <li className="active">Все</li>
                    <li>Горы</li>
                    <li>Море</li>
                    <li>Архитектура</li>
                    <li>Города</li>
                </ul>
                <input value={searchValue}
                       onChange={e => setSearchValue(e.target.value)}
                       className="search-input"
                       placeholder="Поиск по названию" />
            </div>
            <div className="content">
                {
                    collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase())).map((collection, index) => <Collection
                        key={index}
                        name={collection.name}
                        images={collection.photos} />)
                }
            </div>
            <ul className="pagination">
                <li>1</li>
                <li className="active">2</li>
                <li>3</li>
            </ul>
        </div>
    );
}

export default App;
