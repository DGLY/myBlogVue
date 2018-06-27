<template>
    <Row class="header1">
            <Col :xs="24" :sm="3" :md="3" :lg="3">
                <img class="imgstyle" src="./152939274357106.png" alt="">
            </Col>
            <Col :xs="0" :sm="{ span: 11, offset: 10 }" :md="{ span: 9, offset: 12 }" :lg="{ span: 6, offset: 15 }">
                 <Menu style="background-color:  #FCE6C9;height: 55px;" mode="horizontal" theme="dark" active-name="1" @on-select="clickMenuItem">
                    <MenuItem name="1" style="color:black;">
                        <Icon type="ios-home-outline"></Icon>
                        Home
                    </MenuItem>
                    <MenuItem name="2" style="color:black;">
                        <Icon type="ios-briefcase-outline"></Icon>
                        Tools
                    </MenuItem>
                    <MenuItem name="3" style="color:black;">
                        <Icon type="happy-outline"></Icon>
                        Connect me
                    </MenuItem>
                </Menu>
            </Col>
    </Row>
</template>

<script>
export default {
    methods: {
        clickMenuItem(name) {
            
            if (name == "1") {
                
                this.goToHome()
            }else if (name == "2"){

                this.goToTools()
            }else if (name == "3"){
                
                this.goToConnect()
            }else{

            }
        },
        goToHome() {

            this.$router.push({path:"/homePage"});
        },
        goToTools() {

            this.$Notice.warning({title: '暂未开启',})
        },
        goToConnect() {

            this.$Notice.warning({title: '暂未开启',})
        }
    }
}
</script>

<style>
.header1 {
    background-color:  #FCE6C9;
    color:black;
    text-align: center;
    height: 55px;
}
</style>
