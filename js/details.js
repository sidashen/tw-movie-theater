const url = location.search;
const id = url.replace(/[^0-9]/ig,"");
let singleMovieData;
let movieData;

const getSpecificMovieResource = () => {
  myAjax(
    `https://api.douban.com/v2/movie/subject/${id}?apikey=0df993c66c0c636e29ecbb5344252a4a`,
    'get',
    {},
    (res) => {
      singleMovieData = res;
      loadSpecificMovie(res);
      getCommentsResource();
      getResource(singleMovieData);
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

const getResource = (singleMovieData) => {
  myAjax(
    'https://api.douban.com/v2/movie/top250?start=0&count=250&apikey=0df993c66c0c636e29ecbb5344252a4a',
    'get',
    {},
    (res) => {
      loadSimilarMovie(res, singleMovieData);
      movieData = res;
      $('.iconfont').css('display', 'none');
      });
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
      commentsList += `<div class="profile-photo"><img src=${item.author.avatar} alt="profile photo"></div>
        <p class="author-info">${item.author.name}</p>
        <p class="comment">${item.content}</p>`
    });
  $('.movie-comments').html(commentsList);
};

const loadSimilarMovie = (res, singleMovieData) => {
  const similarMovieLists = res.subjects.filter(item => {
    return  singleMovieData.genres.some(type => item.genres.includes(type));
  }).slice(0, 12);

  let list = '';
    similarMovieLists.forEach(item => {
      list += `<div class="movie-card-info">
        <a href="../pages/details.html?id=${item.id}" target="_blank">
        <img class="img-card" src=${item.images.small} alt="Card image cap">
        </a>
        <p class="movie-title">${item.title}</p>
        <p class="rating">评分：${item.rating.average}</p>
        </div>`
    });
  $('.show-movie-lists').html(list);
}

const searchMovie = () => {
  const keyword = $('input')[0].value;
  const singleMovie = movieData.subjects.filter(item => {
    return item.title.includes(keyword);
  });

  if (singleMovie.length > 0) {
    $('.search-movie-lists').css('display','flex');
    $('.movie-details').css('display','none');
    $('.comments-area').css('display','none');
    $('.similar-movie-lists-area').css('display','none');
    $('.search-movie-lists').html(movieCardContents(singleMovie));
  } else {
      alert('没有搜到你想搜的电影');
    }
  $('input')[0].value = '';
};

const movieCardContents = (listContent) => {
  let list = '';
  listContent.forEach(item => {
    list += `<div class="movie-card">
        <a href="../pages/details.html?id=${item.id}" target="_blank">
        <img class="card-img-top" src=${item.images.medium} alt="Card image cap">
        </a>
        <div class="search-card-body">
          <h4 class="card-title">${item.title}</h4>
          <p class="card-text">年份: ${item.year}</p>
          <p class="card-text">评分: ${item.rating.average}</p>
          <p class="card-text">导演: ${item.directors.map(
        item => item.name
      )}</p>
          <p class="card-text">演员: ${item.casts.map(
        item => item.name
      )}</p>
          <p class="card-text">类别: ${item.genres}</p>
          <a href="../pages/details.html?id=${item.id}" target="_blank"><button class="movie-description btn-style">查看详情</button></a>
        </div>
      </div>`;
  });
  return list;
};

$('.btn').click((event) => {
  searchMovie();
  event.preventDefault();
});

getSpecificMovieResource();
