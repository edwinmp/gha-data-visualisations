(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{230:function(e,n,t){e.exports=t(580)},579:function(e,n,t){},580:function(e,n,t){"use strict";t.r(n);t(231),t(239),t(240),t(241),t(242),t(243),t(244),t(245),t(246),t(247),t(248),t(249),t(250),t(251),t(252),t(253),t(254),t(255),t(256),t(257),t(258),t(259),t(260),t(262),t(109),t(263),t(264),t(265),t(266),t(267),t(268),t(269),t(270),t(271),t(272),t(273),t(275),t(276),t(277),t(279),t(280),t(281),t(148),t(283),t(284),t(285),t(286),t(287),t(288),t(289),t(290),t(291),t(292),t(293),t(295),t(296),t(297),t(298),t(299),t(300),t(301),t(302),t(303),t(304),t(305),t(306),t(307),t(308),t(309),t(310),t(312),t(313),t(314),t(315),t(316),t(317),t(318),t(319),t(320),t(321),t(322),t(323),t(324),t(325),t(326),t(327),t(328),t(329),t(330),t(331),t(332),t(333),t(334),t(336),t(337),t(348),t(349),t(350),t(352),t(353),t(354),t(355),t(356),t(357),t(358),t(359),t(360),t(361),t(362),t(363),t(203),t(365),t(366),t(367),t(369),t(370),t(371),t(372),t(204),t(373),t(374),t(375),t(376),t(377),t(378),t(379),t(380),t(381),t(382),t(383),t(385),t(387),t(388),t(389),t(390),t(391),t(392),t(393),t(394),t(395),t(396),t(397),t(398),t(399),t(400),t(402),t(403),t(404),t(405),t(406),t(407),t(408),t(409),t(410),t(411),t(412),t(414),t(417),t(418),t(419),t(420),t(421),t(422),t(423),t(424),t(425),t(427),t(428),t(429),t(430),t(431),t(432),t(433),t(434),t(435),t(436),t(437),t(438),t(159),t(440),t(442),t(449),t(450),t(451),t(452),t(453),t(455),t(456),t(457),t(458),t(459),t(460),t(461),t(462),t(464),t(465),t(466),t(467),t(468),t(469),t(470),t(471),t(472),t(473),t(474),t(475),t(476),t(477),t(478),t(479),t(480),t(481),t(482),t(483),t(484),t(485),t(486),t(487),t(491),t(493),t(495),t(496),t(497),t(498),t(499),t(501),t(502),t(503),t(504),t(505),t(506),t(507),t(508),t(509),t(510),t(511),t(512),t(513),t(514),t(515),t(516),t(517),t(518),t(519),t(520),t(521),t(522),t(523),t(524),t(525),t(526),t(528),t(530),t(531),t(532),t(533),t(534),t(535),t(536),t(537),t(538),t(539),t(540),t(542),t(543),t(546),t(547),t(550),t(551);var r=t(3),a=t(80),o=t.n(a),i=t(81),l=t(223),s=t(224),c=t(23),u=t.n(c),f=t(1),d=t.n(f),p=t(228),m={control:function(e){return Object.assign({},e,{borderColor:"#ddd",borderRadius:"none",boxShadow:"none",":hover":{borderColor:"#8f1b13"},":active":{borderColor:"#8f1b13"}})},option:function(e){return Object.assign({},e,{fontSize:"14px"})},singleValue:function(e){return Object.assign({},e,{fontSize:"14px"})},multiValue:function(e){return Object.assign({},e,{fontSize:"14px"})},multiValueLabel:function(e,n){return n.data.isCloseable?e:Object.assign({},e,{paddingRight:6})},multiValueRemove:function(e,n){return n.data.isCloseable?e:Object.assign({},e,{display:"none"})},input:function(e){return Object.assign({},e,{fontSize:"14px"})},indicatorsContainer:function(e){return Object.assign({},e,{pointerEvents:"none"})}},b=function(e){var n=e.label,t=e.onError,a=e.maxSelectedOptions,o=e.defaultValue,i=e.singleSelectOptions,c=Object(s.a)(e,["label","onError","maxSelectedOptions","defaultValue","singleSelectOptions"]),u=Object(f.useState)(o),d=u[0],b=u[1];Object(f.useEffect)((function(){c.onChange&&c.onChange(d),t&&t()}),[d]);return Object(r.c)("div",{className:"labelled-data-selector--wrapper"},Object(r.c)("label",null,Object(r.c)("b",null,n)),Object(r.c)(p.a,Object(l.a)({},c,{value:d,onChange:function(e){if(c.isMulti)if(e.length){var n=e.findIndex((function(e){return i.find((function(n){return n.value===e.value}))}));c.isMulti&&e.length>1&&-1!==n?b(0===n?e.slice(1):[e[n]]):a&&e.length>a?t&&t({type:"maxSelectedOptions",message:"Only up to "+a+" selections allowed"}):b(e)}else b(o);else b(e)},css:{marginRight:"10px"},styles:m,isClearable:"undefined"!==c.isClearable?c.isClearable:d.length>1})))};b.propTypes={label:u.a.string,options:u.a.array,maxSelectedOptions:u.a.number,onChange:u.a.func,onError:u.a.func,defaultValue:u.a.array,singleSelectOptions:u.a.array,isMulti:u.a.bool,isClearable:u.a.bool},b.defaultProps={maxSelectedOptions:2};var g,h=b,v=t(225),y=t(229).a.div(g||(g=Object(v.a)(["\n  color: red;\n  font-size: 11px;\n  position: relative;\n  padding: 5px 5px 5px 0px;\n  display: block;\n"]))),w=function(e){var n=Object(f.useState)(""),t=n[0],r=n[1],a=function(n){n?"maxSelectedOptions"===n.type&&r(e.selectErrorMessage):r("")};return d.a.createElement("div",null,d.a.Children.map(e.children,(function(e){return d.a.isValidElement(e)?d.a.cloneElement(e,{onError:a}):e})),t?d.a.createElement(y,{className:"data-selector--wrapper"},t):null)};w.propTypes={selectErrorMessage:u.a.string,children:u.a.node};var S=w,x=t(226),A=function(e){return new Promise((function(n){Object(x.parse)(e,{download:!0,header:!0,skipEmptyLines:!0,complete:function(e){var t=e.data;return n(t)}})}))},O=function(e){var n,t=document.createElement("div");return(n=t.classList).add.apply(n,["spotlight-banner","data-selector--wrapper"]),e.parentElement.insertBefore(t,e),t},C={rainbow:["#e84439","#eb642b","#f49b21","#109e68","#0089cc","#893f90","#c2135b","#f8c1b2","#f6bb9d","#fccc8e","#92cba9","#88bae5","#c189bb","#e4819b"],default:["#6c120a","#a21e25","#cd2b2a","#dc372d","#ec6250","#f6b0a0","#fbd7cb","#fce3dc"],sunflower:["#7d4712","#ba6b15","#df8000","#f7a838","#fac47e","#fedcab","#fee7c1","#feedd4"],marigold:["#7a2e05","#ac4622","#cb5730","#ee7644","#f4a57c","#facbad","#fcdbbf","#fde5d4"],rose:["#65093d","#8d0e56","#9f1459","#d12568","#e05c86","#f3a5b6","#f6b8c1","#f9cdd0"],lavendar:["#42184c","#632572","#732c85","#994d98","#af73ae","#cb98c4","#deb5d6","#ebcfe5"],bluebell:["#0c457b","#0071b1","#0089cc","#5da3d9","#77adde","#88bae5","#bcd4f0","#d3e0f4"],leaf:["#08492f","#005b3e","#00694a","#3b8c62","#74bf93","#a2d1b0","#b1d8bb","#c5e1cb"],orange:["#973915","#d85b31","#eb642b","#f18e5e","#f4a57c","#f6bb9d"]},D=function(e,n){var t=n.selected,r=Object.values(t).filter((function(e){return e})).length;e.setOption({animation:!0}),0===r?Object.keys(t).forEach((function(n){e.dispatchAction({type:"legendSelect",name:n})})):t[n.name]||(e.dispatchAction({type:"legendSelect",name:n.name}),Object.keys(t).forEach((function(r){Object.prototype.hasOwnProperty.call(t,r)&&r!==n.name&&e.dispatchAction({type:"legendUnSelect",name:r})})))},j={color:C.default.concat(C.rainbow),legend:{left:"10%",top:10,textStyle:{fontFamily:"Geomanist Regular,sans-serif"}},tooltip:{show:!0,trigger:"item",showContent:!0,textStyle:{fontFamily:"Geomanist Regular,sans-serif"}},toolbox:{show:!0,showTitle:!1,feature:{saveAsImage:{title:"Save as PNG",pixelRatio:2}},right:20,tooltip:{show:!0,formatter:function(e){return"<div>"+e.title+"</div>"},textStyle:{fontFamily:"Geomanist Regular,sans-serif"}}},xAxis:{axisLabel:{fontFamily:"Geomanist Regular,sans-serif",fontSize:13},splitLine:{show:!1}},yAxis:{axisLabel:{fontFamily:"Geomanist Regular,sans-serif",fontSize:13},splitLine:{show:!1},nameLocation:"end",nameTextStyle:{padding:[0,50,0,0]}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0}},E=function(e,n){window.addEventListener("resize",(function(){e.resize({width:n.clientWidth+"px",height:n.clientHeight+"px"})}),!0)},R=function(e){var n=e.some((function(e){return e.stack})),t=Array.from(new Set(e.map((function(e){return e.name})))).length,r=Math.max.apply(Math,e.reduce((function(e,n){var t=n.data;return e.concat(t.map((function(e){return e.value})))}),[]));return(n?r*t<100:r<100)?"near":(n?r*t<1e3:r<1e3)?"middle":"far"},N=j,k="Volumes",V={Proportions:"Proportions",Volumes:"Absolute","%GNI":"%GNI"},I=function(e){return void 0===e&&(e=""),e.trim()?Number(e.replace(",","").replace(" ","").replace("%","").trim()):null},M=function(e){return e.map((function(e){var n=Object.assign({},e);return n.value=I(n.Value),n}))},B=function(e){return e.filter((function(e){return"%GNI"===k?"Total HA"===e:"Total HA"!==e}))},U=function(){return"%GNI"===k?"line":"bar"},F=function(e,n,t,r,a){void 0===a&&(a="Proportion");var o=e.filter((function(e){return e.Donor.trim()===t&&e["IHA type"]===r&&e["Value type"]===a}));return n.map((function(e){return o.find((function(n){return n.Year===e}))}))},P=function(e,n,t){return void 0===n&&(n="currency"),void 0===t&&(t="auto"),new Intl.NumberFormat("en-US",{style:n,currency:"USD",signDisplay:t,maximumFractionDigits:0}).format(e)},L=function(e){void 0===e&&(e="far");return"Volumes"!==k?{type:"value",axisLabel:{formatter:"{value}%"},name:"",max:"Proportions"===k?100:null}:{type:"value",axisLabel:{formatter:"{value}"},nameRotate:90,name:"US$ millions",nameLocation:"end",nameTextStyle:{verticalAlign:"top",align:"right",padding:{near:[-35,0,0,0],middle:[-45,0,0,0],far:[-60,0,0,0]}[e]},max:null}},T=function(e,n,t){var r=t.years,a=t.channels,i={color:C.bluebell,legend:{show:!0,top:"top",padding:[20,10,5,10],textStyle:{fontSize:"1.3rem"}},grid:{bottom:"10%",top:"20%"},xAxis:{type:"category",data:r},yAxis:L(),series:B(a).map((function(e){return{name:e,data:F(n,r,"All donors",e,V[k]).map((function(e){return{value:e&&Number("Proportions"===k?100*e.value:e.value),emphasis:{focus:"self"}}})),type:U(),stack:"channels",tooltip:{trigger:"item",formatter:function(t){var r=n.find((function(n){return n["IHA type"]===e&&"All donors"===n.Donor&&""+n.Year===t.name&&n["Value type"]===V[k]})),a=e.includes("Multilateral HA")?e.replace("Multilateral HA","Multilateral Humanitarian Assistance"):e;return"All donors, "+t.name+" <br />"+a+": <strong>"+("Proportions"===k?t.value.toFixed(2)+"%":"US$"+P(I(r.Value),"decimal","never")+" million")+" </strong>"}},cursor:"auto"}}))};return i.yAxis=L(R(i.series)),N.toolbox.feature.saveAsImage.name="donors",e.setOption(o()(i,N),{replaceMerge:["series"]}),e.on("legendselectchanged",(function(n){D(e,n)})),e},z=function(e,n,t){var r=t.donors,a=t.channels,o=t.years,i=M(n),l=U(),s=r.map((function(e){return B(a).map((function(n,t){return{name:"%GNI"!==k?n:e,data:F(i,o,e,n,V[k]).map((function(e){return{value:e&&Number("Volumes"!==k?100*e.value:e.value),emphasis:{focus:"self"}}})),type:l,stack:"%GNI"!==k?e:void 0,symbol:"circle",symbolSize:10,tooltip:{trigger:"item",formatter:function(t){var r=i.find((function(r){return r["IHA type"]===n&&r.Donor===e&&""+r.Year===t.name&&r["Value type"]===V[k]})),a="Volumes"===k?"US$"+P(I(r.Value),"decimal","never")+" million":t.value.toFixed(2)+"%";return e+", "+t.name+" <br />"+n+": <strong>"+a+"</strong>"}},label:{show:"bar"===l&&(0===t&&r.length>1),position:"insideBottom",distance:15,align:"left",verticalAlign:"middle",rotate:90,formatter:function(){return""+e},fontSize:16},cursor:"auto"}}))})).reduce((function(e,n){return e.concat(n)}),[]);e.setOption({yAxis:L(R(s)),series:s},{replaceMerge:["series"]})},Y=function(){window.DICharts.handler.addChart({className:"dicharts--gha-donors",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,(function(e){var n=new window.DICharts.Chart(e.parentElement);A("https://raw.githubusercontent.com/devinit/gha-data-visualisations/main/public/assets/data/donor_interactive_data_long.csv").then((function(t){var a=O(e),o=Array.from(new Set(t.map((function(e){return e.Donor})))),l=Array.from(new Set(t.map((function(e){return e.Year})))).sort(),s=Array.from(new Set(t.map((function(e){return e["IHA type"]})))),c=window.echarts.init(e);T(c,M(t),{years:l,channels:s});var u=[];Object(i.createRoot)(a).render(Object(r.c)(S,{selectErrorMessage:"You can compare two donors. Please remove one before adding another."},Object(r.c)(h,{label:"Select up to two donors",options:o.map((function(e){return{value:e,label:e,isCloseable:"All donors"!==e}})),defaultValue:[{value:"All donors",label:"All donors"}],isMulti:!0,onChange:function(e){var n=e.find((function(e){return"All donors"===e.value}));if(e.length&&!n){var r=t.filter((function(n){return e.find((function(e){return e.value===n.Donor}))}));u=e.map((function(e){return e.value})),z(c,r,{donors:u,channels:s,years:l})}else T(c,M(t),{years:l,channels:s})},singleSelectOptions:[{value:"All donors",label:"All donors",isCloseable:!1}],css:{minWidth:"200px"},classNamePrefix:"donors-select",isClearable:!1}),Object(r.c)(h,{label:"Display data as",options:["Volumes","Proportions","%GNI"].map((function(e){return{value:e,label:e}})),defaultValue:[{value:"Volumes",label:"Volumes"}],onChange:function(e){if(k=e.value||k,u.length){var n=t.filter((function(e){return u.includes(e.Donor)}));z(c,n,{donors:u,channels:s,years:l})}else T(c,M(t),{years:l,channels:s})},css:{minWidth:"150px"},classNamePrefix:"donors-display-data-as"}))),n.hideLoading(),E(c,e)}))}))}}})},G=function(e){return void 0===e&&(e=""),e.trim()?Number(e.replace(",","").replace(" ","").replace("%","").trim()):null},$=function(e){return e.map((function(e){var n=Object.assign({},e);return n.value=G(e.Proportions),n}))},H=function(e,n,t,r){var a=e.filter((function(e){return e.Donor.trim()===t&&e["Delivery channel"]===r}));return n.map((function(e){return a.find((function(n){return n.Year===e}))}))},W=function(e,n,t){return void 0===n&&(n="currency"),void 0===t&&(t="auto"),new Intl.NumberFormat("en-US",{style:n,currency:"USD",signDisplay:t,maximumFractionDigits:0}).format(e)},_=function(e,n,t){var r=t.years,a=t.channels,i={color:C.bluebell,legend:{show:!0,top:"top",padding:[20,10,5,10],textStyle:{fontSize:"1.3rem"}},grid:{bottom:"10%",top:"20%"},xAxis:{type:"category",data:r},yAxis:{type:"value",axisLabel:{formatter:"{value}%"},max:100},series:a.map((function(e){return{name:e,data:H(n,r,"All donors",e).map((function(e){return{value:e&&Number(100*e.value).toFixed(2),emphasis:{focus:"self"}}})),type:"bar",stack:"channels",tooltip:{trigger:"item",formatter:function(t){var r=n.find((function(n){return n["Delivery channel"]===e&&"All donors"===n.Donor&&""+n.Year===t.name}));return"All donors, "+t.name+" <br />"+e+": <strong>"+Number(t.value,10).toFixed(2)+"%</strong> (US$"+W(G(r["US$ millions, constant 2020 prices"]),"decimal","never")+" million)"}},cursor:"auto"}}))};return N.toolbox.feature.saveAsImage.name="funding-channels",e.setOption(o()(i,N),{replaceMerge:["series"]}),e.on("legendselectchanged",(function(n){D(e,n)})),e},J=function(){window.DICharts.handler.addChart({className:"dicharts--boilerplate-chart",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,(function(e){var n=new window.DICharts.Chart(e.parentElement);A("https://raw.githubusercontent.com/devinit/gha-data-visualisations/main/public/assets/data/funding-channels-interactive-data.csv").then((function(t){var r,a,o,l=O(e),s=Array.from(new Set(t.map((function(e){return e.Donor})))),c=Array.from(new Set(t.map((function(e){return e.Year})))),u=(r=Array.from(new Set(t.map((function(e){return e["Delivery channel"]})))),a=["Not reported","Other"],o=r.filter((function(e){return!a.includes(e)})),a.forEach((function(e){r.includes(e)&&o.push(e)})),o),f=window.echarts.init(e);_(f,$(t),{years:c,channels:u});var p=[];Object(i.createRoot)(l).render(d.a.createElement(S,{selectErrorMessage:"You can compare two donors. Please remove one before adding another."},d.a.createElement(h,{label:"Select up to two donors",options:s.map((function(e){return{value:e,label:e,isCloseable:"All donors"!==e}})),defaultValue:[{value:"All donors",label:"All donors",isCloseable:!1}],isMulti:!0,onChange:function(e){var n=e.find((function(e){return"All donors"===e.value}));if(e.length&&!n){var r=t.filter((function(n){return e.find((function(e){return e.value===n.Donor}))}));p=e.map((function(e){return e.value})),function(e,n,t){var r=t.donors,a=t.channels,o=t.years,i=$(n),l=r.map((function(e){return a.map((function(n,t){return{name:n,data:H(i,o,e,n).map((function(e){return{value:e&&Number(100*e.value).toFixed(2),emphasis:{focus:"self"}}})),type:"bar",stack:e,tooltip:{trigger:"item",formatter:function(t){var r=i.find((function(r){return r["Delivery channel"]===n&&r.Donor===e&&""+r.Year===t.name})),a=r?"<strong>"+(100*r.value).toFixed(2)+"%</strong> (US$"+W(G(r["US$ millions, constant 2020 prices"]),"decimal","never")+" million)":"<strong>"+(100*r.value).toFixed(2)+"%</strong>";return e+", "+t.name+" <br />"+n+": "+a}},label:{show:0===t&&r.length>1,position:"insideBottom",distance:15,align:"left",verticalAlign:"middle",rotate:90,formatter:function(){return""+e},fontSize:16},cursor:"auto"}}))})).reduce((function(e,n){return e.concat(n)}),[]);e.setOption({series:l},{replaceMerge:["series"]})}(f,r,{donors:p,channels:u,years:c})}else _(f,$(t),{years:c,channels:u})},singleSelectOptions:[{value:"All donors",label:"All donors",isCloseable:!1}],css:{minWidth:"200px"},classNamePrefix:"channels-chart-select",isClearable:!1}))),n.hideLoading(),E(f,e)}))}))}}})},K=t(163),q=t.n(K),Q=t(227),X=function(e){var n=Object(f.useState)(e.donorRecipients),t=n[0],a=n[1],o=Object(f.useState)(e.defaultBreakdown),i=o[0],l=o[1],s=Object(f.useState)(e.defaultRecipient),c=s[0],u=s[1];Object(f.useEffect)((function(){a("By donor"===i?e.donorRecipients:e.orgTypeRecipients),e.onSelectBreakdown&&e.onSelectBreakdown(i,c)}),[i]),Object(f.useEffect)((function(){e.onSelectRecipient&&e.onSelectRecipient(c,i)}),[c]);return Object(r.c)(S,null,Object(r.c)(h,{classNamePrefix:"recipient-chart-select",label:"Select recipient",options:t.sort().map((function(e){return{value:e,label:e}})),defaultValue:[{value:e.defaultRecipient,label:e.defaultRecipient}],onChange:function(n){u(n.value||e.defaultRecipient)},css:{minWidth:"150px"}}),Object(r.c)(h,{classNamePrefix:"recipient-chart-breakdown",label:"Choose breakdown",options:["By donor","By type of organisation receiving funding"].map((function(e){return{value:e,label:e}})),defaultValue:[{value:e.defaultBreakdown,label:e.defaultBreakdown}],onChange:function(n){l(n.value||e.defaultBreakdown)},css:{minWidth:"300px"}}))};X.propTypes={donorRecipients:u.a.array,orgTypeRecipients:u.a.array,defaultRecipient:u.a.string,defaultBreakdown:u.a.string,onSelectBreakdown:u.a.func,onSelectRecipient:u.a.func},X.defaultProps={defaultBreakdown:"By donor",defaultRecipient:"Afghanistan"};var Z=X,ee=new Intl.NumberFormat,ne=function(e){return e.trim()?Number(e.replace(",","").replace(" ","").replace("%","").trim()).toFixed(2):null},te=function(e,n){return void 0===n&&(n="Value"),e.map((function(e){var t=Object.assign({},e);return t.value=ne(e[n]),t}))},re=function(e,n,t,r){var a=e.filter((function(e){return e["Destination Country"].trim()===t&&e["Donor organisation"]===r}));return n.map((function(e){return a.find((function(n){return n.Year===e}))||null}))},ae=function(e,n,t){var r=["Destination Country","Recipient Org Type"],a=e.filter((function(e){return e[r[1]]===n}));return t.map((function(e){var n=a.find((function(n){return n.Year===e}));return{value:n&&ne(n.value)||null,emphasis:{focus:"self"}}}))},oe=function(e,n){var t=["United States","EU institutions","Germany","United Kingdom","Saudi Arabia","All other donors"],r=e.filter((function(e){return e["Destination Country"].trim()===n}));return t.length>=5?t:Array.from(new Set(r.map((function(e){return e["Donor organisation"]})))).filter((function(e){return!t.includes(e)})).slice(0,5).concat(t)},ie=function(e){void 0===e&&(e="far");return{type:"value",nameRotate:90,name:"US$ millions",nameLocation:"end",nameTextStyle:{verticalAlign:"top",align:"right",padding:{near:[-35,0,0,0],middle:[-45,0,0,0],far:[-54,0,0,0]}[e]}}},le=function(e,n,t,r){var a=r.years,i=r.channels,l={color:C.bluebell,legend:{show:!0,top:"top",padding:[20,10,5,10],textStyle:{fontSize:"1.3rem"}},grid:{bottom:"10%",top:"20%"},xAxis:{type:"category",data:a,position:"bottom"},series:i.map((function(e){return{name:e,data:re(n,a,t,e).map((function(e){return{value:e&&Number(e.value).toFixed(2),emphasis:{focus:"self"}}})),type:"bar",stack:"channels",cursor:"auto",tooltip:{trigger:"item",formatter:function(n){return e+", "+n.name+" <br />10 largest recipients: <strong>US$"+ee.format(Math.round(n.value))+" million</strong>"}},animation:!1}}))};return l.yAxis=ie(R(l.series)),N.toolbox.feature.saveAsImage.name="recipients",e.setOption(o()(l,N),{replaceMerge:["series"]}),e.on("legendselectchanged",(function(n){D(e,n)})),e},se=function(e,n,t){var r=t.recipient,a=t.years,o=te(n,"USD deflated millions"),i=oe(n,r).map((function(e){return{name:e,data:re(o,a,r,e).map((function(e){return{value:e&&Number(e.value).toFixed(2),emphasis:{focus:"self"}}})),type:"bar",stack:r,cursor:"auto",tooltip:{trigger:"item",formatter:function(n){return e+", "+n.name+" <br/>"+r+": <strong>US$"+ee.format(Math.round(n.value))+" million</strong>"}}}})).reduce((function(e,n){return e.concat(n)}),[]);e.setOption({yAxis:ie(R(i)),series:i},{replaceMerge:["series"]})},ce=function(e,n,t){var r=t.recipient,a=t.years,o=function(e){var n=["Not reported","Other"],t=e.filter((function(e){return!n.includes(e)}));return n.forEach((function(n){e.includes(n)&&t.push(n)})),t}(function(e,n){var t=e.filter((function(e){return e["Destination Country"].trim()===n}));return Array.from(new Set(t.map((function(e){return e["Recipient Org Type"]}))))}(n,r)).map((function(e){return{name:e,data:ae(n,e,a),type:"bar",stack:r,cursor:"auto",tooltip:{trigger:"item",formatter:function(n){return n.name+" <br/>"+e+": <strong>US$"+ee.format(Math.round(n.value))+" million</strong>"}}}})).reduce((function(e,n){return e.concat(n)}),[]);e.setOption({yAxis:ie(R(o)),series:o},{replaceMerge:["series"]})},ue=function(){window.DICharts.handler.addChart({className:"dicharts--gha-recipients",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,function(){var e=Object(Q.a)(q.a.mark((function e(n){var t,r,a,o,l,s,c,u,f,p,m,b;return q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new window.DICharts.Chart(n.parentElement),e.next=3,A("https://raw.githubusercontent.com/devinit/gha-data-visualisations/main/public/assets/data/recipients-by-donor.csv");case 3:return r=e.sent,e.next=6,A("https://raw.githubusercontent.com/devinit/gha-data-visualisations/main/public/assets/data/recipients-by-org-type.csv");case 6:a=e.sent,o=O(n),l=Array.from(new Set(r.filter((function(e){return"Yes"===e["Top 10 recipient"]})).map((function(e){return e["Destination Country"]})))),s=Array.from(new Set(r.map((function(e){return e.Year})))),"Afghanistan","By donor",c=oe(r,"Afghanistan"),u=Array.from(new Set(a.filter((function(e){return"Yes"===e["Top 10 recipient"]})).map((function(e){return e["Destination Country"]})))),f=window.echarts.init(n),le(f,te(r,"USD deflated millions"),"Afghanistan",{years:s,channels:c}),p="Afghanistan",m=function(e,n){if(void 0===n&&(n="By donor"),p=e||"Afghanistan","By donor"===n)if("10 largest recipients"!==p){var t=r.filter((function(e){return e["Destination Country"]===p}));se(f,t,{recipient:p,years:s})}else p="10 largest recipients",le(f,te(r,"USD deflated millions"),"10 largest recipients",{years:s,channels:c});else ce(f,a.filter((function(n){return n["Destination Country"]===e})),{recipient:e,years:s})},b=function(e,n){if("By donor"===e)if("10 largest recipients"!==n){var t=r.filter((function(e){return e["Destination Country"]===n}));se(f,t,{recipient:n,years:s})}else le(f,te(r,"USD deflated millions"),"10 largest recipients",{years:s,channels:c});else ce(f,a.filter((function(e){return e["Destination Country"]===n})),{recipient:n,years:s})},Object(i.createRoot)(o).render(d.a.createElement(Z,{donorRecipients:l,orgTypeRecipients:u,onSelectRecipient:m,onSelectBreakdown:b,defaultBreakdown:"By donor",defaultRecipient:"Afghanistan"})),t.hideLoading(),E(f,n);case 23:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}())}}})};t(579);window.addEventListener("load",(function(){Y(),J(),ue()}))}},[[230,1,2]]]);