<template>
    <div class="display-area">
			<table class="equirement-info"  v-if=" this.suggestValue[0] ">
				<tbody>
					<tr>
						<td  class="title" >
							<div class="img--inner">
								<img :src=" this.suggestValue[0].url ">
							</div>
						</td>
						<td>{{ this.suggestValue[0].name }}</td>
						<td class="title">稀有度</td>
						<td>{{ this.suggestValue[0].rare }}</td>
					</tr>
					<tr>
						<td class="title">物品描述</td>
						<td colspan="3">{{ this.suggestValue[0].description }}</td>
					</tr>
					<tr>
						<td class="title">基本属性</td>
						<td colspan="3">{{ this.suggestValue[0].baseAttributes }}</td>
					</tr>
					<tr>
						<td class="title">额外属性</td>
						<td colspan="3">{{ this.suggestValue[0].exAtrributes }}</td>
					</tr>
					<tr>
						<td class="title">套装效果</td>
						<td colspan="3">{{ this.suggestValue[0].seriesAtrributes }}</td>
					</tr>
					
				</tbody>
				
			</table>
			<table  class="equirement-info" v-else>
				<tr><td class="title">稀有度</td></tr>
				<tr><td class="title">物品描述</td></tr>
				<tr><td class="title">基本属性</td></tr>
				<tr><td class="title">额外属性</td></tr>
				<tr><td class="title">套装效果</td></tr>
			</table>
		</div>
</template>

<script>
export default {
    name: "searchBar",
    props:[ 'suggestValue' ],

}
</script>
<style>
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
