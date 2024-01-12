
function generate_borders(scene)
{

    let borderMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
 
    borderMaterial.diffuseTexture = new BABYLON.Texture("images/pexels-la-miko-3616764.jpg", scene);     
    
    let uv = 1
    borderMaterial.diffuseTexture.uScale = uv;
    borderMaterial.diffuseTexture.vScale = uv

    const border0 = BABYLON.Mesh.CreateBox("border0", 1, scene);
    border0.scaling = new BABYLON.Vector3(5, 100, 200);
    border0.position.x = -100.0;
    border0.checkCollisions = true;
    //border0.isVisible = false;
      
    const border0_Material = new BABYLON.StandardMaterial("border0_Material", scene);
    border0_Material.diffuseColor = new BABYLON.Color3.Blue();
    border0_Material.alpha=0.5
    border0.material =borderMaterial

    const border1 = BABYLON.Mesh.CreateBox("border1", 1, scene);
    border1.scaling = new BABYLON.Vector3(5, 100, 200);
    border1.position.x = 100.0;
    border1.checkCollisions = true;
  
   const border1_Material = new BABYLON.StandardMaterial("border1_Material", scene);
   border1_Material.diffuseColor = new BABYLON.Color3.Red();
   border1.material =borderMaterial

   const border2 = BABYLON.Mesh.CreateBox("border2", 1, scene);
    border2.scaling = new BABYLON.Vector3(200, 100, 5);
    border2.position.z = 100.0;
    border2.checkCollisions = true;
  
   const border2_Material = new BABYLON.StandardMaterial("border2_Material", scene);
    border2_Material.diffuseColor = new BABYLON.Color3.Green();
    border2.material =borderMaterial

    const border3 = BABYLON.Mesh.CreateBox("border3", 1, scene);
    border3.scaling = new BABYLON.Vector3(200, 100, 5);
    border3.position.z = -100.0;
    border3.checkCollisions = true;
  
   const border3_Material = new BABYLON.StandardMaterial("border3_Material", scene);
    border3_Material.diffuseColor = new BABYLON.Color3.Purple();
    border3.material =borderMaterial

    border0.physicsImpostor = new BABYLON.PhysicsImpostor(border0, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    border1.physicsImpostor = new BABYLON.PhysicsImpostor(border1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    border2.physicsImpostor = new BABYLON.PhysicsImpostor(border2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    border3.physicsImpostor = new BABYLON.PhysicsImpostor(border3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
  
}