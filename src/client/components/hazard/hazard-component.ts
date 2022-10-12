import { BaseComponent, Component } from "@flamework/components"
import { OnStart } from "@flamework/core"
import { Debris, TweenService } from "@rbxts/services"
import { spawnDebris } from "shared/utility/component-util"
import { CanExplode } from "../../../../types/interfaces/CanExplode"

interface Attributes {}
@Component({ tag: "hazard" })
export class HazardComponent
	extends BaseComponent<Attributes, Part>
	implements OnStart, CanExplode
{
	public onStart() {
		// Move hazard towards ground
		const pos = this.instance.Position
		const tween = TweenService.Create(this.instance, new TweenInfo(5, Enum.EasingStyle.Linear), {
			Position: new Vector3(pos.X, 5.45, pos.Z),
		})

		// Destroy when finished moving
		this.maid.GiveTask(tween.Completed.Connect(() => this.explode()))
		this.maid.GiveTask(tween) // disconnect before destroying
		tween.Play()
	}

	// Break the component into multiple pieces
	public explode() {
		spawnDebris(this.instance)
		Debris.AddItem(this.instance, 0)
	}
}
