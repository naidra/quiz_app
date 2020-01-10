import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { rootReducer } from "./reducers/rootReducer"
import thunk from "redux-thunk"

export const makeStore = (initialState) => {
	return createStore(rootReducer, initialState, composeWithDevTools(
		applyMiddleware(thunk),
		// other store enhancers if any
	))
}