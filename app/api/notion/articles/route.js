// 放置路径：app/api/notion/articles/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.NOTION_TOKEN;
  const dbId  = process.env.NOTION_DB_ID;

  if (!token || !dbId) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: { property: '发布', checkbox: { equals: true } },
        sorts:  [{ property: '日期', direction: 'descending' }],
        page_size: 100,
      }),
      next: { revalidate: 60 }, // 缓存 60 秒
    });

    if (!res.ok) return NextResponse.json([], { status: 200 });

    const data = await res.json();

    const articles = (data.results || []).map(page => {
      const p = page.properties;
      const title   = p['名称']?.title?.[0]?.plain_text   || '';
      const cat     = p['分类']?.select?.name              || '行业洞察';
      const summary = p['摘要']?.rich_text?.map(r => r.plain_text).join('') || '';
      const author  = p['作者']?.rich_text?.map(r => r.plain_text).join('') || '豪大根编辑部';
      const date    = p['日期']?.date?.start               || '';

      return { id: page.id, title, cat, summary, author, date, readTime: '8分钟', fromNotion: true };
    });

    return NextResponse.json(articles);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
