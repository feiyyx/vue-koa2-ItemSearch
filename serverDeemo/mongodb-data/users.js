/**
 * 将每个对象逐一insert进去即可
 * admin在test下面是因为我之前不小心把admin删掉了……
 * password使用nodejs自带的crpto模块里的md5加密
 */
{
    "_id" : ObjectId("5d283f79b4d86ec71fa131cf"),
    "username" : "test",
    "password" : "098f6bcd4621d373cade4e832627b4f6",
    "role" : "2",
    "type" : "user",
    "store" : []
}
//-------------------------------
{
    "_id" : ObjectId("5d3fbba6b4d86ec71fa75713"),
    "username" : "admin",
    "password" : "21232f297a57a5a743894a0e4a801fc3",
    "role" : "1",
    "type" : "admin",
    "store" : [ 
        {
            "_id" : ObjectId("5ca32421c3e8637975d4d7a4"),
            "name" : "苍天之岭：卷层云",
            "type" : "布甲",
            "component" : "上衣",
            "nickname" : "95a 95A 95泰波尔斯 泰波尔斯布甲 气象套 上衣",
            "baseAttributes" : "物理防御力+1465 智力+56 精神+56 抗魔值+322",
            "exAtrributes" : "最终伤害+4% 攻击时，额外增加16%的伤害增加量",
            "seriesAtrributes" : "[3]套装效果/所有职业的所有Lv50技能Lv+1/所有职业的所有Lv85技能Lv+1/力量和智力+10%/攻击时，额外增加10%的伤害增加量 攻击速度+17%/移动速度+17%/释放速度+25.5%/所有职业的所有Lv50技能Lv+2/所有职业的所有Lv85技能Lv+2/暴击攻击时，额外增加26%的伤害增加量",
            "description" : "暴雨冲洗着，我灵魂的底片。",
            "url" : "http://localhost:8000/images/95acoat.png",
            "rare" : "史诗"
        }
    ]
}
