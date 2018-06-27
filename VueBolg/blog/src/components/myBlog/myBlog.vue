<template>
    <div>
        <homeHeader></homeHeader>
        <Row class="main2" :style="clientHeight">
            <Col :xs="{ span: 24, offset: 0 }" :sm="{ span: 13, offset: 2 }" :md="{ span: 13, offset: 2 }" :lg="{ span: 13, offset: 2 }">
                <Scroll :height=scrollHeight style="padding:0px 10px;margin:20px auto;">
                    <Card style="padding:0px 20px;">
                        <p slot="title" style="textAlign: center;fontSize:17px;">{{blogDetail == null ? '' : blogDetail.title}}</p>
                        <vue-markdown v-highlight :source="blogDetail == null ? '' : blogDetail.body"></vue-markdown>
                    </Card>
                </Scroll>
            </Col>
            <Col :xs="0" :sm="{ span: 6, offset: 2 }" :md="{ span: 6, offset: 2 }" :lg="{ span: 6, offset: 2}">
                <Card class="textcolor" style="marginTop: 25px">
                    <p slot='title'>纠错</p>
                    <Input type="textarea" :rows="20" placeholder="哪里写错了,欢迎指出啊" v-model="suggestContent"></Input>
                    <Button type="text" style="marginTop:10px;" @click="submitError">提交</Button>
                </Card>
            </Col>
        </Row>
        <homeFooter></homeFooter>
    </div>
</template>

<script>
import homeHeader from '../homePage/homeHeader.vue'
import homeFooter from '../homePage/homeFooter.vue'
import VueMarkdown from 'vue-markdown'

export default {
    components:{
        homeHeader,
        homeFooter,
        VueMarkdown,
    },
    data() {
        return {
            clientHeight:'',
            scrollHeight:0,
            blogDetail:null,
            suggestContent:'',
            identify:''
        }
    },
    methods: {
        
        submitError() {

            let params = {suggestType:2,identity:this.identify,suggestContent:this.suggestContent}

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
        this.scrollHeight = document.documentElement.clientHeight - 180
    },
    computed: {  
        compiledMarkdown() {  
        let detail = this.blogDetail == null ? '' : this.blogDetail.body;  
        return marked(detail || '', { sanitize: true  });  
      }  
    },
    created() {

        let url = window.location.href
        let num = url.indexOf('=')
        url = url.substr(num + 1)
        this.identify = url
        
        let requrl = 'blogs/' + url + '/';
        this.$axios.get(requrl,null,response => {
            
           this.blogDetail = response
        },
        err=>{
            
        })  
    }
}
</script>

<style>
.main2 {
    background-color: #FFFAF0;
    color: black;
    text-align: left;
}

.imgstyle{
    padding-top: 2px;
    margin: 0 auto;
}

.textcolor{
    color: black;
}
.pre{
 background-color: #666;
 padding: 10px 10px;
}
.code {
 color: #fff;
}

/* html,body{  
  font-family: 'Consolas', 'Courier', 'Monaco', sans-serif,monospace;  
  font-size: 16px;  
  color:#C0C0C0;
  -webkit-text-size-adjust:none;  min-width: 200px;  
  max-width: 760px;  
  margin: 0 auto; padding: 1rem;  
  line-height: 1.5rem;  
  
}   */
h1,h2,h3,h4,h5,h6 {  
  text-rendering:optimizelegibility;margin-bottom:1em;font-weight:bold; line-height: 1.8rem;color: #4F86D5;  
}  
  
  
  
h1,h2{position:relative;padding-top:1rem;padding-bottom:0.2rem;margin-bottom:1rem;background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAABCAYAAACsXeyTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAFUlEQVQIHWNIS0sr/v//PwMMDzY+ADqMahlW4J91AAAAAElFTkSuQmCC') bottom left repeat-x;}  
h2{padding-top:0.8rem;padding-bottom:0.2rem;}  
h1{ font-size: 1.6rem;}  
h2{ font-size: 1.4rem;}  
h3{ font-size: 1.2rem;}  
h4{ font-size: 1.1rem;}  
h5{ font-size: 1.0rem;}  
h6{ font-size: 0.9rem;}  
  
table{border-collapse:collapse;border-spacing:0;  
  margin-top: 0.8rem;  
  margin-bottom: 1.4rem;  
}  
tr{  background-color: #fff;  
  border-top: 1px solid #ccc;}  
th,td{padding: 5px 14px;  
  border: 1px solid #ddd;}  
  
blockquote{font-style:italic;font-size:1.1em;line-height:1.5em;padding-left:1em; border-left:4px solid #D5D5D5;    margin-left: 0;  
    margin-right: 0;  
    margin-bottom: 1.5rem; }  
  
a{color:#1863a1}  
  
pre,code,p code,li code{font-family: 'Consolas', 'Courier', 'Monaco', sans-serif,monospace}  
  
pre{-webkit-border-radius:0.4em;-moz-border-radius:0.4em;-ms-border-radius:0.4em;-o-border-radius:0.4em;border-radius:0.4em;border:1px solid #e7dec3;line-height:1.45em;font-size:0.9rem;margin-bottom:2.1em;padding:.8em 1em;color:#586e75;overflow:auto; background-color:#fdf6e3;}  
  
p code,li code{display:inline-block;white-space:no-wrap;background:#fff;font-size:0.9rem;line-height:1.5em;color:#555;border:1px solid #ddd;-webkit-border-radius:0.4em;-moz-border-radius:0.4em;-ms-border-radius:0.4em;-o-border-radius:0.4em;border-radius:0.4em;padding:0 .3em;margin:-1px 4px;}  
p pre code,li pre code{font-size:1em !important;background:none;border:none}  
  
/* img{max-width:100%;  
zoom: 0.5;  
-webkit-border-radius:0.3em;-moz-border-radius:0.3em;-ms-border-radius:0.3em;-o-border-radius:0.3em;border-radius:0.3em;-webkit-box-shadow:rgba(0,0,0,0.15) 0 1px 4px;-moz-box-shadow:rgba(0,0,0,0.15) 0 1px 4px;box-shadow:rgba(0,0,0,0.15) 0 1px 4px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;border:#fff 0.5em solid}   */
  
  
hr {  
  height: 0;  
  margin: 15px 0;  
  overflow: hidden;  
  background: transparent;  
  border: 0;  
  border-bottom: 1px solid #ddd;  
}  
  
  
/* 
 
Orginal Style from ethanschoonover.com/solarized (c) Jeremy Hull <sourdrums@gmail.com> 
 
*/  
  
.hljs {  
  display: block;  
  overflow-x: auto;  
  padding: 0.5em;  
  background: #fdf6e3;  
  color: #657b83;  
  -webkit-text-size-adjust: none;  
}  
  
.hljs-comment,  
.diff .hljs-header,  
.hljs-doctype,  
.hljs-pi,  
.lisp .hljs-string {  
  color: #93a1a1;  
}  
  
/* Solarized Green */  
.hljs-keyword,  
.hljs-winutils,  
.method,  
.hljs-addition,  
.css .hljs-tag,  
.hljs-request,  
.hljs-status,  
.nginx .hljs-title {  
  color: #859900;  
}  
  
/* Solarized Cyan */  
.hljs-number,  
.hljs-command,  
.hljs-string,  
.hljs-tag .hljs-value,  
.hljs-rule .hljs-value,  
.hljs-doctag,  
.tex .hljs-formula,  
.hljs-regexp,  
.hljs-hexcolor,  
.hljs-link_url {  
  color: #2aa198;  
}  
  
/* Solarized Blue */  
.hljs-title,  
.hljs-localvars,  
.hljs-chunk,  
.hljs-decorator,  
.hljs-built_in,  
.hljs-identifier,  
.vhdl .hljs-literal,  
.hljs-id,  
.css .hljs-function,  
.hljs-name {  
  color: #268bd2;  
}  
  
/* Solarized Yellow */  
.hljs-attribute,  
.hljs-variable,  
.lisp .hljs-body,  
.smalltalk .hljs-number,  
.hljs-constant,  
.hljs-class .hljs-title,  
.hljs-parent,  
.hljs-type,  
.hljs-link_reference {  
  color: #b58900;  
}  
  
/* Solarized Orange */  
.hljs-preprocessor,  
.hljs-preprocessor .hljs-keyword,  
.hljs-pragma,  
.hljs-shebang,  
.hljs-symbol,  
.hljs-symbol .hljs-string,  
.diff .hljs-change,  
.hljs-special,  
.hljs-attr_selector,  
.hljs-subst,  
.hljs-cdata,  
.css .hljs-pseudo,  
.hljs-header {  
  color: #cb4b16;  
}  
  
/* Solarized Red */  
.hljs-deletion,  
.hljs-important {  
  color: #dc322f;  
}  
  
/* Solarized Violet */  
.hljs-link_label {  
  color: #6c71c4;  
}  
  
.tex .hljs-formula {  
  background: #eee8d5;  
}  
  
  
/* custome */  
th, td {  
  padding: 2px 7px;  
}  
  
  
  
h1, h2 {  
  color: #4F86D5;  
}  
html, body {  
  word-wrap: break-word;  
}  
li {  
  /* TODO */  
  /* padding-left: 0px;*/  
}  

</style>