import axios from 'axios';
import API_KEY from './hiddenKey';


// ----------- DB Queries ------------
const getAllUsers = (callback) => {
    axios.get('http://localhost:3333/users')
        .then(data => callback(null, data))
        .catch(err => callback(err, null));
}
const getOneUser = (username, callback) => {
    axios.get(`http://localhost:3333/users/${username}`)
        .then(data => callback(null, data))
        .catch(err => callback(err, null));
}
const postNewUser = (info, callback) => {
    axios.get('http://localhost:3333/users', info)
        .then(data => callback(null, data))
        .catch(err => callback(err, null));
}
const updateExistingUser = (username, newIngredients, callback) => {
    // This does not work however I will reach out for help getting it functional
    axios.put('http://localhost:3333/users/update', { params: { name: username, ingredients: newIngredients }})
        .then(data => callback(null, data))
        .catch(err => callback(err, null));
}

// ----------- API CALLS ------------

// Get 10 Random Drinks
const getRandomDrinks = (callback) => {
    // change to an API key AND use the random enpoint once given a Key 
    axios.get(`https://www.thecocktaildb.com/api/json/v2/${API_KEY}/randomselection.php`)
        .then(data => callback(null, data))
        .catch(err => callback(err, null));
}

// Search for an ingredient by name
const searchIngredients = (search, callback) => {
    axios.get(`https://www.thecocktaildb.com/api/json/v2/${API_KEY}/filter.php?i=${search}`)
        .then(data => callback(null, data))
        .catch(err => callback(err, null));
}

// Gives back a list of drinks based on a single ingredient
const filterByIngredient = (ingredient, callback) => {
    axios.get(`https://www.thecocktaildb.com/api/json/v2/${API_KEY}/filter.php?i=${ingredient}`)
        .then(data => callback(null, data))
        .catch(err => callback(err, null));
}

// Search for a drink based on ingredients
const filterSearchDrinks = (list, callback) => {

    let string = JSON.stringify(list);
    let newList = string.split('"').join(''); // turn into a string for the url
    newList = newList.split('');
    newList.splice(0,1);
    newList.splice(newList.length-1, 1); // remove the brackets
    newList = newList.join('');
    if (newList.split(',').length > 1) {
        axios.get(`https://www.thecocktaildb.com/api/json/v2/${API_KEY}/filter.php?i=${newList}`)
        .then(data => callback(null, data))
        .catch(err => callback(err, null));
    } else {
        filterByIngredient(newList, callback);
    }
}

// Search for a drink based on name
const searchDrinks = (search, callback) => {
    axios.get(`https://www.thecocktaildb.com/api/json/v2/${API_KEY}/search.php?i=${search}`)
        .then(data => callback(null, data))
        .catch(err => callback(err, null));
}


// Gets all of the ingredients for autorecomendations
const getIngredients = (callback) => {
    axios.get(`https://www.thecocktaildb.com/api/json/v2/${API_KEY}/list.php?i=list`)
        .then(data => callback(null, data))
        .catch(err => callback(err, null));
}





export default {
    getRandomDrinks,
    searchDrinks,
    searchIngredients,
    filterByIngredient,
    getIngredients,
    filterSearchDrinks,
    getAllUsers,
    getOneUser,
    postNewUser,
    updateExistingUser
}