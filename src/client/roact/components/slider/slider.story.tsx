import Roact, { mount, unmount } from "@rbxts/roact"
import Slider from "."

export = (story: GuiObject) => {
	const handle = mount(<Slider increment={5} />, story)

	return () => {
		unmount(handle)
	}
}
