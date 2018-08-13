import React, { Component } from 'react'
import { LeftMenu , RightMenu, Main, Footer } from 'components'

class App extends Component {
	render() {
		return (
			<div className='container-fluid'>
				<LeftMenu />
				<RightMenu />
				<Main />
				<Footer />
			</div>
		)
	}
}

export default App
