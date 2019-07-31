<template>
    <div class="wishing-pond">
		<div class="list--container">
            <ul class="item--list">
                <li v-for="item in this.chosenList" :key="item._id" class="list">
                    <div class="cancel--area">
                        <div class="cancel--icon" @click="deleteItem(item)"></div>
                    </div>
                    <img :src="item.url" :title="item.name">
                </li>
                <li class="add--item list" @click="showMask">
                    <div class="add--icon">
                        <div class="plus--icon"></div>
                    </div>
                </li>
            </ul>
        </div>

	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'wishingPond',
    props: [],
    data() {
        return {
           
        }
    },
    methods: {
        showMask() {
            this.$store.commit('MASK_FLAG');
            this.$store.commit('POND_CHOOSE');
        },
        deleteItem(item) {
            console.log(item);
            this.$store.dispatch('delList', item);
        }
    },
    computed: mapState({
        chosenList: state=>state.chosenList
    }),
}
</script>
<style>
.wishing-pond {
	position: relative;
	top: 50px;
	left:50px;
	width: 40%;
	height: 500px;
	border: 2px solid #bbb;
	border-radius: 10px;
    box-shadow: 4px 3px 4px 1px rgba(0, 0, 0, 0.2);
    background-color: #eee
}

.list--container {
    width: 90%;
    height: 90%;
    padding-top: 30px;
    margin: auto;

}

.item--list {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
}

.item--list  li {
    margin-left: 15px;
    margin-bottom: 40px;
    margin-right: 15px; 
    cursor: pointer;
}

.item--list  li img{
    transition: 0.2s ease transform;
}

.item--list  li img:active {
    transform: scale(0.9);
}

.add--icon {
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    background-color: #d3d0d0;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s ease transform;
    box-shadow: 0px 2px 2px 2px rgb(238, 220, 220);
}

.add--icon:before {
    content: '';
    position: relative;
    display: block;
    top: 10px;
    left: 10px;
    width: 80px;
    height: 80px;
    box-shadow: inset 0px 2px 2px 2px rgb(238, 220, 220);
    background-color: #eee;
    border-radius: 10px;

}

.plus--icon {
    position: relative;
    margin: 0 auto;
}

.plus--icon:before, .plus--icon:after  {
    position: absolute;
    content: '';
    top: -30px;
    height: 10px;
    width: 10px;
    transform: translateY(-50%) translateX(-50%);
    background-color: #d3d0d0;
    border-radius: 10px;
    transition: 0.2s ease transform;
}

.plus--icon:before {
    width: 70px;
    box-shadow: 0px 1px 1px 1px rgb(238, 220, 220);
}

.plus--icon:after {
    height: 70px;
}

.list {
    position: relative;
    height: 100px;
    width: 100px;
    background-color: #000;
    transition: 0.2s ease transform;
    border-radius: 10px;
}

.list img{
    height: 100px;
    width: 100px;
    border-radius: 10px;
}

.cancel--area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
}

.cancel--area:hover .cancel--icon {
    display: block;
}

.cancel--icon {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    transform-origin: -5.5px 5.5px;
    transition: 0.2s ease transform;
}

.cancel--icon:active {
    transform: scale(0.9);
}

.cancel--icon:hover {
    transform: rotate(180deg);
}


.cancel--icon:hover {
    display: block;
}

.cancel--icon::before {
    content: '';
    position: absolute;
    top: -5px;
    right: -5px;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background-color: rgb(243, 94, 94); 
}

.cancel--icon::after  {
    content: '';
    position: absolute;
    top: 4px;
    right: -1px;
    width: 13px;
    height: 3px;
    border-radius: 2px;
    background-color: rgb(253, 243, 243); 
}

.pond--list-container {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	z-index: 1000;
}

</style>