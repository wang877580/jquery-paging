(function($){
	
	//initPaging  初始化   或者更新都调用这个方法
	$.prototype.initPaging = function(obj){
		// obj.total  总的页数
		// obj.num  同时显示多少页数
		// obj.align 对齐方式: center居中  left左对齐  right右对齐
		// obj.page  默认显示的页数
		// obj.changePage 页数改变时的回调
		$(this).addClass('dt-paging');
		var dom = $(this);
		console.log(obj);
		dom.css({
			'justify-content':obj.align == "center" ? 'center' : obj.align == "right" ? 'flex-end' : "flex-start",
		})
		var total = parseInt(obj.total) || 1,   //总的页数
		maxnum = parseInt(obj.num) || 1,  //同时显示页数的数量
		startPage,  //变化前的页数  (根据这个判断页数变化没  如果没变化不走回调函数)
		html = "" ;
		obj.page = parseInt(obj.page) || 1;   //默认显示第几页
		obj.page = obj.page > total ? total : obj.page;   //判断如果默认显示页数 大于 总的页数则显示最后一页
		maxnum = maxnum > total ? total : maxnum;  //如果显示数量大于总页数 默认显示总的页数
		html += '<a class="paging-start">首页</a>';
		html += '<a class="paging-prev page-btn">上一页</a>';
		for(var i = 0 ; i < maxnum ; i++){
			html += '<a class="page-item">'+( i + 1 )+'</a>';
		}
		html += '<a class="page-next page-btn">下一页</a>';
		html += '<a class="paging-end">尾页</a>';
		
		dom.html(html);
		//默认显示第一页
		change(obj.page);
		//给初始化页面赋值
		startPage = $('.activePaging').text();
		//上一页的点击事件
		dom.on('click','.paging-prev',function(e){
			e = e || event;
			//阻止浏览器默认事件
			e.preventDefault();
			//给初始化页面赋值
			startPage = parseInt(dom.children('.activePaging').text());
			var page = startPage > 1 ? startPage - 1 : startPage;
			change(page);
		})
		
		//下一页的点击事件
		dom.children('.page-next').click(function(e){
			e = e || event;
			//阻止浏览器默认事件
			e.preventDefault();
			//给初始化页面赋值
			startPage = parseInt(dom.children('.activePaging').text());
			var page = startPage == total ? startPage : startPage+1;
			change(page);
		})
		
		//跳转页数的点击事件
		dom.children('.page-item').click(function(e){
			e = e || event;
			//阻止浏览器默认事件
			e.preventDefault();
			startPage = parseInt(dom.children('.activePaging').text());
			var page = parseInt($(this).text());
			change(page);
		})
		
		//首页的点击事件
		dom.children(".paging-start").click(function(e){
			e = e || event;
			//阻止浏览器默认事件
			e.preventDefault();
			startPage = parseInt(dom.children('.activePaging').text());
			//跳转到第一页
			change(1);
		})
		
		//尾页的点击事件
		dom.children('.paging-end').click(function(e){
			e = e || event;
			//阻止浏览器默认事件
			e.preventDefault();
			startPage = parseInt(dom.children('.activePaging').text());
			change(total);
		})
		
		//当切换页面时的操作
		function change(page){
			//判断如果选中项发生改变在根据页数处理
			if(page != startPage){
				var index = 0;  //当前应该选中项的下标
				//如果页数是前几页
				if(page <= parseInt(maxnum / 2)){
					index = page - 1;
				}else if(page > total - parseInt(maxnum / 2)){  //如果是后几页
					index = maxnum - (total - page) - 1;
				}else{ //如果是中间的页数   选中项 一直在最中间
					index = parseInt(maxnum / 2);
				}
				//根据选中项 给其他 页数赋值
				for(var i = 0 ; i < dom.children('.page-item').length ; i++){
					if(i == index){  //如果是选中项  值 = page
						dom.children('.page-item').eq(i).addClass("activePaging");
						dom.children('.page-item').eq(i).text(page);
					}else{ //否则
						dom.children('.page-item').eq(i).removeClass("activePaging");
						if(i < index){  //如果是选中项坐标  值 = page - index + i
							dom.children('.page-item').eq(i).text(page - index + i);
						}else{  //如果是选中项右边  值 = page + i - index
							dom.children('.page-item').eq(i).text(page + i - index);
						}
					}
				}
				if(obj.changePage && typeof obj.changePage == "function"){
					//页数改变后的回调函数
					obj.changePage(page);
				}
				//判断是否禁止某些操作按钮
				isdisabled(page);
			}
		}
		
		//是否禁止上一页或者下一页
		function isdisabled(page){
			page == 1 ? dom.children('.paging-prev,.paging-start').addClass('page-disabled') && dom.children('.paging-start').hide() 
			: dom.children('.paging-prev,.paging-start').removeClass('page-disabled') && dom.children('.paging-start').show();
			page == total ? dom.children('.page-next,.paging-end').addClass('page-disabled')  && dom.children('.paging-end').hide()
			: dom.children('.page-next,.paging-end').removeClass('page-disabled') && dom.children('.paging-end').show();
		}
	}
	
})($)


