# Send message to Teams

* Send a message to a channel in Teams using webhook
![Mimimal message screenshot](screenshots/minmal-message.png)


* Additional configuration: Enables status label, buttons that re-direct to run and commit URLs
![Message with status and URL re-direct buttons](screenshots/message-with-status-buttons.png)

## Usage

1. Add incoming webhook URL in [GitHub secrets](https://docs.github.com/en/enterprise-cloud@latest/actions/security-guides/encrypted-secrets)

2. To send a message, add the following in your [workflow YAML](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
```yaml
uses: neonidian/teams-notify-build-status@v1
with:
  webhookUrl: ${{ secrets.TEAMS_INCOMING_WEBHOOK_URL }}
  message: >-
    Published artifact version ${{ steps.versioning.outputs.semver }}
```

3. Enable status by providing the status input. Enable 'View run' and 'View commit' buttons using environment variables.
```yaml
uses: neonidian/teams-notify-build-status@v1
if: ${{ always() }}                      # Use this line to always run this action irrespective of previous step failures
with:
  webhookUrl: ${{ secrets.TEAMS_INCOMING_WEBHOOK_URL }}
  message: >-
    Published artifact version ${{ steps.versioning.outputs.semver }}
  status: ${{ steps.unitTest.outcome }}  # 'unitTest' is the ID of a step
env:
  SHOULD_DISPLAY_VIEW_RUN_BUTTON: true
  SHOULD_DISPLAY_VIEW_COMMIT_BUTTON: true
```

See the actions tab in your GitHub repository for runs of this action! :rocket:

## Inputs and environment variables

| #   | Input ID | Required | Description                        |
|-----|----------|----------|------------------------------------|
| 1   |webhookUrl | Yes      | Incoming webhook URL from MS Teams |
| 2   |message    | Yes      | Message to be sent                 |
| 3   |status     | No       | Status of a step or a job          |

| #   | Environment variable              | Default value | Description                                                          |
|-----|-----------------------------------|---------------|----------------------------------------------------------------------|
| 1   | SHOULD_DISPLAY_VIEW_RUN_BUTTON    | false         | Clicking on this button redirects to the action run page in Github   |
| 2   | SHOULD_DISPLAY_VIEW_COMMIT_BUTTON | false         | Clicking on this button redirects to SHA commit page in Github       |
