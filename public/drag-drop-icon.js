(function(){

    //要素の取得
    var elements = document.getElementsByClassName("drag-and-drop");

    //要素内のクリックされた位置を取得するグローバル（のような）変数
    var x;
    var y;
    var dragImgEl;

    //マウスが要素内で押されたとき、又はタッチされたとき発火
    for(var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("dragstart", mdown, false);
    }

    //マウスが押された際の関数
    function mdown(e) {

        //クラス名に .drag を追加
        this.classList.add("drag");

        dragImgEl = document.createElement('span');

        dragImgEl.setAttribute('style',
          'position: absolute; display: block; top: 0; left: 0; width: 0; height: 0;' );

        document.body.appendChild(dragImgEl);

        e.dataTransfer.setDragImage(dragImgEl, 0, 0);

        //要素内の相対座標を取得
        x = e.pageX - this.offsetLeft;
        y = e.pageY - this.offsetTop;

        //ムーブイベントにコールバック
        document.addEventListener("dragover", mmove, false);
    }

    //マウスカーソルが動いたときに発火
    function mmove(e) {
        e.dataTransfer.setDragImage(dragImgEl, 0, 0);

        //ドラッグしている要素を取得
        var drag = document.getElementsByClassName("drag")[0];

        //マウスが動いた場所に要素を動かす
        drag.style.top  = e.pageY - y + "px";
        drag.style.left = e.pageX - x + "px";

        document.addEventListener("dragend", mup, false);

    }

    //マウスボタンが上がったら発火
    function mup(e) {
        var drag = document.getElementsByClassName("drag")[0];

        //ムーブベントハンドラの消去
        document.removeEventListener("dragover", mmove, false);
        document.removeEventListener("dragend", mup, false);

        document.body.removeChild(dragImgEl);

        //クラス名 .drag も消す
        drag.classList.remove("drag");
    }

})()
