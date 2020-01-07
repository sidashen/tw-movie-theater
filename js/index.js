$.ajax({
  url: 'https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a',
  type: 'get',
  dataType: 'jsonp',  // 请求方式为jsonp
  crossDomain: true,
  success: function (res) {
    loadAllMovie(res);
  },
});

function loadAllMovie(res) {
  let list = '';
  res.subjects.forEach(item => {
      list += `<div class="movie-card" style="width: 18rem;">
        <img class="card-img-top" src=${item.images.medium} alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">年份: ${item.year}</p>
        <p class="card-text">评分: ${item.rating.average}</p>
        <p class="card-text">导演: ${item.directors[2]}</p>
        <p class="card-text">演员: ${item.casts[1].name}</p>
        <p class="card-text">类别: ${item.genres}</p>
        <a href=${item.alt} target="_blank" class="btn btn-primary">查看详情</a>
        </div>
        </div>`
      });
    $('.movie-show-lists').html(list)
}






// const loadAllMovie = () => {




//   $.get("https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a", 
  
  
  
//   res => {
//     let list = '';
//     res.forEach(item => {
//       list += `<div class="movie-card" style="width: 18rem;">
//         <img class="card-img-top" src=${item.images.medium} alt="Card image cap">
//         <div class="card-body">
//         <h5 class="card-title">${item.title}</h5>
//         <p class="card-text">年份: ${item.year}</p>
//         <p class="card-text">评分: ${item.rating.average}</p>
//         <p class="card-text">导演: ${item.directors.name}</p>
//         <p class="card-text">演员: ${item.casts.name}</p>
//         <p class="card-text">类别: ${item.genres}</p>
//         <a href=${item.alt} target="_blank" class="btn btn-primary">查看详情</a>
//         </div>
//         </div>`
//       })
//       $('.movie-show-lists').html(list)
//   });
// }

// loadAllMovie();



