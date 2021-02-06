--- 
layout: post
title: "An Offer to the Mobile Mapping Community"
date: 2020-12-10
thumb: "vectortiles.jpg"
tags: mapbox

--- 

The short version:  We're offering to fix a key problem with the open source version of the Mapbox mobile display toolkit.  But it'll cost money.

To emphasize, I'm talking about the native mobile display SDK here, not the web.

## The Situation

A lot of discussion is happening around Mapbox [closing their Javascript API](https://github.com/mapbox/mapbox-gl-js/blob/main/CHANGELOG.md#200).  For good reason.  It's the most flexible geospatial display API on the web that focuses on performance.

Less noise has been made about Mapbox doing something similar to their mobile APIs back in July.  Same problem, different platform.

## Mapbox Did What Now?

It's a little convoluted, but it goes like this.  They changed the license on the mobile APIs to make it more restrictive, sure, but they also did something more worrying.  They scooped out the rendering engine for Android and iOS and placed it in a binary blob.  So it's no longer open source, or even visible.

Obviously that makes the SDK no longer open.  In a big, big way.  So you can just use the old version, right?  Well, there's a wrinkle.

## Apple, OpenGL ES and Metal

The old Mapbox mobile SDKs used OpenGL ES for rendering.  That's fine on Android, but Apple has deprecated OpenGL in favor of its own rendering toolkit, Metal.  The how's and why's and wailing and such is for another day.  They can do it.  They did it.  We live with it.

So that's a big problem using the old (open) version of the Mapbox mobile display SDKs.  You're going to fall off the cliff at some point without a Metal renderer.

## So Why Not Switch to WhirlyGlobe-Maply

Honestly, we'd prefer you just took a look at our toolkit.  It has a good open source lineage and we didn't close it when we added Metal support.

But yeah, we know people will want to stick with MapboxGL, even if they can't have the new version.  So what if you could drop in a new Metal renderer?

## Who Do We Know With a Metal Renderer?

Well, we have a Metal renderer in WhirlyGlobe-Maply.  It's sitting there in our toolkit purring away.  Tested in shipping software, uses indirect rendering, the more GPU friendly complicated option, and already rendering Mapbox Style Sheets.

## So You Just Drop It In Then?

Ever tried to drop a new engine in your car?  Yeah, it's a bit more complex, but it can be done.

Our low level renderer is meant for internal use.  We interact with it through a set of Managers which turn things like roads into polygons and shader controls.  The renderer itself has modules for OpenGL and Metal.

But the good news is that low level piece (WhirlyKit, we call it) is separable.  It's one nice C++ blob that could be copied into another project.

## Lawyers, Drugs & Money

I've never looked inside MapboxGL.  I don't know how they implement their shaders, I don't know if they have a true rendering engine or some tile based thing.  I've never looked and I wasn't planning on it.

No disrespect to their work, I just manage our Intellectual Property carefully.  Our solutions will look different from theirs, have a provable audit trail in git and be more likely to stand up in court.

This project would pierce that veil and I'd want to have a good attorney lay out the ground rules.  Good attorneys aren't cheap.

And as for the engineering, this isn't a trivial task and it would require money.  We already give away our toolkit for free and maintaining it uses up our "free" time.  Someone needs to pay for this.

## So Maybe Someone Will Just Do This For Free?

Maybe.  It's a good learning experience.  But there's a reason Mapbox buried its rendering engine.  Doing it is hard.  Doing it well is much, much harder.

Not many geospatial developers understand real time rendering.  If you want to use game developers, you need to teach them geospatial.  Been down that road.  It's fine, but it's a long road.

## Summary

We know what we're doing here.  Obviously.  We could do this, replacing their OpenGL renderer with our likely faster Metal renderer.  All it takes is money.

I'm not delusional.  A lot of things have to happen quickly.  Any sufficiently large player can find another way to pressure Mapbox and probably already has.  That's just business.

But if you have the cash and the need, we're open to fixing this problem for the community.
