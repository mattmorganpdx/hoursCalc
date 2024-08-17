# Monthly Remaining Hours Calc
https://mattmorganpdx.github.io/hoursCalc/

## Purpose

The purpose of this app is to help users calculate and track their remaining work hours for the month. It allows users
to set a target number of hours and input their worked hours weekly, providing a clear overview of the remaining time.

## Features

- Set a target number of hours for the month.
- Input weekly worked hours and minutes.
- Automatically calculate and display the remaining hours and minutes.
- Save and load data from local storage to maintain state across sessions.
- Edit the target hours with a simple click.

## Development

This app was created using the PyCharm HTML boilerplate template and programmed by GitHub Copilot.

### The part I'm actually writing.

I really enjoy doing simple html/css/javascript projects like this with copilot. In this app I never hand edited the
code. I would completely replace index.html, js/app.js and css/style.css with copilots code after each prompt. The only
thing it failed me on was the prompt section of this readme. It couldn't access all the prompts to figure out how to
make the list. I ended up just adding the half dozen bullets it missed and then just asking it to take another copy
editing pass.

### Prompts Given

- I want to make a web page that helps calculate how much time I have left to work each month. I can only clock 120
  hours so I want a field for hours and minutes that subtract from 120 and gives the answer in hours and minutes
  remaining. I need to be able to do more than one subtraction i.e. 25h 31m and then 33h 13m.
- Okay, can it be aware of the current month and have a row to enter time for each week of the month? Maybe show the
  date range like Aug 4 - 10. Weeks start Sunday and end Saturday.
- Okay, you're doing great. If a month begins mid-week or ends mid-week, we just want to accurately show the partial
  week dates. An example is this month, August 2024, the month starts on a Wednesday so the day range is only 1-3.
- Using CSS I'm assuming, let's have the hours and minutes fields be the right length for 2 chars each and all the
  fields are aligned. Also, the total hours field should be 5 characters wide.
- We need to make none of the fields required. Number enforcement is okay but empty just means zero.
- Okay. I don't think we need the calculate button. Just do the calculation on field change.
- Can we have the h1 be "Work Hours Calculator for " and the current month?
- Can we use local storage to save the field values?
- Okay, if the value is an inferred zero, don't save it. The form looks better with empty fields.
- Let's actually have the pencil icon in front of the 120 and leave off the 'h'. In edit mode, it should only be 3
  characters wide. Also, put "Target Hours: " in front.
- Okay, we need some spacing between the total hours and the week entry so they aren't right on top of each other. Also,
  now in edit mode the field is 1 character wide but let's make it 3 and don't allow more than a 3-digit number to be
  entered.
- What part of this code controls the width of the target hours field?
- So the problem was that it needs to actually be 5ch because the increment decrement icon was taking up 2 character
  spots.
- Okay. You've done a great job. Let's write the README for this app. It's called "Monthly Remaining Hours Calc". I'd
  like you to have sections for:
  1. Explain the purpose of this app.
  2. List the features.
  3. State that this was made from the PyCharm HTML boilerplate template and programmed by you. Have a bullet-pointed
     list of the prompts I gave you but correct my spelling and grammatical errors. Include this prompt where I ask you
     to write the README. You can leave out any that didn't further the features of the app.
