type First<T extends unknown[]> = T[0]
type Last<T> = T extends [...infer _, infer U] ? U : T extends Array<infer V> ? V : never
type LastReturnType<T extends Callback[]> = ReturnType<Last<T>>
type FirstParameter<T extends Callback> = First<Parameters<T>>
type FirstParamLastReturnCallback<T extends Callback[]> = (
	input: FirstParameter<First<T>>
) => LastReturnType<T>

export const pipe = <T extends Callback[]>(...fns: T): FirstParamLastReturnCallback<T> => {
	return (input: FirstParameter<First<T>>) => {
		return fns.reduce((value, f) => f(value), input) as LastReturnType<T>
	}
}

const toLowerCase = (str: string) => str.lower()
const split = (str: string) => str.split(" ")

const transform = pipe(toLowerCase, split, print)

const output = transform("hello world")
