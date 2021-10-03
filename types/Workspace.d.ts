interface Workspace extends Model {
	Textures: Folder & {
		Part: Part & {
			Texture: Texture;
		};
	};
	Camera: Camera;
	["Roblox Statue"]: Model;
	Hazards: Folder;
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
		HazardArea: Part;
	};
	Rocks: Folder;
}
