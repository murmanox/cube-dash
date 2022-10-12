import { Dependency, OnStart } from "@flamework/core"
import { Component, BaseComponent, Components } from "@flamework/components"
import { PlayerInput } from "./player-input"
import { Workspace } from "@rbxts/services"

interface Attributes {}

const POSITION_OFFSET = new Vector3(0, 5, -33)
const TARGET_OFFSET = new Vector3(0, 3, 0)

@Component({ tag: "player" })
export class PlayerCameraComponent extends BaseComponent<Attributes> implements OnStart {
	player_input?: PlayerInput

	onStart() {
		// defer to avoid race condition :(
		task.defer(() => {
			this.player_input = Dependency<Components>().getComponent<PlayerInput>(this.instance)

			// make the camera go slightly ahead of where the player is moving
			this.player_input.direction_changed.connect((dir) => {
				const dir_offset = dir.mul(2)
				Workspace.CurrentCamera?.SetAttribute("target_offset", TARGET_OFFSET.add(dir_offset))
			})
		})
	}
}
