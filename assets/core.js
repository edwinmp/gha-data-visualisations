(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{193:function(e,n,t){e.exports=t(505)},504:function(e,n,t){},505:function(e,n,t){"use strict";t.r(n);t(194),t(195),t(196),t(197),t(198),t(199),t(200),t(201),t(202),t(203),t(204),t(205),t(206),t(207),t(208),t(209),t(210),t(211),t(212),t(213),t(214),t(215),t(216),t(218),t(85),t(219),t(220),t(221),t(222),t(223),t(224),t(225),t(226),t(227),t(228),t(229),t(231),t(232),t(233),t(235),t(236),t(237),t(118),t(238),t(239),t(240),t(241),t(242),t(243),t(244),t(245),t(246),t(247),t(248),t(249),t(250),t(251),t(252),t(253),t(254),t(255),t(256),t(257),t(258),t(259),t(260),t(261),t(262),t(263),t(264),t(266),t(267),t(269),t(270),t(271),t(272),t(273),t(274),t(275),t(276),t(277),t(278),t(279),t(280),t(281),t(282),t(283),t(284),t(285),t(286),t(287),t(288),t(289),t(291),t(292),t(295),t(296),t(297),t(299),t(300),t(301),t(302),t(303),t(304),t(305),t(306),t(307),t(308),t(309),t(310),t(168),t(311),t(312),t(169),t(313),t(314),t(315),t(316),t(170),t(317),t(318),t(319),t(320),t(321),t(322),t(323),t(324),t(325),t(326),t(327),t(328),t(329),t(330),t(331),t(332),t(333),t(334),t(335),t(336),t(337),t(338),t(339),t(340),t(341),t(342),t(344),t(345),t(346),t(347),t(348),t(349),t(350),t(351),t(352),t(353),t(354),t(355),t(357),t(358),t(359),t(360),t(361),t(362),t(363),t(364),t(365),t(367),t(368),t(369),t(370),t(371),t(372),t(373),t(374),t(375),t(376),t(377),t(378),t(127),t(379),t(380),t(382),t(383),t(384),t(385),t(386),t(388),t(389),t(390),t(391),t(392),t(393),t(394),t(395),t(397),t(398),t(399),t(400),t(401),t(402),t(403),t(404),t(405),t(406),t(407),t(408),t(409),t(410),t(411),t(412),t(413),t(414),t(415),t(416),t(417),t(418),t(419),t(420),t(421),t(423),t(425),t(426),t(427),t(428),t(429),t(430),t(431),t(432),t(433),t(434),t(435),t(436),t(437),t(438),t(439),t(440),t(441),t(442),t(443),t(444),t(445),t(446),t(447),t(448),t(449),t(450),t(451),t(452),t(453),t(454),t(455),t(457),t(459),t(460),t(461),t(462),t(463),t(464),t(465),t(466),t(467),t(468),t(469),t(471),t(472),t(473),t(474),t(476),t(183);var r=t(3),a=t(60),o=t.n(a),i=t(61),l=t(186),u=t(187),s=t(19),c=t.n(s),f=t(1),d=t.n(f),p=t(191),m={control:function(e){return Object.assign({},e,{borderColor:"#ddd",borderRadius:"none",boxShadow:"none",":hover":{borderColor:"#8f1b13"},":active":{borderColor:"#8f1b13"}})},option:function(e){return Object.assign({},e,{fontSize:"14px"})},singleValue:function(e){return Object.assign({},e,{fontSize:"14px"})},multiValue:function(e){return Object.assign({},e,{fontSize:"14px"})},multiValueLabel:function(e,n){return n.data.isCloseable?e:Object.assign({},e,{paddingRight:6})},multiValueRemove:function(e,n){return n.data.isCloseable?e:Object.assign({},e,{display:"none"})}},b=function(e){var n=e.label,t=e.onError,a=e.maxSelectedOptions,o=e.defaultValue,i=e.singleSelectOptions,s=Object(u.a)(e,["label","onError","maxSelectedOptions","defaultValue","singleSelectOptions"]),c=Object(f.useState)(o),d=c[0],b=c[1];Object(f.useEffect)((function(){s.onChange&&s.onChange(d),t&&t()}),[d]);return Object(r.c)("div",{className:"labelled-data-selector--wrapper"},Object(r.c)("label",null,Object(r.c)("b",null,n)),Object(r.c)(p.a,Object(l.a)({},s,{value:d,onChange:function(e){if(s.isMulti)if(e.length){var n=e.findIndex((function(e){return i.find((function(n){return n.value===e.value}))}));s.isMulti&&e.length>1&&-1!==n?b(0===n?e.slice(1):[e[n]]):a&&e.length>a?t&&t({type:"maxSelectedOptions",message:"Only up to "+a+" selections allowed"}):b(e)}else b(o);else b(e)},css:{marginRight:"10px"},styles:m,isClearable:d.length>1})))};b.propTypes={label:c.a.string,options:c.a.array,maxSelectedOptions:c.a.number,onChange:c.a.func,onError:c.a.func,defaultValue:c.a.array,singleSelectOptions:c.a.array,isMulti:c.a.bool},b.defaultProps={maxSelectedOptions:2};var g,v=b,h=t(188),y=t(192).a.div(g||(g=Object(h.a)(["\n  color: red;\n  font-size: 11px;\n  position: relative;\n  padding: 5px 5px 5px 0px;\n  display: block;\n"]))),w=function(e){var n=Object(f.useState)(""),t=n[0],r=n[1],a=function(n){n?"maxSelectedOptions"===n.type&&r(e.selectErrorMessage):r("")};return d.a.createElement("div",null,d.a.Children.map(e.children,(function(e){return d.a.isValidElement(e)?d.a.cloneElement(e,{onError:a}):e})),t?d.a.createElement(y,{className:"data-selector--wrapper"},t):null)};w.propTypes={selectErrorMessage:c.a.string,children:c.a.node};var S=w,x=t(189),A=function(e){return new Promise((function(n){Object(x.parse)(e,{download:!0,header:!0,skipEmptyLines:!0,complete:function(e){var t=e.data;return n(t)}})}))},O=function(e){var n,t=document.createElement("div");return(n=t.classList).add.apply(n,["spotlight-banner","data-selector--wrapper"]),e.parentElement.insertBefore(t,e),t},C={rainbow:["#e84439","#eb642b","#f49b21","#109e68","#0089cc","#893f90","#c2135b","#f8c1b2","#f6bb9d","#fccc8e","#92cba9","#88bae5","#c189bb","#e4819b"],default:["#6c120a","#a21e25","#cd2b2a","#dc372d","#ec6250","#f6b0a0","#fbd7cb","#fce3dc"],sunflower:["#7d4712","#ba6b15","#df8000","#f7a838","#fac47e","#fedcab","#fee7c1","#feedd4"],marigold:["#7a2e05","#ac4622","#cb5730","#ee7644","#f4a57c","#facbad","#fcdbbf","#fde5d4"],rose:["#65093d","#8d0e56","#9f1459","#d12568","#e05c86","#f3a5b6","#f6b8c1","#f9cdd0"],lavendar:["#42184c","#632572","#732c85","#994d98","#af73ae","#cb98c4","#deb5d6","#ebcfe5"],bluebell:["#0c457b","#0071b1","#0089cc","#5da3d9","#77adde","#88bae5","#bcd4f0","#d3e0f4"],leaf:["#08492f","#005b3e","#00694a","#3b8c62","#74bf93","#a2d1b0","#b1d8bb","#c5e1cb"],orange:["#973915","#d85b31","#eb642b","#f18e5e","#f4a57c","#f6bb9d"]},D=function(e,n){var t=n.selected,r=Object.values(t).filter((function(e){return e})).length;e.setOption({animation:!0}),0===r?Object.keys(t).forEach((function(n){e.dispatchAction({type:"legendSelect",name:n})})):t[n.name]||(e.dispatchAction({type:"legendSelect",name:n.name}),Object.keys(t).forEach((function(r){Object.prototype.hasOwnProperty.call(t,r)&&r!==n.name&&e.dispatchAction({type:"legendUnSelect",name:r})})))},j={color:C.default.concat(C.rainbow),legend:{left:"10%",top:10,textStyle:{fontFamily:"Geomanist Regular,sans-serif"}},tooltip:{show:!0,trigger:"item",showContent:!0,textStyle:{fontFamily:"Geomanist Regular,sans-serif"}},toolbox:{show:!0,showTitle:!1,feature:{saveAsImage:{title:"Save as PNG",pixelRatio:2}},right:20,tooltip:{show:!0,formatter:function(e){return"<div>"+e.title+"</div>"},textStyle:{fontFamily:"Geomanist Regular,sans-serif"}}},xAxis:{axisLabel:{fontFamily:"Geomanist Regular,sans-serif",fontSize:13},splitLine:{show:!1}},yAxis:{axisLabel:{fontFamily:"Geomanist Regular,sans-serif",fontSize:13},splitLine:{show:!1},nameLocation:"end",nameTextStyle:{padding:[0,50,0,0]}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0}},R="Volumes",E={Proportions:"Proportion",Volumes:"Volume","%GNI":"%GNI"},V=function(e){return void 0===e&&(e=""),e.trim()?Number(e.replace(",","").replace(" ","").replace("%","").trim()):null},k=function(e){return e.map((function(e){var n=Object.assign({},e);return n.value=V(n.Value),n}))},N=function(e){return e.filter((function(e){return"%GNI"===R?"Total HA"===e:"Total HA"!==e}))},I=function(){return"%GNI"===R?"line":"bar"},B=function(e,n,t,r,a){void 0===a&&(a="Proportion");var o=e.filter((function(e){return e.Donor.trim()===t&&e["IHA type"]===r&&e["Value type"]===a}));return n.map((function(e){return o.find((function(n){return n.Year===e}))}))},U=function(e,n,t){return void 0===n&&(n="currency"),void 0===t&&(t="auto"),new Intl.NumberFormat("en-US",{style:n,currency:"USD",signDisplay:t,maximumFractionDigits:0}).format(e)},M=function(){return"Volumes"!==R?{type:"value",axisLabel:{formatter:"{value}%"},name:"",max:"Proportions"===R?100:null}:{type:"value",axisLabel:{formatter:"{value}"},nameRotate:90,name:"US$ millions",nameLocation:"end",nameTextStyle:{verticalAlign:"top",align:"right",padding:[-58,0,0,0]},max:null}},F=function(e,n,t){var r=t.years,a=t.channels,i={color:C.bluebell,legend:{show:!0,top:"top",padding:[20,10,5,10],textStyle:{fontSize:"1.3rem"}},grid:{bottom:"10%"},xAxis:{type:"category",data:r},yAxis:M(),series:N(a).map((function(e){return{name:e,data:B(n,r,"All donors",e,E[R]).map((function(e){return{value:e&&Number("Proportions"===R?100*e.value:e.value),emphasis:{focus:"self"}}})),type:I(),stack:"channels",tooltip:{trigger:"item",formatter:function(t){var r=n.find((function(n){return n["IHA type"]===e&&"All donors"===n.Donor&&""+n.Year===t.name&&n["Value type"]===E[R]})),a=e.includes("Multilateral HA")?e.replace("Multilateral HA","Multilateral Humanitarian Assistance"):e;return"All donors, "+t.name+" <br />"+a+": <strong>"+("Proportions"===R?t.value.toFixed(2)+"%":"US$"+U(V(r.Value),"decimal","never")+" million")+" </strong>"}},cursor:"auto"}}))};return j.toolbox.feature.saveAsImage.name="donors",e.setOption(o()(i,j),{replaceMerge:["series"]}),e.on("legendselectchanged",(function(n){D(e,n)})),e},L=function(){window.DICharts.handler.addChart({className:"dicharts--gha-donors",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,(function(e){var n=new window.DICharts.Chart(e.parentElement);A("https://raw.githubusercontent.com/devinit/gha-data-visualisations/main/public/assets/data/donor_interactive_data_long.csv").then((function(t){var a=O(e),o=Array.from(new Set(t.map((function(e){return e.Donor})))),l=Array.from(new Set(t.map((function(e){return e.Year})))),u=Array.from(new Set(t.map((function(e){return e["IHA type"]})))),s=window.echarts.init(e);F(s,k(t),{years:l,channels:u});var c=function(e,n){var t=k(e),r=I(),a=n.map((function(e){return N(u).map((function(a,o){return{name:"%GNI"!==R?a:e,data:B(t,l,e,a,E[R]).map((function(e){return{value:e&&Number("Volumes"!==R?100*e.value:e.value),emphasis:{focus:"self"}}})),type:r,stack:"%GNI"!==R?e:void 0,symbol:"circle",tooltip:{trigger:"item",formatter:function(n){var r=t.find((function(t){return t["IHA type"]===a&&t.Donor===e&&""+t.Year===n.name&&t["Value type"]===E[R]})),o="Volumes"===R?"US$"+U(V(r.Value),"decimal","never")+" million":n.value.toFixed(2)+"%";return e+", "+n.name+" <br />"+a+": <strong>"+o+"</strong>"}},label:{show:"bar"===r&&(0===o&&n.length>1),position:"insideBottom",distance:15,align:"left",verticalAlign:"middle",rotate:90,formatter:function(){return""+e},fontSize:16},cursor:"auto"}}))})).reduce((function(e,n){return e.concat(n)}),[]);s.setOption({yAxis:M(),series:a},{replaceMerge:["series"]})},f=[];Object(i.createRoot)(a).render(Object(r.c)(S,{selectErrorMessage:"You can compare two donors. Please remove one before adding another."},Object(r.c)(v,{label:"Select up to 2 donors",options:o.map((function(e){return{value:e,label:e,isCloseable:"All donors"!==e}})),defaultValue:[{value:"All donors",label:"All donors"}],isMulti:!0,onChange:function(e){var n=e.find((function(e){return"All donors"===e.value}));if(e.length&&!n){var r=t.filter((function(n){return e.find((function(e){return e.value===n.Donor}))}));f=e.map((function(e){return e.value})),c(r,f)}else F(s,k(t),{years:l,channels:u})},singleSelectOptions:[{value:"All donors",label:"All donors",isCloseable:!1}],css:{minWidth:"200px"}}),Object(r.c)(v,{label:"Display data as",options:["Volumes","Proportions","%GNI"].map((function(e){return{value:e,label:e}})),defaultValue:[{value:"Volumes",label:"Volumes"}],onChange:function(e){if(R=e.value||R,f.length){var n=t.filter((function(e){return f.includes(e.Donor)}));c(n,f)}else F(s,k(t),{years:l,channels:u})},css:{minWidth:"150px"}}))),n.hideLoading()}))}))}}})},T=function(e){return void 0===e&&(e=""),e.trim()?Number(e.replace(",","").replace(" ","").replace("%","").trim()):null},P=function(e){return e.map((function(e){var n=Object.assign({},e);return n.value=T(e.Proportions),n}))},Y=function(e,n,t,r){var a=e.filter((function(e){return e.Donor.trim()===t&&e["Delivery channel"]===r}));return n.map((function(e){return a.find((function(n){return n.Year===e}))}))},G=function(e,n,t){return void 0===n&&(n="currency"),void 0===t&&(t="auto"),new Intl.NumberFormat("en-US",{style:n,currency:"USD",signDisplay:t,maximumFractionDigits:0}).format(e)},z=function(e,n,t){var r=t.years,a=t.channels,i={color:C.bluebell,legend:{show:!0,top:"top",padding:[20,10,5,10],textStyle:{fontSize:"1.3rem"}},grid:{bottom:"10%"},xAxis:{type:"category",data:r},yAxis:{type:"value",axisLabel:{formatter:"{value}%"},max:100},series:a.map((function(e){return{name:e,data:Y(n,r,"All donors",e).map((function(e){return{value:e&&Number(100*e.value).toFixed(2),emphasis:{focus:"self"}}})),type:"bar",stack:"channels",tooltip:{trigger:"item",formatter:function(t){var r=n.find((function(n){return n["Delivery channel"]===e&&"All donors"===n.Donor&&""+n.Year===t.name}));return"All donors, "+t.name+" <br />"+e+": <strong>"+Number(t.value,10).toFixed(2)+"%</strong> (US$"+G(T(r["US$ millions, constant 2020 prices"]),"decimal","never")+" million)"}},cursor:"auto"}}))};return j.toolbox.feature.saveAsImage.name="funding-channels",e.setOption(o()(i,j),{replaceMerge:["series"]}),e.on("legendselectchanged",(function(n){D(e,n)})),e},$=function(){window.DICharts.handler.addChart({className:"dicharts--boilerplate-chart",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,(function(e){var n=new window.DICharts.Chart(e.parentElement);A("https://raw.githubusercontent.com/devinit/gha-data-visualisations/main/public/assets/data/funding-channels-interactive-data.csv").then((function(t){var r=O(e),a=Array.from(new Set(t.map((function(e){return e.Donor})))),o=Array.from(new Set(t.map((function(e){return e.Year})))),l=Array.from(new Set(t.map((function(e){return e["Delivery channel"]})))),u=window.echarts.init(e);z(u,P(t),{years:o,channels:l});var s=[];Object(i.createRoot)(r).render(d.a.createElement(S,{selectErrorMessage:"You can compare two donors. Please remove one before adding another."},d.a.createElement(v,{label:"Select up to 2 donors",options:a.map((function(e){return{value:e,label:e,isCloseable:"All donors"!==e}})),defaultValue:[{value:"All donors",label:"All donors",isCloseable:!1}],isMulti:!0,onChange:function(e){var n=e.find((function(e){return"All donors"===e.value}));if(e.length&&!n){var r,a,i,c=t.filter((function(n){return e.find((function(e){return e.value===n.Donor}))}));s=e.map((function(e){return e.value})),r=s,a=P(c),i=r.map((function(e){return l.map((function(n,t){return{name:n,data:Y(a,o,e,n).map((function(e){return{value:e&&Number(100*e.value).toFixed(2),emphasis:{focus:"self"}}})),type:"bar",stack:e,tooltip:{trigger:"item",formatter:function(t){var r=a.find((function(r){return r["Delivery channel"]===n&&r.Donor===e&&""+r.Year===t.name})),o=r?"<strong>"+(100*r.value).toFixed(2)+"%</strong> (US$"+G(T(r["US$ millions, constant 2020 prices"]),"decimal","never")+" million)":"<strong>"+(100*r.value).toFixed(2)+"%</strong>";return e+", "+t.name+" <br />"+n+": "+o}},label:{show:0===t&&r.length>1,position:"insideBottom",distance:15,align:"left",verticalAlign:"middle",rotate:90,formatter:function(){return""+e},fontSize:16},cursor:"auto"}}))})).reduce((function(e,n){return e.concat(n)}),[]),u.setOption({series:i},{replaceMerge:["series"]})}else z(u,P(t),{years:o,channels:l})},singleSelectOptions:[{value:"All donors",label:"All donors",isCloseable:!1}],css:{minWidth:"200px"}}))),n.hideLoading()}))}))}}})},H=t(130),W=t.n(H),_=t(190),J=function(e){var n=Object(f.useState)(e.donorRecipients),t=n[0],a=n[1],o=Object(f.useState)(e.defaultBreakdown),i=o[0],l=o[1],u=Object(f.useState)(e.defaultRecipient),s=u[0],c=u[1];Object(f.useEffect)((function(){a("By donor"===i?e.donorRecipients:e.orgTypeRecipients),e.onSelectBreakdown&&e.onSelectBreakdown(i,s)}),[i]),Object(f.useEffect)((function(){e.onSelectRecipient&&e.onSelectRecipient(s,i)}),[s]);return Object(r.c)(S,null,Object(r.c)(v,{label:"Select recipient",options:t.sort().map((function(e){return{value:e,label:e}})),defaultValue:[{value:e.defaultRecipient,label:e.defaultRecipient}],onChange:function(n){c(n.value||e.defaultRecipient)},css:{minWidth:"150px"}}),Object(r.c)(v,{label:"Choose breakdown",options:["By donor","By type of organisation receiving funding"].map((function(e){return{value:e,label:e}})),defaultValue:[{value:e.defaultBreakdown,label:e.defaultBreakdown}],onChange:function(n){l(n.value||e.defaultBreakdown)},css:{minWidth:"300px"}}))};J.propTypes={donorRecipients:c.a.array,orgTypeRecipients:c.a.array,defaultRecipient:c.a.string,defaultBreakdown:c.a.string,onSelectBreakdown:c.a.func,onSelectRecipient:c.a.func},J.defaultProps={defaultBreakdown:"By donor",defaultRecipient:"Afghanistan"};var K=J,q=new Intl.NumberFormat,Q=function(e){return e.trim()?Number(e.replace(",","").replace(" ","").replace("%","").trim()).toFixed(2):null},X=function(e,n){return void 0===n&&(n="Value"),e.map((function(e){var t=Object.assign({},e);return t.value=Q(e[n]),t}))},Z=function(e,n,t,r){var a=e.filter((function(e){return e["Destination Country"].trim()===t&&e["Donor organisation"]===r}));return n.map((function(e){return a.find((function(n){return n.Year===e}))||null}))},ee=function(e,n,t){var r=["Destination Country","Recipient Org Type"],a=e.filter((function(e){return e[r[1]]===n}));return t.map((function(e){var n=a.find((function(n){return n.Year===e}));return{value:n&&Q(n.value)||null,emphasis:{focus:"self"}}}))},ne=function(e,n){var t=["United States","EU institutions","Germany","United Kingdom","Saudi Arabia","All other donors"],r=e.filter((function(e){return e["Destination Country"].trim()===n}));return t.length>=5?t:Array.from(new Set(r.map((function(e){return e["Donor organisation"]})))).filter((function(e){return!t.includes(e)})).slice(0,5).concat(t)},te=function(e,n){var t=e.filter((function(e){return e["Destination Country"].trim()===n}));return Array.from(new Set(t.map((function(e){return e["Recipient Org Type"]}))))},re=function(e,n,t,r){var a=r.years,i=r.channels,l={color:C.bluebell,legend:{show:!0,top:"top",padding:[20,10,5,10],textStyle:{fontSize:"1.3rem"}},grid:{bottom:"10%"},xAxis:{type:"category",data:a,position:"bottom"},yAxis:{type:"value",nameRotate:90,name:"US$ millions",nameLocation:"middle",nameTextStyle:{verticalAlign:"top",align:"right",padding:[-60,0,0,0]}},series:i.map((function(e){return{name:e,data:Z(n,a,t,e).map((function(e){return{value:e&&Number(e.value).toFixed(2),emphasis:{focus:"self"}}})),type:"bar",stack:"channels",cursor:"auto",tooltip:{trigger:"item",formatter:function(n){return e+", "+n.name+" <br />10 largest recipients: <strong>US$"+q.format(Math.round(n.value))+" million</strong>"}},animation:!1}}))};return j.toolbox.feature.saveAsImage.name="recipients",e.setOption(o()(l,j),{replaceMerge:["series"]}),e.on("legendselectchanged",(function(n){D(e,n)})),e},ae=function(){window.DICharts.handler.addChart({className:"dicharts--gha-recipients",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,function(){var e=Object(_.a)(W.a.mark((function e(n){var t,r,a,o,l,u,s,c,f,p,m,b,g,v;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new window.DICharts.Chart(n.parentElement),e.next=3,A("https://raw.githubusercontent.com/devinit/gha-data-visualisations/main/public/assets/data/recipients-by-donor.csv");case 3:return r=e.sent,e.next=6,A("https://raw.githubusercontent.com/devinit/gha-data-visualisations/main/public/assets/data/recipients-by-org-type.csv");case 6:a=e.sent,o=O(n),l=Array.from(new Set(r.filter((function(e){return"Yes"===e["Top 10 recipient"]})).map((function(e){return e["Destination Country"]})))),u=Array.from(new Set(r.map((function(e){return e.Year})))),"Afghanistan","By donor",s=ne(r,"Afghanistan"),c=Array.from(new Set(a.filter((function(e){return"Yes"===e["Top 10 recipient"]})).map((function(e){return e["Destination Country"]})))),f=window.echarts.init(n),re(f,X(r,"USD deflated millions"),"Afghanistan",{years:u,channels:s}),p="Afghanistan",m=function(e,n){var t=X(e,"USD deflated millions"),r=ne(e,n).map((function(e){return{name:e,data:Z(t,u,n,e).map((function(e){return{value:e&&Number(e.value).toFixed(2),emphasis:{focus:"self"}}})),type:"bar",stack:n,cursor:"auto",tooltip:{trigger:"item",formatter:function(t){return e+", "+t.name+" <br/>"+n+": <strong>US$"+q.format(Math.round(t.value))+" million</strong>"}}}})).reduce((function(e,n){return e.concat(n)}),[]);f.setOption({series:r},{replaceMerge:["series"]})},b=function(e,n){var t=te(e,n).map((function(t){return{name:t,data:ee(e,t,u),type:"bar",stack:n,cursor:"auto",tooltip:{trigger:"item",formatter:function(e){return e.name+" <br/>"+t+": <strong>US$"+q.format(Math.round(e.value))+" million</strong>"}}}})).reduce((function(e,n){return e.concat(n)}),[]);f.setOption({series:t},{replaceMerge:["series"]})},g=function(e,n){if(void 0===n&&(n="By donor"),p=e||"Afghanistan","By donor"===n)if("10 largest recipients"!==p){var t=r.filter((function(e){return e["Destination Country"]===p}));m(t,p)}else p="10 largest recipients",re(f,X(r,"USD deflated millions"),"10 largest recipients",{years:u,channels:s});else b(a.filter((function(n){return n["Destination Country"]===e})),e)},v=function(e,n){if("By donor"===e)if("10 largest recipients"!==n){var t=r.filter((function(e){return e["Destination Country"]===n}));m(t,n)}else re(f,X(r,"USD deflated millions"),"10 largest recipients",{years:u,channels:s});else b(a.filter((function(e){return e["Destination Country"]===n})),n)},Object(i.createRoot)(o).render(d.a.createElement(K,{donorRecipients:l,orgTypeRecipients:c,onSelectRecipient:g,onSelectBreakdown:v,defaultBreakdown:"By donor",defaultRecipient:"Afghanistan"})),t.hideLoading();case 24:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}())}}})};t(504);window.addEventListener("load",(function(){L(),$(),ae()}))}},[[193,1,2]]]);