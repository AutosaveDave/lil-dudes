import { dudeVariants } from "./dudeVariants.js";

export const newDude = ( x, y, variant, ctx ) => {
    const dudeProps = dudeVariants.defaults;
    if( dudeVariants.hasOwnProperty( variant ) ) {
        Object.assign( dudeProps, dudeVariants[ variant ] );
    }
    const dudeCanvas = document.createElement( 'canvas' );
    
    const dudeCtx = dudeCanvas.getContext( '2d' );
    const sketchCanvas = document.createElement( 'canvas' );
    sketchCanvas.width = 128;
    sketchCanvas.height = 128;
    const sketchCtx = sketchCanvas.getContext( '2d' );

    return {
        ctx: ctx,
        selfCanvas: dudeCanvas,
        selfCtx: dudeCtx,
        sketchCanvas: sketchCanvas,
        sketchCtx: sketchCtx,
        sketchRot: 0,
        x: x, y: y, z: 0,
        xspeed: 0, yspeed: 0, zspeed: 0,

        ...dudeProps,

        clearSketch: function() {
            this.unrotateSketch();
            this.sketchCtx.globalCompositeOperation = 'source-over';
            this.sketchCtx.clearRect( 0, 0, this.sketchCanvas.width, this.sketchCanvas.height ); // clear canvas
        },
        unrotateSketch: function() {
            this.sketchCtx.rotate( -this.sketchRot );
            this.sketchRot = 0;
        },
        rotateSketch: function( _angle ) {
            
            this.sketchCtx.rotate( _angle );

            const prevRot = this.sketchRot;
            this.sketchRot = ( prevRot + _angle ) % ( 2 * Math.PI );
        },
        getPartSketch: function( _part, _side ) {
            this.clearSketch();
            const spr = ( this.parts[ _part ].hasOwnProperty( 'sprite' ) 
                            ? this.parts[ _part ].sprite
                            : this.parts[ _part ][ _side ].sprite );
            const sketchOffsetX = this.sketchCanvas.width/2;
            const sketchOffsetY = this.sketchCanvas.height/2;
            this.sketchCtx.translate( sketchOffsetX, sketchOffsetY );
            this.rotateSketch( this.parts[ _part ].dir );
            this.sketchCtx.drawImage( spr, -sketchOffsetX, -sketchOffsetY );
            
            this.unrotateSketch();
            this.sketchCtx.translate( -sketchOffsetX, -sketchOffsetY );
            return this.sketchCanvas;
        },
        getDrawOrder: function() {
            return { 
                arm: ( ( this.parts.torso.dir > 90 && this.parts.torso.dir <= 270 ) 
                    ? [ 'right', 'left' ] : [ 'left', 'right' ] ), 
                leg: ( ( this.parts.leg.dir > 90 && this.parts.leg.dir <= 270 ) 
                    ? [ 'right', 'left' ] : [ 'left', 'right' ] ), 
                eye: ( ( this.parts.torso.dir > 90 && this.parts.torso.dir <= 270 ) 
                    ? [ 'right', 'left' ] : [ 'left', 'right' ] ),
            };

        },
        step: function( delta ) {
            const _parts = this.parts;
            const rotIncr = ( delta / 1000 ) * Math.PI / 2;
            Object.keys( _parts ).forEach( key => {
                this.parts[ key ].dir += rotIncr;
            } );
        },
        draw: function() {
            // draw method should... 
            //  draw each individual part to a new canvas element,
            //  rotate the new canvas,
            //  draw the new canvas to ctx, 
            //  and then clear the new canvas.

            const order = this.getDrawOrder();

            this.ctx.drawImage( this.getPartSketch( 'arm', order.arm[0] ), this.x, this.y );

            // this.ctx.drawImage( this.getPartSketch( 'leg', order.leg[0] ), this.x, this.y );
            // this.ctx.drawImage( this.getPartSketch( 'leg', order.leg[1] ), this.x, this.y );

            // this.ctx.drawImage( this.parts.torso.sprite, this.x+100, this.y );
            // this.ctx.drawImage( this.parts.head.sprite, this.x+100, this.y );

            // this.ctx.drawImage( this.getPartSketch( 'arm', order.arm[1] ), this.x, this.y );
        },
        lookAtPoint: function( [ _x, _y, _z ] ) {

        },
    }

}