import Roact, { JsxInstanceEvents } from "@rbxts/roact"
import { hooked, useBinding, useEffect } from "@rbxts/roact-hooked"
import useRenderStepped from "client/roact/hooks/use-renderstepped"

interface Props {
	activated?: JsxInstanceEvents<TextButton>["Activated"]
}

const PlayButton = hooked<Props>((props) => {
	const [rotation, setRotation] = useBinding(
		// Random rotation phase from -pi to +pi
		math.random() * (math.random() < 0.5 ? -1 : 1) * math.pi
	)

	// Animate button on RenderStep
	useRenderStepped((dt) => {
		setRotation(rotation.getValue() + dt)
	})

	return (
		<textbutton
			Key="PlayButton"
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Font={Enum.Font.FredokaOne}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			Size={new UDim2(0.5, 0, 0.25, 0)}
			Text="PLAY"
			TextColor3={Color3.fromRGB(255, 255, 255)}
			TextScaled={true}
			TextSize={14}
			TextWrapped={true}
			Rotation={rotation.map((t) => math.sin(t * 2) * 7)}
			Event={{
				Activated: props.activated,
			}}
		>
			<uistroke Thickness={2} />
		</textbutton>
	)
})

export = PlayButton
