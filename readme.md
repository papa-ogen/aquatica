http://localhost:8080

- [x] Switch between levels
- [x] Add fish
- [x] Add plants
- [x] Currents (strömmar) (angle, velocity)
- [ ] Cave?
- [x] pause/play
- [ ] slow/speed up animation based on throttle
- [x] generate fish on button click
- [ ] add lights on sub
- [x] Ship type (layout, loadout, cost, hull, weapons)
- [x] State machine - https://glitch.com/edit/#!/phaser-fsm-example?path=public%2Fclient.js%3A76%3A32 or xstate?
- [ ] Put sub, shadow etc in a container
// Player
- [x] Money, resources etc
- [ ] Dive
- [ ] Submarine set depth
- [x] Acceleration on speed
- [ ] Submarine shadow (blur more depending on depth etc)
- [x] fördröjd sväng beroende på fart, så att targetAngle tar längre tid beroende på fart.
- [x] lay anchor
- [x] create a mask plugin
- [x] Greate a global gauge plugin - https://phaser.io/examples/v3/view/plugins/multiple-global-plugin-instances

// Trading
- [ ] Visit city (atoll, oil rig)

// Hunt/gather
- [ ] Send diving bell, divers, sub to get resources
- [ ] Shoot Torpedo
- [ ] Lay mines
- [ ] Plasma gun?

// Canvas
- [x] Implement ui canvas
- [x] Bg canvas should not update on every frame
- [x] Load sprites
- [x] Animate sprites - https://spicyyoghurt.com/tutorials/html5-javascript-game-development/images-and-sprite-animations
- [x] Transitions

// General
- [ ] Day and night cycle
- [ ] Font

// Add filter to below surface scene
- [x] https://rexrainbow.github.io/phaser3-rex-notes/docs/site/shader-hsladjust/

// How to fix body rotation. Change to matter?
- https://phaser.io/examples/v3/view/game-objects/container/matter-physics-body-test
- without matter: https://github.com/ourcade/phaser3-homing-missile-arcade-physics/blob/master/src/main.js

notes
https://rexrainbow.github.io/phaser3-rex-notes/docs


MVP FOR GAME PLAY
- [ ] Radar
- [x] Create Trivium sprite
- [x] Create a complete map
- [x] Add big bosses placeholder in the map that can be random generated in scene
- [ ] Functionality to collect limited amount of Trivium for diver
- [x] Limited air for diver
- [x] Diver Health
- [x] Submarine Health
- [x] Engine on/off (loose speed etc)
- [x] Engine sound
- [ ] Engine sound will attract boss
- [ ] Add BigBoss shadow
- [ ] Add BigBoss health
- [ ] Add BigBoss attack
- [ ] Design BigBoss and sprites
- [ ] Sound effects (dig, deploy diver, retract diver, big boss)
- [ ] Music
- [x] Limit map size
- [ ] Design control panel
- [ ] Design diver and sprites
- [ ] Design submarine and sprites
- [ ] Design Splash screen / menu screen
- [ ] Turn sound/music on/off
- [ ] Create submarine container
- [x] Add collision

BUGS
- [ ] Diver z-index should be lower than fish
- [ ] Fish is moving in wrong direction
- [x] radar-dot has ugly border