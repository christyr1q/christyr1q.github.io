--- 
layout: post
title: "Location Tracking for Android"
date: 2021-02-22
thumb: "index_location-tracking-android.png"
tags: [android, whirlyglobe, maply]

--- 

We can now display the user's location in real time using the available GPS and wireless hardware on Android.

Of course, you could have always just done this yourself, and many did, but now we do it for you.

As always, a big thanks to Stamen's Watercolor style.  Jazzes up any demo.

#### But First A Message From Our Sponsor

Or a bit of housekeeping anyway.

This is the new blog, obviously.  The formatting is a bit janky, and maybe the font's too big.  We're experimenting.

One of the big goals was to get smaller posts out more quickly.  On the technical side, I think we're there.  This setup is fast to use and logical to debug.

On the content side, I'm just going to be sloppier, frankly.  We've got a ton of new features that need to be mentioned and not a lot of budget to do it.  So here we go. 

#### Location Tracking: iOS Version

{% ImagePlace src="location-follow-ios1.png", caption = 'Location following on iOS', justify='left' %}

We've had this on iOS for a long time.  It works on both the globe and map in a real time or simulated mode.  

The basics are pretty simple.  We display a location marker that sorta kinda approximates what you see on Apple Maps or Google Maps.  

You've got the little animated circle, a bigger one representing accuracy and a tiny direction triangle showing where you're going.

You can also select how the viewer's location tracks, including North Up and Heading Up options.

{% endImagePlace %}

It's worked fine for years.  You can find good examples in the AutoTester under **Location Tracking Simulated Test Case** and **Location Tracking Real Test Case**.

Invoking it on iOS looks something like this.
``` swift
baseVC.startLocationTracking(with: self, useHeading: true, useCourse: true)
```

You need to fill in the **MaplyLocationTrackerDelegate** which passes on the LocationManager authorization stuff.

#### Location Tracking: Android Version

{% ImagePlace src="location-follow-android1.jpg", caption = 'Location following on Android', justify='left' %}

Android does things a bit differently, but the functionality is much the same.  We'll show and update the user's location.  You can do the Heading Up vs North Up thing and you can also feed it a simulated track.

Much like the iOS there's a delegate (*I know it's not called that on Android*) handling the permissions checking and response from the user.

And since Android doesn't do the wacky Retina sizing thing, you may want to change the markerSize yourself.

{% endImagePlace %}

Invoking it for Android looks like so.
``` kotlin
baseViewC?.let { vc ->
    tracker = LocationTracker(vc, this, useHeading = true).apply {
        lockType = MaplyLocationLockType.MaplyLocationLockNorthUp
        markerSize = 48
        start(context)
    }
}
```

Again, you can find a good example in the Android AutoTester.
