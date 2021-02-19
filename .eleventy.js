const pluginTailwind = require('eleventy-plugin-tailwindcss');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const Image = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");
const mila = require("markdown-it-link-attributes");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [16,32,75,150,300,600,1200],
    formats: ["jpeg", "webp"],
    urlPath: "assets/img/",
    outputDir: "./dist/assets/img/"
  });

  let imageAttributes = {
    alt,
    sizes: '(min-width: 1024px) 1024px, 100vw',
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes)
}

module.exports = (config) => {
  config.addPlugin(pluginTailwind, {
    src: 'src/assets/css/*'
  });
  config.addPlugin(syntaxHighlight, {

      // e.g. Use syntax highlighters in njk and md Eleventy templates (not liquid)
      templateFormats: ["njk", "md"],
  
      // init callback lets you customize Prism
      // init: function({ Prism }) {
      //   Prism.languages.myCustomLanguage = /* */;
      // }
  
      // Added in 3.0, set to true to always wrap lines in `<span class="highlight-line">`
      // The default (false) only wraps when line numbers are passed in.
      alwaysWrapLineHighlights: false,
  
      // Added in 3.0.2, set to false to opt-out of pre-highlight removal of leading
      // and trailing whitespace
      trim: true,
  
      // Added in 3.0.4, change the separator between lines (you may want "\n")
      // lineSeparator: "<br>",
    });

  let markdownItOptions = {
    html: true
  };
  let milaOptions = {
    attrs: {
      target: "_blank",
      rel: "noopener noreferrer"
    }
  };
  let markdownLib = markdownIt(markdownItOptions).use(mila, milaOptions);
  config.setLibrary("md", markdownLib); 
  
  config.setDataDeepMerge(true);

  config.addPassthroughCopy('src/assets/img/**/*');
  config.addPassthroughCopy({ 'src/posts/img/**/*': 'assets/img/' });

  config.addWatchTarget("src/assets/js/");

  config.addLayoutAlias('default', 'layouts/default.njk');
  config.addLayoutAlias('default-blog', 'layouts/default-blog.njk');
  config.addLayoutAlias('post', 'layouts/post.njk');
  config.addLayoutAlias('home', 'layouts/home.njk');

  config.addFilter('readableDate', require('./lib/filters/readableDate'));
  config.addFilter('minifyJs', require('./lib/filters/minifyJs'));

  config.addTransform('minifyHtml', require('./lib/transforms/minifyHtml'));

  config.addCollection('posts', require('./lib/collections/posts'));
  config.addCollection('tagList', require('./lib/collections/tagList'));
  config.addCollection('pagedPosts', require('./lib/collections/pagedPosts'));
  config.addCollection('pagedPostsByTag', require('./lib/collections/pagedPostsByTag'));

  config.addNunjucksAsyncShortcode("image", imageShortcode);
  config.addLiquidShortcode("image", imageShortcode);
  config.addJavaScriptFunction("image", imageShortcode);

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    // pathPrefix: "/subfolder/",
    templateFormats: ['md', 'njk', 'html'],
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
