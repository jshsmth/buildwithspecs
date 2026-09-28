# Plan: control daily reminders

## Problem
A member wants to turn off daily reminders without losing account or security messages.

## Decision
Add one daily-reminder toggle in Settings. Persist the preference on the server so all signed-in devices share it. The scheduler checks the saved value before sending future reminders. A message already handed to the delivery provider cannot be recalled.

## Preserve
Existing members keep their current reminder setting. Existing reminder time and security-message delivery remain unchanged.

## Non-goals
Quiet hours, temporary snoozing, per-channel settings, and recalling queued provider messages.

## Verification
Check persistence, cross-session loading, the scheduler's send decision, failed-save recovery, and keyboard interaction. Use the existing service and component test boundaries.
