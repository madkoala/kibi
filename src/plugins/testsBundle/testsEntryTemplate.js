module.exports = function ({env, bundle}) {

  let pluginSlug = env.pluginInfo.sort()
  .map(p => ' *  - ' + p)
  .join('\n');

  let requires = bundle.modules
  .map(m => `require(${JSON.stringify(m)});`)
  .join('\n');

  return `
/**
 * Test entry file
 *
 * This is programatically created and updated, do not modify
 *
 * context: ${JSON.stringify(env.context)}
 * includes code from:
${pluginSlug}
 *
 */

window.__KBN__ = {
  version: '1.2.3',
  buildNum: 1234,
  vars: {
    kbnIndex: '.kibi',
    esShardTimeout: 1500,
    esApiVersion: '2.0',
    esRequestTimeout: '300000',
    tilemap: {
      url: 'https://tiles.elastic.co/v1/default/{z}/{x}/{y}.png?my_app_name=kibana&my_app_version=1.2.3&elastic_tile_service_tos=agree',
      options: {
        minZoom: 0,
        maxZoom: 7,
        attribution: '© [Elastic Tile Service](https://www.elastic.co/elastic-tile-service)'
      }
    }
  }
};

require('ui/test_harness');
${requires}
require('ui/test_harness').bootstrap(/* go! */);

`;

};
