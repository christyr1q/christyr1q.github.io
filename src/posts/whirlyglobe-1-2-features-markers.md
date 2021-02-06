--- 
layout: post
title: "WhirlyGlobe 1.2 feature - Markers"
date: 2011-10-20
tags: 
    - "mousebird consulting" 
    - "whirlyglobe"
    - "features"

--- 

The paperwork's still being shuffled on this one, but it looks like it'll happen.  I have a client who needs Markers and Selection.

That'll be two new layers that find their way into WhirlyGlobe 1.2.

## Markers

Markers are pretty simple, really.  You give the toolkit a location, a size, and an image and it sticks that sucker right where you tell it.  Kind of obvious, really.  I'd say it was an oversight in 1.1, but I just chose to work on vectors instead.

In true WhirlyGlobe fashion, you'll be able to specify a whole NSArray of Markers (and I recommend that you do) for speed.

You'll also be able to specify a whole array of UIImages to iterate over, in much the same way as UIImageView.  I'll be tossing these in to a Texture Atlas, because that's just how I roll.  Should be pretty fast.

The switching will be controlled by a render-side Generator, which I'm not ready to talk about yet.  We'll see more Generators in 1.2.

## Selection

This one is more infrastructure-y.  The Selection layer will let you pick features based on a 2D screen location.

Selecting vector features is pretty easy already.  All you need is a geographic location and a big pile of features to look through.  With the MBR (bounding box) cache on top of a shapefile, we can do most of the checking without looking at the actual features.  It's fast and reasonably easy.

Selecting labels is harder.  To do it properly you'd really like to tap within a label or near one and that nearness test makes it tricky.  What coordinate system is it "near" the tap in?  Well, from the user's perspective, it's the screen and that means you need to do it in screen space.

What the Selection layer will do is keep track of objects, such as labels, in 3-space and project them back to the screen on demand for testing.  You'll hand the Selection layer a point, distance, and a callback delegate.  Everything that falls within the given range will be handed to the delegate.

## Toolkit Support & WhirlyGlobe 1.2

The Marker and Label layers will automatically pass their data to the Selection layer if given the right parameters.  There's a bit of overhead in keeping the outlines of features available for selection so this will be optional.  In fact, it will probably cost more memory to make a given label available for selection than to render it.  Weird, eh?

Geographic features, such as points, linears, and areals will still be selectable by geographic test.  For now, that makes more sense.

The 1.2 release is being shuffled a bit.  Markers are new and Selection was something I was contemplating for later.  Caching is still in, as are particle systems, since I have those largely implemented.  We'll have to see what else makes the cut.