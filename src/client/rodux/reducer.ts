import Rodux from "@rbxts/rodux"
import { MenuActions, MenuStates, SET_MENU } from "./menu-types"

interface MenuState {
	state: MenuStates
}

const initial_state: MenuState = {
	state: MenuStates.main,
}

const reducer = Rodux.createReducer<MenuState, MenuActions>(initial_state, {
	[SET_MENU]: (state, action) => {
		return { ...state, state: action.state }
	},
})

export default reducer
