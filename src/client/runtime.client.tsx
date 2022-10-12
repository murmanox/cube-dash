import { Components } from "@flamework/components"
import { Flamework } from "@flamework/core"
import { Dependency } from "@flamework/core"
import Roact from "@rbxts/roact"
import { CollectionService, Players, Workspace } from "@rbxts/services"
import { CameraComponent } from "./components/camera-component"
import { GameController } from "./controllers/game-controller"
import { PlayerSpawnController } from "./controllers/player-spawn-controller"
import MainMenu from "./roact/MainMenu"
import ScoreCounter from "./user-interface/score-counter"

const onCameraChanged = () => {
	if (Workspace.CurrentCamera) CollectionService.AddTag(Workspace.CurrentCamera, "camera")
}
Workspace.GetPropertyChangedSignal("CurrentCamera").Connect(onCameraChanged)
onCameraChanged()

Flamework.addPaths("src/client/components")
Flamework.addPaths("src/client/controllers")
Flamework.addPaths("src/shared/components")

Flamework.ignite()

const [score, setScore] = Roact.createBinding(0)
const [best_score, setBestScore] = Roact.createBinding(0)

Roact.mount(
	<screengui IgnoreGuiInset={true}>
		<ScoreCounter score={score} best={best_score} />
		<MainMenu />
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

// don't put this here?
game_controller.game_started.connect(() => {
	const player = Dependency(PlayerSpawnController).spawnPlayer()
	Dependency(Components)
		.getComponent<CameraComponent>(Workspace.CurrentCamera!)
		.setTarget(player)
		.setTransform("target", (v) => new Vector3(v.X, 5.45, v.Z)) // don't hardcode this
})

game_controller.game_ended.connect(() => {
	// update highscore
})
