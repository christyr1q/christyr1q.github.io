--- 
layout: post
title: "WhirlyGlobe 1.1"
date: 2011-09-26
tags: 
    - "mousebird consulting" 
    - "whirlyglobe"

--- 

Version 1.1 was released around August 27th.  I'm still catching up, obviously.

Mainly, this was a bug fix release.  There was a bit of new functionality like so:

Support for label selection.  Not actual label selection, mind you, just support for getting size and location info projected in to 2D.
Added pre, post frame and lighting callbacks.  You can now override how WhirlyGlobe does the lighting, if you so desire.
WhirlyGraph was integrated in to the Contributed tree.  That's one of the prettier demos.
There was a bit of stuff under the hood not worth discussing.

## Framework & Starter Pack

The most useful pieces were these.  I hacked together a framework building shell script from a useful blog post and started distributing a framework.  Now you can just drag and drop WhirlyGlobe into your project.

Of course you still need all the dependencies and that was causing people problems.  To that end I put together a distribution with all the various dependencies.  You can get the download off the WhirlyGlobe project page.
