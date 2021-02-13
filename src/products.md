---
title: Products
layout: home
---

{% import 'macros/imgctl.njk' as imgctl with context %}

## Products

{% set paragraph %}

### WhirlyGlobe-Maply Toolkit

WhirlyGlobe-Maply is a geospatial display SDK for iPhone, iPad, and Android devices.  We're proud to offer this amazing globe and map toolkit as open source.

You'll find WhirlyGlobe-Maply in a wide variety of apps, from weather to map to civil aviation. It's big and functional, but friendly, with a nice selection of [tutorials]("http://mousebird.github.io/WhirlyGlobe/tutorial/getting_started.html) and a comfortable native API on each platform.

{% endset %}

{{ imgctl.leftImage('aa_crop.jpg', 
    url="http://mousebird.github.io/WhirlyGlobe", 
    alt= "WhirlyGlobe-Maply Toolkit",  
    content = paragraph ) }}


{% set paragraph %}

### WhirlyGlobe-Maply Support

WhirlyGlobe-Maply is open source, but we do offer a support contract.  It's a simpler deal than paying us by the hour and the contract is 50% less likely to annoy your lawyer.

We offer both iOS and Android support contracts.  You get quick response to your questions, bug fixes and work arounds and input on the feature roadmap.  [Contact us](mailto:contact@mousebirdconsulting.com) for details.

{% endset %}

{{ imgctl.leftImage('globesupport.png', 
    url="mailto:contact@mousebirdconsulting.com", 
    alt= "WhirlyGlobe-Maply Support", 
    content = paragraph ) }}
