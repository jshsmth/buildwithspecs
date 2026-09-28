# Ticket breakdown

Illustrative local drafts. Publication to a tracker is optional and requires task authorization.

## 01: persist and enforce the preference
Blocked by: None.

Deliver the preference contract through the persistence and scheduler layers. Preserve current member settings, validate the value, and enforce account ownership.

Verify: spec criteria 4, 6, and 7; test persistence, defaults, ownership, invalid values, scheduler exclusions, and unchanged security messages.

## 02: expose the preference in Settings
Blocked by: 01.

Load and display the persisted value. Save a changed value through the existing preferences client and prevent overlapping writes. Keep the existing component's accessible label and keyboard behaviour.

Verify: successful paths of criteria 1 and 3, and save serialization from criterion 5. Reopen Settings in another session and confirm persistence. Failure recovery remains explicitly owned by ticket 03; do not present the feature as complete until it lands.

## 03: complete recovery and interaction checks
Blocked by: 02.

Complete loading failures, failed-save rollback, retry, and assistive feedback. Keep initial loading and in-flight saving states unambiguous.

Verify: criteria 2, 5, and 8; regress criteria 1 and 3. Review the full feature against every criterion, then update the notification contract.

Tickets 02 and 03 can share a feature branch; release only after the complete acceptance set passes. The dependency chain offers no useful parallel implementation here.
