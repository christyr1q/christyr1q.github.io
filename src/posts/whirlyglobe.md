--- 
layout: post
title: "WhirlyGlobe"
date: 2011-09-20
thumb: "banner_web2.png"
tags: 
    - "mousebird consulting" 
    - "whirlyglobe"

--- 
So I didn't keep the blog up, but oddly enough I did finish the project: WhirlyGlobe.

What WhirlyGlobe does is handle the 3D interaction and rendering for a globe with vector data.  The vectors can be from a remote source or Shape files that you bring along with your app.

There are a couple of apps available on iTunes to look at.
- The WhirlyGlobe demo app lets you tap around countries and states as well as oceans (my personal favorite).
- WhirlyGraph shows comparative statistics for countries around the world.  And it's candy colored.

## Earth Data

WhirlyGlobe is meant to display a set of earth imagery with vector data overlaid.  Basically, that means it takes a collection of images in the proper format with an index file.  It comes with a utility to prepare that data from a regular image file if you want to use your own.

Vector data can come from a couple of different sources.  The first is you.  Just create points, linears, or areal features and, optionally, labels.  The second source is Shape files.  These are a standard for geographic data and can be found on the web, often for free, or created with standard industry tools.

## Audience

As you might have guessed, this is for app developers.  You need to know Objective-C, Cocoa Touch, and a smattering of C++ to use it effectively.  There are a couple of decent examples, including the source code for the WhirlyGlobe app.

## Source Code

WhirlyGlobe is an open source toolkit distributed under the Apache License (2.0).  That should allow you to use it in just about any configuration for free, commercial, or any sort of app.  mousebird consulting owns the source code entirely so if you need some other license, we can discuss it.

## Motivation

Obviously no one does this sort of work for free.  Unless they do.  If they do, they probably have a reason.  Here are our reasons.

- The WhirlyGlobe toolkit is free to use in most ways, as constrained by the Apache License (2.0).  - If you would like additional functionality, you can hire us to add it.
- I've benefited from quite a few open source toolkits for ios.  WhirlyGlobe is a way of giving something back.
- Data visualization on mobile devices is interesting and difficult.  I like those sorts of problems.
0r maybe I just like showing off.

In any case, if you need a 3D interactive globe component for ios, give WhirlyGlobe a look.