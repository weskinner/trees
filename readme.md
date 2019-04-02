# Mission
To make the finding and identification of interesting trees fun and exciting.


# Approach
Create a social network that gamifies:
  - collecting sightings of local trees
  - identification of species of sightings


# Current Sprint
Build pages with dummy data


# MVP
## User Stories
- As a user I should be able to:
    - Use my mobile device to submit a tree sighting
    - Identify the species of a sighting
    - See a list of my sightings
    - Confirm another user's identification
    - Challenge the species identification of a sighting with an alternative speicies
    - Confirm another user's challenge of an identification
    - See a list of all ongoing identifications
    - Upvote a sighting
    - Update my profile information

## Screens
### Create Sighting
A form for capturing a sighting in the wild

### Sighting
- Display information and pictures for a specific sighting
- Ability to upvote this sighting
- Display a list of identifications for this sighting
    - Ability to upvote an identification
- Action to submit an identification for this sighting

### Create Identification
- modal to capture suggested species name for a sighting

### All Sightings
Display a paginated list of all sightings

### Profile
Show basic profile information along with a list of my tree sightings


# Models
## Sighting
properties:
- author
- date
- location
- images
- notes
- upvotes

## Identification
properties:
- author
- species
- date
- upvotes