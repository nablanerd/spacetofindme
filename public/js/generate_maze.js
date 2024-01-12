
class Maze_Generator {

  constructor(scene) {

    this.scene = scene

    this.textureRegister = []

    this.textureRegister.push(new BABYLON.Texture("public/images/light/00.jpg", this.scene))
    this.textureRegister.push(new BABYLON.Texture("public/images/light/01.jpg", this.scene))
    this.textureRegister.push(new BABYLON.Texture("public/images/light/02.jpg", this.scene))
    this.textureRegister.push(new BABYLON.Texture("public/images/light/03.jpg", this.scene))
    this.textureRegister.push(new BABYLON.Texture("public/images/light/04.jpg", this.scene))
    this.textureRegister.push(new BABYLON.Texture("public/images/light/05.jpg", this.scene))

    this.walls = []

    this.wallMazeMaterial = new BABYLON.StandardMaterial("wallMazeMaterial", this.scene)

  }

  generate(maze, size) {

    maze.forEach(row => {

      row.forEach(cell => {

        if (cell.top)
          this.wall3D(cell.x * size, cell.y * size, cell.x * size + size, cell.y * size, true, this.scene)

        if (cell.bottom)
          this.wall3D(cell.x * size, cell.y * size + size, cell.x * size + size, cell.y * size + size, true, this.scene)

        if (cell.left)
          this.wall3D(cell.x * size, cell.y * size, cell.x * size, cell.y * size + size, false, this.scene)

        if (cell.right)
          this.wall3D(cell.x * size + size, cell.y * size, cell.x * size + size, cell.y * size + size, false, this.cene)

      })



    })
  }

  get_texture(index) {
    return this.textureRegister[index]
  }

  change_texture(texture) {

    for (const wall of this.walls) {

      this.wallMazeMaterial.diffuseTexture = texture
      this.wallMazeMaterial.alpha = 0.9

      wall.material = this.wallMazeMaterial
    }


  }

  disposeAll() {
    if (this.walls.length > 0) {
      for (let wall of this.walls) {
        wall.dispose()
        // wall = []
      }

    }

  }

  wall3D(x1, y1, x2, y2, is_h) {

    let wallMaze = BABYLON.Mesh.CreateBox("wallMaze" + getRandomInt(0, 1000), 20, this.scene);

    wallMaze.position = new BABYLON.Vector3((x1 + x1) / 2, 9, (y1 + y2) / 2);

    wallMaze.translate(new BABYLON.Vector3(-9, 0, -9), 10, BABYLON.Space.WORLD);

    this.wallMazeMaterial.diffuseTexture = this.get_texture(0)

    wallMaze.material = this.wallMazeMaterial

    const scale = 0.1
    
    if (is_h)
      wallMaze.scaling.x = scale
    else
      wallMaze.scaling.z = scale

    wallMaze.scaling.y = 1.8

    wallMaze.checkCollisions = true;

    wallMaze.physicsImpostor = new BABYLON.PhysicsImpostor(wallMaze, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, this.scene);


    this.walls.push(wallMaze)

  }

}//



// x1,y2 => Vector

function plane3D(x1, y1, x2, y2, scene) {

  let planelMazeMaterial = new BABYLON.StandardMaterial("wallMazeMaterial", scene);
  planelMazeMaterial.diffuseColor = new BABYLON.Color3.White();

  let planMaze = BABYLON.Mesh.CreatePlane("wallMaze", 20, scene);

  planMaze.material = planelMazeMaterial

  planMaze.position = new BABYLON.Vector3((x1 + x2) / 2, 9, (y1 + y2) / 2);

  planMaze.checkCollisions = true;

  planMaze.physicsImpostor = new BABYLON.PhysicsImpostor(planMaze, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

}

