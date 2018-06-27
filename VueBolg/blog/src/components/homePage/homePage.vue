<template>
    <div>
        <homeHeader></homeHeader>
        <Row class="main1" :style="clientHeight">
            <Col :xs="{ span: 22, offset: 1 }" :sm="{ span: 14, offset: 1 }" :md="{ span: 14, offset: 1 }" :lg="{ span: 14, offset: 1 }">
                <Scroll :on-reach-bottom="handleReachBottom" :height=scrollHeight>
                    <Card v-for="(item, index) in blogArr" :key="index" style="marginTop: 25px">
                        <p slot="title">{{item.title}}</p>
                        <p style="font-size: 12px;">{{item.digest}}</p>
                        <br>
                        <div style="display:flex;fontSize:11px;justifyContent: space-between;">
                            <div style="display:flex;">
                                <p><Icon type="social-github"></Icon> 作者 : {{item.author}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                <p><Icon type="calendar"></Icon> 时间 : {{item.add_time.slice(0,10)}}</p>
                            </div>
                            <Button  @click="gotoDetail(item.identify)" type="text" style="padding:0px 0px;"><Icon type="ios-search-strong"></Icon>  查看</Button>
                        </div>
                    </Card>
                </Scroll>
            </Col>
            <Col :xs="0" :sm="{ span: 7, offset: 1 }" :md="{ span: 7, offset: 1 }" :lg="{ span: 7, offset: 1}">
                <Card class="textcolor" style="marginTop: 35px">
                    <p slot='title'>分类</p>
                    <Tag color="blue"  @click="chooseType">Objective-C</Tag>
                    <Tag color="green"  @on-close="chooseType">Swift</Tag>
                    <Tag color="black"  @on-close="chooseType">Python</Tag>
                    <Tag color="red"  @on-close="chooseType">JavaScript</Tag>
                    <Tag color="yellow"  @on-close="chooseType">TypeScript</Tag>
                </Card>
            </Col>
            <Col :xs="0" :sm="{ span: 7, offset: 1 }" :md="{ span: 7, offset: 1 }" :lg="{ span: 7, offset: 1 }">
                <Card class="textcolor" style="marginTop: 25px">
                    <p slot='title'>意见箱</p>
                    <Input placeholder="请输入你的昵称,不输入也可以" v-model="nickname"></Input>
                    <Input type="textarea" :rows="6" placeholder="请输入你觉得希望改进的地方" style="marginTop:15px;" v-model="suggestContent"></Input>
                    <Button type="text" style="marginTop:10px;" @click="submitSuggest">提交</Button>
                </Card>
            </Col>
            <router-view ></router-view>
        </Row>
        <homeFooter></homeFooter>
    </div>
</template>

<script>
import homeHeader from './homeHeader.vue'
import homeFooter from './homeFooter.vue'
export default {
    components:{

        homeHeader,
        homeFooter
    },
    data() {
        return {
            clientHeight:'',
            scrollHeight:0,
            blogArr:[],
            nickname:'',
            suggestContent:''
        }
    },
    methods: {
        handleReachBottom () {
            return new Promise(resolve => {
                
            });
        },
        chooseType(event,name) {

            console.log(name)
        },
        gotoDetail(identify) {

            this.$router.push({path:"/blog",query:{identify:identify}});
        },
        submitSuggest() {

            let params = {nickname:this.nickname,suggestType:1,suggestContent:this.suggestContent}

            let url = 'suggest/'
            this.$axios.post(url,params,response => {
                
                this.$Notice.success({title: '提交成功',})
            },
            err=>{
                this.$Notice.error({title: '提交失败',})
            })  
        }
    },
    mounted() {

        this.clientHeight = {'height': (document.documentElement.clientHeight - 125) + 'px'}
        this.scrollHeight = document.documentElement.clientHeight - 130
    },
    created() {

        let url = 'blogs/'
        this.$axios.get(url,null,response => {
            
            this.blogArr = response.results
        },
        err=>{
            
        })  
    }
}
</script>

<style>
.main1 {
    background-color: #FFFAF0;
    text-align: left;
    color: gray;
}

.imgstyle{
    padding-top: 2px;
    margin: 0 auto;
}

.textcolor{
    color: black;
}
</style>