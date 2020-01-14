const url = location.search;
const id = url.replace(/[^0-9]/ig,"");
let movieData;

const getSpecificMovieResource = () => {
  myAjax(
    `https://api.douban.com/v2/movie/subject/${id}?apikey=0df993c66c0c636e29ecbb5344252a4a`,
    'get',
    {},
    (res) => {
      movieData = res;
      loadSpecificMovie(res);
      getCommentsResource();
      getResource(movieData);
    }
  );
};

const getCommentsResource = () => {
    myAjax(
        `https://api.douban.com/v2/movie/subject/${id}/comments?start=1&count=5&apikey=0df993c66c0c636e29ecbb5344252a4a`,
        'get',
        {},
        function (res) {
          loadComments(res);
        }
    );
};

const getResource = (movieData) => {
    myAjax(
        'https://api.douban.com/v2/movie/top250?start=0&count=50&apikey=0df993c66c0c636e29ecbb5344252a4a',
        'get',
        {},
         (res) => {
            loadSimilarMovie(res, movieData);
        }
    );
};

const loadSpecificMovie = (res) => {
  const list = `<h2 class="card-title">${res.title} (${res.year})</h2>
    <img class="card-img-top" src=${res.images.small} alt="Card image cap">
    <div class="card-body">
    <p class="card-text">导演: ${res.directors.map(
      item => item.name
  )}</p>
    <p class="card-text">演员: ${res.casts.map(
      item => item.name
  )}</p>
    <p class="card-text">类别: ${res.genres}</p>
    <p class="card-text">制片国家/地区: ${res.countries}</p>
    <p class="card-text">年份: ${res.year}</p>
    <p class="card-text">又名: ${res.aka}</p>
    <p class="card-text">评分: ${res.rating.average}</p>
    <a href="${res.alt}" target="_blank"><button class="movie-description">在线观看</button></a>
    </div>
    <div class="summary-head">
       <h5>剧情简介</h5>
       <p class="summary">${res.summary}</p>
     </div>`;
  $('.movie-details').html(list);
};

const loadComments = (res) => {
  let commentsList = '';
    res.comments.forEach(item => {
      commentsList += `<div class="profile-photo"></div><img src=${item.author.avatar} alt="profile photo"></div>
        <p class="author-info">${item.author.name}</p>
        <p class="comment">${item.content}</p>`
    });
  $('.movie-comments').html(commentsList);
};

const loadSimilarMovie = (res, movieData) => {
  const similarMovieLists = res.subjects.filter(item => {
    return  movieData.genres.some(type => item.genres.includes(type));
  });

  let list = '';
    similarMovieLists.forEach(item => {
      list += `<img class="card-img-top" src=${item.images.small} alt="Card image cap">
        <p class="card-text">${item.title}</p>`
    });
  $('.similar-movie-lists').html(list);
}

getSpecificMovieResource();
