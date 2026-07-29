# Public-Release Privacy Audit

## Result

The repository-owned publishable surfaces passed the public-release audit on
2026-07-29. GitHub Pages deployment #2 also passed and the live application
loaded correctly from the expected repository subpath.

The final unauthenticated privacy check then found that GitHub still served an
unreachable, pre-rewrite commit by direct SHA. Its patch representation exposed
the former personal author email even though the rewritten branch, ordinary
clone history, build, logs, and current artifacts were clean. The repository
was immediately returned to private visibility. Public release is blocked until
GitHub purges that retained object or the owner authorizes repository
recreation.

## Scope and evidence

- all 11 reachable commits and 142 unique Git-history blobs;
- all 118 current publishable working-tree files, including the paused Phase 6
  checkpoint;
- all 9 generated production-build files;
- source, documentation, synthetic fixtures, tests, package metadata, public
  assets, and all three mobile screenshots;
- all 16 existing GitHub Actions runs and their 16 job logs;
- all 7 downloadable Actions artifacts, containing 41 extracted files;
- filenames and content for environment files, credentials, private keys,
  tokens, personal contacts, address patterns, Social Security numbers,
  non-empty personal notes, personal financial values, real backups/exports,
  protected-source signatures, and real-person identifiers; and
- the supplied monolith's SHA-256 fingerprint and the protected hashed
  signature denylist.

The original author/committer email in Git metadata was the only release
blocker found. All nine commits were rewritten to use the repository owner's
GitHub noreply identity. Original local refs were removed, reflogs expired,
unreachable objects pruned, and the rewritten history was force-pushed while
the repository was private.

## Results

- protected monolithic source in reachable history or build: **none**;
- real Life Command Center backup/export data: **none**;
- personal financial values, notes, addresses, phone numbers, or personal
  profile seeds: **none**;
- environment files, secrets, credentials, tokens, or private keys: **none**;
- personal screenshots: **none**; all three images were visually checked and
  contain synthetic/blank-state UI only;
- non-noreply commit identities in reachable history: **none**;
- Actions artifacts with personal data: **none**; and
- Actions log findings: one public third-party package-maintainer address from
  dependency metadata, not repository-owner or application-user data.

## GitHub retained-object blocker

The local rewrite removed the sensitive commit metadata from every reachable
ref, expired local reflogs, pruned unreachable local objects, and force-pushed
the clean history. GitHub nevertheless retained at least one old object behind
its direct commit and patch URLs. This host-side object is not returned by
`git clone`, `git rev-list --all`, or the repository's current branch APIs, so
the expanded local scanner cannot delete it.

Safe resolution requires one of:

1. GitHub Support purging the cached views and retained objects for the
   rewritten commits; or
2. deleting and recreating the repository from the clean local history, which
   would remove the current Issues, milestone, Actions history, and repository
   identity metadata.

The second option is destructive and requires explicit owner authorization.

The ignored `local-reference/` directory and the separately supplied source
remain local-only and are not part of Git history, build output, artifacts, or
the Pages publication surface.

## Automated gates

- expanded local audit:
  `11 commits, 142 history blobs, 118 current files, 9 build files`;
- historical Actions audit: `16 runs, 16 job logs, 7 downloadable artifacts,
  41 extracted artifact files`;
- [Repository CI #9](https://github.com/Bill6006/tyree-life-command-center-next/actions/runs/30486355252):
  passed on rewritten history; and
- [Privacy scan #9](https://github.com/Bill6006/tyree-life-command-center-next/actions/runs/30486355263):
  passed on rewritten history.

## Remaining release steps

1. Complete GitHub owner re-authentication and make the repository public.
2. Confirm the retained pre-rewrite commit and patch URLs return 404 to an
   unauthenticated request.
3. Configure or re-enable Pages through GitHub Actions.
4. Run CI, the tree privacy scan, the history-wide audit, and Pages deployment.
5. Repeat live URL verification in an unauthenticated fresh browser, including
   repository-subpath assets/hash routing and the Android-sized layout.
6. Record the verified URL in `PROJECT_STATUS.md` before Phase 6 resumes.
