import { OnStart, OnTick } from "@flamework/core"
import { Component, BaseComponent } from "@flamework/components"
import { CollectionService, Debris, TweenService } from "@rbxts/services"

const random = new Random(tick())

interface Attributes {}

@Component({ tag: "debris" })
export class DebrisComponent extends BaseComponent<Attributes, Part> implements OnTick {
	will_be_destroyed = false

	onTick() {
		if (this.will_be_destroyed) return

		if (this.instance.AssemblyLinearVelocity.Magnitude < 0.1) {
			this.will_be_destroyed = true
			task.delay(random.NextNumber(1, 1.5), () => {
				this.tweenOut()
			})
		}
	}

	private tweenOut() {
		const tween = TweenService.Create(this.instance, new TweenInfo(1), { Transparency: 1 })
		tween.Completed.Connect(() => {
			// return part to cache
			CollectionService.RemoveTag(this.instance, "debris")
		})
		tween.Play()
	}
}
