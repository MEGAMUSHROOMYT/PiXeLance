# не люблю пайтон
# сори за -глаза (не шарю в змеях бл)
import os
import json
import requests
import re
from PIL import Image
from threading import Thread

tiles = [
    "Grass Tiles",
    "Grass Tiles Winter",
    "Concrete Tiles",
    "Concrete Tiles Winter",
    "Land Tiles",
    "Land Tiles Winter",
]


class Texture:
    def __init__(self, path, name, x, y, width, height):
        self.path = "textures\\" + path
        self.name = name
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        for i in tiles:
            if i == path:
                self.x = x - 2
                self.y = y - 2
                self.width = width + 4
                self.height = height + 4


class Long:
    def __init__(self, low: int, high: int):
        self.low = low
        self.high = high
        self.value = (high << 32) ^ (low % (1 << 32))


def decodeResourceUrl(url) -> Long:
    resource_path = re.findall(r"[0-9]+", url)
    if not resource_path:
        return Long(0, 0)
    high = int(resource_path[0], 8)
    low = (
        (int(resource_path[1], 8) << 16)
        | (int(resource_path[2], 8) << 8)
        | (int(resource_path[3], 8))
    )
    return Long(low, high)


def overlayImage(background_image: Image, overlay_image_texture: Texture) -> Image:
    overlay_image_path = os.path.join(
        overlay_image_texture.path, overlay_image_texture.name
    )
    if not os.path.exists(overlay_image_path):
        overlay_image_path = overlay_image_path.replace("jpg", "png")
        if not os.path.exists(overlay_image_path):
            return background_image
    print("\tOverlay [{overlay}]".format(overlay=overlay_image_path))
    overlay_image = Image.open(overlay_image_path)
    overlay_image = overlay_image.resize(
        (overlay_image_texture.width, overlay_image_texture.height)
    )
    background_image.paste(
        overlay_image, (overlay_image_texture.x, overlay_image_texture.y)
    )
    print("\tSuccessful overlay [{overlay}]".format(overlay=overlay_image_path))
    return background_image


def donwload(url: str, path: str):
    image_path = path.replace("atlas.json", url.split("/")[-1])
    print("\tDownload [{url}] to [{path}]".format(url=url, path=image_path))
    img_data = requests.get(url).content
    with open(image_path, "wb") as handler:
        print(
            "\tSuccessful download [{url}] to [{path}]".format(url=url, path=image_path)
        )
        handler.write(img_data)
        return image_path


def parseJSON(path: str):
    with open(path, "r") as j:
        contents = json.loads(j.read())
        meta = {"id": "", "files": []}
        for atlas in contents:
            if "original" in atlas:
                meta["id"] = str(decodeResourceUrl(atlas["original"]).value)
                meta["files"].append(atlas["original"].split("/")[-1])
                image_path = donwload(
                    "https://s.eu.tankionline.com/" + atlas["original"], path
                )
                background_image = Image.open(image_path)
                for i in atlas:
                    if "original" in i:
                        continue
                    for j in atlas[i]:
                        overlay_image = Texture(
                            i,
                            j + ".jpg",
                            atlas[i][j]["x"],
                            atlas[i][j]["y"],
                            atlas[i][j]["width"],
                            atlas[i][j]["height"],
                        )
                        background_image = overlayImage(background_image, overlay_image)
                background_image.save(image_path)
        with open(path.replace("atlas.json", "meta.json"), "w") as outfile:
            outfile.write(json.dumps(meta))


for dirpath, dirnames, filenames in os.walk(os.getcwd()):
    for file in filenames:
        if file == "atlas.json":
            #thread = Thread(target = parseJSON, args = (os.path.join(dirpath, file),))
            #thread.start()
            parseJSON(os.path.join(dirpath, file))