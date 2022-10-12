import { hooked, useBinding, useEffect, useMutable, useRef, useState } from "@rbxts/roact-hooked"
import Roact, { forwardRef } from "@rbxts/roact"
import { map } from "shared/utility/random"
import { isClick, isDecrement, isIncrement, isMovement } from "shared/utility/input-util"
import useMaid from "client/roact/hooks/use-maid"
import { RenderStepped } from "shared/utility/shortcut"
import { UserInputService } from "@rbxts/services"
import SliderThumb from "./components/slider-thumb"
import SliderBar from "./components/slider-bar"
import { $dbg, $print } from "rbxts-transform-debug"

const snapTo = (snap: number) => (v: number) => math.round(v / snap) * snap

type Props = {
	min?: number
	max?: number
	value?: number
	increment?: number
	onValueChanged?: (v: number) => void
}

const Slider = hooked<Props>(
	({ min = 0, max = 100, value = 75, increment = 1, onValueChanged }) => {
		const scaleMap = map(min, max)
		const snapToIncrement = snapTo(increment)
		const [current_value, set_value] = useBinding(snapToIncrement(value))
		const maid = useMaid()
		const bar_ref = useRef<Frame>()

		useEffect(() => {
			return () => maid.DoCleaning()
		}, [])

		const setValue = (v: number) => {
			// constrain value to min and max values and snap to increment
			const old_value = current_value.getValue()
			const new_value = snapToIncrement(math.clamp(v, min, max))
			set_value(new_value)

			// call onValueChanged callback if the value has changed
			if (onValueChanged && new_value !== old_value) {
				onValueChanged(new_value)
			}
		}

		const incrementValue = (mult: number) => {
			const change = increment * mult
			setValue(current_value.getValue() + change)
		}

		const mouseToValue = (input?: InputObject) => {
			const bar = bar_ref.getValue()!
			const mouse_pos = input ? input.Position.X : UserInputService.GetMouseLocation().X
			const bar_pos = bar.AbsolutePosition
			const bar_size = bar.AbsoluteSize
			return math.round(map(bar_pos.X, bar_pos.X + bar_size.X)(mouse_pos) * 100)
		}

		const handleInputBegan = (rbx: GuiObject, input: InputObject) => {
			$print(`Began`, input.UserInputType)
			if (isIncrement(input)) incrementValue(1)
			if (isDecrement(input)) incrementValue(-1)

			if (isClick(input)) {
				// set value on click
				setValue(mouseToValue(input))

				// connect renderstep for dragging
				maid["dragging"] = RenderStepped.Connect(() => {
					setValue(mouseToValue())
				})
			}
		}

		const handleInputEnded = (rbx: GuiObject, input: InputObject) => {
			$print(`Ended`, input.UserInputType)
			if (isClick(input)) {
				// disconnect renderstep
				maid["dragging"] = undefined
			}
		}

		const handleInputChanged = (rbx: GuiObject, input: InputObject) => {
			$print(`Changed`, input.UserInputType)
			if (isIncrement(input)) incrementValue(1)
			if (isDecrement(input)) incrementValue(-1)
		}

		return (
			<frame Key="Slider" Size={new UDim2(1, 0, 0.1, 0)} Transparency={1}>
				<frame
					Key="Slider Container"
					Ref={bar_ref}
					Transparency={1}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={new UDim2(0.9, 0, 1, 0)}
					Event={{
						InputBegan: handleInputBegan,
						InputChanged: handleInputChanged,
						InputEnded: handleInputEnded,
					}}
				>
					<SliderBar Key="Slider Bar" filled={current_value.map((v) => scaleMap(v))} />
					<SliderThumb
						Key="Slider Thumb"
						Position={current_value.map((v) => UDim2.fromScale(scaleMap(v), 0.5))}
					/>
				</frame>
			</frame>
		)
	}
)

export default Slider
