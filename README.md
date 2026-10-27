# Project Workflow and Local Setup Guide

NOTE: THIS DOCUMENTATION FILE WAS AI GENERATED AND WAS NOT REVIEWED BY A HUMAN YET

This document outlines the workflow for developing, testing, and deploying the `QUIC_questionnaire` experiment using local tools, GitHub, and Cognition.run.

## 1. Deployment Workflow (Local -> GitHub -> Cognition.run)

The project relies on a continuous integration/continuous deployment (CI/CD) pipeline. GitHub acts as the single source of truth for your code.

* **Local Development:** All code changes (to `index.html`, `index.js`, `README.md`) and asset updates (like `assets/ladder.png`) should be done on your local computer.

* **Version Control:** Once changes are ready, you commit and push them to your remote GitHub repository (`QUIC_questionnaire`).

* **Automated Deployment:** Pushing to GitHub triggers the GitHub Actions workflow defined in `.github/workflows/cognition-github-actions.yml`.

* **Cognition.run Sync:** The GitHub Action automatically connects to Cognition.run and pushes your latest files to the platform. Your live experiment is updated instantly without manual uploads.

## 2. Handling Code Changes (Important)

**The sync is strictly one-way: GitHub to Cognition.run.**

Do not edit files directly in the Cognition.run web editor. If you do, those changes will not automatically sync back to GitHub. Furthermore, the next time you push an update from your local machine to GitHub, the automated workflow will overwrite and erase any manual changes you made in the Cognition.run editor.

If you have already made changes in the Cognition.run web editor and need to save them:

1. Copy the modified code or download the files from Cognition.run.

2. Paste the updated code into the corresponding files in your local project folder.

3. Commit the changes locally and push them to GitHub to properly synchronize the environments.

## 3. Local Preview Setup (VS Code)

To test and preview your experiment locally before pushing to GitHub, use Visual Studio Code with the Live Server extension. This provides a local web server that automatically refreshes your browser when you save a file.

**Setup Instructions:**

1. Open Visual Studio Code.

2. Go to the **Extensions** view (`Ctrl+Shift+X` on Windows/Linux or `Cmd+Shift+X` on Mac).

3. Search for **Live Server** (by Ritwick Dey) and install it.

4. Open the `QUIC_questionnaire` folder in VS Code.

5. In the Explorer sidebar, right-click `index.html` and select **Open with Live Server**.

6. Your default web browser will open a new tab displaying your experiment. Any time you save changes to your HTML or JS files, the browser will automatically refresh.

## 4. Configuring GitHub Actions for Cognition.run

To make the automated deployment work, you need to securely connect your GitHub repository to your Cognition.run task. This is done using GitHub Secrets so your credentials remain private.

**Step 1: Get your synchronization details from Cognition.run**
1. Log in to Cognition.run and navigate to your specific Task (`QUIC_questionnaire`).
2. Go to the task settings and look for the **GitHub Sync** or **Webhook** section.
3. Generate or copy the provided Webhook URL or API Token (this acts as the password for the automated sync).

**Step 2: Add the Secret to your GitHub Repository**
1. Go to your `QUIC_questionnaire` repository on GitHub.
2. Click on **Settings** (the gear icon at the top).
3. In the left sidebar, scroll down to **Secrets and variables** and click on **Actions**.
4. Click the **New repository secret** button.
5. Name the secret exactly as your `.yml` file expects it (typically something like `COGNITION_WEBHOOK` or `COGNITION_TOKEN`).
6. Paste the URL or token you copied from Cognition.run into the "Secret" field and click **Add secret**.

**Step 3: Verify the Workflow File**
Ensure your `.github/workflows/cognition-github-actions.yml` file is configured to use the secret you just created. It should contain a step that looks similar to this, referencing the exact secret name:
`url: ${{ secrets.COGNITION_WEBHOOK }}`

Once this setup is complete, every `git push` to your main branch will automatically trigger the workflow and sync your code.