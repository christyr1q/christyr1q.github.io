---
layout: post
title: "WhirlyGlobe-Maply 3.4"
date: 2021-10-08
thumb: "index_whirlyglobe_3_2.png"
tags: ["whirlyglobe", "android", "ios", "style sheets", "vector tiles"]

---

Version 3.4 is out and it is good.

Wow does time ever fly.  Seems like I was just writing about version, er, 3.2.  We will not speak of 3.3.  It's fine, we just won't speak of it.

So what's in version 3.4 you ask?  Just give me a sec... I know I have it here somewhere.

## Continuous Integration

It's not new to 3.4 but did you know we're building binary versions of the toolkit again?  We are and you can find them on them on the [build page](https://mousebird-consulting-inc.github.io/WhirlyGlobe/builds/builds.html).

Call me a pirate, cause I love how well the AAR works on Android.

As for iOS, they've made the whole binary thing more difficult of late, but you can use it with the right settings.  We need to confront the Swift/ObjC/Framework issue, but you know, not yet.

## Vectors Tiles & Mapbox Kinda Maps

We have more vector tile users of late and one big one who's been pushing things to the limit.  As such, there are a lot of performance improvements, like cancel loads in progress.  Very useful for very large tiles.  Also, more specifically.
* Fixes for level based opacity
* Hybrid image/vector map support on Android
* In-between and over-zooming calculations for expressions
* Sprite sheets now supported on Android
* Level based line width, opacity, and color changes supported on Android
* Text field stops now supported for things like size
* Lighting matches better for the background images on the globe
* Text looks sharper and blends better
* Labels can fade in & out as zoom levels change.  You have to turn this one on.
* Tessellation fix for an obscure case at the very lowest zoom level

MapboxKindaMap is our helper object for gathering assets and starting up the wild and weird variety of Mapbox style (not usually from Mapbox) maps out there.  The tweaks were too numerous to mention on both platforms, but it now supports local style sheets with remote tiles as well as remote style sheets and remote tiles and lots in between.

## Other Random Updates

Before we get into platform specific work, there are a few more random things on both platforms.

The subdivision logic for great circles is now based on a much more accurate library, GeographicLib.  This fixes some discrepencies between where markers and great circles might line up.

The AutoTester, our test app, has been updated on both platforms.  More tests work, the ones that don't are marked, and we've gotten rid of a few redudant ones as well as adding some new ones.

Random coordinate systems such as British National Grid now work again for the 2D map.  We could always display data in those systems, but the map itself can, again, be in a local system other than Spherical Mercator.  Obviously this isn't used that much, but it matters to us.

The sporadic missing glyph problem is fixed.  It was rare and really annoying.

Text and marker layout was greatly reworked by Tim and is now cancellable, which is nice when you've got a lot of stuff to layout.  We also added layout of text along lines.

We added a new location animation option that zooms in a bit more linearly.  That's hooked into the standard AutoTester cases, so give it a look.

## Android Support

Threading is one of the most complex things we do on either platform and it's what makes our toolkit so attractive.  We've found and fixed a large number of threading, shutdown, and cancellation problems, making the system more stable and responsive.

We've also upgraded our version of okHTTP, and fixed an assortment of memory problems.

On the functionality side, the style sheet and vector tile support is at or close to parity with the iOS version.  Never thought we'd see that.

## iOS Support

Some things are easier on iOS and it continues to be the platform where we do things first, largely because that's what we're paid to do.  Metal is a big part of that.

There are some Metal related changes that speed things up, particularly on older devices, user memory more efficiently and let us do even more on the GPU.  The new version of wide vectors, for instance, is hidden now under "performance vectors" but we expect it to replace the general version soon.

Particles are back in a new form, but alas there's no good test case for them.  But they are implemented in a much more Metal-friendly way.

## Mac Support / Catalyst

With Metal support on Mac OS/X we could, in theory, compile for the Mac.  We haven't had much call, but a user did submit a Catalyst port.  We cleaned that up a bit and added it to 3.4!

Catalyst is kind of slow on the older macs, but I'm told it's really good on the new ones.  So that's interesting.  The toolkit runs well and the only thing missing is better gestures for the mouse and keyboard.

I look forward to the flood of WhirlyGlobe-Maply iOS/Mac apps.
