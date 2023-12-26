import { dudeVariants } from "./dudeVariants.js";
import { getSprites } from "./sprites.js";

export const newDude = ( x, y, variant, ctx ) => {
    const dudeProps = dudeVariants.defaults;
    if( dudeVariants.hasOwnProperty( variant ) ) {
        Object.assign( dudeProps, dudeVariants[ variant ] );
    }

    return {
        ctx: ctx,
        x: x, y: y, z: 0,
        xspeed: 0, yspeed: 0, zspeed: 0,
        ...dudeProps,

        step: function( delta ) {

        },
        draw: function() {
            this.ctx.drawImage( this.parts.arm.left.sprite, this.x, this.y );

            this.ctx.drawImage( this.parts.leg.left.sprite, this.x, this.y );
            this.ctx.drawImage( this.parts.leg.right.sprite, this.x, this.y );

            this.ctx.drawImage( this.parts.torso.sprite, this.x, this.y );
            this.ctx.drawImage( this.parts.head.sprite, this.x, this.y );

            this.ctx.drawImage( this.parts.arm.right.sprite, this.x, this.y );
        },
        lookAtPoint: function( [ _x, _y, _z ] ) {

        },
    }

}