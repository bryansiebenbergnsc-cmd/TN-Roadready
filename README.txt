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

VERSION 6.0 — SIGNS, SIGNALS & PAVEMENT MARKINGS FULL EXPERIENCE
- Expanded the section to 12 detailed instructional topics.
- Added examples, common mistakes, and embedded knowledge checks.
- Added 50 new questions with topic, type, difficulty, objective, and tag metadata.
- Added recall, understanding, applied, and advanced judgment questions.
- Added a dedicated 25-question Signs Mastery Exam with a controlled difficulty mix.
- Added manual references covering printed pages 35–44.
- Current total app question count: 208.

VERSION 6.1 — INTERSECTIONS FULL EXPERIENCE
- 10 expanded teaching topics
- 32 new questions
- Dedicated 25-question mastery exam
- Total questions: 240

VERSION 6.2 — SPEED, SPACE & STOPPING
- 10 expanded teaching topics
- 32 new questions
- Dedicated 25-question mastery exam
- Total questions: 272

VERSION 6.3 — SIGNS VISUAL RECOGNITION
- Added a dedicated Sign Challenge tab.
- Added a 20-sign visual library built with offline CSS shapes.
- Added browse, quick 10, and timed 20 challenge modes.
- Added sign meaning plus safest driver-response testing.
- Sign challenge scores are stored in student test history.
- All visuals work offline with no external image files.

VERSION 6.4 — NIGHT & WEATHER DRIVING
- Expanded Night & Weather Driving to 12 detailed teaching topics.
- Added 36 new metadata-rich questions.
- Added recall, understanding, applied, and judgment difficulty levels.
- Added a dedicated 25-question Night & Weather Mastery Exam.
- Covers darkness, headlights, glare, wildlife, rain, hydroplaning, fog, snow, ice, skids, flooding, wind, fatigue, and nighttime emergencies.
- Current total app question count: 308.

VERSION 6.5 — SHARING THE ROAD
- Expanded Defensive Driving & Sharing to 12 detailed teaching topics.
- Added 39 new metadata-rich questions.
- Added recall, understanding, applied, and judgment difficulty levels.
- Added a dedicated 25-question Sharing the Road Mastery Exam.
- Covers trucks, wide turns, school buses, motorcycles, bicycles, pedestrians, emergency vehicles, move-over situations, work zones, railroads, farm equipment, and defensive sharing.
- Current total app question count: 347.

VERSION 6.6 — ALCOHOL, DRUGS, DISTRACTIONS & DRIVER FITNESS
- Expanded Distraction & Impairment to 12 detailed teaching topics.
- Added 37 metadata-rich questions.
- Added recall, understanding, applied, and judgment difficulty levels.
- Added a dedicated 25-question Driver Fitness Mastery Exam.
- Covers alcohol, BAC, sobering myths, cannabis, medicines, mixed substances, phones, passengers, fatigue, emotions, road rage, seat belts, and airbags.
- Current total app question count: 384.

VERSION 6.7 — PARKING, BACKING & LOW-SPEED MANEUVERS
- Expanded Vehicle & Occupant Safety to 12 detailed teaching topics.
- Added 37 metadata-rich questions.
- Added recall, understanding, applied, and judgment difficulty levels.
- Added a dedicated 25-question Vehicle and Low-Speed Safety Mastery Exam.
- Covers pre-drive setup, backing, driveways, parking lots, parallel parking, hill parking, restrictions, three-point turns, U-turns, curb entry, doors, cargo, children, pets, and pedestrian safety.
- Current total app question count: 421.

VERSION 6.8 — TENNESSEE LICENSING, PERMIT RULES & TEEN RESTRICTIONS
- Expanded Licensing & Teen Rules to 12 detailed teaching topics.
- Added 36 metadata-rich questions.
- Added recall, understanding, applied, and judgment difficulty levels.
- Added a dedicated 25-question Tennessee Licensing Mastery Exam.
- Covers graduated licensing, eligibility, documents, testing, supervision, passenger and nighttime restrictions, devices, violations, insurance, school-related requirements, and readiness.
- Current total app question count: 457.

VERSION 6.9 — VEHICLE EQUIPMENT, MAINTENANCE & EMERGENCIES
- Expanded Required Stops & Emergencies to 12 teaching topics.
- Added 40 metadata-rich questions.
- Added a dedicated 25-question mastery exam.
- Total questions: 497

VERSION 7.0 — PERMIT READINESS FINAL
- Dedicated Permit Readiness Center
- 50-question, 45-minute Comprehensive Final
- Guaranteed coverage of all 11 sections
- Extra weighting toward weaker sections
- 85% overall score and 70% minimum in every section
- Full-course mastery report and recommended review
- Printable family completion certificate
- Certificate is not an official Tennessee credential

VERSION 7.1 — CURRICULUM CONSISTENCY AUDIT
- Normalized all 11 lessons to the same data structure.
- Every section now has 12 guided topics.
- Every guided topic uses Content, Example, Common Mistake, and Knowledge Check.
- Every question now has topic, difficulty, type, objective, tags, page, explanation, and answer metadata.
- Interstate Driving expanded from 4 to 12 topics and from 14 to 50 questions.
- Work Zones & Responsibility expanded from 4 to 12 topics and from 14 to 50 questions.
- Added dedicated 25-question mastery exams for Interstate Driving and Work Zones & Responsibility.
- All 11 knowledge sections now support the same full-experience format.

VERSION 7.1.1 — LESSON RENDER FIX
- Fixed the Version 7.1 lesson-data schema mismatch.
- Normalized all 11 knowledge lessons to the same viewer structure.
- Confirmed all 11 lessons contain 12 topics.
- Fixed the undefined dashboard variable that interrupted section rendering.
- Added backward-compatible lesson field handling.
- Updated the service-worker cache and bundle version.

VERSION 7.1.2 — LESSON CHECK HARDENING
- Rebuilt all 132 embedded lesson knowledge checks using the stronger scenario-based main question bank.
- Every 12-topic lesson now has exactly:
  * A correct: 3
  * B correct: 3
  * C correct: 3
  * D correct: 3
- Preferentially selected understanding, applied, and judgment questions.
- Reduced answer-length clues by avoiding candidates whose correct choice was uniquely longest when possible.
- Added source question ID, difficulty, and question type to lesson-check metadata.
- Updated bundle and service-worker cache versions.

VERSION 7.2 — SHORTER SECTION QUIZZES
- Kept the complete 50+ question banks for every knowledge section.
- Changed the standard Section Quiz to 15 questions.
- Added broad topic coverage when selecting each 15-question quiz.
- Prioritizes unseen, previously missed, weak, and higher-difficulty questions.
- Every new attempt generates a different question set.
- Restored a separate 25-question Mastery Exam button in every lesson.
- Section Quiz pass score remains 80%.
- Mastery Exam remains a longer, higher-difficulty assessment.
- Smart Review and Comprehensive Final continue using the complete question database.

VERSION 7.3 — TOPIC-ALIGNED LESSON CHECKS
- Replaced all 132 embedded lesson checks with the original topic-authored checks.
- Every quick check now directly tests the lesson topic immediately above it.
- Preserved the Version 7.2 assessment structure:
  * 15-question Section Quiz
  * 25-question Mastery Exam
  * 50-question Comprehensive Final
- Balanced every lesson at exactly 3 A, 3 B, 3 C, and 3 D correct answers.
- Preserved feedback explaining the topic rule.
- Added lesson-check alignment metadata.
- Updated bundle and service-worker cache versions.

VERSION 7.4 — AUDIO INSTRUCTOR LESSONS
- Text-to-speech for all 132 lesson topics.
- Full lesson, individual topic, and quick-check narration.
- Pause, resume, stop, and four speed options.
- Preferred speed saved locally.
- Instructor-led narrative added to every topic.
- Device voices; no audio files, API, account, or subscription required.
