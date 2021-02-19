--- 
layout: post
title: "WhirlyGlobe 1.2 - Release Announcement"
date: 2012-01-06
thumb: "markers.png"
tags:
    - whirlyglobe
    - release
--- 


### [WhirlyGlobe 1.2 - Release Announcement](https://mousebirdconsulting.blogspot.com/2012/01/whirlyglobe-12-release-announcement.html)

I'm pleased to announce WhirlyGlobe 1.2.  This release has been several months in coming and represents a big step for some of the more interactive functionality in WhirlyGlobe.

I put together a little a short video of the changes.  Check it out below in all its twitchy camera glory.  I'll cover the changes in more detail here.


<iframe allowfullscreen="allowfullscreen" frameborder="0" height="266" mozallowfullscreen="mozallowfullscreen" src="https://www.youtube.com/embed/sqqM2m3YJJI?feature=player_embedded" webkitallowfullscreen="webkitallowfullscreen" width="320"></iframe>



## Marker Layer

In WhirlyGlobe 1.0 we had text labels.  They work great, but sometimes people just want to stick a textured polygon down on the terrain and call it a day.  Or maybe they want to throw down several hundred of them with a sequence of textures.  Either way, we can do it now.



[![img](https://4.bp.blogspot.com/-mriaS4m_Kro/Twd85aCVVXI/AAAAAAAAACI/7sOVtD1rweo/s1600/markers.png)](https://4.bp.blogspot.com/-mriaS4m_Kro/Twd85aCVVXI/AAAAAAAAACI/7sOVtD1rweo/s1600/markers.png)



With Markers, you specify a geographic location per marker and one or more textures to use.  If you give it a sequence of textures and a period, it'll switch between them.  We make that all fast on the back end.


## Particle System Layer

This feature was just plain fun.  You give WhirlyGlobe a location for the emitter, or 150 of them, a bunch of parameters for the particles and off you go.  The emitters generate new particles in the rendering thread and it all looks smooth and pretty.



[![img](https://4.bp.blogspot.com/-V5n_Vj1Zs9E/Twd9EYvulZI/AAAAAAAAACY/OF8DBi3c5V4/s1600/particles.png)](https://4.bp.blogspot.com/-V5n_Vj1Zs9E/Twd9EYvulZI/AAAAAAAAACY/OF8DBi3c5V4/s1600/particles.png)



For now we're doing simple fountains.  We could change that easily enough.  I'm talking to you, potential clients.


## Lofted Polygon Layer

We had lofted polygons in the WhirlyGraph app, but not as a regular feature in the toolkit. These are transparent shapes that sit on top of the terrain, letting you see what's underneath.  They look cool and they're harder to implement than you might think.



[![img](https://4.bp.blogspot.com/-S85pGVcS-NE/Twd9CEgNs4I/AAAAAAAAACQ/WhQTXvx9T1g/s320/loft.png)](https://4.bp.blogspot.com/-S85pGVcS-NE/Twd9CEgNs4I/AAAAAAAAACQ/WhQTXvx9T1g/s1600/loft.png)



Special thanks go to the Clipper library.  I've written that code before and I'm just as happy not to have done so this time.  Plus, theirs is better.



## Fading In & Out

It's a minor feature, but I'm already overusing it.  If you specify a fade time on the description dictionary for your object, WhirlyGlobe will fade it in and fade it back out when you delete the object.  Even a fast fade, like half a second, looks good.

Fading out was much harder than fading in, but we did it.  All for you.


## Selection Layer


We already had support for geographic selection.  That is, finding the region that contains a given point in latitude/longitude.  Several of my clients needed something better: screen space selection.

Labels are the most obvious problem:  How big is a label in geographic coordinates?  What if I want to select the nearest label instead of whatever falls beneath the tap?  Annoying questions when you're working in lat/lon.



[![img](https://1.bp.blogspot.com/-0swgA8qf520/Twd9GYLYQII/AAAAAAAAACg/RbjZw2XLehw/s320/select.png)](https://1.bp.blogspot.com/-0swgA8qf520/Twd9GYLYQII/AAAAAAAAACg/RbjZw2XLehw/s1600/select.png)



With the selection layer, you just hand over the extents of your object and give it a unique ID.  When you need to run a query, just ask the selection layer to do the work for you.  Much easier.

The label and marker layers in 1.2 use the selection layer if you turn it on.



## Caching

Now we're in to the low level features.  Caching lets computationally expensive layers save their work.  The vector and label layers can make use of it, but it's really the Loft Layer that needs it.

What you do is specify a cache name for a given object (or set of objects).  Then, when you ask the layer to add it, it can check the cache first.  If the cache is present, we read from it.  If not, then we do the computation and save to the cache.


## Texture Atlas Builder

Keeping the texture count down in OpenGL is pretty key.  If you look at the guts of any modern game you'll see they've merged a whole lot of their textures together into big atlases.  We need to do that too, but our content is more dynamic.

The solution is a texture atlas builder.  Hand your images over to the builder and you'll get a smaller set of bigger textures and a mapping from one group to the other.  You can use these sub textures as regular texture IDs and the layers will do the right thing.

Obviously, this should work with caching, but doesn't yet.


## Generators


I'm a big fan of static geometry for rendering. I don't like doing any calculation or data manipulation I can't avoid.  However, some features need real time data manipulation on (or near) the rendering thread.

Generators let us do that without losing too much control.  They're render-side objects that construct the optimized drawables we need in the rendering thread.

In WhirlyGlobe 1.2 we've got a generator for particle systems and one for markers.  For particle systems the generator creates new particles and updates the positions of existing ones.  The marker generator handles switching texture display for multi-texture markers.

I've been pleased with how fast the render side generators are.  I see more animation in WhirlyGlobe's future.


## WhirlyGlobeTester


WhirlyGlobe is all about the interaction, so things are constantly getting added and deleted.  We needed a better way to test all that.

The WhirlyGlobeTester app contains code for most of the WhirlyGlobe features.  It also helps test interaction with view controllers and serves as example code.  Look here for best practices.

You can find WhirlyGlobeTester in the source tree or the starter pack.

## Where to Get It

You can grab the source tree from the [google code](https://code.google.com/p/whirlyglobe/) page.  The 1.2 release is tagged.

If you just want the framework, check out the [downloads page](https://code.google.com/p/whirlyglobe/downloads/list).  There's also a starter pack which contains all the test apps and 3rd party libraries you need to compile.