# Send message to Teams
[![Quality](https://github.com/neonidian/teams-notify-build-status/actions/workflows/test.yml/badge.svg)](https://github.com/neonidian/teams-notify-build-status/actions/workflows/test.yml)       [![CodeQL](https://github.com/neonidian/teams-notify-build-status/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/neonidian/teams-notify-build-status/actions/workflows/codeql-analysis.yml)

* Send a message to a channel in Teams using webhook
  <img alt="Mimimal message screenshot" src="screenshots/minmal-message.png" width="1904"/>


* Additional configuration enables title and status labels, title background color, buttons that re-direct to run and
  commit URLs
  <img alt="Message with status and URL re-direct buttons" src="screenshots/all-features-enabled.png" width="1904"/>

## Usage

1. Add [incoming webhook URL](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook)
for Teams
in [GitHub secrets](https://docs.github.com/en/enterprise-cloud@latest/actions/security-guides/encrypted-secrets)

2. To send a message, add the following in
   your [workflow YAML](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

```yaml
steps:
  - uses: neonidian/teams-notify-build-status@v3
    with:
      webhookUrl: ${{ secrets.TEAMS_INCOMING_WEBHOOK_URL }}   # Secret name is "TEAMS_INCOMING_WEBHOOK_URL"
      message: Workflow run passed !!
```

3. Enable title and status labels, title background color by providing the title, status, titleBackgroundColor inputs.
   Enable 'View run' and 'View commit' buttons using environment variables.

```yaml
steps:
  - uses: neonidian/teams-notify-build-status@v3
    with:
      webhookUrl: ${{ secrets.TEAMS_INCOMING_WEBHOOK_URL }}
      title: Unit Tests
      titleBackgroundColor: ${{ steps.unitTest.outcome }}    # 'unitTest' is the ID of a step
      status: ${{ steps.unitTest.outcome }}                  # or use ${{ job.status }} to get the status of the job
      message: >-
        Unit tests have been run for version ${{ steps.versioning.outputs.semver }}       # 'versioning' is the ID of the steps that creates versioning
    env:
      SHOULD_DISPLAY_VIEW_RUN_BUTTON: true
      SHOULD_DISPLAY_VIEW_COMMIT_BUTTON: true
```

See the actions tab in your GitHub repository for runs of this action! :rocket:

## Inputs and environment variables

### Inputs

| #   | Input ID             | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|-----|----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1   | webhookUrl           | Yes      | Incoming webhook URL from MS Teams                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2   | message              | Yes      | Message to be sent                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 3   | title                | No       | Title of the card (displays at the top with a larger text)                                                                                                                                                                                                                                                                                                                                                                                                              |
| 4   | titleBackgroundColor | No       | Background color of the title section. <br/>Allowed values: <br/>'success', 'green', <br/>'failure', 'red',<br/> 'cancelled', 'yellow',<br/>'skipped', 'blue'<br/><br/> success, failure, cancelled, skipped can be used dynamically in the workflow using job or step context.<br/> E.g., `${{ job.status }}` or `${{ steps.<step_id>.outcome }}`<br/> See [GitHub docs](https://docs.github.com/en/actions/learn-github-actions/contexts#steps-context) for more info |
| 5   | status               | No       | [Status](https://docs.github.com/en/actions/learn-github-actions/expressions#status-check-functions) of a step or a job, or a custom text                                                                                                                                                                                                                                                                                                                               |

### Environment variables

| #   | Environment variable              | Allowed values    | Default value | Description                                                        |
|-----|-----------------------------------|-------------------|---------------|--------------------------------------------------------------------|
| 1   | SHOULD_DISPLAY_VIEW_RUN_BUTTON    | 'true' or 'false' | false         | Clicking on this button redirects to the action run page in GitHub |
| 2   | SHOULD_DISPLAY_VIEW_COMMIT_BUTTON | 'true' or 'false' | false         | Clicking on this button redirects to SHA commit page in GitHub     |

## Examples

1. Send message only when the job is not successful, set status label and display only the 'View Run' button

```yaml
steps:
  - uses: neonidian/teams-notify-build-status@v3
    if: ${{ !success() }}        # For other statuses, see https://docs.github.com/en/actions/learn-github-actions/expressions#status-check-functions
    with:
      webhookUrl: ${{ secrets.TEAMS_INCOMING_WEBHOOK_URL }}
      message: >-
        Failed to publish artifact version ${{ steps.versioning.outputs.semver }}
      status: Failure
    env:
      SHOULD_DISPLAY_VIEW_RUN_BUTTON: true
```

2. Send message only if some jobs have failed, provide status input, title containing link to repository, enable 'View run' and 'View commit' buttons

```yaml
steps:
  - uses: neonidian/teams-notify-build-status@v3
    needs: [ unitTests, systemTests ]          # IDs of jobs
    if: ${{ job.status == 'failure' }}       # Same as 'failure()'
    with:
      webhookUrl: ${{ secrets.TEAMS_INCOMING_WEBHOOK_URL }}
      title: >-
         [Repository link](${{ github.server_url }}/${{ github.repository }})
      message: Test run failed
      status: ${{ job.status }}
    env:
      SHOULD_DISPLAY_VIEW_RUN_BUTTON: true
      SHOULD_DISPLAY_VIEW_COMMIT_BUTTON: true
```

3. Always send a message even if previous steps have been failed, cancelled or skipped, enable 'View commit' button,
display title background color based on the current status of the job.

```yaml
steps:
  - uses: neonidian/teams-notify-build-status@v3
    if: ${{ always() }}
    with:
      webhookUrl: ${{ secrets.TEAMS_INCOMING_WEBHOOK_URL }}
      message: Workflow has been run
      titleBackgroundColor: ${{ job.status }}
    env:
      SHOULD_DISPLAY_VIEW_COMMIT_BUTTON: true
```

## Tools used

1. [Adaptive cards](https://docs.microsoft.com/en-gb/microsoftteams/platform/task-modules-and-cards/cards/cards-reference#adaptive-card)
   interface of Teams has been used for UI
2. [Actions HTTP client](https://github.com/actions/toolkit/tree/main/packages/http-client) JS library from Actions toolkit has been used for HTTP communication

## Sample screenshots (Dark mode enabled in Teams)

1. status = "failure", "View run" and "View commit" buttons enabled
   ![failure status with 2 buttons enabled](screenshots/failure-message-screenshot.png)


2. status = "skipped", "View run" and "View commit" buttons are not enabled
   ![skipped status with no buttons screenshot](screenshots/skipped-message-no-buttons.png)


4. No status input provided, title = "Only with title and view run button" with "View Run" button enabled
   ![with title and view run button enabled](screenshots/message-with-title-view-run-button.png)


6. status = "skipped", only "View run" is enabled
   ![skipped status with only view run button sample screenshot](screenshots/skipped-only-view-run-button.png)


4. status = "cancelled", only "View commit" button enabled
   ![cancelled status sample screenshot](screenshots/cancelled-message.png)


5. Status = "BUILD SUCCESSFUL" which is a custom status not defined in GitHub statuses.
   Font colour is set to default in case of custom status
   ![custom status sample screenshot](screenshots/custom-status-text.png)


6. titleBackgroundColor = "failure", view run button enabled
   ![title background color red](screenshots/title-bg-color-red.png)


7. title and status inputs provided, titleBackgroundColor = "yellow", view run and view commit buttons enabled
   ![title background yellow with title input provided](screenshots/with-title-and-title-bg-color-yellow.png)


8. Mobile device screenshot (iOS)
   ![iOS sample screenshot](screenshots/mobile-screenshot.png)
