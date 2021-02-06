--- 
layout: post
title: "App Store Mention: Santa's Big Helper"
date: 2011-11-30
thumb: "Screen shot 2011-11-30 at 8.41.38 AM.png"
tags:
    - whirlyglobe
    - apps
--- 

The whole point of doing WhirlyGlobe is for developers to use it.  I had in my mind a couple of types of developers who might find it useful:  People who just want to toss some info up on the globe and hard core globe centric app developers.

They're both really interesting groups, but for very different reasons.

## Hard Core Interactive Globes

I wasn't expecting to attract this group right off the bat.  I have, though, and that's both good and bad.  On the good side, they push really hard for new features.  On the bad side, they push really hard for new features.  It's great to see that WhirlyGlobe is useful to them, but I'm not as responsive as I'd like to be.

Mobile development is an interesting place full of really excited people trying out lots of great ideas.  Which is to say, the failure rate is pretty high.  I've worked with a number of projects that have collapsed under the weight of their own ambitions.  Others have just slowed considerably after the initial burst of excitement.  In software engineering parlance that's called "normal".

One of the big issues that confounds these projects is data collection and manipulation.

## GIS Is Harder Than You Think

Getting the right data for your project is much more difficult than people realize.  Any number of projects I'm involved with have tripped over these issues.  I warn, but I'm not doing a great job at it.

Most developers are vaguely aware of the Blue Marble imagery data set so I don't have to point it out.   The next place I'll send them is to the Natural Earth web site for vector data.  After that it gets tricky.  If you want something specific you really have to do some data processing.

You can't really do that data processing on OSX.  There are some open source tools, but they're not all that user friendly.  The major tools vendor hasn't ported to the mac and why on earth would they?  That means I can't even reliably get a client to look at their own data.  They really need a PC or they need to be pretty savvy to use the open source stuff.  Even then they're going to have to outsource the data processing.

A lot of projects bog down here.  That's why it's nice to work with simpler projects too.  These are developers who just want to bring up a globe and toss a few geolocated objects on top of it.  One of them recently shipped.

## Santa's Big Helper

That's just what the developer is doing in Santa's Big Helper.  He's bringing up a globe with one of the Blue Marble composites overlaid and then dropping a few Markers on top.


These projects are a great test of how usable WhirlyGlobe is on the less complex end of things.  Obviously Santa's Big Helper is not a simple app, but the globe is a relatively straightforward application of my toolkit.

I could use more documentation, I think, but these projects are able to proceed and that makes me happy.

There are a number of interesting things they did here, actually.  There are views underlaid and overlaid, including transparency.  They look really good.

Surprisingly, the frame rate is still quite good.  I obsess about performance because that's my thing so semi-transparent overlays are something I avoid.  I may be overthinking it.

That's cool and it's great to see that WhirlyGlobe is working on the simpler end of things.  That's what it was designed to do and there are a few features in the pipeline that'll help with this sort of project.

## WhirlyGlobe Version 1.2

As for the actual 1.2 release, I'm still a few weeks away.  Here's how things are going.

- Particle systems are working and scaled correctly.  
- Markers are working, but I'm still scaling them.  If you just need a handful, you're good.  If you want to toss 2000 of them up there, wait a bit.
- The Texture Atlas Builder is up and running, as is texture ID translation.  I'm pretty happy with this one as it solves a lot of problems.
- The new Selection layer is up and running.  It really simplifies label and marker selection logic.
- There's a new test app I'm using for tracking down memory and resource problems.  It needs to test a few more features before it's complete.
- Lofted polygons haven't been integrated yet.  These are what WhirlyGraph uses.
- Render Data Caching is working, but not complete.  It's also a bit slower than I'd like.
- Bitmap font support for labels has not started.  I'm wavering on this one.  It's really the last unnecessary resource hog in WhirlyGlobe 1.1, but I would like to release soon.
- Gridlines may get postponed.  No one seems to be bugging me for them.

The source tree is actually in pretty good shape right now.  If you need one of the new features, just ping me to see how well it's working.