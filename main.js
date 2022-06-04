
// 取得したAPIキー
var API_KEY = "b9ad1d858325068c33f68638efdb9b5d";

// b4e04607cef1a5dc454c4a90f3542ae7


// ロード時に実行(デフォルトでは東京の天気予報を表示)
function proc(){
  // ページ読み込み時に実行したい処理

  // 追加した部分1
  if (document.getElementById("searchLat").value) {
    document.getElementById("searchLat").value = null;
  }
  if (document.getElementById("searchLon").value) {
    document.getElementById("searchLon").value = null;
  }

  if(document.getElementById("weather")) {
    crearResult();
  }
  var lat;
  var lon;
  var city_name;
  if (document.getElementById("東京").checked) {
    lat = "35.66488";
    lon = "139.77473";
    city_name = "東京";

  } else if (document.getElementById("大阪").checked) {
    lat = "34.69510";
    lon = "135.49555";
    city_name = "大阪";

  } else if (document.getElementById("仙台").checked) {
    lat = "38.26544";
    lon = "140.85414";
    city_name = "仙台";
  } else if (document.getElementById("札幌").checked) {
    lat = "43.05515";
    lon = "141.23131";
    city_name = "札幌"; 
    console.log(city_name);
  } else if (document.getElementById("那覇").checked) {
    lat = "26.206938";
    lon = "127.67377";
    city_name = "那覇";
    console.log(city_name);
  } else if (document.getElementById("広島").checked) {
    lat = "34.42273";
    lon = "132.44699";
    city_name = "広島";
    console.log(city_name);
  } else if (document.getElementById("福岡").checked) {
    lat = "33.59362";
    lon = "130.37654";
    city_name = "福岡";
    console.log(city_name);
  } else if (document.getElementById("名古屋").checked) {
    lat = "35.13243";
    lon = "132.76239";
    city_name = "名古屋";
    console.log(city_name);
  } else if (document.getElementById("松山").checked) {
    lat = "33.86467";
    lon = "127.67377";
    city_name = "松山";
    console.log(city_name);
  } else if (document.getElementById("新潟").checked) {
    lat = "37.83757";
    lon = "139.15647";
    city_name = "新潟";
    console.log(city_name);
  } 
  showWeather(lat, lon, city_name);
}


//3時間ごとの天気を取得
//緯度経度の検索をした場合
function search() {
  // 追加した部分2
  crearResult();

  // 検索した緯度経度をlat, lonに代入
  var lat = document.getElementById("searchLat").value;
  var lon = document.getElementById("searchLon").value;
  var city_name = "緯度" + lat + " 経度" + lon;
  
  showWeather(lat, lon,city_name);
  
}

function showWeather(lat, lon, city_name) {
  result_title.innerHTML = "<h3>" + city_name + "の天気予報<h3>";
  


  $.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY + "&format=json&jsoncallback=showResults&lang=ja&units=metric")
  .done(function(data) {
    for (var i = 0; i < 40; i++){
      var time = data.list[i].dt_txt;
      var temp = data.list[i].main.temp;
      var weather = data.list[i].weather[0].description;
      var icon = data.list[i].weather[0].icon;

      if (icon == "01n" || icon == "01d") { //晴れのとき
        icon_src = "https://www.illust-box.jp/db_img/sozai/00021/210704/watermark.jpg";
      } else if (icon == "03d" || icon == "03n" || icon == "04d" || icon == "04n" || icon == "02d") { //曇りのとき
        icon_src = "https://www.illust-box.jp/db_img/sozai/00021/211115/watermark.jpg";
      }else if (icon == "10d" || icon == "10n") { // 小雨のとき
        icon_src = "https://www.illust-box.jp/db_img/sozai/00021/212130/watermark.jpg";
      }
                    
      var result = document.getElementById('weather');
      var new_element_1 = document.createElement('p');
      new_element_1.textContent = time;
      result.appendChild(new_element_1);

      var new_element_2 = document.createElement('p');
      new_element_2.className = "weather";
      new_element_2.textContent = "　　気温 " + temp;
      var img_element = document.createElement('img');
      img_element.className = "img";
      img_element.src = icon_src;
      img_element.align = "left";
      new_element_2.appendChild(img_element);
      result.appendChild(new_element_2);
        
    }

  });

}

function crearResult() {
  for (var i = 0; i < 40; i++) {
    var node = document.getElementById("weather");
    // nodeにChildノードがあれば削除
    while (node.childNodes[0]) {
      node.removeChild(node.lastChild);
    }
  }
}
