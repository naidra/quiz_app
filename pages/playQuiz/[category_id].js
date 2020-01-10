import { Component } from "react"
import { connect } from "react-redux"
import { getQuestionsAction, passToNextQuestionAction, setSelectedCategoryAction, setSelectedDifficultyAction } from "../../actions/quizActions"
import PropTypes from "prop-types"
import queryString from "query-string"
import AddScoreModal from "../../components/modals/addScoreModal"
import Layout from "../../components/Layout"
import Router from "next/router"

class PlayQuiz extends Component {
	static async getInitialProps(ctx) {
		const { store, query, req, res } = ctx
		const { difficulty } = queryString.parse(ctx.asPath.split("?")[1])
		await store.dispatch(getQuestionsAction(query.category_id, difficulty, ctx))
		store.dispatch(setSelectedCategoryAction(null))
		store.dispatch(setSelectedDifficultyAction("easy"))
		if (!store.getState().questions.length) {
			if (req) {
				res.writeHead(302, { Location: "/?msg=noQuestions" })
				res.end()
				return
			} else Router.push("/?msg=noQuestions")
		}

		return {}
	}

	render() {
		const { questions, passToNextQuestionActionHandler } = this.props
		const { question } = (questions && questions[0]) ? questions[0] : {}

		return (
			<Layout header_text="Quiz app" app_description="A place to test yourself and learn">
				<div className="play_quiz-wrapper">
					{
						(question && Array.isArray(questions) && questions.length) ?
							<div className="row">
								<div className="col-6">
									<p>
										<span>Question </span>
										<span>6/10</span>
									</p>
								</div>
								<div className="col-6">
									<p>Scores count</p>
								</div>
								<div className="col-12">{question}</div>
								<div className="col-12">Option 1</div>
								<div className="col-12">Option 2</div>
								<div className="col-12">Option 3</div>
								<div className="col-12">Option 4</div>
							</div> : <AddScoreModal />
					}
					<button type="button" onClick={() => passToNextQuestionActionHandler(questions)}>To next question</button>
					{/* <ul className="questions-wrapper">
						{questions.map(item => <li key={item.question}>{item.question}</li>)}
					</ul>
					<AddScoreModal /> */}
				</div>
			</Layout>
		)
	}
}

PlayQuiz.propTypes = {
	questions: PropTypes.arrayOf(PropTypes.shape({
		question: PropTypes.string
	})).isRequired,
	passToNextQuestionActionHandler: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	questions: state.questions
})

const mapDispatchToProps = dispatch => ({
	getQuestionsActionHandler: (a, b, c) => dispatch(getQuestionsAction(a, b, c)),
	passToNextQuestionActionHandler: (a) => dispatch(passToNextQuestionAction(a))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayQuiz)