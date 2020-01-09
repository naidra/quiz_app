import { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import CircularProgress from "@material-ui/core/CircularProgress"
import Layout from "../components/Layout"
import AdminPage_table from "../components/tables/AdminPage_table"
import Auth from "../helpers/auth"
import { collectionData } from "rxfire/firestore"
import { storePlayersAction } from "../actions/quizActions"
import { db } from "../helpers/firebase/crud"

const auth = new Auth()

class Admin extends Component {
	static async getInitialProps() {
		return {}
	}

	state = { isLogedIn: false }

	componentDidMount() {
		auth.handleAuthentication(() => {
			if (!auth.isAuthenticated()) auth.logIn()
			else {
				const { storePlayersAction } = this.props
				this.setState({ isLogedIn: true })
				collectionData(db.collection("quiz-321"), "quiz-players").subscribe(item => {
					// re-render on each change
					storePlayersAction(item[0].data)
				})
			}
		})
	}

	render() {
		const { players } = this.props
		return (
			<Layout header_text="Admin page">
				<div className="admin-page-wrapper">
					{
						this.state.isLogedIn ?
							<>
								<button className="logout_btn" onClick={() => {
									auth.logOut()
									location.reload()
								}}>Log out</button>
								<div className="my-4 text-center">{ !players || (players && Array.isArray(players) && !players.length) ?
									<CircularProgress /> :
									<AdminPage_table players={players} /> }</div>
							</> : null
					}
				</div>
			</Layout>
		)
	}
}

Admin.defaultProps = {
	players: null
}

Admin.propTypes = {
	players: PropTypes.arrayOf(PropTypes.shape({})),
	storePlayersAction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	players: state.players
})

const mapDispatchToProps = { storePlayersAction }

export default connect(mapStateToProps, mapDispatchToProps)(Admin)