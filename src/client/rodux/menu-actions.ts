import { MenuStates, SetMenuAction, SET_MENU } from "./menu-types"

export const setMenu = (state: MenuStates): SetMenuAction => {
	return {
		type: SET_MENU,
		state,
	}
}
