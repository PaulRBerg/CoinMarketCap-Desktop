import React from 'react'
import { Notice } from 'components/ui/reusable'
import data from 'data/store.json'
import strings from 'locales/en.json'
const donations = strings.donations

const Item = ({coin, address}) => (
	<div className='item col-xs-12 col-md-6 col-lg-2'>
		<img src={require(`media/wallets/${coin}.png`)} alt='Coin'/>
		<p className='text'>{address}</p>
	</div>
)

const Donations = () => (
	<section className='donations row' id='donations'>
		<Notice
			className='col-lg-12'
			title={donations.title}
			subtitle={donations.subtitle}/>

		<div className='list row'>
			<Item
				coin='nano'
				address={data.wallets.nano}/>
			<Item
				coin='btc'
				address={data.wallets.btc}/>
			<Item
				coin='eth'
				address={data.wallets.eth}/>
			<Item
				coin='ltc'
				address={data.wallets.ltc}/>
		</div>
	</section>
)

export default Donations
