import { Components } from "@flamework/components"
import { Controller, OnInit, OnTick, Dependency } from "@flamework/core"
import { CollectionService, Debris, ReplicatedFirst, Workspace } from "@rbxts/services"
import { HazardComponent } from "client/components/hazard/hazard-component"
import { GameController } from "./game-controller"

const HAZARD_PREFAB = ReplicatedFirst.Hazard
const hazard_area = Workspace.PlayArea.HazardArea

@Controller({})
export class HazardController implements OnInit, OnTick {
	game = Dependency(GameController)
	time = 0
	spawn_time = 0.5
	speed_multiplier = 1
	hazard_counter = 0

	public onInit() {
		this.game.game_started.connect(() => {
			this.time = 0
			this.speed_multiplier = 1
		})
	}

	public onTick(dt: number) {
		if (!this.game.running) return

		this.time += dt
		if (this.time >= this.spawn_time) {
			this.time -= this.spawn_time
			this.spawnHazards(math.random(1, 2))
		}
	}

	/**
	 * Will attempt to randomly spawn hazards above the play area without overlapping existing hazards.
	 * @param amount Amount of hazards to spawn
	 */
	public spawnHazards(amount: number) {
		const lower = hazard_area.Position.X - hazard_area.Size.X / 2
		const upper = hazard_area.Position.X + hazard_area.Size.X / 2

		// Used to track which values have already been selected, so multiple hazards aren't spawned in the same place.
		const positions = new Set<number>()
		for (let i = 0; i < amount; i++) {
			for (let j = 0; j < 10; j++) {
				const hazard_x = math.round(math.random(lower + 1, upper - 1) / 2) * 2
				if (!positions.has(hazard_x)) {
					this.spawnHazard(new Vector3(hazard_x, hazard_area.Position.Y, hazard_area.Position.Z))
					break
				}
			}
		}
	}

	/**
	 * Create a hazard at the specified location.
	 */
	private spawnHazard(position: Vector3) {
		const hazard = HAZARD_PREFAB.Clone()

		hazard.Name = "Hazard" + this.hazard_counter++
		hazard.Position = position
		hazard.Parent = Workspace.Hazards
		CollectionService.AddTag(hazard, "hazard")
	}

	/**
	 * Destroys all active hazards
	 */
	public destroyHazards() {
		Dependency(Components)
			.getAllComponents<HazardComponent>()
			.forEach((v) => v.explode())
	}
}
