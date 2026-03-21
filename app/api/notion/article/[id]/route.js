// 放置路径：app/api/notion/article/[id]/route.js
import { NextResponse } from 'next/server';

// 把 Notion block 转成网站已有的 **粗体** 文本格式
function blocksToText(blocks) {
  const lines = [];
  for (const block of blocks) {
    const type = block.type;
    const rich  = block[type]?.rich_text || [];
    const text  = rich.map(r => {
      let t = r.plain_text;
      if (r.annotations?.bold) t = `**${t}**`;
      return t;
    }).join('');

    if (!text && type !== 'divider') continue;

    switch (type) {
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
        lines.push(`**${text.replace(/\*\*/g, '')}**`);
        lines.push('');
        break;
      case 'bulleted_list_item':
        lines.push(`• ${text}`);
        break;
      case 'numbered_list_item':
        lines.push(text);
        break;
      case 'divider':
        lines.push('---');
        lines.push('');
        break;
      default:
        lines.push(text);
        lines.push('');
    }
  }
  return lines.join('\n');
}

export async function GET(req, { params }) {
  const token = process.env.NOTION_TOKEN;
  const { id } = params;

  if (!token) return NextResponse.json({ body: '', readTime: '5分钟' });

  try {
    const res = await fetch(`https://api.notion.com/v1/blocks/${id}/children?page_size=100`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) return NextResponse.json({ body: '', readTime: '5分钟' });

    const data   = await res.json();
    const body   = blocksToText(data.results || []);
    const chars  = body.replace(/\s/g, '').length;
    const readTime = `${Math.max(3, Math.ceil(chars / 250))}分钟`;

    return NextResponse.json({ body, readTime });
  } catch {
    return NextResponse.json({ body: '', readTime: '5分钟' });
  }
}
