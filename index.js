import { newStage } from "./stage/newStage.js";

const stage = newStage( 'game-canvas', 'defaults' );
console.log( stage )
stage.loadScene( 'test' );
stage.start();
console.log( stage )