interface ReplicatedFirst extends Instance {
	Sounds: Folder & {
		Music: Folder & {
			Music3: Sound;
			Music5: Sound;
			Music1: Sound;
			Music2: Sound;
			Music4: Sound;
		};
	};
	Hazard: Part;
	Player: Part & {
		ConstrainZ: BodyPosition;
		Face: Decal;
		AngularVelocity: AngularVelocity;
		Attachment: Attachment & {
			ParticleEmitter: ParticleEmitter;
		};
	};
	LocalScript: LocalScript;
}
