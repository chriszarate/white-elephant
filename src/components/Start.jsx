import React from 'react';
import { Card, Dimmer } from 'semantic-ui-react';

export default function ( { children, count, person, show, turn } ) {
	return (
		<Dimmer active={show}>
			<Card
				className="card"
				description="Unwrap a wrapped gift OR steal an unwrapped gift (provided it is not “dead”)."
				header={person}
				image={`https://api.adorable.io/avatars/320/${person}.png`}
				meta={`${turn} / ${count}`}
				extra={children}
			/>
		</Dimmer>
	);
}
