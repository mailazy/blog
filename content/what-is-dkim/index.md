---
title: "What is DKIM?"
date: "2021-03-09"
coverImage: "banner.png"
author: "Kartik Jhakal"
tags: ["DKIM", "Engineering", "Short Read", "Email Security"]
description: "A brief explanation to DKIM!"
---

DKIM stands for DomainKeys Identified Mail, is an email security standard that make sure messages aren’t altered in transit between the sending and recipient servers. 

DKIM was designed to help email providers prevent malicious email senders by validating email from specific domains. 
DKIM is compatible with existing email infrastructure and works with SPF and [DMARC](https://dmarcdigests.com/) to create multiple layers of security for domains sending emails. Like [SPF](), DKIM is an open standard for email authentication that is used for [DMARC]() alignment.

DKIM is one of the most popular email authentication methodologies. It works by using cryptographic technique that adds a digital signature to your message header. This DKIM signature validates and authorizes your domain name. The DKIM signature is created using a unique string of characters stored as a public key.

When your email is received, the public key is retrieved through the DNS and decrypted by the receiver to allow them to confidently verify the identity of your domain. 

While DKIM isn't required or mandatory but having emails that are signed with DKIM appear more legitimate to your recipients and are less likely to go to Junk or Spam folders. Spoofing email from trusted domains is a popular technique for malicious spam and phishing campaigns, and DKIM makes it harder to spoof email from domains that use it. 
At Mailazy, we use it to sign messages, and ISPs like Yahoo, AOL, and Gmail use it to check incoming messages.