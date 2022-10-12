import { mount, unmount } from "@rbxts/roact"
import PlayButton from "."
import Roact from "@rbxts/roact"

export = (story: GuiObject) => {
	const handle = mount(<PlayButton activated={() => print("clicked")} />, story)
	return () => {
		unmount(handle)
	}
}
