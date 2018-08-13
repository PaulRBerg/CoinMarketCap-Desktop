import React from 'react'
import {
	Springboard,
	Platforms,
	Downloads,
	Donations
} from './sections'

const Main = () => (
	<main className='flow container-fluid' id='flow'>
		<Springboard />
		<Platforms />
		<Downloads />
		<Donations />
	</main>
)

export default Main
