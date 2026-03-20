'use client';
import { useEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════  DATA  */
const NAV = [
  { key:'home',         label:'首页'     },
  { key:'products',     label:'产品'     },
  { key:'privateLabel', label:'定制贴牌' },
  { key:'cases',        label:'合作案例' },
  { key:'news',         label:'行业资讯' },
  { key:'about',        label:'关于我们' },
  { key:'contact',      label:'咨询合作' },
];

const SERVICES = [
  { n:'01', title:'选品策略', body:'结合门店定位、客群和经营场景，给出更适合上新、动销和产品结构的匹配建议。' },
  { n:'02', title:'产品供应', body:'围绕餐饮门店日常经营和上新需求，提供稳定、持续、可匹配的产品供应支持。' },
  { n:'03', title:'定制贴牌', body:'支持客户根据品牌方向和产品定位推进定制贴牌合作，形成差异化产品能力。' },
  { n:'04', title:'降本增效', body:'通过优化产品结构、减少试错成本、提升上新效率和供货协同，帮助门店提升经营效率。' },
];
const PRODUCTS = [
  { title:'烧烤夜市小吃', tags:['火山石烤肠','鸡翅包饭','韩式风干肠'],              note:'烧烤 · 夜市 · 外带'       },
  { title:'西式餐饮食材', tags:['德式罗勒烤香肠','德式黑椒烤肠','德式盘肠','奥尔良风味烤肠'], note:'西式简餐 · 轻食'   },
  { title:'日式餐饮食材', tags:['日式小红肠','日式炸付香肠','海藻墨鱼肠'],          note:'日式门店 · 清爽场景'     },
  { title:'高端台式食材', tags:['台式原味香肠','台式黑胡椒香肠','台式玉米香肠','台式飞鱼卵香肠'], note:'差异化 · 高端定位' },
  { title:'特色餐饮食材', tags:['葡香肉肠','老长沙大香肠','深海鳕鱼肠','深海墨鱼汁香肠'], note:'特色经营 · 爆品测试' },
  { title:'火锅茶餐厅',   tags:['墨鱼丸子','无实小腊肠','鱼籽福袋'],                note:'火锅 · 茶餐厅 · 复合场景' },
];
const CASES = [
  { tag:'供货+选品支持', client:'某烧烤门店',   issue:'产品选择分散，上新效率不高，产品结构缺乏重点。',    how:'围绕门店需求匹配产品方向，持续提供产品供应与选品支持。',   out:'产品结构更清晰，上新效率更高，合作节奏也更稳定。' },
  { tag:'场景匹配',     client:'某西式餐饮门店', issue:'希望产品更稳定，更符合门店整体风格与菜单体系。',   how:'结合门店场景匹配产品方向，持续优化产品组合并稳定供货。', out:'供应更稳定，产品更贴合门店定位，菜单搭配也更顺畅。'  },
  { tag:'定制贴牌',     client:'某品牌客户',     issue:'希望打造更有品牌辨识度的产品合作方式。',           how:'基于品牌方向推进定制贴牌合作，围绕产品呈现和长期合作展开支持。', out:'增强差异化产品能力，提升合作深度与品牌延展性。' },
];
const FAQ = [
  { q:'豪大根主要是卖货，还是做选品服务？', a:'以产品供应为核心，但不只停留在供货，更会结合门店类型、客群和经营需求提供选品支持。' },
  { q:'你们适合哪类门店合作？',             a:'适合有供货、上新、产品优化和品牌定制需求的餐饮门店，也适合希望做长期协同合作的品牌客户。' },
  { q:'定制贴牌适合什么样的客户？',          a:'适合希望做差异化产品、强化品牌辨识度，或希望推进长期合作的门店和品牌。' },
  { q:'降本增效具体体现在哪？',              a:'主要体现在减少试错、优化产品结构、提高上新效率、增强供货协同和降低无效采购。' },
];

const INITIAL_ARTICLES = [
  {
    id:1, cat:'行业洞察', title:'2024年餐饮连锁化率持续提升，供应链协同成核心竞争力',
    summary:'近年来餐饮行业连锁化率快速攀升，品牌化运营对背后供应链体系提出了更高要求。标准化产品供应、稳定的质量一致性以及快速响应的协同能力，正成为餐饮品牌核心竞争壁垒的重要组成部分。',
    body:`餐饮行业正在经历一场深刻的结构性变革。数据显示，国内餐饮连锁化率在过去五年间从不足15%攀升至超过21%，这一趋势在一二线城市尤为明显。

**供应链标准化是连锁扩张的基础**

对于快速扩张的餐饮连锁品牌而言，门店标准化的核心不仅在于装修、服务流程，更在于产品本身的稳定性。单一门店可以依靠厨师手艺支撑产品口感，但一旦扩张到50家、100家乃至更多，对供应链的标准化能力要求便急剧提升。

**产品结构决定供货效率**

很多门店在初期扩张时往往面临同一个问题：SKU过多，供货来源分散，导致库存管理复杂、成本攀升、损耗率高。精简产品结构，选择与门店定位高度匹配的核心品类，是供应链协同效率的前提。

**选品参谋的价值正在显现**

在这一背景下，"选品参谋"式的供货方不再只是提供产品，而是帮助门店在产品策略层面做出更合理的规划，真正实现降本增效。`,
    author:'豪大根编辑部', date:'2025-03-15', readTime:'4分钟'
  },
  {
    id:2, cat:'产品动态', title:'春季上新指南：烧烤旺季来临前，这几类产品值得提前备货',
    summary:'每年三四月是烧烤类餐饮门店的关键备货节点。提前锁定动销稳定的爆品品类、优化产品组合结构，往往能在旺季开局阶段占得先机。本文梳理了几类值得关注的春季上新方向。',
    body:`烧烤旺季从每年三月末开始逐渐升温，到五月进入第一个高峰。对于烧烤类门店、夜市档口和小吃业态而言，提前做好产品储备和菜单优化，往往比旺季到来后临时调整更有效率。

**爆品逻辑：高频复购 + 易出品 + 接受度广**

春季上新的核心不是追求"新奇"，而是寻找在当前消费环境中真正能动销的产品。高频复购、出品操作简单、大众接受度高，是判断一款产品能否成为旺季支柱的基本标准。

**几个值得关注的品类方向**

火山石烤肠系列因其独特口感和高识别度，近两年在烧烤场景中持续表现强劲。韩式风味类产品在年轻消费群体中具有较高接受度，适合作为菜单亮点品类。台式系列因风味层次丰富，在定位偏中高端的门店中具有较好的差异化价值。

**提前备货的时机判断**

建议在旺季启动前4-6周完成主力产品的选品确认和首批备货，留出足够的测试上新时间，避免旺季压力下的仓促决策。`,
    author:'豪大根选品团队', date:'2025-03-08', readTime:'3分钟'
  },
  {
    id:3, cat:'合作案例', title:'从单品到体系：一家西式简餐门店的产品结构优化路径',
    summary:'本文记录了一家定位精致西式简餐的门店，如何通过系统性调整产品结构，从"产品散乱、上新频繁但动销不稳"的状态，逐步建立起清晰的核心产品体系，最终实现采购效率和经营稳定性的双重提升。',
    body:`这家门店开业于2023年初，主打精致西式简餐，客单价在60-80元区间。开业初期，门店尝试了大量不同风格的西式食材，菜单更新频繁，但实际动销稳定的产品寥寥无几。

**问题的根源：产品太多，方向太散**

大量试错带来了两个直接问题：一是库存压力大，部分食材因动销不佳而产生损耗；二是厨房操作复杂度高，出品效率受到影响。更深层的问题是，门店的产品结构没有形成清晰的风格主线，顾客对菜单的记忆点也较为模糊。

**第一步：锁定门店核心场景和客群**

在开始调整产品结构之前，我们首先和门店深入沟通了几个核心问题：主要消费时段和客群构成、复购率最高的几类菜品、以及门店希望在顾客心中建立的产品印象。

**第二步：精简SKU，建立产品主线**

基于对门店定位的深入了解，我们建议将西式食材的核心锁定在德式香肠系列和奥尔良风味两条主线上，前者承担品质感和差异化，后者承担大众接受度和复购。

**结果**

经过约3个月的调整，门店核心产品的动销稳定性明显提升，采购集中度提高，整体库存压力降低，厨房出品效率也得到改善。`,
    author:'豪大根客户服务', date:'2025-02-20', readTime:'5分钟'
  },
  {
    id:4, cat:'行业洞察', title:'定制贴牌不只是印个LOGO，真正有价值的是什么',
    summary:'很多门店对"定制贴牌"的理解停留在"把别人的产品换个包装"。实际上，有价值的贴牌合作远不止于此，它是门店构建差异化产品能力、强化品牌记忆点的重要路径。',
    body:`在与客户沟通定制贴牌合作时，我们发现一个普遍现象：不少门店对贴牌的第一反应是"就是换个包装吧"，并对其价值持保留态度。这种理解并不完整。

**贴牌的核心价值不是包装，是产品归属感**

当一款产品上印着你门店自己的品牌名称时，它对顾客传递的信号是：这是这家店专属的东西，在别处买不到。这种归属感和排他性，本身就是一种竞争壁垒。

**差异化不是靠价格，而是靠产品记忆点**

在同质化竞争激烈的餐饮市场，价格战是一条越走越窄的路。真正能建立顾客认知和复购动力的，是那些让人印象深刻、有独特风味或呈现方式的产品。定制化合作正是建立这种记忆点的有效工具。

**什么时候适合考虑做贴牌**

不是所有门店、所有阶段都适合推进贴牌合作。一般而言，当门店已经形成稳定的核心客群、有清晰的品牌方向、并且希望在产品层面形成更强的品牌延伸时，贴牌合作的时机就相对成熟了。`,
    author:'豪大根品牌合作部', date:'2025-02-05', readTime:'4分钟'
  },
];

/* ═══════════════════════════════════════════════════════════════  HOOK  */
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

/* ═══════════════════════════════════════════════════════════════  CSS  */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --paper:  #D6C9AF;
  --paper2: #C9BAA0;
  --paper3: #BBAA8C;
  --paper4: #EDE4D2;
  --ink:    #16120C;
  --ink2:   #4A4035;
  --ink3:   #857565;
  --amber:  #7A4D10;
  --amber2: #A36820;
  --amber-pale: rgba(122,77,16,0.10);
  --amber-line: rgba(122,77,16,0.30);
  --rule:   rgba(22,18,12,0.18);
  --rule-lt:rgba(22,18,12,0.09);
  --serif:'Noto Serif SC','Songti SC',Georgia,serif;
  --sans:'Noto Sans SC','PingFang SC',sans-serif;
  --ease:cubic-bezier(0.16,1,0.3,1);
}
html{scroll-behavior:smooth}
body{background:var(--paper);color:var(--ink);font-family:var(--sans);-webkit-font-smoothing:antialiased}
button{cursor:pointer;border:none;background:none;font-family:inherit;color:inherit}

.W{max-width:1340px;margin:0 auto;padding:0 52px}
@media(max-width:768px){.W{padding:0 20px}}
.shell{padding-top:60px}

/* reveal */
.rv{opacity:0;transform:translateY(18px);transition:opacity .72s ease,transform .72s ease}
.rv.in{opacity:1;transform:none}
.rv-d1{transition-delay:.07s}.rv-d2{transition-delay:.14s}
.rv-d3{transition-delay:.21s}.rv-d4{transition-delay:.28s}

/* ── NAV ── */
.nav{position:fixed;top:0;left:0;right:0;z-index:200;
  background:rgba(214,201,175,0.95);backdrop-filter:blur(20px) saturate(1.6);
  border-bottom:1px solid var(--rule)}
.nav-i{max-width:1340px;margin:0 auto;padding:0 52px;
  height:60px;display:flex;align-items:center;justify-content:space-between}
@media(max-width:768px){.nav-i{padding:0 20px}}
.nav-brand{display:flex;flex-direction:column;gap:2px;line-height:1}
.nav-en{font-size:.56rem;letter-spacing:.36em;color:var(--amber);text-transform:uppercase}
.nav-cn{font-family:var(--serif);font-size:.9375rem;font-weight:500;color:var(--ink)}
.nav-links{display:flex;align-items:center;gap:26px}
@media(max-width:980px){.nav-links{display:none}}
.nav-a{font-size:.78rem;color:var(--ink2);transition:color .2s;letter-spacing:.04em}
.nav-a:hover,.nav-a.on{color:var(--ink)}
.nav-a.on{border-bottom:1px solid var(--amber);padding-bottom:1px}
.nav-cta{font-size:.78rem;background:var(--ink);color:var(--paper4);
  padding:8px 20px;letter-spacing:.08em;transition:background .2s,transform .15s}
.nav-cta:hover{background:var(--amber);transform:translateY(-1px)}
.nav-ham{display:none;width:36px;height:36px;align-items:center;justify-content:center;
  border:1px solid var(--rule);color:var(--ink);font-size:18px}
@media(max-width:980px){.nav-ham{display:flex}}
.mob{background:var(--paper2);border-bottom:1px solid var(--rule)}
.mob-i{padding:10px 20px 16px;display:grid;gap:2px}
.mob-a{font-size:.9rem;color:var(--ink2);padding:11px 14px;text-align:left;
  border-left:2px solid transparent;transition:all .2s}
.mob-a:hover,.mob-a.on{color:var(--ink);border-left-color:var(--amber);background:var(--paper3)}

/* ── HERO ── */
.hero{min-height:calc(100svh - 60px);display:flex;flex-direction:column;
  border-bottom:1px solid var(--rule);position:relative;overflow:hidden;
  background:var(--paper)}
.hero-deco{position:absolute;right:-30px;bottom:-40px;
  font-family:var(--serif);font-size:clamp(260px,35vw,480px);font-weight:700;
  color:rgba(22,18,12,0.05);pointer-events:none;user-select:none;line-height:1;
  animation:decoIn 1.2s ease .8s both}
@keyframes decoIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
.hero-body{flex:1;display:grid;grid-template-columns:52px 1fr}
@media(max-width:900px){.hero-body{grid-template-columns:1fr}}
.hero-rail{border-right:1px solid var(--rule);display:flex;
  flex-direction:column;align-items:center;padding:52px 0}
@media(max-width:900px){.hero-rail{display:none}}
.hero-rail-txt{writing-mode:vertical-rl;font-size:.55rem;letter-spacing:.32em;
  color:var(--ink3);text-transform:uppercase}
.hero-main{padding:72px 80px 64px 56px;display:flex;flex-direction:column;justify-content:center}
@media(max-width:900px){.hero-main{padding:52px 20px 48px}}
.hero-ey{display:flex;align-items:center;gap:14px;margin-bottom:40px;
  animation:hFade .6s ease .1s both}
.hero-ey-bar{width:26px;height:1px;background:var(--amber);flex-shrink:0}
.hero-ey-txt{font-size:.65rem;letter-spacing:.3em;color:var(--amber);text-transform:uppercase}
.hero-h1{font-family:var(--serif);font-size:clamp(2.2rem,3.8vw,3.25rem);font-weight:600;
  line-height:1.22;color:var(--ink);margin-bottom:0;
  animation:hUp 1s var(--ease) .25s both}
.hero-h2{font-family:var(--serif);font-size:clamp(2.2rem,3.8vw,3.25rem);font-weight:600;
  line-height:1.22;color:var(--amber2);margin-bottom:34px;
  animation:hUp 1s var(--ease) .4s both}
.hero-sub{max-width:520px;font-size:.875rem;line-height:1.95;color:var(--ink2);
  border-left:2px solid var(--amber);padding-left:18px;margin-bottom:48px;
  animation:hFade .9s ease .62s both}
.hero-ctas{display:flex;gap:14px;flex-wrap:wrap;animation:hFade .8s ease .78s both}
.btn-dk{background:var(--ink);color:var(--paper4);font-size:.78rem;letter-spacing:.1em;
  padding:13px 34px;transition:background .2s,transform .15s}
.btn-dk:hover{background:var(--amber);transform:translateY(-1px)}
.btn-out{border:1px solid var(--rule);color:var(--ink2);font-size:.78rem;letter-spacing:.08em;
  padding:12px 28px;transition:all .2s}
.btn-out:hover{border-color:var(--amber-line);color:var(--ink)}
.hero-foot{border-top:1px solid var(--rule);display:grid;
  grid-template-columns:52px 1fr 1fr 1fr;
  animation:hFade .8s ease .96s both;background:var(--paper2)}
@media(max-width:900px){.hero-foot{grid-template-columns:1fr 1fr}}
@media(max-width:440px){.hero-foot{grid-template-columns:1fr}}
.hero-foot-corner{border-right:1px solid var(--rule)}
@media(max-width:900px){.hero-foot-corner{display:none}}
.hero-stat{padding:26px 30px;border-right:1px solid var(--rule);transition:background .22s}
.hero-stat:last-child{border-right:none}
.hero-stat:hover{background:var(--paper3)}
.hero-stat-v{font-family:var(--serif);font-size:1.075rem;color:var(--amber);
  font-weight:500;margin-bottom:5px}
.hero-stat-l{font-size:.7rem;color:var(--ink3);line-height:1.65;letter-spacing:.02em}

@keyframes hUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
@keyframes hFade{from{opacity:0}to{opacity:1}}

/* ── SECTION ── */
.sec{padding:92px 0}
@media(max-width:768px){.sec{padding:58px 0}}
.sec-shade{background:var(--paper2)}
.sec-mid{background:var(--paper3)}
.sec-dark{background:var(--ink);color:var(--paper4)}

/* section head */
.sh{display:grid;grid-template-columns:52px 1fr;margin-bottom:56px}
@media(max-width:640px){.sh{grid-template-columns:1fr}}
.sh-n{padding-top:3px;font-family:var(--serif);font-size:.7rem;letter-spacing:.16em;color:var(--ink3)}
@media(max-width:640px){.sh-n{display:none}}
.sh-label{font-size:.64rem;letter-spacing:.28em;text-transform:uppercase;color:var(--amber);margin-bottom:9px}
.sh-title{font-family:var(--serif);font-size:clamp(1.3rem,1.85vw,1.75rem);
  font-weight:500;color:var(--ink);line-height:1.35}
.sh-title-inv{color:var(--paper4)}
.sh-desc{font-size:.855rem;line-height:1.9;color:var(--ink2);margin-top:11px;max-width:500px}
.sh-desc-inv{color:rgba(237,228,210,.5)}

/* ── SERVICES ── */
.svc-g{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--rule)}
@media(max-width:940px){.svc-g{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.svc-g{grid-template-columns:1fr}}
.svc{padding:38px 28px 42px;border-right:1px solid var(--rule);
  position:relative;overflow:hidden;transition:background .28s}
.svc:last-child{border-right:none}
.svc:hover{background:var(--paper2)}
.svc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:var(--amber);transform:scaleX(0);transform-origin:left;
  transition:transform .42s var(--ease)}
.svc:hover::before{transform:scaleX(1)}
.svc-n{font-size:.64rem;letter-spacing:.22em;color:var(--amber);margin-bottom:20px}
.svc-t{font-family:var(--serif);font-size:1.1rem;font-weight:500;color:var(--ink);margin-bottom:12px}
.svc-b{font-size:.8rem;line-height:1.9;color:var(--ink2)}

/* ── PRODUCTS ── */
.prd-wrap{display:grid;grid-template-columns:210px 1fr;border-top:1px solid var(--rule)}
@media(max-width:840px){.prd-wrap{grid-template-columns:1fr}}
.prd-side{border-right:1px solid var(--rule);padding:38px 30px;
  display:flex;flex-direction:column;gap:18px}
@media(max-width:840px){.prd-side{border-right:none;border-bottom:1px solid var(--rule)}}
.prd-side-t{font-family:var(--serif);font-size:1.35rem;font-weight:500;color:var(--ink);line-height:1.5}
.prd-side-b{font-size:.78rem;color:var(--ink2);line-height:1.9}
.prd-list{display:grid;grid-template-columns:repeat(3,1fr)}
@media(max-width:1080px){.prd-list{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.prd-list{grid-template-columns:1fr}}
.prd-item{padding:32px 26px;border-bottom:1px solid var(--rule);
  border-right:1px solid var(--rule);transition:background .22s}
.prd-item:hover{background:var(--paper3)}
.prd-note{font-size:.6rem;letter-spacing:.22em;color:var(--ink3);text-transform:uppercase;margin-bottom:9px}
.prd-t{font-family:var(--serif);font-size:.9375rem;font-weight:500;color:var(--ink);margin-bottom:13px}
.prd-tags{display:flex;flex-wrap:wrap;gap:6px}
.prd-tag{font-size:.65rem;color:var(--ink2);border:1px solid var(--rule);
  padding:3px 9px;letter-spacing:.04em;transition:all .2s}
.prd-item:hover .prd-tag{border-color:var(--amber-line);color:var(--ink)}

/* ── VALUE (dark) ── */
.val-g{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid rgba(237,228,210,.12)}
@media(max-width:768px){.val-g{grid-template-columns:1fr}}
.val-l{padding:60px 52px 60px 0;border-right:1px solid rgba(237,228,210,.12)}
@media(max-width:768px){.val-l{border-right:none;border-bottom:1px solid rgba(237,228,210,.12);padding:44px 0}}
.val-r{padding:60px 0 60px 52px}
@media(max-width:768px){.val-r{padding:44px 0}}
.val-label{font-size:.64rem;letter-spacing:.28em;text-transform:uppercase;color:var(--amber);margin-bottom:9px}
.val-t{font-family:var(--serif);font-size:clamp(1.3rem,1.85vw,1.75rem);font-weight:500;color:var(--paper4);line-height:1.35}
.val-d{font-size:.84rem;color:rgba(237,228,210,.48);line-height:1.9;margin-top:11px;max-width:400px}
.val-list{display:grid;gap:11px;margin-top:26px}
.val-row{display:flex;align-items:flex-start;gap:12px}
.val-dot{width:15px;height:15px;border:1px solid rgba(237,228,210,.18);
  flex-shrink:0;margin-top:3px;position:relative}
.val-dot::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:5px;height:5px;background:var(--amber)}
.val-txt{font-size:.78rem;color:rgba(237,228,210,.55);line-height:1.85}

/* ── CHIPS ── */
.chips{display:flex;flex-wrap:wrap;gap:9px;margin-top:38px}
.chip{font-size:.78rem;color:var(--ink2);border:1px solid var(--rule);
  padding:9px 18px;letter-spacing:.04em;transition:all .24s;cursor:default}
.chip:hover{border-color:var(--amber-line);color:var(--ink);background:var(--amber-pale)}

/* ── CASES TABLE ── */
.case-list{border-top:1px solid var(--rule);margin-top:52px}
.case-row{display:grid;grid-template-columns:44px 150px 1fr 1fr 1fr;
  border-bottom:1px solid var(--rule);transition:background .2s}
.case-row:hover{background:var(--paper2)}
@media(max-width:960px){.case-row{grid-template-columns:1fr}}
.case-n{padding:30px 14px;border-right:1px solid var(--rule);
  font-size:.68rem;letter-spacing:.18em;color:var(--ink3);align-self:start;padding-top:30px}
@media(max-width:960px){.case-n{display:none}}
.case-c{padding:30px 22px;border-right:1px solid var(--rule)}
@media(max-width:960px){.case-c{border-right:none;border-bottom:1px solid var(--rule-lt)}}
.case-c:last-child{border-right:none}
.case-tag{display:inline-block;font-size:.6rem;letter-spacing:.2em;color:var(--amber);
  border:1px solid var(--amber-line);padding:3px 9px;margin-bottom:11px;text-transform:uppercase}
.case-client{font-family:var(--serif);font-size:.9375rem;font-weight:500;color:var(--ink)}
.case-cl{font-size:.6rem;letter-spacing:.2em;color:var(--ink3);text-transform:uppercase;margin-bottom:6px}
.case-cv{font-size:.78rem;color:var(--ink2);line-height:1.85}

/* ── FAQ ── */
.faq-list{border-top:1px solid var(--rule);margin-top:52px}
.faq-item{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid var(--rule);transition:background .2s}
.faq-item:hover{background:var(--paper2)}
@media(max-width:640px){.faq-item{grid-template-columns:1fr}}
.faq-q{padding:26px 36px 26px 0;font-family:var(--serif);font-size:.9rem;
  font-weight:500;color:var(--ink);border-right:1px solid var(--rule)}
@media(max-width:640px){.faq-q{border-right:none;border-bottom:1px solid var(--rule-lt);padding:22px 0 12px}}
.faq-a{padding:26px 0 26px 36px;font-size:.78rem;color:var(--ink2);line-height:1.87}
@media(max-width:640px){.faq-a{padding:12px 0 22px}}

/* ── CTA BAND ── */
.cta{background:var(--ink);padding:72px 0;border-top:1px solid var(--rule)}
.cta-in{display:grid;grid-template-columns:1fr auto;gap:56px;align-items:center}
@media(max-width:768px){.cta-in{grid-template-columns:1fr;gap:30px}}
.cta-t{font-family:var(--serif);font-size:clamp(1.3rem,1.9vw,1.75rem);
  font-weight:500;color:var(--paper4);line-height:1.4}
.cta-d{font-size:.78rem;color:rgba(237,228,210,.44);margin-top:11px;line-height:1.87;max-width:460px}
.cta-btns{display:flex;gap:12px;flex-wrap:wrap;flex-shrink:0}
.btn-inv{border:1px solid rgba(237,228,210,.22);color:rgba(237,228,210,.62);
  font-size:.78rem;padding:11px 26px;letter-spacing:.06em;transition:all .2s}
.btn-inv:hover{border-color:rgba(237,228,210,.44);color:var(--paper4)}

/* ── PROC ── */
.proc{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--rule);margin-top:52px}
@media(max-width:840px){.proc{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.proc{grid-template-columns:1fr}}
.proc-c{padding:34px 26px;border-right:1px solid var(--rule);transition:background .24s}
.proc-c:last-child{border-right:none}
.proc-c:hover{background:var(--paper2)}
.proc-n{font-size:.64rem;letter-spacing:.22em;color:var(--amber);margin-bottom:14px}
.proc-t{font-family:var(--serif);font-size:.9375rem;font-weight:500;color:var(--ink);margin-bottom:8px}
.proc-b{font-size:.78rem;color:var(--ink2);line-height:1.87}

/* ── TWO PANEL ── */
.tp{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--rule);margin-top:52px}
@media(max-width:640px){.tp{grid-template-columns:1fr}}
.tp-c{padding:38px 32px;border-right:1px solid var(--rule);transition:background .24s}
.tp-c:last-child{border-right:none}
.tp-c:hover{background:var(--paper3)}
.tp-l{font-size:.64rem;letter-spacing:.28em;color:var(--amber);text-transform:uppercase;margin-bottom:11px}
.tp-t{font-family:var(--serif);font-size:1rem;font-weight:500;color:var(--ink);margin-bottom:10px}
.tp-b{font-size:.78rem;color:var(--ink2);line-height:1.9}

/* ── PAGE HERO ── */
.phero{padding:72px 0 56px;border-bottom:1px solid var(--rule);background:var(--paper2)}
.phero-ey{display:flex;align-items:center;gap:13px;margin-bottom:24px}
.phero-bar{width:24px;height:1px;background:var(--amber)}
.phero-lbl{font-size:.64rem;letter-spacing:.3em;color:var(--amber);text-transform:uppercase}
.phero-t{font-family:var(--serif);font-size:clamp(1.65rem,2.8vw,2.5rem);
  font-weight:500;color:var(--ink);line-height:1.28;margin-bottom:16px}
.phero-d{font-size:.855rem;color:var(--ink2);line-height:1.9;max-width:560px}

/* ── ABOUT ── */
.about-g{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--rule);margin-top:52px}
@media(max-width:840px){.about-g{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.about-g{grid-template-columns:1fr}}
.about-c{padding:34px 26px;border-right:1px solid var(--rule);transition:background .24s}
.about-c:last-child{border-right:none}
.about-c:hover{background:var(--paper3)}
.about-ico{width:24px;height:24px;border:1px solid var(--amber-line);display:flex;
  align-items:center;justify-content:center;margin-bottom:16px;
  font-family:var(--serif);font-size:.78rem;color:var(--amber)}
.about-t{font-family:var(--serif);font-size:.9375rem;font-weight:500;color:var(--ink);margin-bottom:8px}
.about-b{font-size:.78rem;color:var(--ink2);line-height:1.87}

/* ── CONTACT ── */
.con{display:grid;grid-template-columns:290px 1fr;border-top:1px solid var(--rule);margin-top:52px}
@media(max-width:900px){.con{grid-template-columns:1fr}}
.con-l{border-right:1px solid var(--rule);padding:42px 34px}
@media(max-width:900px){.con-l{border-right:none;border-bottom:1px solid var(--rule)}}
.con-r{padding:42px 46px;background:var(--paper2)}
@media(max-width:768px){.con-r{padding:34px 20px}}
.con-ib{margin-top:26px;padding-top:20px;border-top:1px solid var(--rule)}
.con-il{font-size:.6rem;letter-spacing:.24em;color:var(--amber);text-transform:uppercase;margin-bottom:6px}
.con-iv{font-size:.78rem;color:var(--ink2);line-height:1.87}
.fg{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:560px){.fg{grid-template-columns:1fr}}
.fc{display:grid;gap:5px}
.fc-full{grid-column:1/-1}
.fc label{font-size:.6rem;letter-spacing:.2em;color:var(--ink3);text-transform:uppercase}
.fc input,.fc select,.fc textarea{
  background:var(--paper4);border:1px solid var(--rule);
  color:var(--ink);font-family:var(--sans);font-size:.78rem;
  padding:10px 12px;outline:none;width:100%;transition:border-color .2s;
  -webkit-appearance:none;appearance:none}
.fc input:focus,.fc select:focus,.fc textarea:focus{border-color:var(--amber-line)}
.fc input::placeholder,.fc textarea::placeholder{color:var(--ink3)}
.fc select option{background:var(--paper4)}
.fc textarea{resize:vertical;min-height:88px}
.fsub{width:100%;background:var(--ink);color:var(--paper4);font-size:.84rem;
  letter-spacing:.1em;padding:13px;margin-top:4px;transition:background .2s,transform .15s}
.fsub:hover{background:var(--amber);transform:translateY(-1px)}
.fnote{font-size:.65rem;color:var(--ink3);margin-top:8px;line-height:1.7}

/* ══════════════════════════════════════════════════════════════
   NEWS / ARTICLES
══════════════════════════════════════════════════════════════ */
.news-top{padding:72px 0 0;border-bottom:1px solid var(--rule);background:var(--paper2)}
.news-top-inner{padding-bottom:0}
.news-tabs{display:flex;gap:0;border-top:1px solid var(--rule);margin-top:40px}
.news-tab{font-size:.76rem;letter-spacing:.06em;color:var(--ink2);
  padding:14px 22px;border-right:1px solid var(--rule);
  transition:all .2s;cursor:pointer}
.news-tab:hover{background:var(--paper3);color:var(--ink)}
.news-tab.on{background:var(--ink);color:var(--paper4)}

/* article list */
.art-list{border-top:1px solid var(--rule);margin-top:0}
.art-row{display:grid;grid-template-columns:1fr auto;gap:32px;align-items:start;
  padding:32px 0;border-bottom:1px solid var(--rule);
  transition:background .2s;cursor:pointer}
.art-row:hover .art-title{color:var(--amber)}
.art-meta{display:flex;align-items:center;gap:14px;margin-bottom:10px}
.art-cat{font-size:.6rem;letter-spacing:.2em;color:var(--amber);
  border:1px solid var(--amber-line);padding:3px 9px;text-transform:uppercase}
.art-date{font-size:.68rem;color:var(--ink3);letter-spacing:.06em}
.art-read{font-size:.68rem;color:var(--ink3)}
.art-title{font-family:var(--serif);font-size:1.05rem;font-weight:500;
  color:var(--ink);margin-bottom:9px;transition:color .2s;line-height:1.45}
.art-summary{font-size:.78rem;color:var(--ink2);line-height:1.87;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.art-author{font-size:.68rem;color:var(--ink3);margin-top:10px}
.art-arrow{font-size:1.2rem;color:var(--ink3);flex-shrink:0;padding-top:4px;
  transition:transform .2s,color .2s}
.art-row:hover .art-arrow{transform:translateX(4px);color:var(--amber)}

/* article CARD grid (featured) */
.art-feat{display:grid;grid-template-columns:2fr 1fr;gap:1px;
  background:var(--rule);border:1px solid var(--rule);margin-top:52px}
@media(max-width:840px){.art-feat{grid-template-columns:1fr}}
.art-feat-main{background:var(--paper);padding:40px 36px;cursor:pointer;transition:background .22s}
.art-feat-main:hover{background:var(--paper2)}
.art-feat-main:hover .art-title{color:var(--amber2)}
.art-feat-side{display:grid;grid-template-rows:1fr 1fr;background:var(--paper);gap:1px}
.art-feat-mini{background:var(--paper);padding:28px 28px;cursor:pointer;transition:background .22s;
  border-bottom:1px solid var(--rule)}
.art-feat-mini:last-child{border-bottom:none}
.art-feat-mini:hover{background:var(--paper2)}
.art-feat-mini:hover .art-title{color:var(--amber2)}
.art-title-sm{font-family:var(--serif);font-size:.9rem;font-weight:500;
  color:var(--ink);line-height:1.45;margin-bottom:8px;transition:color .2s}
.art-feat-mini:hover .art-title-sm{color:var(--amber2)}

/* article detail */
.art-detail{max-width:740px;margin:0 auto;padding:64px 52px}
@media(max-width:768px){.art-detail{padding:48px 20px}}
.art-detail-back{display:inline-flex;align-items:center;gap:8px;
  font-size:.72rem;letter-spacing:.12em;color:var(--ink2);
  margin-bottom:40px;cursor:pointer;transition:color .2s;text-transform:uppercase}
.art-detail-back:hover{color:var(--amber)}
.art-detail-cat{font-size:.6rem;letter-spacing:.22em;color:var(--amber);
  border:1px solid var(--amber-line);padding:3px 10px;text-transform:uppercase;display:inline-block;margin-bottom:20px}
.art-detail-title{font-family:var(--serif);font-size:clamp(1.5rem,2.8vw,2.1rem);
  font-weight:600;color:var(--ink);line-height:1.28;margin-bottom:20px}
.art-detail-meta{display:flex;gap:18px;align-items:center;
  padding:14px 0;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);
  margin-bottom:36px}
.art-detail-meta span{font-size:.7rem;color:var(--ink3);letter-spacing:.06em}
.art-detail-body{font-size:.9rem;line-height:2;color:var(--ink2)}
.art-detail-body p{margin-bottom:1.4em}
.art-detail-body strong{color:var(--ink);font-weight:500}

/* publish form */
.pub-form{border-top:1px solid var(--rule);margin-top:56px;padding-top:52px}
.pub-form-title{font-family:var(--serif);font-size:1.3rem;font-weight:500;
  color:var(--ink);margin-bottom:28px}
.pub-grid{display:grid;gap:14px}
.pub-submit{background:var(--ink);color:var(--paper4);font-size:.84rem;letter-spacing:.1em;
  padding:13px 40px;transition:background .2s,transform .15s;align-self:start}
.pub-submit:hover{background:var(--amber);transform:translateY(-1px)}
.pub-note{font-size:.68rem;color:var(--ink3);line-height:1.7}

/* ── FOOTER ── */
.foot{border-top:1px solid var(--rule);background:var(--paper3)}
.foot-i{max-width:1340px;margin:0 auto;padding:0 52px;
  height:52px;display:flex;align-items:center;justify-content:space-between}
@media(max-width:768px){.foot-i{padding:16px 20px;height:auto;
  flex-direction:column;align-items:flex-start;gap:8px}}
.foot-l{display:flex;align-items:center;gap:20px}
.foot-brand{font-family:var(--serif);font-size:.84rem;color:var(--ink2)}
.foot-sep{width:1px;height:12px;background:var(--rule)}
.foot-en{font-size:.58rem;letter-spacing:.28em;color:var(--ink3);text-transform:uppercase}
.foot-r{font-size:.66rem;color:var(--ink3);letter-spacing:.06em}
`;

/* ═══════════════════════════════════════════════════════════════  COMP  */
function R({ children, d = 0, className = '' }) {
  const [ref, on] = useReveal(0.07);
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
        <div>
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
        <div className="phero-ey"><div className="phero-bar" /><span className="phero-lbl">{eyebrow}</span></div>
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
   NEWS PAGE
═══════════════════════════════════════════════════════════════ */
function ArticleBody({ text }) {
  const parts = text.trim().split('\n\n').map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return <p key={i}><strong>{p.replace(/\*\*/g, '')}</strong></p>;
    }
    return <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
  });
  return <div className="art-detail-body">{parts}</div>;
}

function NewsPage() {
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [tab, setTab] = useState('all');
  const [reading, setReading] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ cat:'行业洞察', title:'', summary:'', body:'', author:'' });
  const [msg, setMsg] = useState('');

  const CATS = ['全部', '行业洞察', '产品动态', '合作案例', '经营干货'];
  const filtered = tab === 'all' || tab === '全部'
    ? articles
    : articles.filter(a => a.cat === tab);

  const handlePublish = () => {
    if (!form.title.trim() || !form.body.trim()) {
      setMsg('请填写标题和正文内容。'); return;
    }
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    const newArt = {
      id: Date.now(), cat: form.cat,
      title: form.title.trim(),
      summary: form.summary.trim() || form.body.trim().slice(0, 80) + '…',
      body: form.body.trim(),
      author: form.author.trim() || '豪大根编辑部',
      date, readTime: `${Math.max(1, Math.ceil(form.body.length / 300))}分钟`
    };
    setArticles(prev => [newArt, ...prev]);
    setForm({ cat:'行业洞察', title:'', summary:'', body:'', author:'' });
    setShowForm(false);
    setMsg('✓ 文章已发布');
    setTimeout(() => setMsg(''), 3000);
  };

  if (reading) {
    const art = articles.find(a => a.id === reading);
    if (!art) { setReading(null); return null; }
    return (
      <div style={{ background:'var(--paper)' }}>
        <div className="art-detail">
          <button className="art-detail-back" onClick={() => setReading(null)}>← 返回资讯列表</button>
          <div className="art-detail-cat">{art.cat}</div>
          <div className="art-detail-title">{art.title}</div>
          <div className="art-detail-meta">
            <span>{art.author}</span>
            <span>·</span>
            <span>{art.date}</span>
            <span>·</span>
            <span>阅读约 {art.readTime}</span>
          </div>
          <ArticleBody text={art.body} />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* top header */}
      <div className="news-top">
        <div className="W">
          <div className="news-top-inner">
            <div className="phero-ey"><div className="phero-bar" /><span className="phero-lbl">Industry Insights</span></div>
            <div className="phero-t">行业资讯</div>
            <div className="phero-d" style={{ maxWidth:500 }}>
              围绕餐饮食材行业、门店经营与产品趋势，持续分享值得关注的内容。
            </div>
            <div className="news-tabs">
              {CATS.map(c => (
                <button key={c}
                  className={`news-tab ${(tab === c || (tab === 'all' && c === '全部')) ? 'on' : ''}`}
                  onClick={() => setTab(c === '全部' ? 'all' : c)}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* featured block */}
      {tab === 'all' && filtered.length >= 2 && (
        <div className="sec">
          <div className="W">
            <R>
              <div className="art-feat">
                {/* main feature */}
                <div className="art-feat-main" onClick={() => setReading(filtered[0].id)}>
                  <div className="art-meta" style={{ marginBottom:14 }}>
                    <span className="art-cat">{filtered[0].cat}</span>
                    <span className="art-date">{filtered[0].date}</span>
                    <span className="art-read">{filtered[0].readTime}</span>
                  </div>
                  <div className="art-title" style={{ fontSize:'1.2rem', marginBottom:12 }}>{filtered[0].title}</div>
                  <div style={{ fontSize:'.82rem', lineHeight:1.9, color:'var(--ink2)' }}>{filtered[0].summary}</div>
                  <div className="art-author" style={{ marginTop:16 }}>{filtered[0].author}</div>
                </div>
                {/* side list */}
                <div className="art-feat-side">
                  {filtered.slice(1, 3).map(a => (
                    <div key={a.id} className="art-feat-mini" onClick={() => setReading(a.id)}>
                      <div className="art-meta" style={{ marginBottom:10 }}>
                        <span className="art-cat">{a.cat}</span>
                        <span className="art-date">{a.date}</span>
                      </div>
                      <div className="art-title-sm">{a.title}</div>
                      <div style={{ fontSize:'.72rem', color:'var(--ink3)' }}>{a.author}</div>
                    </div>
                  ))}
                </div>
              </div>
            </R>
          </div>
        </div>
      )}

      {/* article list */}
      <section className={`sec ${tab !== 'all' ? '' : 'sec-shade'}`}>
        <div className="W">
          <R>
            {msg && (
              <div style={{ padding:'12px 18px', background:'var(--amber-pale)', border:'1px solid var(--amber-line)',
                fontSize:'.78rem', color:'var(--amber)', marginBottom:24 }}>{msg}</div>
            )}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
              <div style={{ fontSize:'.7rem', letterSpacing:'.14em', color:'var(--ink3)' }}>
                共 {filtered.length} 篇文章
              </div>
              <button className="btn-dk"
                style={{ fontSize:'.72rem', padding:'9px 20px' }}
                onClick={() => setShowForm(v => !v)}>
                {showForm ? '收起' : '+ 发布文章'}
              </button>
            </div>

            {/* publish form */}
            {showForm && (
              <div style={{ border:'1px solid var(--rule)', background:'var(--paper4)', padding:'36px 32px', marginBottom:36 }}>
                <div style={{ fontSize:'.68rem', letterSpacing:'.24em', color:'var(--amber)', textTransform:'uppercase', marginBottom:20 }}>
                  发布新文章
                </div>
                <div className="pub-grid">
                  <div className="fc">
                    <label>分类</label>
                    <select value={form.cat} onChange={e => setForm(p => ({...p, cat:e.target.value}))}>
                      {['行业洞察','产品动态','合作案例','经营干货'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="fc">
                    <label>标题 *</label>
                    <input placeholder="文章标题" value={form.title} onChange={e => setForm(p => ({...p, title:e.target.value}))} />
                  </div>
                  <div className="fc">
                    <label>摘要（选填）</label>
                    <input placeholder="简短描述，不填将自动截取正文" value={form.summary} onChange={e => setForm(p => ({...p, summary:e.target.value}))} />
                  </div>
                  <div className="fc">
                    <label>作者</label>
                    <input placeholder="豪大根编辑部" value={form.author} onChange={e => setForm(p => ({...p, author:e.target.value}))} />
                  </div>
                  <div className="fc">
                    <label>正文内容 * （支持 **粗体** 段落标题）</label>
                    <textarea rows={10} placeholder={"在这里粘贴或输入正文内容...\n\n**段落小标题**\n\n正文段落内容..."}
                      value={form.body} onChange={e => setForm(p => ({...p, body:e.target.value}))} />
                  </div>
                  <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                    <button className="pub-submit" onClick={handlePublish}>发布</button>
                    <button className="btn-out" onClick={() => setShowForm(false)}>取消</button>
                    {msg && <span style={{ fontSize:'.76rem', color:'var(--amber)' }}>{msg}</span>}
                  </div>
                  <div className="pub-note">发布后将即时出现在资讯列表中，支持所有访问者查看。</div>
                </div>
              </div>
            )}

            <div className="art-list">
              {filtered.length === 0
                ? <div style={{ padding:'48px 0', fontSize:'.82rem', color:'var(--ink3)' }}>暂无该分类文章</div>
                : filtered.map(a => (
                  <div key={a.id} className="art-row" onClick={() => setReading(a.id)}>
                    <div>
                      <div className="art-meta">
                        <span className="art-cat">{a.cat}</span>
                        <span className="art-date">{a.date}</span>
                        <span className="art-read">阅读约 {a.readTime}</span>
                      </div>
                      <div className="art-title">{a.title}</div>
                      <div className="art-summary">{a.summary}</div>
                      <div className="art-author">{a.author}</div>
                    </div>
                    <div className="art-arrow">→</div>
                  </div>
                ))
              }
            </div>
          </R>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   OTHER PAGES
═══════════════════════════════════════════════════════════════ */
function HomePage({ nav }) {
  return (
    <>
      <section className="hero">
        <div className="hero-deco">根</div>
        <div className="hero-body">
          <div className="hero-rail"><span className="hero-rail-txt">HAODAGEN · FOOD SUPPLY · 2025</span></div>
          <div className="hero-main">
            <div className="hero-ey"><div className="hero-ey-bar" /><span className="hero-ey-txt">餐饮食材选品参谋 · 江苏豪大根食品有限公司</span></div>
            <div><div className="hero-h1">为餐饮门店提供</div><div className="hero-h2">更匹配的产品方案</div></div>
            <div className="hero-sub">围绕门店定位、客群和经营需求，提供选品策略、产品供应与定制贴牌服务——帮助客户更高效上新、稳定供货，实现降本增效。</div>
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
          <SH n="01" label="Services" title="我们提供哪些服务" desc="不只是供货，而是从选品、供应到贴牌与效率协同，围绕门店经营需求给出更完整的支持。" />
          <R d={0.08}><div className="svc-g">{SERVICES.map(s => (
            <div className="svc" key={s.n}><div className="svc-n">{s.n}</div><div className="svc-t">{s.title}</div><div className="svc-b">{s.body}</div></div>
          ))}</div></R>
        </div>
      </section>

      <section className="sec sec-shade">
        <div className="W">
          <SH n="02" label="Products" title="我们的产品体系" desc="围绕烧烤夜市、西式、日式、台式、特色餐饮与火锅茶餐厅等场景，形成较完整的产品供应能力。" />
          <R d={0.08}>
            <div className="prd-wrap">
              <div className="prd-side">
                <div><div className="prd-side-t">六大产品系列</div><div className="prd-side-b" style={{marginTop:13}}>产品方向覆盖烧烤夜市小吃、西式餐饮、日式餐饮、高端台式、特色餐饮和火锅茶餐厅六大场景，可根据门店类型和经营需求进行匹配。</div></div>
                <button className="btn-out" style={{alignSelf:'flex-start'}} onClick={() => nav('products')}>查看完整产品</button>
              </div>
              <div className="prd-list">{PRODUCTS.map(p => (
                <div className="prd-item" key={p.title}>
                  <div className="prd-note">{p.note}</div><div className="prd-t">{p.title}</div>
                  <div className="prd-tags">{p.tags.map(t => <span className="prd-tag" key={t}>{t}</span>)}</div>
                </div>
              ))}</div>
            </div>
          </R>
        </div>
      </section>

      <section className="sec sec-dark">
        <div className="W">
          <R>
            <div className="val-g">
              <div className="val-l">
                <div className="val-label">Efficiency</div>
                <div className="val-t">我们如何帮助门店降本增效</div>
                <div className="val-d">豪大根不只是提供产品，更重视客户在经营中的实际效率，从产品选择到供货协同，给出更匹配的建议。</div>
              </div>
              <div className="val-r">
                <div className="val-list">{['减少盲目上新和无效采购造成的试错成本','优化产品组合，让产品结构更适配门店经营','提升新品测试与落地效率，缩短上新周期','增强供货协同，降低经营中的不确定性','通过定制贴牌支持门店建立差异化产品能力','让产品选择更贴合客群、场景和门店定位'].map(v => (
                  <div className="val-row" key={v}><div className="val-dot" /><div className="val-txt">{v}</div></div>
                ))}</div>
              </div>
            </div>
          </R>
        </div>
      </section>

      <section className="sec">
        <div className="W">
          <SH n="03" label="Customers" title="我们服务哪些客户" desc="主要服务有供货、上新、产品优化和品牌定制需求的餐饮门店客户。" />
          <R d={0.08}><div className="chips">{['烧烤店 / 烤肉店','西式简餐店','烘焙 / 轻食门店','日式餐饮门店','夜市 / 小吃类门店','连锁餐饮品牌','有定制贴牌需求的品牌客户','希望优化产品结构与采购效率的门店'].map(c => (
            <div className="chip" key={c}>{c}</div>
          ))}</div></R>
        </div>
      </section>

      <section className="sec sec-shade">
        <div className="W">
          <SH n="04" label="Cases" title="合作案例" desc="从实际合作中沉淀出来的案例，比宣传词更直接说明我们能做什么。" />
          <R d={0.08}><div className="case-list">{CASES.map((c,i) => (
            <div className="case-row" key={c.client}>
              <div className="case-n">0{i+1}</div>
              <div className="case-c"><div className="case-tag">{c.tag}</div><div className="case-client">{c.client}</div></div>
              <div className="case-c"><div className="case-cl">原来问题</div><div className="case-cv">{c.issue}</div></div>
              <div className="case-c"><div className="case-cl">合作方式</div><div className="case-cv">{c.how}</div></div>
              <div className="case-c"><div className="case-cl">结果方向</div><div className="case-cv">{c.out}</div></div>
            </div>
          ))}</div></R>
        </div>
      </section>

      <section className="sec">
        <div className="W">
          <SH n="05" label="FAQ" title="常见问题" desc="先把客户最常问的问题讲清楚，比堆很多宣传词更有效。" />
          <R d={0.08}><div className="faq-list">{FAQ.map(f => (
            <div className="faq-item" key={f.q}>
              <div className="faq-q">{f.q}</div><div className="faq-a">{f.a}</div>
            </div>
          ))}</div></R>
        </div>
      </section>
      <CTABand nav={nav} />
    </>
  );
}

function ProductsPage({ nav }) {
  return (<>
    <PhHero eyebrow="Product System" title="产品分类与应用场景" desc="把产品分类、适配场景和合作方向讲清楚，让客户更容易理解我们不只是卖货，而是懂门店经营的供货方。" />
    <section className="sec"><div className="W">
      <SH n="01" label="Overview" title="产品体系概览" desc="围绕烧烤夜市小吃、西式、日式、高端台式、特色餐饮、火锅茶餐厅等方向，形成完整的餐饮应用型产品体系。" />
      <R d={0.08}><div className="prd-list" style={{borderTop:'1px solid var(--rule)'}}>{PRODUCTS.map(p => (
        <div className="prd-item" key={p.title}><div className="prd-note">{p.note}</div><div className="prd-t">{p.title}</div><div className="prd-tags">{p.tags.map(t => <span className="prd-tag" key={t}>{t}</span>)}</div></div>
      ))}</div></R>
    </div></section>
    <section className="sec sec-shade"><div className="W">
      <SH n="02" label="How to choose" title="客户为什么需要选品参谋" desc="产品多不等于好卖，选择不等于适合。真正有效的是产品与门店定位、客群、动销节奏和经营目标相匹配。" />
      <R d={0.08}><div className="proc">{['先看门店场景，而不是只看单个产品热度','先看产品组合，再决定新品测试方向','先看经营效率，再决定拿货和上新节奏','先看长期合作方式，再考虑定制和贴牌延展'].map((t,i) => (
        <div className="proc-c" key={t}><div className="proc-n">0{i+1}</div><div className="proc-b">{t}</div></div>
      ))}</div></R>
    </div></section>
    <CTABand nav={nav} />
  </>);
}

function PrivateLabelPage({ nav }) {
  return (<>
    <PhHero eyebrow="Private Label" title="定制贴牌合作" desc="当客户希望做差异化产品、强化品牌辨识度或推进更深合作时，定制贴牌就是更合适的方向。" />
    <section className="sec"><div className="W">
      <SH n="01" label="For who" title="哪些客户适合做定制贴牌" desc="对有品牌意识、产品升级诉求和长期合作计划的客户，贴牌合作有更强的价值。" />
      <R d={0.08}><div className="proc">{['希望做差异化产品的餐饮品牌','希望强化品牌辨识度的连锁门店','希望从单次拿货转为深度合作的客户','希望形成专属产品结构的门店'].map((t,i) => (
        <div className="proc-c" key={t}><div className="proc-n">0{i+1}</div><div className="proc-b">{t}</div></div>
      ))}</div></R>
    </div></section>
    <section className="sec sec-shade"><div className="W">
      <SH n="02" label="Process" title="合作流程怎么走" desc="先明确方向，再匹配产品与合作方式，比一上来讨论包装和细节更有效。" />
      <R d={0.08}><div className="proc">{[['需求沟通','明确门店定位、客群、产品方向和合作目标。'],['产品匹配','围绕门店经营需求和品牌方向匹配合适产品。'],['合作确认','确认合作模式、产品方向与推进节奏。'],['落地执行','推进贴牌合作、产品上线和后续协同支持。']].map(([t,d],i) => (
        <div className="proc-c" key={t}><div className="proc-n">0{i+1}</div><div className="proc-t">{t}</div><div className="proc-b">{d}</div></div>
      ))}</div></R>
    </div></section>
    <section className="sec"><div className="W"><R>
      <div className="tp">
        <div className="tp-c"><div className="tp-l">Before</div><div className="tp-t">做贴牌前要先想清楚什么</div><div className="tp-b">先明确你是想提升品牌感、做差异化菜单、强化复购，还是希望形成长期供应体系。方向不同，合作方式就不同。</div></div>
        <div className="tp-c"><div className="tp-l">Support</div><div className="tp-t">豪大根能提供什么支持</div><div className="tp-b">围绕产品方向沟通、产品匹配、合作推进和长期协同，帮助客户把定制贴牌做得更贴合实际经营需求。</div></div>
      </div>
    </R></div></section>
    <CTABand nav={nav} />
  </>);
}

function CasesPage({ nav }) {
  return (<>
    <PhHero eyebrow="Cases" title="合作案例与合作方式" desc="先把客户类型、问题、合作方式和结果方向写清楚，就已经比只有一句「合作过很多客户」强很多。" />
    <section className="sec"><div className="W">
      <SH n="01" label="Highlights" title="案例摘要" desc="后续可继续补充更具体的数据、门店背景和产品方向，逐步沉淀成更完整的案例库。" />
      <R d={0.08}><div className="case-list">{CASES.map((c,i) => (
        <div className="case-row" key={c.client}>
          <div className="case-n">0{i+1}</div>
          <div className="case-c"><div className="case-tag">{c.tag}</div><div className="case-client">{c.client}</div></div>
          <div className="case-c"><div className="case-cl">原来问题</div><div className="case-cv">{c.issue}</div></div>
          <div className="case-c"><div className="case-cl">合作方式</div><div className="case-cv">{c.how}</div></div>
          <div className="case-c"><div className="case-cl">结果方向</div><div className="case-cv">{c.out}</div></div>
        </div>
      ))}</div></R>
    </div></section>
    <CTABand nav={nav} />
  </>);
}

function AboutPage({ nav }) {
  return (<>
    <PhHero eyebrow="About" title="关于豪大根" desc="" />
    <section className="sec"><div className="W">
      <SH n="01" label="Brand Positioning" title="品牌定位" />
      <R d={0.08}><div style={{borderTop:'1px solid var(--rule)',display:'grid',gridTemplateColumns:'1fr 1fr'}}>
        <div style={{padding:'38px 38px 38px 0',borderRight:'1px solid var(--rule)'}}>
          <div style={{fontSize:'.64rem',letterSpacing:'.28em',textTransform:'uppercase',color:'var(--amber)',marginBottom:11}}>定位</div>
          <div style={{fontSize:'.855rem',lineHeight:1.9,color:'var(--ink2)'}}>江苏豪大根食品有限公司，面向餐饮门店客户提供选品策略、产品供应与定制贴牌服务，围绕多种餐饮经营场景形成完整的产品供应能力。</div>
        </div>
        <div style={{padding:'38px 0 38px 38px'}}>
          <div style={{fontSize:'.64rem',letterSpacing:'.28em',textTransform:'uppercase',color:'var(--amber)',marginBottom:11}}>价值主张</div>
          <div style={{fontSize:'.855rem',lineHeight:1.9,color:'var(--ink2)'}}>不只是供货，更希望通过更匹配的产品方案、更合理的产品结构和更顺畅的合作方式，帮助客户高效上新、稳定经营，实现降本增效。</div>
        </div>
      </div></R>
    </div></section>
    <section className="sec sec-shade"><div className="W">
      <SH n="02" label="Why us" title="豪大根的合作价值" desc="不是单一卖货，而是围绕门店经营需求提供更完整支持。" />
      <R d={0.08}><div className="about-g">{[['产','产品体系明确','产品方向清晰，适配多种餐饮场景。'],['场','场景理解更强','更关注门店定位、菜单结构和经营需求。'],['合','支持深度合作','不仅有供货，也支持定制贴牌方向。'],['伙','合作导向明确','希望与客户做更长期、更稳定的协同合作。']].map(([i,t,d]) => (
        <div className="about-c" key={t}><div className="about-ico">{i}</div><div className="about-t">{t}</div><div className="about-b">{d}</div></div>
      ))}</div></R>
    </div></section>
    <CTABand nav={nav} />
  </>);
}

function ContactPage() {
  return (<>
    <PhHero eyebrow="Contact" title="咨询合作" desc="把客户最关心的信息先收集起来，后续更方便匹配产品方案、供货方式和贴牌合作方向。" />
    <section className="sec"><div className="W">
      <SH n="01" label="Cooperation" title="获取适合你门店的产品方案" />
      <R d={0.08}><div className="con">
        <div className="con-l">
          <div style={{fontSize:'.855rem',lineHeight:1.9,color:'var(--ink2)'}}>如果你正在寻找更适合门店的产品方案，或希望在选品、供货、定制贴牌上获得支持，欢迎和我们沟通合作。</div>
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
            <div className="fc-full"><button type="button" className="fsub">提交合作需求</button><div className="fnote">提交后可用于产品方案沟通、供货合作评估和定制贴牌需求对接。</div></div>
          </div>
        </div>
      </div></R>
    </div></section>
  </>);
}

/* ═══════════════════════════════════════════════════════════════  APP  */
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
          {page==='news'         && <NewsPage />}
          {page==='about'        && <AboutPage nav={nav} />}
          {page==='contact'      && <ContactPage />}
        </main>
        <Footer cur={page} />
      </div>
    </>
  );
}
