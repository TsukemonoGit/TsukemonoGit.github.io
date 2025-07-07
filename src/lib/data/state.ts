import { games } from './games';
import { nostrTools } from './nostr';
import { fanActivities } from './fan';
import { mentions } from './media';
import { links } from './links';
import { articles } from './articles';

// カテゴリ別のアイテム数を計算
export const categoryStats = {
	games: games.length,
	nostrTools: nostrTools.length,
	fanActivities: fanActivities.length,
	mentions: mentions.length,
	links: links.length,
	articles: articles.length
};
