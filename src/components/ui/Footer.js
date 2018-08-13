import React from 'react'
import strings from 'locales/en.json'
const copyright = strings.footer.copyright

const Footer = () => (
	<footer>
		<div className='copyright'>
			<p>{copyright.host} <a href="https://pages.github.com/">Github</a>  •  </p>
			<p>© </p>
			<p className='name'>{copyright.name}  •  </p>
			<p>{copyright.icons} <a href="https://github.com/gorangajic/react-icons">react-icons</a></p>
		</div>
	</footer>
)

export default Footer
