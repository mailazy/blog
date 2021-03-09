---
title: "Sender Authentication Explained!"
date: "2021-03-09"
coverImage: "banner.png"
author: "Kunal Saini"
tags: ["Engineering", "SMTP", "Sender Authentication", "Short Read"]
description: "A brief overview to sender authentication!"
---

Sender authentication refers to the process of showing email providers that Mailazy has your permission to send emails on your behalf. To set up sender authentication, add CNAME DNS records to your hosting service or DNS provider. These DNS records associate your sending domain with Mailazy — when an inbox provider such as gmail processes your email, they would authenticate and chekc for your domain instead of mailazy.net, all the associated DKIM, SPF records will also be signed from your domain.