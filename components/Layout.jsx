import { Component } from "react"
import PropTypes from "prop-types"
import HeaderBg from "../images/header_bg.jpg"
import Open_trivia_logo from "../images/open_trivia_logo.png"
import Icons from "./icons"


class Layout extends Component {
	render() {
		const { header_text, app_description, children } = this.props
		return (
			<div className="entire_page_wrapper">
				<Icons />
				<div className="header" style={{ backgroundImage: `url(${HeaderBg})` }}>
					<div className="container">
						<h2 className="header-text">{ header_text }</h2>
						<h6 className="app_description mb-5">{ app_description }</h6>
					</div>
				</div>
				<div className="container">{ children }</div>
				<div className="footer">
					<div className="container py-2">
						<div className="content d-flex align-items-center justify-content-end">
							<p className="mb-0 mr-2">Content possible by:</p>
							<a href="https://opentdb.com" target="_blank" rel="noopener noreferrer"><img src={Open_trivia_logo} alt="Opentdb Logo"/></a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Layout.propTypes = {
	children: PropTypes.element,
	header_text: PropTypes.string,
	app_description: PropTypes.string,
}

export default Layout