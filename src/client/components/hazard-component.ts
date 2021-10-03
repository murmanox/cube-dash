import { OnStart } from "@flamework/core"
import { Component, BaseComponent } from "@flamework/components"
import { TweenService } from "@rbxts/services"

interface Attributes {}

@Component({ tag: "hazard" })
export class Hazard extends BaseComponent<Attributes, BasePart> implements OnStart {
	public onStart() {
		// Move hazard towards ground
		const pos = this.instance.Position
		const tween = TweenService.Create(this.instance, new TweenInfo(5, Enum.EasingStyle.Linear), {
			Position: new Vector3(pos.X, 5.45, pos.Z),
		})

		// Destroy when finsihed moving
		tween.Completed.Connect(() => this.explode())
		tween.Play()
	}

	// Break the component into multiple pieces
	public explode() {
		this.instance.Destroy()
	}
}
