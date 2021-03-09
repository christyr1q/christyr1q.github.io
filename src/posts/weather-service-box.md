--- 
layout: post
title: "Weather Service in a Box"
date: 2021-03-09
thumb: "index_weather-service-box.png"
tags: [weather]

---

Here's a proposal for an open source weather service. The back end pieces you need if you're going to make a decent weather app.

At mousebird consulting we've built some of these pieces multiple times and when we do that our next thought is: **Why isn't this open source?**

So here it is.  Our pitch for an open source Weather Service In A Box.  Now we just need someone to pay for it.

### The Pitch

There are plenty of good weather services out there providing forecast APIs and display capabilities.  Most are value added from a common set of data sources (National Weather Service for the US).

They all have similar drawbacks.
- Forecast calls cost money in a way that restricts interesting use cases.  
- Display capabilities are limited in annoying ways.  
- Access to the data is restricted and costly.

You’re paying a lot to get little more than you could do yourself… if you had the time & skill to set it all up.

### Goal

We aim to build a Weather Service In A Box you can run yourself.  It will
- pull from the same sources everyone else does.  
- provide a basic forecast API.  
- build data tiles you can display in your own apps (or web sites).  
- be open source, so you can tinker with it.

Best of all, it will be under your control!

### Capabilities

WSIAB will run on a small number of computing instances and expose two main interfaces to the world:
- Forecast API to provide future conditions at a given geographic location
- Data tiles for layers like cloud cover, temperature, pressure, precipitation, and so on

The Forecast API would initially provide the standard set of variables over time such as precipitation, wind, temperature, dew point, cloud coverage and *whatever you might need* over a multi-day period.  You’ll be able to query at a specific point in time or a time range.  It will tell you what sources were used to derive the results (for traceability).

Most services provide map overlays for temperature, precipitation and the usual suspects.  We’ll do data tiles.  Data tiles are similar to map tiles but consist of data in a more raw form.  They’re smaller, require less processing and can be used in more interesting ways.  They can always be turned into visual map tiles as needed.

We would aim to provide data tiles for all the usual variables and the publicly available composite radar map for continental US, Alaska, and Hawaii.

The list of possible capabilities is long.  What are your requirements?

### Why Trust Us?

Most modern forecast APIs are a collection of Amazon/Google/Azure instances running a variety of open source packages, special sauce the provider has developed, and glue (often Python).  Opaque to outsiders, but if you’ve built one you know how to do it again.

We've done the various pieces of this before, usually with a combination of Python and NodeJS.  We're all about data logistics, so we know when to pull in a meteorologist to design the calculations.

### Who's This For

If you make your own weather app and you're tired of paying for data, then it's you.  Or you've got a cool machine learning algorithm you'd like to run, but you lack the platform to serve, this would be prefect.

Whoever you are, if you want a simple weather service you can just fire up and run, this is for you.


