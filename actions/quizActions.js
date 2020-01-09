import appTypes from "./types"
import AppServices from "../services"
import Cookies from 'js-cookie'
import cookies from "next-cookies"

const appServices = new AppServices()

export const getCategoriesAction = () => async dispatch => {
	try {
		dispatch({ type: appTypes.GET_CATEGORIES_IDS_STARTED })
		const { data } = await appServices.getQuestionCategories()
		dispatch({ type: appTypes.GET_CATEGORIES_IDS_SUCCESS, payload: data.trivia_categories })
	} catch (error) {
		dispatch({ type: appTypes.GET_CATEGORIES_IDS_ERROR, payload: error })
	}
}

export const getQuestionsAction = (id, difficulty, ctx) => async dispatch => {
	const { actual_questions } = ctx.isServer ? cookies(ctx) : {}

	try {
		dispatch({ type: appTypes.GET_QUESTIONS_STARTED })
		if(actual_questions) {
			dispatch({ type: appTypes.GET_QUESTIONS_SUCCESS, payload: actual_questions })
		} else {
			const { data } = await appServices.getQuestions(id, difficulty)
			dispatch({ type: appTypes.GET_QUESTIONS_SUCCESS, payload: data.results })
			Cookies.set("actual_questions", JSON.stringify(data.results), { expires: 7, path: '/playQuiz' })
		}
	} catch (error) {
		dispatch({ type: appTypes.GET_QUESTIONS_ERROR, payload: error })
	}
}

export const passToNextQuestionAction = questions => {
	const questionsUpdated = [...questions]
	questionsUpdated.shift()

	Cookies.set("actual_questions", JSON.stringify(questionsUpdated), { expires: 7, path: '/playQuiz' })
	return { type: appTypes.GET_QUESTIONS_SUCCESS, payload: questionsUpdated }
}

export const storePlayersAction = players => ({ type: appTypes.STORE_PLAYERS, payload: players })

export const addPlayerNameAction = name => ({ type: appTypes.ADD_PLAYER_NAME, payload: name })

