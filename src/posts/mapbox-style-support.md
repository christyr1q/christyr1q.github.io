---
layout: post
title: "Mapbox Style Support"
date: 2020-12-02
thumb: "banner_web2.png"
tags: 
    - "whirlyglobe"

---



Here's a short note on Mapbox Style Sheet support in 2.6.5: It's waaaay better.



| [![img](https://2.bp.blogspot.com/-R8YOoexzrTg/XeWVHj40snI/AAAAAAAAEXg/Mmoq_R367pQlWZnFhlJY-KfD-_l1kKWmgCK4BGAYYCw/s320/IMG_0113.jpeg)](http://2.bp.blogspot.com/-R8YOoexzrTg/XeWVHj40snI/AAAAAAAAEXg/Mmoq_R367pQlWZnFhlJY-KfD-_l1kKWmgCK4BGAYYCw/s1600/IMG_0113.jpeg) |
| ------------------------------------------------------------ |
| MapTiler Basic                                               |


I did some work for a client on MapTiler and Mapbox map sources. You get to benefit. Open source!



### MapTiler & Mapbox


We were focused on [Map Tiler](http://maptiler.com/) primarily, so those work best. You can find examples for their Basic, Hybrid Satellite, and Streets styles in the AutoTester app.



| [![img](https://4.bp.blogspot.com/-GRM2Nu93tvw/XeWVSJt0bsI/AAAAAAAAEXo/7eCpSbKL3ZoUnFMaHGrHsNCvFUZGTMmUgCK4BGAYYCw/s320/IMG_0114.jpeg)](http://4.bp.blogspot.com/-GRM2Nu93tvw/XeWVSJt0bsI/AAAAAAAAEXo/7eCpSbKL3ZoUnFMaHGrHsNCvFUZGTMmUgCK4BGAYYCw/s1600/IMG_0114.jpeg) |
| ------------------------------------------------------------ |
| MapTiler Streets                                             |


As for [Mapbox](http://mapbox.com/), we were trying out their Satellite offerings so you'll see examples for Satellite and Hybrid Satellite. Streets will probably kind of work, but it wasn't my priority.



| [![img](https://1.bp.blogspot.com/-tT5f2AwaNZg/XeWVYKSJ1VI/AAAAAAAAEX0/nF2ezxljTZw1C9X2tFBrw04QX6W4PlZPgCK4BGAYYCw/s320/IMG_0112.jpeg)](http://1.bp.blogspot.com/-tT5f2AwaNZg/XeWVYKSJ1VI/AAAAAAAAEX0/nF2ezxljTZw1C9X2tFBrw04QX6W4PlZPgCK4BGAYYCw/s1600/IMG_0112.jpeg) |
| ------------------------------------------------------------ |
| Mapbox Satellite Streets                                     |


You'll need to add in your own Map Tiler or Mapbox tokens. I'm not that much of a sucker.



### Mapbox Kinda Map


Mapbox-style maps lean more toward the web side of things: Load a lot of random junk before you're ready. That's always been hard on my users.

Look for a new Swift object called MapboxKindaMap in the AutoTester app. Just copy it into your app. For various reasons it's hard to add an actual Swift module to the old version (2.6) of the toolkit.

At its simplest, give the thing a URL for the style and it'll figure out the rest. Consult the MapTiler and Mapbox Test Cases for details.



### Caveats


It's working fine for my client, but their needs were pretty simple. If you want highway shields and fades per zoom level and that good stuff, it's not there. I'll be bugging my users for money to add all that and make it work on Android.... soonish.

MapTiler has pretty flexible usage, but Mapbox does not. So work it out with them before you ship anything.