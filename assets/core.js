(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{254:function(e,n,t){e.exports=t(623)},622:function(e,n,t){},623:function(e,n,t){"use strict";t.r(n);t(255),t(263),t(264),t(265),t(266),t(267),t(268),t(269),t(270),t(271),t(272),t(273),t(274),t(275),t(276),t(277),t(278),t(279),t(280),t(281),t(282),t(283),t(284),t(286),t(123),t(287),t(288),t(289),t(290),t(291),t(292),t(293),t(294),t(296),t(297),t(298),t(300),t(301),t(302),t(304),t(305),t(306),t(161),t(308),t(309),t(310),t(311),t(312),t(313),t(314),t(315),t(316),t(317),t(318),t(320),t(321),t(322),t(323),t(324),t(325),t(326),t(327),t(328),t(329),t(330),t(331),t(332),t(333),t(334),t(335),t(337),t(338),t(339),t(340),t(341),t(342),t(343),t(344),t(345),t(346),t(347),t(348),t(349),t(350),t(351),t(352),t(353),t(354),t(355),t(356),t(357),t(358),t(359),t(361),t(362),t(372),t(373),t(374),t(376),t(377),t(378),t(379),t(380),t(381),t(382),t(383),t(384),t(385),t(386),t(387),t(223),t(389),t(390),t(391),t(393),t(394),t(395),t(396),t(224),t(397),t(398),t(399),t(400),t(401),t(402),t(403),t(404),t(405),t(406),t(407),t(409),t(411),t(412),t(413),t(414),t(415),t(416),t(417),t(418),t(419),t(420),t(421),t(422),t(423),t(424),t(427),t(428),t(429),t(430),t(431),t(432),t(433),t(434),t(435),t(436),t(437),t(438),t(441),t(442),t(443),t(444),t(445),t(446),t(447),t(448),t(449),t(451),t(452),t(453),t(454),t(455),t(456),t(457),t(458),t(459),t(460),t(461),t(462),t(173),t(464),t(466),t(474),t(475),t(476),t(477),t(478),t(480),t(481),t(482),t(483),t(484),t(485),t(486),t(487),t(489),t(490),t(491),t(492),t(493),t(494),t(495),t(496),t(497),t(498),t(499),t(500),t(501),t(502),t(503),t(504),t(505),t(506),t(507),t(508),t(509),t(510),t(511),t(512),t(516),t(518),t(520),t(521),t(522),t(523),t(524),t(526),t(527),t(528),t(529),t(530),t(531),t(532),t(533),t(536),t(537),t(538),t(539),t(540),t(542),t(544),t(546),t(548),t(549),t(550),t(551),t(552),t(553),t(555),t(557),t(558),t(559),t(561),t(563),t(564),t(565),t(566),t(568),t(569),t(570),t(571),t(572),t(573),t(574),t(576),t(577),t(582),t(583),t(586),t(587);var a,r=t(3),o=t(93),i=t.n(o),s=t(62),l=t(141),c=t(1),u=t.n(c),d=t(13),f=t.n(d),p=t(247),m=t(253).a.div(a||(a=Object(p.a)(["\n  color: red;\n  font-size: 11px;\n  position: relative;\n  padding: 5px 5px 5px 0px;\n  display: block;\n"]))),b=function(e){var n=Object(c.useState)(""),t=n[0],a=n[1],r=function(n){n?"maxSelectedOptions"===n.type&&a(e.selectErrorMessage):a("")};return u.a.createElement("div",null,u.a.Children.map(e.children,(function(e){return u.a.isValidElement(e)?u.a.cloneElement(e,{onError:r}):e})),t?u.a.createElement(m,{className:"data-selector--wrapper"},t):null)};b.propTypes={selectErrorMessage:f.a.string,children:f.a.node};var g=b,v=t(248),h=t(252),y={control:function(e){return Object.assign({},e,{borderColor:"#ddd",borderRadius:"none",boxShadow:"none",":hover":{borderColor:"#8f1b13"},":active":{borderColor:"#8f1b13"}})},option:function(e){return Object.assign({},e,{fontSize:"14px"})},singleValue:function(e){return Object.assign({},e,{fontSize:"14px"})},multiValue:function(e){return Object.assign({},e,{fontSize:"14px"})},multiValueLabel:function(e,n){return n.data.isCloseable?e:Object.assign({},e,{paddingRight:6})},multiValueRemove:function(e,n){return n.data.isCloseable?e:Object.assign({},e,{display:"none"})},input:function(e){return Object.assign({},e,{fontSize:"14px"})},indicatorsContainer:function(e){return Object.assign({},e,{pointerEvents:"none"})}},w=function(e){var n=e.label,t=e.onError,a=e.maxSelectedOptions,o=e.defaultValue,i=e.singleSelectOptions,s=Object(l.a)(e,["label","onError","maxSelectedOptions","defaultValue","singleSelectOptions"]),u=Object(c.useState)(o),d=u[0],f=u[1];Object(c.useEffect)((function(){s.onChange&&s.onChange(d),t&&t()}),[d]);return Object(r.b)("div",{className:"labelled-data-selector--wrapper"},Object(r.b)("label",null,Object(r.b)("b",null,n)),Object(r.b)(h.a,Object(v.a)({},s,{value:d,onChange:function(e){if(s.isMulti)if(e.length){var n=e.findIndex((function(e){return i.find((function(n){return n.value===e.value}))}));s.isMulti&&e.length>1&&-1!==n?f(0===n?e.slice(1):[e[n]]):a&&e.length>a?t&&t({type:"maxSelectedOptions",message:"Only up to "+a+" selections allowed"}):f(e)}else f(o);else f(e)},css:{marginRight:"10px"},styles:y,isClearable:"undefined"!==s.isClearable?s.isClearable:d.length>1})))};w.propTypes={label:f.a.string,options:f.a.array,maxSelectedOptions:f.a.number,onChange:f.a.func,onError:f.a.func,defaultValue:f.a.array,singleSelectOptions:f.a.array,isMulti:f.a.bool,isClearable:f.a.bool},w.defaultProps={maxSelectedOptions:2,singleSelectOptions:[]};var S=w,x=function(e){var n=e.defaultDonor,t=e.onSelectDonor,a=Object(l.a)(e,["defaultDonor","onSelectDonor"]),r=Object(c.useState)(a.donors),o=r[0],i=r[1],s=Object(c.useState)(a.defaultDataType),d=s[0],f=s[1];Object(c.useEffect)((function(){i(a.donors)}),[a.donors]);return u.a.createElement(g,{selectErrorMessage:a.donorSelectErrorMessage},u.a.createElement(S,{label:"Select up to two donors",options:o.map((function(e){return{value:e,label:e,isCloseable:!0}})),defaultValue:[{value:n,label:n,isCloseable:!0}],isMulti:!0,onChange:t,css:{minWidth:"200px"},classNamePrefix:"donors-select",isClearable:!1}),u.a.createElement(S,{label:"Display data as",options:["Volumes","Proportions","%GNI"].map((function(e){return{value:e,label:e}})),defaultValue:[{value:d,label:d}],value:d,onChange:function(e){f(e?e.value:a.defaultDataType),a.onSelectDataType&&a.onSelectDataType(e?e.value:a.defaultDataType)},css:{minWidth:"150px"},classNamePrefix:"donors-display-data-as"}))};x.propTypes={donors:f.a.array,donorSelectErrorMessage:f.a.string,onSelectDonor:f.a.func,onSelectDataType:f.a.func,defaultDonor:f.a.string,defaultDataType:f.a.string};var _=x,C=t(249),E=function(e){return new Promise((function(n){Object(C.parse)(e,{download:!0,header:!0,skipEmptyLines:!0,complete:function(e){var t=e.data;return n(t)}})}))},O=function(e){var n,t=document.createElement("div");return(n=t.classList).add.apply(n,["spotlight-banner","data-selector--wrapper"]),e.parentElement.insertBefore(t,e),t},A={rainbow:["#e84439","#eb642b","#f49b21","#109e68","#0089cc","#893f90","#c2135b","#f8c1b2","#f6bb9d","#fccc8e","#92cba9","#88bae5","#c189bb","#e4819b"],default:["#6c120a","#a21e25","#cd2b2a","#dc372d","#ec6250","#f6b0a0","#fbd7cb","#fce3dc"],sunflower:["#7d4712","#ba6b15","#df8000","#f7a838","#fac47e","#fedcab","#fee7c1","#feedd4"],marigold:["#7a2e05","#ac4622","#cb5730","#ee7644","#f4a57c","#facbad","#fcdbbf","#fde5d4"],rose:["#65093d","#8d0e56","#9f1459","#d12568","#e05c86","#f3a5b6","#f6b8c1","#f9cdd0"],lavendar:["#42184c","#632572","#732c85","#994d98","#af73ae","#cb98c4","#deb5d6","#ebcfe5"],bluebell:["#0c457b","#0071b1","#0089cc","#5da3d9","#77adde","#88bae5","#bcd4f0","#d3e0f4"],leaf:["#08492f","#005b3e","#00694a","#3b8c62","#74bf93","#a2d1b0","#b1d8bb","#c5e1cb"],orange:["#973915","#d85b31","#eb642b","#f18e5e","#f4a57c","#f6bb9d"]},j=function(e,n){var t=n.selected,a=Object.values(t).filter((function(e){return e})).length;e.setOption({animation:!0}),0===a?Object.keys(t).forEach((function(n){e.dispatchAction({type:"legendSelect",name:n})})):t[n.name]||(e.dispatchAction({type:"legendSelect",name:n.name}),Object.keys(t).forEach((function(a){Object.prototype.hasOwnProperty.call(t,a)&&a!==n.name&&e.dispatchAction({type:"legendUnSelect",name:a})})))},D={color:A.default.concat(A.rainbow),legend:{left:"10%",top:10,textStyle:{fontFamily:"Geomanist Regular,sans-serif"}},tooltip:{show:!0,trigger:"item",showContent:!0,textStyle:{fontFamily:"Geomanist Regular,sans-serif"}},toolbox:{show:!0,showTitle:!1,feature:{saveAsImage:{title:"Save as PNG",pixelRatio:2}},right:20,tooltip:{show:!0,formatter:function(e){return"<div>"+e.title+"</div>"},textStyle:{fontFamily:"Geomanist Regular,sans-serif"}}},xAxis:{axisLabel:{fontFamily:"Geomanist Regular,sans-serif",fontSize:13},splitLine:{show:!1}},yAxis:{axisLabel:{fontFamily:"Geomanist Regular,sans-serif",fontSize:13},splitLine:{show:!1},nameLocation:"end",nameTextStyle:{padding:[0,50,0,0]}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0}},R=function(e,n){window.addEventListener("resize",(function(){e.resize({width:n.clientWidth+"px",height:n.clientHeight+"px"})}),!0)},N=function(e){var n=e.some((function(e){return e.stack})),t=Array.from(new Set(e.map((function(e){return e.name})))).length,a=Math.max.apply(Math,e.reduce((function(e,n){var t=n.data;return e.concat(t.map((function(e){return e.value||0})))}),[]));return 0===a?"blank":(n?a*t<100:a<100)?"near":(n?a*t<1e3:a<1e3)?"middle":"far"},L=D,I=["#f49b21","#fccc8e","#f9b865"],M="Volumes",T={Proportions:"Proportions",Volumes:"Volumes","%GNI":"%GNI"},k=function(e){return void 0===e&&(e=""),e.trim()?Number(e.replace(",","").replace(" ","").replace("%","").trim()):null},V=function(e){return e.map((function(e){var n=Object.assign({},e);return n.value=k(n.Value),n}))},P=function(){return"%GNI"===M?"line":"bar"},F=function(e,n,t,a,r){void 0===r&&(r="Proportions");var o=e.filter((function(e){return e.Donor.trim()===t&&e.Series===a&&e.Display===r}));return n.map((function(e){return o.find((function(n){return n.Year===e}))}))},B=function(e,n,t){return void 0===n&&(n="currency"),void 0===t&&(t="auto"),new Intl.NumberFormat("en-US",{style:n,currency:"USD",signDisplay:t,maximumFractionDigits:0}).format(e)},U=function(e){void 0===e&&(e="far");return"Volumes"!==M?{type:"value",axisLabel:{formatter:"{value}%"},name:"",max:"Proportions"===M?100:null}:{type:"value",axisLabel:{formatter:"{value}"},nameRotate:90,name:"US$ millions",nameLocation:"end",nameTextStyle:{verticalAlign:"top",align:"right",padding:{near:[-35,0,0,0],middle:[-45,0,0,0],far:[-60,0,0,0]}[e]},max:null}},$=function(e,n,t){var a=t.years,r=t.channels,o={color:I,legend:{show:!0,top:"top",padding:[20,10,5,10],textStyle:{fontSize:"1.3rem"}},grid:{bottom:"10%",top:"20%"},xAxis:{type:"category",data:a},yAxis:U(),series:r.map((function(e){return{name:e,data:F(n,a,"All donors",e,T[M]).map((function(e){return{value:e?e.value:null,emphasis:{focus:"self"}}})),type:P(),stack:"channels",tooltip:{trigger:"item",formatter:function(t){var a=n.find((function(n){return n.Series===e&&"All donors"===n.Donor&&""+n.Year===t.name&&n.Display===T[M]})),r=e.includes("Multilateral HA")?e.replace("Multilateral HA","Multilateral Humanitarian Assistance"):e;return"All donors, "+t.name+" <br />"+r+": <strong>"+("Proportions"===M?t.value.toFixed(2)+"%":"US$"+B(k(a.Value),"decimal","never")+" million")+" </strong>"}},cursor:"auto"}}))};return o.yAxis=U(N(o.series)),L.toolbox.feature.saveAsImage.name="donors",e.setOption(i()(o,L),{replaceMerge:["series"]}),e.on("legendselectchanged",(function(n){j(e,n)})),e},z=function(e,n,t){var a=t.donors,r=t.channels,o=t.years,i=V(n),s=P(),l=a.map((function(e){return r.map((function(n,t){return{name:"%GNI"!==M?n:e,data:F(i,o,e,n,T[M]).map((function(e){return{value:e&&"number"==typeof e.value?e.value:null,emphasis:{focus:"self"}}})),type:s,stack:"%GNI"!==M?e:void 0,symbol:"circle",symbolSize:10,connectNulls:"line"!==s&&void 0,tooltip:{trigger:"item",formatter:function(t){var a=i.find((function(a){return a.Series===n&&a.Donor===e&&""+a.Year===t.name&&a.Display===T[M]})),r="Volumes"===M?"US$"+B(k(a.Value),"decimal","never")+" million":t.value.toFixed(2)+"%";return e+", "+t.name+" <br />"+("%GNI"===M?"Total HA":n)+": <strong>"+r+"</strong>"}},label:{show:"bar"===s&&(0===t&&a.length>1),position:"insideBottom",distance:15,align:"left",verticalAlign:"middle",rotate:90,formatter:function(){return""+e},fontSize:16},cursor:"auto"}}))})).reduce((function(e,n){return e.concat(n)}),[]);e.setOption({yAxis:U(N(l)),series:l},{replaceMerge:["series"]})},G=function(){window.DICharts.handler.addChart({className:"dicharts--gha-donors",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,(function(e){var n=new window.DICharts.Chart(e.parentElement);E("https://raw.githubusercontent.com/devinit/gha-data-visualisations/feature/data-updates/public/assets/data/donor_interactive_data_long.csv").then((function(t){var a=O(e),o=Array.from(new Set(t.map((function(e){return e.Donor})))).sort(),i=Array.from(new Set(t.map((function(e){return e.Year})))).sort(),l=Array.from(new Set(t.map((function(e){return e.Series})))),c=window.echarts.init(e);$(c,V(t),{years:i,channels:l});var u=[];Object(s.createRoot)(a).render(Object(r.b)(_,{selectErrorMessage:"You can compare two donors. Please remove one before adding another.",donors:o,onSelectDataType:function(e){if(M=e||M,u.length){var n=t.filter((function(e){return u.includes(e.Donor)}));z(c,n,{donors:u,channels:l,years:i})}else $(c,V(t),{years:i,channels:l})},onSelectDonor:function(e){if(e.length){var n=t.filter((function(n){return e.find((function(e){return e.value===n.Donor}))}));u=e.map((function(e){return e.value})),z(c,n,{donors:u,channels:l,years:i})}else $(c,V(t),{years:i,channels:l})},defaultDonor:"All donors",defaultDataType:"Volumes",donorSelectErrorMessage:"You can compare two donors. Please remove one before adding another."})),n.hideLoading(),R(c,e)}))}))}}})},Y=["#f49b21","#feedd4","#fccc8e","#f9b865","#e48a00","#a85d00","#7d4712"],H=function(e){return void 0===e&&(e=""),e.trim()?Number(e.replace(",","").replace(" ","").replace("%","").trim()):null},q=function(e){return e.map((function(e){var n=Object.assign({},e);return n.value=H(e.Value),n}))},W=function(e,n,t,a){var r=e.filter((function(e){return e.Donor.trim()===t&&e.Series===a}));return n.map((function(e){return r.find((function(n){return n.Year===e}))}))},J=function(e,n,t){var a=t.years,r=t.channels,o={color:Y,legend:{show:!0,top:"top",padding:[20,10,5,10],textStyle:{fontSize:"1.3rem"}},grid:{bottom:"10%",top:"20%"},xAxis:{type:"category",data:a},yAxis:{type:"value",axisLabel:{formatter:"{value}%"},max:100},series:r.map((function(e){return{name:e,data:W(n,a,"All donors",e).map((function(e){return{value:e&&Number(e.value),emphasis:{focus:"self"}}})),type:"bar",stack:"channels",tooltip:{trigger:"item",formatter:function(t){var a,r,o,i=n.find((function(n){return n.Series===e&&"All donors"===n.Donor&&""+n.Year===t.name}));return"All donors, "+t.name+" <br />"+e+": <strong>"+Number(t.value,10).toFixed(2)+"%</strong> (US$"+(a=H(i["US$ millions, constant 2020 prices"]),void 0===(r="decimal")&&(r="currency"),void 0===(o="never")&&(o="auto"),new Intl.NumberFormat("en-US",{style:r,currency:"USD",signDisplay:o,maximumFractionDigits:0}).format(a)+" million)")}},cursor:"auto"}}))};return L.toolbox.feature.saveAsImage.name="funding-channels",e.setOption(i()(o,L),{replaceMerge:["series"]}),e.on("legendselectchanged",(function(n){j(e,n)})),e},Z=function(){window.DICharts.handler.addChart({className:"dicharts--boilerplate-chart",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,(function(e){var n=new window.DICharts.Chart(e.parentElement);E("https://raw.githubusercontent.com/devinit/gha-data-visualisations/feature/data-updates/public/assets/data/funding-channels-interactive-data.csv").then((function(t){var a,r,o,i=O(e),l=Array.from(new Set(t.map((function(e){return e.Donor})))),c=Array.from(new Set(t.map((function(e){return e.Year})))),d=(a=Array.from(new Set(t.map((function(e){return e.Series})))),r=["Not reported","Other"],o=a.filter((function(e){return!r.includes(e)})),r.forEach((function(e){a.includes(e)&&o.push(e)})),o),f=window.echarts.init(e);J(f,q(t),{years:c,channels:d});var p=[];Object(s.createRoot)(i).render(u.a.createElement(g,{selectErrorMessage:"You can compare two donors. Please remove one before adding another."},u.a.createElement(S,{label:"Select up to two donors",options:l.map((function(e){return{value:e,label:e,isCloseable:!0}})),defaultValue:[{value:"All donors",label:"All donors",isCloseable:!0}],isMulti:!0,onChange:function(e){if(e.length){var n=t.filter((function(n){return e.find((function(e){return e.value===n.Donor}))}));p=e.map((function(e){return e.value})),function(e,n,t){var a=t.donors,r=t.channels,o=t.years,i=q(n),s=a.map((function(e){return r.map((function(n,t){return{name:n,data:W(i,o,e,n).map((function(e){return{value:e&&Number(e.value).toFixed(2),emphasis:{focus:"self"}}})),type:"bar",stack:e,tooltip:{trigger:"item",formatter:function(t){var a="<strong>"+i.find((function(a){return a.Series===n&&a.Donor===e&&""+a.Year===t.name})).value+"%</strong>";return e+", "+t.name+" <br />"+n+": "+a}},label:{show:0===t&&a.length>1,position:"insideBottom",distance:15,align:"left",verticalAlign:"middle",rotate:90,formatter:function(){return""+e},fontSize:16},cursor:"auto"}}))})).reduce((function(e,n){return e.concat(n)}),[]);e.setOption({series:s},{replaceMerge:["series"]})}(f,n,{donors:p,channels:d,years:c})}else J(f,q(t),{years:c,channels:d})},css:{minWidth:"200px"},classNamePrefix:"channels-chart-select",isClearable:!1}))),n.hideLoading(),R(f,e)}))}))}}})},K=t(179),Q=t.n(K),X=t(250),ee=function(e){var n=Object(c.useState)(e.donorRecipients),t=n[0],a=n[1],o=Object(c.useState)(e.defaultBreakdown),i=o[0],s=o[1],l=Object(c.useState)(e.defaultRecipient),u=l[0],d=l[1];Object(c.useEffect)((function(){a("By donor"===i?e.donorRecipients:e.orgTypeRecipients),e.onSelectBreakdown&&e.onSelectBreakdown(i,u)}),[i]),Object(c.useEffect)((function(){e.onSelectRecipient&&e.onSelectRecipient(u,i)}),[u]);return Object(r.b)(g,null,Object(r.b)(S,{classNamePrefix:"recipient-chart-select",label:"Select recipient",options:t.sort().map((function(e){return{value:e,label:e}})),defaultValue:[{value:e.defaultRecipient,label:e.defaultRecipient}],onChange:function(n){d(n.value||e.defaultRecipient)},css:{minWidth:"150px"}}),Object(r.b)(S,{classNamePrefix:"recipient-chart-breakdown",label:"Choose breakdown",options:["By donor","By type of organisation receiving funding"].map((function(e){return{value:e,label:e}})),defaultValue:[{value:e.defaultBreakdown,label:e.defaultBreakdown}],onChange:function(n){s(n.value||e.defaultBreakdown)},css:{minWidth:"300px"}}))};ee.propTypes={donorRecipients:f.a.array,orgTypeRecipients:f.a.array,defaultRecipient:f.a.string,defaultBreakdown:f.a.string,onSelectBreakdown:f.a.func,onSelectRecipient:f.a.func},ee.defaultProps={defaultBreakdown:"By donor",defaultRecipient:"Afghanistan"};var ne=ee,te=["#f49b21","#fccc8e","#f9b865","#e48a00","#a85d00","#7d4712"],ae=["#f49b21","#feedd4","#fccc8e","#f9b865","#e48a00","#a85d00","#7d4712"],re=new Intl.NumberFormat,oe=function(e){return e.trim()?Number(e.replace(",","").replace(" ","").replace("%","").trim()).toFixed(2):null},ie=function(e,n){return void 0===n&&(n="Value"),e.map((function(e){var t=Object.assign({},e);return t.value=oe(e[n]),t}))},se=function(e,n,t,a){var r=e.filter((function(e){return e.Recipient.trim()===t&&e.Series===a}));return n.map((function(e){return r.find((function(n){return n.Year===e}))||null}))},le=function(e,n,t){var a=e.filter((function(e){return e.Series===n}));return t.map((function(e){var n=a.find((function(n){return n.Year===e}));return{value:n&&oe(n.Value)||null,emphasis:{focus:"self"}}}))},ce=function(e,n){var t=["US","Germany","EU institutions","Japan","UK","All other donors"],a=e.filter((function(e){return e.Recipient.trim()===n}));return t.length>=5?t:Array.from(new Set(a.map((function(e){return e.Series})))).filter((function(e){return!t.includes(e)})).slice(0,5).concat(t)},ue=function(e){void 0===e&&(e="far");return{type:"value",nameRotate:90,name:"US$ millions",nameLocation:"end",nameTextStyle:{verticalAlign:"top",align:"right",padding:{near:[-35,0,0,0],middle:[-45,0,0,0],far:[-54,0,0,0]}[e]}}},de=function(e,n,t,a){var r=a.years,o=a.channels,s={color:te,legend:{show:!0,top:"top",padding:[20,10,5,10],textStyle:{fontSize:"1.3rem"}},grid:{bottom:"10%",top:"20%"},xAxis:{type:"category",data:r,position:"bottom"},series:o.map((function(e){return{name:e,data:se(n,r,t,e).map((function(e){return{value:e&&Number(e.value).toFixed(2),emphasis:{focus:"self"}}})),type:"bar",stack:"channels",cursor:"auto",tooltip:{trigger:"item",formatter:function(n){return e+", "+n.name+" <br />10 largest recipients: <strong>US$"+re.format(Math.round(n.value))+" million</strong>"}},animation:!1}}))};return s.yAxis=ue(N(s.series)),L.toolbox.feature.saveAsImage.name="recipients",e.setOption(i()(s,L),{replaceMerge:["series"]}),e.on("legendselectchanged",(function(n){j(e,n)})),e},fe=function(e,n,t){var a=t.recipient,r=t.years,o=ie(n),i=ce(n,a).map((function(e){return{name:e,data:se(o,r,a,"All other donors"===e?"Other donors":e).map((function(e){return{value:e&&Number(e.value).toFixed(2),emphasis:{focus:"self"}}})),type:"bar",stack:a,cursor:"auto",tooltip:{trigger:"item",formatter:function(n){return e+", "+n.name+" <br/>"+a+": <strong>US$"+re.format(Math.round(n.value))+" million</strong>"}}}})).reduce((function(e,n){return e.concat(n)}),[]);e.setOption({yAxis:ue(N(i)),series:i},{replaceMerge:["series"]})},pe=function(e,n,t){var a=t.recipient,r=t.years,o=function(e){var n=["Not reported","Other"],t=e.filter((function(e){return!n.includes(e)}));return n.forEach((function(n){e.includes(n)&&t.push(n)})),t}(function(e,n){var t=e.filter((function(e){return e.Recipient.trim()===n}));return Array.from(new Set(t.map((function(e){return e.Series}))))}(n,a)).map((function(e){return{name:e,data:le(n,e,r),type:"bar",stack:a,cursor:"auto",tooltip:{trigger:"item",formatter:function(n){return n.name+" <br/>"+e+": <strong>US$"+re.format(Math.round(n.value))+" million</strong>"}}}})).reduce((function(e,n){return e.concat(n)}),[]),i=ae;e.setOption({yAxis:ue(N(o)),color:i,series:o},{replaceMerge:["series"]})},me=function(){window.DICharts.handler.addChart({className:"dicharts--gha-recipients",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,function(){var e=Object(X.a)(Q.a.mark((function e(n){var t,a,r,o,i,l,c,d,f,p,m,b,g;return Q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new window.DICharts.Chart(n.parentElement),e.next=3,E("https://raw.githubusercontent.com/devinit/gha-data-visualisations/feature/data-updates/public/assets/data/recipient-and-donors.csv");case 3:a=e.sent,r=a.filter((function(e){return"Donor"===e.Type})),o=a.filter((function(e){return"Channel"===e.Type})),i=O(n),l=Array.from(new Set(r.map((function(e){return e.Recipient})))),c=Array.from(new Set(r.map((function(e){return e.Year})))),"Afghanistan","By donor",d=ce(r,"Afghanistan"),f=Array.from(new Set(o.map((function(e){return e.Recipient})))),p=window.echarts.init(n),de(p,ie(r),"Afghanistan",{years:c,channels:d}),m="Afghanistan",b=function(e,n){if(void 0===n&&(n="By donor"),m=e||"Afghanistan","By donor"===n)if("10 largest recipients"!==m){var t=r.filter((function(e){return e.Recipient===m}));fe(p,t,{recipient:m,years:c})}else m="10 largest recipients",de(p,ie(r),"10 largest recipients",{years:c,channels:d});else pe(p,o.filter((function(n){return n.Recipient===e})),{recipient:e,years:c})},g=function(e,n){if("By donor"===e)if("10 largest recipients"!==n){var t=r.filter((function(e){return e.Recipient===n}));fe(p,t,{recipient:n,years:c})}else de(p,ie(r),"10 largest recipients",{years:c,channels:d});else pe(p,o.filter((function(e){return e.Recipient===n})),{recipient:n,years:c})},Object(s.createRoot)(i).render(u.a.createElement(ne,{donorRecipients:l,orgTypeRecipients:f,onSelectRecipient:b,onSelectBreakdown:g,defaultBreakdown:"By donor",defaultRecipient:"Afghanistan"})),t.hideLoading(),R(p,n);case 22:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}())}}})},be=t(251),ge=t.n(be),ve=function(e){var n=Object(c.useState)("People_in_need_(millions)"),t=n[0],a=n[1],r=[{name:"People_in_need_(millions)",label:"People in need",icon:"https://dev.devinit.org/assets/svg/icons/people-in-need-icon.svg",disabledIcon:"https://dev.devinit.org/assets/svg/icons/people-in-need-icon-disabled.svg"},{name:"Crisis_type",label:"Crisis state",icon:"https://dev.devinit.org/assets/svg/icons/crisis-type-icon.svg",disabledIcon:"https://dev.devinit.org/assets/svg/icons/crisis-type-icon-disabled.svg"},{name:"IPC_Food_insecurity_phase",label:"Food insecurity",icon:"https:/dev.devinit.org/assets/svg/icons/food-security.svg",disabledIcon:"https://dev.devinit.org/assets/svg/icons/food-security-disabled.svg"},{name:"Climate_vulnerability",label:"Climate vulnerability",icon:"https:/dev.devinit.org/assets/svg/icons/climate-vulnerability-icon.svg",disabledIcon:"http:/dev.devinit.org/assets/svg/icons/climate-vulnerability-icon-disabled.svg"}];return Object(c.useEffect)((function(){e.onSelectDimension(t),window.dataLayer.push({event:"mapFilterSelected",filter:r.find((function(e){return e.name===t})).label})}),[t]),u.a.createElement("ul",null,r.map((function(e){return u.a.createElement("li",{key:e.name,className:"mapFilterItem"},e.icon?u.a.createElement(u.a.Fragment,null,u.a.createElement("button",{onClick:function(){a(e.name)},className:t===e.name?"mapFilterButton mapFilterItem-active":"mapFilterButton"},u.a.createElement("img",{src:t===e.name?e.icon:e.disabledIcon,alt:e.name,height:"20",width:"20"}),u.a.createElement("p",{className:"Food_insecure_(millions)"===e.name?"food-icon":""},e.label))):u.a.createElement("button",{onClick:function(){a(e.name)}},u.a.createElement("p",null,e.label)))})))};ve.propTypes={onSelectDimension:f.a.func};var he=ve,ye=function(e){return u.a.createElement("button",{className:"reset-button",onClick:e.onReset},"Reset")};ye.propTypes={onReset:f.a.func};var we=ye,Se="https://dev.devinit.org/assets/svg/icons/response-plan-icon.svg",xe=["#fac47e","#f7a838","#df8000","#ba6b15","#7d4712"],_e=[{variable:"Crisis_type",data:[{score:"",label:"Not in crisis"},{score:"In Crisis",label:"In crisis"},{score:"Entering protracted crisis",label:"Entering protracted crisis"},{score:"In protracted crisis",label:"In protracted crisis"}]},{variable:"IPC_Food_insecurity_phase",data:[{score:"Not assessed",label:"No data"},{score:"2",label:"2"},{score:"3",label:"3"},{score:"3+",label:"3+"},{score:"4",label:"4"}]},{variable:"People_in_need_(millions)"},{variable:"Climate_vulnerability",data:[{score:"",label:"No data"},{score:"1",label:"Very low"},{score:"2",label:"Low"},{score:"3",label:"Medium"},{score:"4",label:"High"},{score:"5",label:"Very high"}]}],Ce=function(e){return e.trim()},Ee=function(e,n,t){return e?t+"% funded (US$"+Ce(n)+" million of US$"+Ce(e)+" million)":"None"},Oe=function(e,n){return e.map((function(e){return{id:e.Country_ID,name:e.Country_name}})).find((function(e){return e.id===n})).name},Ae=function(e,n){if("Crisis_type"===n)switch(e){case"In protracted crisis":return"#7d4712";case"Entering protracted crisis":return"#ba6b15";case"In Crisis":return"#df8000";default:return"#E6E1E5"}else if("IPC_Food_insecurity_phase"===n)switch(e){case"4":return"#7d4712";case"3+":return"#ba6b15";case"3":return"#df8000";case"2":return"#f7a838";default:return"#E6E1E5"}else switch(e){case"5":return"#7d4712";case"4":return"#ba6b15";case"3":return"#df8000";case"2":return"#f7a838";case"1":return"#fac47e";default:return"#E6E1E5"}},je=window.L.control({position:"bottomright"});je.onAdd=function(){return this.div=window.L.DomUtil.create("div","databox"),this.div.setAttribute("data-id","databoxContainer"),this.update(),this.div},je.update=function(e,n){var t,a,r,o;this.div.innerHTML=e?'<div style="padding-bottom: 0px;">'+Oe(n,e.iso_a3)+' <button id=closeDatabox><img src=https://devinit.org/assets/svg/icons/cross.colors-poppy-slate-blank-poppydark.svg alt=close height=20 width=20 ></img></button></div><div style="margin-top: 8px;"> '+(t=e,[{value:(a=t["Country_response_plan_requirements_(US$,_million)"],r=t["Country_response_plan_coverage_(%)"],o=t["Country_response_plan_funding_(US$,_million)"],a?r+"% funded (US$"+Ce(o)+" million  of US$"+Ce(a)+" million)":"None"),label:"Country RP",icon:{image:Se,text:"response-plan"}},{value:Ee(t["Regional_response_plan_requirements_(US$,_million)"],t["Regional_response_plan_funding_(US$,_million)"],t["Regional_response_plan_coverage_(%)"]),label:"Regional RP",icon:{image:Se,text:"response-plan"}}]).map((function(e){return"<span><img src="+e.icon.image+" alt="+e.icon.text+" height=20 width=20 ></img><p>"+e.label+": "+e.value+"</p> </span>"})).join("")+"</div>":"";var i=document.getElementById("closeDatabox");i&&i.addEventListener("click",(function(e){return function(e,n){e.stopPropagation(),n.update(),document.querySelector('[data-id="databoxContainer"]').style.display="none"}(e,je)}))};var De=function(e,n){var t=n.map((function(n){return Number(n[e])}));return{maxValue:Math.ceil(Math.max.apply(Math,t)),minValue:Math.ceil(Math.min.apply(Math,t))<10?0:Math.ceil(Math.min.apply(Math,t))}},Re=function(e,n,t,a,r,o,i,s,l){var c,u=i;u.onAdd=function(){var n=window.L.DomUtil.create("div","legend"),t=De(e,r),a="People_in_need_(millions)"===e?xe.map((function(e){return'<span>\n          <i style="background:'+e+';border-radius:1px;margin-right:0;width:40px;"></i>\n        </span>'})).join("")+' <p style="margin-left:1px;margin-top: 4px;">'+t.minValue+" - "+t.maxValue+", millions of people</p>":_e.find((function(n){return n.variable===e})).data.map((function(n){return'<span><i style="background:'+Ae(n.score,e)+'"></i><label>'+n.label+"</label></span>"})).join("");return n.innerHTML=a,n},u.addTo(n);var d,f=function(n){return{fillColor:(o.find((function(n){return n.name===e})).scaleType,t(n.properties[e],e)),weight:1,opacity:1,color:"white",fillOpacity:1}},p=function(e){c.resetStyle(e.target),e.target.closePopup()},m=function(t,a){t.properties[e]||""===t.properties[e]?a.on({mouseover:function(n){return function(e,n,t,a){var r=e.target,o=document.querySelector('[data-id="databoxContainer"]');o&&"none"!==o.style.display&&(je.update(),o.style.display="none"),r.setStyle({fillColor:"#5da3d9",color:"#484848",weight:2}),window.L.Browser.ie||window.L.Browser.opera||window.L.Browser.edge||r.bringToFront(),r.bindTooltip("No data"!==r.feature.properties[n]&&"Not assessed"!==r.feature.properties[n]?"<div>"+Oe(a,r.feature.properties.iso_a3)+"<br>"+t.find((function(e){return e.name===n})).label+": "+("Food_insecure_(millions)"===n&&"0.0"===r.feature.properties[n]?"< 0.1":r.feature.properties[n])+'<span style="padding-left: 2px;">'+t.find((function(e){return e.name===n})).unit+"</span></div>":"<div>"+Oe(a,r.feature.properties.iso_a3)+"<br> Not assessed</div>",{direction:"top",opacity:1}).openTooltip()}(n,e,o,l)},mouseout:p,click:function(e){return function(e,n,t,a){t.addTo(n);var r=e.target;window.dataLayer.push({event:"countryClicked",country:Oe(a,r.feature.properties.iso_a3)}),t.update(r.feature.properties,a)}(e,n,je,l)}}):a.on({mouseover:function(){n.getContainer().querySelectorAll(".leaflet-interactive").forEach((function(e){e.classList+=" grab-cursor-enabled"}))},mouseout:function(){n.getContainer().querySelectorAll(".leaflet-interactive.grab-cursor-enabled").forEach((function(e){e.classList.remove("grab-cursor-enabled")}))}})};s.clearLayers(),c=window.L.geoJSON((d=r,a.map((function(e){var n=Object.assign({},e),t=d.find((function(n){return n.name===e.properties.name}));return t&&(n.properties=Object.assign({},e.properties,t)),n}))),{style:f,onEachFeature:m}),s.addLayer(c)};var Ne=function(){window.DICharts.handler.addChart({className:"dicharts--gha-people-affected-by-crisis-leaflet",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,(function(e){window.dataLayer=window.dataLayer||[];var n=new window.DICharts.Chart(e.parentElement),t=window.L.map(e,{maxZoom:3,minZoom:1,crs:window.L.CRS.EPSG4326,center:[6.6,20.9],zoom:1,attributionControl:!1}),a="People_in_need_(millions)",o=O(e),i=[{name:"People_in_need_(millions)",label:"People in need",scaleType:"continous",unit:"million"},{name:"Crisis_type",label:"Crisis state",scaleType:"piecewise",unit:""},{name:"IPC_Food_insecurity_phase",label:"Food insecurity",scaleType:"piecewise",unit:""},{name:"Climate_vulnerability",label:"Climate vulnerability",scaleType:"piecewise",unit:""}],l=window.L.control({position:"topright"}),c=window.L.control({position:"bottomleft"});n.showLoading(),window.fetch("https://raw.githubusercontent.com/devinit/gha-data-visualisations/feature/data-updates/src/data/world_map.geo.json").then((function(e){return e.json()})).then((function(e){var u=e.features;E("https://raw.githubusercontent.com/devinit/gha-data-visualisations/feature/data-updates/src/data/map_data_long.csv").then((function(e){var d,f=(d=u,e.map((function(e){var n=Object.assign({},e),t=d.find((function(e){return e.properties.iso_a3===n.Country_ID}));return t&&(n.Country_name=t.properties.name),n}))),p=function(e,n){var t=[];return e.forEach((function(e){var a={};a.name=e,n.forEach((function(n){n.Country_name===e&&(a[n.variable]=n.value)})),t.push(a)})),t}(Array.from(new Set(f.map((function(e){return e.Country_name})))),f),m=window.L.featureGroup().addTo(t),b=function(e,n){var t=De(n,p),a=(t.maxValue-t.minValue)/xe.length;return e?function(e,n,t,a,r){for(var o=[],i=n;i<=t;i+=a)o.push(i);return r.scale(xe).domain(o)(Math.abs(e))}(e,t.minValue,t.maxValue,a,ge.a):"#E6E1E5"},g=function(){t.setView([6.6,20.9],1)};Object(s.createRoot)(o).render(Object(r.b)(he,{onSelectDimension:function(n){Re(n,t,"continous"===i.find((function(e){return e.name===n})).scaleType?b:Ae,u,p,i,l,m,e)}})),c.onAdd=function(){var e=window.L.DomUtil.create("div");return Object(s.createRoot)(e).render(Object(r.b)(we,{onReset:g})),e},c.addTo(t),Re(a,t,"continous"===i.find((function(e){return e.name===a})).scaleType?b:Ae,u,p,i,l,m,e),n.hideLoading()}))})).catch((function(e){return console.log(e)}))}))}}})};t(622);window.addEventListener("load",(function(){G(),Z(),me(),Ne()}))}},[[254,1,2]]]);