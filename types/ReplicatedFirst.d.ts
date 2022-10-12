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
	Player: Part & {
		ConstrainZ: BodyPosition;
		Face: Decal;
		Attachment: Attachment & {
			ParticleEmitter: ParticleEmitter;
		};
	};
	LocalScript: LocalScript;
	Hazard: Part;
	Debris: Part;
}
