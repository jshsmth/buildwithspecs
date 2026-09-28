# Spec: daily reminder preferences

## Problem and solution
Members need control over daily reminders. Add a Settings toggle backed by the server's existing preferences contract.

## Acceptance criteria
1. Settings loads the persisted value and exposes an accessible, labelled switch.
2. The control is unavailable while the initial preference is loading. A loading failure shows a retry action.
3. A successful save is reflected when Settings is reopened or loaded on another signed-in device.
4. After an off value is saved, the scheduler skips future daily reminders for that account. Messages already handed to the provider may still arrive.
5. A failed save restores the previous confirmed value and offers retry. Prevent overlapping writes while a save is in progress.
6. Account and security messages, existing reminder time, and existing members' initial settings remain unchanged.
7. A signed-in member may change only their own preference. Invalid values are rejected.
8. The switch and retry action work by keyboard and expose understandable state and error feedback.

## Scope
One persistent daily-reminder preference, its scheduler behaviour, and its Settings control. Quiet hours and temporary snoozing are excluded.

## Verification
Service tests cover authorization, validation, persistence, defaults, and scheduler exclusions. Component tests cover loading, saving, failure, retry, and keyboard operation. A cross-session acceptance check verifies the saved value is reloaded. Deployment and production acceptance require separate evidence.
