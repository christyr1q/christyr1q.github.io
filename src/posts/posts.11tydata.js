module.exports = {
  layout: 'post',
  title: 'Untitled',
  eleventyComputed: {
    permalink: (data) => `${data.page.fileSlug}/index.html`,
    thumb: (data) => {
      if (data.thumb) {
        return data.thumb;
      } else {
        return false;
      }
    }
  }
};
