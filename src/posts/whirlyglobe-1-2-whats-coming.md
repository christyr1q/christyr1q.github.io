--- 
layout: post
title: "WhirlyGlobe 1.2"
date: 2011-10-04
tags: 
    - "mousebird consulting" 
    - "whirlyglobe"

--- 

I'm working on WhirlyGlobe 1.2 at the moment.  Well, I'm working on things and those things will wind up in 1.2.  Here's a list of some of those things.

## Caching

Here's what I mean by caching.  WhirlyGlobe reads fairly generic data sets: geodetic shape files.  These are relatively unstructured lists of points, linears, and areal features with matching attribution.  All the coordinates are in (latitude,longitude).  Turning these into what you see on the screen involves a bit of processing.

What I'm doing internally is batching all that data into a small set of Drawables and tossing those over to the renderer.  To cache, I save that data out in a form compatible with OpenGL and load it back in on startup.

The caching is mostly finished.  I had a client who wanted to load all the Natural Earth 10m country vectors at once.  Turns out it's possible, even on the iPad1.

## Bitmap Fonts

When you add text to the label layer in WhirlyGlobe it's rendering it to a UIImage and turning that into a texture.  That's not deeply efficient.  If you add a whole bunch of labels together, it is stitching those images together into Texture Atlases, so that's not as bad as it could be.  Still, it uses more memory than it should.

The obvious next step is to use a giant texture made up of all the various characters you might want to use.  There are standards for this sort of thing and tools to generate the textures, such as BMFont.  It's just a matter of actually doing the work.

## Grid Layer

This one's pretty simple.  It's just a layer that drops down lines at the lat/lon boundaries.  It's in there now, it just doesn't work all that well.

## Lofting Layer

The lofting layer is part of WhirlyGraph.  That's the thing that creates transparent geometry for country outlines.  In that sense, this isn't all that new.

What is new is integrating it into the regular toolkit.  I was doing an early version of caching to make it fast enough to use for the bigger countries.  Now caching is worked out, I'll switch the lofting layer over and integrate with the main toolkit.

## Particle Generator

I've had requests for simple particle generation, much like in the Smule apps.  It's easy enough, but making it fast requires some design.

You'll most likely be restricted to a fairly simple set of parameters: particle color, speed, and various randomizers.  I think I'll avoid fireworks for the first go and we'll stick to fairly basic fountains.

## The Farther Future

That's all for 1.2, I think.  Of course, some of this might slip and anything a client needs gets priority.

There are already some interesting things in store for 1.3.  In particular, discussions with other groups related to doing data fetching over the network.  We'll see how those go.