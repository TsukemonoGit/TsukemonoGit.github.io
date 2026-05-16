export interface Project {
	Title: string;
	Url: string;
	Npub: string;
	Desc: string;
	Source: string;
	Date: string;
	"大分類": string;
	"小分類": string;
	"技術・プラットフォーム": string;
	Picture: string;
	Featured: string;
}

export interface Account {
	Title: string;
	Url: string;
	Npub: string;
	Desc: string;
}

// Helper: get a valid URL for a project
export function projectUrl(p: Project): string {
	if (p.Url.startsWith('http')) return p.Url;
	return p.Source;
}

// Filter: only non-account projects
export function isProject(p: Project): boolean {
	return p['大分類'] !== 'アカウント';
}

// Get accounts
export function getAccounts(data: Project[]): Account[] {
	return data
		.filter(p => p['大分類'] === 'アカウント')
		.map(p => ({ Title: p.Title, Url: p.Url, Npub: p.Npub, Desc: p.Desc }));
}

// Helper: get unique values for a field
export function getUniqueValues(data: Project[], field: keyof Project): string[] {
	return [...new Set(data.map(d => d[field]).filter(Boolean))].sort();
}

// Helper: sort by date (newest first)
export function sortByDate(data: Project[]): Project[] {
	return [...data].sort((a, b) => {
		const months: Record<string, number> = {
			Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
			Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
		};
		const parseDate = (d: string) => {
			const parts = d.replace(/\./g, '').replace(/-/g, ' ').trim().split(/\s+/);
			const yearMatch = parts[parts.length - 1].match(/^(\d{4})$/);
			const year = yearMatch ? parseInt(yearMatch[1]) : 2000;
			const month = months[parts[0].slice(0, 3)] ?? 0;
			return year * 1000 + month;
		};
		return parseDate(b.Date) - parseDate(a.Date);
	});
}
