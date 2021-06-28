const siteData = require('../../src/_data/site');

module.exports = (coll) => {
  const allPosts = require('./posts')(coll);
  const regPosts = allPosts.slice(2);
  
  const maxPostsPerPage = siteData.paginate;
  const numberOfPages = Math.ceil(regPosts.length / maxPostsPerPage);
  const pagedPosts = [];

  for (let pageNum = 1; pageNum <= numberOfPages; pageNum++) {
    const sliceFrom = (pageNum - 1) * maxPostsPerPage;
    const sliceTo = sliceFrom + maxPostsPerPage;

    pagedPosts.push({
      number: pageNum,
      posts: regPosts.slice(sliceFrom, sliceTo),
      first: pageNum === 1,
      last: pageNum === numberOfPages
    });
  }

  return pagedPosts;
};
