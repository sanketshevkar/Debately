# CodeHut Contribution Guide

Here are the guidelines we'd like you to follow to contribute to this project:

* [Commit Message Guidelines][contribute.requests]
* [Development Setup][contribute.setup]
* [Issues and Bugs][contribute.issue]
* [Feature Requests][contribute.feature]
* [Issue Submission Guidelines][contribute.submit]
* [Pull Request Submission Guidelines][contribute.submitpr]

## <a name="requests"></a> Commit Message Guidelines


### Commit Message Format
Each commit message consists of a mandatory **type**, **scope**, **subject**, and **footer**. This is a specific format:

```shell
    <type>(<scope>): <subject> - <footer>
```

This allows the message to be easier to read on GitHub as well as in various git tools. Some examples:

```md
feat(server): add API to go server - #559
fix(client): correct typo in readme - #274
chore(github): migrate travis ci/cd to gh actions - #4
docs(README): add unit test script
```

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the subject, where it should say: `this reverts commit <hash>.`, where the hash is the SHA of the commit being reverted. A commit with this format is automatically created by the [`git revert`][git-revert] command.

### Type
Must be one of the following:

* **`feat`**: A new feature
* **`fix`**: A bug fix
* **`docs`**: Documentation only changes
* **`style`**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **`refactor`**: A code change that neither fixes a bug nor adds a feature
* **`perf`**: A code change that improves performance
* **`test`**: Adding missing or correcting existing tests
* **`chore`**: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Scope
The scope will be specifying the place of the commit change; the focal point of new code or best  description for where changes can be found.

You can use `*` when the change affects more than a single scope.

### Subject
The subject contains a succinct description of the change:

* don't capitalize the first letter
* kept under 50 characters
* no dot (.) at the end

### Footer
The footer should contain reference GitHub Issues that this commit addresses.*

## <a name="submit"></a> Issue Submission Guidelines
Before you submit your issue search the archive, maybe your question was already answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue. Help us to maximize the effort we can spend fixing issues and adding new features, by not reporting duplicate issues.

The "new issue" form contains a number of prompts that you should fill out to make it easier to understand and categorize the issue.

## <a name="setup"> </a> Development Setup

This document describes how to set up your development environment to build the Debately project.

### Installing Dependencies

Before you can build this project, you must install and configure the following dependencies on your machine:

* [Git][git]: The [Github Guide to Installing Git][git-setup] is a good source of information.

* [Node.js (LTS)][node]: The project uses use Node to generate the documentation, run a development web server, run tests, and generate distributable files. Depending on your system you can install Node either from source or as a pre-packaged bundle.

  I recommend using [nvm][nvm] (or [nvm-windows][nvm-windows]) to manage and install Node.js, which makes it easy to change the version of Node.js per project.

### Forking CodeHut on Github

To contribute code to CodeHut, you must have a GitHub account so you can push code to your own fork thye CodeHub project repository and open Pull Requests in the repository.

To create a Github account, follow the instructions [here][github-signup]. Afterwards, go ahead and [fork][github-forking] the specific Accord Project repository.

### Keeping In Sync

It is good practice to always keep your `origin/master` in sync with `upstream/master`. You don’t have to, but it makes your life easier. Do your work in branches of your fork, and periodically sync up your `master` with the `master` of `upstream` as follows. You should definitely do this before creating a pull request.

```shell
    git checkout master
    git fetch --all --prune
    git rebase upstream/master
    git push origin master
```

## <a name="submit-pr"></a> Pull Request Submission Guidelines

Before you submit your pull request consider the following guidelines:

* First check whether there is an open Issue for what you will be working on. If there is not, open one up, including links to _related_ Issues found for context.
* Search for an open or closed Pull Request that relates to your submission. You don't want to duplicate effort, and you also want to include links to _related_ Pull Requests found for context.
* Create the [development environment][contribute.setup]
* Make your changes in a new git branch: techdocs

  ```text
    git checkout -b name/issue-tracker/short-description master
  ```

  Name can be initials or GitHub username. An example of this could be:

  ```text
    git checkout -b sanketshevkar/i12/readme-update
  ```

* Create your patch commit, **including appropriate test cases**.
* Ensure you provide a DCO sign-off for your commits using the `--signoff` option of git commit. For more information see [how this works][dcohow].

* Commit your changes using a descriptive commit message that follows our [commit message conventions][contribute.requests]. Adherence to the [commit message conventions][contribute.requests] is required, because release notes are automatically generated from these messages.

  ```text
    git commit -a --signoff -m "<commit message here>"
  ```

  Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

* Before creating the Pull Request, ensure your branch sits on top of master (as opposed to branch off a branch). This ensures the reviewer will need only minimal effort to integrate your work by fast-fowarding master:

  ```text
    git rebase upstream/master
  ```

* Last step before creating the Pull Request, package and run all tests a last time:

  ```text
    npm run test
  ```

* Push your branch to GitHub:

  ```text
    git push origin name/issue-tracker/short-description
  ```

* In GitHub, send a pull request to `<REPOSITORY>:master` by following our [pull request conventions][contribute.requests]. This will trigger the check of the [Contributor License Agreement][contribute.cla].

    You can also amend the initial commits and force push them to the branch.

    ```text
    git rebase master -i
    git push origin name/issue-tracker/short-description -f
    ```
Thank you for your contributing!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes from the main (`upstream`) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```text
    git push origin --delete name/issue-tracker/short-description
  ```

* Check out the master branch:

  ```text
    git checkout master -f
  ```

* Delete the local branch:

  ```text
    git branch -D name/issue-tracker/short-description
  ```

* Update your master with the latest upstream version:

  ```text
    git checkout master
    git fetch --all --prune
    git rebase upstream/master
    git push origin master
  ```

## License <a name="license"></a>

CodeHut source code files are made available under the [MIT License][gnu-gpl-v3].

### CONTRIBUTE MarkDown Reference 

Accord Project [CONTRIBUTE.md][ap-md]

[contribute.cla]: CONTRIBUTING.md#cla
[contribute.issue]: CONTRIBUTING.md#issue
[contribute.feature]: CONTRIBUTING.md#feature
[contribute.submit]: CONTRIBUTING.md#submit
[contribute.setup]: CONTRIBUTING.md#setup
[contribute.requests]: CONTRIBUTING.md#requests
[contribute.submitpr]: CONTRIBUTING.md#submit-pr

[git-revert]:
https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/reverting-a-commit

[git]:
https://git-scm.com/

[git-setup]:
https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup

[node]:
https://nodejs.org/en/download/

[nvm]:
https://github.com/nvm-sh/nvm

[nvm-windows]:
https://github.com/coreybutler/nvm-windows

[github-signup]:
https://github.com/join

[github-forking]:
https://docs.github.com/en/github/getting-started-with-github/fork-a-repo

[ap-md]:
https://github.com/accordproject/techdocs/blob/master/CONTRIBUTING.md

[dcohow]:
https://github.com/probot/dco#how-it-works

[gnu-gpl-v3]:
https://github.com/sanketshevkar/Debately/blob/main/LICENSE