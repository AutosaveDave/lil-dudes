/*  When creating a new dude, all scene properties are set to
    these default values unless the specified variant object contains
    a value for that property (in which case the variant's property
    values are used instead) */

export const defaults = {
    velocity: [ 0, 0, 0 ],

    movement: {
        walkAccel: 0.25,
        walkSpeed: 2,
        runAccel: 0.5,
        runSpeed: 4,
        sneakSpeed: 1,
        maxSpeed: 12,
    },
    height: 5,  // all other lengths/widths are relative 
    legHeight: 40,
    headHeight: 64,
    shoulderHeight: 24,
    shoulderWidth: 70,
    hipWidth: 32,
    headOffset: 0.1, // How far from center head is pushed forward in facing direction
    parts: {
        arm: {
            left: {
                spriteName: 'dude0',
                sprite: null,
            },
            right: {
                spriteName: 'dude0',
                sprite: null,
            },
            shoulderWidth: 1.25,
            length: 1,
            width: 0.42, // relative to length
            dir: 0,
            rot: Math.PI/2,
        },
        leg: {
            left: {
                spriteName: 'dude0',
                sprite: null,
            },
            right: {
                spriteName: 'dude0',
                sprite: null,
            },
            hipWidth: 0.7,
            length: 1,
            width: 0.48, // relative to length
            dir: 0,
            rot: Math.PI/2,
        },
        torso: {
            spriteName: 'dude0',
            sprite: null,
            height: 1.1,
            width: 1.2,
            dir: 0,
            rot: 0,
        },
        head: {
            spriteName: 'dude0',
            sprite: null,
            height: 1.2,
            
            dir: 0,
            rot: 0,
        },
        eye: {
            left: {
                spriteName: 'dude0',
                sprite: null,
            },
            right: {
                spriteName: 'dude0',
                sprite: null,
            },
            dir: 0,
            rot: 0,
        },
        mouth: {
            spriteName: 'dude0',
            sprite: null,
            dir: 0,
            rot: 0,
        }
    },
}