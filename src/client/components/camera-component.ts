import { OnRender, OnStart } from "@flamework/core"
import { Component, BaseComponent } from "@flamework/components"
import { GroupMotor, Spring } from "@rbxts/flipper"
import { toTuple, v3 } from "shared/utility/vector3-utils"
import { Workspace } from "@rbxts/services"

interface Attributes {
	position_offset: Vector3
	target_offset: Vector3
	field_of_view: number
}

const spring = (v: number) => new Spring(v, { frequency: 1 })
const DEFAULT_TARGET = Workspace.PlayArea.Spawn

@Component({
	tag: "camera",
	defaults: {
		position_offset: new Vector3(0, 5, -33),
		target_offset: new Vector3(0, 3, 0),
		field_of_view: 35,
	},
})
export class CameraComponent
	extends BaseComponent<Attributes, Camera>
	implements OnStart, OnRender
{
	public position = v3.zero
	public target?: PVInstance = DEFAULT_TARGET

	private position_motor = new GroupMotor<[number, number, number]>([0, 0, 0])
	private target_previous_position?: Vector3
	private movement_tolerance = 0.01

	private transforms = {
		target: (v: Vector3) => v,
	}

	onStart() {
		this.instance.CameraType = Enum.CameraType.Scriptable
		this.position_motor.onStep((arr) => this.setPosition(new Vector3(...arr)))

		// move to starting position
		this.position_motor.setGoal(toTuple(this.target!.GetPivot().Position).map((v) => spring(v)))
		this.instance.FieldOfView = this.attributes.field_of_view

		this.maid.GiveTask(
			this.instance.GetPropertyChangedSignal("CameraType").Connect(() => {
				this.instance.CameraType = Enum.CameraType.Scriptable
			})
		)

		this.onRender()
	}

	onRender() {
		// make sure we have a target to follow
		if (!this.target || !this.target.IsDescendantOf(Workspace)) {
			this.target = DEFAULT_TARGET
		}

		// check if the target has moved and update goal position
		const target_position = this.transforms
			.target(this.target.GetPivot().Position)
			.add(this.attributes.target_offset)

		// update position of camera
		this.instance.CFrame = CFrame.lookAt(
			this.position.add(this.attributes.position_offset),
			this.position
		)

		if (
			!this.target_previous_position ||
			target_position.sub(this.target_previous_position).Magnitude > this.movement_tolerance
		) {
			this.position_motor.setGoal(toTuple(target_position).map((v) => spring(v)))
		}

		// update previous position
		this.target_previous_position = target_position
	}

	setTarget(target: PVInstance) {
		this.target = target
		return this
	}

	setPosition(position: Vector3) {
		this.position = position
		return this
	}

	setTransform(name: keyof CameraComponent["transforms"], func: (input: Vector3) => Vector3) {
		this.transforms[name] = func
		return this
	}
}
