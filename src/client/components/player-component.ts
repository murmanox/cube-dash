import { Dependency, Flamework, OnRender, OnStart } from "@flamework/core"
import { Component, BaseComponent, Components } from "@flamework/components"
import { TweenService, UserInputService, Workspace } from "@rbxts/services"
import { v3 } from "shared/utility/signal/vector3-utils"
import { HazardController } from "client/controllers/hazard-controller"
import { GameController } from "client/controllers/game-controller"
import { Hazard } from "./hazard-component"
import Signal from "shared/utility/signal"

const overlap_params = new OverlapParams()
overlap_params.FilterType = Enum.RaycastFilterType.Whitelist
overlap_params.FilterDescendantsInstances = [Workspace.Hazards]

interface Attributes {
	direction: Vector3
	max_speed: number
}

const attributes = {
	direction: v3.zero,
	max_speed: 3,
}

const PARTICLE_DELAY = 0.1

@Component({ tag: "player", defaults: attributes })
export class PlayerComponent
	extends BaseComponent<Attributes, PlayerCube>
	implements OnRender, OnStart
{
	public mass = this.instance.GetMass()
	public same_direction_movement_time = 0
	public movement_direction = v3.zero
	public alive = true

	private game = Dependency(GameController)
	private last_particle_time = 0

	public onStart(): void {
		// Make sure the instance is cleaned up when this component is destroyed
		this.maid.GiveTask(this.instance)
	}

	public onRender(dt: number): void {
		if (!this.alive) return

		this.handleInput()
		this.handleMovement(dt)

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
	 * Detect which keys are being pressed by the player to get their desired move direction
	 */
	private handleInput() {
		const left = UserInputService.IsKeyDown(Enum.KeyCode.S) ? 1 : 0
		const right = UserInputService.IsKeyDown(Enum.KeyCode.F) ? -1 : 0

		const direction = new Vector3(left + right, 0, 0)
		if (direction.Magnitude > 0) {
			this.attributes.direction = direction.Unit
		} else {
			this.attributes.direction = v3.zero
		}
	}

	/**
	 * Update the instance's LinearVelocity and AngularVelocity based on the desired move direction and speed
	 */
	private handleMovement(dt: number) {
		const assembly_velocity = this.instance.AssemblyLinearVelocity
		const target_velocity = this.attributes.direction.mul(this.attributes.max_speed)

		// update stats used for determining acceleration
		if (this.movement_direction === target_velocity.Unit) {
			this.same_direction_movement_time += dt
		} else {
			this.movement_direction = target_velocity.Unit
			this.same_direction_movement_time = 0
		}

		// player isn't moving, let physics handle stopping
		if (this.attributes.direction.Magnitude === 0) return

		// set movement values on instance
		let alpha_value = 0.05
		if (
			assembly_velocity.Magnitude > 0 &&
			math.sign(assembly_velocity.X) !== math.sign(target_velocity.X)
		) {
			alpha_value *= 0.25
		}

		const new_velocity = assembly_velocity.Lerp(target_velocity.mul(this.mass), alpha_value)
		this.instance.AssemblyLinearVelocity = new_velocity

		const new_angular = v3.zero.Lerp(
			new Vector3(0, 0, -target_velocity.X / 16),
			math.clamp(this.same_direction_movement_time / 0.3, 0, 1)
		)
		this.instance.AssemblyAngularVelocity = new_angular.mul(math.pi * 2 * this.mass)
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
		if (collision) print(result.join())
		return collision
	}

	/**
	 * Break the player into pieces and end the game
	 */
	private handleCollision() {
		this.alive = false
		this.game.stopGame()

		// TODO: Break player here instead of shrink
		const tween = TweenService.Create(this.instance, new TweenInfo(0.75, Enum.EasingStyle.Linear), {
			Size: new Vector3(2, 0, 2),
		})

		tween.Completed.Connect(() => {
			this.destroy()
		})
	}
}
