import React from 'react';
import { Modal } from 'semantic-ui-react';

export default function ( { children, count, open } ) {
	return (
		<Modal open={open}>
			<Modal.Header>Ready to start?</Modal.Header>
			<Modal.Content scrolling>
				<Modal.Description>
					<p>There are {count} participants. Make sure you added everyone! Once you start, it will be <strong>too late</strong> to add more.</p>
					<p>Clicking <strong>Start</strong> will randomize the order and announce the first participant!</p>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				{children}
			</Modal.Actions>
		</Modal>
	);
}
