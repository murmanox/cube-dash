import Roact from "@rbxts/roact"
import Hooks from "@rbxts/roact-hooks"

interface ScoreCounterProps {
	score: Roact.Binding<number>
	best: Roact.Binding<number>
}

export const context = Roact.createContext<{ Font: Enum.Font; TextColor3: Color3 }>({
	Font: Enum.Font.FredokaOne,
	TextColor3: new Color3(1, 1, 1),
})

const scoreCounter: Hooks.FC<ScoreCounterProps> = (props) => {
	return (
		<frame
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundTransparency={1}
			Position={new UDim2(0.5, 0, 0.02, 0)}
			Size={new UDim2(0.5, 0, 0.2, 0)}
		>
			<textlabel
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Font={Enum.Font.FredokaOne}
				Position={new UDim2(0.5, 0, 0, 0)}
				Size={new UDim2(1, 0, 0.85, 0)}
				Text={props.score.map(tostring)}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
			>
				<uistroke Thickness={2} />
			</textlabel>
			<textlabel
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Font={Enum.Font.FredokaOne}
				Position={new UDim2(0.5, 0, 0.8, 0)}
				Size={new UDim2(1, 0, 0.2, 0)}
				Text={props.best.map((v) => `BEST: ${v}`)}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
			>
				<uistroke Thickness={2} />
			</textlabel>
		</frame>
	)
}

export const ScoreCounter = new Hooks(Roact)(scoreCounter, {
	name: "score_counter",
})
