Nobita
===

> ![](http://pre08.deviantart.net/2359/th/pre/f/2011/295/5/d/nobi_nobita_by_renirevenge-d4dn91h.jpg)
> [Artwork](http://renirevenge.deviantart.com/art/Nobi-Nobita-264784517) by renirevenge

A simple script to check in to a (configurable) [Foursquare](https://foursquare.com/) (Swarm) location when user is within range. It detects user location with [WhereAmI](https://github.com/robmathers/WhereAmI) that uses OSX CoreLocation framework. Optionally run this with `launchd` to automatically check in at specific times 😉

**NOTE: This runs only on macOS.**

Steps
---

1. `yarn` to setup all dependencies and download `whereami`.
2. Copy `config.sample.json` to `config.json` and configure:
  - `access_token`: OAuth access token from Foursquare
  - `venue`: ID and coordinates of venue
3. Schedule run script with `launchd` or [LaunchControl](http://www.soma-zone.com/LaunchControl/).

To get the access token, follow instructions on this page: https://developer.foursquare.com/overview/auth

To get the venue ID, inspect the XHR autocomplete API call on https://foursquare.com/
