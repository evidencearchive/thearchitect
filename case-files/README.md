# Case Files System

## Overview

The Case Files system represents The Architect's personal collection of information and analysis related to the PharmaCorp XR-7734 investigation. Unlike the Evidence Archive (which contains objective, factual information in a law enforcement database style), the Case Files contain narrative-driven, interpretive content that adapts to the player's psychological profile.

## Key Features

### Psychological Profile Integration

Case files dynamically adapt to the player's psychological profile, emphasizing aspects of the case that align with their cognitive processing traits, behavioral tendencies, and motivational traits. This creates a personalized narrative experience that resonates with each player's unique perspective.

### Narrative Paths

The system organizes content along five distinct narrative paths, each corresponding to different psychological profiles:

1. **Systemic Investigation** - For players who focus on systems, structures, and root causes
2. **Empathetic Resolution** - For players who prioritize human impact and emotional dimensions
3. **Moral Compromise** - For players who navigate ethical gray areas and complex moral trade-offs
4. **Hero Path** - For players who value accountability, justice, and principled action
5. **Join Path** - For players drawn to conspiracy, pattern recognition, and hidden connections

### Premium Content Integration

Case files connect to premium evidence items in the Evidence Archive, creating a cohesive investigative experience across both systems. Premium tiers provide progressively deeper insights:

- **Investigator Toolkit** - Essential investigative tools and insights
- **Insider Access** - Confidential internal documents and personal accounts
- **Architect's Confidential** - The Architect's most sensitive analyses and deeply hidden evidence

## Technical Implementation

### File Structure

- `index.json` - Master index of all case files with metadata and relationships
- `[narrative-path]-case.json` - Individual case files organized by narrative path
- `README.md` - Documentation (this file)

### Integration Points

- Connects with the psychological profiling system via the MCP integration layer
- Links to evidence items in the Evidence Archive through evidence_connections
- Provides psychological insights tailored to the player's profile

## Usage

Case files are accessed through the Case Files page in the game interface, which presents The Architect's analysis with a dark, mysterious aesthetic reflecting The Architect's persona. The system automatically prioritizes and highlights case files that align with the player's psychological profile.

## Design Philosophy

The Case Files system embodies The Architect's perspective - analytical, insightful, and slightly mysterious. It serves as the interpretive layer that helps players make sense of the raw evidence they discover, providing context, connections, and deeper meaning to the investigation.

Unlike the Evidence Archive (which encourages players to form their own interpretations), the Case Files represent The Architect's curated analysis, offering guidance while still respecting the player's agency and intelligence.

## Future Development

Planned enhancements include:
- Additional case files for each narrative path
- More sophisticated psychological insight generation
- Enhanced visual presentation with interactive elements
- Deeper integration with the player's choices and actions throughout the game
