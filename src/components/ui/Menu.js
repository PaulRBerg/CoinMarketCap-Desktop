import React, { Component } from 'react'
import {
	FaBars,
	FaTwitterSquare,
	FaLinkedin as FaLinkedinSquare,
	FaBehanceSquare,
	FaGithubSquare
} from 'react-icons/fa'
import { slide as Drawer } from 'react-burger-menu'
import data from 'data/store.json'
import strings from 'locales/en.json'

export class Left extends Component {
	constructor(props) {
		super(props)
		this.state = {
			menuOpen: false
		}

		this.handleStateChange = this.handleStateChange.bind(this)
		this.closeMenu = this.closeMenu.bind(this)
	}

	// This keeps your state in sync with the opening/closing of the menu
	// via the expected means, e.g. clicking the X, pressing the ESC key etc.
	handleStateChange (state) {
		document.body.style.overflow = state.isOpen ? 'hidden' : 'visible'
		this.setState({menuOpen: state.isOpen})
	}

	// This callback function can be used to make
	// the menu close on any event you want
	closeMenu () {
		this.setState({menuOpen: false})
	}

	render() {
		return (
			<Drawer
				className= { 'bm-menu-wrap-left' }
				burgerButtonClassName={ 'bm-burger-button-left' }
				crossClassName={ 'bm-cross-left' }
				customBurgerIcon={ <FaBars color='#242424'/>}
				isOpen={ this.state.menuOpen }
				onStateChange={ this.handleStateChange }>

				<a className='menu-item' href='#springboard' onClick={ this.closeMenu }>{strings.menu.home}</a>
				<a className='menu-item' href='#platforms' onClick={ this.closeMenu }>{strings.menu.platforms}</a>
				<a className='menu-item' href='#downloads' onClick={ this.closeMenu }>{strings.menu.downloads}</a>
				<a className='menu-item' href='#donations' onClick={ this.closeMenu }>{strings.menu.donations}</a>
				<a className='menu-item' href='mailto:hello@paulrberg.com' target='_top'>{strings.menu.contact} </a>
			</Drawer>
		)
	}
}


export class Right extends Component {
	constructor(props) {
		super(props)
		this.state = {
			menuOpen: false
		}

		this.handleStateChange = this.handleStateChange.bind(this)
	}

	// This keeps your state in sync with the opening/closing of the menu
	// via the expected means, e.g. clicking the X, pressing the ESC key etc.
	handleStateChange (state) {
		document.body.style.overflow = state.isOpen ? 'hidden' : 'visible'
	}

	render() {
		return (
			<Drawer
				right
				className= { 'bm-menu-wrap-right' }
				burgerButtonClassName= { 'bm-burger-button-right' }
				crossClassName={ 'bm-cross-right' }
				customBurgerIcon={<span> CONTACT </span>}
				onStateChange={ this.handleStateChange }
				width={360}>

				<img className='profile-picture' src={require('media/profile-picture.jpg')} alt=''/>
				<p>{strings.contact.message} <a className='menu-item' href='mailto:hello@paulrberg.com' target='_top'>{data.contact.email} </a></p>
				<div className='links-container'>
					<a className='menu-item-link' href={data.urls.contact.twitter}> <FaTwitterSquare size={48} color='#1da1f2'/> </a>
					<a className='menu-item-link' href={data.urls.contact.linkedin}><FaLinkedinSquare size={48} color='#0077B5'/> </a>
					<a className='menu-item-link' href={data.urls.contact.behance}> <FaBehanceSquare size={48} color='#1769ff'/> </a>
					<a className='menu-item-link' href={data.urls.contact.github}> <FaGithubSquare size={48} color='#333'/> </a>
					<a className='menu-item-link' href={data.urls.contact.medium}> <img src={require('media/icons/contact/medium.svg')} alt=''/> </a>
				</div>
				{/*<div className='connsuite-badge' data-client-bg='2' data-client-id='17'/>*/}
			</Drawer>
		)
	}
}
