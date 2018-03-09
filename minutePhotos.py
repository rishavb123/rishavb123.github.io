import cv2
import os
from firebase import firebase
import base64

firebase = firebase.FirebaseApplication('https://livecamera-f2816.firebaseio.com')

cam = cv2.VideoCapture(0)


def getphoto():
    tf, frame = cam.read()
    if not tf:
        return tf
    return frame


def gitpush(message):
    os.system('git pull')
    os.system('git add -A')
    os.system('git commit -m "'+message+'"')
    os.system('git push')


def save(img):
    cv2.imwrite('minutePhotos/contents/image.jpg', img)


while True:
    save(getphoto())
    enc = base64.b64encode(open('minutePhotos/contents/image.jpg', 'rb').read())
    firebase.put('', "data", enc)
