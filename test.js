
    $('table').click(function () {
      var index = layer.open({
          type: 2
          ,content: '正在解码视频, 可能需要几秒钟的时间',
          shadeClose: false
      });
      $.get(
          '/vod/getPlayUrl',
          {id:parent.player_data.vod_id},
          function (res) {
              layer.close(index);
              res = JSON.parse(res);
              if (res.code != 0 ) {
                  layer.open({
                      content: '解析视频超时, 请刷新重试'
                      ,skin: 'msg'
                      ,time: 2 //2秒后自动关闭
                  });
              } else {
                  parent.MacPlayer.PlayUrl = res.data;
                  parent.MacPlayer.IsManual = '0';
                  parent.MacPlayer.Show();
              }
          }
      );
  });