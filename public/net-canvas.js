//
// https://utano.jp/demo/2013/09/canvas_draw_line/
//

var canvas; // canvas要素(HTMLCanvasElement)
var ctx; // 2Dコンテキスト(CanvasRenderingContext2D)
var canvasW = 395; // canvas要素の横幅(px)
var canvasH = 350; // canvas要素の縦幅(px)
var oX; // 中心Ｏのx座標（スクリーン座標）
var oY; // 中心Ｏのy座標（スクリーン座標）
var sX = null; // 始点Ｓのx座標（スクリーン座標）
var sY = null; // 始点Ｓのy座標（スクリーン座標）
var eX = null; // 終点Ｅのx座標（スクリーン座標）
var eY = null; // 終点Ｅのy座標（スクリーン座標）
var mouseX; // ドラッグされている位置のx座標
var mouseY; // ドラッグされている位置のy座標

window.onload = function() {
  // canvas要素を取得し、サイズ設定
  canvas = document.getElementById('axisCanvas');
  canvas.width = canvasW;
  canvas.height = canvasH;
  oX = Math.ceil(canvasW / 2);
  oY = Math.ceil(canvasH / 2);

  // 描画のために2Dコンテキスト取得
  ctx = canvas.getContext('2d');

  // 座標軸の初期化
  drawInit();

  // mousedownイベントの登録（始点の確定）
  canvas.onmousedown = function(e) {
    // 座標軸の初期化
    drawInit();

    // クリック位置のスクリーン座標（mouseX, mouseY）を取得
    calcMouseCoordinate(e);
    // 始点、終点のスクリーン座標を設定（終点はクリア）
    sX = mouseX;
    sY = mouseY;
    eX = null;
    eY = null;

    // 始点の描画
    drawStartPoint();
  }

  // mousemoveイベントの登録
  canvas.onmousemove = function(e) {
    // 座標軸の初期化
    drawInit();
    // 始点の描画
    drawStartPoint();
    // 終点の描画
    drawEndPoint();

    // マウス位置のスクリーン座標（mouseX, mouseY）を取得
    calcMouseCoordinate(e);

    // マウス位置の点の描画
    drawTempPoint();
  }

  // mouseupイベントの登録（終点、線分を確定）
  canvas.onmouseup = function(e) {
    // 座標軸の初期化
    drawInit();
    // 始点の描画
    drawStartPoint();

    // クリック位置のスクリーン座標（mouseX, mouseY）を取得
    calcMouseCoordinate(e);
    // 終点のスクリーン座標を設定
    eX = mouseX;
    eY = mouseY;

    // 終点の描画
    drawEndPoint();
  }

  // mouseoutイベントの登録
  canvas.onmouseout = function(e) {
    // 座標軸の初期化
    drawInit();

    // 始点・終点が共に確定していなければ、一旦クリア
    if (sX == null || sY == null || eX == null || eY == null) {
      sX = null;
      sY = null;
      eX = null;
      eY = null;
    }

    // 始点・終点・線分の描画（始点、終点が確定している時のみ）
    drawStartPoint();
    drawEndPoint();
  }
};

function calcMouseCoordinate(e) {
  // クリック位置の座標計算（canvasの左上を基準。-2ずつしているのはborderの分）
  var rect = e.target.getBoundingClientRect();
  mouseX = e.clientX - Math.floor(rect.left) - 2;
  mouseY = e.clientY - Math.floor(rect.top) - 2;
}

// 一度canvasをクリアして座標軸を再描画する
function drawInit() {
  // 一度描画をクリア
  ctx.clearRect(0, 0, canvasW, canvasH);

  // x座標軸を描画
  drawLine(0, oY, canvasW, oY, '#999', 1);
  // y座標軸を描画
  drawLine(oX, 0, oX, canvasH, '#999', 1);

  ctx.fillStyle = "#999";

  // x座標軸の矢印を描画
  ctx.beginPath();
  ctx.moveTo(canvasW, oY);
  ctx.lineTo(canvasW - 10, oY - 7);
  ctx.lineTo(canvasW - 10, oY + 7);
  ctx.fill();

  // y座標軸の矢印を描画
  ctx.beginPath();
  ctx.moveTo(oX, 0);
  ctx.lineTo(oX - 7, 10);
  ctx.lineTo(oX + 7, 10);
  ctx.fill();

  // 原点を表す文字「Ｏ」を描画
  ctx.beginPath();
  var maxWidth = 100;
  ctx.font = "12px 'Verdana'";
  ctx.textAlign = 'right';
  ctx.fillText('Ｏ', oX - 5, oY + 15, maxWidth);
}

// 指定位置に点と座標表示を描画する
function drawPoint(screenX, screenY, color, pointText) {
  if (pointText === undefined) {
    pointText = '';
  }

  ctx.fillStyle = color;

  // 指定位置を中心に円を描画
  ctx.beginPath();
  ctx.arc(screenX, screenY, 5, 0, Math.PI * 2, false);
  ctx.fill();

  // 2次元座標系での座標値を計算（y座標は上方向を正とするため正負を逆にする）
  var x = screenX - oX;
  var y = -(screenY - oY);
  // 座標の表示テキストを描画
  var maxWidth = 100;
  if (x >= 0) {
    // xが正（第一象限、第四象限）の場合は点の左側に座標を描画
    ctx.textAlign = 'right';
    ctx.fillText(pointText + '( ' + x + ', ' + y + ' )', screenX - 10, screenY + 3, maxWidth);
  } else {
    // xが負（第二象限、第三象限）の場合は点の右側に座標を描画
    ctx.textAlign = 'left';
    ctx.fillText(pointText + '( ' + x + ', ' + y + ' )', screenX + 10, screenY + 3, maxWidth);
  }
}

// 指定された2つの点を結ぶ線分を描画する
function drawLine(firstX, firstY, secondX, secondY, color, width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;

  // 線分を描画
  ctx.beginPath();
  ctx.moveTo(firstX, firstY);
  ctx.lineTo(secondX, secondY);
  ctx.stroke();
}

// マウス位置に点を描画する
function drawTempPoint() {
  drawPoint(mouseX, mouseY, '#999');

  if (sX != null && sY != null && eX == null && eY == null) {
    // 始点が確定していて、終点が確定していない場合に線分を描画
    drawLine(sX, sY, mouseX, mouseY, '#999', 1);
  }
}

// 始点を描画する
function drawStartPoint() {
  if (sX != null && sY != null) {
    drawPoint(sX, sY, '#000', 'Ｓ');
  }
}

// 終点を描画する
function drawEndPoint() {
  if (sX != null && sY != null && eX != null && eY != null) {
    drawPoint(eX, eY, '#000', 'Ｅ');
    drawLine(sX, sY, eX, eY, '#000', 3);
  }
}
