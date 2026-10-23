import React from 'react';

interface DescriptionProps {
	text: string;
}

export default function Description({ text }: DescriptionProps) {
	return (
		<p>
			{text
				.replace(/(\]{1,4}|\[{1,4}|\*{2}|\/{2})/g, '')
				.split('\n')
				.map((line, index) => (
					<React.Fragment key={index}>
						{line}
						<br />
					</React.Fragment>
				))}
		</p>
	);
}
