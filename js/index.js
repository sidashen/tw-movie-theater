getResource();

function getResource() {
  myAjax(
    'https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a', 
    'get', 
    {}, 
    function (res) {
      loadAllMovie(res);
      loadLoveMovie(res);
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
    $('.movie-show-list div').each(function(index, element) {
      var idx=index+1;
      if (!(idx%5)){
        $(this).after('<br/>');
  }
  });
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

const loadLoveMovie = (res) => {
  const loveMovieLists = res.subjects.filter(item => {
    return item.genres.includes('剧情');
  });
  if (loveMovieLists.length) {
    let list = '';
    loveMovieLists.forEach(item => {
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
  }
}

$('body').click(event => {
  let {classList} = event.target;

  if (classList.contains('btn')) {
    handleSearch();
  }
  if (classList.contains('story')) {
    loadLoveMovie();
  }
});

$('input')[0].keydown((e) => {
  if (e.which === 13) {
    handleSearch();
  }
});







