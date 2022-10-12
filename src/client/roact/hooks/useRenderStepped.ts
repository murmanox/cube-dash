import { useEffect } from "@rbxts/roact-hooked"
import { RunService } from "@rbxts/services"

export = (callback: (dt: number) => void) => {
	useEffect(() => {
		const connection = RunService.RenderStepped.Connect(callback)
		return () => {
			connection.Disconnect()
		}
	}, [])
}
