// src/utils/ring.test.js
import { describe, it, expect } from "vitest";
import {
  RING_POSITIONS,
  createEmptyRing,
  applyRingToggle,
  isSlugOpen,
} from "./ring";

describe("createEmptyRing", () => {
  it("starts with nothing open", () => {
    expect(createEmptyRing()).toEqual({ bySlot: {}, next: 0 });
  });

  it("gives each call its own independent ring, not a shared one", () => {
    const a = createEmptyRing();
    const b = createEmptyRing();
    a.bySlot.top = "item-1";
    expect(b.bySlot).toEqual({});
  });
});

describe("opening items fills the ring clockwise", () => {
  it("the first item opened goes to the top position", () => {
    const ring = applyRingToggle(createEmptyRing(), "item-1");
    expect(ring).toEqual({ bySlot: { top: "item-1" }, next: 1 });
  });

  it("four items opened in a row fill top, right, bottom, then left", () => {
    let ring = createEmptyRing();
    ring = applyRingToggle(ring, "item-1"); // top
    ring = applyRingToggle(ring, "item-2"); // right
    ring = applyRingToggle(ring, "item-3"); // bottom
    ring = applyRingToggle(ring, "item-4"); // left

    expect(ring.bySlot).toEqual({
      top: "item-1",
      right: "item-2",
      bottom: "item-3",
      left: "item-4",
    });
    expect(ring.next).toBe(4);
  });

  it("a fifth item replaces whichever one was opened first (top)", () => {
    let ring = createEmptyRing();
    ring = applyRingToggle(ring, "item-1"); // top
    ring = applyRingToggle(ring, "item-2"); // right
    ring = applyRingToggle(ring, "item-3"); // bottom
    ring = applyRingToggle(ring, "item-4"); // left
    ring = applyRingToggle(ring, "item-5"); // replaces top (item-1)

    expect(ring.bySlot).toEqual({
      top: "item-5",
      right: "item-2",
      bottom: "item-3",
      left: "item-4",
    });
    expect(ring.next).toBe(5);
  });

  it("a sixth item then replaces whichever was opened second (right), and so on", () => {
    let ring = createEmptyRing();
    ["item-1", "item-2", "item-3", "item-4", "item-5", "item-6"].forEach(
      (slug) => {
        ring = applyRingToggle(ring, slug);
      },
    );
    expect(ring.bySlot).toEqual({
      top: "item-5",
      right: "item-6",
      bottom: "item-3",
      left: "item-4",
    });
    expect(ring.next).toBe(6);
  });
});

describe("closing an open item", () => {
  it("removes it from the ring, freeing its position", () => {
    let ring = applyRingToggle(createEmptyRing(), "item-1");
    ring = applyRingToggle(ring, "item-1");
    expect(ring.bySlot).toEqual({});
  });

  it("does not change which position gets filled next", () => {
    let ring = applyRingToggle(createEmptyRing(), "item-1"); // fills top, next becomes 1
    ring = applyRingToggle(ring, "item-1"); // close it again
    expect(ring.next).toBe(1);
  });

  it("the position it freed is not specially reused — the ring just carries on to the next one in order", () => {
    let ring = createEmptyRing();
    ring = applyRingToggle(ring, "item-1"); // fills top
    ring = applyRingToggle(ring, "item-1"); // closes top again
    ring = applyRingToggle(ring, "item-2"); // goes to "right", the next slot in order — not back to "top"

    expect(ring.bySlot).toEqual({ right: "item-2" });
  });
});

describe("isSlugOpen", () => {
  it("says no for an item that has never been opened", () => {
    expect(isSlugOpen(createEmptyRing(), "item-1")).toBe(false);
  });

  it("says yes once an item has been opened", () => {
    const ring = applyRingToggle(createEmptyRing(), "item-1");
    expect(isSlugOpen(ring, "item-1")).toBe(true);
  });

  it("says no again once that item is closed", () => {
    let ring = applyRingToggle(createEmptyRing(), "item-1");
    ring = applyRingToggle(ring, "item-1");
    expect(isSlugOpen(ring, "item-1")).toBe(false);
  });
});

describe("RING_POSITIONS", () => {
  it("lists the four positions in clockwise order", () => {
    expect(RING_POSITIONS).toEqual(["top", "right", "bottom", "left"]);
  });
});
