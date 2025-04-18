#!/usr/bin/env python3

from flask import Flask, request, Response
import requests
import json
from bs4 import BeautifulSoup
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route("/social/xiaohongshu", methods=["GET"])
def xiaohongshu():

    id = request.args.get('id')
    if not id:
        try:
            req_body = request.get_json()
        except ValueError:
            pass
        else:
            id = req_body.get('id')

    if not id:
        return Response(
                "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.",
                status_code=200
            )

    # parsing html from a website
    url = "https://www.xiaohongshu.com/user/profile/" + id

    # set header with browser user agent
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    }
    # set cookie in request header with value 123456

    cookies = {
        "abRequestId": "46f387bc6abee2247b51c8816926d081",
        "a1": "190ce8c2e373fmioe6lmcbi0y41e9u7l77nh1cur930000351275",
        "webId": "46f387bc6abee2247b51c8816926d081",
        "gid": "yj8SdYSqdWWqyj8SdYSJdWS7qWqi63ldK16SIFjD38v4yxq8dj7W1y888q2yJW28jqJSWiYS",
        "web_session": "040069797fbf329d61ff1c14f7374b7d300fb5",
        "customerClientId": "403382239079440",
        "customer-sso-sid": "65d24f4cff00000000000005",
        "x-user-id-creator.xiaohongshu.com": "5a383acf4eacab7b12c731a9",
        "access-token-creator.xiaohongshu.com": "customer.ares.AT-81981ea6cb4b4263aad1172477327981-23ec2418d1e24249b73078615e60c70c",
        "webBuild": "4.26.0",
        "cache_feeds": "[]",
        "xsecappid": "xhs-pc-web",
        "unread": "{\"ub\":\"2264815d3e0000000027010499\",\"ue\":\"226426b95d0000000014024207\",\"uc\":10}",
        "websectiga": "6169c1e84f393779a5f7de7303038f3b47a78e47be716e7bec57ccce17d45f99",
        "sec_poison_id": "91736cb5-5d4c-4446-8f63-31a56f89a29e",
        "acw_tc": "2a91d02a1d89c0e57814a0322b53f7cc164f53a414cbe277aab697556d3b3835",
        "web_session": "030037a1afc60b0bc49133d4e4214a99667d2e"
    }

    response = requests.get(url, cookies=cookies, headers=headers)
    with open("local_page.html", "wb") as f:
        f.write(response.content)

    with open("local_page.html", "rb") as f:
        soup = BeautifulSoup(f.read(), "html.parser")

    content = soup.select("script")[14].string

    # find activeTabKey and userPageData from the content
    userPageData = content.find("userPageData")
    activeTabKey = content.find("activeTabKey")

    # find the json with key userPageData before next key activeTabKey
    contentJsonStr = content[userPageData + 14:activeTabKey-2]

    # get property user.userPageData.value from json string
    contentJson = json.loads(contentJsonStr)

    return Response(json.dumps(contentJson["interactions"][1]), status=200, mimetype="application/json")