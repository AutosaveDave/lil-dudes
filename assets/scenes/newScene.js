import { sceneVariants } from "./sceneVariants.js";
import { newDude } from "../objects/dude/newDude.js";

export const newScene = ( variant, ctx, stageWidth, stageHeight ) => {
    const sceneProps = sceneVariants.defaults;
    if( sceneVariants.hasOwnProperty( variant ) ) {
        Object.assign( sceneProps, sceneVariants[ variant ] );
    }
    
    const newObjects = []
    sceneProps.objects.forEach( objArray => { newObjects.push( newDude( ...objArray, ctx ) ) } );
    sceneProps.objects = newObjects;

    const camx = sceneProps.camera.x * stageWidth;
    const camy = sceneProps.camera.y * stageHeight;
    sceneProps.camera.x = camx;
    sceneProps.camera.y = camy;
    return {
        ctx: ctx,
        ...sceneProps,

        draw: function() {

        },
    }
}