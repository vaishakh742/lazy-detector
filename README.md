<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />



# [lazy detector] 🎯


## Basic Details

### Team Members
- Team Lead: [vaishakh pillai] - [model engineering colleg, thrikkakara]
-
### Project Description
[its a lazy detector to keep sure that you avoid procrastinaing]

### The Problem (that doesn't exist)
[Standard productivity apps are straight-up dynamic fails because they rely on self-discipline and offer zero pressure. They give you soft reminders and free exits, making it way too easy to fold, get distracted, or doomscroll. The second a notification hits or the vibe drops, students abandon their study grind completely. Without an unhinged app forcing you to lock in, your focus gets cooked instantly.]

### The Solution (that nobody asked for)
["Lazy Detector" forces you to lock in by holding your screen hostage with AI surveillance and toxic UI:

Time Inflation Prank: Secretly jacks up your study goal up to 24 hours behind a taunting popup.

Aggressive AI Tracking: Uses MediaPipe Face Mesh to blast looping audio roast calls the second you look away or leave your desk.

Final Boss Exit Button: Shrinks and dodges your cursor 15 times before demanding ₹394 just to let you exit.]

##Website link
https://lazy-detector.vercel.app/

## Technical Details
### Technologies/Components Used
For Software:
- [css,javascript,html]
- [Vanilla Web Technologies,Google MediaPipe Face Mesh, MediaPipe Camera Utils]
- [Google MediaPipe Face Mesh, MediaPipe Camera Utils]
- [vs code,vecel,live server,git and github]

For Hardware:
- [none]

### Implementation
For Software:
# Installation
[none]

# Run
[none]

### Project Documentation
For Software:

# Screenshots (Add at least 3)
![Screenshot1]()
it igores the users input of study hours and choses its own

![Screenshot2](https://drive.google.com/file/d/1QHy2qhvoqnzjXwUXfApgkM6tzfwX7Rjp/view?usp=drive_link)
the face detection section where it checks whether the user is focused or not, if not focused audio plays to roast them

![Screenshot3](https://drive.google.com/file/d/1W_Ubt3aTr09iCmrmXhF5Me--YWg4Dsro/view?usp=drive_link)
when exit page is selected it asks whether to pay and exit or to free exit which both plays audios to make a funny gesture

# Diagrams
![Workflow]([ User Inputs Study Hours ]
              │
              ▼
    [ Click "Start Studying" ]
              │
              ▼
 [ Calculate Inflated Hours ] ──> (Adds 2–5 hours randomly, max 24h)
              │
              ▼
   [ Show Prank Popup Modal ]
              │
              ▼
    [ Click "OK... Fine" ]
              │
              ├────────────────────────────────────────┐
              ▼                                        ▼
   [ Start Countdown Timer ]             [ Init MediaPipe Face Mesh ]
              │                                        │
              │                                        ▼
              │                             [ AI Frame Analysis Loop ]
              │                                        │
              │                 ┌──────────────────────┼──────────────────────┐
              │                 ▼                      ▼                      ▼
              │         [ No Face Detected ]   [ Nose Ratio Out of Bounds ] [ Nose Ratio Balanced ]
              │                 │                      │                      │
              │                 ▼                      ▼                      ▼
              │          STATUS: Away!       STATUS: Looking Away!     STATUS: Focused!
              │                 │                      │                      │
              │                 ▼                      ▼                      ▼
              │        (Wait 1s Delay)        (Wait 1s Delay)        [ Stop Continuous Audio ]
              │                 │                      │                      │
              │                 ▼                      ▼                      │
              │        [ Play Loop Audio ]    [ Play Loop Audio ]             │
              │                 │                      │                      │
              │                 └──────────────────────┴──────────────────────┘
              │                                        │
              ▼                                        │
  [ Floating Quit Button Hover ] <─────────────────────┘
              │
              ├───────> (Attempts < 15): Dodge to Random Coordinates & Scale Down (1.5x ──> 0.4x)
              │
              └───────> (Attempts = 15): [ Click Quit Button ]
                                              │
                                              ▼
                                      [ Show Exit Modal ]
                                              │
                                              ▼
                                 [ Pay ₹394 ] OR [ Free Exit ]
                                              │
                                              ▼
                                      [ Page Reloads ])
*Lazy Detector runs on a three-stage workflow:

Setup & Prank Inflation: The user enters study hours, but the app randomly adds 2–5 hours (max 24h). A taunting prank modal (photo.png) displays the inflated time. Clicking "OK" launches the study session and timer.

AI Focus Tracking: Google MediaPipe Face Mesh processes the live webcam stream:

Away: If no face is detected, the badge turns red and a looping warning sound plays after 1 second.

Distracted: If the nose position ratio leeches left or right (<0.3 or >0.7), the badge turns orange and plays a looping look-away track after 1 second.

Focused: Looking back at the screen immediately stops the audio loop and turns the badge green.

Hostile Exit: Hovering over the floating "Quit" button triggers a dodging script. For 15 attempts, the button relocates to random screen coordinates while shrinking from 1.5x down to 0.4x. Once 15 escapes are reached, clicking it opens the exit modal to pay ₹394 or exit free.*

For Hardware:



### Project Demo
# Video
[https://drive.google.com/file/d/1DEhReBzn_SKQQd-jjLXVXLT9_xFGfXow/view?usp=drive_link]
*the video explains how the app wrks by using face detection to check whether the person is focused or not and it plays certain audio roasts to make them more focused and the quit button also moves around so as to make them stick to the app

## Team Contributions
- [vaishakh pillai]: [frontend deelopment]


---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)



