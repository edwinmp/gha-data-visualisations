(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    231(e, n, t) {
      e.exports = t(582);
    },
    581(e, n, t) {},
    582(e, n, t) {
      t.r(n);
      t(232),
        t(240),
        t(241),
        t(242),
        t(243),
        t(244),
        t(245),
        t(246),
        t(247),
        t(248),
        t(249),
        t(250),
        t(251),
        t(252),
        t(253),
        t(254),
        t(255),
        t(256),
        t(257),
        t(258),
        t(259),
        t(260),
        t(261),
        t(263),
        t(110),
        t(264),
        t(265),
        t(266),
        t(267),
        t(268),
        t(269),
        t(270),
        t(271),
        t(272),
        t(273),
        t(274),
        t(276),
        t(277),
        t(278),
        t(280),
        t(281),
        t(282),
        t(149),
        t(284),
        t(285),
        t(286),
        t(287),
        t(288),
        t(289),
        t(290),
        t(291),
        t(292),
        t(293),
        t(294),
        t(296),
        t(297),
        t(298),
        t(299),
        t(300),
        t(301),
        t(302),
        t(303),
        t(304),
        t(305),
        t(306),
        t(307),
        t(308),
        t(309),
        t(310),
        t(311),
        t(313),
        t(314),
        t(315),
        t(316),
        t(317),
        t(318),
        t(319),
        t(320),
        t(321),
        t(322),
        t(323),
        t(324),
        t(325),
        t(326),
        t(327),
        t(328),
        t(329),
        t(330),
        t(331),
        t(332),
        t(333),
        t(334),
        t(335),
        t(337),
        t(338),
        t(349),
        t(350),
        t(351),
        t(353),
        t(354),
        t(355),
        t(356),
        t(357),
        t(358),
        t(359),
        t(360),
        t(361),
        t(362),
        t(363),
        t(364),
        t(205),
        t(366),
        t(367),
        t(368),
        t(370),
        t(371),
        t(372),
        t(373),
        t(206),
        t(374),
        t(375),
        t(376),
        t(377),
        t(378),
        t(379),
        t(380),
        t(381),
        t(382),
        t(383),
        t(384),
        t(386),
        t(388),
        t(389),
        t(390),
        t(391),
        t(392),
        t(393),
        t(394),
        t(395),
        t(396),
        t(397),
        t(398),
        t(399),
        t(400),
        t(401),
        t(403),
        t(404),
        t(405),
        t(406),
        t(407),
        t(408),
        t(409),
        t(410),
        t(411),
        t(412),
        t(413),
        t(415),
        t(418),
        t(419),
        t(420),
        t(421),
        t(422),
        t(423),
        t(424),
        t(425),
        t(426),
        t(428),
        t(429),
        t(430),
        t(431),
        t(432),
        t(433),
        t(434),
        t(435),
        t(436),
        t(437),
        t(438),
        t(439),
        t(160),
        t(441),
        t(443),
        t(450),
        t(451),
        t(452),
        t(453),
        t(454),
        t(456),
        t(457),
        t(458),
        t(459),
        t(460),
        t(461),
        t(462),
        t(463),
        t(465),
        t(466),
        t(467),
        t(468),
        t(469),
        t(470),
        t(471),
        t(472),
        t(473),
        t(474),
        t(475),
        t(476),
        t(477),
        t(478),
        t(479),
        t(480),
        t(481),
        t(482),
        t(483),
        t(484),
        t(485),
        t(486),
        t(487),
        t(488),
        t(492),
        t(494),
        t(496),
        t(497),
        t(498),
        t(499),
        t(500),
        t(502),
        t(503),
        t(504),
        t(505),
        t(506),
        t(507),
        t(508),
        t(509),
        t(510),
        t(511),
        t(512),
        t(513),
        t(514),
        t(515),
        t(516),
        t(517),
        t(518),
        t(519),
        t(520),
        t(521),
        t(522),
        t(523),
        t(524),
        t(525),
        t(526),
        t(527),
        t(529),
        t(531),
        t(532),
        t(533),
        t(534),
        t(535),
        t(536),
        t(537),
        t(538),
        t(539),
        t(540),
        t(541),
        t(543),
        t(544),
        t(547),
        t(548),
        t(551),
        t(552);
      let r;
      const a = t(4);
      const o = t(80);
      const i = t.n(o);
      const s = t(81);
      const l = t(130);
      const c = t(1);
      const u = t.n(c);
      const d = t(19);
      const f = t.n(d);
      const p = t(225);
      const m = t(230).a.div(
        r ||
          (r = Object(p.a)([
            '\n  color: red;\n  font-size: 11px;\n  position: relative;\n  padding: 5px 5px 5px 0px;\n  display: block;\n',
          ]))
      );
      const b = function (e) {
        const n = Object(c.useState)('');
        const t = n[0];
        const r = n[1];
        const a = function (n) {
          n ? n.type === 'maxSelectedOptions' && r(e.selectErrorMessage) : r('');
        };

        return u.a.createElement(
          'div',
          null,
          u.a.Children.map(e.children, (e) => (u.a.isValidElement(e) ? u.a.cloneElement(e, { onError: a }) : e)),
          t ? u.a.createElement(m, { className: 'data-selector--wrapper' }, t) : null
        );
      };
      b.propTypes = { selectErrorMessage: f.a.string, children: f.a.node };
      const v = b;
      const g = t(226);
      const h = t(229);
      const y = {
        control(e) {
          return {
            ...e,
            borderColor: '#ddd',
            borderRadius: 'none',
            boxShadow: 'none',
            ':hover': { borderColor: '#8f1b13' },
            ':active': { borderColor: '#8f1b13' },
          };
        },
        option(e) {
          return { ...e, fontSize: '14px' };
        },
        singleValue(e) {
          return { ...e, fontSize: '14px' };
        },
        multiValue(e) {
          return { ...e, fontSize: '14px' };
        },
        multiValueLabel(e, n) {
          return n.data.isCloseable ? e : { ...e, paddingRight: 6 };
        },
        multiValueRemove(e, n) {
          return n.data.isCloseable ? e : { ...e, display: 'none' };
        },
        input(e) {
          return { ...e, fontSize: '14px' };
        },
        indicatorsContainer(e) {
          return { ...e, pointerEvents: 'none' };
        },
      };
      const w = function (e) {
        const n = e.label;
        const t = e.onError;
        const r = e.maxSelectedOptions;
        const o = e.defaultValue;
        const i = e.singleSelectOptions;
        const s = Object(l.a)(e, ['label', 'onError', 'maxSelectedOptions', 'defaultValue', 'singleSelectOptions']);
        const u = Object(c.useState)(o);
        const d = u[0];
        const f = u[1];
        Object(c.useEffect)(() => {
          s.onChange && s.onChange(d), t && t();
        }, [d]);

        return Object(a.c)(
          'div',
          { className: 'labelled-data-selector--wrapper' },
          Object(a.c)('label', null, Object(a.c)('b', null, n)),
          Object(a.c)(
            h.a,
            Object(g.a)({}, s, {
              value: d,
              onChange(e) {
                if (s.isMulti)
                  if (e.length) {
                    const n = e.findIndex((e) => i.find((n) => n.value === e.value));
                    s.isMulti && e.length > 1 && n !== -1
                      ? f(n === 0 ? e.slice(1) : [e[n]])
                      : r && e.length > r
                      ? t && t({ type: 'maxSelectedOptions', message: `Only up to ${r} selections allowed` })
                      : f(e);
                  } else f(o);
                else f(e);
              },
              css: { marginRight: '10px' },
              styles: y,
              isClearable: s.isClearable !== 'undefined' ? s.isClearable : d.length > 1,
            })
          )
        );
      };
      (w.propTypes = {
        label: f.a.string,
        options: f.a.array,
        maxSelectedOptions: f.a.number,
        onChange: f.a.func,
        onError: f.a.func,
        defaultValue: f.a.array,
        singleSelectOptions: f.a.array,
        isMulti: f.a.bool,
        isClearable: f.a.bool,
      }),
        (w.defaultProps = { maxSelectedOptions: 2, singleSelectOptions: [] });
      const S = w;
      const x = function (e) {
        const n = e.defaultDonor;
        const t = e.onSelectDonor;
        const r = Object(l.a)(e, ['defaultDonor', 'onSelectDonor']);
        const a = Object(c.useState)(r.donors);
        const o = a[0];
        const i = a[1];
        const s = Object(c.useState)(r.defaultDataType);
        const d = s[0];
        const f = s[1];
        Object(c.useEffect)(() => {
          i(r.donors);
        }, [r.donors]);

        return u.a.createElement(
          v,
          { selectErrorMessage: r.donorSelectErrorMessage },
          u.a.createElement(S, {
            label: 'Select up to two donors',
            options: o.map((e) => ({ value: e, label: e, isCloseable: !0 })),
            defaultValue: [{ value: n, label: n, isCloseable: !0 }],
            isMulti: !0,
            onChange: t,
            css: { minWidth: '200px' },
            classNamePrefix: 'donors-select',
            isClearable: !1,
          }),
          u.a.createElement(S, {
            label: 'Display data as',
            options: ['Volumes', 'Proportions', '%GNI'].map((e) => ({ value: e, label: e })),
            defaultValue: [{ value: d, label: d }],
            value: d,
            onChange(e) {
              f(e ? e.value : r.defaultDataType),
                r.onSelectDataType && r.onSelectDataType(e ? e.value : r.defaultDataType);
            },
            css: { minWidth: '150px' },
            classNamePrefix: 'donors-display-data-as',
          })
        );
      };
      x.propTypes = {
        donors: f.a.array,
        donorSelectErrorMessage: f.a.string,
        onSelectDonor: f.a.func,
        onSelectDataType: f.a.func,
        defaultDonor: f.a.string,
        defaultDataType: f.a.string,
      };
      const C = x;
      const D = t(227);
      const A = function (e) {
        return new Promise((n) => {
          Object(D.parse)(e, {
            download: !0,
            header: !0,
            skipEmptyLines: !0,
            complete(e) {
              const t = e.data;

              return n(t);
            },
          });
        });
      };
      const O = function (e) {
        let n;
        const t = document.createElement('div');

        return (
          (n = t.classList).add.apply(n, ['spotlight-banner', 'data-selector--wrapper']),
          e.parentElement.insertBefore(t, e),
          t
        );
      };
      const E = function (e, n, t) {
        void 0 === t && (t = !1);
        const r = document.createElement('option');
        (r.value = typeof n === 'string' ? n : n.value),
          (r.text = typeof n === 'string' ? n : n.label),
          t && (r.selected = !0),
          e.appendChild(r);
      };
      const _ = {
        rainbow: [
          '#e84439',
          '#eb642b',
          '#f49b21',
          '#109e68',
          '#0089cc',
          '#893f90',
          '#c2135b',
          '#f8c1b2',
          '#f6bb9d',
          '#fccc8e',
          '#92cba9',
          '#88bae5',
          '#c189bb',
          '#e4819b',
        ],
        default: ['#6c120a', '#a21e25', '#cd2b2a', '#dc372d', '#ec6250', '#f6b0a0', '#fbd7cb', '#fce3dc'],
        sunflower: ['#7d4712', '#ba6b15', '#df8000', '#f7a838', '#fac47e', '#fedcab', '#fee7c1', '#feedd4'],
        marigold: ['#7a2e05', '#ac4622', '#cb5730', '#ee7644', '#f4a57c', '#facbad', '#fcdbbf', '#fde5d4'],
        rose: ['#65093d', '#8d0e56', '#9f1459', '#d12568', '#e05c86', '#f3a5b6', '#f6b8c1', '#f9cdd0'],
        lavendar: ['#42184c', '#632572', '#732c85', '#994d98', '#af73ae', '#cb98c4', '#deb5d6', '#ebcfe5'],
        bluebell: ['#0c457b', '#0071b1', '#0089cc', '#5da3d9', '#77adde', '#88bae5', '#bcd4f0', '#d3e0f4'],
        leaf: ['#08492f', '#005b3e', '#00694a', '#3b8c62', '#74bf93', '#a2d1b0', '#b1d8bb', '#c5e1cb'],
        orange: ['#973915', '#d85b31', '#eb642b', '#f18e5e', '#f4a57c', '#f6bb9d'],
      };
      const N = function (e, n) {
        const t = n.selected;
        const r = Object.values(t).filter((e) => e).length;
        e.setOption({ animation: !0 }),
          r === 0
            ? Object.keys(t).forEach((n) => {
                e.dispatchAction({ type: 'legendSelect', name: n });
              })
            : t[n.name] ||
              (e.dispatchAction({ type: 'legendSelect', name: n.name }),
              Object.keys(t).forEach((r) => {
                Object.prototype.hasOwnProperty.call(t, r) &&
                  r !== n.name &&
                  e.dispatchAction({ type: 'legendUnSelect', name: r });
              }));
      };
      const j = {
        color: _.default.concat(_.rainbow),
        legend: { left: '10%', top: 10, textStyle: { fontFamily: 'Geomanist Regular,sans-serif' } },
        tooltip: {
          show: !0,
          trigger: 'item',
          showContent: !0,
          textStyle: { fontFamily: 'Geomanist Regular,sans-serif' },
        },
        toolbox: {
          show: !0,
          showTitle: !1,
          feature: { saveAsImage: { title: 'Save as PNG', pixelRatio: 2 } },
          right: 20,
          tooltip: {
            show: !0,
            formatter(e) {
              return `<div>${e.title}</div>`;
            },
            textStyle: { fontFamily: 'Geomanist Regular,sans-serif' },
          },
        },
        xAxis: { axisLabel: { fontFamily: 'Geomanist Regular,sans-serif', fontSize: 13 }, splitLine: { show: !1 } },
        yAxis: {
          axisLabel: { fontFamily: 'Geomanist Regular,sans-serif', fontSize: 13 },
          splitLine: { show: !1 },
          nameLocation: 'end',
          nameTextStyle: { padding: [0, 50, 0, 0] },
        },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: !0 },
      };
      const L = function (e, n) {
        window.addEventListener(
          'resize',
          () => {
            e.resize({ width: `${n.clientWidth}px`, height: `${n.clientHeight}px` });
          },
          !0
        );
      };
      const T = function (e) {
        const n = e.some((e) => e.stack);
        const t = Array.from(new Set(e.map((e) => e.name))).length;
        const r = Math.max.apply(
          Math,
          e.reduce((e, n) => {
            const t = n.data;

            return e.concat(t.map((e) => e.value || 0));
          }, [])
        );

        return r === 0
          ? 'blank'
          : (n ? r * t < 100 : r < 100)
          ? 'near'
          : (n ? r * t < 1e3 : r < 1e3)
          ? 'middle'
          : 'far';
      };
      const k = j;
      let R = 'Volumes';
      const M = { Proportions: 'Proportions', Volumes: 'Absolute', '%GNI': '%GNI' };
      const V = function (e) {
        return (
          void 0 === e && (e = ''),
          e.trim() ? Number(e.replace(',', '').replace(' ', '').replace('%', '').trim()) : null
        );
      };
      const B = function (e) {
        return e.map((e) => {
          const n = { ...e };

          return (n.value = V(n.Value)), n;
        });
      };
      const P = function (e) {
        return e.filter((e) => (R === '%GNI' ? e === 'Total HA' : e !== 'Total HA'));
      };
      const I = function () {
        return R === '%GNI' ? 'line' : 'bar';
      };
      const F = function (e, n, t, r, a) {
        void 0 === a && (a = 'Proportion');
        const o = e.filter((e) => e.Donor.trim() === t && e['IHA type'] === r && e['Value type'] === a);

        return n.map((e) => o.find((n) => n.Year === e));
      };
      const U = function (e, n, t) {
        return (
          void 0 === n && (n = 'currency'),
          void 0 === t && (t = 'auto'),
          new Intl.NumberFormat('en-US', {
            style: n,
            currency: 'USD',
            signDisplay: t,
            maximumFractionDigits: 0,
          }).format(e)
        );
      };
      const z = function (e) {
        void 0 === e && (e = 'far');

        return R !== 'Volumes'
          ? { type: 'value', axisLabel: { formatter: '{value}%' }, name: '', max: R === 'Proportions' ? 100 : null }
          : {
              type: 'value',
              axisLabel: { formatter: '{value}' },
              nameRotate: 90,
              name: 'US$ millions',
              nameLocation: 'end',
              nameTextStyle: {
                verticalAlign: 'top',
                align: 'right',
                padding: { near: [-35, 0, 0, 0], middle: [-45, 0, 0, 0], far: [-60, 0, 0, 0] }[e],
              },
              max: null,
            };
      };
      const H = function (e, n, t) {
        const r = t.years;
        const a = t.channels;
        const o = {
          color: _.bluebell,
          legend: { show: !0, top: 'top', padding: [20, 10, 5, 10], textStyle: { fontSize: '1.3rem' } },
          grid: { bottom: '10%', top: '20%' },
          xAxis: { type: 'category', data: r },
          yAxis: z(),
          series: P(a).map((e) => ({
            name: e,
            data: F(n, r, 'All donors', e, M[R]).map((e) => ({
              value: e && Number(R === 'Proportions' ? 100 * e.value : e.value),
              emphasis: { focus: 'self' },
            })),
            type: I(),
            stack: 'channels',
            tooltip: {
              trigger: 'item',
              formatter(t) {
                const r = n.find(
                  (n) =>
                    n['IHA type'] === e &&
                    n.Donor === 'All donors' &&
                    `${n.Year}` === t.name &&
                    n['Value type'] === M[R]
                );
                const a = e.includes('Multilateral HA')
                  ? e.replace('Multilateral HA', 'Multilateral Humanitarian Assistance')
                  : e;

                return `All donors, ${t.name} <br />${a}: <strong>${
                  R === 'Proportions' ? `${t.value.toFixed(2)}%` : `US$${U(V(r.Value), 'decimal', 'never')} million`
                } </strong>`;
              },
            },
            cursor: 'auto',
          })),
        };

        return (
          (o.yAxis = z(T(o.series))),
          (k.toolbox.feature.saveAsImage.name = 'donors'),
          e.setOption(i()(o, k), { replaceMerge: ['series'] }),
          e.on('legendselectchanged', (n) => {
            N(e, n);
          }),
          e
        );
      };
      const Y = function (e, n, t) {
        const r = t.donors;
        const a = t.channels;
        const o = t.years;
        const i = B(n);
        const s = I();
        const l = r
          .map((e) =>
            P(a).map((n, t) => ({
              name: R !== '%GNI' ? n : e,
              data: F(i, o, e, n, M[R]).map((e) => ({
                value: e && typeof e.value === 'number' ? Number(R !== 'Volumes' ? 100 * e.value : e.value) : null,
                emphasis: { focus: 'self' },
              })),
              type: s,
              stack: R !== '%GNI' ? e : void 0,
              symbol: 'circle',
              symbolSize: 10,
              connectNulls: s !== 'line' && void 0,
              tooltip: {
                trigger: 'item',
                formatter(t) {
                  const r = i.find(
                    (r) => r['IHA type'] === n && r.Donor === e && `${r.Year}` === t.name && r['Value type'] === M[R]
                  );
                  const a =
                    R === 'Volumes' ? `US$${U(V(r.Value), 'decimal', 'never')} million` : `${t.value.toFixed(2)}%`;

                  return `${e}, ${t.name} <br />${n}: <strong>${a}</strong>`;
                },
              },
              label: {
                show: s === 'bar' && t === 0 && r.length > 1,
                position: 'insideBottom',
                distance: 15,
                align: 'left',
                verticalAlign: 'middle',
                rotate: 90,
                formatter() {
                  return `${e}`;
                },
                fontSize: 16,
              },
              cursor: 'auto',
            }))
          )
          .reduce((e, n) => e.concat(n), []);
        e.setOption({ yAxis: z(T(l)), series: l }, { replaceMerge: ['series'] });
      };
      const $ = function () {
        window.DICharts.handler.addChart({
          className: 'dicharts--gha-donors',
          echarts: {
            onAdd(e) {
              Array.prototype.forEach.call(e, (e) => {
                const n = new window.DICharts.Chart(e.parentElement);
                A(
                  'https://raw.githubusercontent.com/devinit/gha-data-visualisations/feature/map-filters/public/assets/data/donor_interactive_data_long.csv'
                ).then((t) => {
                  const r = O(e);
                  const o = Array.from(new Set(t.map((e) => e.Donor))).sort();
                  const i = Array.from(new Set(t.map((e) => e.Year))).sort();
                  const l = Array.from(new Set(t.map((e) => e['IHA type'])));
                  const c = window.echarts.init(e);
                  H(c, B(t), { years: i, channels: l });
                  let u = [];
                  Object(s.createRoot)(r).render(
                    Object(a.c)(C, {
                      selectErrorMessage: 'You can compare two donors. Please remove one before adding another.',
                      donors: o,
                      onSelectDataType(e) {
                        if (((R = e || R), u.length)) {
                          const n = t.filter((e) => u.includes(e.Donor));
                          Y(c, n, { donors: u, channels: l, years: i });
                        } else H(c, B(t), { years: i, channels: l });
                      },
                      onSelectDonor(e) {
                        if (e.length) {
                          const n = t.filter((n) => e.find((e) => e.value === n.Donor));
                          (u = e.map((e) => e.value)), Y(c, n, { donors: u, channels: l, years: i });
                        } else H(c, B(t), { years: i, channels: l });
                      },
                      defaultDonor: 'All donors',
                      defaultDataType: 'Volumes',
                      donorSelectErrorMessage: 'You can compare two donors. Please remove one before adding another.',
                    })
                  ),
                    n.hideLoading(),
                    L(c, e);
                });
              });
            },
          },
        });
      };
      const G = function (e) {
        return (
          void 0 === e && (e = ''),
          e.trim() ? Number(e.replace(',', '').replace(' ', '').replace('%', '').trim()) : null
        );
      };
      const W = function (e) {
        return e.map((e) => {
          const n = { ...e };

          return (n.value = G(e.Proportions)), n;
        });
      };
      const q = function (e, n, t, r) {
        const a = e.filter((e) => e.Donor.trim() === t && e['Delivery channel'] === r);

        return n.map((e) => a.find((n) => n.Year === e));
      };
      const J = function (e, n, t) {
        return (
          void 0 === n && (n = 'currency'),
          void 0 === t && (t = 'auto'),
          new Intl.NumberFormat('en-US', {
            style: n,
            currency: 'USD',
            signDisplay: t,
            maximumFractionDigits: 0,
          }).format(e)
        );
      };
      const Z = function (e, n, t) {
        const r = t.years;
        const a = t.channels;
        const o = {
          color: _.bluebell,
          legend: { show: !0, top: 'top', padding: [20, 10, 5, 10], textStyle: { fontSize: '1.3rem' } },
          grid: { bottom: '10%', top: '20%' },
          xAxis: { type: 'category', data: r },
          yAxis: { type: 'value', axisLabel: { formatter: '{value}%' }, max: 100 },
          series: a.map((e) => ({
            name: e,
            data: q(n, r, 'All donors', e).map((e) => ({
              value: e && Number(100 * e.value).toFixed(2),
              emphasis: { focus: 'self' },
            })),
            type: 'bar',
            stack: 'channels',
            tooltip: {
              trigger: 'item',
              formatter(t) {
                const r = n.find(
                  (n) => n['Delivery channel'] === e && n.Donor === 'All donors' && `${n.Year}` === t.name
                );

                return `All donors, ${t.name} <br />${e}: <strong>${Number(t.value, 10).toFixed(2)}%</strong> (US$${J(
                  G(r['US$ millions, constant 2020 prices']),
                  'decimal',
                  'never'
                )} million)`;
              },
            },
            cursor: 'auto',
          })),
        };

        return (
          (k.toolbox.feature.saveAsImage.name = 'funding-channels'),
          e.setOption(i()(o, k), { replaceMerge: ['series'] }),
          e.on('legendselectchanged', (n) => {
            N(e, n);
          }),
          e
        );
      };
      const K = function () {
        window.DICharts.handler.addChart({
          className: 'dicharts--boilerplate-chart',
          echarts: {
            onAdd(e) {
              Array.prototype.forEach.call(e, (e) => {
                const n = new window.DICharts.Chart(e.parentElement);
                A(
                  'https://raw.githubusercontent.com/devinit/gha-data-visualisations/feature/map-filters/public/assets/data/funding-channels-interactive-data.csv'
                ).then((t) => {
                  let r;
                  let a;
                  let o;
                  const i = O(e);
                  const l = Array.from(new Set(t.map((e) => e.Donor)));
                  const c = Array.from(new Set(t.map((e) => e.Year)));
                  const d =
                    ((r = Array.from(new Set(t.map((e) => e['Delivery channel'])))),
                    (a = ['Not reported', 'Other']),
                    (o = r.filter((e) => !a.includes(e))),
                    a.forEach((e) => {
                      r.includes(e) && o.push(e);
                    }),
                    o);
                  const f = window.echarts.init(e);
                  Z(f, W(t), { years: c, channels: d });
                  let p = [];
                  Object(s.createRoot)(i).render(
                    u.a.createElement(
                      v,
                      { selectErrorMessage: 'You can compare two donors. Please remove one before adding another.' },
                      u.a.createElement(S, {
                        label: 'Select up to two donors',
                        options: l.map((e) => ({ value: e, label: e, isCloseable: !0 })),
                        defaultValue: [{ value: 'All donors', label: 'All donors', isCloseable: !0 }],
                        isMulti: !0,
                        onChange(e) {
                          if (e.length) {
                            const n = t.filter((n) => e.find((e) => e.value === n.Donor));
                            (p = e.map((e) => e.value)),
                              (function (e, n, t) {
                                const r = t.donors;
                                const a = t.channels;
                                const o = t.years;
                                const i = W(n);
                                const s = r
                                  .map((e) =>
                                    a.map((n, t) => ({
                                      name: n,
                                      data: q(i, o, e, n).map((e) => ({
                                        value: e && Number(100 * e.value).toFixed(2),
                                        emphasis: { focus: 'self' },
                                      })),
                                      type: 'bar',
                                      stack: e,
                                      tooltip: {
                                        trigger: 'item',
                                        formatter(t) {
                                          const r = i.find((r) => {
                                            return (
                                              r['Delivery channel'] === n && r.Donor === e && `${r.Year}` === t.name
                                            );
                                          });
                                          let a = r
                                            ? `<strong>${(100 * r.value).toFixed(2)}%</strong> (US$${J(
                                                G(r['US$ millions, constant 2020 prices']),
                                                'decimal',
                                                'never'
                                              )} million)`
                                            : `<strong>${(100 * r.value).toFixed(2)}%</strong>`;

                                          return `${e}, ${t.name} <br />${n}: ${a}`;
                                        },
                                      },
                                      label: {
                                        show: t === 0 && r.length > 1,
                                        position: 'insideBottom',
                                        distance: 15,
                                        align: 'left',
                                        verticalAlign: 'middle',
                                        rotate: 90,
                                        formatter() {
                                          return `${e}`;
                                        },
                                        fontSize: 16,
                                      },
                                      cursor: 'auto',
                                    }))
                                  )
                                  .reduce((e, n) => e.concat(n), []);
                                e.setOption({ series: s }, { replaceMerge: ['series'] });
                              })(f, n, { donors: p, channels: d, years: c });
                          } else Z(f, W(t), { years: c, channels: d });
                        },
                        css: { minWidth: '200px' },
                        classNamePrefix: 'channels-chart-select',
                        isClearable: !1,
                      })
                    )
                  ),
                    n.hideLoading(),
                    L(f, e);
                });
              });
            },
          },
        });
      };
      const Q = t(164);
      const X = t.n(Q);
      const ee = t(228);
      const ne = function (e) {
        const n = Object(c.useState)(e.donorRecipients);
        const t = n[0];
        const r = n[1];
        const o = Object(c.useState)(e.defaultBreakdown);
        const i = o[0];
        const s = o[1];
        const l = Object(c.useState)(e.defaultRecipient);
        const u = l[0];
        const d = l[1];
        Object(c.useEffect)(() => {
          r(i === 'By donor' ? e.donorRecipients : e.orgTypeRecipients),
            e.onSelectBreakdown && e.onSelectBreakdown(i, u);
        }, [i]),
          Object(c.useEffect)(() => {
            e.onSelectRecipient && e.onSelectRecipient(u, i);
          }, [u]);

        return Object(a.c)(
          v,
          null,
          Object(a.c)(S, {
            classNamePrefix: 'recipient-chart-select',
            label: 'Select recipient',
            options: t.sort().map((e) => ({ value: e, label: e })),
            defaultValue: [{ value: e.defaultRecipient, label: e.defaultRecipient }],
            onChange(n) {
              d(n.value || e.defaultRecipient);
            },
            css: { minWidth: '150px' },
          }),
          Object(a.c)(S, {
            classNamePrefix: 'recipient-chart-breakdown',
            label: 'Choose breakdown',
            options: ['By donor', 'By type of organisation receiving funding'].map((e) => ({ value: e, label: e })),
            defaultValue: [{ value: e.defaultBreakdown, label: e.defaultBreakdown }],
            onChange(n) {
              s(n.value || e.defaultBreakdown);
            },
            css: { minWidth: '300px' },
          })
        );
      };
      (ne.propTypes = {
        donorRecipients: f.a.array,
        orgTypeRecipients: f.a.array,
        defaultRecipient: f.a.string,
        defaultBreakdown: f.a.string,
        onSelectBreakdown: f.a.func,
        onSelectRecipient: f.a.func,
      }),
        (ne.defaultProps = { defaultBreakdown: 'By donor', defaultRecipient: 'Afghanistan' });
      const te = ne;
      const re = new Intl.NumberFormat();
      const ae = function (e) {
        return e.trim() ? Number(e.replace(',', '').replace(' ', '').replace('%', '').trim()).toFixed(2) : null;
      };
      const oe = function (e, n) {
        return (
          void 0 === n && (n = 'Value'),
          e.map((e) => {
            const t = { ...e };

            return (t.value = ae(e[n])), t;
          })
        );
      };
      const ie = function (e, n, t, r) {
        const a = e.filter((e) => e['Destination Country'].trim() === t && e['Donor organisation'] === r);

        return n.map((e) => a.find((n) => n.Year === e) || null);
      };
      const se = function (e, n, t) {
        const r = ['Destination Country', 'Recipient Org Type'];
        const a = e.filter((e) => e[r[1]] === n);

        return t.map((e) => {
          const n = a.find((n) => n.Year === e);

          return { value: (n && ae(n.value)) || null, emphasis: { focus: 'self' } };
        });
      };
      const le = function (e, n) {
        const t = ['US', 'EU institutions', 'Germany', 'UK', 'Saudi Arabia', 'All other donors'];
        const r = e.filter((e) => e['Destination Country'].trim() === n);

        return t.length >= 5
          ? t
          : Array.from(new Set(r.map((e) => e['Donor organisation'])))
              .filter((e) => !t.includes(e))
              .slice(0, 5)
              .concat(t);
      };
      const ce = function (e) {
        void 0 === e && (e = 'far');

        return {
          type: 'value',
          nameRotate: 90,
          name: 'US$ millions',
          nameLocation: 'end',
          nameTextStyle: {
            verticalAlign: 'top',
            align: 'right',
            padding: { near: [-35, 0, 0, 0], middle: [-45, 0, 0, 0], far: [-54, 0, 0, 0] }[e],
          },
        };
      };
      const ue = function (e, n, t, r) {
        const a = r.years;
        const o = r.channels;
        const s = {
          color: _.bluebell,
          legend: { show: !0, top: 'top', padding: [20, 10, 5, 10], textStyle: { fontSize: '1.3rem' } },
          grid: { bottom: '10%', top: '20%' },
          xAxis: { type: 'category', data: a, position: 'bottom' },
          series: o.map((e) => ({
            name: e,
            data: ie(n, a, t, e).map((e) => ({ value: e && Number(e.value).toFixed(2), emphasis: { focus: 'self' } })),
            type: 'bar',
            stack: 'channels',
            cursor: 'auto',
            tooltip: {
              trigger: 'item',
              formatter(n) {
                return `${e}, ${n.name} <br />10 largest recipients: <strong>US$${re.format(
                  Math.round(n.value)
                )} million</strong>`;
              },
            },
            animation: !1,
          })),
        };

        return (
          (s.yAxis = ce(T(s.series))),
          (k.toolbox.feature.saveAsImage.name = 'recipients'),
          e.setOption(i()(s, k), { replaceMerge: ['series'] }),
          e.on('legendselectchanged', (n) => {
            N(e, n);
          }),
          e
        );
      };
      const de = function (e, n, t) {
        const r = t.recipient;
        const a = t.years;
        const o = oe(n, 'USD deflated millions');
        const i = le(n, r)
          .map((e) => ({
            name: e,
            data: ie(o, a, r, e).map((e) => ({ value: e && Number(e.value).toFixed(2), emphasis: { focus: 'self' } })),
            type: 'bar',
            stack: r,
            cursor: 'auto',
            tooltip: {
              trigger: 'item',
              formatter(n) {
                return `${e}, ${n.name} <br/>${r}: <strong>US$${re.format(Math.round(n.value))} million</strong>`;
              },
            },
          }))
          .reduce((e, n) => e.concat(n), []);
        e.setOption({ yAxis: ce(T(i)), series: i }, { replaceMerge: ['series'] });
      };
      const fe = function (e, n, t) {
        const r = t.recipient;
        const a = t.years;
        const o = (function (e) {
          const n = ['Not reported', 'Other'];
          const t = e.filter((e) => !n.includes(e));

          return (
            n.forEach((n) => {
              e.includes(n) && t.push(n);
            }),
            t
          );
        })(
          (function (e, n) {
            const t = e.filter((e) => e['Destination Country'].trim() === n);

            return Array.from(new Set(t.map((e) => e['Recipient Org Type'])));
          })(n, r)
        )
          .map((e) => ({
            name: e,
            data: se(n, e, a),
            type: 'bar',
            stack: r,
            cursor: 'auto',
            tooltip: {
              trigger: 'item',
              formatter(n) {
                return `${n.name} <br/>${e}: <strong>US$${re.format(Math.round(n.value))} million</strong>`;
              },
            },
          }))
          .reduce((e, n) => e.concat(n), []);
        e.setOption({ yAxis: ce(T(o)), series: o }, { replaceMerge: ['series'] });
      };
      const pe = function () {
        window.DICharts.handler.addChart({
          className: 'dicharts--gha-recipients',
          echarts: {
            onAdd(e) {
              Array.prototype.forEach.call(
                e,
                (function () {
                  const e = Object(ee.a)(
                    X.a.mark(function e(n) {
                      let t;
                      let r;
                      let a;
                      let o;
                      let i;
                      let l;
                      let c;
                      let d;
                      let f;
                      let p;
                      let m;
                      let b;

                      return X.a.wrap((e) => {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (t = new window.DICharts.Chart(n.parentElement)),
                                (e.next = 3),
                                A(
                                  'https://raw.githubusercontent.com/devinit/gha-data-visualisations/feature/map-filters/public/assets/data/recipients-by-donor.csv'
                                )
                              );
                            case 3:
                              return (
                                (r = e.sent),
                                (e.next = 6),
                                A(
                                  'https://raw.githubusercontent.com/devinit/gha-data-visualisations/feature/map-filters/public/assets/data/recipients-by-org-type.csv'
                                )
                              );
                            case 6:
                              (a = e.sent),
                                (o = O(n)),
                                (i = Array.from(
                                  new Set(
                                    r
                                      .filter((e) => e['Top 10 recipient'] === 'Yes')
                                      .map((e) => e['Destination Country'])
                                  )
                                )),
                                (l = Array.from(new Set(r.map((e) => e.Year)))),
                                'Afghanistan',
                                'By donor',
                                (c = le(r, 'Afghanistan')),
                                (d = Array.from(
                                  new Set(
                                    a
                                      .filter((e) => e['Top 10 recipient'] === 'Yes')
                                      .map((e) => e['Destination Country'])
                                  )
                                )),
                                (f = window.echarts.init(n)),
                                ue(f, oe(r, 'USD deflated millions'), 'Afghanistan', { years: l, channels: c }),
                                (p = 'Afghanistan'),
                                (m = function (e, n) {
                                  if ((void 0 === n && (n = 'By donor'), (p = e || 'Afghanistan'), n === 'By donor'))
                                    if (p !== '10 largest recipients') {
                                      const t = r.filter((e) => e['Destination Country'] === p);
                                      de(f, t, { recipient: p, years: l });
                                    } else
                                      (p = '10 largest recipients'),
                                        ue(f, oe(r, 'USD deflated millions'), '10 largest recipients', {
                                          years: l,
                                          channels: c,
                                        });
                                  else
                                    fe(
                                      f,
                                      a.filter((n) => n['Destination Country'] === e),
                                      { recipient: e, years: l }
                                    );
                                }),
                                (b = function (e, n) {
                                  if (e === 'By donor')
                                    if (n !== '10 largest recipients') {
                                      const t = r.filter((e) => e['Destination Country'] === n);
                                      de(f, t, { recipient: n, years: l });
                                    } else
                                      ue(f, oe(r, 'USD deflated millions'), '10 largest recipients', {
                                        years: l,
                                        channels: c,
                                      });
                                  else
                                    fe(
                                      f,
                                      a.filter((e) => e['Destination Country'] === n),
                                      { recipient: n, years: l }
                                    );
                                }),
                                Object(s.createRoot)(o).render(
                                  u.a.createElement(te, {
                                    donorRecipients: i,
                                    orgTypeRecipients: d,
                                    onSelectRecipient: m,
                                    onSelectBreakdown: b,
                                    defaultBreakdown: 'By donor',
                                    defaultRecipient: 'Afghanistan',
                                  })
                                ),
                                t.hideLoading(),
                                L(f, n);
                            case 23:
                            case 'end':
                              return e.stop();
                          }
                      }, e);
                    })
                  );

                  return function (n) {
                    return e.apply(this, arguments);
                  };
                })()
              );
            },
          },
        });
      };
      const me = (t(580), 'https://devinit.org/assets/svg/icons/response-plan-icon.svg');
      const be = function (e) {
        const n = [];

        return (
          Number(e.Conflict_marker) > 0 && n.push('Conflict'),
          Number(e.Displacement_marker) > 0 && n.push('Displacement'),
          Number(e.Physical_disaster_marker) > 0 && n.push('Natural hazard'),
          n.join(', ')
        );
      };
      const ve = function (e) {
        switch (e) {
          case '5':
            return 'Very high';
          case '4':
            return 'High';
          case '3':
            return 'Medium';
          case '2':
            return 'Low';
          case '1':
            return 'Very Low';
          case '':
            return 'Not assessed';
          default:
            return '';
        }
      };
      const ge = function (e) {
        return `${e['Protracted/Recurrent_crisis']}, ${e.Years_of_consecutive_crisis} years`;
      };
      const he = function (e, n) {
        return e ? `${Math.round((Number(n) / Number(e)) * 100)}% funded[US$${n} of ${e}]` : 'Not assessed';
      };
      const ye = function (e) {
        switch (e) {
          case '5':
            return '#7F1850';
          case '4':
            return '#AD1156';
          case '3':
            return '#D64279';
          case '2':
            return '#E4819B';
          case '1':
            return '#F6B9C2';
          case '':
            return 'repeating-linear-gradient(45deg, grey 0, grey 3px, transparent 3px, transparent 6px)';
          default:
            return '#E6E1E5';
        }
      };
      const we = window.L.control({ position: 'bottomright' });
      (we.onAdd = function () {
        return (
          (this.div = window.L.DomUtil.create('div', 'databox')),
          this.div.setAttribute('data-id', 'databoxContainer'),
          this.update(),
          this.div
        );
      }),
        (we.update = function (e) {
          let n;
          let t;
          let r;
          this.div.innerHTML = e
            ? `<div>${
                e.name
              } <button id=closeDatabox><img src=https://devinit.org/assets/svg/icons/cross.colors-poppy-slate-blank-poppydark.svg height=20 width=20 ></img></button></div> <br> ${((n =
                e),
              [
                {
                  value: n['People_in_need_(millions)'],
                  label: 'People in need',
                  icon: 'https://devinit.org/assets/svg/icons/people-in-need-icon.svg',
                },
                {
                  value: be(n),
                  label: 'Crisis type',
                  icon: 'https://devinit.org/assets/svg/icons/crisis-type-icon.svg',
                },
                {
                  value: ve(n.Severity_score),
                  label: 'Severity of crisis',
                  icon: 'https://devinit.org/assets/svg/icons/crisis-severity-icon.svg',
                },
                {
                  value: ge(n),
                  label: 'Crisis duration',
                  icon: 'https://devinit.org/assets/svg/icons/crisis-duration-icon.svg',
                },
                {
                  value: `${n.COVID_vaccination_rate}% of the population vaccinated`,
                  label: 'Covid vaccinations',
                  icon: 'https://devinit.org/assets/svg/icons/covid-vaccination-icon.svg',
                },
                {
                  value: ve(n.Climate_vulnerability),
                  label: 'Climate vulnerability',
                  icon: 'https://devinit.org/assets/svg/icons/climate-vulnerability-icon.svg',
                },
                {
                  value:
                    ((t = n['Country_response_plan_requirements_(US$,_million)']),
                    (r = n['Country_response_plan_coverage_(%)']),
                    t ? `${r}% funded[US$${Math.round((Number(r) / 100) * Number(t))}  of ${t}]` : 'Not assessed'),
                  label: 'Country response plan',
                  icon: me,
                },
                {
                  value: he(
                    n['Regional_response_plan_requirements_(US$,_million)'],
                    n['Regional_response_plan_funding_(US$,_million)']
                  ),
                  label: 'Regional response plan',
                  icon: me,
                },
              ])
                .map((e) => `<span><img src=${e.icon} height=20 width=20 ></img><p>${e.label}: ${e.value}</p> </span>`)
                .join('')}`
            : '';
          const a = document.getElementById('closeDatabox');
          a &&
            a.addEventListener('click', (e) =>
              (function (e, n) {
                e.stopPropagation(),
                  n.update(),
                  (document.querySelector('[data-id="databoxContainer"]').style.display = 'none');
              })(e, we)
            );
        });
      const Se = function (e, n, t, r, a, o, i, s) {
        let l;
        const c = i;
        (c.onAdd = function () {
          const n = window.L.DomUtil.create('div', 'legend');
          const t = [
            { score: '5', label: '5 - Very High' },
            { score: '4', label: '4 - High' },
            { score: '3', label: '3 - Medium' },
            { score: '2', label: '2 - Low' },
            { score: '1', label: '1 - Very Low' },
            { score: '', label: 'Not assessed' },
          ];
          const r = [
            { variable: 'Severity_score', data: t },
            { variable: 'Climate_vulnerability', data: t },
            { variable: 'COVID_vaccination_rate', max: '100(%)' },
            { variable: 'Food_insecure_(millions)', max: '26(million)' },
            { variable: 'People_in_need_(millions)', max: '25(million)' },
          ];
          const a =
            e !== 'Severity_score' && e !== 'Climate_vulnerability'
              ? `<p style="margin-right:1px;margin-top:5px;">0<p>${[
                  '#F6B9C2',
                  '#E4819B',
                  '#D64279',
                  '#AD1156',
                  '#7F1850',
                ]
                  .map(
                    (e) =>
                      `<span>\n          <i style="background:${e};border-radius:1px;margin-right:0;width:40px;"></i>\n        </span>`
                  )
                  .join('')} <p style="margin-left:1px;margin-top:5px;">${r.find((n) => n.variable === e).max}</p>`
              : r
                  .find((n) => n.variable === e)
                  .data.map((e) => `<span><i style="background:${ye(e.score)}"></i><label>${e.label}</label></span>`)
                  .join('');

          return (n.innerHTML = a), n;
        }),
          c.addTo(n);
        let u;
        const d = function (n) {
          let r;

          return (
            ((r = {})[n.properties[e] === '' ? 'fillPattern' : 'fillColor'] =
              o.find((n) => n.name === e).scaleType === 'piecewise'
                ? t(n.properties[e])
                : t(n.properties[e], o.find((n) => n.name === e).values)),
            (r.weight = 1),
            (r.opacity = 1),
            (r.color = 'white'),
            (r.fillOpacity = 1),
            r
          );
        };
        const f = function (e) {
          l.resetStyle(e.target), e.target.closePopup();
        };
        const p = function (t, r) {
          (t.properties[e] || t.properties[e] === '') &&
            r.on({
              mouseover(n) {
                return (function (e, n, t) {
                  const r = e.target;
                  r.setStyle({ fillColor: 'yellow', color: 'black', weight: 2 }),
                    window.L.Browser.ie || window.L.Browser.opera || window.L.Browser.edge || r.bringToFront(),
                    r
                      .bindPopup(
                        r.feature.properties[n]
                          ? `<div>${r.feature.properties.name}<br>${t.find((e) => e.name === n).label}: ${
                              r.feature.properties[n]
                            }</div>`
                          : r.feature.properties.name
                      )
                      .openPopup();
                })(n, e, o);
              },
              mouseout: f,
              click(e) {
                return (function (e, n, t) {
                  t.addTo(n);
                  const r = e.target;
                  t.update(r.feature.properties);
                })(e, n, we);
              },
            });
        };
        s.clearLayers(),
          (l = window.L.geoJSON(
            ((u = a),
            r.map((e) => {
              const n = { ...e };
              const t = u.find((n) => n.name === e.properties.name);

              return t && (n.properties = { ...e.properties, ...t }), n;
            })),
            { style: d, onEachFeature: p }
          )),
          s.addLayer(l);
      };
      const xe = function () {
        window.DICharts.handler.addChart({
          className: 'dicharts--gha-people-affected-by-crisis-leaflet',
          echarts: {
            onAdd(e) {
              Array.prototype.forEach.call(e, (e) => {
                const n = new window.DICharts.Chart(e.parentElement);
                const t = window.L.map(e, { zoomSnap: 0.5, maxZoom: 3, minZoom: 2 }).setView([20, -0.09], 2);
                let r = 'Severity_score';
                const a = O(e);
                const o = [
                  { name: 'Severity_score', label: 'Severity score', scaleType: 'piecewise' },
                  { name: 'Climate_vulnerability', label: 'Climate vulnerability score', scaleType: 'piecewise' },
                  {
                    name: 'COVID_vaccination_rate',
                    label: 'COVID vaccination rate',
                    scaleType: 'continous',
                    values: [100, 80, 60, 40, 20, 0],
                  },
                  {
                    name: 'Food_insecure_(millions)',
                    label: 'People facing food insecurity',
                    scaleType: 'continous',
                    values: [26, 21, 16, 11, 6, 0],
                  },
                  {
                    name: 'People_in_need_(millions)',
                    label: 'People in need',
                    scaleType: 'continous',
                    values: [25, 20, 15, 10, 5, 0],
                  },
                ];
                const i = (function (e, n, t, r) {
                  let a;
                  const o = e.wrapper;
                  const i = e.options;
                  const s = e.allItemsLabel;
                  const l = e.className;
                  const c = e.label;
                  const u = e.defaultOption;
                  const d = void 0 === u ? '*' : u;
                  const f = document.createElement('select');
                  if (
                    ((a = f.classList).add.apply(a, ['data-selector', 'js-plotly-chart-data-selector'].concat(l)),
                    s && E(f, { label: s, value: '*' }, d === '*'),
                    i.forEach((e) => E(f, e, e === d)),
                    f.classList.add('data-selector--active'),
                    c)
                  ) {
                    const p = document.createElement('label');
                    p.innerHTML = c;
                    const m = document.createElement('div');
                    if (
                      (m.classList.add('labelled-data-selector--wrapper'),
                      m.appendChild(p),
                      m.appendChild(f),
                      o.appendChild(m),
                      t && r)
                    ) {
                      const b = document.createElement('div');
                      b.classList.add('data-selector--wrapper'),
                        (b.innerHTML = r),
                        (b.style.color = 'red'),
                        (b.style.fontSize = '11px'),
                        (b.style.position = 'relative'),
                        (b.style.padding = '5px'),
                        (b.style.paddingLeft = '20px'),
                        (b.style.display = 'none'),
                        b.setAttribute('id', t),
                        o.insertAdjacentElement('afterend', b);
                    }
                    if (n) return [f, m];
                  } else o.appendChild(f);

                  return f;
                })({
                  wrapper: a,
                  options: o.map((e) => e.label),
                  defaultOption: 'Severity score',
                  className: 'map-filter',
                  label: 'Select a dimension',
                });
                const s = window.L.control({ position: 'topright' });
                const l = new window.L.StripePattern({ weight: 2, spaceWeight: 1, angle: 45, color: 'grey' });
                l.addTo(t);
                const c = function (e) {
                  switch (e) {
                    case '5':
                      return '#7F1850';
                    case '4':
                      return '#AD1156';
                    case '3':
                      return '#D64279';
                    case '2':
                      return '#E4819B';
                    case '1':
                      return '#F6B9C2';
                    case '':
                      return l;
                    default:
                      return '#E6E1E5';
                  }
                };
                const u = function (e, n) {
                  return e === ''
                    ? l
                    : Number(e) > n[1]
                    ? '#7F1850'
                    : Number(e) > n[2]
                    ? '#AD1156'
                    : Number(e) > n[3]
                    ? '#D64279'
                    : Number(e) > n[4]
                    ? '#E4819B'
                    : Number(e) >= n[5]
                    ? '#F6B9C2'
                    : '#E6E1E5';
                };
                n.showLoading(),
                  window
                    .fetch(
                      'https://raw.githubusercontent.com/devinit/gha-data-visualisations/feature/map-filters/public/assets/data/world_map.geo.json'
                    )
                    .then((e) => e.json())
                    .then((e) => {
                      const a = e.features;
                      A(
                        'https://raw.githubusercontent.com/devinit/gha-data-visualisations/feature/map-filters/public/assets/data/map_data_long.csv'
                      ).then((e) => {
                        let l;
                        const d =
                          ((l = a),
                          e.map((e) => {
                            const n = { ...e };
                            const t = l.find((e) => e.properties.iso_a3 === n.Country_ID);

                            return t && (n.Country_name = t.properties.name), n;
                          }));
                        const f = (function (e, n) {
                          const t = [];

                          return (
                            e.forEach((e) => {
                              const r = {};
                              (r.name = e),
                                n.forEach((n) => {
                                  n.Country_name === e && (r[n.variable] = n.value);
                                }),
                                t.push(r);
                            }),
                            t
                          );
                        })(Array.from(new Set(d.map((e) => e.Country_name))), d);
                        const p = window.L.featureGroup().addTo(t);
                        i.addEventListener('change', (e) => {
                          (r = o.find((n) => n.label === e.target.value).name),
                            Se(r, t, o.find((e) => e.name === r).scaleType === 'continous' ? u : c, a, f, o, s, p);
                        }),
                          Se(r, t, o.find((e) => e.name === r).scaleType === 'continous' ? u : c, a, f, o, s, p),
                          n.hideLoading();
                      });
                    })
                    .catch((e) => console.log(e));
              });
            },
          },
        });
      };
      t(581);
      window.addEventListener('load', () => {
        $(), K(), pe(), xe();
      });
    },
  },
  [[231, 1, 2]],
]);
