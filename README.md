# Mirage Katas

Inspired by [Exercism](https://exercism.org/), this repo contains a set of
challenges designed to explore [Mirage](https://miragejs.com/). The challenges
are in the form of tests. The aim of the game is to make the tests pass, one at
a time, learning new features of Mirage along the way.

## How do I get started?

1. `yarn install`
2. `yarn start`
3. Open [mirage-test.js](./tests/acceptance/mirage-test.js) in your preferred editor
4. Visit [localhost:4200/tests](http://localhost:4200/tests) in your preferred browser
5. Start trying to make the tests pass!

If you get stuck along the way, see [HINTS.md](./HINTS.md).

**Note:** when you add new files to the [`mirage` directory](./mirage) you must
restart the server (ctrl-c and `yarn start` again). This is probably a bug in
ember-cli-mirage but we’re not exactly sure right now. If you can think of a
fix, please submit a PR.

## Anything else I should know?

These challenges are geared towards
[ember-cli-mirage](https://ember-cli-mirage.com/), so it’s usually best to start
with the [ember-cli-mirage documentation](https://www.ember-cli-mirage.com/docs)
before moving to the [core Mirage documentation](https://miragejs.com/docs).

Note that the tests don’t involve Ember _at all_. Instead, we’re using standard
browser `fetch` API to make network requests, and we’re asserting against the
responses we get back. We’ve housed the katas in an Ember app because it’s
convenient to do so, but put Ember out of your mind as you work through the
challenges. This can be tricky because some of Mirage’s terminology is the same
as Ember’s, so keep your frame of reference to Mirage and its concepts. To put
it plainly: you can ignore the `app` directory entirely.

It’s also worth knowing that Mirage was largely created by one person, the
wonderful [Sam Selikoff](https://github.com/samselikoff). It’s a practical tool
written by a normal person to scratch their own itch. The code and intentions
behind it are readable and understandable. While it contains many conveniences
that seem like magic, the magic is just there to make writing tests and fixtures
more pleasant, not because there’s a “right” way to do things. Mirage, more than
anything else, wants to make the job of building rich, robust javascript apps
more fun.

## How can I contribute?

- If you have an idea for a new challenge, submit a PR.
- If you have an idea for a hint or documentation improvement, submit a PR.
- If you see a mistake, submit a PR.
- If you’re not comfortable submitting a PR, submit an issue.
- If you’re not comfortable submitting an issue, reach out to a contributor via email, Slack, or Discord.
