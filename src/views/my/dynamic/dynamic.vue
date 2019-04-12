<template>
    <!-- <div class="dynamic">

         <cube-recycle-list class="list" :size="size" :on-fetch="onFetch" :offset="offset">
    
    <template slot="item" slot-scope="{ data }">
      <div :id="data.id" class="item" @click="handleClick(data)">
            <div class="header">
                <div class="avatar">
                    <img class="image" :src="data.headImg">
                </div>
                <div class="name">{{data.cardName}}</div>
            </div>
        <div class="bubble">
          <p>{{ data.msg }}</p>
          <div class="meta">
            <time class="posted-date">{{ data.time }}</time>
          </div>
        </div>
      </div>
    </template>
  </cube-recycle-list> 
</div> -->
    <div>
        <div class="dynamic">
            <!-- 111 -->
            <!-- <template slot="item" slot-scope="{ data }"> -->
            <div class="dynamic-box" v-for="(item,index) in list">
                <div class="header">
                    <div class="avatar">
                        <img class="image" :src="item.headImg" mode=""></img>
                    </div>
                    <div class="name">{{item.cardName}}</div>
                </div>
                <div class="text-content" v-if="item.multimediaList.length <= 1">
                    {{item.content}}
                </div>
                <div class="img-contents" v-if="item.multimediaList.length > 1">
                    <div class="imgs">
                        <img :src="subitem.multimediaUrl" mode="" v-for="(subitem, subindex) in item.multimediaList"
                             class="image"></img>
                    </div>
                </div>
                <div class="img-content" v-if="item.multimediaList.length == 1">
                    <div class="img">
                        <video v-if="item.multimediaList[0].multimediaType == 2"
                               :src="item.multimediaList[0].multimediaUrl" controls></video>
                        <img v-if="item.multimediaList[0].multimediaType == 1"
                             :src="item.multimediaList[0].multimediaUrl" mode="" class="image"></img>
                    </div>
                </div>
                <div class="img-content" v-if="item.goodsImg">
                    <div class="img">
                        <img :src="item.goodsImg" mode="" class="image"></img>
                    </div>
                    <div class="content">
                        <div style="margin-bottom: .625rem;">{{item.goodsName}}</div>
                        <div style="color: rgba(255, 111, 89, 1);">¥ {{item.goodsPrice}}</div>
                    </div>
                </div>
                <div class="handler">
                    <div class="time">刚刚</div>
                    <div class="btn">
                        <div class="btn-box" :class="{show: item.isshow}">
                            <form report-submit="true" @submit="praiseSubmit">
                                <button class="like" plain formType="submit">
                                    <!-- <uni-icon :class="{isPraise: item.isPraise}" class="iconfont iconmoment_like"></uni-icon> -->
                                    {{item.isPraise ? '取消' : '赞'}}
                                </button>
                            </form>
                            <div class="comment" @tap="comment(item)">
                                <!-- <uni-icon type="" class="iconfont iconmoment_message"></uni-icon> -->
                                评论
                            </div>
                        </div>
                        <!-- <uni-icon class="iconfont iconmoment_interact" @tap="spand(item)"></uni-icon> -->
                    </div>
                </div><!---->
                <div class="comment" v-if="item.praiseText || item.commentList.length>0">
                    <div class="like-box" v-if="item.praiseText">
                        <!-- <uni-icon type="" class="iconfont iconmoment_like"></uni-icon> -->
                        <span>{{item.praiseText}}</span>
                    </div>
                    <div class="list" v-if="item.commentList.length>0">
                        <div @click="commentOther(item, commetItem)" class="item"
                             v-for="(commetItem, commentIndex) in item.commentList">
                            <span class="self">{{commetItem.cardName}}</span>
                            <span v-if="commetItem.beforeCardName"><span>&nbsp;回复</span>&nbsp; </span>
                            <span v-if="commetItem.beforeCardName" class="self">{{commetItem.beforeCardName}}</span>
                            <span class="item-content">：{{commetItem.comment}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!---->
            <form report-submit="true" @submit="formSubmit">
                <div class="input-box" v-if="focus">
                    <textarea @input="bindInput" :show-confirm-bar="false" fixed @blur="bindTextAreaBlur" :focus="focus"
                              auto-height cursor-spacing="10" :value="input" placeholder=""/>
                    <button class="sendbtn" plain formType="submit" :disabled="!input">
                        <uni-icon :class="{canSubmit: input}" class="iconfont iconcard_play"></uni-icon>
                    </button>
                </div>
            </form>
            <div class="no-data" v-if="nodata">
                <text>- The End -</text>
            </div>

        </div>
        <div class="addbutton">
            <cube-button @click="addDynamic">发布动态</cube-button>
        </div>
    </div>
    <!-- </template> -->


</template>
<script>
    const data = [{
        "cardName": "邹景",
        "commentList": [{
            "beforeCardId": null,
            "beforeCardName": "",
            "cardId": 3,
            "cardName": "邹景",
            "comment": "",
            "commentId": null,
            "createTime": 1553863849000,
            "dynamicId": 11,
            "id": 9
        },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "",
                "commentId": null,
                "createTime": 1553863946000,
                "dynamicId": 11,
                "id": 10
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "",
                "commentId": null,
                "createTime": 1553863993000,
                "dynamicId": 11,
                "id": 11
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "",
                "commentId": null,
                "createTime": 1553864147000,
                "dynamicId": 11,
                "id": 12
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "",
                "commentId": null,
                "createTime": 1553864190000,
                "dynamicId": 11,
                "id": 13
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "",
                "commentId": null,
                "createTime": 1553864240000,
                "dynamicId": 11,
                "id": 14
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "",
                "commentId": null,
                "createTime": 1553864279000,
                "dynamicId": 11,
                "id": 15
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "1",
                "commentId": null,
                "createTime": 1553864285000,
                "dynamicId": 11,
                "id": 16
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "",
                "commentId": null,
                "createTime": 1553864363000,
                "dynamicId": 11,
                "id": 17
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "",
                "commentId": null,
                "createTime": 1553864364000,
                "dynamicId": 11,
                "id": 18
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "",
                "commentId": null,
                "createTime": 1553864365000,
                "dynamicId": 11,
                "id": 19
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "",
                "commentId": null,
                "createTime": 1553864365000,
                "dynamicId": 11,
                "id": 20
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "a",
                "commentId": null,
                "createTime": 1553864730000,
                "dynamicId": 11,
                "id": 21
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsadsa",
                "commentId": null,
                "createTime": 1553864768000,
                "dynamicId": 11,
                "id": 22
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsadsadsadsadsa",
                "commentId": null,
                "createTime": 1553864781000,
                "dynamicId": 11,
                "id": 23
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsadsadsa",
                "commentId": null,
                "createTime": 1553864817000,
                "dynamicId": 11,
                "id": 24
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "我曹你大爷",
                "commentId": null,
                "createTime": 1553865162000,
                "dynamicId": 11,
                "id": 25
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "嬲嗯个之",
                "commentId": null,
                "createTime": 1553865343000,
                "dynamicId": 11,
                "id": 26
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "789789798",
                "commentId": null,
                "createTime": 1553865397000,
                "dynamicId": 11,
                "id": 27
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "fds",
                "commentId": null,
                "createTime": 1553865537000,
                "dynamicId": 11,
                "id": 28
            },
            {
                "beforeCardId": 3,
                "beforeCardName": "邹景",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsadsa",
                "commentId": 23,
                "createTime": 1553866573000,
                "dynamicId": 11,
                "id": 31
            },
            {
                "beforeCardId": 3,
                "beforeCardName": "邹景",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "好\n",
                "commentId": 17,
                "createTime": 1553866956000,
                "dynamicId": 11,
                "id": 33
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "密码",
                "commentId": null,
                "createTime": 1553867032000,
                "dynamicId": 11,
                "id": 36
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "阿",
                "commentId": null,
                "createTime": 1553867060000,
                "dynamicId": 11,
                "id": 37
            },
            {
                "beforeCardId": 3,
                "beforeCardName": "邹景",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsadsa",
                "commentId": 31,
                "createTime": 1553867070000,
                "dynamicId": 11,
                "id": 38
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "哈哈",
                "commentId": null,
                "createTime": 1553867394000,
                "dynamicId": 11,
                "id": 39
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "嘻嘻",
                "commentId": null,
                "createTime": 1553867400000,
                "dynamicId": 11,
                "id": 40
            },
            {
                "beforeCardId": 3,
                "beforeCardName": "邹景",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "aaa\naa\n",
                "commentId": 16,
                "createTime": 1553867650000,
                "dynamicId": 11,
                "id": 42
            },
            {
                "beforeCardId": 3,
                "beforeCardName": "邹景",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "嘻嘻",
                "commentId": 23,
                "createTime": 1553867697000,
                "dynamicId": 11,
                "id": 43
            },
            {
                "beforeCardId": 3,
                "beforeCardName": "邹景",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "测试",
                "commentId": 19,
                "createTime": 1553867721000,
                "dynamicId": 11,
                "id": 44
            },
            {
                "beforeCardId": 3,
                "beforeCardName": "邹景",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsa",
                "commentId": 16,
                "createTime": 1553868256000,
                "dynamicId": 11,
                "id": 46
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsadsadasdsadasdsadasdasdasdasdasdasdasdasdasdasdas",
                "commentId": null,
                "createTime": 1553868272000,
                "dynamicId": 11,
                "id": 47
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "",
                "commentId": null,
                "createTime": 1553870217000,
                "dynamicId": 11,
                "id": 54
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsadsadas",
                "commentId": null,
                "createTime": 1553870331000,
                "dynamicId": 11,
                "id": 55
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "",
                "commentId": null,
                "createTime": 1553870376000,
                "dynamicId": 11,
                "id": 56
            },
            {
                "beforeCardId": 3,
                "beforeCardName": "邹景",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsadsadsa",
                "commentId": 18,
                "createTime": 1553870538000,
                "dynamicId": 11,
                "id": 57
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsadsadsadsa",
                "commentId": null,
                "createTime": 1553870551000,
                "dynamicId": 11,
                "id": 58
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsadsa",
                "commentId": null,
                "createTime": 1553870628000,
                "dynamicId": 11,
                "id": 59
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "",
                "commentId": null,
                "createTime": 1553872346000,
                "dynamicId": 11,
                "id": 61
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "具体",
                "commentId": null,
                "createTime": 1553873878000,
                "dynamicId": 11,
                "id": 64
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "GPRS",
                "commentId": null,
                "createTime": 1553873883000,
                "dynamicId": 11,
                "id": 65
            },
            {
                "beforeCardId": 3,
                "beforeCardName": "邹景",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "ISP",
                "commentId": 65,
                "createTime": 1553873896000,
                "dynamicId": 11,
                "id": 66
            },
            {
                "beforeCardId": 3,
                "beforeCardName": "邹景",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "叭叭叭",
                "commentId": 65,
                "createTime": 1553873923000,
                "dynamicId": 11,
                "id": 67
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "名明明",
                "commentId": null,
                "createTime": 1554007609000,
                "dynamicId": 11,
                "id": 71
            },
            {
                "beforeCardId": 3,
                "beforeCardName": "邹景",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "123",
                "commentId": 71,
                "createTime": 1554009756000,
                "dynamicId": 11,
                "id": 73
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "你们都",
                "commentId": null,
                "createTime": 1554058540000,
                "dynamicId": 11,
                "id": 74
            },
            {
                "beforeCardId": 3,
                "beforeCardName": "邹景",
                "cardId": 20,
                "cardName": "龙前",
                "comment": "回复评论",
                "commentId": 66,
                "createTime": 1554255744000,
                "dynamicId": 11,
                "id": 1
            },
            {
                "beforeCardId": 3,
                "beforeCardName": "邹景",
                "cardId": 20,
                "cardName": "龙前",
                "comment": "回复回复夫妇",
                "commentId": 55,
                "createTime": 1554255762000,
                "dynamicId": 11,
                "id": 2
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 20,
                "cardName": "龙前",
                "comment": "不错不错不错",
                "commentId": null,
                "createTime": 1554255803000,
                "dynamicId": 11,
                "id": 3
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "ccccccccccccc",
                "commentId": null,
                "createTime": 1554257429000,
                "dynamicId": 11,
                "id": 76
            },
            {
                "beforeCardId": 20,
                "beforeCardName": "龙前",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "cccccccccccc",
                "commentId": 1,
                "createTime": 1554257435000,
                "dynamicId": 11,
                "id": 77
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "ccccccccccccccccc",
                "commentId": null,
                "createTime": 1554257439000,
                "dynamicId": 11,
                "id": 78
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "cccs",
                "commentId": null,
                "createTime": 1554257452000,
                "dynamicId": 11,
                "id": 79
            },
            {
                "beforeCardId": 20,
                "beforeCardName": "龙前",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "cs",
                "commentId": 2,
                "createTime": 1554257458000,
                "dynamicId": 11,
                "id": 80
            },
            {
                "beforeCardId": 20,
                "beforeCardName": "龙前",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "cds",
                "commentId": 3,
                "createTime": 1554257461000,
                "dynamicId": 11,
                "id": 81
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "ds",
                "commentId": null,
                "createTime": 1554257466000,
                "dynamicId": 11,
                "id": 82
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "asaa",
                "commentId": null,
                "createTime": 1554257564000,
                "dynamicId": 11,
                "id": 83
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "sssss",
                "commentId": null,
                "createTime": 1554257569000,
                "dynamicId": 11,
                "id": 84
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "",
                "commentId": null,
                "createTime": 1554257783000,
                "dynamicId": 11,
                "id": 85
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "123654",
                "commentId": null,
                "createTime": 1554257809000,
                "dynamicId": 11,
                "id": 86
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "321",
                "commentId": null,
                "createTime": 1554257830000,
                "dynamicId": 11,
                "id": 87
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "qqqqqqqqqq",
                "commentId": null,
                "createTime": 1554257971000,
                "dynamicId": 11,
                "id": 88
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "wwwwwwwwwwwww",
                "commentId": null,
                "createTime": 1554257980000,
                "dynamicId": 11,
                "id": 89
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "eeeeeeeeeeee",
                "commentId": null,
                "createTime": 1554257984000,
                "dynamicId": 11,
                "id": 90
            },
            {
                "beforeCardId": 20,
                "beforeCardName": "龙前",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "eeeeeeeeeeeeee",
                "commentId": 3,
                "createTime": 1554257990000,
                "dynamicId": 11,
                "id": 91
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "ewww",
                "commentId": null,
                "createTime": 1554257995000,
                "dynamicId": 11,
                "id": 92
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "wwwwww",
                "commentId": null,
                "createTime": 1554258005000,
                "dynamicId": 11,
                "id": 93
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "wwwww",
                "commentId": null,
                "createTime": 1554258010000,
                "dynamicId": 11,
                "id": 94
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "sss",
                "commentId": null,
                "createTime": 1554258051000,
                "dynamicId": 11,
                "id": 98
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "ssd",
                "commentId": null,
                "createTime": 1554258061000,
                "dynamicId": 11,
                "id": 99
            },
            {
                "beforeCardId": 20,
                "beforeCardName": "龙前",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dasds",
                "commentId": 3,
                "createTime": 1554258067000,
                "dynamicId": 11,
                "id": 100
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsads",
                "commentId": null,
                "createTime": 1554258070000,
                "dynamicId": 11,
                "id": 101
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsadsa",
                "commentId": null,
                "createTime": 1554258089000,
                "dynamicId": 11,
                "id": 102
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsa",
                "commentId": null,
                "createTime": 1554258092000,
                "dynamicId": 11,
                "id": 103
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsa",
                "commentId": null,
                "createTime": 1554258104000,
                "dynamicId": 11,
                "id": 104
            },
            {
                "beforeCardId": 20,
                "beforeCardName": "龙前",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsadsa",
                "commentId": 3,
                "createTime": 1554258117000,
                "dynamicId": 11,
                "id": 105
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dasdsa",
                "commentId": null,
                "createTime": 1554258260000,
                "dynamicId": 11,
                "id": 106
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "sada",
                "commentId": null,
                "createTime": 1554258300000,
                "dynamicId": 11,
                "id": 107
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsa",
                "commentId": null,
                "createTime": 1554258318000,
                "dynamicId": 11,
                "id": 108
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "ddd",
                "commentId": null,
                "createTime": 1554258323000,
                "dynamicId": 11,
                "id": 109
            },
            {
                "beforeCardId": 20,
                "beforeCardName": "龙前",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dddd",
                "commentId": 1,
                "createTime": 1554258331000,
                "dynamicId": 11,
                "id": 110
            },
            {
                "beforeCardId": 20,
                "beforeCardName": "龙前",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dd",
                "commentId": 1,
                "createTime": 1554258359000,
                "dynamicId": 11,
                "id": 111
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "aa\naa",
                "commentId": null,
                "createTime": 1554258441000,
                "dynamicId": 11,
                "id": 112
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "as",
                "commentId": null,
                "createTime": 1554258448000,
                "dynamicId": 11,
                "id": 113
            },
            {
                "beforeCardId": 20,
                "beforeCardName": "龙前",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "aa\nass",
                "commentId": 3,
                "createTime": 1554258460000,
                "dynamicId": 11,
                "id": 114
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsad",
                "commentId": null,
                "createTime": 1554258467000,
                "dynamicId": 11,
                "id": 115
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 20,
                "cardName": "龙前",
                "comment": "哈哈",
                "commentId": null,
                "createTime": 1554258565000,
                "dynamicId": 11,
                "id": 116
            },
            {
                "beforeCardId": 20,
                "beforeCardName": "龙前",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "123",
                "commentId": 116,
                "createTime": 1554258592000,
                "dynamicId": 11,
                "id": 117
            },
            {
                "beforeCardId": 3,
                "beforeCardName": "邹景",
                "cardId": 20,
                "cardName": "龙前",
                "comment": "椅子",
                "commentId": 117,
                "createTime": 1554258604000,
                "dynamicId": 11,
                "id": 118
            },
            {
                "beforeCardId": 20,
                "beforeCardName": "龙前",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "456",
                "commentId": 118,
                "createTime": 1554258626000,
                "dynamicId": 11,
                "id": 119
            },
            {
                "beforeCardId": 3,
                "beforeCardName": "邹景",
                "cardId": 20,
                "cardName": "龙前",
                "comment": "11111",
                "commentId": 115,
                "createTime": 1554258829000,
                "dynamicId": 11,
                "id": 120
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 20,
                "cardName": "龙前",
                "comment": "啊啊啊",
                "commentId": null,
                "createTime": 1554258835000,
                "dynamicId": 11,
                "id": 121
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 20,
                "cardName": "龙前",
                "comment": "爸爸",
                "commentId": null,
                "createTime": 1554258845000,
                "dynamicId": 11,
                "id": 122
            },
            {
                "beforeCardId": 3,
                "beforeCardName": "邹景",
                "cardId": 20,
                "cardName": "龙前",
                "comment": "哈哈",
                "commentId": 119,
                "createTime": 1554258852000,
                "dynamicId": 11,
                "id": 123
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 20,
                "cardName": "龙前",
                "comment": "哈",
                "commentId": null,
                "createTime": 1554258996000,
                "dynamicId": 11,
                "id": 124
            },
            {
                "beforeCardId": 20,
                "beforeCardName": "龙前",
                "cardId": 17,
                "cardName": "v",
                "comment": "不",
                "commentId": 124,
                "createTime": 1554259704000,
                "dynamicId": 11,
                "id": 125
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 17,
                "cardName": "v",
                "comment": "ｕ",
                "commentId": null,
                "createTime": 1554259719000,
                "dynamicId": 11,
                "id": 126
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsadsa\n",
                "commentId": null,
                "createTime": 1554280795000,
                "dynamicId": 11,
                "id": 131
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsawwwww",
                "commentId": null,
                "createTime": 1554280831000,
                "dynamicId": 11,
                "id": 132
            },
            {
                "beforeCardId": 17,
                "beforeCardName": "v",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dswsxw",
                "commentId": 125,
                "createTime": 1554280839000,
                "dynamicId": 11,
                "id": 133
            },
            {
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "啊哈哈\n哈哈",
                "commentId": null,
                "createTime": 1554446856000,
                "dynamicId": 11,
                "id": 135
            }
        ],
        "content": "",
        "createTime": 1553830491000,
        "goodsImg": "https://img.hrsugaphre.com/userHead/T1.jpg",
        "goodsName": "上新商品啦",
        "goodsPrice": 88,
        "headImg": "https://img.hrsugaphre.com/userHead/3311E8B49107456DBF0BFA348146EEE9.png",
        "id": 11,
        "isPraise": 1,
        "multimediaList": [],
        "praiseList": [{
            "cardId": 20,
            "cardName": "龙前",
            "dynamicId": 11,
            "id": 40
        },
            {
                "cardId": 17,
                "cardName": "v",
                "dynamicId": 11,
                "id": 48
            },
            {
                "cardId": 3,
                "cardName": "邹景",
                "dynamicId": 11,
                "id": 62
            }
        ],
        "serviceDate": null,
        "type": "2",
        "typeId": 33
    },
        {
            "cardName": "邹景",
            "commentList": [{
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dasdsa",
                "commentId": null,
                "createTime": 1553865851000,
                "dynamicId": 10,
                "id": 29
            },
                {
                    "beforeCardId": 3,
                    "beforeCardName": "邹景",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "你个大傻逼",
                    "commentId": 29,
                    "createTime": 1553866797000,
                    "dynamicId": 10,
                    "id": 32
                },
                {
                    "beforeCardId": null,
                    "beforeCardName": "",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "dsadasdsa",
                    "commentId": null,
                    "createTime": 1553868177000,
                    "dynamicId": 10,
                    "id": 45
                },
                {
                    "beforeCardId": 3,
                    "beforeCardName": "邹景",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "fdsa",
                    "commentId": 45,
                    "createTime": 1553868407000,
                    "dynamicId": 10,
                    "id": 48
                },
                {
                    "beforeCardId": null,
                    "beforeCardName": "",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "4567913",
                    "commentId": null,
                    "createTime": 1553869984000,
                    "dynamicId": 10,
                    "id": 53
                },
                {
                    "beforeCardId": 3,
                    "beforeCardName": "邹景",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "哈哈",
                    "commentId": 53,
                    "createTime": 1554004865000,
                    "dynamicId": 10,
                    "id": 70
                },
                {
                    "beforeCardId": 3,
                    "beforeCardName": "邹景",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "哈哈",
                    "commentId": 70,
                    "createTime": 1554007619000,
                    "dynamicId": 10,
                    "id": 72
                },
                {
                    "beforeCardId": null,
                    "beforeCardName": "",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "77777777777777",
                    "commentId": null,
                    "createTime": 1554102204000,
                    "dynamicId": 10,
                    "id": 75
                },
                {
                    "beforeCardId": null,
                    "beforeCardName": "",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "aaaaa",
                    "commentId": null,
                    "createTime": 1554258040000,
                    "dynamicId": 10,
                    "id": 95
                },
                {
                    "beforeCardId": null,
                    "beforeCardName": "",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "aaaa",
                    "commentId": null,
                    "createTime": 1554258043000,
                    "dynamicId": 10,
                    "id": 96
                },
                {
                    "beforeCardId": null,
                    "beforeCardName": "",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "aaa",
                    "commentId": null,
                    "createTime": 1554258047000,
                    "dynamicId": 10,
                    "id": 97
                },
                {
                    "beforeCardId": 3,
                    "beforeCardName": "邹景",
                    "cardId": 17,
                    "cardName": "v",
                    "comment": "这",
                    "commentId": 72,
                    "createTime": 1554259731000,
                    "dynamicId": 10,
                    "id": 127
                },
                {
                    "beforeCardId": 17,
                    "beforeCardName": "v",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "哈哈\n\n",
                    "commentId": 127,
                    "createTime": 1554307295000,
                    "dynamicId": 10,
                    "id": 134
                }
            ],
            "content": "视频动态",
            "createTime": 1553830322000,
            "goodsImg": "",
            "goodsName": "",
            "goodsPrice": null,
            "headImg": "https://img.hrsugaphre.com/userHead/3311E8B49107456DBF0BFA348146EEE9.png",
            "id": 10,
            "isPraise": 1,
            "multimediaList": [{
                "dynamicId": 10,
                "id": 28,
                "multimediaType": "2",
                "multimediaUrl": "https://img.hrsugaphre.com/huaren/logo/sp.mp4",
                "sort": 1
            }],
            "praiseList": [{
                "cardId": 17,
                "cardName": "v",
                "dynamicId": 10,
                "id": 49
            },
                {
                    "cardId": 3,
                    "cardName": "邹景",
                    "dynamicId": 10,
                    "id": 57
                }
            ],
            "serviceDate": 1554879077579,
            "type": "1",
            "typeId": null
        },
        {
            "cardName": "邹景",
            "commentList": [{
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "789465",
                "commentId": null,
                "createTime": 1553865859000,
                "dynamicId": 9,
                "id": 30
            },
                {
                    "beforeCardId": null,
                    "beforeCardName": "",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "哈哈",
                    "commentId": null,
                    "createTime": 1553867454000,
                    "dynamicId": 9,
                    "id": 41
                },
                {
                    "beforeCardId": null,
                    "beforeCardName": "",
                    "cardId": 17,
                    "cardName": "v",
                    "comment": "不",
                    "commentId": null,
                    "createTime": 1554259743000,
                    "dynamicId": 9,
                    "id": 128
                }
            ],
            "content": "9张图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态",
            "createTime": 1553830245000,
            "goodsImg": "",
            "goodsName": "",
            "goodsPrice": null,
            "headImg": "https://img.hrsugaphre.com/userHead/3311E8B49107456DBF0BFA348146EEE9.png",
            "id": 9,
            "isPraise": 1,
            "multimediaList": [{
                "dynamicId": 9,
                "id": 19,
                "multimediaType": "1",
                "multimediaUrl": "https://img.hrsugaphre.com/userHead/T1.jpg",
                "sort": 1
            },
                {
                    "dynamicId": 9,
                    "id": 20,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/t2.jpg",
                    "sort": 2
                },
                {
                    "dynamicId": 9,
                    "id": 21,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/T1.jpg",
                    "sort": 3
                },
                {
                    "dynamicId": 9,
                    "id": 22,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/t2.jpg",
                    "sort": 4
                },
                {
                    "dynamicId": 9,
                    "id": 23,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/T1.jpg",
                    "sort": 5
                },
                {
                    "dynamicId": 9,
                    "id": 24,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/t2.jpg",
                    "sort": 6
                },
                {
                    "dynamicId": 9,
                    "id": 25,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/T1.jpg",
                    "sort": 7
                },
                {
                    "dynamicId": 9,
                    "id": 26,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/t2.jpg",
                    "sort": 8
                },
                {
                    "dynamicId": 9,
                    "id": 27,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/t2.jpg",
                    "sort": 9
                }
            ],
            "praiseList": [{
                "cardId": 17,
                "cardName": "v",
                "dynamicId": 9,
                "id": 50
            },
                {
                    "cardId": 3,
                    "cardName": "邹景",
                    "dynamicId": 9,
                    "id": 59
                }
            ],
            "serviceDate": null,
            "type": "1",
            "typeId": null
        },
        {
            "cardName": "邹景",
            "commentList": [],
            "content": "8张图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态",
            "createTime": 1553830236000,
            "goodsImg": "",
            "goodsName": "",
            "goodsPrice": null,
            "headImg": "https://img.hrsugaphre.com/userHead/3311E8B49107456DBF0BFA348146EEE9.png",
            "id": 8,
            "isPraise": 1,
            "multimediaList": [{
                "dynamicId": 8,
                "id": 11,
                "multimediaType": "1",
                "multimediaUrl": "https://img.hrsugaphre.com/userHead/T1.jpg",
                "sort": 1
            },
                {
                    "dynamicId": 8,
                    "id": 12,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/t2.jpg",
                    "sort": 2
                },
                {
                    "dynamicId": 8,
                    "id": 13,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/T1.jpg",
                    "sort": 3
                },
                {
                    "dynamicId": 8,
                    "id": 14,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/t2.jpg",
                    "sort": 4
                },
                {
                    "dynamicId": 8,
                    "id": 15,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/T1.jpg",
                    "sort": 5
                },
                {
                    "dynamicId": 8,
                    "id": 16,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/t2.jpg",
                    "sort": 6
                },
                {
                    "dynamicId": 8,
                    "id": 17,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/T1.jpg",
                    "sort": 7
                },
                {
                    "dynamicId": 8,
                    "id": 18,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/t2.jpg",
                    "sort": 8
                }
            ],
            "praiseList": [{
                "cardId": 17,
                "cardName": "v",
                "dynamicId": 8,
                "id": 51
            },
                {
                    "cardId": 3,
                    "cardName": "邹景",
                    "dynamicId": 8,
                    "id": 60
                }
            ],
            "serviceDate": null,
            "type": "1",
            "typeId": null
        },
        {
            "cardName": "邹景",
            "commentList": [{
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "你",
                "commentId": null,
                "createTime": 1554477882000,
                "dynamicId": 7,
                "id": 136
            }],
            "content": "4张图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态",
            "createTime": 1553830215000,
            "goodsImg": "",
            "goodsName": "",
            "goodsPrice": null,
            "headImg": "https://img.hrsugaphre.com/userHead/3311E8B49107456DBF0BFA348146EEE9.png",
            "id": 7,
            "isPraise": 1,
            "multimediaList": [{
                "dynamicId": 7,
                "id": 7,
                "multimediaType": "1",
                "multimediaUrl": "https://img.hrsugaphre.com/userHead/T1.jpg",
                "sort": 1
            },
                {
                    "dynamicId": 7,
                    "id": 8,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/t2.jpg",
                    "sort": 2
                },
                {
                    "dynamicId": 7,
                    "id": 9,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/T1.jpg",
                    "sort": 3
                },
                {
                    "dynamicId": 7,
                    "id": 10,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/t2.jpg",
                    "sort": 4
                }
            ],
            "praiseList": [{
                "cardId": 17,
                "cardName": "v",
                "dynamicId": 7,
                "id": 52
            },
                {
                    "cardId": 3,
                    "cardName": "邹景",
                    "dynamicId": 7,
                    "id": 63
                }
            ],
            "serviceDate": null,
            "type": "1",
            "typeId": null
        },
        {
            "cardName": "邹景",
            "commentList": [{
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "哈哈",
                "commentId": null,
                "createTime": 1553870779000,
                "dynamicId": 6,
                "id": 60
            },
                {
                    "beforeCardId": 3,
                    "beforeCardName": "邹景",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "123",
                    "commentId": 60,
                    "createTime": 1554004781000,
                    "dynamicId": 6,
                    "id": 68
                },
                {
                    "beforeCardId": 3,
                    "beforeCardName": "邹景",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "",
                    "commentId": 60,
                    "createTime": 1554004803000,
                    "dynamicId": 6,
                    "id": 69
                },
                {
                    "beforeCardId": null,
                    "beforeCardName": "",
                    "cardId": 20,
                    "cardName": "龙前",
                    "comment": "哈哈哈",
                    "commentId": null,
                    "createTime": 1554868091000,
                    "dynamicId": 6,
                    "id": 137
                },
                {
                    "beforeCardId": null,
                    "beforeCardName": "",
                    "cardId": 20,
                    "cardName": "龙前",
                    "comment": "啊啊啊",
                    "commentId": null,
                    "createTime": 1554868099000,
                    "dynamicId": 6,
                    "id": 138
                },
                {
                    "beforeCardId": 3,
                    "beforeCardName": "邹景",
                    "cardId": 20,
                    "cardName": "龙前",
                    "comment": "呃呃呃",
                    "commentId": 69,
                    "createTime": 1554868104000,
                    "dynamicId": 6,
                    "id": 139
                }
            ],
            "content": "2张图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态",
            "createTime": 1553830206000,
            "goodsImg": "",
            "goodsName": "",
            "goodsPrice": null,
            "headImg": "https://img.hrsugaphre.com/userHead/3311E8B49107456DBF0BFA348146EEE9.png",
            "id": 6,
            "isPraise": 1,
            "multimediaList": [{
                "dynamicId": 6,
                "id": 5,
                "multimediaType": "1",
                "multimediaUrl": "https://img.hrsugaphre.com/userHead/T1.jpg",
                "sort": 1
            },
                {
                    "dynamicId": 6,
                    "id": 6,
                    "multimediaType": "1",
                    "multimediaUrl": "https://img.hrsugaphre.com/userHead/t2.jpg",
                    "sort": 2
                }
            ],
            "praiseList": [{
                "cardId": 3,
                "cardName": "邹景",
                "dynamicId": 6,
                "id": 12
            },
                {
                    "cardId": 17,
                    "cardName": "v",
                    "dynamicId": 6,
                    "id": 53
                },
                {
                    "cardId": 20,
                    "cardName": "龙前",
                    "dynamicId": 6,
                    "id": 64
                }
            ],
            "serviceDate": null,
            "type": "1",
            "typeId": null
        },
        {
            "cardName": "邹景",
            "commentList": [{
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "dsadsa",
                "commentId": null,
                "createTime": 1553873719000,
                "dynamicId": 5,
                "id": 62
            },
                {
                    "beforeCardId": null,
                    "beforeCardName": "",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "dsadsadsa",
                    "commentId": null,
                    "createTime": 1553873747000,
                    "dynamicId": 5,
                    "id": 63
                }
            ],
            "content": "1张图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态图片动态",
            "createTime": 1553830194000,
            "goodsImg": "",
            "goodsName": "",
            "goodsPrice": null,
            "headImg": "https://img.hrsugaphre.com/userHead/3311E8B49107456DBF0BFA348146EEE9.png",
            "id": 5,
            "isPraise": 1,
            "multimediaList": [{
                "dynamicId": 5,
                "id": 4,
                "multimediaType": "1",
                "multimediaUrl": "https://img.hrsugaphre.com/userHead/T1.jpg",
                "sort": 1
            }],
            "praiseList": [{
                "cardId": 3,
                "cardName": "邹景",
                "dynamicId": 5,
                "id": 10
            },
                {
                    "cardId": 17,
                    "cardName": "v",
                    "dynamicId": 5,
                    "id": 54
                }
            ],
            "serviceDate": null,
            "type": "1",
            "typeId": null
        },
        {
            "cardName": "邹景",
            "commentList": [{
                "beforeCardId": null,
                "beforeCardName": "",
                "cardId": 3,
                "cardName": "邹景",
                "comment": "叭叭叭",
                "commentId": null,
                "createTime": 1553866992000,
                "dynamicId": 4,
                "id": 34
            },
                {
                    "beforeCardId": null,
                    "beforeCardName": "",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "呃呃呃",
                    "commentId": null,
                    "createTime": 1553867021000,
                    "dynamicId": 4,
                    "id": 35
                },
                {
                    "beforeCardId": null,
                    "beforeCardName": "",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "嘻嘻",
                    "commentId": null,
                    "createTime": 1553869076000,
                    "dynamicId": 4,
                    "id": 49
                },
                {
                    "beforeCardId": null,
                    "beforeCardName": "",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "哈哈",
                    "commentId": null,
                    "createTime": 1553869082000,
                    "dynamicId": 4,
                    "id": 50
                },
                {
                    "beforeCardId": 3,
                    "beforeCardName": "邹景",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "嘻嘻嘻嘻",
                    "commentId": 50,
                    "createTime": 1553869101000,
                    "dynamicId": 4,
                    "id": 51
                },
                {
                    "beforeCardId": 3,
                    "beforeCardName": "邹景",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "嘻嘻嘻嘻嘻嘻嘻嘻",
                    "commentId": 35,
                    "createTime": 1553869116000,
                    "dynamicId": 4,
                    "id": 52
                },
                {
                    "beforeCardId": null,
                    "beforeCardName": "",
                    "cardId": 20,
                    "cardName": "龙前",
                    "comment": "可以可以可以看",
                    "commentId": null,
                    "createTime": 1554255817000,
                    "dynamicId": 4,
                    "id": 4
                },
                {
                    "beforeCardId": 20,
                    "beforeCardName": "龙前",
                    "cardId": 3,
                    "cardName": "邹景",
                    "comment": "789",
                    "commentId": 4,
                    "createTime": 1554260330000,
                    "dynamicId": 4,
                    "id": 129
                },
                {
                    "beforeCardId": 3,
                    "beforeCardName": "邹景",
                    "cardId": 17,
                    "cardName": "v",
                    "comment": "哈哈哈",
                    "commentId": 129,
                    "createTime": 1554260344000,
                    "dynamicId": 4,
                    "id": 130
                }
            ],
            "content": "动态动态动态动态动态动态动态动态动态动态动态动态动态动态动态动态动态动态动态动态动态动态动态",
            "createTime": 1553829818000,
            "goodsImg": "",
            "goodsName": "",
            "goodsPrice": null,
            "headImg": "https://img.hrsugaphre.com/userHead/3311E8B49107456DBF0BFA348146EEE9.png",
            "id": 4,
            "isPraise": 1,
            "multimediaList": [],
            "praiseList": [{
                "cardId": 17,
                "cardName": "v",
                "dynamicId": 4,
                "id": 55
            },
                {
                    "cardId": 3,
                    "cardName": "邹景",
                    "dynamicId": 4,
                    "id": 61
                }
            ],
            "serviceDate": null,
            "type": "1",
            "typeId": null
        }
    ];
    // export default {
    //   data() {

    //     return {
    //         list:data,
    //       size: 50,
    //       offset: 100
    //     }
    //   },
    //   created(){
    //     console.log(this.list);
    //   },
    //   methods: {
    //     onFetch() {
    //       let items = []
    //       return new Promise((resolve) => {
    //         // 模拟请求 50 条数据，因为 size 设置为 50
    //         // setTimeout(() => {
    //         //   for (let i = 0; i < 50; i++) {
    //         //     items.push({
    //         //       id: i,
    //         //       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/danpliego/128.jpg',
    //         //       msg: '123',
    //         //       time: 'Thu Oct 25 2018 15:02:12 GMT+0800 (中国标准时间)'
    //         //     })
    //         //   }
    //         console.log(this.list);
    //           resolve(this.list)
    //         // }, 1000)
    //       })
    //     },
    //     handleClick(data) {
    //       console.log('Item:' + data)
    //     }
    //   }
    // }
    export default {
        data() {
            return {
                size: 50,
                offset: 100,
                list: data,
                time: 1,
                timer: null,
                nodata: false,
                input: '',
                focus: false,
                praiseItem: {},
                currentDynamic: {},
                currentCommet: {
                    comment: '',
                    dynamicId: '',
                    cardName: '',
                    commentId: '',
                    beforeCardName: '',
                    cardId: ''
                },
                self: this.$store.state.self,
                user: this.$store.state.user,
                formData: {
                    cardId: 0,
                    current: 1,
                    size: 10
                },
                dynamics: []
            };
        },
        onShow() {
            this.timer = setInterval(() => {
                this.time++;
            }, 1000);
        },
        onHide() {
            clearInterval(this.timer);
            this.$store.commit('setTimes', {type: 'dynamicTime', time: this.time});
        },
        onReachBottom() {
            this.formData.current++;
            this.getDynamic();
        },
        onPullDownRefresh() {
            this.dynamics = [];
            this.formData.current = 1;
            this.getDynamic();
        },
        methods: {
            addDynamic(){
							this.$router.push("dynamic/edit")
						},
            onFetch() {
                let items = []
                return new Promise((resolve) => {

                    console.log(this.list);
                    resolve(this.list)
                })
            },
            handleClick(data) {
                console.log('Item:' + data)
            },
            praiseSubmit(e) {
                let formId = e.detail.formId;
                this.sumbitFormId(formId);
                this.praise(this.praiseItem);
            },
            formSubmit(e) {
                let formId = e.detail.formId;
                this.sumbitFormId(formId);
                this.addComment();
            },
            reset() {
                this.currentCommet = {
                    comment: '',
                    dynamicId: '',
                    cardName: '',
                    commentId: '',
                    beforeCardName: '',
                    cardId: ''
                }
            },
            addComment() {
                if (!this.input) return;
                let params = {
                    ...this.currentCommet
                }
                this.spRequest({
                    url: api.addDynamicCommet,
                    operateCid: this.user.id,
                    operateCode: '3-2',
                    operateId: this.currentDynamic.id,
                    method: 'POST',
                    data: params,
                    success: res => {
                        this.input = '';
                        this.currentDynamic.commentList.push(params);
                    }
                });
            },
            comment(item) {
                this.reset();
                this.currentDynamic = item;
                this.focus = true;
                item.isshow = false;
                this.currentCommet.dynamicId = item.id;
                this.currentCommet.cardId = this.self.cardVO.id;
                this.currentCommet.cardName = this.self.cardVO.cardName;
            },
            commentOther(item, commetItem) {
                console.log(1111111111);
                // console.log(commetItem, this.self.cardVO.id)
                // if(commetItem.cardId == this.self.cardVO.id) {
                // 	console.log(item)
                // 	this.comment(item);
                // 	return;
                // }
                this.reset();
                item.isshow = false;
                // this.currentDynamic = item;
                this.focus = true;
                // this.currentCommet.dynamicId = item.id;
                // this.currentCommet.commentId = commetItem.id;
                // this.currentCommet.beforeCardName = commetItem.cardName;
                // this.currentCommet.cardName = this.self.cardVO.cardName;
                // this.currentCommet.cardId = this.self.cardVO.id;
            },
            bindInput(e) {
                this.input = e.detail.value;
                this.currentCommet.comment = e.detail.value;
            },
            bindTextAreaBlur(e) {
                this.focus = false;
            },
            praise(item) {
                if (item.isPraise) {
                    item.isPraise = 0;
                    item.praiseList = item.praiseList.filter(item => item.cardId != this.self.cardVO.id);
                } else {
                    item.isPraise = 1;
                    let obj = {
                        cardName: this.self.cardVO.cardName,
                        cardId: this.self.cardVO.id
                    }
                    item.praiseList.push(obj);
                }
                item.isshow = false;
                item.praiseText = item.praiseList.map(praise => praise.cardName).join(',');
                this.spRequest({
                    url: `${api.dynamicPraise}?dynamicId=${item.id}`,
                    operateCid: this.user.id,
                    operateCode: item.isPraise ? '3-1' : '3-4',
                    operateId: item.id,
                    method: 'PUT',
                    success: res => {
                        console.log(res);
                    }
                });
            },
            spand(item) {
                if (item.isshow) {
                    this.praiseItem = {};
                } else {
                    this.praiseItem = item;
                }
                item.isshow = !item.isshow;

            },
            getDynamic() {
                let params = {
                    ...this.formData,
                    cardId: this.user.id
                }
                this.spRequest({
                    url: api.getDynamic,
                    method: 'POST',
                    data: params,
                    success: res => {
                        let data = res.data.data.records || [];
                        data.forEach(item => {
                            item.isshow = false;
                            item.praiseText = item.praiseList.map(praise => praise.cardName).join(',');
                        });
                        this.dynamics = this.dynamics.concat(data);
                        this.nodata = data.length == 0 ? true : false;
                        uni.stopPullDownRefresh();
                    }
                });
            }
        },
        onLoad() {
            this.$behavior(this.user.id, 0, '3');
            uni.startPullDownRefresh();
        }
    }
</script>

<style lang="less">
    .dynamic {
        padding: .3125rem /* 5/16 */ 1.875rem;
        background: white;
        box-sizing: border-box;
        margin-bottom: 5rem /* 80/16 */;
        .no-data {
            height: 5rem;
            line-height: 5rem;
            text-align: center;
            font-size: 1.5rem;
            color: rgba(204, 210, 219, 1);
        }
        .input-box {
            z-index: 10000000000;
            transition: all .3s ease;
            box-sizing: border-box;
            padding: .625rem .625rem .625rem 1.875rem;
            position: fixed;
            // min-height: 6.25rem;
            width: 100%;
            background: rgba(243, 245, 247, 1);
            left: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            overflow: hidden;
            > textarea {
                background: white;
                border-radius: .3125rem;
                flex: 1;
                font-size: .9375rem /* 15/16 */;
                padding: 0rem .625rem;
            }
            .sendbtn {
                border: none;
                height: 1.875rem /* 30/16 */ /* 50/16 */;
                line-height: 1.875rem;
                width: 5rem;
                text-align: center;
                .iconfont {
                    color: RGBA(151, 160, 177, 1);
                    &.canSubmit {
                        color: rgba(30, 210, 154, 1);
                    }
                }
            }
        }
        .dynamic-box {
            box-sizing: border-box;
            padding: .625rem 0;
            border-bottom: .0625rem solid rgba(237, 238, 241, 1);

            &:last-child {
                border-bottom: none;
            }

            .text-content {
                margin-bottom: 1.25rem;
                font-size: .9375rem;
                color: rgba(50, 54, 67, 1);
            }

            > .comment {
                position: relative;
                background: rgba(243, 245, 247, 1);
                border-radius: .625rem;
                padding: 1.3125rem 1.25rem;

                &::after {
                    position: absolute;
                    content: '';
                    top: -2rem;
                    left: 1.25rem;
                    border-top: .625rem transparent dashed;
                    border-left: .625rem transparent dashed;
                    border-right: .625rem transparent dashed;
                    border-bottom: .625rem rgba(243, 245, 247, 1) solid;
                }

                .like-box {
                    font-size: 0;

                    .iconfont {
                        font-size: 12px;
                        color: RGBA(151, 160, 177, 1);
                        margin-right: 1.3125rem;
                    }

                    text {
                        font-size: 1.625rem;
                        font-weight: 900;
                    }

                    margin-bottom: 1.875rem;
                }

                .list {
                    overflow: hidden;

                    .item {
                        font-size: .875rem /* 14/16 */;
                        word-break: break-all;
                        white-space: pre-wrap;

                        .self {
                            font-weight: 900;
                        }
                    }
                }
            }

            .handler {
                margin-bottom: 1.875rem;
                font-size: 0;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .time {
                    font-size: .9375rem /* 15/16 */;
                    color: rgba(151, 160, 177, 1);
                }

                .btn {
                    position: relative;

                    .iconfont {
                        color: RGBA(237, 238, 241, 1);
                        font-size: 2.5rem;
                    }

                    .btn-box {
                        top: -1.3125rem;
                        left: -22rem;
                        background: rgba(50, 54, 67, 0.8);
                        border-radius: .5rem;
                        position: absolute;
                        width: 0;
                        overflow: hidden;
                        // transition: all .3s ease;
                        display: flex;
                        align-items: center;
                        .like {
                            border: none;
                            width: 17.3125rem;
                        }
                        .like,
                        .comment {
                            flex: 1;
                            text-align: center;
                            color: white;
                            font-size: 1.75rem;
                            .isPraise {
                                color: rgba(43, 217, 144, 1);
                            }
                            .iconfont {
                                margin-right: 1.3125rem;
                                font-size: 1.875rem;
                            }
                        }

                        .comment {
                            border-left: .0625rem solid rgba(50, 54, 67, 1);
                        }

                        &.show {
                            width: 21.875rem;
                        }
                    }
                }
            }

            .header {
                display: flex;
                align-items: center;
                height: 60px;
                margin-bottom: .625rem /* 10/16 */;

                .avatar {
                    width: 5rem;
                    height: 3.125rem /* 50/16 */;

                    .image {
                        height: 3.125rem;
                        width: 3.125rem;
                        border-radius: 50%;
                    }
                }

                .name {
                    font-size: .9375rem /* 15/16 */;
                    font-weight: 700;
                    color: #5377eb;
                    line-height: 3.75rem /* 60/16 */;
                }
            }

            .img-content {
                margin-bottom: 1.875rem;
                border-radius: .625rem;
                overflow: hidden;
                box-shadow: 0rem 0rem 1.125rem .125rem rgba(0, 0, 0, 0.1);

                .img {
                    height: 16.875rem /* 270/16 *//* 280/16 */ /* 300/16 */ /* 320/16 */ /* 350/16 */ /* 400/16 */ /* 300/16 */;

                    .image {
                        width: 100%;
                        height: 100%;
                    }

                    video {
                        width: 100%;
                        height: 100%;
                    }
                }

                .content {
                    padding: 1.875rem;
                    font-size: 1rem /* 16/16 */;
                    color: rgba(50, 54, 67, 1);
                }
            }

            .img-contents {
                margin-bottom: 1.875rem;
                border-radius: .625rem;
                overflow: hidden;

                .imgs {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;

                    .image {
                        border-radius: .625rem;
                        width: 30% /* 100/16 */;
                        height: 30%;
                        margin-bottom: 1.25rem;
                        margin-right: .625rem;
                        &:nth-child(3n) {
                            margin-right: 0;
                        }
                    }
                }
            }
        }
    }

    .addbutton {
        margin-top: 5rem /* 80/16 */ /* 30/16 */ /* 20/16 */;
        position: fixed;
        bottom: 0rem /* 0/16 */;
        width: 95%;
        padding: 0rem /* 0/16 */ .625rem /* 10/16 */;
        background: #ffffff;
        height: 5.125rem /* 82/16 */;
    }
</style>

