#!/usr/bin/env python3
"""One-shot package rewriter: org.nico.ratel.landlords.* -> com.miti99.caro.{common,server}.*.

Rules (order matters — server rules first so they don't get absorbed by common):
- org.nico.ratel.landlords.server        -> com.miti99.caro.server
- org.nico.ratel.landlords               -> com.miti99.caro.common

Touches: package declarations, imports, and any fully-qualified references in code/strings.
"""
from __future__ import annotations

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2] / "server" / "src"

# Server rule must precede common rule (otherwise landlords.server.X becomes common.server.X).
REPLACEMENTS = [
    (re.compile(r"org\.nico\.ratel\.landlords\.server"), "com.miti99.caro.server"),
    (re.compile(r"org\.nico\.ratel\.landlords"), "com.miti99.caro.common"),
]


def rewrite(path: pathlib.Path) -> bool:
    text = path.read_text(encoding="utf-8")
    new = text
    for pattern, repl in REPLACEMENTS:
        new = pattern.sub(repl, new)
    if new != text:
        path.write_text(new, encoding="utf-8")
        return True
    return False


def main() -> int:
    files = sorted(ROOT.rglob("*.java"))
    if not files:
        print(f"no .java files under {ROOT}", file=sys.stderr)
        return 1
    changed = 0
    for f in files:
        if rewrite(f):
            changed += 1
    print(f"rewrote {changed}/{len(files)} files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
