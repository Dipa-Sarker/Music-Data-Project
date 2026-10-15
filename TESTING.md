# Testing

## The website contains a drop-down which lists four users

Tested manually by opening the website and verifying that the dropdown contains all four users.

## Selecting a user displays the relevant music data

Tested manually by selecting each user from the dropdown and verifying that the displayed answers correspond to the selected user's listening data.

## If the selected user has no data, a clear message is displayed

Tested manually by selecting User 4 and verifying that an appropriate message is displayed instead of empty or incorrect results.

## The top genres are displayed in order of listening frequency

Unit tests in `unit.test.mjs`.

Also verified manually by checking that the most frequently listened-to genres appear first. If a user has fewer than three genres, only the available genres are displayed.

## Songs listened to every day are displayed correctly

Unit tests in `unit.test.mjs`.

Verified that the function returns songs listened to on every listening date and excludes songs that were not listened to every day.

## Questions and answers are hidden when they are not applicable

Tested manually by checking users whose listening data does not support a particular question and verifying that the relevant question and answer are hidden.

## The displayed answers update when a different user is selected

Tested manually by switching between users and verifying that the answers update according to each user's listening data.

## The calculations use the supplied data

Tested manually by comparing the displayed results with the supplied music data and checking that the answers reflect the underlying listening events.

## Layout and accessibility

Tested manually by opening the website in a browser and checking that the content is readable and clearly presented.

Accessibility has been checked using Lighthouse in desktop and mobile modes which ensures 100%.

## Unit tests

Run using:

```bash
npm test
```

All tests pass successfully.

Unit tests are located in `unit.test.mjs`.
