import React,{Component} from "react";
import "./about.less"
import profile  from "../../assets/profile.png";
export default class About extends Component{
    
    render(){
        return(
            <div className="container">
                <div id="about">
                    <div className="tx">
                    <img src={profile}  alt="图片找不到了^_^"/>
                </div>

                <div className="address">
                    <h2>联系方式</h2>
                    <p>QQ:2385577360@qq.com</p>
                    <p>Tel:18271455296</p>
                    <p>Wx:18271455295</p>
                </div>
                <div className="detail">
                    <h2>个人信息</h2>
                    <p>2020年毕业于武汉职业技术学院</p>
                    <p>专业：计算机网络技术</p>
                    <p>目前求职中。。。</p>
                </div>
                <div className="moni">
                    <h2>描述</h2>
                    <p>本网站属于个人练习项目</p>
                    <p>前端小白。。。</p>
                    <p>各方面都不成熟，还望见谅。。</p>
                </div>
            </div>
        </div>
        )
    }
}