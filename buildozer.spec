[app]
# (str) Title of your application
title = Dons Badass AI

# (str) Package name
package.name = badassai

# (str) Package domain (needed for android/ios packaging)
package.domain = org.dons

# (str) Source code where the main.py lives
source.dir = .

# (list) Source files to include (let empty to include all the files)
source.include_exts = py,png,jpg,kv,atlas

# (str) Application versioning
version = 1.0

# (list) Application requirements
requirements = python3,kivy

# (str) Supported orientation (one of landscape, sensorLandscape, portrait or all)
orientation = portrait

# (list) The Android architectures to build for
# MASTER ARCHITECTURE FIX: Restricted to arm64-v8a to prevent memory crash
android.archs = arm64-v8a

# (bool) Allow application backup
android.allow_backup = True

[buildozer]
# (int) Log level (0 = error only, 1 = info, 2 = debug (with command output))
log_level = 2

# (int) Display warning if buildozer is run as root (0 = False, 1 = True)
warn_on_root = 1
