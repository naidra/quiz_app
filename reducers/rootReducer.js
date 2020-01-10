import appTypes from "../actions/types"

export const initialState = {
	loadingQuestions: false,
	loadingCategories: false,
	players: [],
	questions: [],
	categories: [],
	playerName: "",
	categorySelected: null,
	difficultySelected: "easy",
	allCategoriesShown: false,
	error: null
}

export function rootReducer(state = initialState, action) {
	switch (action.type) {
	case appTypes.SET_PLAYERS_DATA:
		return { ...state, players: action.payload }

	case appTypes.GET_CATEGORIES_IDS_STARTED:
		return { ...state, loadingCategories: true }

	case appTypes.GET_CATEGORIES_IDS_SUCCESS:
		return { ...state, categories: action.payload,  loadingCategories: false }

	case appTypes.GET_CATEGORIES_IDS_ERROR:
		return { ...state, error: action.payload,  loadingCategories: false }

	case appTypes.GET_QUESTIONS_STARTED:
		return { ...state, loadingQuestions: true }

	case appTypes.GET_QUESTIONS_SUCCESS:
		return { ...state, questions: action.payload,  loadingQuestions: false }

	case appTypes.GET_QUESTIONS_ERROR:
		return { ...state, error: action.payload,  loadingQuestions: false }

	case appTypes.STORE_PLAYERS:
		return { ...state, players: action.payload }

	case appTypes.ADD_PLAYER_NAME:
		return { ...state, playerName: action.payload }

	case appTypes.SET_SELECTED_CATEGORY:
		return { ...state, categorySelected: action.payload }

	case appTypes.SET_SELECTED_DIFFICULTY:
		return { ...state, difficultySelected: action.payload }

	case appTypes.TOGGLE_CATEGORIES:
		return { ...state, allCategoriesShown: action.payload }

	default:
		return state
	}
}