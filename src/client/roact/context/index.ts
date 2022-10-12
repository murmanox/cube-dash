import { createContext } from "@rbxts/roact"
import Hooked from "@rbxts/roact-hooked/out/types"

interface Keybinds {
	left: Enum.KeyCode
	right: Enum.KeyCode
}

export interface Store {
	highscore: number
	exp: number
	keybinds: Keybinds
}

export type Actions = "increment" | "exp"

export const initial_store: Store = {
	highscore: 0,
	exp: 0,
	keybinds: {
		left: Enum.KeyCode.S,
		right: Enum.KeyCode.F,
	},
}

export const StoreContext = createContext<[Store, Hooked.Dispatch<Actions>]>([
	initial_store,
	() => {},
])
