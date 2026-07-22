TN ROADREADY — INSTALLATION

This package is a Progressive Web App (PWA). It must be placed on an HTTPS web host
before it can be installed on an iPhone or Android phone. GitHub Pages, Cloudflare
Pages, Netlify, and similar static hosts work.

QUICK DEPLOYMENT WITH GITHUB PAGES
1. Create a free GitHub account if needed.
2. Create a new public repository named tn-roadready.
3. Upload every file from this folder to the repository root.
4. Open Repository Settings > Pages.
5. Under Build and deployment, select "Deploy from a branch."
6. Select the main branch and root folder, then Save.
7. GitHub will provide an HTTPS address.

IPHONE INSTALL
1. Open the HTTPS address in Safari.
2. Tap Share.
3. Tap Add to Home Screen.
4. Open TN RoadReady once while online so the manual is cached.

ANDROID INSTALL
1. Open the HTTPS address in Chrome.
2. Tap Install App or Add to Home Screen.
3. Open it once while online so the manual is cached.

DATA AND PRIVACY
All student progress is stored locally on that phone. Use Export Backup periodically.
Progress does not automatically sync between devices.

UPDATES
Replace the hosted files with a new version. The service worker will download updates
the next time the device connects. If an update seems stuck, close and reopen the app.

VERSION 2 CONTENT
This release contains 158 applied-knowledge questions across 11 sections.

VERSION 3 FEATURES
- Guided lessons for all sections
- Daily study goals
- Permit-readiness score
- Achievement badges
- Improved dashboard
- Existing progress remains compatible

VERSION 3.1 FIX
- Corrects blank Lessons tab caused by an older cached data.js file.
- Core application files now check the network for updates before using the offline cache.
- Adds a visible lesson-update message instead of leaving the tab blank during a partial update.

VERSION 4
Expanded all 11 sections into full lessons with 44 teaching topics, examples, common mistakes, and embedded knowledge checks.

VERSION 4.1 REPAIR
This build uses cache-busted asset URLs. After uploading, the footer must display TN RoadReady v4.1.
If the footer does not show v4.1, GitHub Pages has not deployed the new index.html.

VERSION 4.2 BUNDLED REPAIR
All course data and application logic are contained in app.bundle.js. Upload every file in this folder and remove old app.js and data.js from GitHub.


VERSION 4.4 LESSON STATUS
- Lesson cards now show Not Started, In Progress, or Completed.
- Opening a lesson changes it to In Progress.
- Selecting Mark lesson complete or starting its section quiz changes it to Completed.
- Quiz mastery remains displayed separately from lesson completion.

VERSION 4.5 — PERMIT READINESS FIX
Permit readiness is now based equally on the 11 knowledge sections.
- Each section contributes 1/11 of the total readiness score.
- A section quiz score of 80% or higher earns full mastery for that section.
- A score below 80% earns proportional partial credit.
- One passed section is approximately 9% readiness.
- All 11 sections passed equals 100% readiness.

VERSION 4.6 — BALANCED ANSWER CHOICES
- Revised all 158 questions to reduce answer-length clues.
- Expanded short distractors into plausible alternatives.
- Distributed correct answers evenly across A, B, C, and D.
- Added randomized answer ordering for each quiz attempt when supported.
- Preserved the correct rule explanations and manual references.

VERSION 5.0 — PHASE A TESTING ENGINE
- Permit Practice Exam: 30 questions, 30-minute timer, no feedback until submission.
- Balanced exam coverage across all 11 knowledge sections.
- Adaptive Final Exam weighted toward weak, missed, or untested sections.
- Randomized answer order for every exam.
- Detailed section-by-section score report.
- Review of every incorrect answer with explanations and manual links.
- Exam history stored locally with each student profile.
- Exam results contribute to general accuracy but do not replace section-quiz mastery.
- Simulator passing score is set to 80% and is not represented as the official state examination.

VERSION 5.0 — PHASE B LOCAL ADAPTIVE LEARNING
- Tracks performance for each individual question.
- Tracks concept mastery across signs, right-of-way, school buses, railroads, weather, distraction, and other topics.
- Measures average response time without sending any information off the device.
- Identifies repeated trouble questions and weak concepts.
- Adds a 15-question Smart Review weighted toward slow, missed, weak, and untested material.
- Improves Adaptive Final Exam weighting using question-level and concept-level performance.
- Adds a Learning Confidence score based on accuracy, coverage, practice volume, and exam consistency.
- All adaptive data remains stored locally on the student's device.

VERSION 5.0 — PHASE C EXAM SIMULATOR EXPERIENCE
- Full-screen exam mode removes normal app navigation during testing.
- Practice Permit Exam allows backward navigation and answer changes.
- Adaptive Final Exam locks an answer after the student advances.
- Numbered exam navigator shows current and answered questions.
- Unanswered-question warning before advancing or submitting.
- Dedicated final review screen with answer count and time remaining.
- Final submission confirmation.
- Automatic submission when the 30-minute timer expires.
- No manual links, explanations, or correctness feedback during testing.
- Normal navigation returns after exam submission or exit.

VERSION 5.1 — LEARNING COACH
- Personalized daily three-step study plan.
- Recommends lessons, unfinished section quizzes, Smart Review, and practice exams.
- One-tap Start Next Activity button.
- Daily study streak tracking.
- Seven-day study summary with time, active days, test count, and average score.
- Course milestone tracker for lessons, section quizzes, practice exams, questions answered, and readiness.
- Adaptive Final Exam unlock requirements:
  * 11 lessons completed
  * 11 section quizzes passed
  * 3 Permit Practice Exams completed
  * 200 questions answered
  * 85% permit readiness
- Local milestone celebrations.
- No Parent Mode, no cloud account, and no outside data storage.
