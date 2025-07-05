# lil-dudes

lil-dudes is a JavaScript framework for drawing and animating simple pseudo-3D characters, designed for use in browser-based games. Characters are constructed from modular sprite parts (head, eyes, mouth, torso, arms, legs), allowing for easy customization and animation.

## Features
- Modular character design using SVG sprites
- Pseudo-3D effect through layering and animation
- Easily extensible for new character parts and variants
- Designed for integration into JavaScript games


## TODO
- Draw eyes and mouth on the front of the character's head based on head rotation and tilt.
- Add a "walking" animation where the character's arms and legs swing based on sin/cos oscillations when the character is moving.
    - Implement functions for scaling the length of arm and leg sprites based on their tilt and rotation.
    - Implement functions for rotating arm and leg sprites to properly show their 3D orientation when rotated or tilted.
- Add more character part variants and support for accessories.
- Implement more advanced scene and camera controls.

## Getting Started

### Running Locally
1. Clone or download this repository.
2. **Start a local web server in the project directory.** This is required because modern browsers block ES module imports from local files for security reasons.
   - If you have Python 3 installed, you can run:
     ```
     python -m http.server 8000
     ```
   - Or, if you have Node.js installed, you can use:
     ```
     npx serve .
     ```
   - You can use any other static file server as well- I used a "Live Server" extension in VS Code for testing.
3. Open your browser and go to `http://localhost:8000/` (or the port your server uses).
4. To test or modify the code, edit the JavaScript files and refresh the browser.

### File Structure

```
├── index.html            # Main HTML file
├── index.js              # Entry point for initializing and running the framework
├── assets/
│   └── images/
│       ├── dudeParts/    # SVG sprite parts for character construction
│       │   ├── index.js  # Exports/organizes available parts
│       │   └── dude0/    # Example set of parts (arm.svg, eye.svg, etc.)
│       └── icons/        # Favicon and other icons
├── objects/
│   └── dude/
│       ├── dudeVariants.js   # Defines different character variants
│       ├── newDude.js        # Logic for creating and managing a new character
│       ├── sprites.js        # Handles sprite loading and drawing
│       └── variants/
│           └── defaults.js   # Default variant definitions
├── scenes/
│   ├── newScene.js           # Scene management logic
│   ├── sceneVariants.js      # Scene variant definitions
│   ├── camera/
│   │   └── newCamera.js      # Camera logic for pseudo-3D effect
│   └── variants/
│       ├── defaults.js       # Default scene variants
│       └── test.js           # Test/demo scenes
├── stage/
│   ├── newStage.js           # Stage/environment logic
│   └── variants/
│       ├── defaults.js       # Default stage variants
│       └── index.js          # Organizes stage variants
├── LICENSE
└── README.md
```

## How It Works
Characters are assembled from SVG parts, each representing a body part. The framework handles positioning, layering, and animating these parts to create a pseudo-3D effect. You can add new parts or variants by placing SVGs in the appropriate folder and adding/updating the relevant JS files.

## Customization
- **Add new character parts:** Place new SVGs in `assets/images/dudeParts/` and update `index.js`.
- **Create new character variants:** Edit or add files in `objects/dude/variants/`.
- **Modify scenes or stages:** Use the `scenes/` and `stage/` folders to define new environments or camera behaviors.

## License
See [LICENSE](LICENSE) for details.
