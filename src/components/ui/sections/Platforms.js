import React from 'react'
import { Notice } from 'components/ui/reusable'
import strings from 'locales/en.json'
const platforms = strings.platforms

const Overview = () => (
	<section className='platforms row' id='platforms'>
        <div className='content-container'>
            <Notice
                className='col-lg-12'
                title={platforms.title}
                subtitle={platforms.subtitle} />
            <img src={require('media/platforms.png')} alt='Platforms'/>
        </div>
	</section>
)

export default Overview
