import { Networking } from "@flamework/networking"
import type { ProfileTemplate } from "server/profile-service.server"

interface ServerEvents {
	updateHighScore(score: number): void
}

interface ClientEvents {}

interface ServerFunctions {
	getProfileData(): ProfileTemplate
}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>()
export const GlobalFunctions = Networking.createFunction<ServerFunctions, {}>()
