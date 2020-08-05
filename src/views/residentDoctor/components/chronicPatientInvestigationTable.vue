<!-- 慢病患者个案调查表 -->
<template>
	<div class="chronicPatientInvestigationTable-container">
		<div class='report-table report-table-no-border border'>
			<h2 class="report-caption">苏州市慢病患者个案调查表</h2>
			<h3 class="report-caption-h3">一、一般情况</h3>
			<div class="tr third">
				<div>
					<span>1、地区编码：</span>
					<input type="text" name="">
				</div>
				<div>
					<span>报卡编码：</span>
					<input type="text" name="">
				</div>
				<div>
					<span>个调表编码：</span>
					<input type="text" name="">
				</div>
			</div>
			<div class="tr fourth">
				<div>
					<span>2、患者姓名：</span>
					<input type="text" name="">
				</div>
				<div>
					<span>3、性别：</span>
					<input type="text" name="">
				</div>
				<div>
					<span>4、名族：</span>
					<input type="text" name="">
				</div>
				<div>
					<span>5、血型：</span>
					<input type="text" name="">
				</div>
			</div>
			<div class="tr half">
				<div>
					<span>出生日期：</span>
					<input type="text" name=""> 年
					<input type="text" name=""> 月
					<input type="text" name=""> 日
				</div>
				<div>
					<span>未满15岁者的家长姓名：</span>
					<input type="text" name="">
				</div>
			</div>
			<div class="tr half">
				<div>
					7、学历：
					<label for="typeA">文盲<input type="checkbox" name="" id="typeA"></label>
					<label for="typeB">小学<input type="checkbox" name="" id="typeB"></label>
					<label for="typeC">中学(服)用<input type="checkbox" name="" id="typeC"></label>
					<label for="typeD">大学以上<input type="checkbox" name="" id="typeD"></label>
				</div>
				<div>
					8、婚姻状况：
					<label for="hyA">未婚<input type="checkbox" name="" id="hyA"></label>
					<label for="hyB">在婚<input type="checkbox" name="" id="hyB"></label>
					<label for="hyC">离婚<input type="checkbox" name="" id="hyC"></label>
					<label for="hyD">丧偶<input type="checkbox" name="" id="hyD"></label>
				</div>
			</div>
			<div class="tr pd10">
				9、户口地址：
				<input type="text" name=""> 市(区) <input type="text" name="">
				本地居中年限 <input type="text" name="">
			</div>
			<div class="tr pd10">
				10、患者职业：
				<label for="zyA">工人<input type="checkbox" name="" id="zyA"></label>
				<label for="zyB">农民<input type="checkbox" name="" id="zyB"></label>
				<label for="zyC">牧民<input type="checkbox" name="" id="zyC"></label>
				<label for="zyD">渔船民<input type="checkbox" name="" id="zyD"></label>
				<label for="zyE">医务人员<input type="checkbox" name="" id="zyE"></label>
				<label for="zyF">店员<input type="checkbox" name="" id="zyF"></label>
				<label for="zyG">职员<input type="checkbox" name="" id="zyG"></label>
				<label for="zyH">干部<input type="checkbox" name="" id="zyH"></label>
				<label for="zyI">教师<input type="checkbox" name="" id="zyI"></label>
				<label for="zyJ">厨师<input type="checkbox" name="" id="zyJ"></label>
				<label for="zyK">司机<input type="checkbox" name="" id="zyK"></label>
				<label for="zyL">经商<input type="checkbox" name="" id="zyL"></label>
				<label for="zyM">离退人员<input type="checkbox" name="" id="zyM"></label>
				<label for="zyN">家务<input type="checkbox" name="" id="zyN"></label>
				<label for="zyU">无业<input type="checkbox" name="" id="zyU"></label>
				<label for="zyV">幼儿<input type="checkbox" name="" id="zyV"></label>
				<label for="zyW">学生<input type="checkbox" name="" id="zyW"></label>
				<label for="zyX">其他<input type="text" name="" id="zyX"></label>
			</div>
			<div class="tr third">
				<div>
					<span>11、家庭总收入：</span>
					<input type="text" name=""> 元
				</div>
				<div>
					<span>总人口：</span>
					<input type="text" name=""> 人
				</div>
				<div>
					<span>每月用于伙食费用：</span>
					<input type="text" name=""> 元
				</div>
			</div>
			<h3 class="report-caption-h3">二、患病情况</h3>
			<div class="tr half">
				<div>
					<span>1、诊断日期：</span>
					<input type="text" name=""> 年
					<input type="text" name=""> 月
					<input type="text" name=""> 日
				</div>
				<div>
					<span>诊断医院：</span>
					<input type="text" name="">
				</div>
			</div>
			<div class="tr third">
				<div>
					<span>2、肿瘤名称：</span>
					<input type="text" name="">
				</div>
				<div>
					<span>病理类型：</span>
					<input type="text" name="">
				</div>
				<div>
					<span>ICD-10编码：</span>
					<input type="text" name="">
				</div>
			</div>
			<div class="tr pd10">
				<p class="block">3、临床表现</p>
				<p class="block">A 消化系统肿瘤：</p>
				<div class="block">
					a
					<label for="xhxtA">进行性咽下困难<input type="checkbox" name="" id="xhxtA"></label>
					<label for="xhxtB">咽下疼痛<input type="checkbox" name="" id="xhxtB"></label>
					<label for="xhxtC">食物反流<input type="checkbox" name="" id="xhxtC"></label>
					<label for="xhxtD">其他<input type="text" name="" id="xhxtD"></label>
				</div>
				<div class="block">
					b
					<label for="xhxtE">上腹痛<input type="checkbox" name="" id="xhxtE"></label>
					<label for="xhxtF">胃纳差<input type="checkbox" name="" id="xhxtF"></label>
					<label for="xhxtG">食无味<input type="checkbox" name="" id="xhxtG"></label>
					<label for="xhxtH">易饱感<input type="checkbox" name="" id="xhxtH"></label>
					<label for="xhxtI">无力<input type="checkbox" name="" id="xhxtI"></label>
					<label for="xhxtJ">体重减轻<input type="checkbox" name="" id="xhxtJ"></label>
					<label for="xhxtK">其他<input type="text" name="" id="xhxtK"></label>
				</div>
				<div class="block">
					c
					<label for="xhxtL">血便<input type="checkbox" name="" id="xhxtL"></label>
					<label for="xhxtM">脓血便<input type="checkbox" name="" id="xhxtM"></label>
					<label for="xhxtN">里急后重<input type="checkbox" name="" id="xhxtN"></label>
					<label for="xhxtO">便秘<input type="checkbox" name="" id="xhxtO"></label>
					<label for="xhxtP">腹泻<input type="checkbox" name="" id="xhxtP"></label>
					<label for="xhxtQ">腹痛<input type="checkbox" name="" id="xhxtQ"></label>
					<label for="xhxtR">腹部肿块<input type="checkbox" name="" id="xhxtR"></label>
					<label for="xhxtS">其他<input type="text" name="" id="xhxtS"></label>
				</div>
				<p class="block">B 呼吸系统肿瘤：</p>
				<div class="block">
					<label for="hxxtA">咳嗽<input type="checkbox" name="" id="hxxtA"></label>
					<label for="hxxtB">咳血<input type="checkbox" name="" id="hxxtB"></label>
					<label for="hxxtC">喘鸣<input type="checkbox" name="" id="hxxtC"></label>
					<label for="hxxtD">胸闷<input type="checkbox" name="" id="hxxtD"></label>
					<label for="hxxtE">气急<input type="checkbox" name="" id="hxxtE"></label>
					<label for="hxxtF">消瘦<input type="checkbox" name="" id="hxxtF"></label>
					<label for="hxxtG">发热<input type="checkbox" name="" id="hxxtG"></label>
					<label for="hxxtH">其他<input type="text" name="" id="hxxtH"></label>
				</div>
				<p class="block">C 妇科肿瘤：</p>
				<div class="block">
					a
					<label for="fkzlA">阴道流血<input type="checkbox" name="" id="fkzlA"></label>
					<label for="fkzlB">阴道排液<input type="checkbox" name="" id="fkzlB"></label>
					<label for="fkzlC">其他<input type="text" name="" id="fkzlC"></label>
				</div>
				<div class="block">
					b
					<label for="fkzlD">乳腺内无痛性肿块<input type="checkbox" name="" id="fkzlD"></label>
					<label for="fkzlE">局部皮肤凹陷<input type="checkbox" name="" id="fkzlE"></label>
					<label for="fkzlF">或桔皮样改变<input type="checkbox" name="" id="fkzlF"></label>
					<label for="fkzlH">乳头抬高<input type="checkbox" name="" id="fkzlH"></label>
					<label for="fkzlI">或内陷<input type="checkbox" name="" id="fkzlI"></label>
					<label for="fkzlJ">其他<input type="text" name="" id="fkzlJ"></label>
				</div>
				<p class="block">D 其他系统肿瘤：</p>
				<div class="block">
					<label for="qtzlA">表现<input type="text" name="" id="qtzlA"></label>
				</div>
			</div>
			<div class="tr pd10">
				4、特殊检查
				<label for="tsjcA">临床<input type="checkbox" name="" id="tsjcA"></label>
				<label for="tsjcB">x线<input type="checkbox" name="" id="tsjcB"></label>
				<label for="tsjcB">B超<input type="checkbox" name="" id="tsjcB"></label>
				<label for="tsjcB">内镜<input type="checkbox" name="" id="tsjcB"></label>
				<label for="tsjcB">CT<input type="checkbox" name="" id="tsjcB"></label>
				<label for="tsjcB">手术<input type="checkbox" name="" id="tsjcB"></label>
				<label for="tsjcB">生化免疫<input type="checkbox" name="" id="tsjcB"></label>
				<label for="tsjcB">病理<input type="checkbox" name="" id="tsjcB"></label>
				<label for="tsjcB">骨髓片<input type="checkbox" name="" id="tsjcB"></label>
				<label for="tsjcB">细胞学<input type="checkbox" name="" id="tsjcB"></label>
				<label for="tsjcB">时间<input type="checkbox" name="" id="tsjcB"></label>
				<label for="tsjcB">死亡补发病<input type="checkbox" name="" id="tsjcB"></label>
				<label for="tsjcB">其他<input type="text" name="" id="tsjcB"></label>
			</div>
			<div class="tr half">
				<div>
					<span>5、转归：</span>
					<label for="zgA">痊愈<input type="checkbox" name="" id="zgA"></label>
					<label for="zgB">好转<input type="checkbox" name="" id="zgB"></label>
					<label for="zgC">控制<input type="checkbox" name="" id="zgC"></label>
					<label for="zgD">恶化<input type="checkbox" name="" id="zgD"></label>
					<label for="zgE">死亡<input type="checkbox" name="" id="zgE"></label>
				</div>
				<div>
					<span>6、治疗：</span>
					<label for="zlA">化疗<input type="checkbox" name="" id="zlA"></label>
					<label for="zlB">放疗<input type="checkbox" name="" id="zlB"></label>
					<label for="zlC">手术<input type="checkbox" name="" id="zlC"></label>
					<label for="zlD">免疫<input type="checkbox" name="" id="zlD"></label>
					<label for="zlE">其他<input type="checkbox" name="" id="zlE"></label>
				</div>
			</div>
			<div class="tr pd10">
				<span>7、既往病史：</span>
				<input type="text" name="">
			</div>
			<div class="tr third">
				<div>
					<span>8、死亡日期：</span>
					<input type="text" name="">
				</div>
				<div>
					<span>死因：</span>
					<input type="text" name="">
				</div>
				<div>
					<span>诊断医院：</span>
					<input type="text" name="">
				</div>
			</div>
			<h3 class="report-caption-h3">三、危险因素</h3>
			<div class="tr pd10">
				<p class="block">1、家族史</p>
				<div class="block">
					血缘亲戚中，共有 <input type="text" name=""> 人分别患有 <input type="text" name=""> 肿瘤，亲戚关系为 <input type="text" name="">
				</div>
				<p class="block">2、体重指数</p>
				<div class="block">
					体重= <input type="text" name=""> kg 身高=<input type="text" name="">m BMI=<input type="text" name="">kg/㎡
				</div>
				<p class="block">3、抽烟</p>
				<div class="block">
					A <input type="text" name=""> 岁开始抽烟，平均每天吸 <input type="text" name=""> 支
				</div>
				<div class="block">
					B 烟 <label for="yanA">带<input type="checkbox" name="" id="yanA"></label>  <label for="yanB">不带<input type="checkbox" name="" id="yanB"></label> 过滤嘴， <label for="yanC">用<input type="checkbox" name="" id="yanC"></label>  <label for="yanD">不用<input type="checkbox" name="" id="yanD"></label> 烟斗
				</div>
				<div class="block">
					C 烟常吸到 <label for="yanE">嘴里<input type="checkbox" name="" id="yanE"></label>  <label for="yanF">嗓子<input type="checkbox" name="" id="yanF"></label>  <label for="yanG">气管<input type="checkbox" name="" id="yanG"></label>  <label for="yanH">肺部<input type="checkbox" name="" id="yanH"></label>
				</div>
				<div class="block">
					D 曾 <label for="yanI">戒<input type="checkbox" name="" id="yanI"></label>  <label for="yanJ">没戒<input type="checkbox" name="" id="yanJ"></label> ， 戒了<input type="text" name=""> 次，平均每次戒 <input type="text" name=""> 年(月)
				</div>
				<div class="block">
					E 现已 <label for="yank">戒掉<input type="checkbox" name="" id="yank"></label>  <label for="yanL">没戒掉<input type="checkbox" name="" id="yanL"></label> ，戒了 <input type="text" name="">  年(月)
				</div>
				<div class="block">
					F  <label for="yanM">生活<input type="checkbox" name="" id="yanM"></label>  <label for="yanN">工作<input type="checkbox" name="" id="yanN"></label> 环境  <label for="yanO">是<input type="checkbox" name="" id="yanO"></label>   <label for="yanP">否<input type="checkbox" name="" id="yanP"></label> 处于被动吸烟
				</div>
				<div class="block">
					G 其他有关吸烟情况的补充说明： <input type="text" name="">
				</div>
				<p class="block">4、饮酒</p>
				<div class="block">
					A 已有 <input type="text" name=""> 年饮酒史，曾戒酒 <input type="text" name=""> 次，平均每次坚持 <input type="text" name=""> 月，现在   <label for="jiuA">继续<input type="checkbox" name="" id="jiuA"></label>  <label for="jiuB">不再<input type="checkbox" name="" id="jiuB"></label> 饮酒
				</div>
				<div class="block">
					B 每周平均饮酒<input type="text" name="">次，平均每次饮 <input type="text" name=""> 两
				</div>
				<div class="block">
					C 饮酒主要种类：  <label for="jiuC">葡萄酒<input type="checkbox" name="" id="jiuC"></label> <label for="jiuD">黄酒：<input type="checkbox" name="" id="jiuD"></label> <label for="jiuE">啤酒：<input type="checkbox" name="" id="jiuE"></label> <label for="jiuF">白酒：<input type="checkbox" name="" id="jiuF"></label>
				</div>
				<div class="block">
					D 曾经 <label for="jiuJ">有<input type="checkbox" name="" id="jiuJ"></label> <label for="jiuH">没有<input type="checkbox" name="" id="jiuH"></label> 过醉酒史，平均每年醉 <input type="text" name=""> 次
				</div>
				<div class="block">
					E 其他有关饮酒情况的补充说明：<input type="text" name="">
				</div>
				<p class="block">5、活动</p>
				<div class="block">
					A 工作以  <label for="jobA">脑力<input type="checkbox" name="" id="jobA"></label>  <label for="jobB">体力<input type="checkbox" name="" id="jobB"></label> 劳动为主，体力劳动为  <label for="jobC">轻<input type="checkbox" name="" id="jobC"></label>  <label for="jobD">重<input type="checkbox" name="" id="jobD"></label> 度
				</div>
				<div class="block">
					B 上班或上学途中，一般  <label for="jobE">乘车<input type="checkbox" name="" id="jobE"></label>  <label for="jobF">步行<input type="checkbox" name="" id="jobF"></label> 骑自行车 <input type="text" name=""> 分钟
				</div>
				<div class="block">
					C 体育活动： 每周平均 <input type="text" name=""> 次，每次平均：<input type="text" name=""> 分钟
				</div>
				<p class="block">6、精神情绪</p>
				<div class="block">
					生活中大部分时间情绪态度  <label for="qxA">良好<input type="checkbox" name="" id="qxA"></label>  <label for="qxB">一般<input type="checkbox" name="" id="qxB"></label>  <label for="qxC">不好<input type="checkbox" name="" id="qxC"></label>
				</div>
				<p class="block">7、膳食</p>
				<div class="block">
					A 做菜口味 偏咸 <input type="text" name=""> 偏淡 <input type="text" name=""> 偏甜 <input type="text" name=""> 偏酸 <input type="checkbox" name="">
				</div>
				<div class="block">
					B 平均每周共吃 <input type="text" name=""> 次奶及奶制品(早、中、晚三餐，共计21次)
				</div>
				<div class="block">
					C 主食以  <label for="foodA">精米<input type="checkbox" name="" id="foodA"></label>  <label for="foodB">细面<input type="checkbox" name="" id="foodB"></label>  <label for="foodC">杂粮<input type="checkbox" name="" id="foodC"></label> 其他： <input type="text" name=""> 为主
				</div>
				<p class="block">8、水源</p>
				<div class="block">
					主要引用水源是  <label for="waterA">自来水<input type="checkbox" name="" id="waterA"></label>  <label for="waterB">井水<input type="checkbox" name="" id="waterB"></label>  <label for="waterC">沟塘水<input type="checkbox" name="" id="waterC"></label>  <label for="waterD">河水<input type="checkbox" name="" id="waterD"></label> 其他 <input type="text" name="">
				</div>
				<p class="block">9、烹调过程</p>
				<div class="block">
					A 火源：  <label for="fireA">液化气<input type="checkbox" name="" id="fireA"></label>  <label for="fireB">管道气<input type="checkbox" name="" id="fireB"></label>  <label for="fireC">燃煤<input type="checkbox" name="" id="fireC"></label>  <label for="fireD">燃柴<input type="checkbox" name="" id="fireD"></label>  <label for="fireE">用电<input type="checkbox" name="" id="fireE"></label> 其他 <input type="text" name="">
				</div>
				<div class="block">
					B 厨房装  <label for="fireH">有<input type="checkbox" name="" id="fireH"></label>  <label for="fireI">无<input type="checkbox" name="" id="fireI"></label> 吸排油烟装置
				</div>
				<div class="block">
					C 平均每周下厨 <input type="text" name=""> 次
				</div>
				<p class="block">10、居室装修</p>
				<div class="block">
					A 居室 进行 <input type="text" name=""> 未曾 <input type="text" name=""> 装修
				</div>
				<div class="block">
					B 装饰材料有： 大理石 天然 <input type="checkbox" name=""> 人造 <input type="checkbox" name=""> 地砖 <input type="checkbox" name=""> 瓷砖 <input type="checkbox" name=""> 地板 <input type="checkbox" name=""> 喷瓷 <input type="checkbox" name=""> 乳胶漆 <input type="checkbox" name=""> 涂料 <input type="checkbox" name=""> 花岗岩 <input type="checkbox" name=""> 其他 <input type="text" name="">
				</div>
				<p class="block">11、感染史</p>
				<div class="block">
					A 肝炎病毒  <label for="grA">曾<input type="checkbox" name="" id="grA"></label>  <label for="grB">未<input type="checkbox" name="" id="grB"></label> 感染过病毒性肝炎，为 <input type="text" name=""> 型肝炎，乙肝表面抗原  <label for="grC">阳性<input type="checkbox" name="" id="grC"></label>  <label for="grD">阴性<input type="checkbox" name="" id="grD"></label> 乙肝抗体  <label for="grE">阳性<input type="checkbox" name="" id="grE"></label>  <label for="grH">阴性<input type="checkbox" name="" id="grH"></label>
				</div>
				<div class="block">
					B <label for="grI">EB病毒感染史<input type="checkbox" name="" id="grI"></label>
					C <label for="grJ">单纯性疱疹病毒II型<input type="checkbox" name="" id="grJ"></label>
					D <label for="grK">幽门螺旋杆菌<input type="checkbox" name="" id="grK"></label>
				</div>
				<div class="block">
					E <label for="grL">埃及血吸虫病<input type="checkbox" name="" id="grL"></label>
					F <label for="grM">甘支睾吸虫病<input type="checkbox" name="" id="grM"></label>
					G <label for="grN">溃疡性结肠炎<input type="checkbox" name="" id="grN"></label>
					H 其他 <input type="text" name="">
				</div>
				<p class="block">12、(特殊工种者填写)</p>
				<div class="block">
					<p>A 化学毒物</p>
					<div>工作劳动中，曾接触下列物质：  <label for="hxA">苯<input type="checkbox" name="" id="hxA"></label>  <label for="hxB">油漆<input type="checkbox" name="" id="hxB"></label>  <label for="hxC">农药<input type="checkbox" name="" id="hxC"></label>  <label for="hxD">氯乙烯<input type="checkbox" name="" id="hxD"></label>  <label for="hxE">沥青<input type="checkbox" name="" id="hxE"></label>  <label for="hxF">石棉<input type="checkbox" name="" id="hxF"></label>  <label for="hxH">燃料<input type="checkbox" name="" id="hxH"></label> 其他 <input type="text" name=""></div>
					<p>B 电离辐射</p>
					<div>共曾接受过X线照射 <input type="text" name="">次，曾 <label for="fsA">有<input type="checkbox" name="" id="fsA"></label>  <label for="fsB">无<input type="checkbox" name="" id="fsB"></label> 短期内多次照射，具体为 <input type="text" name=""> (年、月)时间内照射 <input type="text" name=""> 次</div>
				</div>
				<p class="block">13、(妇科肿瘤患者填写)妇女月经生育史</p>
				<div class="block">
					A 月经 初潮年龄： <input type="text" name=""> 岁  行经天数： <input type="text" name=""> 天
				</div>
				<div class="block">
					B 婚姻 结婚年龄： <input type="text" name=""> 岁
				</div>
				<div class="block">
					C 生育
					初次受孕年龄： <input type="text" name=""> 岁
					受孕次数： <input type="text" name=""> 次
					初次生产年龄： <input type="text" name=""> 岁
					生产次数： <input type="text" name=""> 次
					哺乳次数： <input type="text" name=""> 次
					平均每次时间： <input type="text" name=""> 月
				</div>
				<div class="block">
					D 避孕
					 <label for="byA">药物<input type="checkbox" name="" id="byA"></label>  <label for="byB">工具<input type="checkbox" name="" id="byB"></label>
					避孕，避孕药  <label for="byC">是<input type="checkbox" name="" id="byC"></label>  <label for="byD">否<input type="checkbox" name="" id="byD"></label> 为雌激素类，使用时间 <input type="text" name=""> 年(月)
				</div>
				<div class="block text-right">
					调查者：<input type="text" name="">
					调查日期：<input type="text" name="">
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import '@/styles/style/report-table.scss'

	export default {
		name: 'chronicPatientInvestigationTable',
		data () {
			return {}
		}
	}
</script>

<style lang="scss" scoped></style>
