const { instantsearch } = window;

import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
await fetch('/typesense-config.js')
  .then(r => r.text())
  .then(eval);

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: window.ENV.API_KEY, // Be sure to use the search-only-api-key
    nodes: [
      {
        host: window.ENV.HOST,
        port: window.ENV.PORT,
        protocol: window.ENV.PROTOCOL
      }
    ]
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  query_by is required.
  additionalSearchParameters: {
    query_by: "transcript,date,embedding",
    sort_by: "_text_match:desc,date_sort:asc",
    exclude_fields: "embedding",
    per_page: 50
  }
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const search = instantsearch({
  searchClient,
  indexName: "calvin_and_hobbes_hybrid"
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    autofocus: true,
    searchAsYouType: true,
    showSubmit: true,
    showLoadingIndicator: true,
    showReset: true,
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          <div class="hit-transcript">
            Transcript: {{#helpers.highlight}}{ "attribute": "transcript" }{{/helpers.highlight}}
          </div>
          <div class="hit-date">
            {{#helpers.highlight}}{ "attribute": "date" }{{/helpers.highlight}}
          </div>
          <div class="hit-url">
            <a href="{{#helpers.highlight}}{ "attribute": "url" }{{/helpers.highlight}}">
              {{#helpers.highlight}}{ "attribute": "url" }{{/helpers.highlight}}
            </a>
          </div>
          <div class="hit-image">
            <img src="/images/{{#helpers.highlight}}{ "attribute": "filename" }{{/helpers.highlight}}" />
            <div class="hit-download-image">
              <a href="/images/{{#helpers.highlight}}{ "attribute": "filename" }{{/helpers.highlight}}" download="{{#helpers.highlight}}{ "attribute": "filename" }{{/helpers.highlight}}">
                <img src="download.svg" alt="Download image" />
              </a>
            </div>
          </div>
        </div>
      `,
    },
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 50,
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
