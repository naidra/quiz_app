import { Component } from "react"
import { connect } from "react-redux"
import { getQuestionsAction, passToNextQuestionAction } from "../../actions/quizActions"
import PropTypes from "prop-types"
import queryString from "query-string"
import AddScoreModal from "../../components/modals/addScoreModal"
import Layout from "../../components/Layout"

class PlayQuiz extends Component {
	static async getInitialProps(ctx) {
		const { store, query } = ctx
		const { difficulty } = queryString.parse(ctx.asPath.split("?")[1])
		await store.dispatch(getQuestionsAction(query.category_id, difficulty, ctx))
		return {}
	}

	render() {
		const { questions, passToNextQuestionActionHandler } = this.props
		return (
			<Layout header_text="Quiz app" app_description="A place to test yourself and learn">
				<div className="play_quiz-wrapper">
					<h2>Play quiz wrapper</h2>
					<ul className="questions-wrapper">
						{questions.map(item => <li key={item.question}>{item.question}</li>)}
					</ul>
					<button type="button" onClick={() => passToNextQuestionActionHandler(questions)}>To next question</button>
					<AddScoreModal />
				</div>
			</Layout>
		)
	}
}

PlayQuiz.propTypes = {
	questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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