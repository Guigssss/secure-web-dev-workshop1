// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict'

// https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

console.log('🚀 It Works!');

/**
 * 💅 Try to produce the most readable code, use meaningful variable names
 * Your intentions should be clear by just reading the code
 * Good luck, have fun !
 */

// 📝 TODO: Number of filming locations
// 1. Make the function return the number of filming locations
function getFilmingLocationsNumber () {
	return filmingLocations.length
}
//console.log(`There is ${getFilmingLocationsNumber()} filming locations in Paris`)

// 📝 TODO: Filming locations sorted by start date, from most recent to oldest.
// 1. Implement the function
// 2. Log the first and last item in array
function sortFilmingLocationsByStartDate () {
	let sorted = filmingLocations.sort(function (a,b){return new Date(a.fields.date_debut)-new Date(b.fields.date_debut)})
	sorted = sorted.reverse();
	return [sorted[0].fields.date_debut, sorted[filmingLocations.length-1].fields.date_debut]
}
//console.log(sortFilmingLocationsByStartDate())

// 📝 TODO: Number of filming locations in 2020 only
// 1. Make the function return the number of filming locations in 2020 only
// 2. Log the result
function getFilmingLocationsNumber2020 () {
	let FilmingLocationsNumber2020 = []
	for(let i of filmingLocations){
		if(i.fields.annee_tournage === "2020"){
			FilmingLocationsNumber2020.push(i);
		}
	}
	return FilmingLocationsNumber2020.length
}
//console.log(getFilmingLocationsNumber2020())

// 📝 TODO: Number of filming locations per year
// 1. Implement the function, the expected result is an object with years as
// keys and filming locations number as value, e.g:
//    const filmingLocationsPerYear = {
//      '2020': 1234,
//      '2021': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerYear () {
	let filmingLocationsPerYear = {}
	for(let i of filmingLocations){
		if(filmingLocationsPerYear[i.fields.annee_tournage] !== undefined){
			filmingLocationsPerYear[i.fields.annee_tournage]+=1;
		}
		else{
			filmingLocationsPerYear[i.fields.annee_tournage] = 1;
		}
	}
	return filmingLocationsPerYear
}
//console.log(getFilmingLocationsNumberPerYear())

// 📝 TODO: Number of filming locations by district (arrondissement)
// 1. Implement the function, the expected result is an object with
// district as keys and filming locations number as value, e.g:
//    const filmingLocationsPerDistrict = {
//      '75013': 1234,
//      '75014': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerDistrict () {
	let filmingLocationsPerDistrict ={}
	for(let i of filmingLocations){
		if(filmingLocationsPerDistrict[i.fields.ardt_lieu] !== undefined){
			filmingLocationsPerDistrict[i.fields.ardt_lieu]+=1;
		}
		else{
			filmingLocationsPerDistrict[i.fields.ardt_lieu] = 1;
		}
	}
	return filmingLocationsPerDistrict;
}
//console.log(getFilmingLocationsNumberPerDistrict())

// 📝 TODO: Number of locations per film, sorted in descending order
// 1. Implement the function, result expected as an array of object like:
//    const result = [{film: 'LRDM - Patriot season 2', locations: 12}, {...}]
// 2. Log the first and last item of the array
function getFilmLocationsByFilm () {
	let result = [];
	let films = {};
	for(let i of filmingLocations) {
		if (films[i.fields.nom_tournage] !== undefined) {
			films[i.fields.nom_tournage] += 1;
		} else {
			films[i.fields.nom_tournage] = 1;
		}
	}
	result = Object.keys(films).map(function(key) {
		return {films : key, locations : films[key]};
	});
	result.sort(function(a,b){return a.locations - b.locations})
	result.reverse();
	return result;
}
//console.log(getFilmLocationsByFilm())

// 📝 TODO: Number of different films
// 1. Implement the function
// 2. Log the result
function getNumberOfFilms() {
	return getFilmLocationsByFilm().length;
}
//console.log(getNumberOfFilms())

// 📝 TODO: All the filming locations of `LRDM - Patriot season 2`
// 1. Return an array with all filming locations of LRDM - Patriot season 2
// 2. Log the result
function getArseneFilmingLocations () {
	let ArseneFilmingLocations = [];
	for(let i of filmingLocations){
		if(i.fields.nom_tournage === "LRDM - Patriot season 2"){
			ArseneFilmingLocations.push(i.fields.adresse_lieu);
		}
	}
	return ArseneFilmingLocations;
}
//console.log(getArseneFilmingLocations())

// 📝 TODO: Tous les arrondissement des lieux de tournage de nos films favoris
//  (favoriteFilms)
// 1. Return an array of all the districts of each favorite films given as a
//    parameter. e.g. :
//    const films = { 'LRDM - Patriot season 2': ['75013'] }
// 2. Log the result

function getFavoriteFilmsLocations (favoriteFilmsNames) {
	let FavoriteFilmsLocations = {};
	for(let k of favoriteFilmsNames){
		let districts = [];
		for(let i of filmingLocations){
			if(i.fields.nom_tournage === k && districts.indexOf(i.fields.ardt_lieu) === -1){
				districts.push(i.fields.ardt_lieu);
			}
		}
		FavoriteFilmsLocations[k] = districts;
	}
	return FavoriteFilmsLocations;
}
const favoriteFilms =
	[
		'LRDM - Patriot season 2',
		'Alice NEVERS',
		'Emily in Paris',
	]
//console.log(getFavoriteFilmsLocations(favoriteFilms))
// 📝 TODO: All filming locations for each film
//     e.g. :
//     const films = {
//        'LRDM - Patriot season 2': [{...}],
//        'Une jeune fille qui va bien': [{...}]
//     }

function getFilmingLocationsPerFilm () {
	let films = {};
	for(let i of filmingLocations) {
		if (films[i.fields.nom_tournage] === undefined) {
			films[i.fields.nom_tournage] = [];
		}
		films[i.fields.nom_tournage].push(i);
	}
	return films;
}
//console.log(getFilmingLocationsPerFilm())

// 📝 TODO: Count each type of film (Long métrage, Série TV, etc...)
// 1. Implement the function
// 2. Log the result
function countFilmingTypes () {
	let films ={}
	for(let i of filmingLocations) {
		if (films[i.fields.type_tournage] !== undefined) {
			films[i.fields.type_tournage] += 1;
		} else {
			films[i.fields.type_tournage] = 1;
		}
	}
	return films;
}
//console.log(countFilmingTypes())
// 📝 TODO: Sort each type of filming by count, from highest to lowest
// 1. Implement the function. It should return a sorted array of objects like:
//    [{type: 'Long métrage', count: 1234}, {...}]
// 2. Log the result
function sortedCountFilmingTypes () {
	let films = countFilmingTypes();
	let result = Object.keys(films).map(function(key) {
		return {type : key, count : films[key]};
	});
	result.sort(function(a,b){return a.count - b.count})
	result.reverse();
	return result;
}
//console.log(sortedCountFilmingTypes())
/**
 * This arrow functions takes a duration in milliseconds and returns a
 * human-readable string of the duration
 * @param ms
 * @returns string
 */
const duration = (ms) => `${(ms/(1000*60*60*24)).toFixed(0)} days, ${((ms/(1000*60*60))%24).toFixed(0)} hours and ${((ms/(1000*60))%60).toFixed(0)} minutes`

// 📝 TODO: Find the filming location with the longest duration
// 1. Implement the function
// 2. Log the filming location, and its computed duration
function getLongestDuration() {
	let longest = 0;
	let lieu;
	for(let i of filmingLocations){
		let time = new Date(i.fields.date_fin) - new Date(i.fields.date_debut);
		if(time>longest){
			longest=time;
			lieu = i.fields.adresse_lieu;
		}
	}
	let result = {};
	result[lieu]=duration(longest);
	return result;
}
console.log(getLongestDuration())
// 📝 TODO: Compute the average filming duration
// 1. Implement the function
// 2. Log the result
