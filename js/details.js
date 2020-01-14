const url = location.search;
const id = url.replace(/[^0-9]/ig,"");

const getSpecificResource = () => {
  myAjax(
    `https://api.douban.com/v2/movie/subject/${id}?apikey=0df993c66c0c636e29ecbb5344252a4a`, 
    'get', 
    {}, 
    function (res) {
      loadSpecificMovie(res);
    }
  );
}

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
    <h4>剧情简介</h4>
    <p class="card-text">${res.summary}</p>`;
  $('.movie-details').html(list);
};

getSpecificResource();
