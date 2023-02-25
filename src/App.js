import React, {useEffect, useState} from 'react';
import './index.scss';
import {Collection} from "./Collection";

const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
]

function App() {
    const [collections, setCollections] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [categoryId, setCategoryId] = useState(0);

    const pageLimit = 3;

    useEffect(() => {
        setIsLoading(true);
        const category = categoryId ? `category=${categoryId}` : "";
        fetch(`https://63f74ad1e40e087c958b69db.mockapi.io/collections?page=${page}&limit=${pageLimit}&${category}`)
            .then(res => res.json())
            .then(json => setCollections(json))
            .catch(err => {
                console.warn(err);
                alert("Ошибка запроса коллекций!");
            })
            .finally(() => setIsLoading(false))
    }, [categoryId, page]);

    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {
                        cats.map((obj, i) =>
                            <li
                                onClick={() => setCategoryId(i)}
                                className={categoryId === i ? "active" : ""}
                                key={obj.name}>{obj.name}</li>)
                    }
                </ul>
                <input value={searchValue}
                       onChange={e => setSearchValue(e.target.value)}
                       className="search-input"
                       placeholder="Поиск по названию" />
            </div>
            <div className="content">
                {
                    isLoading
                        ? <h2>Идет загрузка ...</h2>
                        : collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase())).map((collection, index) => <Collection
                        key={index}
                        name={collection.name}
                        images={collection.photos} />)
                }
            </div>
            <ul className="pagination">
                {
                    [...Array(4)].map((_, i) =>
                        <li
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={i + 1 === page ? "active" : ""}>{i + 1}</li>)
                }
            </ul>
        </div>
    );
}

export default App;
