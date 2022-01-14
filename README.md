# Shareable configurations for semantic-release

[![semantic-release](https://badgen.net/badge/semantic-release/simple/cyan)](https://github.com/firebolt-analytics/semantic-release-configs)

This repository
contains [shareable configurations](https://semantic-release.gitbook.io/semantic-release/usage/shareable-configurations)
for [semantic-release](https://semantic-release.gitbook.io/semantic-release/) tool.

Multiple projects in Firebolt are using `semantic-release` to automate the process of versioning and release notes
generation. This automation relies on commit messages that follow the simple but strict rules described
in [Conventional Commits](https://www.conventionalcommits.org/) specification.

This repository hosts configuration definitions that we most often use in our projects. You can reference one of the
existing configurations from this centralized location to avoid repeating it in every repository.

## Prerequisites

The use of `semantic-release` requires commits that land into your `main` branch to follow the convention. It is highly
advised to configure your repository to only allow "squash" type of PR merges and add a CI workflow similar to
[.github/workflows/pr.yaml](.github/workflows/pr.yaml) that will ensure that only PRs with the valid title can be
merged. GitHub will convert PR title to the commit title during squash.

## Available configurations

All configurations use the same release rules:

- Commits of type `feat` will result a `minor` version bump.
- Commits of type `fix`, `chore` or `revert` will result a `patch` version bump.
- Commits that include in their message words `BREAKING`, `BREAKING CHANGE` or `BREAKING CHANGES` will result a
  `major` version bump.

The difference between configurations is how they work with release channels.

### simple

This is the simplest possible configuration that works great for libraries.

Every commit to the `main` or `master` branch will generate a new "stable" SemVer (e.g. `v1.2.3`).

### brs

This configuration stands for "beta-rc-stable" and fits great for applications.

- Commits to the `main` or `master` branches will generate a new "beta" SemVer (e.g. `v1.2.3-beta.12`).
- Commits to the `staging` branch will generate a new "rc" SemVer (e.g. `v1.2.3-rc.3`).
- Commits to the `release` branch will generate a new "stable" SemVer (e.g. `v1.2.3`).

## Usage

It is recommended to use a workflow similar to [.github/workflows/push.yaml](.github/workflows/push.yaml).
