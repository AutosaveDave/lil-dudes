import { dudeVariants } from "./dudeVariants.js";

export const newDude = ( x, y, variant, ctx ) => {
    const dudeProps = dudeVariants.defaults;
    if( dudeVariants.hasOwnProperty( variant ) ) {
        Object.assign( dudeProps, dudeVariants[ variant ] );
    }

    return {
        ctx: ctx,
        x: x,
        y: y,
        ...dudeProps,

        draw: function() {

        },
        lookAtPoint: function( [ _x, _y, _z ] ) {

        },
    }

}