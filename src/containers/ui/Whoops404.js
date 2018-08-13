import React from 'react'
// import PropTypes from 'prop-types'

const style = {
	margin: '1em'
}

const textStyle = {
	color: '#272727'
}

const Whoops404 = ({ location }) => (
	<div style={style}>
		<h1 style={textStyle}>Whoops, resource not found</h1>
		<p style={textStyle}>Could not find {location.pathname}</p>
	</div>
)

// Whoops404.propTypes = {
// 	location: PropTypes.Function
// }

export default Whoops404
