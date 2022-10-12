import { UserInputService } from "@rbxts/services"
import { v3 } from "shared/utility/vector3-utils"
import { OnRender, OnStart } from "@flamework/core"
import { Component, BaseComponent } from "@flamework/components"
import Signal from "shared/utility/signal"

interface Attributes {}

@Component({ tag: "player" })
export class PlayerInput
	extends BaseComponent<Attributes, PlayerCube>
	implements OnStart, OnRender
{
	public direction: Vector3 = v3.zero

	direction_changed = new Signal<(direction: Vector3) => void>()

	onStart() {}
	onRender() {
		const left = UserInputService.IsKeyDown(Enum.KeyCode.S) ? 1 : 0
		const right = UserInputService.IsKeyDown(Enum.KeyCode.F) ? -1 : 0

		const direction = new Vector3(left + right, 0, 0)

		const prev = this.direction
		this.direction = direction.Magnitude ? direction.Unit : v3.zero

		if (this.direction !== prev) {
			this.direction_changed.fire(this.direction)
		}
	}
}
