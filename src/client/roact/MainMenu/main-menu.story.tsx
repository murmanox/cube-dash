import Roact, { mount, unmount } from "@rbxts/roact"
import MainMenu from "."

export = (story: GuiObject) => {
	const handle = mount(<MainMenu />, story)

	return () => {
		unmount(handle)
	}
}
