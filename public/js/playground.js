(async function(){

    let game = new Game("renderCanvas")

    await game.init()

   // game.setCreateSceneCallBack(createSceneFPS)

    game.run()

})();

