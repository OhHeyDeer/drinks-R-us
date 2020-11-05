import React, { useState, useEffect } from 'react';
import {v4 as uuidv4 } from 'uuid';
// React Bootstrap
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';


// Material UI
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

// Routes and Components
import query from '../../lib/routes';

const RandomDrinks = () => {
    
    const [randomList, changeRandomList] = useState([]);
    const [favoritesList, changeFavs] = useState([]);

    const [clickedDrink, changeClick] = useState({});

    useEffect(() => {
        let unparsed = localStorage.getItem('my-favorite-drinks');
        let storage = JSON.parse(unparsed);
        // console.log(storage);
        console.log(storage);
        if (unparsed[0] !== '[') {
            console.log('Reset to array');
            localStorage.setItem('my-favorite-drinks', JSON.stringify([]));
        } else {
            console.log('IS already defined');
        }
        query.getRandomDrinks((err, res) => {
            if (err) {
                throw err;
            } else {
                console.log(res.data.drinks);
                changeRandomList(res.data.drinks);
                changeFavs(JSON.parse(localStorage.getItem('my-favorite-drinks')));
            }
        })
    }, [])

    const handleAddFavorite = (drink) => {
        const storage = JSON.parse(localStorage.getItem('my-favorite-drinks'));
        localStorage.setItem('my-favorite-drinks', JSON.stringify([drink.strDrink, ...storage]))
        changeFavs([drink.strDrink, ...storage]);
    }
    const handleRemoveFavorite = (drink) => {
        let storage = [...favoritesList];
        for (let i = 0; i < favoritesList.length; i++) {
            if (storage[i] === drink.strDrink) {
                storage.splice(i, 1);
                localStorage.setItem('my-favorite-drinks', JSON.stringify(storage));
                changeFavs(storage);
            }
        };
    }

    // console.log('State Change', favoritesList);
    return (
        <div>
            <Col className="carousel-wrapper">
                <Carousel className="carousel-of-random">
                    {randomList.map(drink => 
                    <Carousel.Item interval={5000}>
                        <div className="add-to-favorites" >
                            {!JSON.parse(localStorage.getItem('my-favorite-drinks')).includes(drink.strDrink) ? <PlaylistAddIcon className="playlist-icons" onClick={() => handleAddFavorite(drink)} /> : <PlaylistAddCheckIcon className="playlist-icons" onClick={() => handleRemoveFavorite(drink)} />}
                        </div>
                        <img
                            onClick={() => changeClick(drink)}
                            src={drink.strDrinkThumb}
                            alt={drink.strDrink}
                            style={{ border: "3px solid #8bcdcd", borderRadius: "2px" }}
                            className="d-block w-100"
                        />
                        <Modal show={clickedDrink.strDrink ? true : false} onHide={() => changeClick({})}>
                            <Modal.Title>
                                {clickedDrink.strDrink}
                            </Modal.Title>
                        </Modal>
                        <Carousel.Caption className="carousel-caption">
                            <h3 className="carousel-title">{drink.strDrink}</h3>
                            <p className="carousel-description">{drink.strAlcoholic}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    )}
                </Carousel>
            </Col>
        </div>
    );

}

export default RandomDrinks;