/// <reference path="../../vendor/babylon.d.ts" />

const createSceneFPS = function (engine, canvas) {

    const generateScene = () => {

        const scene = new BABYLON.Scene(engine);
        scene.ambientColor = new BABYLON.Color3(1, 1, 1);

        const gravityVector = new BABYLON.Vector3(0, -9.81, 0);
        const physicsPlugin = new BABYLON.CannonJSPlugin();

        scene.collisionsEnabled = true;
        scene.enablePhysics(gravityVector, physicsPlugin);

        //scene.debugLayer.show({embedMode:true});



        return scene
    }


    const scene = generateScene()





    let player = new Player(scene, canvas)

    player.initCamera()

    let callBackRegister = []

    let id_3d_pic = null
    let time = 0
    let nb_sec = 10

    callBackRegister.push({
        "execute": () => player.updateMove(),
        "condition": (time, nb_sec) => true

    })

    callBackRegister.push({
        "execute": () => {

            id_3d_pic = getRandomInt(0, 5)

            maze.change_texture(maze.get_texture(id_3d_pic))

        },
        "condition": (time, nb_sec) => time % (60 * nb_sec) === 0

    })

    const music = new BABYLON.Sound("Music", "public/audio/at_time_to_find_me_2021_10_18.mp3", scene, null);

    callBackRegister.push({
        "execute": () => {

            let is_play = getRandomInt(0, 1)

            if (is_play === 1)
                music.play();

        },
        "condition": (time, nb_sec) => time % (60 * 20) === 0

    })

    let maze = new Maze_Generator()
    let sizeWall = 20
    let index_maze = 0
    maze.generate(MAZE[index_maze], sizeWall)

    callBackRegister.push({
        "execute": () => {

            let index_maze = getRandomInt(0, 9)

            console.log("index_maze", index_maze);

            maze.disposeAll()

            maze.generate(MAZE[index_maze], sizeWall)

        },
        "condition": (time, nb_sec) => time % (60 * 20) === 0

    })

    const registerBeforeRenderCallback = () => {

        time++

        for (const cb of callBackRegister) {

            if (cb.condition(time, nb_sec))
                cb.execute()

        }

    }

    scene.registerBeforeRender(registerBeforeRenderCallback)

    createGround(scene)

    createCeiling(scene)

    generate_borders(scene)

    //Light
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, -1, 0), scene);


    function lights() {

        for (let i = 0; i < 100; i += 10) {
            for (let j = 0; j < 100; j += 10) {
                let light0 = new BABYLON.HemisphericLight("light" + i + j, new BABYLON.Vector3(i, 150, j), scene);

                light0.intensity = 0.3;


            }
        }




    }

    lights()

    minimap(scene)



    return scene;
};