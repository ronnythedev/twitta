export interface NewsArticle {
    source:NewsArticleSource;
    author:string;
    title:string;
    description:string;
    url:string;
    urlToImage:string;
    publishedAt: string;
    content:string;
}

interface NewsArticleSource {
    id?:any;
    name:string;
}

export interface EnumNewsArticles extends Array<NewsArticle> {}