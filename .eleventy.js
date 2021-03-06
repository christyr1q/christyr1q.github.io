const fs = require('fs')

const pluginTailwind = require('eleventy-plugin-tailwindcss');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const Image = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");
const mila = require("markdown-it-link-attributes");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { DateTime } = require("luxon");

// Place an image with a predefined set of sizes
async function imageShortcode(src, url, alt, caption, sizes) {
  let metadata = await Image(src, {
    widths: [16,32,75,150,300,600,1200,null],
    formats: ["webp", "jpeg"],
    urlPath: "/assets/img/",
    outputDir: "./dist/assets/img/"
  });

  let jpegs = metadata["jpeg"];
  let maxWidth = jpegs[jpegs.length-1].width;

  var imageAttributes = {
    alt,
    sizes: `(min-width: ${maxWidth}px) ${maxWidth}px, 100vw`,
    loading: "lazy",
    decoding: "async"
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  const img = Image.generateHTML(metadata, imageAttributes)

  return img;
}

// This version takes an input size and deals with PNGs
async function imageProcessShortcode(src, hasTransparency, alt, width, theClass, pictureClass, style) {
  // Generate a list of reasonable widths
  var targetWidths = new Array();
  var curWidth = width;
  curWidth /= 2;
  while (curWidth > 32 && Math.round(curWidth) == curWidth) {
    targetWidths.push(curWidth);
    curWidth /= 2;
  }
  targetWidths.push(null);

  var baseFmt = "jpeg"
  if (hasTransparency) {
    baseFmt = "png";
  }

  let metadata = await Image(src, {
    widths: targetWidths,
    formats: ["webp", baseFmt],
    urlPath: "/assets/img/",
    outputDir: "./dist/assets/img/"
  });

  let maxWidth = width;

  var imageAttributes = {
    alt: alt,
    sizes: `(min-width: ${maxWidth}px) ${maxWidth}px, 100vw`,
    loading: "lazy",
    decoding: "async",
    style: style,
    'class': theClass
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  let img = Image.generateHTML(metadata, imageAttributes);
  if (pictureClass.length > 0) {
    imgPict = img.replace('<picture','<picture class=\'' + pictureClass + '\'');
  } else {
    imgPict = img;
  }

  return imgPict;
}

async function imagePlaceShortcode(content, args) {
  var fName = `src/assets/img/${args.src}`
  if (!fs.existsSync(fName)) {
    fName = `src/posts/img/${args.src}`
    if (!fs.existsSync(fName)) {
      if (args.src.search("assets")) {
        fName = `src/${args.src}`
      } else {
        fName = args.src;
      }
    }
  }

  if (!fs.existsSync(fName)) {
    console.log(`Failed to find image ${args.src}.  Skipping image tag.`)
    return ""
  }

  let metadata = await Image(fName, {
    widths: [16,32,75,150,300,600,1200,null],
    formats: ["webp", "jpeg"],
    urlPath: `/assets/img/`,
    outputDir: "./dist/assets/img/"
  });

  let jpegs = metadata["jpeg"];
  let maxWidth = jpegs[jpegs.length-1].width;

  var altTag = args.alt
  if (!altTag) {
    altTag = ''
  }
  var imgClass = "mt-0 mb-0 ml-0 mr-0 rounded-lg"
  if (args.justify == 'header') {
    imgClass = "w-full max-w-2xl mx-auto"
  }
  let imageAttributes = {
    alt: altTag,
    sizes: `(min-width: ${maxWidth}px) ${maxWidth}px, 100vw`,
    loading: "lazy",
    decoding: "async",
    class: imgClass
  };

  const img = Image.generateHTML(metadata, imageAttributes)
  var captionText = ''
  if (args.caption) {
    captionText = '<figcaption class="text-center mx-2"> ' + args.caption + ' </figcaption>'
  }

  // Special mode 
  if (args.justify == 'header') {
    return img
  } else {
    var floatEntry = " ";
    if (args.justify == 'left') {
      floatEntry = "float-left"
    } else if (args.justify == 'right') {
      floatEntry = "float-right"
    }
  
  let ret = 
  `<div class="flex mt-0 mb-0 mr-4 md:flex-shrink-0 ${floatEntry}">
  <figure class="shadow-lg rounded-lg">
  <a href="${args.url}" target="_blank" rel="noopener noreferrer">
  ${img}
  </a>
  ${captionText}
  </figure>
  </div>
  ${content}
  <div style="clear:both;"></div>`;

    return ret
  }
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
  config.addPlugin(pluginRss);

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
  config.addPassthroughCopy('src/assets/fonts/*');
  config.addPassthroughCopy({ 'src/posts/img/**/*': 'assets/img/' });

  config.addWatchTarget("src/assets/js/");

  config.addLayoutAlias('default', 'layouts/default.njk');
  config.addLayoutAlias('default-blog', 'layouts/default-blog.njk');
  config.addLayoutAlias('post', 'layouts/post.njk');
  config.addLayoutAlias('home', 'layouts/home.njk');

  config.addFilter('readableDate', require('./lib/filters/readableDate'));
  config.addFilter('minifyJs', require('./lib/filters/minifyJs'));
  config.addFilter("postDate", (dateObj) => {
    let dt = DateTime.fromJSDate(dateObj);
    return DateTime.fromJSDate(dateObj).toFormat('dd MMMM yyyy').toUpperCase();
  });
  
  config.addTransform('minifyHtml', require('./lib/transforms/minifyHtml'));

  config.addCollection('posts', require('./lib/collections/posts'));
  config.addCollection('tagList', require('./lib/collections/tagList'));
  config.addCollection('pagedPosts', require('./lib/collections/pagedPosts'));
  config.addCollection('pagedPostsByTag', require('./lib/collections/pagedPostsByTag'));

  config.addNunjucksAsyncShortcode("image", imageShortcode);
  config.addLiquidShortcode("image", imageShortcode);
  config.addJavaScriptFunction("image", imageShortcode);

  config.addNunjucksAsyncShortcode("ImageProcess", imageProcessShortcode);
  config.addLiquidShortcode("ImageProcess", imageProcessShortcode);
  config.addJavaScriptFunction("ImageProcess", imageProcessShortcode);

  config.addPairedNunjucksAsyncShortcode("ImagePlace", imagePlaceShortcode);
  config.addPairedLiquidShortcode("ImagePlace", imagePlaceShortcode);
  config.addJavaScriptFunction("ImagePlace", imagePlaceShortcode);

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
