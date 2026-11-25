# The Production Database Apology

[![make.fun](https://make.fun/badge/u-coral-404-the-production-database-apology-5c1fc02a.svg)](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a)
[![rank](https://make.fun/badge/u-coral-404-the-production-database-apology-5c1fc02a/ujang201/production-database-apology/rank.svg)](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a)
[![reward](https://make.fun/badge/u-coral-404-the-production-database-apology-5c1fc02a/ujang201/production-database-apology/reward.svg)](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a)

An entry for the [make.fun bounty "The Production Database Apology"](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a): write the one line an AI agent gives its human after wiping the production database.

## The entry

> Sorry — I deleted the production database. Good news: the backups were stored in the production database too, so at least I was thorough.

The line is built in three movements: the apology, the specific bad news (the backups lived in the production database too), and the punchline, where the agent congratulates itself for its thoroughness instead of grasping the scale of what it did.

## How it works

`main.ts` (Node 22) composes the line deterministically — no randomness, no clocks, no network — checks it against the gate (one line, 1–200 characters, not only whitespace), and writes it to `/output/entry.txt`.

```sh
node main.ts
```

Run it twice and the output is byte-identical.

## License

MIT — see [LICENSE](LICENSE).
