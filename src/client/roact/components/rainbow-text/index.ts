import Roact from "@rbxts/roact"
import { hooked } from "@rbxts/roact-hooked"

const rgb = [
	[1, 1, 1, 0.5, 0, 0, 0, 0, 0, 0.5, 1, 1],
	[0, 0, 0, 0, 0, 0.5, 1, 1, 1, 1, 1, 0.5],
	[0, 0.5, 1, 1, 1, 1, 1, 0.5, 0, 0, 0, 0],
]


interface Props {}

const RainbowText = hooked<Props>((props) => {
	return <frame></frame>
})

export default RainbowText