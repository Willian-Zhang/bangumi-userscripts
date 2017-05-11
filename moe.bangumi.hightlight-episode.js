// ==UserScript==
// @name         Highlight Episode #
// @namespace    moe.bangumi.hightlight-episode
// @version      0.2
// @description  Highlight Episode Number
// @author       Willian
// @match        https://bangumi.moe/*
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

/*
Regex:
(.+)([\s|\[|【]第?)(\d{1,2}(?:[-|~]\d{1,2})?)(話?[\s|\]|】])(.+)

Test with:
【DHR動研字幕組&茉語星夢】[櫻花任務_Sakura Quest][03][繁體][720P][MP4] 
【動漫國字幕組】★04月新番[路人女主的養成方法♭][00-01][720P_Hi10P][簡繁外掛][MKV] 
【千夏字幕組】【櫻花任務_Sakura Quest】[第03話][1280X720][MP4_PC&PSV兼容][繁體]​ 
【极影字幕社】★4月新番 不正经的魔术讲师与禁忌教典 04 GB 720P MP4 
jiaolovekt @[极影字幕社] 发布于 昨天上午11点07
【極影字幕社】★4月新番 不正經的魔術講師與禁忌教典 04 BIG5 720P MP4 
jiaolovekt @[极影字幕社] 发布于 昨天上午11点03
【千夏字幕組】【重啟咲良田_Sagrada Reset】[第03話][1280x720][MP4_PC&PSV兼容][繁體] 
【幻櫻字幕組】【4月新番】【喧嘩番長 乙女-girl beats boys- Kenka Banchou Otome Girl Beats Boys】【03】【BIG5_MP4】【1280X720】 
【幻樱字幕组】【4月新番】【喧哗番长 乙女-girl beats boys- Kenka Banchou Otome Girl Beats Boys】【03】【GB_MP4】【1280X720】 
*/
const $ = unsafeWindow.$;
const angular = unsafeWindow.angular;

// let rin = angular.module('rin')
// rin['_invokeQueue'].forEach(function(value){ 
//     console.log(value[1] + ": " + value[2][0]);
// })
// rin.directive('torrentList',(e)=>{

// })

const colors = [
    "#FF0097",
    "#A200FF",
    "#00ABA9",
    "#8CBF26",
    "#E671B8",
    "#F09609",
    "#1BA1E2"
];
const epRegex = /(.+)([\s|\[|【]第?)(\d{1,2}(?:[-|~]\d{1,2})?)([話|话]?[\s|\]|】])(.+)/g;

const highlightMe = function(){
    let $element = $(this);
        if($element.html().match(/<highlight/g)){
            return;
        }
        let found = epRegex.exec($element.text());
        if(found){
            let ep = Number(found[3]) >-1 ? Number(found[3]) : 0;
            let color = colors[ep % colors.length];
            console.log(found[1]);
            $element.empty().append([
                document.createTextNode(found[1]),
                found[2],
                `<highlight style="background-color: ${color}">${found[3]}</highlight>`,
                found[4],
                document.createTextNode(found[5])
            ]);
        }
}
$(document).on("mouseenter",'[torrent-list]',function(e){
    let titleElements = $(this).find(".md-item-raised-title");

    titleElements.find("span").each(highlightMe);
    titleElements.off("mouseenter");
    titleElements.on("mouseenter",highlightMe);
    titleElements.find("span").each(highlightMe);
});
// $(document).on("mouseover",'.compact-torrent-list',function(e){
//     console.log(this)
// })