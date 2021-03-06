﻿var json = [
    {
        "latitude": "34.49705",
        "lbs": "8992.0",
        "longitude": "108.89866",
        "state": "-1"
    },
    {
        "latitude": "33.9058",
        "lbs": "9280.0",
        "longitude": "108.85658",
        "state": "-1"
    },
    {
        "latitude": "33.32385",
        "lbs": "9600.0",
        "longitude": "108.85014",
        "state": "-1"
    },
    {
        "latitude": "32.77692",
        "lbs": "9888.0",
        "longitude": "108.82363",
        "state": "-1"
    },
    {
        "latitude": "32.27338",
        "lbs": "10112.0",
        "longitude": "108.53092",
        "state": "-1"
    },
    {
        "latitude": "31.77065",
        "lbs": "10368.0",
        "longitude": "108.14871",
        "state": "-1"
    },
    {
        "latitude": "31.27201",
        "lbs": "10688.0",
        "longitude": "107.73303",
        "state": "-1"
    },
    {
        "latitude": "30.74968",
        "lbs": "11072.0",
        "longitude": "107.44533",
        "state": "-1"
    },
    {
        "latitude": "30.26029",
        "lbs": "11744.0",
        "longitude": "107.2419",
        "state": "-1"
    },
    {
        "latitude": "29.91514",
        "lbs": "12288.0",
        "longitude": "106.92412",
        "state": "-1"
    },
    {
        "latitude": "29.72024",
        "lbs": "12800.0",
        "longitude": "106.64197",
        "state": "1"
    }
];


var map, graphicsLayer, flightTrackLayer, backPliotGraphicsLayer, backAirCraftGraphicsLayer, aircraftDensityGraphicsLayer,
            flightLineDensityGraphicsLayer, backImgGraphicsLayer, labelGraphicsLayer, aogGraphicsLayer, alarmGraphicsLayer,airportMonitorGraphicsLayer;
        var highLineLayr, radarLayer, weatherLayer;
        var linePlanGraphic;
        var ID;
        var zhccPoint;
        var zuckPoint;
        var kts = 1.852;
        var ft = 0.3048;
        var alarmID;
        var alarmFlag;
        var boolOpen=true;
        var wkidValue = new esri.SpatialReference({wkid:102100});//墨卡托投影
        require([
          "dojo/_base/Color",
          "dojo/io/script",
          "esri/map",
          "esri/InfoTemplate",
          "esri/layers/GraphicsLayer",
          "esri/layers/ArcGISDynamicMapServiceLayer",
          "esri/graphic",
          "esri/geometry/Point",
          "esri/geometry/Polyline",
          "esri/geometry/Polygon",
          "esri/symbols/SimpleMarkerSymbol",
          "esri/symbols/SimpleLineSymbol",
          "esri/symbols/SimpleFillSymbol",
          "esri/symbols/PictureMarkerSymbol",
          "esri/symbols/Font",
          "esri/symbols/TextSymbol",
          "esri/geometry/webMercatorUtils",
          "dojo/domReady!"
        ], function (Color,script,
        		Map, InfoTemplate, GraphicsLayer,ArcGISDynamicMapServiceLayer,
          Graphic, Point, Polyline, Polygon,
          SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, PictureMarkerSymbol, Font, TextSymbol,
          webMercatorUtils) {
            //工具栏样式控制
            $("#tools li").click(function () {
                if ($(this).hasClass("toolselected")) {
                    $(this).removeClass("toolselected");
                    $(this).addClass("untoolselected");
                } else {
                    $(this).addClass("toolselected");
                    $(this).removeClass("untoolselected");
                }
            })
            //地图及图层初始化
            var initialExtent = new esri.geometry.Extent({ "xmin": 9039953.326262107, "ymin": 2176894.187329371, "xmax": 15061968.162679834, "ymax": 5214807.439494609, "spatialReference": { "wkid": 102100 } });
            map = new Map("map", {
                //basemap: "dark-gray",
                wrapAround180: true,
                logo: false,
                isZoomSlider:false,
                extent: initialExtent
            });


            gLayer = new GraphicsLayer();
            fLayer = new GraphicsLayer();
            graphicsLayer = new GraphicsLayer();
            flightTrackLayer = new GraphicsLayer();
            backPliotGraphicsLayer = new GraphicsLayer();
            backAirCraftGraphicsLayer = new GraphicsLayer();
            aircraftDensityGraphicsLayer = new GraphicsLayer();
            backImgGraphicsLayer = new GraphicsLayer();
            labelGraphicsLayer = new GraphicsLayer();
            aogGraphicsLayer = new GraphicsLayer();
            alarmGraphicsLayer = new GraphicsLayer();
            airportMonitorGraphicsLayer = new GraphicsLayer();
            
            flightLineDensityGraphicsLayer = new ArcGISDynamicMapServiceLayer("http://123.57.253.58:6080/arcgis/rest/services/westMap/MapServer");
            var mapLayer = new ArcGISDynamicMapServiceLayer("http://123.57.253.58:6080/arcgis/rest/services/chinaWestMap/MapServer");
            radarLayer = new ArcGISDynamicMapServiceLayer("http://123.57.253.58:6080/arcgis/rest/services/weatherChina/MapServer");
            highLineLayr = new ArcGISDynamicMapServiceLayer("http://123.57.253.58:6080/arcgis/rest/services/WorldMap_Arinc/MapServer");
            weatherLayer = new ArcGISDynamicMapServiceLayer("http://123.57.253.58:6080/arcgis/rest/services/highweather/MapServer");

            weatherLayer.hide();
            radarLayer.hide();
            highLineLayr.hide();
            backPliotGraphicsLayer.hide();
            backAirCraftGraphicsLayer.hide();
            aircraftDensityGraphicsLayer.hide();
            flightLineDensityGraphicsLayer.setVisibleLayers([]);

            map.addLayer(mapLayer);
            map.addLayer(weatherLayer);
            map.addLayer(radarLayer);
            map.addLayer(highLineLayr);
            map.addLayer(flightTrackLayer);
            map.addLayer(flightLineDensityGraphicsLayer);
            map.addLayer(aircraftDensityGraphicsLayer);
            map.addLayer(aogGraphicsLayer);
            map.addLayer(airportMonitorGraphicsLayer);
            map.addLayer(backPliotGraphicsLayer);
            map.addLayer(backAirCraftGraphicsLayer);
            map.addLayer(backImgGraphicsLayer);          
            map.addLayer(graphicsLayer);
            map.addLayer(gLayer);
            map.addLayer(fLayer);
            map.addLayer(alarmGraphicsLayer);
            map.addLayer(labelGraphicsLayer);
            //事件处理
            //在飞飞机点击事件
            dojo.connect(graphicsLayer, "onClick", graClick);
            //打开气泡
            dojo.connect(aogGraphicsLayer, "onMouseOver", showTooltip);
            //关闭气泡
            dojo.connect(aogGraphicsLayer, "onMouseOut", closeDialog);
            //打开机场监控
            dojo.connect(airportMonitorGraphicsLayer, "onClick", function () { $("#flightdetail").slideDown(); });
            //飞机告警事件
            dojo.connect(alarmGraphicsLayer, "onClick", openWin);
            map.on("load", function () {
                var div = document.getElementById("map_zoom_slider").style;
                div.visibility = "collapse";
            });

            document.onkeydown = function (event) {
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if (e && e.keyCode == 13) {
                    alarmFlag = true;
                }
            };


            //点热度图符号
            var sms = SimpleMarkerSymbol;
            var sls = SimpleLineSymbol;
            var small = new sms('circle', 5,
                        new sls(sls.STYLE_SOLID, new Color([255, 125, 0, 0.25]), 10),
                        new Color([255, 125, 0, 0.5]));
            var medium = new sms('circle', 10,
                                      new sls(sls.STYLE_SOLID, new Color([148, 0, 211, 0.25]), 15),
                                      new Color([148, 0, 211, 0.5]));
            var large = new sms('circle', 20,
                        new sls(sls.STYLE_SOLID, new Color([255, 0, 0, 0.25]), 15),
                        new Color([255, 0, 0, 0.5]));
            //备份飞机符号定义
            var backAirCraftSymbol = new PictureMarkerSymbol("images/backaircraft.png", 24, 24);
            //backAirCraftSymbol.setOffset(10, 0);
            //备份机组符号定义
            var backPliotSymbol = new PictureMarkerSymbol("images/backpliot.png", 24, 24);
            //backPliotSymbol.setOffset(-10, 0);
            //停场飞机符号定义
            var aogSymbol = new PictureMarkerSymbol("images/aircraft-f24.png", 24, 24);
            //机场监控符号定义
            var symbgSymbol = new PictureMarkerSymbol("images/symbg.png", 24, 24);
            //气泡定义
            var infoTemplate = new InfoTemplate();
            infoTemplate.setTitle("flight");
            infoTemplate.setContent("<b>2007 :D: </b><br/>" +
                                    "<b>2007 density: </b><br/><br/>" +
                                    "<b>2000: </b><br/>" +
                                    "<b>2000 density: </b>");

            //备份机场及本分飞行员
            var zhccPoint;
            var zuckPoint;
            var zhlyPoint;
            zhccPoint = webMercatorUtils.geographicToWebMercator(new Point(113.841111, 34.519444, map.spatialReference));
            zuckPoint = webMercatorUtils.geographicToWebMercator(new Point(106.641389, 29.718889, map.spatialReference));
            zhlyPoint = webMercatorUtils.geographicToWebMercator(new Point(112.387778, 34.741389, map.spatialReference));
            
            ////示例机场数据
            aircraftDensityGraphicsLayer.add(new esri.Graphic(zhccPoint, large, null));
            aircraftDensityGraphicsLayer.add(new esri.Graphic(zuckPoint, large, null));
            aircraftDensityGraphicsLayer.add(new esri.Graphic(webMercatorUtils.geographicToWebMercator(new Point(118.514315, 31.443188, map.spatialReference)), medium, null));
            aircraftDensityGraphicsLayer.add(new esri.Graphic(webMercatorUtils.geographicToWebMercator(new Point(119.244418, 18.181053, map.spatialReference)), medium, null));
            aircraftDensityGraphicsLayer.add(new esri.Graphic(webMercatorUtils.geographicToWebMercator(new Point(113.183500, 23.233200, map.spatialReference)), small, null));
            aircraftDensityGraphicsLayer.add(new esri.Graphic(webMercatorUtils.geographicToWebMercator(new Point(113.405505, 32.510953, map.spatialReference)), small, null));
            aircraftDensityGraphicsLayer.add(new esri.Graphic(webMercatorUtils.geographicToWebMercator(new Point(100.454541, 21.582547, map.spatialReference)), small, null));

            backAirCraftGraphicsLayer.add(new esri.Graphic(webMercatorUtils.geographicToWebMercator(new Point(113.405505, 32.510953, map.spatialReference)), backAirCraftSymbol, null));
            backAirCraftGraphicsLayer.add(new esri.Graphic(webMercatorUtils.geographicToWebMercator(new Point(100.454541, 21.582547, map.spatialReference)), backAirCraftSymbol, null));

            backPliotGraphicsLayer.add(new esri.Graphic(webMercatorUtils.geographicToWebMercator(new Point(118.514315, 31.443188, map.spatialReference)), backPliotSymbol, null));
            backPliotGraphicsLayer.add(new esri.Graphic(webMercatorUtils.geographicToWebMercator(new Point(113.183500, 23.233200, map.spatialReference)), backPliotSymbol, null));
           
            aogGraphicsLayer.add(new esri.Graphic(zuckPoint, aogSymbol, null));
            aogGraphicsLayer.add(new esri.Graphic(zhccPoint, aogSymbol, null));

            airportMonitorGraphicsLayer.add(new esri.Graphic(zhlyPoint, symbgSymbol, null));




            var point = new esri.geometry.Point(json[0].longitude,json[0].latitude,map.spatialReference);
            var webMercator = webMercatorUtils.geographicToWebMercator(point);
            var symbolOff =  new PictureMarkerSymbol("images/aircraft-g16.png", 16, 16);
            var graphic1 = new esri.Graphic(webMercator,symbolOff,null,null);
            fLayer.add(graphic1);
            var array,arr;
            arr = Array();
            for(var i=0;i<json.length;i++){
                array = new Array();
                var d = json[i];
                var x = d["longitude"];
                var y = d["latitude"];
                array.push(x);
                array.push(y);
                arr.push(array);
            }
            if(arr.length>0){
                var polyline = new esri.geometry.Polyline(arr);
                var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SHORTDOT, new dojo.Color([88,167,102]), 2);
                var graphic = new esri.Graphic(polyline, symbol);
                gLayer.add(graphic);
                gLayer.hide();
            }



            //飞机编号绑定事件
            $('.flightNo_').bind('click',function () {
                var point = new esri.geometry.Point(json[0].longitude,json[0].latitude,wkidValue);
                var webMercator = webMercatorUtils.geographicToWebMercator(point);
                map.setScale(12800000);
                map.centerAt(webMercator);
                gLayer.show();
            });

            //航迹处理
            function graClick(event) {

                var obj = event.graphic;
                ID = obj.attributes.ID;

                flightTrackLayer.clear();

                var commonTime = (new Date()).valueOf();

                // http://data.flightradar24.com/_external/planedata_json.1.4.php?
                var furl = "http://123.57.253.58:909/FlightHandler.ashx?flight=" + ID + "&_=" + commonTime;
                
                $.ajax({
                    type: "GET",
                    url: ctx+"/doGet.do",
                    data: {url:furl},
                    dataType: "json",
                    success: function(response){
                      var pointArray = new Array();
                      var flightTrack = response.trail; 
                      flghtObj = response;
                      for (var i = 0; i < flightTrack.length; i = i + 1) {
                          var lat = flightTrack[i].lat;
                          var lon = flightTrack[i].lng;
                          var latlng = new Point(parseFloat(lon), parseFloat(lat), map.spatialReference);
                          var webMercator = webMercatorUtils.geographicToWebMercator(latlng);
                          pointArray.push(webMercator);
                      }
                      pointArray.unshift(event.graphic.geometry);

                      var airPlanLineColor = new esri.Color("#CA0013");
                      var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, airPlanLineColor, 2);//STYLE_DOT
                      var airPlanLine = new esri.geometry.Polyline(map.spatialReference);
                      airPlanLine.addPath(pointArray);
                      linePlanGraphic = new esri.Graphic(airPlanLine, symbol);
                      flightTrackLayer.add(linePlanGraphic);
                    },
                    error: function(obj){
                    }
                });




//                dojo.xhrGet({
//                    url: furl,
//                    handleAs: "json",
//                    preventCache: true,
//                    load: function (response) {
//                        var pointArray = new Array();
//                        var flightTrack = response.trail; 
//                        flghtObj = response;
//                        for (var i = 0; i < flightTrack.length; i = i + 1) {
//                            var lat = flightTrack[i].lat;
//                            var lon = flightTrack[i].lng;
//                            var latlng = new Point(parseFloat(lon), parseFloat(lat), map.spatialReference);
//                            var webMercator = webMercatorUtils.geographicToWebMercator(latlng);
//                            pointArray.push(webMercator);
//                        }
//                        pointArray.unshift(event.graphic.geometry);
//
//                        var airPlanLineColor = new esri.Color("#CA0013");
//                        var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, airPlanLineColor, 2);//STYLE_DOT
//                        var airPlanLine = new esri.geometry.Polyline(map.spatialReference);
//                        airPlanLine.addPath(pointArray);
//                        linePlanGraphic = new esri.Graphic(airPlanLine, symbol);
//                        flightTrackLayer.add(linePlanGraphic);
//
//                        return response;
//                    },
//                    error: function (response, ioArgs) {
//                        console.log("xhr get failed:", response);
//                        return response;
//                    }
//
//                });

            }

            //数据刷新定时器
            //timerFun();
            var realTimeInfo = window.setInterval(timerFun, 5000);

            function timerFun() {
                updateExt(map.extent);
            }
            //定时获取flightradar数据
            function updateExt(extent) {

                var symbol;
                //if (map.getLevel() < 6) {
                if(map.getScale()>16000000){
                    labelGraphicsLayer.hide();
                    backImgGraphicsLayer.hide();
                }
                else {
                    labelGraphicsLayer.show();
                    backImgGraphicsLayer.show();
                }
                var mapExt = webMercatorUtils.webMercatorToGeographic(extent);
                var bounds = "bounds=" + mapExt.ymax + "," + mapExt.ymin + "," + mapExt.xmin + "," + mapExt.xmax;

                var furl = "http://123.57.253.58:909/DataHandlerPN.ashx?" + bounds + "&faa=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=900&gliders=1&stats=1&";
                
                $.ajax({
                    type: "GET",
                    url: ctx+"/doGet.do",
                    data: {url:furl},
                    dataType: "json",
                    success: function(response){
                      graphicsLayer.clear();
                      backImgGraphicsLayer.clear();
                      labelGraphicsLayer.clear();
                      alarmGraphicsLayer.clear();

                      for (var i = 0; i < response.flights.length; i++) {

                          if (alarmID == null && alarmFlag) {
                              alarmID = response.flights[i].ID;
                          }
                          var latlng = new Point(parseFloat(response.flights[i].lon), parseFloat(response.flights[i].lat), map.spatialReference);
                          var webMercator = webMercatorUtils.geographicToWebMercator(latlng);

                          var imgSymbol;
                         
                          if (alarmFlag && alarmID == response.flights[i].ID) {
                              imgSymbol = new PictureMarkerSymbol("images/biaopai-b.png", 92, 54);
                              symbol = new PictureMarkerSymbol("images/aircraft-a24.png", 24, 24);
                              var alarmymbol = new PictureMarkerSymbol("images/alarm.gif", 30, 30);                           
                              alarmGraphicsLayer.add(new esri.Graphic(webMercator, alarmymbol));
                          }
                          else {
                              imgSymbol = new PictureMarkerSymbol("images/biaopai-a.png", 92, 54);
                              if (map.getScale() > 16000000) {
                                  symbol = new PictureMarkerSymbol("images/aircraft-g16.png", 16, 16);
                              }
                              else {
                                  symbol = new PictureMarkerSymbol("images/aircraft-g24.png", 24, 24);
                              }                               
                          }
                          symbol.setAngle(response.flights[i].track);

                          var gra = new esri.Graphic(webMercator, symbol, { "regId": response.flights[i].flightID, "ID": response.flights[i].ID, "speed": response.flights[i].speed, "track": response.flights[i].track, "altitude": response.flights[i].altitude, "squawk": response.flights[i].squawk, "lon": response.flights[i].lon, "lat": response.flights[i].lat });
                          graphicsLayer.add(gra);

                          var imgSymbol
                          if (alarmFlag && alarmID == response.flights[i].ID) {
                              imgSymbol = new PictureMarkerSymbol("images/biaopai-b.png", 92, 54);
                              if (boolOpen) {
                                  openWin();
                                  boolOpen = false;
                              }
                          }
                          else {
                              imgSymbol = new PictureMarkerSymbol("images/biaopai-a.png", 92, 54);
                          }
                          imgSymbol.setOffset(15, 30);
                          var imgGra = new esri.Graphic(webMercator, imgSymbol, null);
                          backImgGraphicsLayer.add(imgGra);
                          var font = new Font("12px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLDER);
                          var textSymbol = new TextSymbol(response.flights[i].regID.replace('-', ''), font, new Color([255, 255, 255]));
                          textSymbol.setOffset(-11, 44);

                          var fontAttr = new Font("12px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLDER);
                          var textSymbolAttr = new TextSymbol(parseInt(Number(response.flights[i].altitude * ft, "0")) +"m" +"  " + parseInt(Number(response.flights[i].speed * kts, "0"))+"km/h", fontAttr, new Color([255, 255, 255]));
                          textSymbolAttr.setOffset(15, 27);

                          var attrGra = new esri.Graphic(webMercator, textSymbolAttr, null);
                          var labelGra = new esri.Graphic(webMercator, textSymbol, null);
                          labelGraphicsLayer.add(labelGra);
                          labelGraphicsLayer.add(attrGra);

                          if (ID == response.flights[i].ID) {
                              if (linePlanGraphic) {
                                  linePlanGraphic.geometry.insertPoint(0, 0, webMercator);
                                  flightTrackLayer.redraw();
                              }
                          }
                      }
                    },
                    error: function(obj){
                    }
                });
                
                
//                dojo.xhrGet({
//                    url: furl,
//                    handleAs: "json",
//                    preventCache: true,
//                    load: function (response) {
//
//                        graphicsLayer.clear();
//                        backImgGraphicsLayer.clear();
//                        labelGraphicsLayer.clear();
//                        alarmGraphicsLayer.clear();
//
//                        for (var i = 0; i < response.flights.length; i++) {
//
//                            if (alarmID == null && alarmFlag) {
//                                alarmID = response.flights[i].ID;
//                            }
//                            var latlng = new Point(parseFloat(response.flights[i].lon), parseFloat(response.flights[i].lat), map.spatialReference);
//                            var webMercator = webMercatorUtils.geographicToWebMercator(latlng);
//
//                            var imgSymbol;
//                           
//                            if (alarmFlag && alarmID == response.flights[i].ID) {
//                                imgSymbol = new PictureMarkerSymbol("images/biaopai-b.png", 92, 54);
//                                symbol = new PictureMarkerSymbol("images/aircraft-a24.png", 24, 24);
//                                var alarmymbol = new PictureMarkerSymbol("images/alarm.gif", 30, 30);                           
//                                alarmGraphicsLayer.add(new esri.Graphic(webMercator, alarmymbol));
//                            }
//                            else {
//                                imgSymbol = new PictureMarkerSymbol("images/biaopai-a.png", 92, 54);
//                                if (map.getScale() > 16000000) {
//                                    symbol = new PictureMarkerSymbol("images/aircraft-g16.png", 16, 16);
//                                }
//                                else {
//                                    symbol = new PictureMarkerSymbol("images/aircraft-g24.png", 24, 24);
//                                }                               
//                            }
//                            symbol.setAngle(response.flights[i].track);
//
//                            var gra = new esri.Graphic(webMercator, symbol, { "regId": response.flights[i].flightID, "ID": response.flights[i].ID, "speed": response.flights[i].speed, "track": response.flights[i].track, "altitude": response.flights[i].altitude, "squawk": response.flights[i].squawk, "lon": response.flights[i].lon, "lat": response.flights[i].lat });
//                            graphicsLayer.add(gra);
//
//                            var imgSymbol
//                            if (alarmFlag && alarmID == response.flights[i].ID) {
//                                imgSymbol = new PictureMarkerSymbol("images/biaopai-b.png", 92, 54);
//                                if (boolOpen) {
//                                    openWin();
//                                    boolOpen = false;
//                                }
//                            }
//                            else {
//                                imgSymbol = new PictureMarkerSymbol("images/biaopai-a.png", 92, 54);
//                            }
//                            imgSymbol.setOffset(15, 30);
//                            var imgGra = new esri.Graphic(webMercator, imgSymbol, null);
//                            backImgGraphicsLayer.add(imgGra);
//                            var font = new Font("12px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLDER);
//                            var textSymbol = new TextSymbol(response.flights[i].regID.replace('-', ''), font, new Color([255, 255, 255]));
//                            textSymbol.setOffset(-11, 44);
//
//                            var fontAttr = new Font("12px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLDER);
//                            var textSymbolAttr = new TextSymbol(parseInt(Number(response.flights[i].altitude * ft, "0")) +"m" +"  " + parseInt(Number(response.flights[i].speed * kts, "0"))+"km/h", fontAttr, new Color([255, 255, 255]));
//                            textSymbolAttr.setOffset(15, 27);
//
//                            var attrGra = new esri.Graphic(webMercator, textSymbolAttr, null);
//                            var labelGra = new esri.Graphic(webMercator, textSymbol, null);
//                            labelGraphicsLayer.add(labelGra);
//                            labelGraphicsLayer.add(attrGra);
//
//                            if (ID == response.flights[i].ID) {
//                                if (linePlanGraphic) {
//                                    linePlanGraphic.geometry.insertPoint(0, 0, webMercator);
//                                    flightTrackLayer.redraw();
//                                }
//                            }
//                        }
//
//                        return response;
//                    },
//                    error: function (response, ioArgs) {
//                        console.log("xhr get failed:", response);
//                        return response;
//                    }
//                });
            }

                
//                script.get({
//                    url: furl,
//                    jsonp: "callback"
//                }).then(function(data){  
//                	alert(data);
//                })

            //显示气泡
            function showTooltip(event) {
                closeDialog();
               
                //var tipContent = "ZHCC&nbsp;&nbsp;&nbsp;&nbsp;(3)<br>------------<br>B9949        <br>B8421        <br>B6743        ";
                var tipContent = "<img src='images/airportip.png' style='width:62px;height:63px' />";
                var color = "#FFFFFF";

                var dialog = new dijit.TooltipDialog({
                    id: "tooltipDialog",
                    content: tipContent,
                    style: "position: absolute; width: 250px; font: normal normal bold 14px Tahoma;z-index:100;color: " + color + ";"
                });
                dialog.startup();
                //dojo.style(dialog.domNode, "opacity", 1);
                dijit.placeOnScreen(dialog.domNode, { x: event.clientX, y: event.clientY }, ["BL", "TR"], { x: 0, y: 0 });
            }
            //关闭气泡
            function closeDialog(event) {
                var widget = dijit.byId("tooltipDialog");
                if (widget) {
                    widget.destroy();
                }
            }

            function openWin()
            {
                var iTop = (window.screen.availHeight-787) / 2;
                var iLeft = (window.screen.availWidth-879) / 2;
                vReturnValue = window.open(ctx+"/toAlarm.do", "_blank", "top="+iTop+",left="+iLeft+",toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=393, height=440");
            }

            //工具栏事件处理
            $("#radar").click(function () {
                if (radarLayer.visible) {
                    radarLayer.hide();
                }
                else { radarLayer.show(); }
            });
            $("#highline").click(function () {
                if (highLineLayr.visible) {
                    highLineLayr.hide();
                }
                else { highLineLayr.show(); }
            });
            $("#backaircraft").click(function () {
                if (backAirCraftGraphicsLayer.visible) {
                    backAirCraftGraphicsLayer.hide();
                }
                else { backAirCraftGraphicsLayer.show(); }
            });
            $("#backpliot").click(function () {
                if (backPliotGraphicsLayer.visible) {
                    backPliotGraphicsLayer.hide();
                }
                else { backPliotGraphicsLayer.show(); }
            });
            $("#aircraftdensity").click(function () {
                if (aircraftDensityGraphicsLayer.visible) {
                    aircraftDensityGraphicsLayer.hide();
                }
                else { aircraftDensityGraphicsLayer.show(); }
            });
            $("#airport").click(function () {
                var visible = flightLineDensityGraphicsLayer.visibleLayers;
                if (jQuery.inArray(0, visible)>-1) {
                    visible.splice(jQuery.inArray(0, visible), 1);
                }
                else {
                    visible.push(0);
                }
                flightLineDensityGraphicsLayer.setVisibleLayers(visible);
            });
            $("#linedensity").click(function () {
                var visible = flightLineDensityGraphicsLayer.visibleLayers;
                if (jQuery.inArray(1, visible)>-1) {
                    visible.splice(jQuery.inArray(1, visible), 1);
                }
                else {
                    visible.push(1);
                }
                flightLineDensityGraphicsLayer.setVisibleLayers(visible);
            });

            $("#flightdetail").click(function () {
                $("#flightdetail").slideToggle("slow");
            });
        });


