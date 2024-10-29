[authorBadge]: https://img.shields.io/badge/Author-Toni%20CANTARUTTI-blue
[authorLink]: https://github.com/toni-cantarutti?tab=repositories
[licenseBadge]: https://img.shields.io/badge/License-MIT-brightgreen.svg
[licenseLink]: LICENSE
[nodejs]: https://nodejs.org/en/download/package-manager
[pnpm]: https://pnpm.io/installation


[![Author][authorBadge]][authorLink]
[![License][licenseBadge]][licenseLink]


# Alyra project 2
This repository is ready for you to clone and start testing. Simply follow the guide below.<br>

> [!NOTE]
> The tests are minimal but correspond to what is required for the project.

## Prerequisites
1. You need [Node.js][nodejs] installed
1. This repo was originally created with [pnpm][pnpm] but you can `npm` or `yarn`.

## Install
1. Clone the repo in your current folder
    ```bash
    git clone --depth 1 https://github.com/toni-cantarutti/alyra-p2.git .
    ```
1. Install dependencies:
      ```bash
      pnpm install
      ```
### Launch tests 
```bash
pnpm hardhat coverage --testfiles "test/Voting.ts" --sources "Voting.sol"
```
## License
Under the MIT license. See the [LICENSE][licenseLink] file for details.



