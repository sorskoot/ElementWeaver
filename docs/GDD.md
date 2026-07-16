# Element Weaver

## Core Concept

Element Weaver is a cozy tile-placement game for VR. Players place hexagonal tiles and connect matching elemental colors, similar to dominoes. The goal is to create valuable connections and achieve the highest score possible.

## Platform

- Primary platform: VR
- Also playable in a desktop browser
- Built with Wonderland Engine

## Gameplay

Players place hexagonal tiles onto the board and rotate them using the controller before placement.

The board starts with a single random tile.

Players always hold the current tile and can rotate it before placement.

Only positions adjacent to the existing board can be selected.

The game focuses entirely on placement decisions. There are no resources, objectives, territory mechanics, or network scoring.

Scoring is based on how tiles connect to neighboring tiles:

- Matching colors score points.
- Matching multiple colors with a single placement awards bonus points.

## Elements

Each tile contains six randomly assigned elemental colors.

Available elements:

- Red — Fire
- Blue — Water
- Green — Earth
- Yellow — Air
- Purple — Spirit

Spirit acts as a wildcard and can match any other element.

Spirit rules:

- Spirit matches every element.
- Spirit scores no points.
- Spirit placements do not reset the combo or multiplier.
- Spirit-to-Spirit connections are valid.
- Spirit connections never contribute to score calculations.
- Generated tiles may contain at most one Spirit edge.

Element distribution is weighted:

- Fire, Water, Earth, and Air are common.
- Spirit is intentionally rarer.

## Assets

- The tile model is already completed.

## Game Jam Scope

This project is being developed for a game jam.

- Keep the game as simple as possible.
- Prioritize reaching a playable state quickly.
- The jam theme is Elements.
- Development time is limited to only a few remaining days.

## Core Design Pillars

1. Relaxing VR interaction.
2. Simple but meaningful placement decisions.
3. Rewarding score and combo growth.

## Core Gameplay Loop

1. Preview the next tile.
2. Rotate the current tile.
3. Place it adjacent to the existing board.
4. Score direct matches.
5. Increase the combo and multiplier.
6. Receive the next tile.

## Board Rules

- The board must remain a single connected structure.
- Players cannot create disconnected islands.
- Every placement location is valid.
- Placements never fail.
- A placement with no matching sides simply awards no points.
- Placeholder cells are generated around occupied cells.
- Selecting a placeholder places the current tile there.

### Placeholder Cells

- Placeholder cells are stored in the board model.
- Placeholder cells may use a ghost hex visual.
- When hovered, the ghost is hidden and the currently held tile is shown snapped to that position.
- The preview tile is displayed slightly above the board to make placement clear.

## Scoring

Scoring is based only on direct matches created by the newly placed tile.

No network scoring is used.

Base score:

- 1 match = 1 point
- 2 matches = 2 points
- 3 matches = 4 points
- 4 matches = 8 points
- 5 matches = 16 points
- 6 matches = 32 points

### Combo System

- A placement with at least one elemental match increases the combo.
- Consecutive successful placements build larger bonuses.
- A placement with no elemental matches resets the combo.

### Multiplier System

- A successful placement increases the score multiplier.
- A placement with no elemental matches resets the multiplier.
- Spirit-only placements preserve the current multiplier.
- The multiplier is capped.
- The cap should be configurable in code.
- Initial cap: x3.

## Tile Generation

- Tiles may contain duplicate elements.
- The first tile may not contain Spirit.
- Generation uses a weighted pool where Spirit appears less frequently than the other elements.

## User Interface

Visible during gameplay:

- Current score.
- Current multiplier.
- Current combo.
- Next tile preview.

Optional polish:

- Floating score popups at placement locations.
- Placement animations.
- Combo feedback effects.

## Game Modes

### Endless Mode

Default mode.

The game continues indefinitely.

### Limited Tile Mode

Stretch goal.

- Fixed tile count.
- Initial value: 50 tiles.
- Tile count should be configurable.
- Highest score wins.

### Timed Mode

Post-jam feature.

Players attempt to achieve the highest possible score before time expires.

## Vertical Slice

The minimum playable version consists of:

1. Starting tile.
2. Placeholder generation.
3. Tile rotation.
4. Tile placement.
5. Neighbor detection.
6. Match detection.
7. Scoring.
8. Next tile generation and preview.

This is the minimum feature set required for a game jam submission.

## Architecture

The project follows a lightweight MVVM-inspired architecture.

### Models

- Pure game state.
- No Wonderland Engine dependencies.

Examples:

- GameState.
- BoardModel.
- TileModel.

### Services

- Game rules.
- State mutations.
- Tile generation.
- Placement validation.
- Scoring.

### ViewModels

- Presentation state.
- Data exposed to views and UI.

### Wonderland Components

- Rendering.
- Input.
- Visual feedback.
- Communication with services.

Components should not contain core gameplay logic.

## Planned Implementation Order

1. TileModel.
2. BoardModel.
3. TileGenerator.
4. PlacementService.
5. Neighbor detection.
6. Match detection.
7. Scoring.
8. Next tile preview.
9. Combo and multiplier.
10. Visual polish.

## Future Ideas

- High scores.
- Enhanced score popups.
- Additional game modes.
- Improved visual effects.
- Performance optimizations such as pooling if board sizes become very large.





