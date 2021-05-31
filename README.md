# Not Blue 

![Collaborators](https://img.shields.io/badge/collaborators-4-red)<br>
![Status](https://img.shields.io/badge/status-completed-yellow)<br>
![Issues](https://img.shields.io/badge/issues-0-blue)<br>
[![made-with-Markdown](https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg)](http://commonmark.org)<br>
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)<br>

## Problem Statement :technologist:
Our project aims to monitor a user's search patterns and use this information to inform their close/loved ones about potential mental health problems the user might be facing. A recent study showed that most people who are mentally depressed in some form have used the internet in a manner that has worsened their illness. So our goal with this approach is to help in the monitoring of ‘at-risk’ individuals and prevent them from becoming their own worst enemy. 

## About Our Solution 🔧

### What
This is a chrome extension that monitors search activity of a user to check for signs of depression. The extension uses NLP and Sentimental Analysis techniques for the same. 
### Why
The motivation behind this project is highly personal. We all have a friend who went through a dark time in some periods of their lives. Some were able to overcome this, while some were not so fortunate. One thing that we all can agree on is that there are not many apps that help or support people in such cases. Our extension is aimed to help not only the fighters but also their supporters who want to help more. We know someone who went through such a phase, and something that was missing was a medium to alert close ones when to intervene, as you can never expect someone to know everything you are going through.

### How
The extension is built using javascript and closely interacts with Chrome extensions API. This makes it possible to run on any chromium based browser such as opera, edge, etc. The extension gets the search query and sends it as a JSON structure to our API endpoint /predict. The ML model takes the string as an input and returns a score (from 0-1 ). The higher the score is, the more likely the person is to be depressed. We then take the average of multiple scores, and if it crosses a particular threshold, an email will be sent to the close ones of the user.

## Proposed Technology Stack 💻

- TensorFlow
- Flask
- Azure
- REST API
- Nginx
- Chrome extensions API

## Tools and APIs🎯

- HTML5
- CSS3
- JavaScript
- smptlib
- uwsgi

## Team ---AI---:
- <a href="https://github.com/SkaarFacee">Aditya Anil</a>
- <a href="https://github.com/Anuttan">Anjith Prakash</a>
- <a href="https://github.com/codevardhan">Harshavardhan M</a>
- <a href="https://github.com/sreeragkvivek">Sreerag K Vivek</a>

