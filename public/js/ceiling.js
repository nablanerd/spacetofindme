function createCeiling(scene)
{

     const ceiling = BABYLON.MeshBuilder.CreatePlane("ceiling", {height:200, width: 200, sideOrientation: BABYLON.Mesh.BACKSIDE});

     ceiling.position.y = 50;

     ceiling.rotation.x = Math.PI/2

     let ceilingMaterial = new BABYLON.StandardMaterial("ceilingMaterial", scene);
  
     ceilingMaterial.diffuseTexture = new BABYLON.Texture("public/images/PaintedPlaster017_1K-JPG/PaintedPlaster017_1K_Color.jpg", scene);     
     
     let uv = 3
     ceilingMaterial.diffuseTexture.uScale = uv;
     ceilingMaterial.diffuseTexture.vScale = uv;

     ceiling.material = ceilingMaterial

     

}