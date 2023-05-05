---
tags: Interest
date: 03-05-2023
type: Blog
summary: I wrote about how I created my first GitHub Page website.
---
## "Your Subscription is due in 3 months time."

I will be honest, the main motivation behind creating a portfolio website was because of the cost of domains, subscriptions and the general costs of maintaining a website. Hence, I looked for alternative ways to display my thoughts and projects *for free*.

## Disclaimer:
The content below this update section is the long method to create a website from scratch. It is purely for my own learning and experience. I still documented it if you want to check out what I did :)

The **faster and easier way** to create a Git-Hub page is to look for the theme you would like, fork it and then customize accordingly! 


#### Jekyll and Git-hub
I was first exposed to Jekyll for one of the courses (50.002 Computational Structures) I took during my fourth term in Singapore University of Technology and Design (SUTD). In particular, the course used "Just the Docs" theme by Jekyll and it looked really clean! 

You can find the link of the course's site [here](https://natalieagus.git-hub.io/50002/). 

Needless to say, I was pretty inspired (and motivated by the fact that it can be **free**) to create my own website.

#### Prerequisites 
1. A Git-Hub account. lol.
2. Some time to figure things out.

#### Installation
Disclaimer: The links may become outdated as time passes. Do find the relevant links for yourself if need be :)

There are a couple of things to set up and install before the website can be deployed. I won't be listing down everything I did but I will provide references here to save everyone the trouble of looking for them.

Git-hub pages are a great way to create a website directly from my own repository. The building of the website can then be done with Ruby and Jekyll. The quick start link can be found [here](https://docs.git-hub.com/en/pages/quickstart).

Following the creation of the Git-hub page, I installed both [Ruby](https://rubyinstaller.org/downloads/) and [Jekyll](https://jekyllrb.com/docs/installation/). 

Just follow this helpful guide [here](https://docs.git-hub.com/en/pages/setting-up-a-git-hub-pages-site-with-jekyll/creating-a-git-hub-pages-site-with-jekyll).

#### Testing Git-hub page locally.

After everything has been installed, typing the website below to your web browser should display a default screen. **Replace the username with your own git-hub's username.**
```
username.git-hub.io
```

Default page:
![[Pasted image 20230501130710.png]]

Don't freak out if the web page is not "unavailable", it may take some time for the page to get running! :)

#### Creating website with Jekyll
If I want to use Jekyll for our website, I realized I would have to edit the repository. I followed this [Youtube](https://www.youtube.com/watch?v=pxua_1vyFck&list=PLLAZ4kZ9dFpOPV5C5Ay0pHaa0RJFhcmcB&index=5) tutorial.

I typed the following into the cmd prompt. Replace the "WEBSITENAME" with the name of your own website.
```bash
jekyll new WEBSITENAME
```

It should install into a folder on your machine. 

#### Viewing/Starting website with Jekyll

Navigate to your website using the cd command on cmd prompt.

First time viewing the website:
```bash
bundle exec jekyll serve
```

Subsequent runs:
```bash
jekyll serve
```

Following the last 4 digits for my local server address, I typed the following into my web browser.
```
localhost:XXXX 
```

I got a pretty nice looking, default screen! 
![[Pasted image 20230501131731.png]]

This is still local though! What if I want it to be displayed on my git-hub page?

#### Hosting Jekyll website on Git-hub pages.

This part integrates the Jekyll website that I just created and the Git-hub page created previously.

In the file \_config.yml, change the baseurl to your git-hub page address.

```yml
baseurl: "REPONAME""
```

Please just follow the amazing [tutorial](https://www.youtube.com/watch?v=fqFjuX4VZmU&list=PLLAZ4kZ9dFpOPV5C5Ay0pHaa0RJFhcmcB&index=20) by Giraffe Academy.


There was a slight bug which I encountered where my git-hub page was not loading correctly. **Make sure to name everything consistently - including the repository's name.**
![[Pasted image 20230501140634.png]]

That's it! It was really simple, it took about an hour ++ to get everything set-up and running to this point. In my next adventure, I will look to customize this website and possibly add some project pages too!