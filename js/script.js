
key2="npub1sjcvg64knxkrt6ev52rywzu9uzqakgy8ehhk8yezxmpewsthst6sw3jqcw";


function CopyToClipboard1() {
    if (navigator.clipboard) { // navigator.clipboardが使えるか判定する
        return navigator.clipboard.writeText(key2).then(function () { // クリップボードへ書きむ
            const jsFrame = new JSFrame();
            jsFrame.showToast({
                html: 'クリップボードにコピーしたよ', align: 'top', duration: 2000
            });
        })
      } else {
        key2.select() // inputタグを選択する
        document.execCommand('copy') // クリップボードにコピーする
        const jsFrame = new JSFrame();
        jsFrame.showToast({
            html: 'クリップボードにコピーしたよ', align: 'top', duration: 2000
        });
      }
    }
  