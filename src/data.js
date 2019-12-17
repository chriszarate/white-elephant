import { useEffect, useState } from 'react';

const key = '🐘';

// Fisher-Yates array shuffle
function shuffle ( arr ) {
	for ( let i = arr.length - 1; i > 0; i = i - 1 ) {
		const j = Math.floor( Math.random() * ( i + 1 ) );
		[ arr[i], arr[j] ] = [ arr[j], arr[i] ];
	}

	return arr;
}

export default function () {
	const [ people, setPeople ] = useState( [] );
	const [ turn, setTurn ] = useState( 0 ); // 0 corresponds to not started

	const addPerson = person => setPeople( [ ...people, person ] );
	const removePerson = person => setPeople( people.filter( aPerson => aPerson !== person ) );

	const startGame = () => {
		setPeople( shuffle( people ) );
		setTurn( 1 );
	};

	const endGame = () => setTurn( 0 );

	// Load persisted data from local storage once.
	useEffect( () => {
		const { people = [], turn = 0 } = JSON.parse( window.localStorage.getItem( key ) ) || {};

		setPeople( people );
		setTurn( turn );
	}, [] );

	// Persist data in local storage on change.
	useEffect( () => {
		window.localStorage.setItem( key, JSON.stringify( { people, turn } ) );
	}, [ people, turn ] );

	return [
		people,
		addPerson,
		removePerson,
		startGame,
		endGame,
		turn,
		setTurn,
	];
};
