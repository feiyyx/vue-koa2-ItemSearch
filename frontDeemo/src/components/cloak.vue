<template>
    <div class="cloak--containier">
			<div class="pond--list-container" v-if="this.$store.state.pondShowFlag">
				<div class="X--icon" @click="maskTroggle"></div>
				<div class="pond-list">
					<ul class="list-container">
						<li v-for="item in this.pondList" class="list-item" :key="item.id" @click="chooseItem(item)">
							<img :src="item.url"  :alt="item.name">
						</li>
					</ul>
				</div>
			</div>
            <div class="cloakmask" @click="maskTroggle" v-if="this.$store.state.showCloak"></div>    
        </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'cloak',
    data() {
        return {

        }
    },
    methods: {
        maskTroggle() {
            this.$store.commit('ALL_NODISPLAY');
        },
        chooseItem(item) {
			console.log(item)
			this.$store.dispatch('getList', item);
			//this.$store.commit('ADD2_CHOSENLIST', item);
		}
    },
    computed: mapState({
		pondList: state=>state.pondList,
	}),
    created() {
        this.$store.dispatch('checkList');
    }
}
</script>

<style>
.X--icon {
	position: absolute;
	top: 5px;
	right: 5px;
	width: 30px;
	height: 30px;
	transition: 0.2s ease transform;
	cursor: pointer;
}

.X--icon:before, .X--icon:after{
	content: '';
	position: absolute;
	background-color: #66ccff;
	border-radius: 10px;
	transform: rotate(45deg);

}

.X--icon:active {
	transform: scale(0.9)
}


.X--icon:after {
	top: 0px;
	right: 11px;
	height: 27px;
	width: 5px;
	
}


.X--icon:before {
	top: 11px;
	right: 0px;
	height: 5px;
	width: 27px;
}

/* 实现了纯CSS无滚动条 */
/* 该方法适用小界面且无x轴滚动 */
/* parent容器 */
.pond-list {
	width: 750px;
	height: 500px;
	background-color: #e6dfdf;
	border-radius: 10px;
	overflow: hidden;/*隐藏x*/

}

/* 要实现无滚动条的child容器 */
.list-container {
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
	padding-top: 50px;
	width: calc(100% + 17px);/* 17px是滚动体宽度，100%+17px正好溢出 */
	height: 500px;/*很关键，需要与父元素一致*/
	overflow-y: scroll; /* y轴可滚动 */
}

.cloakmask {
	position: absolute;
	left:0;
	top: 0;
    height: 100%;
    width: 100%;
    z-index: 999;
    background-color:rgba(0, 0, 0,0.3);
}

.list-item {
	width: 90px;
	height: 90px;
	margin-left: 50px;
	margin-bottom: 40px;
	cursor: pointer;
	transition: 0.2s ease transform;
}

.list-item img {
	border-radius: 10px;
	width: 90px;
	height: 90px;
}

.list-item:active {
	transform: scale(0.9);
}



</style>
