import { OnStart } from "@flamework/core"
import { Component, BaseComponent } from "@flamework/components"

interface Attributes {}

@Component({ tag: "spawner" })
export class SpawnerComponent extends BaseComponent<Attributes, BasePart> implements OnStart {
	onStart() {
		this.instance.Transparency = 1
	}
}
