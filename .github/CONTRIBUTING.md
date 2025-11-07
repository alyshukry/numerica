# Collaborating Guide
Thanks for considering contributing! All improvements are welcome, big or small.
## PRs and Code contributions
-   Tests must pass.
-   Follow the existing code style where possible and run `npm run lint`.
-   If you fix a bug, add a test.
<!-- -   **Pull request targets:**
    -   **New features and improvements** should go to the **latest version branch** (e.g. `4.x`).
    -   **Bug fixes for older versions** may go to their corresponding branch (e.g. `2.x`).
    -   **Never open PRs directly to `main`**, it represents the latest stable release only. -->
## Steps for contributing
1.  Create an issue for the bug you want to fix or the feature that you want to add.
2.  Create your own fork on GitHub, then checkout your fork.
3.  Write your code in your local copy. It's good practice to create a branch for each new issue you work on, although not compulsory.
4.  To run the test suite, first install the dependencies by running `npm install`, then run `npm test`.
5.  Ensure your code is linted by running `npm run lint` -- fix any issue you see listed.
6.  If the tests pass, commit your changes to your fork and create a pull request from there.
    -   Reference your issue in the pull request description (e.g., `fixes #123`) and follow [Conventional Commits](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13) for both commit messages and PR titles.
