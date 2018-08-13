import React from 'react'
import { Notice } from 'components/ui/reusable'
import {
	FaApple,
	FaCloudDownloadAlt
} from 'react-icons/fa'
import data from 'data/store.json'
import strings from 'locales/en.json'
const downloads = strings.downloads

const Item = ({title, subtitle, params}) => (
	<div className='item col-xs-12 col-md-6 col-lg-2'>
		<i className={params.class}/>
		<h3 className='text'>{title}</h3>
		<a className='text button' alt={title} href={params.href} target='_blank'><FaCloudDownloadAlt size={16} color='white'/> {subtitle}</a>
	</div>
)

const Downloads = () => (
	<section className='downloads row' id='downloads'>
		<Notice
			className='col-lg-12'
			title={downloads.title}
			subtitle={downloads.subtitle} />

		<div className='list row'>
			<Item
				title={downloads.parts[0].title}
				subtitle={downloads.parts[0].subtitle}
				params={{
					class: 'devicon-windows8-original colored',
					href: data.urls.releases.win
				}}/>
			<div className='item col-xs-12 col-md-6 col-lg-2'>
				<FaApple size={108}/>
				<h3 className='text'>{downloads.parts[1].title}</h3>
				<a className='text button' href={data.urls.releases.mac} target='_blank'><FaCloudDownloadAlt size={16} color='white'/>  {downloads.parts[1].subtitle}</a>
			</div>
			<Item
				title={downloads.parts[2].title}
				subtitle={downloads.parts[2].subtitle}
				params={{
					class: 'devicon-ubuntu-plain colored',
					href: data.urls.releases.ubuntu
				}}/>
			<Item
				title={downloads.parts[3].title}
				subtitle={downloads.parts[3].subtitle}
				params={{
					class: 'devicon-linux-plain colored',
					href: data.urls.releases.linux
				}}/>
		</div>
	</section>
)

export default Downloads
