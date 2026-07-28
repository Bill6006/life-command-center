# Authoritative Legacy Source Fingerprint

This record identifies the sole behavioral source used for the modular rebuild
without placing that source, its embedded seed, or its real user data in this
repository.

## Identity

| Property | Verified value |
| --- | --- |
| SHA-256 | `8beb34f3389bd9945b2ec860a590820a963f90b434c32b6ad18ef7e173823865` |
| File size | 1,395,667 bytes |
| Rendered line count | 18,030 |
| Script blocks | 12 |
| Style blocks | 10 |
| Declared functions | 1,377 |
| Total callable owners | 1,904 |
| JavaScript parse errors | 0 |
| Static title | `Tyree Life Command Center Time-Aware Weekly Focus Final` |
| Final boot title | `Tyree Life Command Center Fitbod Boundary Cleanup Final` |

The rendered line count follows the same convention as PowerShell
`Get-Content`: a terminal newline is not counted as an additional blank line.

## Verification method

The local-only analyzer:

1. read the complete byte stream;
2. indexed every script and style block;
3. parsed every script with Acorn;
4. walked every syntax tree;
5. classified declarations, assigned functions, arrow functions, and object
   method owners;
6. indexed state paths, element IDs, event types, storage identifiers, and
   dynamic DOM references; and
7. replaced protected identifiers with neutral compatibility labels before any
   report became eligible for the repository.

The analyzer and its raw intermediate output remain in an ignored local
directory. The source itself is not copied, embedded, minified, encoded, or
tracked.

## Structural result

- 12 of 12 script blocks parsed successfully.
- 10 of 10 style blocks were indexed.
- 1,904 of 1,904 callable owners appear in
  [legacy-owner-inventory.md](legacy-owner-inventory.md).
- 506 state/member paths, 169 static element IDs, 52 dynamic DOM references,
  and 19 event types were indexed.
- The 12-tab registry was verified from the source rather than inferred from
  screenshots.

This fingerprint is the reference point for later parity tests. A different
source hash requires an explicit mapping review before it can alter these
contracts.
