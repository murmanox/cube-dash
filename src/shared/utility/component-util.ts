import PartCache from "@rbxts/partcache"
import { CollectionService, ReplicatedFirst, Workspace } from "@rbxts/services"
import { flip } from "./random"
import { randomVector3 } from "./vector3-utils"

const DEBRIS_PREFAB = ReplicatedFirst.Debris
const DEBRIS_CACHE = new PartCache(DEBRIS_PREFAB, 600)
DEBRIS_CACHE.SetCacheParent(Workspace.Debris)

const getVolume = (size: Vector3): number => {
	return size.X * size.Y * size.Z
}

function movePartInside(part: Part, other: Part) {
	const t = other.Size.div(2).sub(part.Size.div(2))
	const x = other.Position.X + flip(math.random() * t.X)
	const y = other.Position.Y + flip(math.random() * t.Y)
	const z = other.Position.Z + flip(math.random() * t.Z)
	return new Vector3(x, y, z)
}

export function spawnDebris(instance: Part) {
	const amount = getVolume(instance.Size) / getVolume(DEBRIS_PREFAB.Size)

	// spawn debris
	for (let i = 0; i < amount; i++) {
		const debris = DEBRIS_CACHE.GetPart()
		debris.Color = instance.Color
		debris.Anchored = false
		debris.Transparency = 0
		debris.Position = movePartInside(debris, instance)
		debris.AssemblyLinearVelocity = randomVector3()
			.mul(math.random() * 60)
			.mul(debris.Mass)

		CollectionService.AddTag(debris, "debris")
	}
}

// super cringe but I don't know how to interact with a component without waiting
// so instead I'll wait for the tag to be removed to hide the part
CollectionService.GetInstanceRemovedSignal("debris").Connect((instance) => {
	DEBRIS_CACHE.ReturnPart(instance as Part)
})
