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
        frame: null,
        prevTime: null,
        delta: null,

        getWidth: () => canv.offsetWidth,
        getHeight: () => canv.offsetHeight,
        loadScene: function( variant ) {
            const _scene = newScene( variant, this.ctx, this.getWidth(), this.getHeight() );
            this.scene = _scene;
        },

        step: function() {
            this.scene.step( this.delta );
        },
        draw: function ( t ) {
            if( this.prevTime === null ) {
                this.prevTime = t;
            }
            this.delta = t - this.prevTime;
            this.step();

            if( !( this.scene === null ) ) {
                this.scene.draw();
            }
            console.log( `delta = ${this.delta}`)
            console.log( this )
            this.prevTime = t;
            this.getFrame();
        },
        clearFrame: function() {
            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.clearRect( 0, 0, this.getWidth(), this.getHeight() ); // clear canvas
        },
        getFrame: function() {
            this.frame = window.requestAnimationFrame( ( t ) => { this.draw( t ); } );
        },
        start: function () {
            // this.handleResize();
            // window.addEventListener( 'resize', () => { this.handleResize(); } );
            // this.surface.onmousemove = e => { this.handleMouseMove( e ); };
            // this.surface.onmouseup = e => { this.handleMouseUp( e ); };
            // this.surface.onmousedown = e => { this.handleMouseDown( e ); };
            // this.initControls();
            this.getFrame();
        },
    }
}