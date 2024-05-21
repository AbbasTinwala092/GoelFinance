async function fetchNewsData() {
  const apiUrl = 'https://newsdata.io/api/1/latest?country=us&category=business&apikey=pub_44473655141efb001cf21f0db845ef57c0395';
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Extract the first 20 news articles
    const articles = data.results.slice(0, 0).map(article => {
      return {
        image: article.image_url || '../assets/img/blog/default-image.jpg',  // Fallback image if none provided
        creator: article.creator ? article.creator[0] : 'Unknown',
        title: article.title,
        link: article.link,
        sourceUrl: article.source_url,
        language: article.language,
        date: article.pubDate
      };
    });

    console.log(articles);
    return articles;
  } catch (error) {
    console.error('Error fetching news data:', error);
    return [];
  }
}

function createNewsCard(article) {
  return `
    <div class="col-xl-4 col-md-6">
      <article id="blogCard">

        <div class="post-img">
          <img src="${article.image}" alt="${article.title}" class="img-fluid">
        </div>

        <p class="post-category">Business</p>

        <h2 class="title">
          <a href="${article.link}" target="_blank">${article.title}</a>
        </h2>

        <div class="d-flex align-items-center">
          <div class="post-meta">
            <p class="post-author-list">${article.creator}</p>
            <p class="post-date">
              <time datetime="${article.date}">${new Date(article.date).toLocaleDateString()}</time>
            </p>
          </div>
        </div>

      </article>
    </div>`;
}

fetchNewsData().then(newsData => {
  const newsSection = document.querySelector('section');
  newsData.forEach(article => {
    newsSection.innerHTML += createNewsCard(article);
  });
});
