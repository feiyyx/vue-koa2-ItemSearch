<template>
	<div id="container">
		<div class="search-container">
			<form class="search-form">
				<input class="search" placeholder="请输入装备名字或外号：星辰命运胸甲/90a板甲上衣" v-model="input" :class="{on: showToggle !== false } " @focus="showList" @keyup.enter="search"><span class="search-icon" @click="search" @keyup.enter="search"></span>
			</form>
			
			<div class="suggest"  v-if=" showToggle === true">
				<div class="suggest-list" >
					<div class="line" v-if=" input !== '' "></div>
					<ul  v-if=" input !== '' ">
						<li v-for="item in suggestItems" :key="item._id" @click="getSearchValue(item.name)">{{item.name}}</li>
					</ul>

				</div>
			</div>
		</div>
		<searchBar :suggestValue="suggestValue"></searchBar>
	</div>
</template>

<script>

import searchBar from "../components/searchBar";
export default {
	name: 'index',
	data() {
		return {
			input: '', //输入数据
			suggestItems: [], //获得的suggest栏名称
			ajaxRuest: null, //发送ajax请求
			showToggle: false, //是否显示suggest菜单
			suggestValue: [], //获得的suggest的json数据
			showTable: false //是否显示table
		}
	},
	created() {
		this.debounceSearch = this.$debounce(this.searchName, 150); //防抖函数。每输入一次150ms后查询一次
	},

	components: {
		searchBar
	},
	methods: {
		searchName() {//每次输入都查询数据库中名字
			let tempObj = {
				'name': this.input,
				'nickname': this.input
			};
			this.ajaxRuest = this.$post('/name', tempObj).then(res => {
				this.suggestItems = res;
			}).catch();
		},
		search() {//点下搜索图标搜索装备详细信息
			let tempObj = {
				'name': this.input,
				'nickname': this.input
			}
			this.ajaxRuest = this.$post('/string', tempObj).then(res => {
				this.suggestItems = res;
				this.suggestValue = this.suggestItems;
				this.showTable = true; //搜索获得信息后显示table
			}).catch();
		},
		showList() { //展示装备信息
			if(this.showToggle === false) {
				this.showToggle = true;//为True时候展示
			} else {
				this.showToggle = false;//否则展示模板
			}
		},
		getSearchValue(val) { //点击li获取标签内值
			this.input = val;
			this.showToggle = false; //点击后suggest list 消失
		}
	},
	watch: {
		input: function() {
			this.debounceSearch();
		},
	},
}	
</script>

<style>
#container {
	position: relative;
	width: 60%;
	margin-top: 50px;
	margin-left: 50px;
}

/*-------------------------*/
.search-container {
	position: relative;
	margin: auto;
	width: 80%;
	height: 100px;
	background-color: #836d6d;
	border-radius: 10px;
	z-index: 999;
}

.search-form {
	position: relative;
	top: 22px;
	left: 45px;
	width: 80%;
	height: 50px;
	font-size: 1.2em;
	border-radius: 5px;

}

.line {
	width: 90%;
	height: 4px;
	margin: 0 20px;
	border-top: 1px solid #bbb;
}

.search {
	width: 100%;
	height: 50px;
	padding-left: 15px;
	font-size: 20px;
	border-radius: 5px;
	border: 1px solid #bbb;
	outline: none;
}

.search.on {
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	border-bottom: none;
}


.search-icon {
	position: absolute;
	top: 10%;
	right: 0%;
	width: 40px;
    height: 40px;
	background-image: url(../../static/images/search.png);
	font-size: 2em;
	cursor: pointer;
}

.search-icon:hover{
	background-image: url(../../static/images/searchOn.png);
}

.display-area {
	margin: 20px auto;
	width: 80%;
	height: 500px;
	background-color: #836d6d;
	border-radius: 10px;
	z-index: 1;
}

.suggest {
	display: flex;
	margin-left: 45px;
	margin-top: 18px;
	text-align: left;
	width: 83%;
	line-height: 1.8;
	font-size: 20px;
	border-left: 1px solid #bbb;
	border-right: 1px solid #bbb;

	border-radius: 5px;
    border-top-left-radius: 0;
	border-top-right-radius: 0;
	background-color: white;
}

.suggest-list {
	position: relative;
	width: 100%;
}

.suggest-list ul::before{
	height: 5px;
}

.suggest-list ul{
	position: relative;
	display: flex;
	flex-direction: column;
	flex:auto;
	cursor: pointer;
}

.suggest-list li{
	left: 45px;

	list-style-type:none;
	flex-direction: column;
	padding-left: 15px;
}

.suggest-list li:hover{
	background: #ddd;
}

/* .suggest-list li::before{
	content: ' ';
	display: block;
	height: 1px;
	border-top: 1px solid #aaa;
} */

.equirement-info {
	margin: 5% auto;
	width: 90%;
	height: 90%;
	transform: translateY(5%); 
	background-color: #ece6e6;
	border-radius: 5px;
	border: 1px solid #CFCFCF;
	z-index:inherit;
}

.display-area table {
	border-collapse: collapse;
}

.display-area td {
	border: 1px solid #bbb;
	padding: 12px 5px;
}

.img--inner {
	width: 100px;
}

.title {
	font-weight: 800;
	background: #dbd1d1;
}

</style>
