import React, { createRef, useState } from 'react';
import { Button, Card, Dimmer, Form, Header, Input, Item, Modal } from 'semantic-ui-react';
import useLocalData from './data';
import './App.css';

function App() {
	const [ people, addPerson, removePerson, startGame, endGame, turn, setTurn ] = useLocalData();
	const [ ready, setReady ] = useState( false );
	const [ addNew, setAddNew ] = useState( false );
	const inputRef = createRef();

	return (
		<Dimmer.Dimmable dimmed={turn > 0} page={true}>
			<main>
				<Header as="h1">White Elephant</Header>
				<Item.Group divided>
					{
						people.map( person => (
							<Item key={person}>
								<Item.Image size="tiny" src={`https://api.adorable.io/avatars/160/${person}.png`} />
								<Item.Content verticalAlign="middle">
									<Item.Header>
										{person}
									</Item.Header>
									<Item.Extra>
										<Button
											basic
											compact
											content="Remove"
											icon="remove"
											negative
											onClick={() => removePerson( person )}
											size="tiny"
										/>
									</Item.Extra>
								</Item.Content>
							</Item>
						) )
					}
					{
						addNew &&
							<Item>
								<Item.Image size="tiny" src="https://api.adorable.io/avatars/face/eyes4/nose3/mouth7/8e8895" />
								<Item.Content verticalAlign="middle">
									<Item.Header>
										<Form
											onSubmit={evt => {
												evt.preventDefault();

												// WTF semantic UI???
												// console.log( inputRef.current.value );
												// > undefined
												// console.log( inputRef.current.inputRef.current.value );
												// > "my value"
												const person = inputRef.current.inputRef.current.value;

												if ( ! person ) {
													return;
												}
												console.log( person );
												addPerson( person );
												setAddNew( false );
											}}
										>
											<Form.Field>
												<Input
													placeholder="Participant’s name"
													ref={inputRef}
													type="text"
												/>
											</Form.Field>
										</Form>
									</Item.Header>
									<Item.Extra>
										<Button
											basic
											color="grey"
											compact
											content="Cancel"
											icon="remove"
											onClick={() => setAddNew( false )}
											size="tiny"
										/>
									</Item.Extra>
								</Item.Content>
							</Item>
					}
				</Item.Group>
				<Button.Group>
					<Button
						content="Add"
						disabled={addNew}
						icon="add"
						onClick={() => setAddNew( true )}
					/>
					<Button
						content="Ready"
						disabled={!!turn || !people.length}
						icon="check"
						onClick={() => setReady( true )}
						positive
					/>
				</Button.Group>
				<Modal open={ready && 0 === turn}>
					<Modal.Header>Ready to start?</Modal.Header>
					<Modal.Content scrolling>
						<Modal.Description>
							<p>There are {people.length} participants. Make sure you added everyone! Once you start, it will be <strong>too late</strong> to add more.</p>
							<p>Clicking <strong>Start</strong> will randomize the order and announce the first participant!</p>
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
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
					</Modal.Actions>
				</Modal>
				<Dimmer active={turn > 0}>
					<Card
						className="card"
						description="Unwrap a wrapped gift OR steal an unwrapped gift (provided it is not “dead”)."
						header={people[turn - 1] || people[0]}
						image={`https://api.adorable.io/avatars/320/${people[turn - 1] || people[0]}.png`}
						meta={`${turn} / ${people.length}`}
						extra={
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
						}
					/>
				</Dimmer>
			</main>
		</Dimmer.Dimmable>
	);
}

export default App;
