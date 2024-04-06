export type GetFeatured = {
  tfa: {
    type: string;
    title: string;
    displaytitle: string;
    namespace: {
      id: number;
      text: string;
    };
    wikibase_item: string;
    titles: {
      canonical: string;
      normalized: string;
      display: string;
    };
    pageid: number;
    thumbnail: {
      source: string;
      width: number;
      height: number;
    };
    originalimage: {
      source: string;
      width: number;
      height: number;
    };
    lang: string;
    dir: string;
    revision: string;
    tid: string;
    timestamp: string;
    description: string;
    description_source: string;
    content_urls: {
      desktop: {
        page: string;
        revisions: string;
        edit: string;
        talk: string;
      };
      mobile: {
        page: string;
        revisions: string;
        edit: string;
        talk: string;
      };
    };
    extract: string;
    extract_html: TrustedHTML;
    normalizedtitle: string;
  };
  mostread: {
    date: string;
    articles: Array<{
      views: number;
      rank: number;
      view_history: Array<{
        date: string;
        views: number;
      }>;
      type: string;
      title: string;
      displaytitle: string;
      namespace: {
        id: number;
        text: string;
      };
      wikibase_item: string;
      titles: {
        canonical: string;
        normalized: string;
        display: string;
      };
      pageid: number;
      thumbnail?: {
        source: string;
        width: number;
        height: number;
      };
      originalimage?: {
        source: string;
        width: number;
        height: number;
      };
      lang: string;
      dir: string;
      revision: string;
      tid: string;
      timestamp: string;
      description?: string;
      description_source?: string;
      content_urls: {
        desktop: {
          page: string;
          revisions: string;
          edit: string;
          talk: string;
        };
        mobile: {
          page: string;
          revisions: string;
          edit: string;
          talk: string;
        };
      };
      extract: string;
      extract_html: string;
      normalizedtitle: string;
      coordinates?: {
        lat: number;
        lon: number;
      };
    }>;
  };
  image: {
    title: string;
    thumbnail: {
      source: string;
      width: number;
      height: number;
    };
    image: {
      source: string;
      width: number;
      height: number;
    };
    file_page: string;
    artist: {
      html: string;
      text: string;
    };
    credit: {
      html: string;
      text: string;
    };
    license: {
      type: string;
      code: string;
      url: string;
    };
    description: {
      html: string;
      text: string;
      lang: string;
    };
    wb_entity_id: string;
    structured: {
      captions: {
        en: string;
        fr: string;
        th: string;
      };
    };
  };
  news: Array<{
    links: Array<{
      type: string;
      title: string;
      displaytitle: string;
      namespace: {
        id: number;
        text: string;
      };
      wikibase_item: string;
      titles: {
        canonical: string;
        normalized: string;
        display: string;
      };
      pageid: number;
      thumbnail?: {
        source: string;
        width: number;
        height: number;
      };
      originalimage?: {
        source: string;
        width: number;
        height: number;
      };
      lang: string;
      dir: string;
      revision: string;
      tid: string;
      timestamp: string;
      description: string;
      description_source: string;
      content_urls: {
        desktop: {
          page: string;
          revisions: string;
          edit: string;
          talk: string;
        };
        mobile: {
          page: string;
          revisions: string;
          edit: string;
          talk: string;
        };
      };
      extract: string;
      extract_html: string;
      normalizedtitle: string;
      coordinates?: {
        lat: number;
        lon: number;
      };
    }>;
    story: string;
  }>;
  onthisday: Array<{
    text: string;
    pages: Array<{
      type: string;
      title: string;
      displaytitle: string;
      namespace: {
        id: number;
        text: string;
      };
      wikibase_item: string;
      titles: {
        canonical: string;
        normalized: string;
        display: string;
      };
      pageid: number;
      thumbnail?: {
        source: string;
        width: number;
        height: number;
      };
      originalimage?: {
        source: string;
        width: number;
        height: number;
      };
      lang: string;
      dir: string;
      revision: string;
      tid: string;
      timestamp: string;
      description?: string;
      description_source?: string;
      content_urls: {
        desktop: {
          page: string;
          revisions: string;
          edit: string;
          talk: string;
        };
        mobile: {
          page: string;
          revisions: string;
          edit: string;
          talk: string;
        };
      };
      extract: string;
      extract_html: string;
      normalizedtitle: string;
      coordinates?: {
        lat: number;
        lon: number;
      };
    }>;
    year: number;
  }>;
};
