---
layout: post
title: "s57 Format for Boats"
date: 2021-10-11
thumb: "index_whirlyglobe_3_2.png"
tags: ["s57", "vectors", "whirlyglobe"]

---

Anyone want s57 support?  Would you be willing to pay for it?

## What the Heck is s57 Anyway?

Let's borrow the description from [FileFormat](https://docs.fileformat.com/gis/000/).

```A file with .000 extension is a type of electronic navigational chart (ENC), standardized by International Hydrographic Organisation (IHO), that contains vector format data based on the S-57 object model. It contains navigational information such as sea depth, soundings, contours, and other information. All this data is available inside the file in a vector format and is totally independent of how it is displayed by S57 readers. S57 files can be opened using applications such as ESRI ArcGIS, OpenCPN, and APIs such as GDAL.```

Simple enough, right?  It's navigational data for ships.

## A History With s57 & GIS

I'm familiar with s57.  We consumed it for an old company I had in the early aughts.  It's not super difficult.

What's interesting now is it comes up occasionally, but developers keep failing at it.

I've had multiple users try to consume it and give up.  There's even a super janky toolkit you can buy that turns it into tiled images so you don't have to read it.  Hilarious.

## The Market is the Problem

The primary market for s57 is boaters.  Big shipping firms have their own tech stacks that don't heavily involve mobile.  The people who would use WhirlyGlobe-Maply are trying to write apps for boaters.

There are big players in the boating space who do a mediocre job of mobile and mediocre is usually enough.  The space isn't as technical or as competitive as aviation, so that situation hasn't changed much in years.

## So an s57 reader?

The main impediment to a direct s57 reader for WhirlyGlobe-Maply is that no one has paid us to do it.  If someone paid us, it would be pretty easy.

I'm thinking we'd hook it directly to a style sheet, so you could avoid even having to touch the vector data to style it.  That would also let us put it in the C++ layer, so it'd work on both platforms.

We do something similar with vector tiles these days and it works nicely.

## Everybody needs money. That's why they call it money.

If we made it, would you pay for it?  Figure somewhere in the $10-$20k range with a source licence.  Or just pay for the whole thing and we'll open source it.

Reach out if you're interested.
