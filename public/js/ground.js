function createGround(scene)
{

     //Ground 
     let myGround = BABYLON.MeshBuilder.CreateGround("myGround", {width: 200, height: 200, subdivsions: 4}, scene);
      myGround.position.y = 0;
      myGround.position.x = 0
      myGround.checkCollisions= true;

      myGround.physicsImpostor = new BABYLON.PhysicsImpostor(myGround, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);


     let groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
     // wallMazeMaterial.diffuseColor = new BABYLON.Color3.White();
  
     groundMaterial.diffuseTexture = new BABYLON.Texture("public/images/Marble014_1K_Color_desaturate.jpg", scene);     
    
     groundMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
     groundMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);

     
     let uv = 10
     groundMaterial.diffuseTexture.uScale = 10;
     groundMaterial.diffuseTexture.vScale = 10;


     myGround.material = groundMaterial


/*       var groundMaterial = new BABYLON.GridMaterial("groundMaterial", scene);
      groundMaterial.majorUnitFrequency = 1;
      groundMaterial.minorUnitVisibility = 0.1;
      groundMaterial.gridRatio = 2;
      groundMaterial.backFaceCulling = false;
      groundMaterial.mainColor = new BABYLON.Color3(1, 1, 1);
      groundMaterial.lineColor = new BABYLON.Color3(1.0, 1.0, 1.0);
      groundMaterial.opacity = 0.3; */
 
     //myGround.material = groundMaterial
     

}