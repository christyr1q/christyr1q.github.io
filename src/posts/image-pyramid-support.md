--- 
layout: post
title: "Image Pyramid Support: MapBox Tiles"
date: 2011-11-08
tags: whirlyglobe

--- 

I've been planning to add support for multi-resolution images, or image pyramids, for a while.  I'm still planning on it.

## Image Pyramid

An image pyramid is pretty much what it sounds like.  You take a giant image, make a version at about half the resolution, put that somewhere, made another version at half that resolution and keep going.  You stop when you either get to 1 pixel or it just gets stupid, usually the latter.

Rather than storing a big image at each level, you tend to chop these suckers up into manageable pieces.  The definition of manageable changes depending on what you're up to.  For interactive 3D the chunks tend to be less than 1M pixels in a format conducive to fast drawing.  That size might be 256 x 256 pixels and the format is PVRTC for our purposes.

Another way of looking at an image pyramid is as a quad tree.  Each node would store a single image, ideally in your optimized format, ready to be loaded.  Or, and this where it gets fun, a node might be empty.  This lets you build a sparse image pyramid and save a lot of space.

Image pyramids are easy enough to build, but you have to do something with them.

## Paging Image Data

There are different ways to page an image pyramid or similar structure.  If you're displaying the image in 2D, you tend to want everything in your window at one resolution.  When the user zooms in or out, you switch resolutions.  For 3D display, you tend to use the higher resolutions close up and lower resolutions in the distance.

For a globe, it gets weirder.  You want lower resolutions when you're farther away and higher resolutions when zoomed in.  And if the user spins the damn thing really fast... well you need to not go on a paging binge.  It's similar enough to 2D and 3D display, though, that you can borrow from those approaches.  The main question is where you're pulling the data from.

There are as many tiled multi-resolution image formats as their are clever idiots to make them.  I developed one myself back in the day.  There are many, many others.  To pick one, you really have to look at the technology you're targeting and think a little about marketing.

## MapBox Tiles

For WhirlyGlobe, I'm planning to implement the MapBox Tiles (MBTiles) spec.  It's got a few things going for it.

MBTiles is being actively developed.  That means an ecosystem of applications producing it and users interested in plugging things together.  The folks behind it have a pretty good open source vibe too.

It's based on currently hot technology.  You store tiles in a sqlite3 database, which is pretty much ubiquitous these days.  It can also be streamed from a remote site.  2004 here we come!

MBTiles are stored pretty flexibly, so I can mess with them.  I need to stick PVRTC image data in there, rather than PNG or JPEG.  The difference in memory is pretty big and that's what we really care about.

MapBox makes user level tools to produce MBTiles, including an iPad app (TileMill).  Data production for GIS is a bitch, so this is promising.  The dots may not all connect, but it's a start.  [Edit:  Too lazy here in my description.  The iPad app displays maps produced by TileMill, which runs on the mac, among other places.  Getting all the tools together on one platform is a problem I have with clients all the time, so this is promising.]

## WhirlyGlobe Issues & Schedule

Of course, there's always work to do.  Paging imagery also means paging terrain, or in my case, making it up on the fly.  I'm already doing that in the Spherical Earth Layer, but now I'm going to have to do it differently.

Multiple resolutions of terrain means multiple resolutions of data sitting on top of the terrain... possibly.  So it gets complicated.  What fun.

MapBox Tile support will be after WhirlyGlobe 1.2.  My guess at this point is early 2012.