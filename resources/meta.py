import os
import json
import re

def createMeta(path: str, filenames: list[str]):
    return_path = path.replace(path.split("\\")[-1], "")
    meta = { "files": [] }
    meta_path = return_path + "meta.json"
    
    if os.path.exists(meta_path):
        with open(meta_path, "r") as j:
            meta = json.loads(j.read())
            
    for file in meta["files"]:
        if not os.path.exists(os.path.join(return_path, file)):
            meta["files"].remove(file)
    
    for filename in filenames:
        if re.match(r"meta\d.json", filename) or filename == "meta.json":
            split_path = os.path.join(path, filename).split("\\")
            meta_path = "{dir}\\{filename}".format(dir = split_path[-2], filename = split_path[-1])
            meta["files"].append(meta_path)
            
    if len(meta["files"]) != 0:
        with open(return_path + "meta.json", "w") as outfile:
            meta["files"] = list(dict.fromkeys(meta["files"]))
            outfile.write(json.dumps(meta))
            
    
    
for dirpath, dirnames, filenames in os.walk(os.getcwd()):
    if dirpath.split("\\")[-1] != "resources":
        createMeta(dirpath, filenames)