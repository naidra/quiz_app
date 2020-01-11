import { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import queryString from "query-string"
import Router from "next/router"
import ReactHtmlParser from "react-html-parser"
import Link from "next/link"
import {
	getQuestionsAction,
	passToNextQuestionAction,
	setSelectedCategoryAction,
	setSelectedDifficultyAction,
	increaseScoreAction,
	selectAnswerAction
} from "../../actions/quizActions"
import AddScoreModal from "../../components/modals/addScoreModal"
import Layout from "../../components/Layout"

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

	componentDidMount() {
		const { score, questions, increaseScoreActionHandler } = this.props
		const scoreStored = localStorage.getItem("player_score")
		if (!score && scoreStored) increaseScoreActionHandler(+scoreStored)
		if (scoreStored && questions.length === 10) {
			increaseScoreActionHandler(0)
			localStorage.removeItem("player_score")
		}
	}

	render() {
		const { questions, score, questionSelected: qs, passToNextQuestionActionHandler, increaseScoreActionHandler, selectAnswerActionHandler } = this.props
		const { question, incorrect_answers, correct_answer, type } = (questions && Array.isArray(questions) && questions.length) ? questions[0] : {}
		const answerOptions = incorrect_answers ? [...incorrect_answers] : []
		const questionCount = 11 - questions.length
		if (question) {
			const randomIndex = question.indexOf(" ") % (incorrect_answers.length + 1)
			answerOptions.splice(randomIndex, 0, correct_answer)
		}

		return (
			<Layout header_text="Quiz app" app_description="A place to test yourself and learn">
				<div className="play_quiz-wrapper">
					{
						question ?
							<div className="row py-5">
								<div className="col-6 col-md-3 pb-5">
									<h5 className="mb-4 text-center">Question <span>{questionCount}/10</span></h5>
									<div className="loader-like" style={{ "--percent": `-${questionCount * 10}%` }}></div>
								</div>
								<div className="col-6 col-md-9 text-right">
									<h5 className="mb-4 ">Score</h5>
									<h2 className="scores">{(score || 0)}</h2>
								</div>
								<h2 className="col-12">{ReactHtmlParser(question)}</h2>
								<div className={`answer-options ${type === "boolean" ? "two-options" : ""}`}>
									{answerOptions.map((answer, i) => (
										<button disabled={!!qs} key={answer}
											className={`shadow-sm option ${(qs && Array.isArray(qs) && qs[0] === i) ? (qs[1] ? "correct" : "uncorrect") : ""}`}
											onClick={() => {
												selectAnswerActionHandler([i, (answer === correct_answer)])
												if (answer === correct_answer) increaseScoreActionHandler((score || 0) + 10)
												setTimeout(() => passToNextQuestionActionHandler(questions), 2000)
											}}>{ReactHtmlParser(answer)}</button>
									))}
								</div>
							</div> :
							<>
								<AddScoreModal />
								<Link href="/">
									<a className="play_again mt-5"><h4>Play again</h4></a>
								</Link>
							</>
					}
				</div>
			</Layout>
		)
	}
}

PlayQuiz.defaultProps = {
	score: null,
	questionSelected: null
}

PlayQuiz.propTypes = {
	questions: PropTypes.arrayOf(PropTypes.shape({
		question: PropTypes.string
	})).isRequired,
	passToNextQuestionActionHandler: PropTypes.func.isRequired,
	increaseScoreActionHandler: PropTypes.func.isRequired,
	selectAnswerActionHandler: PropTypes.func.isRequired,
	score: PropTypes.number,
	questionSelected: PropTypes.array
}

const mapStateToProps = state => ({
	questions: state.questions,
	score: state.playerScore,
	questionSelected: state.questionSelected,
})

const mapDispatchToProps = dispatch => ({
	getQuestionsActionHandler: (a, b, c) => dispatch(getQuestionsAction(a, b, c)),
	passToNextQuestionActionHandler: a => dispatch(passToNextQuestionAction(a)),
	increaseScoreActionHandler: score => dispatch(increaseScoreAction(score)),
	selectAnswerActionHandler: a => dispatch(selectAnswerAction(a))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayQuiz)