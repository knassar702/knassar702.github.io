---
layout: post
title: "stealing some Memes with python"
date: 2021-6-1
comments: true
---

Hello :D

I love the memes and I want to keep them in my phone, I think the solution is to browse through the meme and download it manually?

nope let's steal/download some memes automatic with python
what the website we will steal memes from it 🎯 ?


our target is https://imgflip.com/
 
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nlbums4zjgmawh5veg25.png)


first let's look at html page 
```html
<div class="name">
BLA BLAB 
BLAB LBA
BL BLA

<img src="MEME URL">
```
all memes links in `<div class="base-img-wrap">.......</div>`


![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g6fkr00e3fkdt1y54e9u.png)


here we need to parse div tag with `base-img-wrap` class name and get `<img>` tag in this div

```html
<div class='base-img-wrap'>
BLA BLA LBA
<img src="MEME LINK">
</div>
```

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x4qvvqpg7ntgc1ot67wh.jpg)



### Modules we need
* requests (for http/s requests)
* bs4 (html parsing)

let's start our work with send http request to this site and parsing `base-img-wrap` class

```python
import requests
from bs4 import BeautifulSoup

req = requests.get('https://imgflip.com/?page=1').content
soup = BeautifulSoup(req, "html.parser")
ancher = soup.find_all('div', {'class': "base-unit clearfix"})

"""
<div class="base-unit clearfix"><h2 class="base-unit-title"><a href="/i/5aq7jq">Why is my sister's name Rose</a></h2><div class="base-img-wrap-wrap"><div class="base-img-wrap" style="width:440px"><a class="base-img-link" href="/i/5aq7jq" style="padding-bottom:105.90909090909%"> ......
"""
```
We have fetched all the data of `<div class='base-img-wrap'>`

let's get img tag
```python
import requests
from bs4 import BeautifulSoup

r = requests.get('https://imgflip.com/?page=1').content
soup = BeautifulSoup(req, "html.parser")
ancher = soup.find_all('div', {'class': "base-unit clearfix"})

for pt in ancher:
    img = pt.find('img', {'class': 'base-img'})
    if img:
        print(img)
```

```html
 <img alt="Why is my sister's name Rose |  people that upvote good memes instead of just scrolling past them | image tagged in why is my sister's name rose | made w/ Imgflip meme maker" class="base-img" src="//i.imgflip.com/5aq7jq.jpg"/>
<img alt="Petition: upvote if you want a rule against upvote begging. I will then post the results in the Imgflip suggestion stream |  Upvote begging will keep happening as long as they make it to the front page; UPVOTE BEGGING TO DESTROY UPVOTE BEGGING | image tagged in memes,the scroll of truth,no no hes got a point,you have become the very thing you swore to destroy,memes | made w/ Imgflip meme maker" class="base-img" src="//i.imgflip.com/5aqvx4.jpg"/>
```
cool , know we have all img tag know we need get src value

```python
import requests
from bs4 import BeautifulSoup

r = requests.get('https://imgflip.com/?page=1').content
soup = BeautifulSoup(req, "html.parser")
ancher = soup.find_all('div', {'class': "base-unit clearfix"})

for pt in ancher:
    img = pt.find('img', {'class': 'base-img'})
    if img:
        link = img['src'].replace(img['src'][0:2],'https://')
        print(link)

"""
https://i.imgflip.com/5aq7jq.jpg
https://i.imgflip.com/5aqvx4.jpg
https://i.imgflip.com/5aq5jg.jpg
https://i.imgflip.com/5aor2n.jpg
https://i.imgflip.com/5amt83.jpg
https://i.imgflip.com/5ayodd.jpg
https://i.imgflip.com/5awhgz.jpg
https://i.imgflip.com/5allij.jpg
https://i.imgflip.com/5aosh7.jpg
https://i.imgflip.com/5amxbo.jpg
https://i.imgflip.com/5auvpo.jpg
"""
```

after get all images we will download it with requests module and save it

```python
import requests
from bs4 import BeautifulSoup

req = requests.get('https://imgflip.com/?page=1').content
soup = BeautifulSoup(req, "html.parser")
ancher = soup.find_all('div', {'class': "base-unit clearfix"})

for pt in ancher:
    img = pt.find('img', {'class': 'base-img'})
    if img:
        link = img['src'].replace(img['src'][0:2],'https://')
        r = requests.get(link)
        f = open(img['src'].split('/')[3],'wb') # write binary
        f.write(r.content)
        f.close()
```


![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3lktvcqrkfayl5abi354.png)


great , we get all the memes of page number `1` let's add parameter for `page` in url


```python
import requests
from bs4 import BeautifulSoup
def meme_stealer(page):
    req = requests.get(f'https://imgflip.com/?page={page}').content
    soup = BeautifulSoup(req, "html.parser")
    ancher = soup.find_all('div', {'class': "base-unit clearfix"})
    for pt in ancher:
        img = pt.find('img', {'class': 'base-img'})
        if img:
            link = img['src'].replace(img['src'][0:2],'https://')
            r = requests.get(link)
            f = open(img['src'].split('/')[3],'wb')
            f.write(r.content)
            f.close()

for i in range(1,6):
    meme_stealer(i)
# Page 1
# Page 2
# Page 3
# Page 4
# Page 5
```


Thanks for reading this
Bye :D
