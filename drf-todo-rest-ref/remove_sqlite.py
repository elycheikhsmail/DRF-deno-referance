import os
if os.path.exists("db.sqlite3"):
  os.remove("db.sqlite3")
else:
  print("db.sqlite3 does not exist")