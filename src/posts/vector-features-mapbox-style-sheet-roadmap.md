---
layout: post
title: "Vector Features / Mapbox Style Sheet Roadmap"
date: 2020-05-19
thumb: "vector-features-roadmap-1.jpeg"
tags: ["whirlyglobe"]

---

Mapbox Style Sheet support has been ported to Android! Look for it in 3.1.

But this post is really about vector features and money. Let's dive in.

### Vector Maps

You know what vector maps are. Take some points, lines, and polygons and turn them into visual maps.

Let's start with source data which is maybe GeoPackage or ShapeFiles, sometimes Mapbox Vector Tiles or even your own weird format. Then style it. Maybe you use SLD or Mapbox's Style Spec. Some people have their own formats and a lot just do it in code. That's how you get visuals from data.

This requires some basic vector functionality in the WhirlyGlobe-Maply toolkit. Stuff like labels, wide lines, big polygon features, texture support. You know the drill if you're using the toolkit.

I'd like to make that all work better.

### Who This is For

Are you using WG-Maply in your aviation app? Then I know you'd like better vector support. This is for you.

Are you using the Mapbox Styles in your map or weather app? Then this is definitely for you. All of these features will benefit the Mapbox style maps.

With WG-Maply 3.0 released and working, now is the time to add a whole bunch of cross-platform vector features. What follows is a menu of things that can be added to the toolkit.  For money.

### Zoom Level

***What zoom level is this*** is one of the fundamental questions in laying out a flat map. Alas, our maps are not flat and it’s a much more complicated question than it seems. Check out this spherical mercator map splatted on the globe.

{% ImagePlace src="vector-features-roadmap-2.jpg", justify='center' %}
{% endImagePlace %}

What zoom level are we at? Well…. it’s complicated. That particular map might be a zoom level 6. But if we head north, without changing our elevation we’re quickly going to be at zoom level 5. Why? Because the tiles get much smaller.

But a lot of things depend on a continuous “zoom level”. A color might trigger at zoom 2.5. Text size might interpolate between zoom levels 1-5 continuously.

To fix this once and for all I’ll implement a continuous zoom level for a given data source. It’ll be an object you can pass around for reference and query yourself as needed. I’ll even smooth out the nonlinearities (with some deeply strange code it’s best not to think about).

With a dependable zoom level calculation we use on specific features a lot of other things get easier.

### Wide Vectors

Wide Vectors are just linear features with width and proper junctions. We have a wide vector implementation, but it’s got problems: It’s old and leans on geometry to do things it could do in the shaders and it’s missing a bunch of features.

{% ImagePlace src="vector-features-roadmap-3.png", justify='center' %}
{% endImagePlace %}

Some of the basic attributes should vary by zoom level including width, color, opacity and offset.

Offset is a big one we don't have now. It would let you do insets and borders around polygons. I know you aviation users want this one, because you keep asking for it.

All the standard junction and cap types need to be supported. We just do bevel right now.

{% ImagePlace src="vector-features-roadmap-4.png", justify='center' %}
{% endImagePlace %}

We have some facility for dots and dashes, but those need to be updated and tested properly. Much of this logic just needs to go into a more intelligent shader.

{% ImagePlace src="vector-features-roadmap-5.gif", justify='center' %}
{% endImagePlace %}

### Polygons

Big polygonal features mostly work just fine. All that's really missing is control of color, opacity and enabling based on zoom level.

Fill patterns with textures could use some work as well.

### Text

Text support gets tricky, particular with two platforms. It does work, but we need even more. Ignoring layout for the moment there are other features we need.

As with lines and polygons, we should be able to vary color, opacity and size continuously on zoom level.

{% ImagePlace src="vector-features-roadmap-6.png", justify='center' %}
{% endImagePlace %}

Right now outlines are kind of blurry. Ignoring the low level details of why, this is fixable.

And here's a specific Mapbox Style Spec feature: Support for their wacky font packs. I'm not going to switch entirely over to those, but for one of their maps it would be nice to just use them.

### Layout

Here's the really big feature for layout. Making labels follow lines. That one would be huge. It'll also be a lot of work. Again, looking at the aviation users here. I know you want this.

{% ImagePlace src="vector-features-roadmap-7.png", justify='center' %}
{% endImagePlace %}

But general Mapbox Style Sheet users would like this too.

### Screen Objects

We have markers in the toolkit and we've got text. So if you want to make a highway shield or something you can just stick one on top of the other, right?

{% ImagePlace src="vector-features-roadmap-8.png", justify='center' %}
{% endImagePlace %}

Yeah, kinda. It'll work until you see those features intersecting each other and then it looks weird. This happens a lot with aviation symbols.

One solution is to make custom markers for everything, which people do, but it tends to get messy and complex to adjudicate.

Screen Objects fix that problem. You just tell the system you'd like a highway symbol overlaid with a bit of text and it'll make that happen for you. And, oh yeah, that'll work will with part of the Mapbox Style Spec.

### Mapbox Specific Features

Up to this point we're looking at general purpose WG-Maply features. Things you can use without committing to their style spec. But there a few specifics that'd be great if you are using their style sheets.

#### Sprite Sheets

There's some support for this in the toolkit, specifically on iOS. It just needs to be hooked up and tested properly.

#### Mapbox Font Madness

I don't love how they implemented fonts. It seems a bit extravagant to me. But if you want it and you're willing to pay for it, then sure. It would simplify loading the standard Maptiler styles quite a lot.

#### Layout Specifics

How they do layout and how I do layout are pretty different. There are lots of niggling little specifics in their spec that I'm likely to just ignore. If you want to get closer to pixel perfection with their maps, I'm game. You know. For money.

#### Hillshades, Heatmaps, Fake 3D & Rasters

If you're using some of this crazy stuff in the style spec, you're probably just using MapboxGL (whatever it's called now). I have other ways of doing it which are more code based. But if you want to, then sure. Again. For money.

## Conclusion


Odds are you're reading this because I sent you here with the request "*I'd like some money to add several of these features I know you want*". So, you know, let's do that. There's efficiency in scale and the more time I spend on vector maps, the better they will get.

For everyone else, this is where I'd like to take the vector map support in WG-Maply. Your feedback is welcome too.