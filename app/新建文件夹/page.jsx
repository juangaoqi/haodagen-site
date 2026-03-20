'use client';
import { useEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const NAV = [
  { key: 'home',         label: '首页' },
  { key: 'products',     label: '产品' },
  { key: 'privateLabel', label: '定制贴牌' },
  { key: 'cases',        label: '合作案例' },
  { key: 'about',        label: '关于我们' },
  { key: 'contact',      label: '咨询合作' },
];

const SERVICES = [
  { n:'01', title:'选品策略', body:'结合门店定位、客群和经营场景，给出更适合上新、动销和产品结构的匹配建议。' },
  { n:'02', title:'产品供应', body:'围绕餐饮门店日常经营和上新需求，提供稳定、持续、可匹配的产品供应支持。' },
  { n:'03', title:'定制贴牌', body:'支持客户根据品牌方向和产品定位推进定制贴牌合作，形成差异化产品能力。' },
  { n:'04', title:'降本增效', body:'通过优化产品结构、减少试错成本、提升上新效率和供货协同，帮助门店提升经营效率。' },
];

const PRODUCTS = [
  { title:'烧烤夜市小吃', tags:['火山石烤肠','鸡翅包饭','韩式风干肠'], note:'烧烤 · 夜市 · 外带' },
  { title:'西式餐饮食材', tags:['德式罗勒烤香肠','德式黑椒烤肠','德式盘肠','奥尔良风味烤肠'], note:'西式简餐 · 轻食' },
  { title:'日式餐饮食材', tags:['日式小红肠','日式炸付香肠','海藻墨鱼肠'], note:'日式门店 · 清爽场景' },
  { title:'高端台式食材', tags:['台式原味香肠','台式黑胡椒香肠','台式玉米香肠','台式飞鱼卵香肠'], note:'差异化 · 高端定位' },
  { title:'特色餐饮食材', tags:['葡香肉肠','老长沙大香肠','深海鳕鱼肠','深海墨鱼汁香肠'], note:'特色经营 · 爆品测试' },
  { title:'火锅茶餐厅', tags:['墨鱼丸子','无实小腊肠','鱼籽福袋'], note:'火锅 · 茶餐厅 · 复合场景' },
];

const CASES = [
  { tag:'供货+选品支持', client:'某烧烤门店', issue:'产品选择分散，上新效率不高，产品结构缺乏重点。', how:'围绕门店需求匹配产品方向，持续提供产品供应与选品支持。', out:'产品结构更清晰，上新效率更高，合作节奏也更稳定。' },
  { tag:'场景匹配', client:'某西式餐饮门店', issue:'希望产品更稳定，更符合门店整体风格与菜单体系。', how:'结合门店场景匹配产品方向，持续优化产品组合并稳定供货。', out:'供应更稳定，产品更贴合门店定位，菜单搭配也更顺畅。' },
  { tag:'定制贴牌', client:'某品牌客户', issue:'希望打造更有品牌辨识度的产品合作方式。', how:'基于品牌方向推进定制贴牌合作，围绕产品呈现和长期合作展开支持。', out:'增强差异化产品能力，提升合作深度与品牌延展性。' },
];

const FAQ = [
  { q:'豪大根主要是卖货，还是做选品服务？', a:'以产品供应为核心，但不只停留在供货，更会结合门店类型、客群和经营需求提供选品支持。' },
  { q:'你们适合哪类门店合作？', a:'适合有供货、上新、产品优化和品牌定制需求的餐饮门店，也适合希望做长期协同合作的品牌客户。' },
  { q:'定制贴牌适合什么样的客户？', a:'适合希望做差异化产品、强化品牌辨识度，或希望推进长期合作的门店和品牌。' },
  { q:'降本增效具体体现在哪？', a:'主要体现在减少试错、优化产品结构、提高上新效率、增强供货协同和降低无效采购。' },
];

/* ═══════════════════════════════════════════════════════════════
   HOOK
═══════════════════════════════════════════════════════════════ */
function useReveal(t = 0.1) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); }}, { threshold: t });
    io.observe(el); return () => io.disconnect();
  }, [t]);
  return [ref, on];
}

/* ═══════════════════════════════════════════════════════════════
   CSS
═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --paper:#F2EDE3;
  --paper2:#EBE5D8;
  --paper3:#E4DCCA;
  --ink:#1A1712;
  --ink2:#6A6155;
  --ink3:#A39B8E;
  --amber:#9B6F2F;
  --amber2:#C49040;
  --amber-pale:rgba(155,111,47,0.09);
  --amber-line:rgba(155,111,47,0.26);
  --rule:rgba(26,23,18,0.13);
  --rule-light:rgba(26,23,18,0.07);
  --serif:'Noto Serif SC','Songti SC',Georgia,serif;
  --sans:'Noto Sans SC','PingFang SC',sans-serif;
  --ease:cubic-bezier(0.16,1,0.3,1);
}
html{scroll-behavior:smooth}
body{background:var(--paper);color:var(--ink);font-family:var(--sans);-webkit-font-smoothing:antialiased}
button{cursor:pointer;border:none;background:none;font-family:inherit;color:inherit}

/* layout */
.W{max-width:1340px;margin:0 auto;padding:0 52px}
@media(max-width:768px){.W{padding:0 22px}}
.shell{padding-top:60px}

/* rule */
.hr{height:1px;background:var(--rule)}

/* reveal */
.rv{opacity:0;transform:translateY(20px);transition:opacity .75s ease,transform .75s ease}
.rv.in{opacity:1;transform:none}
.rv-d1{transition-delay:.07s}.rv-d2{transition-delay:.14s}.rv-d3{transition-delay:.21s}
.rv-d4{transition-delay:.28s}.rv-d5{transition-delay:.35s}

/* ── NAV ── */
.nav{position:fixed;top:0;left:0;right:0;z-index:200;
  background:rgba(242,237,227,0.94);backdrop-filter:blur(18px) saturate(1.5);
  border-bottom:1px solid var(--rule)}
.nav-i{max-width:1340px;margin:0 auto;padding:0 52px;
  height:60px;display:flex;align-items:center;justify-content:space-between}
@media(max-width:768px){.nav-i{padding:0 22px}}
.nav-brand{display:flex;flex-direction:column;gap:2px;line-height:1}
.nav-en{font-size:0.58rem;letter-spacing:.36em;color:var(--amber);text-transform:uppercase}
.nav-cn{font-family:var(--serif);font-size:.9375rem;font-weight:500;color:var(--ink)}
.nav-links{display:flex;align-items:center;gap:30px}
@media(max-width:920px){.nav-links{display:none}}
.nav-a{font-size:.8rem;color:var(--ink2);transition:color .2s;letter-spacing:.04em}
.nav-a:hover,.nav-a.on{color:var(--ink)}
.nav-a.on{border-bottom:1px solid var(--amber);padding-bottom:1px}
.nav-cta{font-size:.8rem;background:var(--ink);color:var(--paper);
  padding:8px 22px;letter-spacing:.08em;transition:background .2s,transform .15s}
.nav-cta:hover{background:var(--amber);transform:translateY(-1px)}
.nav-ham{display:none;width:36px;height:36px;align-items:center;justify-content:center;
  border:1px solid var(--rule);color:var(--ink);font-size:18px}
@media(max-width:920px){.nav-ham{display:flex}}
.mob{background:var(--paper2);border-bottom:1px solid var(--rule)}
.mob-i{padding:10px 22px 16px;display:grid;gap:2px}
.mob-a{font-size:.9rem;color:var(--ink2);padding:11px 14px;text-align:left;
  border-left:2px solid transparent;transition:all .2s}
.mob-a:hover,.mob-a.on{color:var(--ink);border-left-color:var(--amber);background:var(--paper3)}

/* ── HERO ── */
.hero{min-height:calc(100svh - 60px);display:flex;flex-direction:column;
  border-bottom:1px solid var(--rule);position:relative;overflow:hidden}
.hero-deco{position:absolute;right:-40px;bottom:-60px;
  font-family:var(--serif);font-size:clamp(280px,38vw,520px);font-weight:700;
  color:rgba(26,23,18,0.028);pointer-events:none;user-select:none;line-height:1;
  animation:decoFade 1.2s ease .8s both}
@keyframes decoFade{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
.hero-body{flex:1;display:grid;grid-template-columns:52px 1fr;align-items:stretch}
@media(max-width:900px){.hero-body{grid-template-columns:1fr}}
.hero-rail{border-right:1px solid var(--rule);display:flex;flex-direction:column;
  align-items:center;padding:52px 0;gap:12px}
@media(max-width:900px){.hero-rail{display:none}}
.hero-rail-txt{writing-mode:vertical-rl;font-size:.58rem;letter-spacing:.32em;
  color:var(--ink3);text-transform:uppercase}
.hero-main{padding:68px 80px 60px 60px;display:flex;flex-direction:column;justify-content:center}
@media(max-width:900px){.hero-main{padding:52px 22px 48px}}
.hero-eyebrow{display:flex;align-items:center;gap:14px;margin-bottom:40px;
  animation:hFade .7s ease .1s both}
.hero-eyebrow-bar{width:28px;height:1px;background:var(--amber);flex-shrink:0}
.hero-eyebrow-txt{font-size:.68rem;letter-spacing:.3em;color:var(--amber);text-transform:uppercase}
.hero-h{margin-bottom:32px}
.hero-h1{font-family:var(--serif);font-size:clamp(2.2rem,4vw,3.4rem);font-weight:600;
  line-height:1.22;color:var(--ink);
  animation:hUp 1.1s var(--ease) .25s both}
.hero-h2{font-family:var(--serif);font-size:clamp(2.2rem,4vw,3.4rem);font-weight:600;
  line-height:1.22;color:var(--amber);
  animation:hUp 1.1s var(--ease) .4s both}
.hero-desc{max-width:540px;font-size:.9rem;line-height:1.95;color:var(--ink2);
  border-left:2px solid var(--amber);padding-left:18px;margin-bottom:48px;
  animation:hFade .9s ease .65s both}
.hero-ctas{display:flex;gap:14px;flex-wrap:wrap;animation:hFade .8s ease .8s both}
.btn-dk{background:var(--ink);color:var(--paper);font-size:.8rem;letter-spacing:.1em;
  padding:13px 36px;transition:background .2s,transform .15s}
.btn-dk:hover{background:var(--amber);transform:translateY(-1px)}
.btn-out{border:1px solid var(--rule);color:var(--ink2);font-size:.8rem;letter-spacing:.08em;
  padding:12px 30px;transition:all .2s}
.btn-out:hover{border-color:var(--amber-line);color:var(--ink)}
.hero-foot{border-top:1px solid var(--rule);display:grid;
  grid-template-columns:52px 1fr 1fr 1fr;animation:hFade .8s ease 1s both}
@media(max-width:900px){.hero-foot{grid-template-columns:1fr 1fr}}
@media(max-width:440px){.hero-foot{grid-template-columns:1fr}}
.hero-foot-corner{border-right:1px solid var(--rule)}
@media(max-width:900px){.hero-foot-corner{display:none}}
.hero-stat{padding:26px 30px;border-right:1px solid var(--rule);transition:background .2s}
.hero-stat:last-child{border-right:none}
.hero-stat:hover{background:var(--paper2)}
.hero-stat-v{font-family:var(--serif);font-size:1.1rem;color:var(--amber);font-weight:500;margin-bottom:5px}
.hero-stat-l{font-size:.72rem;color:var(--ink3);line-height:1.65;letter-spacing:.02em}

@keyframes hUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
@keyframes hFade{from{opacity:0}to{opacity:1}}

/* ── SEC ── */
.sec{padding:96px 0}
.sec-s{padding:72px 0}
.sec-shade{background:var(--paper2)}
.sec-dark{background:var(--ink);color:var(--paper)}
@media(max-width:768px){.sec{padding:60px 0}.sec-s{padding:48px 0}}

/* section header */
.sh{display:grid;grid-template-columns:56px 1fr;gap:0;margin-bottom:60px}
@media(max-width:640px){.sh{grid-template-columns:1fr}}
.sh-n{padding-top:4px;font-family:var(--serif);font-size:.72rem;letter-spacing:.16em;color:var(--ink3)}
@media(max-width:640px){.sh-n{display:none}}
.sh-b{}
.sh-label{font-size:.68rem;letter-spacing:.28em;text-transform:uppercase;color:var(--amber);margin-bottom:10px}
.sh-title{font-family:var(--serif);font-size:clamp(1.35rem,1.9vw,1.8rem);font-weight:500;color:var(--ink);line-height:1.35}
.sh-title-inv{color:var(--paper)}
.sh-desc{font-size:.875rem;line-height:1.9;color:var(--ink2);margin-top:12px;max-width:520px}
.sh-desc-inv{color:rgba(242,237,227,0.5)}

/* ── SERVICES ── */
.svc-grid{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--rule)}
@media(max-width:960px){.svc-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.svc-grid{grid-template-columns:1fr}}
.svc{padding:40px 30px 44px;border-right:1px solid var(--rule);
  position:relative;overflow:hidden;transition:background .3s}
.svc:last-child{border-right:none}
.svc:hover{background:var(--paper2)}
.svc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:var(--amber);transform:scaleX(0);transform-origin:left;
  transition:transform .45s var(--ease)}
.svc:hover::before{transform:scaleX(1)}
.svc-n{font-size:.68rem;letter-spacing:.22em;color:var(--amber);margin-bottom:22px}
.svc-t{font-family:var(--serif);font-size:1.125rem;font-weight:500;color:var(--ink);margin-bottom:13px}
.svc-b{font-size:.8125rem;line-height:1.9;color:var(--ink2)}

/* ── PRODUCTS ── */
.prd-wrap{display:grid;grid-template-columns:220px 1fr;border-top:1px solid var(--rule)}
@media(max-width:840px){.prd-wrap{grid-template-columns:1fr}}
.prd-side{border-right:1px solid var(--rule);padding:40px 32px;
  display:flex;flex-direction:column;gap:20px}
@media(max-width:840px){.prd-side{border-right:none;border-bottom:1px solid var(--rule)}}
.prd-side-t{font-family:var(--serif);font-size:1.4rem;font-weight:500;color:var(--ink);line-height:1.5}
.prd-side-b{font-size:.8rem;color:var(--ink2);line-height:1.9}
.prd-list{display:grid;grid-template-columns:repeat(3,1fr)}
@media(max-width:1080px){.prd-list{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.prd-list{grid-template-columns:1fr}}
.prd-item{padding:34px 28px;border-bottom:1px solid var(--rule);
  border-right:1px solid var(--rule);transition:background .25s}
.prd-item:hover{background:var(--paper3)}
.prd-note{font-size:.63rem;letter-spacing:.22em;color:var(--ink3);text-transform:uppercase;margin-bottom:10px}
.prd-t{font-family:var(--serif);font-size:1rem;font-weight:500;color:var(--ink);margin-bottom:14px}
.prd-tags{display:flex;flex-wrap:wrap;gap:6px}
.prd-tag{font-size:.68rem;color:var(--ink2);border:1px solid var(--rule);
  padding:3px 10px;letter-spacing:.04em;transition:all .2s}
.prd-item:hover .prd-tag{border-color:var(--amber-line);color:var(--ink)}

/* ── VALUE ── */
.val-grid{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid rgba(242,237,227,.12)}
@media(max-width:768px){.val-grid{grid-template-columns:1fr}}
.val-l{padding:64px 56px 64px 0;border-right:1px solid rgba(242,237,227,.12)}
@media(max-width:768px){.val-l{border-right:none;border-bottom:1px solid rgba(242,237,227,.12);padding:48px 0}}
.val-r{padding:64px 0 64px 56px}
@media(max-width:768px){.val-r{padding:48px 0}}
.val-label{font-size:.68rem;letter-spacing:.28em;text-transform:uppercase;color:var(--amber);margin-bottom:10px}
.val-t{font-family:var(--serif);font-size:clamp(1.35rem,1.9vw,1.8rem);font-weight:500;color:var(--paper);line-height:1.35}
.val-d{font-size:.875rem;color:rgba(242,237,227,.5);line-height:1.9;margin-top:12px;max-width:420px}
.val-list{display:grid;gap:12px;margin-top:28px}
.val-row{display:flex;align-items:flex-start;gap:12px}
.val-dot{width:16px;height:16px;border:1px solid rgba(242,237,227,.18);flex-shrink:0;margin-top:3px;
  position:relative}
.val-dot::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:5px;height:5px;background:var(--amber)}
.val-txt{font-size:.8rem;color:rgba(242,237,227,.55);line-height:1.85}

/* ── CHIPS ── */
.chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:40px}
.chip{font-size:.8rem;color:var(--ink2);border:1px solid var(--rule);padding:10px 20px;
  letter-spacing:.04em;transition:all .25s;cursor:default}
.chip:hover{border-color:var(--amber-line);color:var(--ink);background:var(--amber-pale)}

/* ── CASES ── */
.case-list{border-top:1px solid var(--rule);margin-top:56px}
.case-row{display:grid;grid-template-columns:48px 160px 1fr 1fr 1fr;
  border-bottom:1px solid var(--rule);transition:background .2s}
.case-row:hover{background:var(--paper2)}
@media(max-width:960px){.case-row{grid-template-columns:1fr}}
.case-n{padding:30px 16px;border-right:1px solid var(--rule);
  font-size:.7rem;letter-spacing:.18em;color:var(--ink3);align-self:start;padding-top:32px}
@media(max-width:960px){.case-n{display:none}}
.case-c{padding:32px 24px;border-right:1px solid var(--rule)}
@media(max-width:960px){.case-c{border-right:none;border-bottom:1px solid var(--rule-light)}}
.case-tag{display:inline-block;font-size:.62rem;letter-spacing:.2em;color:var(--amber);
  border:1px solid var(--amber-line);padding:3px 10px;margin-bottom:12px;text-transform:uppercase}
.case-client{font-family:var(--serif);font-size:1rem;font-weight:500;color:var(--ink)}
.case-cl{font-size:.62rem;letter-spacing:.2em;color:var(--ink3);text-transform:uppercase;margin-bottom:7px}
.case-cv{font-size:.8rem;color:var(--ink2);line-height:1.85}

/* ── FAQ ── */
.faq-list{border-top:1px solid var(--rule);margin-top:56px}
.faq-item{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid var(--rule);transition:background .2s}
.faq-item:hover{background:var(--paper2)}
@media(max-width:640px){.faq-item{grid-template-columns:1fr}}
.faq-q{padding:28px 40px 28px 0;font-family:var(--serif);font-size:.9375rem;font-weight:500;
  color:var(--ink);border-right:1px solid var(--rule)}
@media(max-width:640px){.faq-q{border-right:none;border-bottom:1px solid var(--rule-light);padding:24px 0 14px}}
.faq-a{padding:28px 0 28px 40px;font-size:.8rem;color:var(--ink2);line-height:1.85}
@media(max-width:640px){.faq-a{padding:14px 0 24px}}

/* ── CTA BAND ── */
.cta{background:var(--ink);padding:76px 0;border-top:1px solid var(--rule)}
.cta-in{display:grid;grid-template-columns:1fr auto;gap:60px;align-items:center}
@media(max-width:768px){.cta-in{grid-template-columns:1fr;gap:32px}}
.cta-t{font-family:var(--serif);font-size:clamp(1.4rem,2vw,1.875rem);font-weight:500;color:var(--paper);line-height:1.4}
.cta-d{font-size:.8rem;color:rgba(242,237,227,.45);margin-top:12px;line-height:1.85;max-width:480px}
.cta-btns{display:flex;gap:12px;flex-wrap:wrap;flex-shrink:0}
.btn-inv{border:1px solid rgba(242,237,227,.2);color:rgba(242,237,227,.65);font-size:.8rem;
  padding:12px 28px;letter-spacing:.06em;transition:all .2s}
.btn-inv:hover{border-color:rgba(242,237,227,.45);color:var(--paper)}

/* ── PROC ── */
.proc{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--rule);margin-top:56px}
@media(max-width:840px){.proc{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.proc{grid-template-columns:1fr}}
.proc-c{padding:36px 28px;border-right:1px solid var(--rule);transition:background .25s}
.proc-c:last-child{border-right:none}
.proc-c:hover{background:var(--paper2)}
.proc-n{font-size:.68rem;letter-spacing:.22em;color:var(--amber);margin-bottom:16px}
.proc-t{font-family:var(--serif);font-size:1rem;font-weight:500;color:var(--ink);margin-bottom:9px}
.proc-b{font-size:.8rem;color:var(--ink2);line-height:1.85}

/* ── TWO PANEL ── */
.tp{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--rule);margin-top:56px}
@media(max-width:640px){.tp{grid-template-columns:1fr}}
.tp-c{padding:40px 34px;border-right:1px solid var(--rule);transition:background .25s}
.tp-c:last-child{border-right:none}
.tp-c:hover{background:var(--paper3)}
.tp-l{font-size:.68rem;letter-spacing:.28em;color:var(--amber);text-transform:uppercase;margin-bottom:12px}
.tp-t{font-family:var(--serif);font-size:1.0625rem;font-weight:500;color:var(--ink);margin-bottom:11px}
.tp-b{font-size:.8rem;color:var(--ink2);line-height:1.9}

/* ── PAGE HERO ── */
.phero{padding:76px 0 60px;border-bottom:1px solid var(--rule);background:var(--paper2)}
.phero-ey{display:flex;align-items:center;gap:14px;margin-bottom:26px}
.phero-bar{width:26px;height:1px;background:var(--amber)}
.phero-label{font-size:.68rem;letter-spacing:.3em;color:var(--amber);text-transform:uppercase}
.phero-t{font-family:var(--serif);font-size:clamp(1.7rem,3vw,2.6rem);font-weight:500;color:var(--ink);line-height:1.28;margin-bottom:18px}
.phero-d{font-size:.875rem;color:var(--ink2);line-height:1.9;max-width:580px}

/* ── ABOUT ── */
.about-g{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--rule);margin-top:56px}
@media(max-width:840px){.about-g{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.about-g{grid-template-columns:1fr}}
.about-c{padding:36px 28px;border-right:1px solid var(--rule);transition:background .25s}
.about-c:last-child{border-right:none}
.about-c:hover{background:var(--paper3)}
.about-ico{width:26px;height:26px;border:1px solid var(--amber-line);display:flex;align-items:center;
  justify-content:center;margin-bottom:18px;font-family:var(--serif);font-size:.8rem;color:var(--amber)}
.about-t{font-family:var(--serif);font-size:1rem;font-weight:500;color:var(--ink);margin-bottom:9px}
.about-b{font-size:.8rem;color:var(--ink2);line-height:1.85}

/* ── CONTACT ── */
.con{display:grid;grid-template-columns:300px 1fr;border-top:1px solid var(--rule);margin-top:56px}
@media(max-width:900px){.con{grid-template-columns:1fr}}
.con-l{border-right:1px solid var(--rule);padding:44px 36px}
@media(max-width:900px){.con-l{border-right:none;border-bottom:1px solid var(--rule)}}
.con-r{padding:44px 48px;background:var(--paper2)}
@media(max-width:768px){.con-r{padding:36px 22px}}
.con-ib{margin-top:28px;padding-top:22px;border-top:1px solid var(--rule)}
.con-il{font-size:.62rem;letter-spacing:.24em;color:var(--amber);text-transform:uppercase;margin-bottom:7px}
.con-iv{font-size:.8rem;color:var(--ink2);line-height:1.85}
.fg{display:grid;grid-template-columns:1fr 1fr;gap:13px}
@media(max-width:580px){.fg{grid-template-columns:1fr}}
.fc{display:grid;gap:6px}
.fc-full{grid-column:1/-1}
.fc label{font-size:.62rem;letter-spacing:.2em;color:var(--ink3);text-transform:uppercase}
.fc input,.fc select,.fc textarea{
  background:var(--paper);border:1px solid var(--rule);
  color:var(--ink);font-family:var(--sans);font-size:.8rem;
  padding:11px 13px;outline:none;width:100%;transition:border-color .2s;
  -webkit-appearance:none;appearance:none}
.fc input:focus,.fc select:focus,.fc textarea:focus{border-color:var(--amber-line)}
.fc input::placeholder,.fc textarea::placeholder{color:var(--ink3)}
.fc select option{background:var(--paper)}
.fc textarea{resize:vertical;min-height:90px}
.fsub{width:100%;background:var(--ink);color:var(--paper);font-size:.875rem;
  letter-spacing:.1em;padding:14px;margin-top:4px;transition:background .2s,transform .15s}
.fsub:hover{background:var(--amber);transform:translateY(-1px)}
.fnote{font-size:.68rem;color:var(--ink3);margin-top:9px;line-height:1.7}

/* ── FOOTER ── */
.foot{border-top:1px solid var(--rule);background:var(--paper2)}
.foot-i{max-width:1340px;margin:0 auto;padding:0 52px;
  height:52px;display:flex;align-items:center;justify-content:space-between}
@media(max-width:768px){.foot-i{padding:16px 22px;height:auto;flex-direction:column;align-items:flex-start;gap:8px}}
.foot-l{display:flex;align-items:center;gap:22px}
.foot-brand{font-family:var(--serif);font-size:.875rem;color:var(--ink2)}
.foot-sep{width:1px;height:12px;background:var(--rule)}
.foot-en{font-size:.6rem;letter-spacing:.28em;color:var(--ink3);text-transform:uppercase}
.foot-r{font-size:.68rem;color:var(--ink3);letter-spacing:.06em}
`;

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════════════════ */
function R({ children, d = 0, className = '' }) {
  const [ref, on] = useReveal(0.08);
  return (
    <div ref={ref} className={`rv ${on ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${d}s` }}>
      {children}
    </div>
  );
}

function SH({ n, label, title, desc, inv = false }) {
  return (
    <R>
      <div className="sh">
        <div className="sh-n">{n}</div>
        <div className="sh-b">
          <div className="sh-label">{label}</div>
          <div className={`sh-title ${inv ? 'sh-title-inv' : ''}`}>{title}</div>
          {desc && <div className={`sh-desc ${inv ? 'sh-desc-inv' : ''}`}>{desc}</div>}
        </div>
      </div>
    </R>
  );
}

function PhHero({ eyebrow, title, desc }) {
  return (
    <div className="phero">
      <div className="W">
        <div className="phero-ey"><div className="phero-bar" /><span className="phero-label">{eyebrow}</span></div>
        <div className="phero-t">{title}</div>
        {desc && <div className="phero-d">{desc}</div>}
      </div>
    </div>
  );
}

function CTABand({ nav }) {
  return (
    <div className="cta">
      <div className="W">
        <R>
          <div className="cta-in">
            <div>
              <div className="cta-t">把合作需求说清楚，比先谈空概念更有效</div>
              <div className="cta-d">无论供货合作、选品支持、产品升级还是定制贴牌，都可以先从门店类型和当前问题开始沟通。</div>
            </div>
            <div className="cta-btns">
              <button className="btn-dk" onClick={() => nav('contact')}>咨询合作</button>
              <button className="btn-inv" onClick={() => nav('products')}>查看产品</button>
            </div>
          </div>
        </R>
      </div>
    </div>
  );
}

function NavBar({ cur, nav }) {
  const [mob, setMob] = useState(false);
  return (
    <nav className="nav">
      <div className="nav-i">
        <button className="nav-brand" onClick={() => nav('home')}>
          <span className="nav-en">HAODAGEN FOOD</span>
          <span className="nav-cn">豪大根</span>
        </button>
        <div className="nav-links">
          {NAV.filter(x => x.key !== 'contact').map(x => (
            <button key={x.key} className={`nav-a ${cur === x.key ? 'on' : ''}`} onClick={() => nav(x.key)}>{x.label}</button>
          ))}
          <button className="nav-cta" onClick={() => nav('contact')}>咨询合作</button>
        </div>
        <button className="nav-ham" onClick={() => setMob(v => !v)}>{mob ? '✕' : '≡'}</button>
      </div>
      {mob && (
        <div className="mob">
          <div className="mob-i">
            {NAV.map(x => (
              <button key={x.key} className={`mob-a ${cur === x.key ? 'on' : ''}`}
                onClick={() => { nav(x.key); setMob(false); }}>{x.label}</button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer({ cur }) {
  const label = NAV.find(x => x.key === cur)?.label ?? '首页';
  return (
    <footer className="foot">
      <div className="foot-i">
        <div className="foot-l">
          <span className="foot-brand">豪大根</span>
          <div className="foot-sep" />
          <span className="foot-en">JIANGSU HAODAGEN FOOD CO., LTD.</span>
        </div>
        <span className="foot-r">当前：{label} · © 2025</span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGES
═══════════════════════════════════════════════════════════════ */
function HomePage({ nav }) {
  return (
    <>
      <section className="hero">
        <div className="hero-deco">根</div>
        <div className="hero-body">
          <div className="hero-rail">
            <span className="hero-rail-txt">HAODAGEN · FOOD SUPPLY · 2025</span>
          </div>
          <div className="hero-main">
            <div className="hero-eyebrow">
              <div className="hero-eyebrow-bar" />
              <span className="hero-eyebrow-txt">餐饮食材选品参谋 · 江苏豪大根食品有限公司</span>
            </div>
            <div className="hero-h">
              <div className="hero-h1">为餐饮门店提供</div>
              <div className="hero-h2">更匹配的产品方案</div>
            </div>
            <div className="hero-desc">
              围绕门店定位、客群和经营需求，提供选品策略、产品供应与定制贴牌服务——帮助客户更高效上新、稳定供货，实现降本增效。
            </div>
            <div className="hero-ctas">
              <button className="btn-dk" onClick={() => nav('contact')}>咨询合作</button>
              <button className="btn-out" onClick={() => nav('products')}>查看产品分类</button>
            </div>
          </div>
        </div>
        <div className="hero-foot">
          <div className="hero-foot-corner" />
          {[['懂门店','围绕门店定位与经营需求做产品匹配'],['懂产品','多系列产品支撑上新与日常经营'],['懂合作','支持供货、贴牌与更长期协同合作']].map(([v,l]) => (
            <div className="hero-stat" key={v}>
              <div className="hero-stat-v">{v}</div>
              <div className="hero-stat-l">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="W">
          <SH n="01" label="Services" title="我们提供哪些服务"
            desc="不只是供货，而是从选品、供应到贴牌与效率协同，围绕门店经营需求给出更完整的支持。" />
          <R d={0.08}>
            <div className="svc-grid">
              {SERVICES.map(s => (
                <div className="svc" key={s.n}>
                  <div className="svc-n">{s.n}</div>
                  <div className="svc-t">{s.title}</div>
                  <div className="svc-b">{s.body}</div>
                </div>
              ))}
            </div>
          </R>
        </div>
      </section>

      <section className="sec sec-shade">
        <div className="W">
          <SH n="02" label="Products" title="我们的产品体系"
            desc="围绕烧烤夜市、西式、日式、台式、特色餐饮与火锅茶餐厅等场景，形成较完整的产品供应能力。" />
          <R d={0.08}>
            <div className="prd-wrap">
              <div className="prd-side">
                <div>
                  <div className="prd-side-t">六大产品系列</div>
                  <div className="prd-side-b" style={{ marginTop:14 }}>
                    产品方向覆盖烧烤夜市小吃、西式餐饮、日式餐饮、高端台式、特色餐饮和火锅茶餐厅六大场景，可根据门店类型和经营需求进行匹配。
                  </div>
                </div>
                <button className="btn-out" style={{ alignSelf:'flex-start' }} onClick={() => nav('products')}>查看完整产品</button>
              </div>
              <div className="prd-list">
                {PRODUCTS.map(p => (
                  <div className="prd-item" key={p.title}>
                    <div className="prd-note">{p.note}</div>
                    <div className="prd-t">{p.title}</div>
                    <div className="prd-tags">{p.tags.map(t => <span className="prd-tag" key={t}>{t}</span>)}</div>
                  </div>
                ))}
              </div>
            </div>
          </R>
        </div>
      </section>

      <section className="sec sec-dark">
        <div className="W">
          <R>
            <div className="val-grid">
              <div className="val-l">
                <div className="val-label">Efficiency</div>
                <div className="val-t">我们如何帮助门店降本增效</div>
                <div className="val-d">豪大根不只是提供产品，更重视客户在经营中的实际效率，从产品选择到供货协同，给出更匹配的建议。</div>
              </div>
              <div className="val-r">
                <div className="val-list">
                  {['减少盲目上新和无效采购造成的试错成本','优化产品组合，让产品结构更适配门店经营','提升新品测试与落地效率，缩短上新周期','增强供货协同，降低经营中的不确定性','通过定制贴牌支持门店建立差异化产品能力','让产品选择更贴合客群、场景和门店定位'].map(v => (
                    <div className="val-row" key={v}>
                      <div className="val-dot" />
                      <div className="val-txt">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </R>
        </div>
      </section>

      <section className="sec">
        <div className="W">
          <SH n="03" label="Customers" title="我们服务哪些客户"
            desc="主要服务有供货、上新、产品优化和品牌定制需求的餐饮门店客户。" />
          <R d={0.08}>
            <div className="chips">
              {['烧烤店 / 烤肉店','西式简餐店','烘焙 / 轻食门店','日式餐饮门店','夜市 / 小吃类门店','连锁餐饮品牌','有定制贴牌需求的品牌客户','希望优化产品结构与采购效率的门店'].map(c => (
                <div className="chip" key={c}>{c}</div>
              ))}
            </div>
          </R>
        </div>
      </section>

      <section className="sec sec-shade">
        <div className="W">
          <SH n="04" label="Cases" title="合作案例"
            desc="从实际合作中沉淀出来的案例，比宣传词更直接说明我们能做什么。" />
          <R d={0.08}>
            <div className="case-list">
              {CASES.map((c, i) => (
                <div className="case-row" key={c.client}>
                  <div className="case-n">0{i+1}</div>
                  <div className="case-c">
                    <div className="case-tag">{c.tag}</div>
                    <div className="case-client">{c.client}</div>
                  </div>
                  <div className="case-c">
                    <div className="case-cl">原来问题</div>
                    <div className="case-cv">{c.issue}</div>
                  </div>
                  <div className="case-c">
                    <div className="case-cl">合作方式</div>
                    <div className="case-cv">{c.how}</div>
                  </div>
                  <div className="case-c">
                    <div className="case-cl">结果方向</div>
                    <div className="case-cv">{c.out}</div>
                  </div>
                </div>
              ))}
            </div>
          </R>
        </div>
      </section>

      <section className="sec">
        <div className="W">
          <SH n="05" label="FAQ" title="常见问题"
            desc="先把客户最常问的问题讲清楚，比堆很多宣传词更有效。" />
          <R d={0.08}>
            <div className="faq-list">
              {FAQ.map(f => (
                <div className="faq-item" key={f.q}>
                  <div className="faq-q">{f.q}</div>
                  <div className="faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </R>
        </div>
      </section>

      <CTABand nav={nav} />
    </>
  );
}

function ProductsPage({ nav }) {
  return (
    <>
      <PhHero eyebrow="Product System" title="产品分类与应用场景"
        desc="把产品分类、适配场景和合作方向讲清楚，让客户更容易理解我们不只是卖货，而是懂门店经营的供货方。" />
      <section className="sec">
        <div className="W">
          <SH n="01" label="Overview" title="产品体系概览"
            desc="围绕烧烤夜市小吃、西式、日式、高端台式、特色餐饮、火锅茶餐厅等方向，形成完整的餐饮应用型产品体系。" />
          <R d={0.08}>
            <div className="prd-list" style={{ borderTop:'1px solid var(--rule)' }}>
              {PRODUCTS.map(p => (
                <div className="prd-item" key={p.title}>
                  <div className="prd-note">{p.note}</div>
                  <div className="prd-t">{p.title}</div>
                  <div className="prd-tags">{p.tags.map(t => <span className="prd-tag" key={t}>{t}</span>)}</div>
                </div>
              ))}
            </div>
          </R>
        </div>
      </section>
      <section className="sec sec-shade">
        <div className="W">
          <SH n="02" label="How to choose" title="客户为什么需要选品参谋"
            desc="产品多不等于好卖，选择不等于适合。真正有效的是产品与门店定位、客群、动销节奏和经营目标相匹配。" />
          <R d={0.08}>
            <div className="proc">
              {['先看门店场景，而不是只看单个产品热度','先看产品组合，再决定新品测试方向','先看经营效率，再决定拿货和上新节奏','先看长期合作方式，再考虑定制和贴牌延展'].map((t,i) => (
                <div className="proc-c" key={t}>
                  <div className="proc-n">0{i+1}</div>
                  <div className="proc-b">{t}</div>
                </div>
              ))}
            </div>
          </R>
        </div>
      </section>
      <CTABand nav={nav} />
    </>
  );
}

function PrivateLabelPage({ nav }) {
  return (
    <>
      <PhHero eyebrow="Private Label" title="定制贴牌合作"
        desc="当客户希望做差异化产品、强化品牌辨识度或推进更深合作时，定制贴牌就是更合适的方向。" />
      <section className="sec">
        <div className="W">
          <SH n="01" label="For who" title="哪些客户适合做定制贴牌"
            desc="对有品牌意识、产品升级诉求和长期合作计划的客户，贴牌合作有更强的价值。" />
          <R d={0.08}>
            <div className="proc">
              {['希望做差异化产品的餐饮品牌','希望强化品牌辨识度的连锁门店','希望从单次拿货转为深度合作的客户','希望形成专属产品结构的门店'].map((t,i) => (
                <div className="proc-c" key={t}>
                  <div className="proc-n">0{i+1}</div>
                  <div className="proc-b">{t}</div>
                </div>
              ))}
            </div>
          </R>
        </div>
      </section>
      <section className="sec sec-shade">
        <div className="W">
          <SH n="02" label="Process" title="合作流程怎么走"
            desc="先明确方向，再匹配产品与合作方式，比一上来讨论包装和细节更有效。" />
          <R d={0.08}>
            <div className="proc">
              {[['需求沟通','明确门店定位、客群、产品方向和合作目标。'],['产品匹配','围绕门店经营需求和品牌方向匹配合适产品。'],['合作确认','确认合作模式、产品方向与推进节奏。'],['落地执行','推进贴牌合作、产品上线和后续协同支持。']].map(([t,d],i) => (
                <div className="proc-c" key={t}>
                  <div className="proc-n">0{i+1}</div>
                  <div className="proc-t">{t}</div>
                  <div className="proc-b">{d}</div>
                </div>
              ))}
            </div>
          </R>
        </div>
      </section>
      <section className="sec">
        <div className="W">
          <R>
            <div className="tp">
              <div className="tp-c"><div className="tp-l">Before</div><div className="tp-t">做贴牌前要先想清楚什么</div><div className="tp-b">先明确你是想提升品牌感、做差异化菜单、强化复购，还是希望形成长期供应体系。方向不同，合作方式就不同。</div></div>
              <div className="tp-c"><div className="tp-l">Support</div><div className="tp-t">豪大根能提供什么支持</div><div className="tp-b">围绕产品方向沟通、产品匹配、合作推进和长期协同，帮助客户把定制贴牌做得更贴合实际经营需求。</div></div>
            </div>
          </R>
        </div>
      </section>
      <CTABand nav={nav} />
    </>
  );
}

function CasesPage({ nav }) {
  return (
    <>
      <PhHero eyebrow="Cases" title="合作案例与合作方式"
        desc="先把客户类型、问题、合作方式和结果方向写清楚，就已经比只有一句「合作过很多客户」强很多。" />
      <section className="sec">
        <div className="W">
          <SH n="01" label="Highlights" title="案例摘要"
            desc="后续可继续补充更具体的数据、门店背景和产品方向，逐步沉淀成更完整的案例库。" />
          <R d={0.08}>
            <div className="case-list">
              {CASES.map((c,i) => (
                <div className="case-row" key={c.client}>
                  <div className="case-n">0{i+1}</div>
                  <div className="case-c"><div className="case-tag">{c.tag}</div><div className="case-client">{c.client}</div></div>
                  <div className="case-c"><div className="case-cl">原来问题</div><div className="case-cv">{c.issue}</div></div>
                  <div className="case-c"><div className="case-cl">合作方式</div><div className="case-cv">{c.how}</div></div>
                  <div className="case-c"><div className="case-cl">结果方向</div><div className="case-cv">{c.out}</div></div>
                </div>
              ))}
            </div>
          </R>
        </div>
      </section>
      <CTABand nav={nav} />
    </>
  );
}

function AboutPage({ nav }) {
  return (
    <>
      <PhHero eyebrow="About" title="关于豪大根"
        desc="让客户和 AI 都能快速知道：豪大根是谁、做什么、适合服务谁、为什么值得合作。" />
      <section className="sec">
        <div className="W">
          <SH n="01" label="Brand Positioning" title="品牌定位" />
          <R d={0.08}>
            <div style={{ borderTop:'1px solid var(--rule)',display:'grid',gridTemplateColumns:'1fr 1fr' }}>
              <div style={{ padding:'40px 40px 40px 0',borderRight:'1px solid var(--rule)' }}>
                <div style={{ fontSize:'.68rem',letterSpacing:'.28em',textTransform:'uppercase',color:'var(--amber)',marginBottom:12 }}>定位</div>
                <div style={{ fontSize:'.875rem',lineHeight:1.9,color:'var(--ink2)' }}>江苏豪大根食品有限公司，面向餐饮门店客户提供选品策略、产品供应与定制贴牌服务，围绕多种餐饮经营场景形成完整的产品供应能力。</div>
              </div>
              <div style={{ padding:'40px 0 40px 40px' }}>
                <div style={{ fontSize:'.68rem',letterSpacing:'.28em',textTransform:'uppercase',color:'var(--amber)',marginBottom:12 }}>价值主张</div>
                <div style={{ fontSize:'.875rem',lineHeight:1.9,color:'var(--ink2)' }}>不只是供货，更希望通过更匹配的产品方案、更合理的产品结构和更顺畅的合作方式，帮助客户高效上新、稳定经营，实现降本增效。</div>
              </div>
            </div>
          </R>
        </div>
      </section>
      <section className="sec sec-shade">
        <div className="W">
          <SH n="02" label="Why us" title="豪大根的合作价值"
            desc="不是单一卖货，而是围绕门店经营需求提供更完整支持。" />
          <R d={0.08}>
            <div className="about-g">
              {[['产','产品体系明确','产品方向清晰，适配多种餐饮场景。'],['场','场景理解更强','更关注门店定位、菜单结构和经营需求。'],['合','支持深度合作','不仅有供货，也支持定制贴牌方向。'],['伙','合作导向明确','希望与客户做更长期、更稳定的协同合作。']].map(([i,t,d]) => (
                <div className="about-c" key={t}>
                  <div className="about-ico">{i}</div>
                  <div className="about-t">{t}</div>
                  <div className="about-b">{d}</div>
                </div>
              ))}
            </div>
          </R>
        </div>
      </section>
      <CTABand nav={nav} />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PhHero eyebrow="Contact" title="咨询合作"
        desc="把客户最关心的信息先收集起来，后续更方便匹配产品方案、供货方式和贴牌合作方向。" />
      <section className="sec">
        <div className="W">
          <SH n="01" label="Cooperation" title="获取适合你门店的产品方案" />
          <R d={0.08}>
            <div className="con">
              <div className="con-l">
                <div style={{ fontSize:'.875rem',lineHeight:1.9,color:'var(--ink2)' }}>如果你正在寻找更适合门店的产品方案，或希望在选品、供货、定制贴牌上获得支持，欢迎和我们沟通合作。</div>
                {[['适合场景','供货合作、选品支持、产品升级与品牌定制，烧烤、西式、烘焙、日式等多种餐饮门店。'],['合作咨询','可先做需求沟通，再匹配产品与合作方式，不预设合作门槛。'],['联系方式','电话 / 微信 / 商务联系方式（可在此处填写）']].map(([l,v]) => (
                  <div className="con-ib" key={l}><div className="con-il">{l}</div><div className="con-iv">{v}</div></div>
                ))}
              </div>
              <div className="con-r">
                <div className="fg">
                  {[['联系人','请输入姓名'],['联系方式','微信 / 手机号'],['门店名称','请输入门店名称'],['所在城市','例如：上海'],['门店类型','例如：烧烤 / 西式 / 烘焙'],['当前需求','例如：供货 / 上新 / 贴牌']].map(([l,p]) => (
                    <div className="fc" key={l}><label>{l}</label><input placeholder={p} /></div>
                  ))}
                  {[['合作方向',['选品建议','产品供应','定制贴牌','综合合作']],['是否已有稳定供货',['有','没有','部分有']],['是否有贴牌需求',['有','没有','后续考虑']]].map(([l,opts]) => (
                    <div className="fc" key={l}><label>{l}</label><select><option value="">请选择</option>{opts.map(o => <option key={o}>{o}</option>)}</select></div>
                  ))}
                  <div className="fc fc-full"><label>补充说明</label><textarea placeholder="例如：希望找适合门店定位的产品方案，或者希望做差异化定制合作" rows={4} /></div>
                  <div className="fc-full">
                    <button type="button" className="fsub">提交合作需求</button>
                    <div className="fnote">提交后可用于产品方案沟通、供货合作评估和定制贴牌需求对接。</div>
                  </div>
                </div>
              </div>
            </div>
          </R>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState('home');
  const nav = (key) => { setPage(key); window.scrollTo({ top:0, behavior:'smooth' }); window.location.hash = key; };
  useEffect(() => {
    const h = window.location.hash.replace('#','');
    if (NAV.some(x => x.key === h)) setPage(h);
  }, []);
  return (
    <>
      <style>{CSS}</style>
      <div className="shell">
        <NavBar cur={page} nav={nav} />
        <main>
          {page==='home'         && <HomePage nav={nav} />}
          {page==='products'     && <ProductsPage nav={nav} />}
          {page==='privateLabel' && <PrivateLabelPage nav={nav} />}
          {page==='cases'        && <CasesPage nav={nav} />}
          {page==='about'        && <AboutPage nav={nav} />}
          {page==='contact'      && <ContactPage />}
        </main>
        <Footer cur={page} />
      </div>
    </>
  );
}
