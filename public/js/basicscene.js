
        const createScene = function() {
            const scene = new BABYLON.Scene(engine);
            
            const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 25, -150), scene);
            camera.attachControl(canvas, true);
        
            const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        	light.groundColor = new BABYLON.Color3(.5, .5, .5);
        	light.intensity = .5;
        
        	const groundMaterial = new BABYLON.GridMaterial("groundMaterial", scene);
        	groundMaterial.majorUnitFrequency = 1;
        	groundMaterial.minorUnitVisibility = 0.1;
        	groundMaterial.gridRatio = 2;
        	groundMaterial.backFaceCulling = false;
        	groundMaterial.mainColor = new BABYLON.Color3(1, 1, 1);
        	groundMaterial.lineColor = new BABYLON.Color3(1.0, 1.0, 1.0);
        	groundMaterial.opacity = 0.2;
        	
        	const ground = BABYLON.Mesh.CreateGround("ground1", 100, 100, 2, scene);
        	ground.material = groundMaterial;
        
            const material = new BABYLON.GridMaterial("knotMaterial", scene);
            material.majorUnitFrequency = 1;
            material.minorUnitVisibility = 0.35;
            material.gridRatio = 1;
            //material.mainColor = new BABYLON.Color3(0, 0, 0);
            material.opacity = 0.2;
            material.lineColor = new BABYLON.Color3(0.0, 1.0, 0.0);
        
        
        	return scene;
        };