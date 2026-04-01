'use client';
import { useEffect, useState } from 'react';
import { SiteFrame, useSiteNav } from '../_site/shared';

/* ═══════════════════════════════════════════  产品数据  */

const ALL_PRODUCTS = [
  // ── 台式香肠 ──
  { id:1,  name:'台式原味香肠',     cat:'台式香肠', img:'/images/products/taiwan/taiwan-yuanwei.jpg',    spec:'500克/10根 20包/件', isNew:false },
  { id:2,  name:'台式黑胡椒香肠',   cat:'台式香肠', img:'/images/products/taiwan/taiwan-heijiao.jpg',   spec:'500克/10根 20包/件', isNew:false },
  { id:4,  name:'台式飞鱼卵香肠',   cat:'台式香肠', img:'/images/products/taiwan/taiwan-feiyuzi.jpg',   spec:'500克/10根 20包/件', isNew:false },
  { id:7,  name:'台式高粱酒香肠',   cat:'台式香肠', img:'/images/products/taiwan/taiwan-gaoliang.jpg',  spec:'500克/10根 20包/件', isNew:false },
  { id:8,  name:'台式海苔香肠',     cat:'台式香肠', img:'/images/products/taiwan/taiwan-haitai.jpg',    spec:'500克/10根 20包/件', isNew:false },
  { id:9,  name:'台式芥末香肠',     cat:'台式香肠', img:'/images/products/taiwan/taiwan-jiemo.jpg',     spec:'500克/10根 20包/件', isNew:false },
  { id:10, name:'台式麻辣香肠',     cat:'台式香肠', img:'/images/products/taiwan/taiwan-mala.jpg',      spec:'500克/10根 20包/件', isNew:false },
  { id:11, name:'台式一口肠',       cat:'台式香肠', img:'/images/products/taiwan/taiwan-yikou.jpg',     spec:'500克/约32粒 20包/件', isNew:false },
  { id:12, name:'士林大香肠',       cat:'台式香肠', img:'/images/products/taiwan/taiwan-shilin.jpg',    spec:'500g/5根 20包/件',   isNew:false },
  { id:13, name:'台式香肠拼盘',     cat:'台式香肠', img:'/images/products/taiwan/taiwan-pinpan.jpg',    spec:'300g/6根 35包/件',   isNew:false },

  // ── 西式系列 ──
  { id:15, name:'罗勒叶香肠',       cat:'西式系列', img:'/images/products/german/de-luobo.jpg',          spec:'400g/5根 25包/件',   isNew:false },
  { id:16, name:'德式黑椒香肠',     cat:'西式系列', img:'/images/products/german/de-heijiao-17cm.jpg',   spec:'1kg/包 12包/件',     isNew:false },
  { id:17, name:'图林根香肠',       cat:'西式系列', img:'/images/products/german/tulinjin-1kg.jpg',      spec:'1kg/14根 12包/件',   isNew:false },
  { id:18, name:'德式盘肠',         cat:'西式系列', img:'/images/products/german/de-panchang.jpg',       spec:'500g/5根 16包/件',   isNew:false },
  { id:19, name:'德式香肠拼盘',     cat:'西式系列', img:'/images/products/german/de-pinpan.jpg',         spec:'500g/6根 20包/件',   isNew:false },
  { id:20, name:'法兰克福香肠',     cat:'西式系列', img:'/images/products/german/falankfu.jpg',          spec:'450g/11-12根 25包/件', isNew:false },
  { id:22, name:'奶酪香肠',         cat:'西式系列', img:'/images/products/german/nailao-xiangchang.jpg', spec:'350g/5根 25包/件',   isNew:false },
  { id:23, name:'德式墨鱼肠',       cat:'西式系列', img:'/images/products/german/de-moyuchang.jpg',      spec:'400g/8根 30包/件',   isNew:true  },
  { id:24, name:'德式烟熏香肠',     cat:'西式系列', img:'/images/products/german/de-yanxun-990g.jpg',    spec:'990g/11根 12包/件',  isNew:false },
  { id:25, name:'墨西哥芝士香肠',   cat:'西式系列', img:'/images/products/german/moxige-zhishi.jpg',     spec:'500g/5根 25包/件',   isNew:true  },
  { id:26, name:'惠灵顿牛排包',     cat:'西式系列', img:'/images/products/german/niupaibao.jpg',         spec:null,                 isNew:true  },

  // ── 烤肉食材 ──
  { id:27, name:'韩式风干肠',       cat:'烤肉食材', img:'/images/products/kaorou/hansifenggan.jpg',       spec:'60包/件',            isNew:false },
  { id:28, name:'彩虹小肉肠',       cat:'烤肉食材', img:'/images/products/kaorou/sicai-xiaorouchang.jpg', spec:'220克/21根 40包/件', isNew:false },
  { id:29, name:'烤芝士条',         cat:'烤肉食材', img:'/images/products/kaorou/zhishitiao.jpg',         spec:null,                 isNew:true  },

  // ── 日韩料理 ──
  { id:30, name:'日式小红肠',       cat:'日韩料理', img:'/images/products/rihan/rishi-xiaohongchang.jpg', spec:'500g/约23-25根 20包/件', isNew:false },
  { id:31, name:'骨付香肠',         cat:'日韩料理', img:'/images/products/rihan/gufuchang-500g.jpg',      spec:'500g/10根 20包/件',  isNew:false },
  { id:32, name:'芝士猪排',         cat:'日韩料理', img:'/images/products/rihan/rishi-zhishi-zhupai.jpg', spec:'1.2kg/10片/包',      isNew:false },
  { id:33, name:'爆浆芝士猪排',     cat:'日韩料理', img:'/images/products/rihan/baozhi-zhishi-zhupai.jpg',spec:'1kg/10片 6包/件',    isNew:false },
  { id:34, name:'厚切猪排',         cat:'日韩料理', img:'/images/products/rihan/houpai-750g.jpg',         spec:'750g/8片 19包/件',   isNew:false },
  { id:35, name:'安格斯牛肉饼',     cat:'日韩料理', img:'/images/products/rihan/hewang-niuroupai.jpg',    spec:'100g/包 150包/件',   isNew:true  },
  { id:36, name:'海苔炸虾圈',       cat:'日韩料理', img:'/images/products/rihan/xiajuan.jpg',             spec:'10条/盘',            isNew:false },
  { id:37, name:'拉丝芝士球',       cat:'日韩料理', img:'/images/products/rihan/zhishiqiu.jpg',           spec:null,                 isNew:true  },

  // ── 特色香肠 ──
  { id:38, name:'老长沙大香肠',     cat:'特色香肠', img:'/images/products/special/laochang-a.jpg',       spec:'600g/5根 30包/件',   isNew:false },
  { id:39, name:'山葵风味烤肠',     cat:'特色香肠', img:'/images/products/special/shankui-kaochang.jpg', spec:'500g/10根 20包/件',  isNew:true  },
  { id:40, name:'开花一口肠',       cat:'特色香肠', img:'/images/products/special/kaihua-yikou.jpg',     spec:'500克/30粒 30包/件', isNew:true  },
  { id:41, name:'澎湖墨鱼肠',       cat:'特色香肠', img:'/images/products/special/penghu-moyuchang.jpg', spec:'300克/5根 35包/件',  isNew:false },
  { id:42, name:'粽香肉肠',         cat:'特色香肠', img:'/images/products/special/zongxiang.jpg',        spec:'650g/10根 20包/件',  isNew:false },
  { id:43, name:'小爆肠',           cat:'特色香肠', img:'/images/products/special/xiaobaochang-625g.jpg',spec:'625克/约23根 22包/件',isNew:false },
  { id:44, name:'虾满满虾肠',       cat:'特色香肠', img:'/images/products/special/xiamanchang.jpg',      spec:'300g/6根 20包/件',   isNew:false },

  // ── 火锅食材 ──
  { id:45, name:'墨鱼爆蛋',         cat:'火锅食材', img:'/images/products/seafood/moyubaodan.jpg',        spec:'500g/23-24粒 20包/件',isNew:false },
  { id:46, name:'金丝虾卷',         cat:'火锅食材', img:'/images/products/seafood/jinsixiajuan.jpg',      spec:'300g/10个 20包/件',  isNew:false },
  { id:47, name:'虾味棒',           cat:'火锅食材', img:'/images/products/seafood/xiaweigang-wuqian.jpg', spec:'660克/15支 18包/件', isNew:false },
  { id:48, name:'鱼薯条',           cat:'火锅食材', img:'/images/products/seafood/yushutiao.jpg',         spec:'500g/包 30包/件',    isNew:false },
];

const CATS = ['全部', '台式香肠', '西式系列', '烤肉食材', '日韩料理', '特色香肠', '火锅食材'];

const CAT_DESC = {
  '全部':   '豪大根全系列产品，覆盖台式、西式、日韩、特色等多个餐饮场景。',
  '台式香肠':'台式经典风味香肠系列，原味、黑胡椒、飞鱼卵等多口味，适合夜市、烧烤和台式餐饮场景。',
  '西式系列':'德式、法式西式香肠系列，包括图林根、盘肠、法兰克福等，适合西式简餐和酒吧场景。',
  '烤肉食材':'专为烤肉门店设计的食材，包括韩式风干肠、彩虹小肉肠等，出品简单、动销稳定。',
  '日韩料理':'日韩风格料理食材，包括猪排、炸物、骨付香肠等，适合日式定食、居酒屋和韩式餐饮。',
  '特色香肠':'特色风味香肠系列，老长沙、山葵、澎湖墨鱼肠等差异化单品，适合打造菜单记忆点。',
  '火锅食材':'火锅和茶餐厅专属食材，墨鱼爆蛋、虾卷、虾味棒等，弹性足、耐涮不散。',
};

/* ═══════════════════════════════════════════  页面组件  */

export default function ProductsPage() {
  const nav = useSiteNav();
  const [activeCat, setActiveCat] = useState('全部');
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    document.title = '产品中心｜豪大根食材供应';
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement('link'); canon.rel = 'canonical'; document.head.appendChild(canon); }
    canon.href = 'https://www.haozhagen.com/products';
  }, []);

  const newProducts = ALL_PRODUCTS.filter(p => p.isNew);
  const filtered = activeCat === '全部'
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(p => p.cat === activeCat);

  return (
    <SiteFrame currentPage="products" nav={nav}>

      {/* ── HERO ── */}
      <div style={{ padding:'72px 0 0', borderBottom:'1px solid var(--rule)', background:'var(--paper2)' }}>
        <div className="W">
          <div style={{ display:'flex', alignItems:'center', gap:13, marginBottom:20 }}>
            <div style={{ width:24, height:1, background:'var(--amber)' }} />
            <span style={{ fontSize:'.64rem', letterSpacing:'.3em', color:'var(--amber)', textTransform:'uppercase' }}>Product Center</span>
          </div>
          <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(1.65rem,2.8vw,2.5rem)', fontWeight:500, color:'var(--ink)', lineHeight:1.28, marginBottom:12 }}>
            产品中心
          </h1>
          <div style={{ fontSize:'.875rem', color:'var(--ink2)', lineHeight:1.9, maxWidth:560, marginBottom:0 }}>
            {CAT_DESC[activeCat]}
          </div>

          {/* 类目筛选 tab */}
          <div style={{ display:'flex', gap:0, borderTop:'1px solid var(--rule)', marginTop:32 }}>
            {CATS.map(cat => (
              <button key={cat}
                onClick={() => setActiveCat(cat)}
                style={{
                  fontSize:'.76rem', letterSpacing:'.06em',
                  color: activeCat === cat ? 'var(--paper4)' : 'var(--ink2)',
                  padding:'14px 20px',
                  borderRight:'1px solid var(--rule)',
                  background: activeCat === cat ? 'var(--ink)' : 'transparent',
                  transition:'all .2s',
                  whiteSpace:'nowrap',
                }}
                onMouseOver={e => { if (activeCat !== cat) e.currentTarget.style.background = 'var(--paper3)'; }}
                onMouseOut={e => { if (activeCat !== cat) e.currentTarget.style.background = 'transparent'; }}
              >{cat}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 新品上新 ── */}
      {activeCat === '全部' && newProducts.length > 0 && (
        <section className="sec" style={{ paddingBottom:0 }}>
          <div className="W">
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:28 }}>
              <div style={{ fontFamily:'var(--serif)', fontSize:'1.1rem', fontWeight:500, color:'var(--ink)' }}>新品上新</div>
              <div style={{ height:1, flex:1, background:'var(--rule)' }} />
              <div style={{ fontSize:'.64rem', letterSpacing:'.22em', color:'var(--amber)', textTransform:'uppercase' }}>New Arrivals</div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'var(--rule)', border:'1px solid var(--rule)', marginBottom:52 }}
              className="prd-new-grid">
              {newProducts.map(p => (
                <div key={p.id}
                  style={{ background:'var(--paper)', overflow:'hidden', cursor:'default', transition:'background .22s' }}
                  onMouseOver={e => e.currentTarget.style.background='var(--paper2)'}
                  onMouseOut={e => e.currentTarget.style.background='var(--paper)'}>
                  <div style={{ position:'relative' }}>
                    {p.img
                      ? <img src={p.img} alt={p.name} style={{ width:'100%', aspectRatio:'4/3', objectFit:'cover', display:'block' }} />
                      : <div style={{ width:'100%', aspectRatio:'4/3', background:'var(--paper3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <span style={{ fontSize:'.72rem', color:'var(--ink3)' }}>{p.name[0]}</span>
                        </div>
                    }
                    <div style={{ position:'absolute', top:10, left:10, background:'var(--amber)', color:'#fff', fontSize:'.58rem', letterSpacing:'.18em', padding:'3px 8px' }}>NEW</div>
                  </div>
                  <div style={{ padding:'16px 18px 20px' }}>
                    <div style={{ fontSize:'.6rem', letterSpacing:'.2em', color:'var(--amber)', marginBottom:6, textTransform:'uppercase' }}>{p.cat}</div>
                    <div style={{ fontFamily:'var(--serif)', fontSize:'.9375rem', fontWeight:500, color:'var(--ink)', marginBottom:6 }}>{p.name}</div>
                    {p.spec && <div style={{ fontSize:'.68rem', color:'var(--ink3)' }}>{p.spec}</div>}
                  </div>
                </div>
              ))}
            </div>
            <style>{`@media(max-width:960px){.prd-new-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){.prd-new-grid{grid-template-columns:1fr!important}}`}</style>
          </div>
        </section>
      )}

      {/* ── 产品列表 ── */}
      <section className="sec sec-shade">
        <div className="W">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
            <div style={{ fontFamily:'var(--serif)', fontSize:'1rem', fontWeight:500, color:'var(--ink)' }}>
              {activeCat === '全部' ? '全部产品' : activeCat}
            </div>
            <div style={{ fontSize:'.7rem', color:'var(--ink3)', letterSpacing:'.1em' }}>
              共 {filtered.length} 个产品
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'transparent', border:'1px solid var(--rule)' }}
            className="prd-all-grid">
            {filtered.map(p => (
              <div key={p.id}
                style={{ background:'var(--paper)', overflow:'hidden', transition:'background .22s', cursor:'default' }}
                onMouseOver={e => e.currentTarget.style.background='var(--paper2)'}
                onMouseOut={e => e.currentTarget.style.background='var(--paper)'}>
                <div style={{ position:'relative' }}>
                  {p.img
                    ? <img src={p.img} alt={p.name} style={{ width:'100%', aspectRatio:'4/3', objectFit:'cover', display:'block' }} />
                    : <div style={{ width:'100%', aspectRatio:'4/3', background:'var(--paper3)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8 }}>
                        <div style={{ fontFamily:'var(--serif)', fontSize:'1.5rem', color:'var(--ink3)', fontWeight:300 }}>{p.name[0]}</div>
                        <div style={{ fontSize:'.6rem', color:'var(--ink3)', letterSpacing:'.08em' }}>图片准备中</div>
                      </div>
                  }
                  {p.isNew && (
                    <div style={{ position:'absolute', top:8, left:8, background:'var(--amber)', color:'#fff', fontSize:'.56rem', letterSpacing:'.16em', padding:'2px 7px' }}>NEW</div>
                  )}
                </div>
                <div style={{ padding:'14px 16px 18px' }}>
                  <div style={{ fontSize:'.58rem', letterSpacing:'.18em', color:'var(--amber)', marginBottom:5, textTransform:'uppercase' }}>{p.cat}</div>
                  <div style={{ fontFamily:'var(--serif)', fontSize:'.875rem', fontWeight:500, color:'var(--ink)', marginBottom:5, lineHeight:1.4 }}>{p.name}</div>
                  {p.spec && <div style={{ fontSize:'.65rem', color:'var(--ink3)', lineHeight:1.6 }}>{p.spec}</div>}
                </div>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:960px){.prd-all-grid{grid-template-columns:repeat(3,1fr)!important}}@media(max-width:640px){.prd-all-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta">
        <div className="W">
          <div className="cta-in">
            <div>
              <div className="cta-t">找不到适合你门店的产品？</div>
              <div className="cta-d">告诉我们你的门店类型和当前需求，我们来匹配最合适的产品方向，也支持定制贴牌合作。</div>
            </div>
            <div className="cta-btns">
              <button className="btn-dk" onClick={() => nav('contact')}>咨询合作</button>
              <button className="btn-inv" onClick={() => nav('privateLabel')}>定制贴牌</button>
            </div>
          </div>
        </div>
      </div>

    </SiteFrame>
  );
}
