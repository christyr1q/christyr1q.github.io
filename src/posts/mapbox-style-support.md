---
layout: post
title: "Mapbox Style Support"
date: 2020-12-02
thumb: "index_mapbox-style-support.jpeg"
tags: "whirlyglobe"

---

Here's a short note on Mapbox Style Sheet support in 2.6.5: It's waaaay better.

I did some work for a client on MapTiler and Mapbox map sources. You get to benefit. Open source!



### MapTiler & Mapbox

We were focused on [Map Tiler](https://maptiler.com/) primarily, so those work best. You can find examples for their Basic, Hybrid Satellite, and Streets styles in the AutoTester app.

{% ImagePlace src="mapbox-style-support-2.jpeg", caption = 'MapTiler Streets', justify='center' %}
{% endImagePlace %}

As for [Mapbox](https://mapbox.com/), we were trying out their Satellite offerings so you'll see examples for Satellite and Hybrid Satellite. Streets will probably kind of work, but it wasn't my priority.

{% ImagePlace src="mapbox-style-support-3.jpeg", caption = 'Mapbox Satellite Streets', justify='center' %}

You'll need to add in your own Map Tiler or Mapbox tokens. I'm not that much of a sucker.

{% endImagePlace %}

### Mapbox Kinda Map

Mapbox-style maps lean more toward the web side of things: Load a lot of random junk before you're ready. That's always been hard on my users.

Look for a new Swift object called MapboxKindaMap in the AutoTester app. Just copy it into your app. For various reasons it's hard to add an actual Swift module to the old version (2.6) of the toolkit.

At its simplest, give the thing a URL for the style and it'll figure out the rest. Consult the MapTiler and Mapbox Test Cases for details.

### Caveats

It's working fine for my client, but their needs were pretty simple. If you want highway shields and fades per zoom level and that good stuff, it's not there. I'll be bugging my users for money to add all that and make it work on Android.... soonish.

MapTiler has pretty flexible usage, but Mapbox does not. So work it out with them before you ship anything.