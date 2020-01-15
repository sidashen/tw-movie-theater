let movieData;
let current;
let totalPage;
let singlePageMovies;
let currentMovies;

const getResource = () => {
  myAjax(
    'https://api.douban.com/v2/movie/top250?start=0&count=10&apikey=0df993c66c0c636e29ecbb5344252a4a',
    'get', 
    {},
    (res) => {
      movieData = res;
      loadCurrentMovie();
    }
  );
};

const loadCurrentMovie = () => {
  singlePageMovies = movieData.subjects;
  let currentMovies = singlePageMovies.slice(0, 6);

  $('.movie-show-lists').html(movieCardContents(currentMovies));
  initialPaginationParams();
};

const searchMovie = () => {
  const keyword = $('input')[0].value;
  const singleMovie = movieData.subjects.filter(item => {
    return item.title.includes(keyword);
  });

  if (singleMovie.length > 0) {
    $('.search-movie-lists').css('display','flex');
    $('.carousel').css('display','none');
    $('.movie-groups').css('display','none');
    $('.movie-show-lists').css('display','none');
    $('.search-movie-lists').html(movieCardContents(singleMovie));
  } else {
    alert('没有搜到你想搜的电影');
  }
  $('input')[0].value = '';
};

const loadMovieClass = (event) => {
  singlePageMovies = movieData.subjects.filter(item => {
    if ('story' === event.target.className) {
      return item.genres.includes('剧情');
    } else if ('action' === event.target.className) {
      return item.genres.includes('动作');
    } else if ('love' === event.target.className) {
      return item.genres.includes('爱情');
    } else if ('cartoon' === event.target.className) {
      return item.genres.includes('动画');
    } else if ('gay' === event.target.className) {
      return item.genres.includes('同性');
    } else if ('fantasy' === event.target.className) {
      return item.genres.includes('奇幻');
    } else if ('scientific' === event.target.className) {
      return item.genres.includes('科幻');
    } else if ('war' === event.target.className) {
      return item.genres.includes('战争');
    }
  });

  currentMovies = singlePageMovies.slice(0, 6);
  initialPaginationParams();

  $('.movie-show-lists').html(currentMovies.length ?
    movieCardContents(currentMovies) : `<span class="empty-result">没有该类型的电影</span>`
  );
};

const movieCardContents = (listContent) => {
  let list = '';
  listContent.forEach(item => {
    list += `<div class="movie-card">
        <a href="./pages/details.html?id=${item.id}" target="_blank">
        <img class="card-img-top" src=${item.images.medium} alt="Card image cap">
        </a>
        <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">年份: ${item.year}</p>
        <p class="card-text">评分: ${item.rating.average}</p>
        <p class="card-text">导演: ${item.directors.map(
      item => item.name
    )}</p>
        <p class="card-text">演员: ${item.casts.map(
      item => item.name
    )}</p>
        <p class="card-text">类别: ${item.genres}</p>
        <a href="./pages/details.html?id=${item.id}" target="_blank"><button class="movie-description btn-style">查看详情</button></a>
        </div>
      </div>`;
  });
  return list;
};

const initialPaginationParams = () => {
  current = 0;
  totalPage = Math.floor(singlePageMovies.length / 6);
  if ((singlePageMovies.length % 6) !== 0) {
    totalPage++;
  }
  $('.current-page').html(Number(current + 1));
  $('.total-page').html(Number(totalPage));

  if (current === 0) {
    previousPageDisabled();
    nextPageActive();
  }
  if (current === totalPage - 1) {
    nextPageDisabled();
  }
};

const nextPageActive = () => {
  $('.next-page').removeAttr('disabled');
  $('.next-page').html('下一页');
  $('.next-page').css('background-color', '#2c71c0');
};

const nextPageDisabled = () => {
  $('.next-page').attr('disabled', true);
  $('.next-page').html('没有下一页了');
  $('.next-page').css('background-color', 'grey');
};

const previousPageActive = () => {
  $('.previous-page').removeAttr('disabled');
  $('.previous-page').html('上一页');
  $('.previous-page').css('background-color', ' #2c71c0');
};

const previousPageDisabled = () => {
  $('.previous-page').attr('disabled', true);
  $('.previous-page').html('没有上一页了');
  $('.previous-page').css('background-color', 'grey');
};

const nextPage = () => {
  current ++;
  currentMovies = singlePageMovies.slice(current * 6, (current + 1) * 6);
  $('.movie-show-lists').html(movieCardContents(currentMovies));
  $('.current-page').html(Number(current + 1));
  previousPageActive();

  if (current === totalPage - 1) {
    nextPageDisabled();
  }
};

const previousPage = () => {
  current --;
  currentMovies = singlePageMovies.slice(current * 6, (current + 1) * 6);
  $('.movie-show-lists').html(movieCardContents(currentMovies));
  $('.current-page').html(Number(current + 1));
  nextPageActive();

  if (current === 0) {
    previousPageDisabled();
  }
};

$('body').click(event => {
  let {classList} = event.target;

  if (classList.contains('btn')) {
    searchMovie();
    event.preventDefault();
  }
  if (classList.contains('story')) {
    loadMovieClass(event);
  }
  if (classList.contains('action')) {
    loadMovieClass(event);
  }
  if (classList.contains('love')) {
    loadMovieClass(event);
  }
  if (classList.contains('cartoon')) {
    loadMovieClass(event);
  }
  if (classList.contains('gay')) {
    loadMovieClass(event);
  }
  if (classList.contains('fantasy')) {
    loadMovieClass(event);
  }
  if (classList.contains('scientific')) {
    loadMovieClass(event);
  }
  if (classList.contains('war')) {
    loadMovieClass(event);
  }
  if (classList.contains('group-head')) {
    loadCurrentMovie();
  }
});

getResource();
