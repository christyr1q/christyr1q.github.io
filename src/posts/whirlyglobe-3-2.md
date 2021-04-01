---
layout: post
title: "WhirlyGlobe-Maply 3.2"
date: 2021-03-31
thumb: "index_whirlyglobe_3_2.png"
tags: whirlyglobe

---

We've just updated WhirlyGlobe to version 3.2.  This includes a lot on the Android side, including better Style Sheet support.  And a lot of, lot of, LOT OF random bug fixes for both platforms.

Let's start with Android.

## Android Style Sheets

{% ImagePlace src="maptiler-android-1.jpg", justify='left' %}

Mapbox Style Sheet support has come to Android!  Well, we've been parsing the style sheets and building something for months now, but now it's starting to look better.  Fonts, color interpolation, widths, all that good stuff.

It's also quite a bit easier to set up a Mapbox style map on Android.  Look for MapboxKindaMap in the MapTiler example in the AutoTester.

{% endImagePlace %}

## Style Sheet Circles

{% ImagePlace src="style-sheet-circle.png", justify='left' %}

Oh yeah, did you know you can put circles in the style sheets?  It's sort of a visualization thing they threw in there.  One of clients needed it, so now it works.

Both platforms too.

{% endImagePlace %}

## Vector Tiles

Vector Tiles are a funny feature.  We didn't implement them originally, they were a gift from a user.  Very cool, but it presented some weird problems.

See, no one had paid for them.  We didn't get that initial hit of money to understand them and do them our way.  Not a problem for an obscure feature only a few people use, but they became critical.

In the last couple of years we've gotten money to flesh out the Style Sheet support, port it all to Android and do a rewrite.

And so with version 3.2 we've ditched Google Protobuf library for nanopb, made the parsing ever so much faster and reduced memory consumption.

One of our big customers runs a massive amount of visual data through vector tiles + style sheets.  A map, sure.  But then even more data **on top** of that.  It's wild.

## Wide Vectors - Fast Version

{% ImagePlace src="wide-vectors-perf-1.png", justify='left' %}

Okay, so this requires some explanation.  On iOS when we moved from OpenGL to Metal we lost lines that had width.  GL does it for you, Metal doesn't.

So fine, we have a Wide Vector implementation, just use that, right?  Okay, but it's slower to set up and takes up more memory.  Because we do all the geometric work ahead of time and just have the dumb shader do dumb things it can handle because it's dumb.  Shaders were dumb.

{% endImagePlace %}

Metal shaders aren't dumb.  So now there's a new Wide Vector implementation you can turn on with the kMaplyWideVecImpl flag.  Like so.

```
viewC.addWideVectors(lines, desc: [kMaplyVecWidth: 2.0,
                                    kMaplyWideVecImpl: kMaplyWideVecImplPerf,
                                    kMaplyColor: UIColor.blue],
                                 mode: .any)
```

At the moment it just does filled lines.  Basically a replacement for the old lines with width in GL, but with no size limits.

Eventually this will grow to replace our default wide vector implementation.  But, you know, money.

I mention money a lot.  We like money.

## Alternative Representations

Here's one if your users do selection.

You can now build alternative versions of the same feature, index them by UUID and have one version turn off and another turn on instantly.

Yeah, that one is probably most useful for selection, when you want immediate feedback.  All those features are still in memory and sorting by UUID is a bit costly, so use it wisely.

I can see more of this in the future, though.  So if it doesn't do what you want now.  Well.  Money.

## Feature masking & Text along lines

{% ImagePlace src="text-following-line-1.png", justify='left' %}

I'm going to write these up separately since they're cool, but you can now mask one feature against another.  It's tricky, so look to the Airways test case on iOS.

We've also added text following along a line or polygon.  Lots of fun and we'll explain it further in another post.

This is the first time we cracked open the layout engine in a while.  A whole lot we could do here for, you guessed it, money.

{% endImagePlace %}
