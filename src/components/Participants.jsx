import React, { createRef, useState } from 'react';
import { Button, Form, Header, Input, Item } from 'semantic-ui-react';

export default function ( { children, addPerson, people, removePerson, show } ) {
	const [ showForm, setShowForm ] = useState( false );
	const toggleForm = () => setShowForm( !showForm );
	const inputRef = createRef();

	if ( !show ) {
		return null;
	}

	return (
		<>
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
					showForm &&
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

										addPerson( person );
										toggleForm();
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
									onClick={toggleForm}
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
					disabled={showForm}
					icon="add"
					onClick={toggleForm}
				/>
				{children}
			</Button.Group>
		</>
	);
}
