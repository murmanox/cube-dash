import Roact from "@rbxts/roact"
import { hooked, useBinding } from "@rbxts/roact-hooked"
import { Binding } from "../../../../../../types/util/components"

interface Props {
	Position: Binding<UDim2>
	AspectRatio?: Binding<number>
}

const SliderThumb = hooked<Props>(({ Position, AspectRatio = 1 }) => {
	const [colour, setColour] = useBinding(new Color3(1, 1, 1))

	const hover = (enter: boolean) => () => {
		setColour(enter ? new Color3(0.9, 0.9, 0.9) : new Color3(1, 1, 1))
	}

	return (
		<frame
			Size={new UDim2(1, 0, 0.55, 0)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Position={Position}
			BackgroundColor3={colour}
			Event={{ MouseEnter: hover(true), MouseLeave: hover(false) }}
		>
			<uicorner CornerRadius={new UDim(1)} />
			<uiaspectratioconstraint AspectRatio={1} />
		</frame>
	)
})

export default SliderThumb
