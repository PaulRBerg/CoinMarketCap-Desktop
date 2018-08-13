import React from 'react'

import {
	HashRouter as Router,
	Route,
	Switch
} from 'react-router-dom'

import {
	App,
	Whoops404
}  from './containers'

const hashLinkScroll = () => {
	const { hash } = window.location
	if (hash !== '') {
		// Push onto callback queue so it runs after the DOM is updated,
		// this is required when navigating from a different page so that
		// the element is rendered on the page before trying to getElementById.
		setTimeout(() => {
			const id = hash.replace('#', '')
			const element = document.getElementById(id)
			if (element) element.scrollIntoView()
		}, 0)
	}
}

const routes = (
	<Router onUpdate={hashLinkScroll}>
		<Switch>
			<Route path='/' exact component={App}/>
			<Route component={Whoops404}/>
		</Switch>
	</Router>
)

export default routes
