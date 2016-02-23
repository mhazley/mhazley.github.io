--- 
layout: page
title: GithubNotifier.app
date: 2010-06-04 08:10:39 -05:00
permalink: github-notifier.html
category: page
---
[GithubNotifier][1] is a little menu-bar app that uses your Github username and API token to check your repositories for any activity in your networks.  

I leveraged [CocoaREST][2] from [Steven Degutis][3] and added support for Github's API as I went.  You can check those addtions on [my fork here][4].

There are some caveats though.  For starters, the network data API from Github doesn't show what branch a given commit was made to, so if I pushed an update to branch `development`, the API simply details the commit, but doesn't include which branch.  When the Growl notifications are made, a click-back is created so that if a user clicks on the message your default browser will open to `user/repo/commits`, but if the commit was on a separate branch, you wont see it initially.  You may have to look around in the branches to see more details on it.  

I have  a support request in to Github to include branch and owner information in the commit data returned in the network API call, but they may or may not choose to implement it.  

You can checkout or fork the project [here][1], patches are welcome.  

[1]: http://github.com/catsby/GithubNotifier
[2]: http://github.com/sdegutis/CocoaREST
[3]: http://degutis.org/
[4]: http://github.com/catsby/CocoaREST 
