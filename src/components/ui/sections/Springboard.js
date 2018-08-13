import React, { Component } from 'react'
import {
	FaApple,
	FaWindows,
	FaLinux
} from 'react-icons/fa'
import data from 'data/store.json'
import strings from 'locales/en.json'
const releases = data.urls.releases
const download = strings.springboard.download

class Springboard extends Component {

	constructor(props) {
		super(props)
		this.download = this.download.bind(this)
		this.renderIcon = this.renderIcon.bind(this)
	}

	download(e) {
		console.log(window)
	}

	renderIcon(url) {
		console.log(url)
		if (url === releases.mac) {
			return (<FaApple size={28} color='white'/>)
		} else if (url === releases.win) {
			return (<FaWindows size={28} color='white'/>)
		} else { // Linux fallback
			return (<FaLinux size={28} color='white'/>)
		}
	}


	render() {
		let url = releases.mac
		let message = download.mac

		if (navigator.platform.startsWith('Win')) {
			url = data.urls.releases.win
			message = download.win
		} else if (navigator.platform.startsWith('Linux')) {
			url = data.urls.releases.linux
			message = download.linux
		}

		return (
			<article className='springboard' id='springboard' >
				<div className='content-container'>
					<img src={require('media/logo.png')} alt='CoinMarketCap Logo'/>
					<h3 className='text'>{strings.springboard.message}</h3>
					<a className='text button' href={url} onClick={this.download} target='_blank'>{this.renderIcon(url)} {message}</a>
					<p><a href='#downloads'>{strings.springboard.others}</a>. {strings.springboard.affiliation}</p>
				</div>
			</article>
		)
	}
}

export default Springboard
