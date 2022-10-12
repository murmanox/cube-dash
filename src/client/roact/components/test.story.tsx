import Roact, { mount, unmount } from "@rbxts/roact"
import {
	hooked,
	useBinding,
	useContext,
	useEffect,
	useMemo,
	useMutable,
	useReducer,
	useRef,
} from "@rbxts/roact-hooked"
import { initial_store, StoreContext } from "../context"
import { Provider } from "./provider"

const ExpButton = hooked((props) => {
	const [state, dispatch] = useContext(StoreContext)
	const render_count = useMutable(0).current++

	return (
		<textbutton
			Size={UDim2.fromScale(1, 0.5)}
			Text={`exp: ${state.exp}, render: ${render_count}`}
			Event={{
				Activated: () => {
					dispatch("exp")
				},
			}}
		/>
	)
})

const HighScoreButton = hooked((props) => {
	const [state, dispatch] = useContext(StoreContext)

	return useMemo(() => {
		const render_count = useMutable(0).current++
		return (
			<textbutton
				Size={UDim2.fromScale(1, 0.5)}
				Text={`highscore: ${state.highscore}, render: ${render_count}`}
				Event={{
					Activated: () => {
						dispatch("increment")
					},
				}}
			/>
		)
	}, [state.highscore])
})

export = (story: GuiObject) => {
	const handle = mount(
		<Provider>
			<uilistlayout />
			<HighScoreButton />
			<ExpButton />
		</Provider>,
		story
	)
	return () => {
		unmount(handle)
	}
}
