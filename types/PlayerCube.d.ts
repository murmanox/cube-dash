type PlayerCube = Part & {
	ConstrainZ: BodyPosition
	Face: Decal
	Attachment: Attachment & {
		ParticleEmitter: ParticleEmitter
	}
}
