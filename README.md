# CommPropMgmt
前端框架为React + Umi + Antd-pro，可用typescript / javascript进行开发；
js/ts/hooks个人笔记：https://docs.google.com/document/d/1I-CYsCog0JcqBwE4MJWeXuofTmkn5NEHMHZbQZLY4Uc/edit#heading=h.tbt5t5jj0lx7

数据流为Model + Service + Component，内有部分注释

# Team members:
Frontend: Jiekun Liu, Xiaoqian Liu, Haixu Wang
Backend: Hong Lu, Phillip Chan, Fu Lin, Baiyu Chen, Ray Zhang, Yichen Du

# 项目启动
node版本需要在8.0以上
1. 全局安装yarn： npm install -g yarn
2. 安装umi: yarn global add umi
3. 安装node_modules: yarn
4. 启动项目：yarn start

# Git相关操作
建议master分支存储稳定版本代码，各自在自己分支中开发并pull request到master中
1. 新建分支：git branch XXX 
2. 切换到自己的分支: git checkout XXX
3. 更新本地代码：git fetch 更新远程分支; git pull 更新本地代码 (推荐使用git pull --rebase保证commite tree整洁)
4. 提交本地代码: git add . 缓存本地更新的代码 --> git commit 提交更新代码到本地仓库 --> git push 提交到远程仓库
5. 更多Git相关操作link： https://learngitbranching.js.org/?locale=zh_CN / https://git-scm.com/book/en/v2
6. 从group project更新代码到分支：https://blog.csdn.net/WANTAWAY314/article/details/52385533

# Ant Design Pro和其他有用的文档
https://reactjs.bootcss.com/docs/getting-started.html
https://www.lodashjs.com/
https://pro.ant.design/docs/layout-cn
https://www.tslang.cn/docs/home.html
https://umijs.org/zh-CN
