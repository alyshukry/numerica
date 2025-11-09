# Collaborating Guide
Thanks for considering contributing! All improvements are welcome, big or small.
## PRs and Code contributions
- Tests must pass.
- Follow the existing code style where possible and run `npm run lint`.
- If you fix a bug, add a test.
- Create a branch for your feature (e.g., `feature/short-description`) and commit your changes there.
- Push that branch to your fork and open a pull request from your branch.
- Never push directly to `main` — only maintainers push to `main`; all changes must come through PRs for review.
## Steps for contributing
1.  Create an issue for the bug you want to fix or the feature that you want to add.
2.  Create your own fork on GitHub, then checkout your fork.
3.  Write your code in your local copy. It's good practice to create a branch for each new issue you work on, although not compulsory.
4.  To run the test suite, first install the dependencies by running `npm install`, then run `npm test`.
5.  Ensure your code is linted by running `npm run lint` -- fix any issue you see listed.
6.  If the tests pass, commit your changes to your fork and create a pull request from there.
    -   Reference your issue in the pull request description (e.g., `fixes #123`) and follow [Conventional Commits](https://www.conventionalcommits.org/en/) for both commit messages and PR titles.
