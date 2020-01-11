import { Component } from "react"
import { connect } from "react-redux"
import { getCategoriesAction, storePlayersAction, setSelectedCategoryAction, setSelectedDifficultyAction, toggleCategoriesAction } from "../actions/quizActions"
import PropTypes from "prop-types"
import Router from "next/router"
import { collectionData } from "rxfire/firestore"
import { db } from "../helpers/firebase/crud"
import Layout from "../components/Layout"
import EntryPage_table from "../components/tables/EntryPage_table"
import toaster from "toasted-notes"

class Index extends Component {
	static async getInitialProps({ store, isServer, query }) {
		await store.dispatch(getCategoriesAction())
		if (!isServer && query.msg === "noQuestions") {
			Router.push("/", "/", {shallow: true})
			toaster.notify("Couldn't find questions for this category.", { position:"top-right", duration:3000 })
		}
		return {}
	}

	componentDidMount() {
		collectionData(db.collection("quiz-321"), "quiz-players").subscribe(item => {
			// re-render on each change
			const dataSorted = item[0].data.sort((a, b) => (b.piket - a.piket))
			this.props.storePlayersAction(dataSorted)
		})
	}

	render() {
		const {
			categories,
			players,
			categorySelected,
			difficultySelected,
			allCategoriesShown,
			setSelectedCategoryAction,
			setSelectedDifficultyAction,
			toggleCategoriesAction
		} = this.props
		const difficultyOptions = [
			{ id:"easy", label: "Easy" },
			{ id:"medium", label: "Medium" },
			{ id:"hard", label: "Hard" }
		]
		const categoriesFiltered = allCategoriesShown ? categories : categories.slice(0, 12)

		return (
			<Layout header_text="Quiz app" app_description="A place to test yourself and learn">
				<div className="row py-4 quiz-wrapper">
					<div className={`col-12 col-lg-6 py-3 mx-0 px-2 row category_items ${allCategoriesShown ? "all_shown" : ""}`}>
						<h2 className="col-12 pb-2 px-2 title-like">Choose a category to start playing.</h2>
						{
							categoriesFiltered && Array.isArray(categoriesFiltered) && categoriesFiltered.map(item => (
								<div className="col-4 col-md-3 item" key={`${item.id}-category`}>
									<label className="label">
										<input type="radio"
											name="quiz_category"
											value={item.id}
											id="quiz_category"
											checked={item.id === categorySelected}
											disabled={!!categorySelected && !!difficultySelected}
											className="d-none radio_button"
											onChange={e => {
												setSelectedCategoryAction(+e.target.value)
												if(!difficultySelected) return
												Router.push("/playQuiz/[category_id]", `/playQuiz/${e.target.value}?difficulty=${difficultySelected}`)
											}} />
										<div className="content">
											<svg className="icon"><use xlinkHref={`#${item.id}-icon`} fill="#6090f7" /></svg>
											<p>{ item.name }</p>
										</div>
									</label>
								</div>
							))
						}
						<div className="col-12">
							<button className="show_more_categories"
								onClick={() => toggleCategoriesAction(!allCategoriesShown)}>
								<svg className="down_arrow"><use xlinkHref="#down_arrow-icon" fill="#262f3c" /></svg>
							</button>
						</div>
					</div>
					<div className="col-12 col-lg-6 py-3 px-2 difficulty_items">
						<h4 className="col-12 pt-0 pt-md-3 pb-2 title-like">Choose difficulty level</h4>
						{
							difficultyOptions && Array.isArray(difficultyOptions) && difficultyOptions.map(option => (
								<label key={option.id} className="col-4 item">
									<input type="radio"
										name="quiz_difficulty"
										value={option.id}
										checked={difficultySelected === option.id}
										disabled={!!categorySelected && !!difficultySelected}
										id="quiz_difficulty"
										className="d-none difficulty_option"
										onChange={e => {
											setSelectedDifficultyAction(e.target.value)
											if(!categorySelected) return
											Router.push("/playQuiz/[category_id]", `/playQuiz/${categorySelected}?difficulty=${e.target.value}`)
										}} />
									<div className="content">
										<h5>{ option.label }</h5>
									</div>
								</label>
							))
						}
					</div>
					<div className="col-12 col-lg-6 py-4 players-container">
						{
							!players || (players && Array.isArray(players) && !players.filter(i => i.aprovuar).length) ?
								null :
								<>
									<h2 className="mb-3 title-like">Players list</h2>
									<EntryPage_table players={players} />
								</>
						}
					</div>
				</div>
			</Layout>
		)
	}
}

Index.defaultProps = {
	categories: []
}

Index.propTypes = {
	questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	categories: PropTypes.arrayOf(PropTypes.shape({})),
	loadingCategories: PropTypes.bool.isRequired,
	storePlayersAction: PropTypes.func.isRequired,
	players: PropTypes.array.isRequired,
	categorySelected: PropTypes.number,
	difficultySelected: PropTypes.string,
	allCategoriesShown: PropTypes.bool,
	setSelectedCategoryAction: PropTypes.func.isRequired,
	setSelectedDifficultyAction: PropTypes.func.isRequired,
	toggleCategoriesAction: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	questions: state.questions,
	categories: state.categories,
	players: state.players,
	loadingCategories: state.loadingCategories,
	categorySelected: state.categorySelected,
	difficultySelected: state.difficultySelected,
	allCategoriesShown: state.allCategoriesShown,
})

const mapDispatchToProps = { storePlayersAction, setSelectedCategoryAction, setSelectedDifficultyAction, toggleCategoriesAction }

export default connect(mapStateToProps, mapDispatchToProps)(Index)