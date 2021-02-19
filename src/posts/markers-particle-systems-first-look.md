---
layout: post
title: "Markers and Particle Systems - First Look"
date: 2011-10-27
thumb: "Screen shot 2011-10-26 at 8.13.57 PM.png"
tags: 
    - "mousebird consulting" 
    - "whirlyglobe"
    - "features"
    - "particle systems"

---

So that's working.  It can also display a series of images, you just give it a list of textures and a period over which to switch them and off it goes.

And it's smoooth.  Why so smooth?  Because I do the switching on the rendering thread.  And that makes it complex.  For me, anyway, not you.

## Marker Code

Here's the example code.

``` objc
// Utility routine to add a texture to the scene
- (SimpleIdentity)makeTexture:(NSString *)name
{
    UIImage *image = [UIImage imageNamed:name];
    if (!image)
        return EmptyIdentity;
    Texture *theTexture = new Texture(image);
    scene->addChangeRequest(new AddTextureReq(theTexture));

    return theTexture->getId();
}

// Add a Marker over Paris
- (void)addMarkers
{
    // Description of the marker
    NSDictionary *markerDesc =
    [NSDictionary dictionaryWithObjectsAndKeys:
    [UIColor whiteColor],@"color",
    nil];
    
    // Set up a texture for the marker
    SimpleIdentity parisArmsTexId = [self makeTexture:@"200px-Grandes_Armes_de_Paris"];
    SimpleIdentity parisFlagTexID = [self makeTexture:@"200px-Flag_of_Paris"];
    SimpleIdentity frenchArmsTexID = [self makeTexture:@"175px-Armoiries_republique_francaise"];
    SimpleIdentity frenchFlagTexID = [self makeTexture:@"320px-Flag_of_France"];

    // Set up the marker
    WGMarker *parisMarker = [[[WGMarker alloc] init] autorelease];
    
    // Stick it right on top of Paris
    GeoCoord paris = GeoCoord::CoordFromDegrees(2.350833, 48.856667);
    [parisMarker setLoc:paris];

    // We're going to give it four different textures that rotate over a period of 10s
    [parisMarker addTexID:parisArmsTexId];
    [parisMarker addTexID:parisFlagTexID];
    [parisMarker addTexID:frenchArmsTexID];
    [parisMarker addTexID:frenchFlagTexID];
    parisMarker.period = 10.0;

    // These values are relative to the globe, which has a radius of 1.0
    parisMarker.width = 0.01;    parisMarker.height = 0.01;
    
    // And add the marker
    [self.markerLayer addMarker:parisMarker desc:markerDesc];
}
```

That's totally self explanatory.  Definitely.

The only thing I don't like about this is how the textures work.  That's one texture per image, which means one Drawable per state and that kinda sucks.  I may need to expand the TextureAtlas support a bit to help out with this case.

But this is pretty much how it'll work for the WhirlyGlobe 1.2 release.

## Particle Systems

{% ImagePlace src="fountains.png", caption = 'A couple of fountains', justify='left' %}

These are never going to be full desktop graphics particle systems or non-real time animation particle systems.  They'll be pretty simple.

{% endImagePlace %}


## Particle System Code

Here's what the code looks like.

<!-- Markdown Template -->
``` objc
// Add a particle system
- (void)addParticleSystems
{
    NSDictionary *partDesc =
    [NSDictionary dictionaryWithObjectsAndKeys:
    [NSNumber numberWithFloat:0.02],@"minLength",
    [NSNumber numberWithFloat:0.03],@"maxLength",
    [NSNumber numberWithInt:500],@"minNumPerSec",
    [NSNumber numberWithInt:600],@"maxNumPerSec",
    [NSNumber numberWithFloat:1.0],@"minLifetime",
    [NSNumber numberWithFloat:5.0],@"maxLifetime",
    nil];
    
    // Add a single particle system
    ParticleSystem *particleSystem = [[[ParticleSystem alloc] init] autorelease];
    GeoCoord washDc = GeoCoord::CoordFromDegrees(-77.036667,38.895111);
    [particleSystem setLoc:washDc];
    [particleSystem setNorm:PointFromGeo(washDc)];
    
    [self.particleSystemLayer addParticleSystem:particleSystem desc:partDesc];
}
```

Okay, I'm skipping a step, like where I create the particle system layer.  Trust me, you'll just copy my example for that anyway.  It's easy.  This is the interesting bit.

Again, pretty standard stuff.  You give it some parameters to control its size, some functions of the particles, a location, and you're off.  I'll add a few more parameters to control the distribution and color and maybe another type or two if I'm feeling saucy.  Otherwise, that's about how it'll look for 1.2.
