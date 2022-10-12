import Roact, { Children, Element, JsxInstance } from "@rbxts/roact"
import { hooked } from "@rbxts/roact-hooked"

const default_colour = new Color3(1, 1, 1)
const default_filled_colour = Color3.fromRGB(79, 168, 255)

type Props = {
	thickness?: number
	filled: Roact.Binding<number>
	colour?: Color3
	filled_colour?: Color3
}

const SliderBar = hooked<Props>((props) => {
	const {
		thickness = 10,
		filled,
		colour = default_colour,
		filled_colour = default_filled_colour,
	} = props

	return (
		<>
			<frame
				AnchorPoint={new Vector2(1, 0.5)}
				BackgroundColor3={colour}
				Size={filled.map((v) => new UDim2(1 - v, 0, 0, thickness))}
				Position={UDim2.fromScale(1, 0.5)}
			>
				<uicorner CornerRadius={new UDim(1)} />
			</frame>
			<frame
				AnchorPoint={new Vector2(0, 0.5)}
				BackgroundColor3={filled_colour}
				Size={filled.map((v) => new UDim2(v, 0, 0, thickness))}
				Position={UDim2.fromScale(0, 0.5)}
			>
				<uicorner CornerRadius={new UDim(1)} />
			</frame>
		</>
	)
})

export default SliderBar
