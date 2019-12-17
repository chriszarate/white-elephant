import React from 'react';
import { Card, Dimmer } from 'semantic-ui-react';

export default function ( { children, count, person, show, turn } ) {
	const lastTurn = turn > count;
	const description = 'Unwrap a wrapped gift OR steal an unwrapped gift (provided it is not “dead”).';
	const lastTurnDecription = 'Participant #1 takes the last turn: Steal any gift (even if it’s “dead”)!';

	return (
		<Dimmer active={show}>
			<Card
				className="card"
				description={lastTurn ? lastTurnDecription : description}
				header={person}
				image={`https://api.adorable.io/avatars/320/${person}.png`}
				meta={lastTurn ? 'Last turn!' : `${turn} / ${count}`}
				extra={children}
			/>
		</Dimmer>
	);
}
