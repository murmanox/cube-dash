interface Workspace extends Model {
	Textures: Folder & {
		Part: Part & {
			Texture: Texture;
		};
	};
	Debris: Folder;
	Water: Model & {
		Water3: MeshPart;
		Foam: MeshPart & {
			SurfaceAppearance: SurfaceAppearance;
		};
		Water1: MeshPart & {
			Texture: Texture & {
				Script: Script;
			};
		};
		Water2: MeshPart;
		Water4: MeshPart;
	};
	["Roblox Statue"]: Model;
	CameraPart: Part;
	Hazards: Folder;
	Camera: Camera;
	Background: Folder & {
		Trees: Folder;
		Frog: Model & {
			Eyes: MeshPart;
			LeftHand: MeshPart;
			Head: MeshPart;
			LeftFoot: MeshPart;
			Torso: MeshPart;
			RightFoot: MeshPart;
			RightHand: MeshPart;
		};
		["Texture Part"]: Part & {
			Texture: Texture;
		};
		MeshPart: MeshPart;
		Ground: Part & {
			Texture: Texture;
		};
		Rocks: Folder & {
			Rock: MeshPart;
		};
	};
	PlayArea: Folder & {
		HazardArea: Part;
		Decoration: Folder & {
			Fences: Folder;
			["Meshes/Grass"]: MeshPart;
			Tree: MeshPart;
		};
		Ground: Model & {
			Grass: Part & {
				Texture: Texture;
			};
			Dirt: Part & {
				Texture: Texture;
			};
		};
		Spawn: Part;
	};
	Rocks: Folder;
}
