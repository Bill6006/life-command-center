import { describe, expect, it } from "vitest";
import { createBlankAppState } from "../state/model";
import { MemoryIndexedStateStore, MemoryKeyValueStore } from "./adapters";
import { canonicalRestoreSignature } from "./canonical";
import { buildFullBackup, prepareBackupText } from "./fullBackup";
import { VerifiedRestoreCoordinator } from "./verifiedRestore";

describe("synthetic cutover rehearsal", () => {
  it("preserves day count and canonical signature through Replace and reload", async () => {
    const source = createBlankAppState();
    for (const date of ["2046-01-01", "2046-01-02", "2046-01-03"]) {
      source.days[date] = {
        _updatedAt: `${date}T12:00:00.000Z`,
        note: `synthetic-${date}`
      };
    }
    const envelope = await buildFullBackup(source, {
      now: new Date("2046-01-04T12:00:00.000Z"),
      effectiveDate: "2046-01-04"
    });
    const prepared = await prepareBackupText(JSON.stringify(envelope));
    const coordinator = new VerifiedRestoreCoordinator(
      new MemoryKeyValueStore(),
      new MemoryIndexedStateStore()
    );

    const result = await coordinator.execute(
      prepared,
      "replace",
      createBlankAppState()
    );
    expect(result.status).toBe("pending-reload-verification");
    expect(Object.keys(result.state.days)).toHaveLength(3);
    expect(await canonicalRestoreSignature(result.state)).toBe(
      envelope.integrity.canonicalSignature
    );

    const verified = await coordinator.verifyPendingOnBoot();
    expect(Object.keys(verified?.days ?? {})).toHaveLength(3);
    expect(await canonicalRestoreSignature(verified!)).toBe(
      envelope.integrity.canonicalSignature
    );

    const postCutover = await buildFullBackup(verified!, {
      now: new Date("2046-01-04T13:00:00.000Z"),
      effectiveDate: "2046-01-04"
    });
    expect(postCutover.integrity.canonicalSignature).toBe(
      envelope.integrity.canonicalSignature
    );
  });
});
