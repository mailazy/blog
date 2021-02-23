---
title: "How to check Sender Reputation?"
date: "2021-02-23"
coverImage: "sender-reputation.png"
author: "Kartik Jhakal"
tags: ["Engineering", "SMTP", "Sender Reputation"]
description: "A brief introduction to sender reputation, how to check and affected factors"
---

## What is Email Sender Reputation?

An email sender reputation is a score that an Internet Service Provider (ISP) assigns to entity that sends email. It’s a crucial component of your  [email deliverability](https://www.sparkpost.com/deliverability-guides/). 

First thing First. You first need to make sure that your emails actually make it into your customers’ inboxes by ensuring you have a positive email sender reputation.

The higher reputation leads to possibility to deliver emails to the inboxes of recipients and if the score falls below a certain threshold, the ISP may send messages to recipients’ spam folders or even reject them. 

Research shows the average US worker receives  [121 emails a day](https://expandedramblings.com/index.php/email-statistics/). Even if it just takes 30 seconds to read an email, that’s still about an hour of your day. Internet service providers (ISP) want to reduce that and only show their users emails that are wanted. 

They’ll use an email sender reputation to determine which email should be placed in inbox and, which emails go into the junk folder, and which needs to be blocked. 
##### Nearly ~ 45% of all emails sent  [are considered spam](https://www.google.com/url?q=https://www.spamlaws.com/spam-stats.html&sa=D&ust=1554825754092000&usg=AFQjCNHs6N3BkkGIsv23Qidli67_LMtPmg)

#### There are several factors which can go in determining the score. below is the list:

-   The amount of email sent by any organization
-   The number of compliants ISP received from recipients for organization’s emails 
-  The number of times an organization's emails marked as spam
-   The rate of hitting the ISP’s spam trap by any organization’s emails 
-   The organization’s inclusion on different blacklists
-   Email bounce rate because organization sent emails to unknown users or for other reasons
-   The number of times recipients open, reply to, forward, and delete the organization’s messages, as well as click the links found in them
-  The number of times recipients unsubscribe from the organization’s email list
-  The content of your email.
-  Sender's IP reputation

Every ISP decides which factors to include and which not in its sender reputation andwhat weights those factors when calculating the reputation for each sender that sends email to its users. 

That's why a sender could have varying reputation scores for different ISPs. And most important, If a sender has multiple domain names and sends email from different IP addresses then each one will going to have its own sender reputation.

### How you can protect your sending reputation?

It’s really tough but must to follow best practices so you can keep your sending reputation score as high as possible. 

**Make your emails interesting and click-able:** 
How people interact with your emails has surely an impact on your sending reputation, so give them destinations to click to and offer reasons to open your emails and take action. This is most critical factor you should take care of. If you come across as spammy, you will definatly hurt your sending reputation even if you take care of everything else.

**Maintain the email list:** 
The is the basic and first step in order to build/protect you sending reputation and increase your delivery rate. Purge your list regularly of invalid emails and non-responders. They are definatly your targated audience. High bounce rates will affect your reputation so keeping your lists clean help you to achieve higher email delivery rates. 

##### If you wants to view and manage your bounce lists from the dashboard of the Mailazy, please let us know [here](https://www.mailazy.com/feature-request.html).

**Adopt an opt-in policy:** 
You must send a confirmation email when users subscribe to your list. This way you can ensure that the user’s email is valid and they in fact want to receive your email messages. And most important, never purchase an email list from a third party – you’re setting yourself up to trash your sending reputation if you use such a list.

**Monitor your email delivery:** 
Track your email delivery rates as well as your bounce rates and your response rates. With regular monitoring, you can catch potential failures before they happen.

**Implement  [an IP warm-up plan](link):** 
The last and very critical thing an ISP wants to see is a new sender bombarding their network with messages. The best way to establish a good sending reputation with an ISP is to methodically add campaign volume week-over-week.


### Email sending reputation best practices

-   [M3AAWG Sender Best Common Practices](https://www.m3aawg.org/sites/default/files/document/M3AAWG_Senders_BCP_Ver3-2015-02.pdf): A comprehensive look at best practices for sending email, from the Messaging, Malware and Mobile Anti-Abuse Working Group.

Sites where you can check your sending reputation:

-   [SenderScore.org](https://senderscore.org/)
-   [BarracudaCentral](http://www.barracudacentral.org/lookups)
-   [TrustedSource.org](http://www.trustedsource.org/)

### Get help with email sending reputation with Mailazy

You can write us at [Mailazy Support Center](https://www.mailazy.com/contact.html) 

-   [What Are Email Bounces?](link): An explanation of hard vs. soft bounces and how to handle them. You can find more information about bounces in the Support Center.
-   [IP Warm-Up Overview](link): Learn how to carefully build your sending reputation with various ISPs.
-   [Requirements For Sending Domains](link): We explain how to become a Responsible Sender through SparkPost, so your sending reputation remains strong.

> Written with [StackEdit](https://stackedit.io/).
