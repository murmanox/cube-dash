export function isClick(input: InputObject): boolean {
	return (
		input.UserInputType === Enum.UserInputType.MouseButton1 ||
		input.UserInputType === Enum.UserInputType.Touch
	)
}

export function isMovement(input: InputObject): boolean {
	return (
		input.UserInputType === Enum.UserInputType.MouseMovement ||
		input.UserInputType === Enum.UserInputType.Touch
	)
}

export function isIncrement(input: InputObject): boolean {
	return (
		(input.UserInputType === Enum.UserInputType.MouseWheel && input.Position.Z > 0) ||
		input.KeyCode === Enum.KeyCode.DPadRight
	)
}

export function isDecrement(input: InputObject): boolean {
	return (
		(input.UserInputType === Enum.UserInputType.MouseWheel && input.Position.Z < 0) ||
		input.KeyCode === Enum.KeyCode.DPadLeft
	)
}
