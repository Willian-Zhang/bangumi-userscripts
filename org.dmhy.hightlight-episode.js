// ==UserScript==
// @name         DMHY: Highlight ep#
// @namespace    org.dmhy.hightlight-episode
// @version      0.3
// @description  Highlight Episode Number
// @author       Willian
// @match        https://share.dmhy.org/topics/list*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

/*
Regex:
(.+)([\s|\[|【]第?)(\d{1,2}(?:[-|~]\d{1,2})?)(話?[\s|\]|】])(.+)
((.+)([\s|\[|【]第?))(\d{1,2}(?:[-|~]\d{1,2})?)((話?[\s|\]|】])(.+))

Test with:
                【4月/悠哈璃羽字幕社】[UHA-WINGS][不要输！恶之军团][Makeruna!! Aku no Gundan!][06][GB][1080p AVC_AAC][MP4]
				【神帆字幕组】【名侦探柯南】【第783集-绯色的真相】【简体mp4】【1080P】
				【4月/悠哈璃羽字幕社】[UHA-WINGS][不要输！恶之军团][Makeruna!! Aku no Gundan!][06][1080p AVC_AAC][简繁外挂][sc_tc]
				[雪飄工作室][Aikatsu Stars!/アイカツスターズ！][S2E06][720p][繁體內嵌](检索:偶像活動/偶活/愛活) 附外掛字幕
				[INDRA&NMKST][四月新番] 櫻花任務 / Sakura Quest [05] [1080P][HardSub][BIG5][x265 AAC]
				[INDRA&NMKST][四月新番] 樱花任务 / Sakura Quest [05] [1080P][HardSub][GB][x265 AAC]
				【极影字幕社】★04月新番[重启咲良田_Sakurada Reset][06][720P][GB][MP4]
				【WOLF字幕組】★1月新番【飆速宅男_Yowamushi Pedal -New Generation-】【第18話】[GB][720P][MP4]
				【極影字幕社】★04月新番[末日時在做甚麼？有沒有空？可以來拯救嗎？_Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?][05][720P][BIG5][MP4]
				【DHR動研字幕組】[慕留人 火影新世代_Boruto - Naruto Next Generations][06][繁體][720P][MP4]
				[天香字幕社&A.I.R.nesSub][2017年04月][迷你動畫劇場ID-0問答_Puchi Anime Gekijyou Quiz ID-0][05][720P][簡繁外掛][MP4]
				[桜都字幕组][Sin七大罪/Sin Nanatsu no Taizai] [02][GB][720P]
				【武装少女Machiavellism】[ Busou Shoujo Machiavellianism][06][GB][1080p]
				【国漫】国民老公带回家 第一季 12集全  720P
				哦!家庭  Oh! Family  Oh！ファミリー(イタリア版)   (1986) 1-26话  全集
				【4月/悠哈璃羽字幕社】[假面Noise/覆面系Noise][Fukumenkei Noise][05][720p][BIG5]
				【4月/悠哈璃羽字幕社】[假面Noise/覆面系Noise][Fukumenkei Noise][05][720p][GB]
				[诸神字幕组][进击的巨人][Attack on Titan S2][06][简繁日双语字幕][1080P][HEVC MKV]
				[诸神字幕组][进击的巨人][Attack on Titan S2][06][简日双语字幕][720P][CHS MP4]
				【愛戀字幕社&風之聖殿字幕組&Xrip】[為美好的世界獻上祝福! 第二季/Kono_Subarashii_Sekai_ni_Shukufuku_o!_2][01-04][BDrip][繁體][2160P][HEVC]
				[LoliHouse] 不正经的魔术讲师与禁忌教典/Rokudenashi Majutsu Koushi to Akashic Records - 06 [WebRip 1920x1080 HEVC-10bit AAC]
				[VRAINSTORM][遊戲王! VRAINS][Yu-Gi-Oh! VRAINS][001][BIG5_JP][720P][MP4][誠招翻譯校對]
				[VRAINSTORM][游戏王! VRAINS][Yu-Gi-Oh! VRAINS][001][GB_JP][720P][MP4][诚招翻译校对]
				【极影字幕社】★04月新番[末日时在做什么？有没有空？可以来拯救吗？_Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?][05][720P][GB][MP4]
				【極影字幕社】★4月新番 不正經的魔術講師與禁忌教典 06 BIG5 720P MP4
				【极影字幕社】★4月新番 不正经的魔术讲师与禁忌教典 06 GB 720P MP4
				【幻之字幕組】愛米~WE LOVE RICE~ - 06[BIG5][720P][PSV&PC][MP4][新人招募]
				【幻之字幕组】爱米~WE LOVE RICE~ - 06[GB][720P][PSV&PC][MP4][新人招募]
				【幻之字幕组】[不正經的魔術講師與禁忌教典][06][720P][BIG5]
				【幻之字幕组】[不正經的魔術講師與禁忌教典][06][720P][GB]
				【幻櫻字幕組】【4月新番】【喧嘩番長 乙女-girl beats boys- Kenka Banchou Otome Girl Beats Boys】【05】【BIG5_MP4】【1280X720】
				【幻樱字幕组】【4月新番】【喧哗番长 乙女-girl beats boys- Kenka Banchou Otome Girl Beats Boys】【05】【GB_MP4】【1280X720】
				【国漫】国民老公带回家 第二季 第4话.Mp4
				【国漫】国民老公带回家 第二季 第3话.Mp4
				【国漫】国民老公带回家 第二季 第2话.Mp4
				【国漫】国民老公带回家 第二季 第1话.Mp4
				【WOLF字幕组】★4月新番【有顶天家族2_Uchouten Kazoku 2】【第03&04&05话】[GB][720P][MP4]
				[澄空学园] 王室教师海涅 第06话 MP4 720p
				【幻櫻字幕組】【4月新番】【有頂天家族 2 Uchouten Kazoku 2】【05】【BIG5_MP4】【1280X720】
				【幻樱字幕组】【4月新番】【有顶天家族 2 Uchouten Kazoku 2】【05】【GB_MP4】【1280X720】
*/
const $doc = unsafeWindow.$;
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
const epRegex = /((.+)([\s|\[|【]第?))(\d{1,2}(?:[-|~]\d{1,2})?)((話?[\s|\]|】])(.+))/g;

const highlightMe = function(){
    let $element = $(this);
        // if($element.html().match(/<highlight/g)){
        //     return;
        // }
        console.log($element.text())
        let found = epRegex.exec($element.text());
        if(found){
            let ep = Number(found[3]) >-1 ? Number(found[4]) : 0;
            let color = colors[ep % colors.length];
            $element.empty().append([
                document.createTextNode(found[1]),
                `<highlight style="background-color: ${color}">${found[4]}</highlight>`,
                document.createTextNode(found[5])
            ]);
        }
}
$doc(document).ready(function(){
    let table = $(".main > .table  table > tbody");
    let titles = table.find('tr > td.title > a').each(highlightMe);
});
