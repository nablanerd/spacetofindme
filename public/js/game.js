class Game {

    /**
     * Create an instance of the Game
     * 
     * @constructor
     * @param {string} The id of html5 element.
     */
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.createScene = null
    }

    /**
     * Returns the engine
     *
     * @return {BABYLON.Engine} The engine
     */
    createDefaultEngine () { 
        const engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); 

        return engine

    }

    /**
     * Set the callback for creating the scene
     * @param {callback} The callback for creating the scene
     */
   setCreateSceneCallBack (callback)
   {
    this.createScene = callback


   } 
   
   async init(){

    window.engine = await this.asyncEngineCreation();



    if (!engine) throw 'engine should not be null.';
   
    if(this.createScene !== null) window.scene = this.createScene(engine, this.canvas)

    window.scene = createSceneFPS(engine, this.canvas)

   // window.scene = this.createScene(engine, this.canvas)

    }

    async asyncEngineCreation()
    {
        
        try {
            return this.createDefaultEngine();
            } catch(e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return this.createDefaultEngine();
            }

    }

     run()
    {
         let sceneToRender = null

        this.init().then(() => {
            
            sceneToRender = scene    
            
            engine.runRenderLoop(function () {
                if (sceneToRender && sceneToRender.activeCamera) {

                    sceneToRender.render();
                }
            });
        });

        // Resize
        window.addEventListener("resize", function () {
            this.engine.resize();
        });

    }




}