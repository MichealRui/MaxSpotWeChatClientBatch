/**
 * Created by cabbage on 2017/8/23.
 */
/**
 * @file 访客二维码页面地图操作API  by weiliangfeng 2017-3-30
 */
export function fkmapApi() {
    // 访客地点坐标定义
    var areaPoint = {
        'gsjhm': {
            'area': '北京',
            'areaName': '怪兽家便利店（华贸店）',
            'mapPointW': '116.486622',
            'mapPointH': '39.91616'
        },
    };
    // 起点坐标，传定位获取的坐标
    // var p1 = new BMap.Point(119.205624, 26.086131);
    // 目标坐标
    // var p2 = new BMap.Point(areaPoint.areaFy.mapPointW, areaPoint.areaFy.mapPointH);

    return {
        // 定位坐标描点
        drawMapPoint: function (mapId, maptitId, areaName, pointW, pointH) {
            var map = new BMap.Map(mapId);
            // map.enableScrollWheelZoom(true);
            // 取得定位
            function drawpoint(x, y, accuracy) {
                var ggPoint = new BMap.Point(x, y);
                // 地图
                map.centerAndZoom(ggPoint, 15);
                map.clearOverlays();
                var marker = new BMap.Marker(ggPoint);
                map.addOverlay(marker);
                // 获取地点名称
                var gc = new BMap.Geocoder();
                gc.getLocation(ggPoint, function (rs) {
                    var addComp = rs.addressComponents;
                    var html = rs.address;
                    if (accuracy !== null) {
                        html = html + accuracy;
                    }
                    console.log(html);
                });

            }

            // 坐标转换完之后的回调函数
            var translateCallback = function (data) {
                if (data.status === 0) {
                    var x = data.points[0].lng;
                    var y = data.points[0].lat;
                    drawpoint(x, y, null);
                }
            };
            // 百度地图坐标转换(使用原始坐标值时候需要做转换)
            function translatePoint(point) {
                var convertor = new BMap.Convertor();
                var pointArr = [];
                pointArr.push(point);
                convertor.translate(pointArr, 1, 5, translateCallback);
            }

            // 返回定位
            if (pointW !== ('' || null) && pointH !== ('' || null)) {
                var newPoint = new BMap.Point(pointW, pointH);
                map.centerAndZoom(newPoint, 15);
                drawpoint(pointW, pointH, null);
                // setTimeout(translatePoint(newPoint), 100);
            } else {
                if (areaName !== ('' || null)) {
                    var x = areaPoint[areaName].mapPointW;
                    var y = areaPoint[areaName].mapPointH;
                    drawpoint(x, y, null);
                } else {
                    // 百度地图定位API获取定位
                    var geolocation = new BMap.Geolocation();
                    geolocation.getCurrentPosition(function (result) {
                        if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
                            var x = result.point.lng;
                            var y = result.point.lat;
                            var accuracy = result.accuracy;
                            drawpoint(x, y, accuracy);
                        } else {
                            alert('定位失败：' + this.getStatus());
                        }
                    }, {enableHighAccuracy: true});
                }
            }
        },
        // 驾车方案
        routeDrive: function (mapId, pointW, pointH, areaName, resultId) {
            // var dom = $('#' + resultId);
            // dom.empty();
            var map = new BMap.Map(mapId);
            // 起点坐标
            var p1 = new BMap.Point(pointW, pointH);
            // 目标坐标
            var p2 = new BMap.Point(areaPoint[areaName].mapPointW, areaPoint[areaName].mapPointH);
            map.clearOverlays();
            // var marker = new BMap.Marker(p1);
            // map.addOverlay(marker);
            map.centerAndZoom(p1, 15);
            // 三种驾车策略：最少时间，最短距离，避开高速 0 1 2
            var routePolicy = [
                BMAP_DRIVING_POLICY_LEAST_TIME,
                BMAP_DRIVING_POLICY_LEAST_DISTANCE,
                BMAP_DRIVING_POLICY_AVOID_HIGHWAYS
            ];
            search(p1, p2, routePolicy[0]);
            function search(p1, p2, route) {
                var driving = new BMap.DrivingRoute(map, {
                    renderOptions: {map: map, panel: resultId, autoViewport: true}, policy: route
                });
                driving.search(p1, p2);
            }
        },
        // 步行方案
        routeWalking: function (mapId, pointW, pointH, areaName, resultId) {
            // var dom = $('#' + resultId);
            // dom.empty();
            var map = new BMap.Map(mapId);
            // 起点坐标
            var p1 = new BMap.Point(pointW, pointH);
            // 目标坐标
            var p2 = new BMap.Point(areaPoint[areaName].mapPointW, areaPoint[areaName].mapPointH);
            map.clearOverlays();
            // var marker = new BMap.Marker(p1);
            // map.addOverlay(marker);
            map.centerAndZoom(p1, 15);
            var walking = new BMap.WalkingRoute(map, {
                renderOptions: {map: map, panel: resultId, autoViewport: true}
            });
            walking.search(p1, p2);
        },
        // 公交方案
        routeBus: function (mapId, pointW, pointH, areaName, resultId) {
            // var dom = $('#' + resultId);
            // dom.empty();
            var map = new BMap.Map(mapId);
            // 起点坐标
            var p1 = new BMap.Point(pointW, pointH);
            // 目标坐标
            var p2 = new BMap.Point(areaPoint[areaName].mapPointW, areaPoint[areaName].mapPointH);
            map.clearOverlays();
            // var marker = new BMap.Marker(p1);
            // map.addOverlay(marker);
            map.centerAndZoom(p1, 15);
            var transit = new BMap.TransitRoute(map, {
                renderOptions: {map: map, panel: resultId}
            });
            transit.search(p1, p2);
        }
    };
}


/*
 *
 *
 * <div class="fk-maparea">
 <h4 class="fk-maptit" id="fk-maptit">目的地址...</h2>
 <div class="fk-baidumap" id="baidu_map"></div>
 <span class="fk-mapview">点击地图查看路线<br>(受手机设置影响，定位路线仅供参考)</span>
 <a class="fk-mapclk" href="showMap.html?workCode=kjy4"></a>
 </div>
 *
 *
 * // 定位地图描点 *需传参数：地图DOM，获得地址DON, 地点简称，坐标（坐标空值则调用H5定位方法获取坐标）*
 // fkmapApi.drawMapPoint('baidu_map', 'fk-maptit', null, null, null);
 var resultPoint = 'kjy4';
 fkmapApi.drawMapPoint('baidu_map', 'fk-maptit', resultPoint, null, null);

 * */