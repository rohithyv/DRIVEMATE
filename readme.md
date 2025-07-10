# DRIVEMATE – Nearby Places Finder

**DRIVEMATE** is a web-based application that helps users find nearby essential services such as hospitals, restaurants, fuel stations, hotels, and schools within a specified radius. The application utilizes the Geoapify Places API for location data and Leaflet.js for interactive map visualization.

## Live Demo
https://drivemate-lac.vercel.app/

## Features

- Automatically detects user's current location using browser geolocation
- Allows users to search for nearby:
  - Hospitals (within 40 km)
  - Restaurants (within 40 km)
  - Fuel stations
  - Hotels
  - Schools
- Displays search results as interactive markers on a map
- Dynamically removes old search results before displaying new ones
- Mobile and desktop responsive interface

## Tech Stack

- HTML, CSS, JavaScript
- Geoapify Places API
- Leaflet.js with OpenStreetMap

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/rohithyv/DRIVEMATE.git
   cd DRIVEMATE
