import React, { useState } from 'react';
import { Button, Dimmer, Header } from 'semantic-ui-react';
import Participants from './components/Participants';
import Ready from './components/Ready';
import Start from './components/Start';
import useLocalData from './data';
import './App.css';

export default function () {
	const [ people, addPerson, removePerson, startGame, endGame, turn, setTurn ] = useLocalData();
	const [ ready, setReady ] = useState( false );

	return (
		<Dimmer.Dimmable dimmed={turn > 0} page={true}>
			<main>
				<Header as="h1">White Elephant</Header>

				<Participants
					addPerson={addPerson}
					people={people}
					removePerson={removePerson}
				>
					<Button
						content="Ready"
						disabled={!!turn || !people.length}
						icon="check"
						onClick={() => setReady( true )}
						positive
					/>
				</Participants>

				<Ready
					count={people.length}
					onClose={() => setReady( false )}
					open={ready && 0 === turn}
				>
					<Button
						basic
						color="grey"
						content="Cancel"
						onClick={() => setReady( false )}
					/>
					<Button
						content="Start"
						icon="play"
						onClick={startGame}
						positive
					/>
				</Ready>

				<Start
					count={people.length}
					person={people[turn - 1] || people[0]}
					show={turn > 0}
				>
					<Button.Group>
						<Button
							content="Previous"
							disabled={turn === 1}
							onClick={() => setTurn( turn - 1)}
							primary
						/>
						{
							turn <= people.length &&
							<Button
								content="Next"
								onClick={() => setTurn( turn + 1 )}
								primary
							/>
						}
						{
							turn > people.length &&
							<Button
								content="All done!"
								negative
								onClick={() => window.confirm( 'Are you sure?' ) && endGame()}
							/>
						}
					</Button.Group>
				</Start>
			</main>
		</Dimmer.Dimmable>
	);
}
