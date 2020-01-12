let movieData;

const getResource = () => {
  myAjax(
    'https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a', 
    'get', 
    {}, 
    function (res) {
      loadAllMovie(res);
      movieData = res;
    }
  );
}

const loadAllMovie = (res) => {
  let list = '';
  res.subjects.forEach(item => {
    if (item)
      list += `<div class="movie-card">
        <img class="card-img-top" src=${item.images.medium} alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">年份: ${item.year}</p>
        <p class="card-text">评分: ${item.rating.average}</p>
        <p class="card-text">导演: ${item.casts.map(
          item => item.name
        )}</p>
        <p class="card-text">演员: ${item.casts.map(
          item => item.name
        )}</p>
        <p class="card-text">类别: ${item.genres}</p>
        <a href=${item.alt} target="_blank" class="btn btn-primary">查看详情</a>
        </div>
      </div>`
      });
    $('.movie-show-lists').html(list);
}

const handleSearch = () => {
  myAjax(
    'https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a', 
    'get', 
    {}, 
    function (res) {
      searchMovie(res);
    }
  );
}

const searchMovie = (res) => {
  const keyword = $('input')[0].value;
  const singleMovie = res.subjects.filter(item => {
    return item.title === keyword;
  });

  if (singleMovie.length) {
    let list = '';
    singleMovie.forEach(item => {
      list = `<div class="movie-card">
      <img class="card-img-top" src=${item.images.medium} alt="Card image cap">
      <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">年份: ${item.year}</p>
      <p class="card-text">评分: ${item.rating.average}</p>
      <p class="card-text">导演: ${item.casts.map(
        item => item.name
      )}</p>
      <p class="card-text">演员: ${item.casts.map(
        item => item.name
      )}</p>
      <p class="card-text">类别: ${item.genres}</p>
      <a href=${item.alt} target="_blank" class="btn btn-primary">查看详情</a>
      </div>
      </div>`
    });
    $('.search-single-movie').css('display','block');
    $('.carousel').css('display','none');
    $('.movie-groups').css('display','none');
    $('.movie-show-lists').css('display','none');
    $('.search-single-movie').html(list);
  } else {
    alert('没有搜到你想搜的电影');
  }
  $('input')[0].value = '';
}

const loadMovieClass = (event) => {
  const movieLists = movieData.subjects.filter(item => {
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
    }
  });

  if (movieLists.length) {
    let list = '';
    movieLists.forEach(item => {
      list += `<div class="movie-card">
        <img class="card-img-top" src=${item.images.medium} alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">年份: ${item.year}</p>
        <p class="card-text">评分: ${item.rating.average}</p>
        <p class="card-text">导演: ${item.casts.map(item => item.name)}</p>
        <p class="card-text">演员: ${item.casts.map(item => item.name)}</p>
        <p class="card-text">类别: ${item.genres}</p>
        <a href=${item.alt} target="_blank" class="btn btn-primary">查看详情</a>
        </div>
      </div>`
    });
    $('.movie-show-lists').html(list);
  } else {
    $('.movie-show-lists').html(`<span class="empty-result">没有该类型的电影</span>`);
  }
}

getResource();

$('body').click(event => {
  let {classList} = event.target;

  if (classList.contains('btn')) {
    handleSearch(res);
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
});

$('.form-control').keydown((e) => {
  if (e.which === 13) {
    handleSearch();
  }
});