/*
    The stage object loads and plays scenes.
*/
import { newScene } from "../assets/scenes/newScene.js";

export const newStage = ( canvasId, variant ) => {
    const canv = document.getElementById( canvasId );
    return {
        variant: variant,
        canv: canv,
        ctx: canv.getContext( "2d" ),
        scene: null,

        getWidth: function() { return canv.offsetWidth },
        getHeight: function() { return canv.offsetHeight },
        loadScene: function( variant ) {
            const _scene = newScene( variant, this.ctx, this.getWidth(), this.getHeight() );
            this.scene = _scene;
        },
        
        draw: function() {
            if( !( this.scene === null ) ) {
                this.scene.draw();
            }
        },
    }
}