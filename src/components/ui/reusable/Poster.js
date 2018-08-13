import React from 'react'

// const style = {
//
// }

const Poster = ({src, title}) => (
	<div className='poster'>
		<div className='base'>
			<img className='absolute-centered' src={src} alt={title}/>
		</div>
		<h1 className='absolute-centered'>{title}</h1>
	</div>
)

export default Poster
