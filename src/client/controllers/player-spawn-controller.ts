import { Controller, OnStart, OnInit } from "@flamework/core"
import { CollectionService, ReplicatedFirst, ReplicatedStorage, Workspace } from "@rbxts/services"

const PLAYER_PREFAB = ReplicatedFirst.Player
const PLAYER_TAGS = ["player"]

function addTags(instance: Instance, tags: string[]) {
	tags.forEach((tag) => {
		CollectionService.AddTag(instance, tag)
	})
}

@Controller({})
export class PlayerSpawnController {
	public spawnPlayer() {
		const player = PLAYER_PREFAB.Clone()
		player.Parent = Workspace
		addTags(player, PLAYER_TAGS)
		return player
	}
}
