import { Controller, OnStart, OnInit, OnTick, Dependency } from "@flamework/core"
import { Events, Functions } from "client/events"
import Signal from "shared/utility/signal"
import { HazardController } from "./hazard-controller"

@Controller({})
export class GameController implements OnTick, OnInit, OnStart {
	public best_score = 0
	public score = 0
	public time = 0
	public running = false

	public score_changed = new Signal<(score: number) => void>()
	public game_started = new Signal<() => void>()
	public game_ended = new Signal<(score: number) => void>()

	public async onInit() {
		const player_data = await Functions.getProfileData.invoke()
		this.best_score = player_data.best_score
	}

	public onStart(): void {}

	public onTick(dt: number): void {
		if (!this.running) return
		this.time += dt

		if (math.floor(this.time) !== this.score) {
			this.score = math.floor(this.time)
			this.score_changed.fire(this.score)
		}
	}

	public startGame() {
		this.score = 0
		this.time = 0
		this.running = true
		this.game_started.fire()
	}

	public stopGame() {
		this.running = false
		this.game_ended.fire(this.score)

		Dependency(HazardController).destroyHazards()

		// TODO: move this somewhere else
		if (this.score > this.best_score) {
			this.best_score = this.score
			Events.updateHighScore.fire(this.score)
		}
	}
}
