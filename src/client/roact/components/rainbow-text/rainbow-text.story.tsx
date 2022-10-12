import Roact, { mount, unmount } from "@rbxts/roact"
import RainbowText from "."

export = (story: GuiObject) => {
	const handle = mount(<RainbowText />, story)
	return () => {
		unmount(handle)
	}
}
