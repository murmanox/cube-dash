import Roact from "@rbxts/roact"
import ScoreCounter from "./score-counter"

export = (story: GuiObject) => {
	const [score, setScore] = Roact.createBinding(0)
	const [best_score, setBestScore] = Roact.createBinding(0)
	const handle = Roact.mount(<ScoreCounter score={score} best={best_score} />, story)

	let running = true
	task.spawn(() => {
		// increase score's value once per second
		while (running) {
			task.wait(1)
			setScore(score.getValue() + 1)

			if (score.getValue() > best_score.getValue()) {
				setBestScore(score.getValue())
			}
		}
	})

	return () => {
		running = false
		Roact.unmount(handle)
	}
}
