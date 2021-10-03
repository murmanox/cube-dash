import { Flamework } from "@flamework/core"
import { Dependency } from "@flamework/core"
import Roact from "@rbxts/roact"
import { Players } from "@rbxts/services"
import { GameController } from "./controllers/game-controller"
import { ScoreCounter } from "./user-interface/score-counter"

Flamework.addPaths("src/client/components")
Flamework.addPaths("src/client/controllers")
Flamework.addPaths("src/shared/components")

Flamework.ignite()

const [score, setScore] = Roact.createBinding(0)
const [best_score, setBestScore] = Roact.createBinding(0)

Roact.mount(
	<screengui IgnoreGuiInset={true}>
		<ScoreCounter score={score} best={best_score} />
	</screengui>,
	Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui
)

game.IsLoaded() || game.Loaded.Wait()
const game_controller = Dependency(GameController)
game_controller.score_changed.connect((score) => {
	setScore(score)

	if (score > best_score.getValue()) {
		setBestScore(score)
	}
})

game_controller.startGame()
