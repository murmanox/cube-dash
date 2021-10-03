import ProfileService, { GetProfileStore } from "@rbxts/profileservice"
import { Profile } from "@rbxts/profileservice/globals"
import { Players } from "@rbxts/services"
import { Events, Functions } from "./events"

export interface ProfileTemplate {
	best_score: number
}

const profile_template: ProfileTemplate = {
	best_score: 0,
}

const profiles = new Map<Player, Profile<ProfileTemplate>>()
const profile_store = GetProfileStore("PlayerData", profile_template)

Events.updateHighScore.connect((player, score) => {
	print(`new best score: ${score}`)
})

Functions.getProfileData.setCallback((player) => {
	let profile = profiles.get(player) // TODO: promisify this
	let i = 10

	while (!profile && i--) {
		if (i > 0) warn(`Unable to load profile for ${player.UserId}, retrying...`)
		task.wait(1)
		profile = profiles.get(player)
	}

	if (!profile) {
		error("Unable to load profile from cache. Maybe this was called before the profile was loaded?")
	}

	return { ...profile.Data }
})

Players.PlayerAdded.Connect((player) => {
	const profile = profile_store.LoadProfileAsync(`Player_${player.UserId}`)
	if (profile === undefined) {
		player.Kick("Unable to load profile")
		return
	}

	profile.AddUserId(player.UserId)
	profile.Reconcile()
	print(`Loaded profile ${player.UserId} ${profile.MetaData.SessionLoadCount} times`)

	profile.ListenToRelease((place_id) => {
		profiles.delete(player)
		player.Kick(`Profile was loaded on another server. Place ID: ${place_id}`)
	})

	if (player.IsDescendantOf(Players)) {
		profiles.set(player, profile)
	} else {
		profile.Release()
	}
})

Players.PlayerRemoving.Connect((player) => {
	profiles.get(player)?.Release()
})
