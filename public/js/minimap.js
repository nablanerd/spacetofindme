

function minimap(scene)
{

        // Minimap
        let mm = new BABYLON.FreeCamera("minimap", new BABYLON.Vector3(0,100,0), scene);
        mm.setTarget(new BABYLON.Vector3(0,0,0));
        // Activate the orthographic projection
        mm.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        //These values are required for using an orthographic mode,
        // and represents the coordinates of the square containing all the camera view.
        // this.size is the size of our arena
        mm.orthoLeft = 500/2;
        mm.orthoRight =-500/2;
        mm.orthoTop =  -500/2;
        mm.orthoBottom = 500/2;
        mm.rotation.x = Math.PI/2;
        // Viewport definition
        const xstart = 0.8, // 80% from the left
            ystart = 0.75; // 75% from the bottom
            const width = 0.99-xstart, // Almost until the right edge of the screen
            height = 1-ystart;  // Until the top edge of the screen

        mm.viewport = new BABYLON.Viewport(xstart, ystart, width, height );
        mm.layerMask = 1; // 001 in binary
        scene.activeCamera.layerMask = 2;

        // The representation of player in the minimap
        const s = BABYLON.Mesh.CreateSphere("player2", 16, 25, scene);
        s.position.y = 50;
        // The sphere position will be displayed accordingly to the player position
        scene.registerBeforeRender(() => {
            if (scene.activeCameras[0]) {
                s.position.x = scene.activeCameras[0].position.x;
                s.position.z = scene.activeCameras[0].position.z;
            }
        });

        const red = new BABYLON.StandardMaterial("red", scene);
        red.diffuseColor = BABYLON.Color3.Red();
        red.specularColor = BABYLON.Color3.Black();
        s.material = red;
        s.layerMask = 1; // 001 in binary : won't be displayed on the player camera, only in the minimap

        // Add the camera to the list of active cameras of the game
        scene.activeCameras.push(scene.activeCamera);
        scene.activeCameras.push(mm);
        
        
        
    }

