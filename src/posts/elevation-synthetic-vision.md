---
layout: post
title: "Elevation / Synthetic Vision"
date: 2020-05-20
thumb: "banner_web2.png"
tags: 
    - "whirlyglobe"

---



I’ve never been happy with elevation support in the toolkit. With the move to 3.0 and advances in mobile hardware, we can do much better.

But before I dive in, a bit about terminology. Aviation developers tend to refer to a simulated display of where a pilot is and where they're going as ***Synthetic Vision***. The rest of you might just think of it as elevation support in the toolkit. It's the same thing.



| [![img](https://1.bp.blogspot.com/-HO-r-7TdJbA/XsW8I6DXVvI/AAAAAAAAEc0/VXzB5jfmfiws3XrCg4xW8ciP3bbgk8TiACPcBGAYYCw/s1600/Ranier.jpg)](https://1.bp.blogspot.com/-HO-r-7TdJbA/XsW8I6DXVvI/AAAAAAAAEc0/VXzB5jfmfiws3XrCg4xW8ciP3bbgk8TiACPcBGAYYCw/s1600/Ranier.jpg) |                                                  |
| ------------------------------------------------------------ | ------------------------------------------------ |
|                                                              | Mt. Rainier from Mapbox Satellite with elevation |


I’m going to try to put together a small group of WhirlyGlobe-Maply users to sponsor a new development effort. Let’s look at what that would be.



### How Loading Used to Work

| [![img](https://1.bp.blogspot.com/-RZveHUcTmLY/XsW8ZAT1UoI/AAAAAAAAEc4/iMNStY-FLnoX-hIqAzxtmU7YxaeqI0rwQCLcBGAsYHQ/s1600/Level0.jpg)](https://1.bp.blogspot.com/-RZveHUcTmLY/XsW8ZAT1UoI/AAAAAAAAEc4/iMNStY-FLnoX-hIqAzxtmU7YxaeqI0rwQCLcBGAsYHQ/s1600/Level0.jpg) |
| ------------------------------------------------------------ |
| Level 0 loaded                                               |

Elevation loading was something of a hack in the toolkit. To understand why, we have to look at the way we loaded a tile’s worth of data:

>  Can we see enough of this tile to load it?
>
>  Request the imagery & wait for it to return
>
>  Request the elevation & wait for it to return
>
>  Build the geometry
>
>  Slap them all together

The biggest problem was loading time. The visuals would get super chunky as users waited for things to load. And it was all serial. Wait for imagery, then wait for elevation. Not great.



### How Loading Works Now


With the move to the Sampler/Loader architecture in 3.0 things got a lot better. The tile loading process now looks like this.
 Can we see enough of this tile to load it?
 Rebuild the geometry immediately.
 Slap whatever we currently have on the tile
 Request the image

[![img](https://1.bp.blogspot.com/-BT4NyVfOqsY/XsW9Xf0MrHI/AAAAAAAAEdQ/Y5hA10I46dsWDU29sZKvvL4os-NBpxcuACLcBGAsYHQ/s400/Screen%2BShot%2B2020-05-20%2Bat%2B4.28.07%2BPM.png)](https://1.bp.blogspot.com/-BT4NyVfOqsY/XsW9Xf0MrHI/AAAAAAAAEdQ/Y5hA10I46dsWDU29sZKvvL4os-NBpxcuACLcBGAsYHQ/s1600/Screen%2BShot%2B2020-05-20%2Bat%2B4.28.07%2BPM.png)

As new images come in, we update the connection between geometry and textures so things get sharper. Best of all, the user sees the geometry immediately. It never gets blocky. The figures above are level 0 for the Stamen Watercolor tiles (right) even though we’re at level 4 or so for the geometry (left).

| [![img](https://1.bp.blogspot.com/-G4W65GU7McM/XsW9pYmYGbI/AAAAAAAAEdY/YNzc9YkeB2wflIuJ3KYpKv1IT0Rljh0KgCLcBGAsYHQ/s1600/saildroneForecast.jpg)](https://1.bp.blogspot.com/-G4W65GU7McM/XsW9pYmYGbI/AAAAAAAAEdY/YNzc9YkeB2wflIuJ3KYpKv1IT0Rljh0KgCLcBGAsYHQ/s1600/saildroneForecast.jpg) |
| ------------------------------------------------------------ |
| Saildrone Forecast uses a hybrid vector map on a globe       |

We can also do cool stuff like load a whole stack of data sources and merge them together to produce an image and maybe some vector data and the system just manages it all. And it’s smart enough to request everything it needs at once, rather than feeling its way down from the top. It’s really nice.

Elevation could be a simple part of that, but I had something much bigger in mind.

### How Elevation Should Work

Now we’ve got a pool of imagery tiles controlled by what the system thinks is visible. It can be laggy, imagery can be missing, we can tolerate sources with varying levels. It’s much more flexible. This suggests a way forward for elevation.

But let’s detour briefly into how we draw stuff. This is what the geometry goes through.

| [![img](https://1.bp.blogspot.com/-i2KSb0O2EvQ/XsW-Zrri4MI/AAAAAAAAEdg/pddNdlh7wUMP-Li87XyugHaZzn7WxOq-ACLcBGAsYHQ/s400/shaderDiagram.jpg)](https://1.bp.blogspot.com/-i2KSb0O2EvQ/XsW-Zrri4MI/AAAAAAAAEdg/pddNdlh7wUMP-Li87XyugHaZzn7WxOq-ACLcBGAsYHQ/s1600/shaderDiagram.jpg) |
| ------------------------------------------------------------ |
| Super complex diagram of the render pipeline                 |

The geometry tiles point at the best imagery tiles (or sub-sections) for their use.  Imagery becomes textures in OpenGL (or Metal) and these are applied in the fragment shader stage. It’s all well greased for just this use case.

[![img](https://1.bp.blogspot.com/-YlHADKs13UE/XsW-nHxtUXI/AAAAAAAAEdk/nQRGkKV2oqEtp43mtkMjyIxWpstekaapQCLcBGAsYHQ/s400/Screen%2BShot%2B2020-05-20%2Bat%2B4.32.30%2BPM.png)](https://1.bp.blogspot.com/-YlHADKs13UE/XsW-nHxtUXI/AAAAAAAAEdk/nQRGkKV2oqEtp43mtkMjyIxWpstekaapQCLcBGAsYHQ/s1600/Screen%2BShot%2B2020-05-20%2Bat%2B4.32.30%2BPM.png)

On the left, you can see the tiles that are loaded, including level 0 and level 5(ish) for the given (white) viewing area. On the right, that’s what it looks like. *To capture this picture, you have to take a video of the system while you zoom out very quickly. It will catch up and delete the high res tiles very quickly.*

The idea here is that geometry tiles will point at the best imagery they can find currently loaded.

For elevation, we actually need to do the work before the fragment shader. Each piece of geometry needs to get its spatial location before it can move on to the next stage. We used to do this on the CPU, but now we could do it in a vertex shader, on the GPU.

It’s good to do things on the GPU. Mostly. In general. But specifically, in this case. If we pick up the elevation right at the beginning of rendering, we can do a lot of interesting stuff with it.

| [![img](https://1.bp.blogspot.com/-Peu6kZotKCg/XsW-8cQeFmI/AAAAAAAAEdw/Bvohn_I_LboFzm2mLxVgJjPOPdbcGBl-ACLcBGAsYHQ/s1600/loadingDiagram.jpg)](https://1.bp.blogspot.com/-Peu6kZotKCg/XsW-8cQeFmI/AAAAAAAAEdw/Bvohn_I_LboFzm2mLxVgJjPOPdbcGBl-ACLcBGAsYHQ/s1600/loadingDiagram.jpg) |
| ------------------------------------------------------------ |
| Geometry Tile Points to Elevation and Imagery Pools          |

Each geometry tile would point to the best elevation data available to it. That might be the *right* tile or it might be a subset of a lower resolution tile. Just like with imagery.

Now we’d have two pools of data, one for imagery and one for elevation. They’d be loaded independently and they could be different resolutions, loaded at different rates.

Having the elevation living in a separate pool of data opens up another possibility: *We can mess with it*.

### Elevation Overlays

One big problem with synthetic vision and elevation is airports. Runways are flat(ish), but the elevation data may not be, particularly at the resolutions available. What we need is a way to flatten the elevation.

| [![img](https://1.bp.blogspot.com/-xdbnMYi9EK0/XsW_5GGg7jI/AAAAAAAAEd8/BlpmMpy3aBUjS4aOncW-N9Klib8TSxisQCLcBGAsYHQ/s400/elevationRunway.jpg)](https://1.bp.blogspot.com/-xdbnMYi9EK0/XsW_5GGg7jI/AAAAAAAAEd8/BlpmMpy3aBUjS4aOncW-N9Klib8TSxisQCLcBGAsYHQ/s1600/elevationRunway.jpg) |
| ------------------------------------------------------------ |
| Elevation + Runway = Flattened Elevation                     |

I would propose adding an overlay at a high resolution. We render the airport outlines into that overlay with a bit of a buffer and ask the geometry vertex shader to do the heavy lifting. *And yes, runways slope, but I’m trying to keep the explanation simple.*

[![img](https://1.bp.blogspot.com/-ktMEPyDV-aY/XsXAIGHG1eI/AAAAAAAAEeA/wwz2rFc9v_MhoUco1xm1MVu0rmv734liACLcBGAsYHQ/s320/interpolate.jpg)](https://1.bp.blogspot.com/-ktMEPyDV-aY/XsXAIGHG1eI/AAAAAAAAEeA/wwz2rFc9v_MhoUco1xm1MVu0rmv734liACLcBGAsYHQ/s1600/interpolate.jpg)

The geometry vertex shader would read from the regular elevation and the overlay. No overlay, it just does the regular thing. With the overlay, it has a couple options. Within the runway itself, calculate a specific elevation. In the buffer zone, interpolate between the target elevation and the elevation database. That’ll be easy on the eyes.

As far as data representation goes, this is wonderfully simple. Elevation data is just a set of grids, loosely corresponding to the imagery. Airports (or runways) are simple polygons. All we need is a bit of spatial information in a simple database for lookup.

Best of all, it’s pretty easy to update. But there are some details.

### Point Model Placement

There are a number of objects you want to sit on the terrain. These are things like towers, poles, maybe even buildings.

| [![img](https://1.bp.blogspot.com/-9qzGoL6ICOk/XsXAZpMYx7I/AAAAAAAAEeM/kVCgzPTUom0bkEYXpFN7TNFlKMztsCPEwCLcBGAsYHQ/s400/objects.jpg)](https://1.bp.blogspot.com/-9qzGoL6ICOk/XsXAZpMYx7I/AAAAAAAAEeM/kVCgzPTUom0bkEYXpFN7TNFlKMztsCPEwCLcBGAsYHQ/s1600/objects.jpg) |
| ------------------------------------------------------------ |
| Objects sitting on top of terrain                            |

Those will also need to be tied to the elevation database and do their position lookups in a vertex shader. It’s the same process as geometry tiles for the visuals, but it’s a toolkit change and will require a bit of work.

### 3D Loading Details



| [![img](https://1.bp.blogspot.com/-uKUkDsDncmc/XsXAvVR-90I/AAAAAAAAEeU/hcPhHcVlsJk5O9Uefm0NvG4sL5Kar419QCLcBGAsYHQ/s320/stHelens.jpg)](https://1.bp.blogspot.com/-uKUkDsDncmc/XsXAvVR-90I/AAAAAAAAEeU/hcPhHcVlsJk5O9Uefm0NvG4sL5Kar419QCLcBGAsYHQ/s1600/stHelens.jpg) |
| ------------------------------------------------------------ |
| Tiles with St. Helens take up more screen space              |

Another problem is how we load 3D data tiles versus 2D.

In general, we don’t take the elevation into account when loading tiles. And because we don’t, you end up loading more than you should *just in case*.

Taking elevation into account requires a fair bit of feedback between the loading system and the data it’s loading. The short version is, we need the bottom and top of the tile, but we don’t have it until we’ve loaded it. Fixable, but a bit of work.

### Airport/Runway Generator

[![img](https://1.bp.blogspot.com/-7jqLi_BiwC4/XsXBFqy1D0I/AAAAAAAAEec/VLfsM72AAsUV_DyGH7h0q91OszUoVh8ggCLcBGAsYHQ/s320/runway.jpg)](https://1.bp.blogspot.com/-7jqLi_BiwC4/XsXBFqy1D0I/AAAAAAAAEec/VLfsM72AAsUV_DyGH7h0q91OszUoVh8ggCLcBGAsYHQ/s1600/runway.jpg)

The toolkit has a facility for generating geometry on the fly, but it doesn’t know anything about runways.

I’d propose building a rudimentary runway generator based on simple data. Markers, numbers, direction, that sort of thing. It’ll likely work well enough for most use cases and provide endless opportunities for developers to improve on.

### Elevation Database

I’d leave the actual airport databases up to the developers. But for the elevation, there’s no reason to reinvent the wheel.

I propose to build a new elevation database for CONUS and possibly Alaska. Worldwide would be a possibility, but I’m guessing it’s less useful.

I’d use standard data sources, available for free (USGS, mostly). Resolution would be determined by available data, but probably not better than 10m and possibly as low as 30m.

The resulting database would be MBTiles-like Sqlite and lower resolution versions could be easily harvested. It’s pretty easy simple a handful of SQL calls.

I’ve done this before, so I’ll also update the open source tools I used in the past and provide instructions for doing it again.

### Conclusion

With a good set of imagery this would look fantastic. Even without the imagery, it’ll be pretty useful. Since the data is fairly lightly processed, you’d be able to mix and match to your own requirements or what customers are willing to pay for. It’ll work paging over the network or with everything local to the device.

This is where I want to take elevation in WhirlyGlobe-Maply. What are **your** priorities and what requirements do **you** have? Drop me a line. And money. Money is always good.