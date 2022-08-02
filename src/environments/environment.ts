// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mockEnv: false,
  apiBaseUrl: 'https://corona-stats.online',
  totalWorldMeterApiBaseUrl: 'https://disease.sh/v2/all?allowNull=true',
  allCountriesWorldMeterApiBaseUrl: 'https://disease.sh/v2/countries?allowNull=true',
  news: {
    //google: 'https://news.google.com/rss/topics/CAAqBwgKMJy5lwswj-KuAw?hl=en-US&gl=US&ceid=US:en'
    //google: 'https://news.google.com/rss/search?q=apple&hl=en-US&gl=US&ceid=US:en',
    newsapi:'https://newsapi.org/v2',
    //google:'https://www.toptal.com/developers/feed2json/convert?url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3Dapple%26hl%3Den-US%26gl%3DUS%26ceid%3DUS%3Aen',
    google:'https://api.allorigins.win/raw?url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3D[_search_]%26hl%3D[_lang_]',
    mediastack: 'http://api.mediastack.com/v1/news?access_key=0f20e3cc6b65d81821a9be7a56a34db5&keywords=covid19&languages=it&country=it&limit=100',
    yahoo: 'https://api.allorigins.win/raw?url=https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.yahoo.com%2Fnews%2Frss%2F[_search_]',
    //yahoo: 'https://www.yahoo.com/news/rss/world',
    key: {
      newsapi: "9f4dba32ffb64aa194150e5a11d3fc48"
    }
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
