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
        x: x*100, y: y*100, z: 0,
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
            this.rotateSketch(  this.parts[ _part ].rot );
            this.sketchCtx.drawImage( spr, -sketchOffsetX, -sketchOffsetY );
            this.unrotateSketch();
            this.sketchCtx.translate( -sketchOffsetX, -sketchOffsetY );
            return this.sketchCanvas;
        },
        getDrawOrder: function() {
            return { 
                arm: ( !( this.parts.torso.dir > Math.PI/2 && this.parts.torso.dir <= 3*Math.PI/2 ) 
                    ? [ 'right', 'left' ] : [ 'left', 'right' ] ), 
                leg: ( !( this.parts.leg.dir > Math.PI/2 && this.parts.leg.dir <= 3*Math.PI/2 ) 
                    ? [ 'right', 'left' ] : [ 'left', 'right' ] ), 
                eye: ( !( this.parts.torso.dir > Math.PI/2 && this.parts.torso.dir <= 3*Math.PI/2 ) 
                    ? [ 'right', 'left' ] : [ 'left', 'right' ] ),
            };
        },
        spinDude: function( rotSpeed, delta ) {
            const s = rotSpeed * delta / 1000;
            const p = this.parts;
            this.parts.arm.dir = ( p.arm.dir + s ) % (2*Math.PI);
            this.parts.leg.dir = ( p.arm.dir + s ) % (2*Math.PI);
            this.parts.torso.dir = ( p.arm.dir + s ) % (2*Math.PI);
            this.parts.head.dir = ( p.arm.dir + s ) % (2*Math.PI);
        },
        setPartCoords: function( yScale ) {
            this.parts.arm.left.drawX = ( this.shoulderWidth/2 )*Math.cos( this.parts.torso.dir - Math.PI/2 );
            this.parts.arm.left.drawY = -( this.legHeight + this.shoulderHeight ) - yScale*( this.shoulderWidth/2 )*Math.sin( this.parts.torso.dir - Math.PI/2 );
            this.parts.arm.right.drawX = ( this.shoulderWidth/2 )*Math.cos( this.parts.torso.dir + Math.PI/2 );
            this.parts.arm.right.drawY = -( this.legHeight + this.shoulderHeight ) - yScale*( this.shoulderWidth/2 )*Math.sin( this.parts.torso.dir + Math.PI/2 );
            this.parts.leg.left.drawX = ( this.hipWidth/2 )*Math.cos( this.parts.leg.dir - Math.PI/2 );
            this.parts.leg.left.drawY = -this.legHeight - yScale*( this.hipWidth/2 )*Math.sin( this.parts.leg.dir - Math.PI/2 );
            this.parts.leg.right.drawX = ( this.hipWidth/2 )*Math.cos( this.parts.leg.dir + Math.PI/2 );
            this.parts.leg.right.drawY = -this.legHeight - yScale*( this.hipWidth/2 )*Math.sin( this.parts.leg.dir + Math.PI/2 );

            this.parts.torso.drawX = 0;
            this.parts.torso.drawY = -this.legHeight - (this.shoulderHeight)/2;
            this.parts.head.drawX = this.headOffset*Math.cos( this.parts.torso.dir );
            this.parts.head.drawY = -this.legHeight - this.headHeight - yScale*this.headOffset*Math.sin( this.parts.torso.dir );
        },
        step: function( delta, yScale ) {
            this.spinDude( Math.PI/4, delta );
            this.setPartCoords( yScale );
        },
        draw: function( yScale ) {
            const order = this.getDrawOrder();

            this.ctx.drawImage( this.getPartSketch( 'arm', order.arm[0] ), this.x + this.parts.arm[ order.arm[0] ].drawX, this.y + this.parts.arm[ order.arm[0] ].drawY );

            this.ctx.drawImage( this.getPartSketch( 'leg', order.leg[0] ), this.x + this.parts.leg[ order.leg[0] ].drawX, this.y + this.parts.leg[ order.leg[0] ].drawY );
            this.ctx.drawImage( this.getPartSketch( 'leg', order.leg[1] ), this.x + this.parts.leg[ order.leg[1] ].drawX, this.y + this.parts.leg[ order.leg[1] ].drawY );
            const headInBack = ( this.parts.torso.dir > Math.PI/5 && this.parts.torso.dir < 4*Math.PI/5 )
            if( headInBack ) {
                this.ctx.drawImage( this.parts.head.sprite, this.x + this.parts.head.drawX, this.y + this.parts.head.drawY );
            }
            this.ctx.drawImage( this.parts.torso.sprite, this.x + this.parts.torso.drawX, this.y + this.parts.torso.drawY );
            if( !headInBack ) {
                this.ctx.drawImage( this.parts.head.sprite, this.x + this.parts.head.drawX, this.y + this.parts.head.drawY );
            }

            this.ctx.drawImage( this.getPartSketch( 'arm', order.arm[1] ), this.x + this.parts.arm[ order.arm[1] ].drawX, this.y + this.parts.arm[ order.arm[1] ].drawY );
        },
        lookAtPoint: function( [ _x, _y, _z ] ) {

        },
    }

}