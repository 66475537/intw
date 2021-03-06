<!DOCTYPE html>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/common-taglibs.jsp"%>
<html>
	<head>
	    <meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>数据初始化 | 运行控制风险管理系统</title>
	    <link href="${ctx}/css/bootstrap.min.css" rel="stylesheet">
	    <link href="${ctx}/css/font-awesome.min.css" rel="stylesheet">
	    <link href="${ctx}/css/custom.css" rel="stylesheet">
	    <link href="${ctx}/css/animate.css" rel="stylesheet">
	    <link href="${ctx}/css/admin/style.css" rel="stylesheet">
	    <link href="${ctx}/css/awesome-bootstrap-checkbox.css" rel="stylesheet">
	    <link rel="shortcut icon" href="${ctx}/mages/ico.png">
	    <style type="text/css">
	    	body{
	    		background-color: #dddddd;
	    	}
	    	.sidebar-collapse > ul {
			    width: 100%;
			    margin: 0;
			    padding: 0;
			    position: absolute;
			    bottom: 0px;
			}
			.img {
			    background-size: 100% 100%;
			    margin: 10px 5px 5px 20px;
			}
	    </style>
	</head>
	<body>
    	<div id="wrapper">
			<jsp:include page="../left-menu.jsp"/>
        	<div id="page-wrapper" class="gray-bg" id="meanbody">
				<jsp:include page="../top.jsp"/>
		        <div class="wrapper wrapper-content animated fadeInRight">
	                <div class="col-lg-12" id="_collg12" style="background-color: #fff;">
	                    <div class="ibox float-e-margins">
	                    	<div class="ibox float-e-margins">
		                    	<div class="ibox-title" style="border-width: 0 0 0;">
			                        <div class="ibox-tools" style="text-align: left;font-size: 16px;">
			                        	<strong>数据库初始化</strong>
			                        </div>
		                    	</div>
								<div class="ibox-content">
									<button class="btn btn-primary" type="button" id="init_database" onclick="init_database();">初始化数据库</button>
									<button class="btn btn-primary" type="button" id="submit" id="update_data" onclick="update_database_time()">更新数据</button>
								</div>
							</div>
	                    </div>
		            </div>
        		</div>
        		<div class="footer">
		            <div>
		                <strong>系统管理员&nbsp;您好，欢迎回来！</strong>
		            </div>
			    </div>
        	</div>
        </div>
	    <!-- Mainly scripts -->
	    <script src="${ctx}/js/jquery-2.1.1.js"></script>
	    <script src="${ctx}/js/bootstrap.min.js"></script>
	    <script src="${ctx}/js/jquery.metisMenu.js"></script>
	    <script src="${ctx}/js/jquery.slimscroll.min.js"></script>
	    <script src="${ctx}/js/inspinia.js"></script>
	    <!-- 绿条 -->
	    <script src="${ctx}/js/pace.min.js"></script>
		<script type="text/javascript">
			function init_database(){
				$('#init_database').attr('disabled',"true");
				
				$.ajax({
                    url:'${ctx}/script/handler.do',
                    type:'post',
                    cache:false,
                    dataType:'text',
                    success:function(data) {
                    	if(data == "success"){
	                        alert('数据库初始化成功！');
                    	}else{
	                        alert('数据库初始化失败！');
                    	}
                        $('#init_database').removeAttr('disabled');
                    }
                });
			}
			
			function update_database_time(){
				$('#update_data').attr('disabled',"true");
				
				$.ajax({
                    url:'${ctx}/quota/executeSQL.do',
                    type:'post',
                    cache:false,
                    dataType:'text',
                    success:function(data) {
                    	if(data == "success"){
	                        alert('更新成功');
                    	}else{
	                        alert('更新失败！');
                    	}
                        $('#update_data').removeAttr('disabled');
                    }
                });
			}
	    </script>
	</body>
</html>