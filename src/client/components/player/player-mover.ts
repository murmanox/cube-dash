import { Dependency, OnRender, OnStart } from "@flamework/core"
import { Component, BaseComponent, Components } from "@flamework/components"
import { PlayerInput } from "./player-input"
import { PlayerComponent } from "./player-component"
import { v3 } from "shared/utility/vector3-utils"
import { Instant, SingleMotor, Spring } from "@rbxts/flipper"

const sameSign = (a: number, b: number) => math.sign(a) === math.sign(b)
const makeSpring = (options?: { frequency: number; dampingRatio: number }) => {
	return (v: number) => new Spring(v, options)
}

const USE_SPRING = false

interface Attributes {
	max_speed: number
}

const attributes = {
	max_speed: 3,
}

@Component({ tag: "player", defaults: attributes })
export class PlayerMover
	extends BaseComponent<Attributes, PlayerCube>
	implements OnStart, OnRender
{
	public same_direction_time = 0
	public mass = this.instance.GetMass()

	private player_input?: PlayerInput
	private target_velocity = v3.zero
	private motor = new SingleMotor(0)

	onStart() {
		const spring = makeSpring({ frequency: 0.3, dampingRatio: 1 })
		const onChange = (dir: Vector3) => {
			this.same_direction_time = 0

			if (USE_SPRING) {
				this.motor.setGoal(new Instant(this.getLinearVelocity().X))
				this.motor.step(1)
				this.motor.setGoal(spring(dir.X * this.attributes.max_speed * this.mass))
			}
		}

		// temporary workaround due to race condition when referencing components on same instance
		task.defer(() => {
			this.player_input = Dependency<Components>().getComponent<PlayerInput>(this.instance)
			this.player_input.direction_changed.connect(onChange)
		})
	}

	onRender(dt: number) {
		if (!this.player_input) return

		const direction = this.player_input.direction
		this.target_velocity = direction.mul(this.attributes.max_speed)
		this.same_direction_time += dt

		// update player's velocity
		if (direction.Magnitude !== 0) {
			this.setLinearVelocity()
			this.setAngularVelocity()
		}
	}

	private setLinearVelocity() {
		// should acceleration be handled by a spring?
		if (USE_SPRING) {
			const speed = this.motor.getValue()
			const new_velocity = new Vector3(speed, 0, 0)
			this.instance.AssemblyLinearVelocity = new_velocity
			return
		}

		let alpha_value = 0.05
		const assembly_velocity = this.instance.AssemblyLinearVelocity

		const is_moving = assembly_velocity.Magnitude > 0
		const is_different_direction = sameSign(assembly_velocity.X, this.target_velocity.X)

		if (is_moving && is_different_direction) {
			// decrease lerp alpha to simulate acceleration when switching directions
			alpha_value *= 0.25
		}

		const new_velocity = this.getLinearVelocity().Lerp(
			this.target_velocity.mul(this.mass),
			alpha_value
		)
		this.instance.AssemblyLinearVelocity = new_velocity
	}

	private setAngularVelocity() {
		const new_angular = v3.zero.Lerp(
			new Vector3(0, 0, -this.target_velocity.X / 16),
			math.clamp(this.same_direction_time / 0.3, 0, 1)
		)
		this.instance.AssemblyAngularVelocity = new_angular.mul(math.pi * 2 * this.mass)
	}

	private getLinearVelocity() {
		return this.instance.AssemblyLinearVelocity
	}
}
