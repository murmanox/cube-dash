export const flip = (v: number): number => (math.random() < 0.5 ? v : -v)

export const map = (oldMin: number, oldMax: number, min = 0, max = 1, clamp = true) => {
	return (n: number) => {
		const new_value = min + (max - min) * ((n - oldMin) / (oldMax - oldMin))
		if (clamp) {
			return math.clamp(new_value, min, max)
		}
		return new_value
	}
}
