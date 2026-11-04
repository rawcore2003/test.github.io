#!/usr/bin/env python3
"""Build static GitHub Pages artifact. Uses only Python standard library."""
from pathlib import Path
import shutil, json

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
if DIST.exists():
    shutil.rmtree(DIST)
DIST.mkdir()
for name in ("index.html", "martyr.html", "admin.html", "config.js"):
    shutil.copy2(ROOT / name, DIST / name)
shutil.copytree(ROOT / "assets", DIST / "assets")
shutil.copytree(ROOT / "data", DIST / "data")
data = json.loads((DIST / "data/martyrs.json").read_text(encoding="utf-8"))
print(f"Built {len(data.get('martyrs', []))} martyr records into {DIST}")