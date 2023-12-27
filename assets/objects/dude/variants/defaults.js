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
            hipWidth: 0.9,
            length: 1,
            width: 0.48, // relative to length
            dir: 0,
        },
        torso: {
            spriteName: 'dude0',
            sprite: null,
            height: 1.1,
            width: 1.2,
            dir: 0,
        },
        head: {
            spriteName: 'dude0',
            sprite: null,
            height: 1.2,
            offset: 0.1, // How far from center head is pushed forward in facing direction
            dir: 0,
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
        },
        mouth: {
            spriteName: 'dude0',
            sprite: null,
            dir: 0,
        }
    },
}