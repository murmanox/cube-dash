import Roact from "@rbxts/roact"
import { hooked, useBinding, useMutable } from "@rbxts/roact-hooked"
import useRenderStepped from "client/roact/hooks/use-renderstepped"

const rgb = [
	new Color3(1, 0, 0),
	new Color3(1, 0, 0.5),
	new Color3(1, 0, 1),
	new Color3(0.5, 0, 1),
	new Color3(0, 0, 1),
	new Color3(0, 0.5, 1),
	new Color3(0, 1, 1),
	new Color3(0, 1, 0.5),
	new Color3(0, 1, 0),
	new Color3(0.5, 1, 0),
	new Color3(1, 1, 0),
	new Color3(1, 0.5, 0),
]

function getColour(v: number) {
	const c1 = rgb[math.floor(v) % rgb.size()]
	const c2 = rgb[math.ceil(v) % rgb.size()]
	const alpha = v % 1
	return c1.Lerp(c2, alpha)
}

interface Props {}

const RainbowText = hooked<Props>((props) => {
	const [colour, setColour] = useBinding(0)

	useRenderStepped((_, total) => {
		setColour(total)
	})

	return <frame Size={UDim2.fromScale(1, 1)} BackgroundColor3={colour.map(getColour)} />
})

export default RainbowText
