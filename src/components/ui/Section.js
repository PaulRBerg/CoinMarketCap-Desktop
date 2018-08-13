import React from 'react'

const Section = (section) => (
	<section>
		<div className='left-container'>
		</div>

		<div className='right-container'>
			<p>{section.name}</p>
		</div>
	</section>
)

export default Section
