import React from 'react'

const Notice = ({className, title, subtitle}) => (
	<div className={'notice ' + (className !== undefined ? className : '')}>
		<h2 className='text'>{title}</h2>
		<p className='text'>{subtitle}</p>
		<div className='space'></div>
	</div>
)

export default Notice
