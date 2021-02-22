--- 
layout: post
title: "Location Tracking for Android"
date: 2021-02-22
thumb: "index_vectortiles.jpg"
tags: android, whirlyglobe, maply

--- 

There are a few moving parts to this feature, but in concept it's pretty simple:  Display the user's location in real time using the available GPS and wireless hardware.

(picture)

#### iOS Version

{% ImagePlace src="location-follow-ios1.jpg", caption = 'Location following on Android', justify='left' %}

We've had this on iOS for a long time.  It works on both the globe and map in a real time or simulated mode.  We use in client projects and I know others use it for their own work.

{% endImagePlace %}

You can find a good example in the AutoTester.  Look for (fill this in) near the bottom.

Invoking it on iOS looks something like this:
(code)

#### Android Version

{% ImagePlace src="location-follow-ios1.jpg", caption = 'Location following on Android', justify='left' %}

Android does things a bit differently, but the functionality is much the same.  We'll show and update the user's location.  You can also feed it a simulated track.

{% endImagePlace %}

Again, you can find a good example in the AutoTester called (name).

Invoking it for Android looks like this:
(code)