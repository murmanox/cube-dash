import Roact from "@rbxts/roact"
import { hooked, useContext, useReducer } from "@rbxts/roact-hooked"
import { Actions, initial_store, Store, StoreContext } from "../context"

const reducer = (state: Store, action: Actions): typeof initial_store => {
	switch (action) {
		case "increment":
			return { ...state, highscore: state.highscore + 1 }
		case "exp":
			return { ...state, exp: state.exp + 1 }
		default:
			return state
	}
}

export const Provider = hooked((props) => {
	const [state, dispatch] = useReducer(reducer, initial_store)

	return (
		<StoreContext.Provider value={[state, dispatch]}>{props[Roact.Children]}</StoreContext.Provider>
	)
})
