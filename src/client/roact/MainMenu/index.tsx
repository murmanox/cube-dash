import { Dependency } from "@flamework/core"
import Roact from "@rbxts/roact"
import { RunService } from "@rbxts/services"
import { GameController } from "client/controllers/game-controller"
import PlayButton from "./components/PlayButton"
import { hooked, useEffect, useState } from "@rbxts/roact-hooked"

interface Props {}

const MainMenu = hooked<Props>((props) => {
	const [state, setState] = useState(true)

	// TODO: make this a hook?
	// handle starting and stopping game
	useEffect(() => {
		if (RunService.IsRunning()) {
			const game_controller = Dependency(GameController)
			if (!state) {
				game_controller.startGame()
			} else {
				game_controller.stopGame()
			}
		}
	}, [state])

	return (
		<frame
			Size={UDim2.fromScale(1, 1)}
			Transparency={1}
			Event={{
				InputBegan: (rbx, input) => {
					if (RunService.IsRunning()) return
					if (input.UserInputType === Enum.UserInputType.MouseButton1) {
						setState(!state)
					}
				},
			}}
		>
			{state && <PlayButton activated={() => setState(false)} />}
		</frame>
	)
})

export = MainMenu
