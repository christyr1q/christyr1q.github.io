---
title: Apps
layout: home
---

{% import 'macros/imgctl.njk' as imgctl with context %}

### Client Apps

At mousebird consulting, we've worked on a whole bunch of iOS and Android apps.  Sometimes we do just the geospatial interfaces, other times we write the whole app.  The best way to judge the quality of our work is to check out some of our favorites.

{{ imgctl.appInstance('icon_natsae.jpg', title = 'NATS Airspace Explorer',
url = "https://www.nats.aero/ae-home/",
content = "Airspace Explorer is a flight tracking and airspace education app developed by the National Air Traffic Control System of the UK.  It displays real time air traffic for the entire world, with a focus on the UK and Europe.  With a lot auxiliary information in addition the the real time it makes a great educational app." 
) }}

{{ imgctl.appInstance('icon_worldatlas.png', title = 'National Geographic World Atlas',
content = "What can you say about this one? It's National Geographic World Atlas. We did the globe for version 4.0. In addition to using our WhirlyGlobe-Maply toolkit, we did a lot of custom work to get that NatGeo look and feel." 
) }}

{{ imgctl.appInstance('icon_darksky.jpeg', title = 'Dark Sky',
content = "Dark Sky is a favorite weather app of its users. Not only will it tell when it's going to rain, it'll show you beautiful animated weather and temperature data. We did the interactive globe.
" 
) }}

{{ imgctl.appInstance('icon_flyqefb.png', title = 'FlyQ EFB',
content = "FlyQ EFB is one of the popular iOS aviation apps. It's used by private pilots for flight planning and visualization. They use WhirlyGlobe-Maply for the maps and we did much of the custom integration." 
) }}

{{ imgctl.appInstance('icon_fielda.png', title = 'Fielda Freedom',
content = "Manage your field activities with Fielda Freedom, a native iPhone and an iPad application. Fielda Freedom gives secure and instant access to all your assets and field activities. Create inspections and service orders on the go — with or without a steady Internet connection." 
) }}

{{ imgctl.appInstance('icon_saildrone.png', title = 'Saildrone Forecast',
content = "Saildrone Forecast is a gorgeous weather app we spent a significant amount of time developing and updating.  It implements a variety of complex weather graphics, such as particles for wind, mixing of data in disparate coordinate systems, and real itme contours for pressure." 
) }}
