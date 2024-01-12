class Player {

    constructor(scene, canvas) {

        this.camera = null

        this.scene = scene

        this.canvas = canvas

        this.moveForward = false;
        this.moveBackward = false;
        this.moveRight = false;
        this.moveLeft = false;

        this.hero = null
        this.pointer = null


    }

    createPlayer() {

        //Hero

        this.hero = BABYLON.Mesh.CreateBox('hero', 3.0, this.scene, false, BABYLON.Mesh.FRONTSIDE);
        this.hero.position.x = -2.0 //1.0;
        this.hero.position.y = 12.0 //11.0 //9 //1.0;
        this.hero.position.z = 0.0;

        this.hero.isVisible = false
        this.hero.checkCollisions = true;

        this.hero.physicsImpostor = new BABYLON.PhysicsImpostor(this.hero, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.1, restitution: 0.3, friction: 0.1 }, this.scene);
        //hero.physicsImpostor = new BABYLON.PhysicsImpostor(hero, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.3}, this.scene);

    }

    createPointer() {

        // pointer
        this.pointer = BABYLON.Mesh.CreateSphere("Sphere", 16.0, 0.01, this.scene, false, BABYLON.Mesh.DOUBLESIDE);
        // move the sphere upward 1/2 of its height
        this.pointer.position.x = 0.0;
        this.pointer.position.y = 0.0;
        this.pointer.position.z = 0.0;
        this.pointer.isPickable = false;

    }

    createCamera() {

        this.camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 2, -25), this.scene);

        // Targets the camera to a particular position. In this case the scene origin
        this.camera.setTarget(BABYLON.Vector3.Zero());

        // Attach the camera to the canvas
        this.camera.applyGravity = true;
        this.camera.ellipsoid = new BABYLON.Vector3(.4, .8, .4);
        // camera.ellipsoid = new BABYLON.Vector3(3,3,3);
        this.camera.checkCollisions = true;
        this.camera.attachControl(this.canvas, true);


    }

    initCamera() {

        this.createCamera()

        this.createPlayer()


        this.createPointer()

        this.setUpKey()

        let registerBeforeRenderCallback = () => {

        }

        registerBeforeRenderCallback = registerBeforeRenderCallback.bind(this)

        let isLocked = false;


        let onPointerDownCallback = (e) => {

            //true/false check if we're locked, faster than checking pointerlock on each single click.
            if (!isLocked) {
                this.canvas.requestPointerLock =

                    this.canvas.requestPointerLock
                    || this.canvas.msRequestPointerLock
                    || this.canvas.mozRequestPointerLock
                    || this.canvas.webkitRequestPointerLock;

                if (this.canvas.requestPointerLock) {
                    this.canvas.requestPointerLock();
                }
            }

            //continue with shooting requests or whatever :P
            //evt === 1 (mouse wheel click (not scrolling))
            //evt === 2 (right mouse click)

        }


        onPointerDownCallback = onPointerDownCallback.bind(this)

        this.scene.onPointerDown = onPointerDownCallback

        // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
        let pointerlockchange = function () {
            let controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || null;

            // If the user is already locked
            if (!controlEnabled) {
                //camera.detachControl(canvas);
                isLocked = false;
            } else {
                //camera.attachControl(canvas);
                isLocked = true;
            }
        };

        // Attach events to the document
        document.addEventListener("pointerlockchange", pointerlockchange, false);
        document.addEventListener("mspointerlockchange", pointerlockchange, false);
        document.addEventListener("mozpointerlockchange", pointerlockchange, false);
        document.addEventListener("webkitpointerlockchange", pointerlockchange, false);




    }

    updateMove() {

        this.camera.position.x = this.hero.position.x;
        this.camera.position.y = 12 //hero.position.y //+ 1.0;
        this.camera.position.z = this.hero.position.z;
        this.pointer.position = this.camera.getTarget();

        let forward = this.camera.getTarget().subtract(this.camera.position).normalize();
        forward.y = 0;

        let right = BABYLON.Vector3.Cross(forward, this.camera.upVector).normalize();
        right.y = 0;

        const { f_speed, s_speed } = this.computeMoveFromKeyBoard()
        const u_speed = 0;

        let move = (forward.scale(f_speed))
            .subtract((right.scale(s_speed)))
            .subtract(this.camera.upVector.scale(u_speed));

        this.hero.physicsImpostor.physicsBody.velocity.x = move.x;
        this.hero.physicsImpostor.physicsBody.velocity.z = move.z;
        this.hero.physicsImpostor.physicsBody.velocity.y = move.y;

    }

    setUpKey() {



        let onKeyDown = function (event) {
            switch (event.keyCode) {
                case 38: // up
                case 87: // w
                    this.moveForward = true;
                    break;

                case 37: // left
                case 65: // a
                    this.moveLeft = true;
                    break;

                case 40: // down
                case 83: // s
                    this.moveBackward = true;
                    break;

                case 39: // right
                case 68: // d
                    this.moveRight = true;
                    break;

                case 32: // space
                    break;
            }
        };

        let onKeyUp = function (event) {
            switch (event.keyCode) {
                case 38: // up
                case 87: // w
                    this.moveForward = false;
                    break;

                case 37: // left
                case 65: // a
                    this.moveLeft = false;
                    break;

                case 40: // down
                case 83: // a
                    this.moveBackward = false;
                    break;

                case 39: // right
                case 68: // d
                    this.moveRight = false;
                    break;
            }
        };


        onKeyDown = onKeyDown.bind(this)
        onKeyUp = onKeyUp.bind(this)


        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);

    }


    computeMoveFromKeyBoard() {

        let SPEED = 20;
        let f_speed = 0;
        let s_speed = 0;


        if (this.moveForward) {
            f_speed = SPEED;
        }
        if (this.moveBackward) {
            f_speed = -SPEED;
        }

        if (this.moveRight) {
            s_speed = SPEED;
        }

        if (this.moveLeft) {
            s_speed = -SPEED;
        }

        return {
            f_speed,
            s_speed

        }

    }


}