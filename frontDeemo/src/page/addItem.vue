<template>
    <div id="container">
		<div class="addItem-form-container">
            <form class="addItem-form">
                <div class="form-container form-input top-form-container">
                    <input type="text" name="item-name" placeholder="装备名称" v-model="itemName"/>
                </div>
                <div class="form-container form-file">
                    <input type="file" name="item-nickname" @change="upFileChange"/> 
                    <img class="preview-img" :src="imgSrc"/>
                </div>
                <div class="form-container form-input">
                    <input type="text" name="item-nickname" placeholder="装备简称" v-model="itemNickname"/>
                </div>
                <div class="form-container form-input-half">
                    <input type="text" name="item-component" placeholder="装备组件" v-model="itemComponent"/>
                </div>
                <div class="form-container form-input-half">
                    <input type="text" name="item-type" placeholder="装备类型" v-model="itemType"/>
                </div>
                <div class="form-container">
                    <textarea name="item-baseAttributes" placeholder="装备属性" v-model="itemBaseAttributes"/>
                </div>
                <div class="form-container">
                    <textarea name="item-seriesAtrributes" placeholder="套装属性" v-model="itemSeriesAtrributes"/>
                </div>
                <div class="form-container">
                    <textarea name="item-exAtrributes" placeholder="额外属性" v-model="itemExAtrributes"/>
                </div>
                <div class="form-container">
                    <textarea name="item-description" placeholder="装备描述" v-model="itemDescription"/>
                </div>
                <button class="form-button bottom-form-container" @click="ajaxReq">
                        提 交
                </button>

            </form>
        </div>
	</div>
</template>

<script>
export default {
    name: "addItem",
    data() {
        return {
            upFile: null,
            imgSrc: null,
            itemName: '',
            itemNickname: '',
            itemComponent: '',
            itemType: '',
            itemBaseAttributes: '',
            itemSeriesAtrributes: '',
            itemExAtrributes: '',
            itemDescription: ''

        }
    },
    methods: {
        upFileChange(e) {
            // 上传前浏览
            let reader;
            let reg = new RegExp("image");
            console.log(e.target.files[0])
            if(e.target.files.length > 0 && e.target.files[0].type.search(reg) > -1) {
                this.upFile = e.target.files[0]
                reader = new FileReader();
                reader.readAsDataURL(e.target.files[0])
                reader.onload = (e) => {
                    this.imgSrc = e.target.result;
                    console.log(e);
                }
            }
        },
        ajaxReq(e) {
            e.preventDefault();
            let temp = new FormData();
            let upload;

            temp.append('name', this.itemName);
            temp.append('type', this.itemType);
            temp.append('component', this.itemComponent);
            temp.append('nickname', this.itemNickname);
            temp.append('baseAttributes', this.itemBaseAttributes);
            temp.append('exAtrributes', this.itemExAtrributes);
            temp.append('seriesAtrributes', this.itemSeriesAtrributes);
            temp.append('description', this.itemDescription);
            temp.append('imgFile', this.upFile);

            upload = this.$postFormdata('/upload', temp).then((res) => {
                if(res.code === 0) {
                    alert("添加成功！");
                    this.$router.push('/index');
                } else if(res.code === 1 && res.status === 'EXIST') {
                    alert("物品已存在！");
                    this.$router.push('/additem');
                } else {
                    alert("未知错误");
                    this.$router.push('/additem');
                }
                console.log(res);
            }).catch((err) => {

            })
            console.log(temp);
        }
    },
}
</script>

<style>
#container {
	position: relative;
	width: 60%;
	margin-top: 50px;
    margin-left: 50px;
    margin-bottom: 100px;
}

.addItem-form-container{
    position: relative;
	margin: auto;
	width: 80%;
	height: 100%;
	background-color: rgb(190, 126, 126);
	border-radius: 10px;
	z-index: 999;
}

.addItem-form {
    display: flex;
    flex-wrap: wrap;
}


.item-label {
    margin-top: 50px;
    margin-left: 10px;
}

.addItem-form input {
    box-sizing: border-box;
    padding-left: 10px;
    height: 100%;
    width: 100%;
    border: none;
    font-size: 14px;
}

.form-container {
    margin: 0;
    height: 100px;
    width: 100%;
    border-top: 1px solid #e7e0da;
}


.form-container+.form-container{
    /* margin-bottom: 2px; */
}


.form-input {
    height: 60px;
    width: 75%;
}

.top-form-container input {
    position: relative;
    border-top-left-radius: 8px;

}

.bottom-form-container {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

.addItem-form textarea {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding: 3% 2%;
    resize:none;
    border: none;
    overflow: auto;
    font-size: 14px;
    z-index: 1000;
}

.form-file {
    box-sizing: border-box;
    position: absolute;
    right: 0;
    width: 25%;
    height: 122px;
    background-color: #ccc;
    border: 2px solid #aaa;
    border-top-right-radius: 8px;
}

.preview-img {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 100px;
    height: 100px;
}

.form-input-half {
    width: 259.622px;
    height: 60px;
    border-right: 1px solid #e7e0da;
}

.form-input-half:last-child {
    border-right: 1px solid #fff; 
}

.form-button {
    width: 100%;
    height: 60px;
    background-color: #836d6d;
    border: none;
    color: #fff;
    font-size: 20px;
}

.form-button:active {
    background-color: #9e8484;
}

</style>
