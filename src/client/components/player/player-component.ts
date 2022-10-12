import { Dependency, Flamework, OnRender, OnStart } from "@flamework/core"
import { Component, BaseComponent, Components } from "@flamework/components"
import { Debris, TweenService, UserInputService, Workspace } from "@rbxts/services"
import { v3 } from "shared/utility/vector3-utils"
import { GameController } from "client/controllers/game-controller"
import { CanExplode } from "../../../../types/interfaces/CanExplode"
import { spawnDebris } from "shared/utility/component-util"

const overlap_params = new OverlapParams()
overlap_params.FilterType = Enum.RaycastFilterType.Whitelist
overlap_params.FilterDescendantsInstances = [Workspace.Hazards]

interface Attributes {}

const PARTICLE_DELAY = 0.1

@Component({ tag: "player" })
export class PlayerComponent
	extends BaseComponent<Attributes, PlayerCube>
	implements OnRender, OnStart, CanExplode
{
	public mass = this.instance.GetMass()
	public movement_direction = v3.zero
	public alive = true

	private game = Dependency(GameController)
	private last_particle_time = 0

	public onStart(): void {}

	public onRender(dt: number): void {
		if (!this.alive) return

		if (this.checkCollision()) {
			this.handleCollision()
		}

		// Spawn particle at player's current location
		if (tick() - this.last_particle_time > PARTICLE_DELAY) {
			this.instance.Attachment.ParticleEmitter.Emit(1)
			this.last_particle_time = tick()
		}
	}

	/**
	 * Check if the player has collided with any objects
	 */
	private checkCollision(): boolean {
		const result = Workspace.GetPartBoundsInBox(
			this.instance.CFrame,
			this.instance.Size.mul(0.95),
			overlap_params
		)

		const collision = result.size() > 0
		return collision
	}

	/**
	 * Break the player into pieces and end the game
	 */
	private handleCollision() {
		this.alive = false
		this.game.stopGame()

		// TODO: Break player here instead of shrink
		this.explode()
		const tween = TweenService.Create(this.instance, new TweenInfo(0.75, Enum.EasingStyle.Linear), {
			Size: new Vector3(2, 0, 2),
		})

		tween.Completed.Connect(() => {
			this.destroy()
		})
	}

	public explode() {
		spawnDebris(this.instance)
		Debris.AddItem(this.instance, 0)
	}
}
