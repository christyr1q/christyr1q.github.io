--- 
layout: post
title: "MapBox Tiles Support & Other Things"
date: 2012-02-02
thumb: "wholeearth.png"
tags: whirlyglobe

--- 


Right now WhirlyGlobe supports a single resolution of imagery for the globe.  You chop it up, feed it to the system and it uses that.  I've always planned on supporting image pyramids.

There are lots of ways to represent an image pyramid.  The one I settled on, [for various reasons](http://mousebirdconsulting.blogspot.com/2011/11/image-pyramid-support-mapbox-tiles.html), is MBTiles.  It's pretty simple and they've got a decent iOS presence.


## MapBox Tiles - First Pass

I'm implemented a first pass at MBTiles support.  Here's a pretty picture.

Lots of things missing here, but let's talk about what's working.  I've added a new data layer called WhirlyGlobeMBTileLayer.  It works in much the same way as the Spherical Earth Layer.  You give it  the name of an MBTiles file and it'll do the rest.

MBTiles are stored in a Spherical Mercator coordinate system (designed to annoy professional cartographers).  That's fine for our purposes, but it does mean we have to do a little reprojection.  The layer handles that part by generating the triangle grid in the local system and projecting out.  As a result the images get warped without having to do anything else.  It's good enough for display.

Just to make that point, here's another pretty picture showing how a vector layer lines up with the underlying image.  It matches perfectly.  A little too perfectly actually, which means we're using exactly the same data set.  Natural Earth 10m admin 0 represent!

| [![img](http://1.bp.blogspot.com/-rbVFRWNoBFU/Tyto_7pT-nI/AAAAAAAAACw/DDCnCSkl1jM/s320/Vectors+Overlaid.png)](http://1.bp.blogspot.com/-rbVFRWNoBFU/Tyto_7pT-nI/AAAAAAAAACw/DDCnCSkl1jM/s1600/Vectors+Overlaid.png) |
| ------------------------------------------------------------ |
| MBTiles Layer + 10m vector countries                         |

Okay, so it's completely working, right?  Not so much.  This was just the first pass.  Let's take a look at...

## Missing Features

In the above examples we've loaded the 4th level of detail.  It's basically a quad tree so that's means an image set of 16 by 16 tiles.  That looks good here, but if we go closer, it won't.  Go up another few levels and that's too much memory.

The solution is dynamic tile paging.  Load in what's near you, or really what takes up the most screen space.  Load out what isn't important.  It gets messy.

That's the biggest missing feature: dynamic tile paging.  There are some minor features too.  

- Tile edging.  When textures and chopped images don't get along, you see seams.  I need to figure out why, in this particular case.
- Sparse MBTiles.  It's possible to make an MBTiles archive with missing pieces.  Useful, but annoying to implement.
- MBTile selection layers.  The standard supports these grids for doing lookups.  I use vector data for that, but someone might need these instead.
- PVRTC support.  JPGs and PNGs are a huge waste for the graphics card.  We really need PVRTC images.

## Development Plans

I've checked the first pass in to the trunk.  Feel free to kick it around.  If all you want to do is load in a single level of detail, that might be enough.

I don't think this will be truly useful until the dynamic paging is working.  Right now I'm pursuing it at open source speed.  It'll get done eventually in conjunction with an app that the Development Seed guys are [working on](https://github.com/incanus/Mapresent).

If you need this functionality sooner and have money, let's talk.  This could move up to client speed.  If you don't have money and still need it, I'd be interested in hearing about that as well.

Oh, and here's another pretty picture.

| [![img](http://2.bp.blogspot.com/-X4s_CY8m82k/Tyt0r45p2yI/AAAAAAAAAC4/OaF0nlRpIo0/s320/Lofted+Polys.png)](http://2.bp.blogspot.com/-X4s_CY8m82k/Tyt0r45p2yI/AAAAAAAAAC4/OaF0nlRpIo0/s1600/Lofted+Polys.png) |
| ------------------------------------------------------------ |
| Geography Class + Lofted Polys                               |