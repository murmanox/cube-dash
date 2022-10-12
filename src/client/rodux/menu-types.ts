// export type MenuStates = "main" | "hidden" | "settings"
export enum MenuStates {
	main = "main",
	hidden = "hidden",
	settings = "settings",
}

export const SET_MENU = "menu/set_menu"
export interface SetMenuAction {
	type: typeof SET_MENU
	state: MenuStates
}

export type MenuActions = SetMenuAction
