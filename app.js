/* 全局常量与工具 */
const TERM_ANCHOR_STR = '2025-09-20'; // 第一周锚点（周次从此日所在周计为第1周）
const MAX_WEEKS = 18; // 最大周数

// 学分映射（课程代码 -> 学分）
const CODE_TO_CREDIT = {
	FL6001: 2,
	GE6001: 1,
	MARX6001: 2,
	MARX6003: 1,
	MEM6001: 3,
	MEM6002: 2,
	MEM6003: 2,
	MEM6005: 2,
	MEM6006: 2,
	GE6012: 2,
	MEM6301: 2,
	MEM6302: 2,
	MEM6303: 2,
	MEM6304: 2,
	MEM6305: 2,
	MEM6306: 2,
	MEM6307: 2,
	MEM6308: 1,
	MEM6309: 2,
	MEM6310: 2,
	MEM6311: 2,
	MEM8301: 2,
	MEM8302: 2,
	MEM8303: 2,
	MEM8304: 2,
	MEM8305: 2,
	MEM8306: 2,
	MEM8307: 2,
	MEM8308: 2,
	MEM8309: 2,
};

// 必修课程组配置
const REQUIRED_GROUPS = {
	core: {
		name: '核心必修课程',
		description: '必须选择3门',
		codes: ['MEM6001', 'MEM6002', 'MEM6003', 'MEM6005', 'MEM6006'],
		required: 3,
		color: '#f59e0b' // 橙色标识
	}
};

// Excel 固化数据：示例结构。若你提供真实字段名，可替换。
// 字段：id, name, weekday(1-7, 周一为1), startTime("HH:mm"), endTime("HH:mm"), teacher, room
const COURSES = [
	{ id: 1, code: "GE6001", name: "学术写作、规范与伦理", className: "GE6001-03000-S01-PT", credit: 1, firstDate: "2025-12-27", teacher: "李红兵", capacity: 100, weeks: "15-18周", weekday: 6, startTime: "13:30", endTime: "17:00", room: "教一楼200", gpa: true },
	{ id: 2, code: "GE6001", name: "学术写作、规范与伦理", className: "GE6001-03000-S02-PT", credit: 1, firstDate: "2025-12-28", teacher: "李红兵", capacity: 100, weeks: "15-18周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼200", gpa: true },
	{ id: 3, code: "GE6001", name: "学术写作、规范与伦理", className: "GE6001-03000-S03-PT", credit: 1, firstDate: "2025-12-28", teacher: "李红兵", capacity: 100, weeks: "15-18周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "教一楼200", gpa: true },
	{ id: 4, code: "MEM6001", name: "定量分析：模型与方法", className: "MEM6001-03000-S01-PT", credit: 3, firstDate: "2025-09-20", teacher: "周钢", capacity: 70, weeks: "1-2,5-14周", weekday: 6, startTime: "13:30", endTime: "17:00", room: "教一楼100", gpa: true },
	{ id: 5, code: "MEM6001", name: "定量分析：模型与方法", className: "MEM6001-03000-S02-PT", credit: 3, firstDate: "2025-09-21", teacher: "周钢", capacity: 70, weeks: "1,4-14周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼100", gpa: true },
	{ id: 6, code: "MEM6001", name: "定量分析：模型与方法", className: "MEM6001-03000-S03-PT", credit: 3, firstDate: "2025-09-21", teacher: "周钢", capacity: 70, weeks: "1,4-14周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "教一楼100", gpa: true },
	{ id: 7, code: "MEM6001", name: "定量分析：模型与方法", className: "MEM6001-03000-S04-PT", credit: 3, firstDate: "2025-09-21", teacher: "潘常春", capacity: 60, weeks: "1,4-14周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "教一楼125", gpa: true },
	{ id: 8, code: "MEM6002", name: "工程管理导论", className: "MEM6002-03000-S01-PT", credit: 2, firstDate: "2025-09-20", teacher: "全林", capacity: 100, weeks: "1-2,5-10周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "教一楼400", gpa: true },
	{ id: 9, code: "MEM6003", name: "工程经济学", className: "MEM6003-03000-S01-PT", credit: 2, firstDate: "2025-09-20", teacher: "殷翔", capacity: 100, weeks: "1-2,5-10周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "教一楼300", gpa: true },
	{ id: 10, code: "MEM6003", name: "工程经济学", className: "MEM6003-03000-S02-PT", credit: 2, firstDate: "2025-09-20", teacher: "殷翔", capacity: 100, weeks: "1-2,5-10周", weekday: 6, startTime: "13:30", endTime: "17:00", room: "教一楼300", gpa: true },
	{ id: 11, code: "MEM6003", name: "工程经济学", className: "MEM6003-03000-S03-PT", credit: 2, firstDate: "2025-11-30", teacher: "杨忠直", capacity: 100, weeks: "11-18周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼400", gpa: true },
	{ id: 12, code: "MEM6005", name: "质量与可靠性管理", className: "MEM6005-03000-S01-PT", credit: 2, firstDate: "2025-09-21", teacher: "苗瑞", capacity: 80, weeks: "1,4-10周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "教一楼200", gpa: true },
	{ id: 13, code: "MEM6005", name: "质量与可靠性管理", className: "MEM6005-03000-S02-PT", credit: 2, firstDate: "2025-11-29", teacher: "苗瑞", capacity: 80, weeks: "11-18周", weekday: 6, startTime: "13:30", endTime: "17:00", room: "教一楼410", gpa: true },
	{ id: 14, code: "MEM6005", name: "质量与可靠性管理", className: "MEM6005-03000-S03-PT", credit: 2, firstDate: "2025-11-30", teacher: "苗瑞", capacity: 80, weeks: "11-18周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "教一楼410", gpa: true },
	{ id: 15, code: "MEM6006", name: "工程信息管理", className: "MEM6006-03000-S01-PT", credit: 2, firstDate: "2025-09-21", teacher: "蔡鸿明", capacity: 100, weeks: "1,4-10周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼400", gpa: true },
	{ id: 16, code: "MEM6006", name: "工程信息管理", className: "MEM6006-03000-S02-PT", credit: 2, firstDate: "2025-11-29", teacher: "刘雨桐", capacity: 100, weeks: "11-18周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "教一楼300", gpa: true },
	{ id: 17, code: "MEM6301", name: "人力资源与沟通管理", className: "MEM6301-03000-S01-PT", credit: 2, firstDate: "2025-11-30", teacher: "陶祁", capacity: 70, weeks: "11-18周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼425", gpa: true },
	{ id: 18, code: "MEM6302", name: "领导力", className: "MEM6302-03000-S01-PT", credit: 2, firstDate: "2025-11-30", teacher: "张兴福", capacity: 100, weeks: "11-18周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "教一楼400", gpa: true },
	{ id: 19, code: "MEM6304", name: "库存与供应链管理", className: "MEM6304-03000-S01-PT", credit: 2, firstDate: "2025-11-30", teacher: "张文杰", capacity: 50, weeks: "11-18周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼308", gpa: true },
	{ id: 20, code: "MEM6304", name: "库存与供应链管理", className: "MEM6304-03000-S02-PT", credit: 2, firstDate: "2025-11-30", teacher: "张文杰", capacity: 50, weeks: "11-18周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "教一楼308", gpa: true },
	{ id: 21, code: "MEM6305", name: "风险管理与高效决策", className: "MEM6305-03000-S01-PT", credit: 2, firstDate: "2025-09-21", teacher: "王春香", capacity: 70, weeks: "1,4-10周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼425", gpa: true },
	{ id: 22, code: "MEM6309", name: "区块链与金融科技创新概论", className: "MEM6309-03000-S01-PT", credit: 2, firstDate: "2025-09-21", teacher: "范磊", capacity: 60, weeks: "1,4-10周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼125", gpa: true },
	{ id: 23, code: "MEM6310", name: "运营管理", className: "MEM6310-03000-S01-PT", credit: 2, firstDate: "2025-09-20", teacher: "邵晓峰", capacity: 100, weeks: "1-2,5-10周", weekday: 6, startTime: "13:30", endTime: "17:00", room: "教一楼400", gpa: true },
	{ id: 24, code: "MEM6311", name: "工程管理法律概论", className: "MEM6311-03000-S01-PT", credit: 2, firstDate: "2025-11-29", teacher: "王猛", capacity: 100, weeks: "11-18周", weekday: 6, startTime: "13:30", endTime: "17:00", room: "教一楼400", gpa: true },
	{ id: 25, code: "MEM8301", name: "大数据与互联网思维", className: "MEM8301-03000-S01-PT", credit: 2, firstDate: "2025-09-20", teacher: "吴晨涛", capacity: 100, weeks: "2,5-10周", weekday: 6, startTime: "13:30", endTime: "17:00", room: "教一楼200", gpa: false },
	{ id: 25, code: "MEM8301", name: "大数据与互联网思维", className: "MEM8301-03000-S01-PT", credit: 2, firstDate: "2025-09-20", teacher: "吴晨涛", capacity: 100, weeks: "2周", weekday: 6, startTime: "18:00", endTime: "21:10", room: "教一楼300", gpa: false },
	{ id: 26, code: "MEM8302", name: "物联网技术与发展趋势", className: "MEM8302-03000-S01-PT", credit: 2, firstDate: "2025-09-20", teacher: "陈奕超", capacity: 60, weeks: "1-2,5-10周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "教一楼100", gpa: false },
	{ id: 27, code: "MEM8302", name: "物联网技术与发展趋势", className: "MEM8302-03000-S02-PT", credit: 2, firstDate: "2025-11-29", teacher: "俞嘉地", capacity: 60, weeks: "11-18周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "教一楼100", gpa: false },
	{ id: 28, code: "MEM8303", name: "人工智能", className: "MEM8303-03000-S01-PT", credit: 2, firstDate: "2025-11-29", teacher: "张晓凡", capacity: 100, weeks: "11-18周", weekday: 6, startTime: "13:30", endTime: "17:00", room: "教一楼300", gpa: false },
	{ id: 29, code: "MEM8304", name: "网络信息安全理论与技术", className: "MEM8304-03000-S01-PT", credit: 2, firstDate: "2025-11-29", teacher: "李生红", capacity: 80, weeks: "11-18周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "教一楼400", gpa: false },
	{ id: 30, code: "MEM8306", name: "新能源技术及应用", className: "MEM8306-03000-S01-PT", credit: 2, firstDate: "2025-09-20", teacher: "殳国华", capacity: 60, weeks: "1-2,5-10周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "教一楼425", gpa: false },
	{ id: 31, code: "MEM8306", name: "新能源技术及应用", className: "MEM8306-03000-S02-PT", credit: 2, firstDate: "2025-11-29", teacher: "李然,吴超", capacity: 60, weeks: "11-18周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "教一楼425", gpa: false },
	{ id: 32, code: "MEM8307", name: "大规模集成电路概述", className: "MEM8307-03000-S01-PT", credit: 2, firstDate: "2025-11-30", teacher: "毛志刚", capacity: 60, weeks: "11-18周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼125", gpa: false },
];

/* 状态 */
let state = {
	selectedIds: new Set(),
	currentWeekStart: startOfWeek(dayjs(TERM_ANCHOR_STR).toDate()),
	currentWeekNo: 1,
	filteredCourses: COURSES,
	searchKeyword: "",
};

/* 时间/日期工具 */
function startOfWeek(date) {
	// 以周一为周起点
	const d = dayjs(date);
	const monday = d.startOf('week').add(1, 'day');
	return monday.toDate();
}

function getTimeSlot(timeStr) {
	// 将时间转换为上午/下午/晚上
	const [h] = timeStr.split(":").map(Number);
	if (h < 12) return 'morning';
	if (h < 18) return 'afternoon';
	return 'evening';
}

function formatTimeRange(s, e) { return `${s} - ${e}`; }

// 学周工具
function getWeek1Start() {
	return startOfWeek(dayjs(TERM_ANCHOR_STR).toDate());
}
function getWeekStartByNo(weekNo) {
	return dayjs(getWeek1Start()).add(weekNo - 1, 'week').toDate();
}
function parseWeeks(weeksStr) {
	// 例："1-2,5-14周" / "11-18周" / "1,4-10周"
	if (!weeksStr) return new Set();
	const s = weeksStr.replace(/周/g, '').trim();
	const parts = s.split(',');
	const set = new Set();
	for (const p of parts) {
		const seg = p.trim();
		if (!seg) continue;
		if (seg.includes('-')) {
			const [a,b] = seg.split('-').map(n => Number(n));
			if (!isNaN(a) && !isNaN(b)) {
				for (let i=a; i<=b; i++) set.add(i);
			}
		} else {
			const n = Number(seg);
			if (!isNaN(n)) set.add(n);
		}
	}
	return set;
}
function isCourseInWeek(course, weekNo) {
	const set = parseWeeks(course.weeks);
	return set.size === 0 ? true : set.has(weekNo);
}

/* DOM 引用 */
const weekTitleEl = document.getElementById('weekTitle');
const calendarEl = document.getElementById('calendar');
const courseTbodyEl = document.getElementById('courseTbody');
const searchInputEl = document.getElementById('searchInput');
const clearSelectionBtn = document.getElementById('clearSelectionBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFileInputEl = document.getElementById('importFileInput');
const downloadImageBtn = document.getElementById('downloadImageBtn');
const prevWeekBtn = document.getElementById('prevWeekBtn');
const nextWeekBtn = document.getElementById('nextWeekBtn');
// Removed non-existent DOM element references
const mappingHintEl = document.getElementById('mappingHint');
const creditTotalEl = document.getElementById('creditTotal');
const requiredProgressEl = document.getElementById('requiredProgress');
const gpaDisplayEl = document.getElementById('gpaDisplay');
const conflictDisplayEl = document.getElementById('conflictDisplay');

/* 渲染：周末专用日历栅格 */
function renderCalendarGrid() {
	calendarEl.innerHTML = '';
	// 头部：时间列 + 周次×周末列
	const corner = document.createElement('div');
	corner.className = 'day-header';
	corner.textContent = '';
	calendarEl.appendChild(corner);
	
	// 生成周次×周末列标题
	for (let week = 1; week <= MAX_WEEKS; week++) {
		const weekStart = getWeekStartByNo(week);
		const satDate = dayjs(weekStart).add(4, 'day'); // 周六
		const sunDate = dayjs(weekStart).add(5, 'day'); // 周日
		
		const satHeader = document.createElement('div');
		satHeader.className = 'day-header';
		satHeader.textContent = `第${week}周 ${satDate.format('M/DD')} 周六`;
		satHeader.dataset.week = String(week);
		satHeader.dataset.day = '6';
		calendarEl.appendChild(satHeader);
		
		const sunHeader = document.createElement('div');
		sunHeader.className = 'day-header';
		sunHeader.textContent = `第${week}周 ${sunDate.format('M/DD')} 周日`;
		sunHeader.dataset.week = String(week);
		sunHeader.dataset.day = '7';
		calendarEl.appendChild(sunHeader);
	}
	
	// 上午/下午/晚上行
	const timeSlots = ['morning', 'afternoon', 'evening'];
	for (const slot of timeSlots) {
		const timeCell = document.createElement('div');
		timeCell.className = 'time-col';
		timeCell.textContent = slot === 'morning' ? '上午' : slot === 'afternoon' ? '下午' : '晚上';
		calendarEl.appendChild(timeCell);
		
		for (let week = 1; week <= MAX_WEEKS; week++) {
			for (let day = 6; day <= 7; day++) {
				const cell = document.createElement('div');
				cell.className = 'cell';
				cell.dataset.week = String(week);
				cell.dataset.day = String(day);
				cell.dataset.slot = slot;
				calendarEl.appendChild(cell);
			}
		}
	}
}

function groupOverlaps(courses) {
	// 输入：同一天同一周同一时段的课程数组
	// 输出：若互相有重叠则放入同一组
	const groups = [];
	let current = [];
	let currentEnd = -1;
	for (const c of courses) {
		const s = minutesSinceStart(c.startTime);
		const e = minutesSinceStart(c.endTime);
		if (current.length === 0) {
			current.push(c);
			currentEnd = e;
			continue;
		}
		if (s < currentEnd) {
			current.push(c);
			currentEnd = Math.max(currentEnd, e);
		} else {
			groups.push(current);
			current = [c];
			currentEnd = e;
		}
	}
	if (current.length) groups.push(current);
	return groups;
}

function minutesSinceStart(timeStr) {
	const [h, m] = timeStr.split(":").map(Number);
	return h * 60 + m;
}

/* 渲染：已选课程到周末日历 */
function renderEvents() {
	// 清理旧事件
	const oldEvents = calendarEl.querySelectorAll('.event');
	oldEvents.forEach(e => e.remove());

	const selectedCourses = COURSES.filter(c => state.selectedIds.has(c.id));
	// 按周次×天×时段分组
	const byWeekDaySlot = new Map();
	for (const c of selectedCourses) {
		if (c.weekday !== 6 && c.weekday !== 7) continue; // 只处理周末
		const weekSet = parseWeeks(c.weeks);
		if (weekSet.size === 0) continue; // 跳过无周次信息的课程
		
		for (const weekNo of weekSet) {
			const slot = getTimeSlot(c.startTime);
			const key = `${weekNo}-${c.weekday}-${slot}`;
			if (!byWeekDaySlot.has(key)) byWeekDaySlot.set(key, []);
			byWeekDaySlot.get(key).push(c);
		}
	}
	
	for (const [key, courses] of byWeekDaySlot) {
		const [weekNo, day, slot] = key.split('-');
		const groups = groupOverlaps(courses);
		
		for (const group of groups) {
			const cell = calendarEl.querySelector(`.cell[data-week="${weekNo}"][data-day="${day}"][data-slot="${slot}"]`);
			if (!cell) continue;
			
			const block = document.createElement('div');
			
			// 检查是否包含必修课程
			const hasRequiredCourse = group.some(c => isRequiredCourse(c.code));
			
			block.className = 'event' + (group.length > 1 ? ' conflict group' : '') + (hasRequiredCourse ? ' required' : '');
			block.style.position = 'absolute';
			block.style.top = '2px';
			block.style.left = '2px';
			block.style.right = '2px';
			block.style.bottom = '2px';
			block.style.borderRadius = '6px';
			block.style.padding = '6px 8px';
			block.style.fontSize = '12px';
			block.style.lineHeight = '1.2';
			block.style.overflow = 'hidden';
			
			// 优先级：冲突 > 必修 > 普通
			if (group.length > 1) {
				block.style.background = '#fee2e2';
				block.style.border = '1px solid #fca5a5';
			} else if (hasRequiredCourse) {
				block.style.background = '#fef3c7';
				block.style.border = '2px solid #f59e0b';
			} else {
				block.style.background = '#dbeafe';
				block.style.border = '1px solid #93c5fd';
			}
			block.style.color = '#0b1220';

			if (group.length === 1) {
				const c = group[0];
				const requiredGroup = isRequiredCourse(c.code);
				const requiredBadge = requiredGroup ? '<span style="background:#f59e0b;color:white;font-size:9px;padding:1px 4px;border-radius:4px;margin-left:4px;">必修</span>' : '';
				const gpaBadge = c.gpa === true ? '<span style="background:#059669;color:white;font-size:9px;padding:1px 4px;border-radius:4px;margin-left:4px;">GPA</span>' : 
								c.gpa === false ? '<span style="background:#6b7280;color:white;font-size:9px;padding:1px 4px;border-radius:4px;margin-left:4px;">非GPA</span>' : '';
                // 添加课程代码显示
                block.innerHTML = `
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                        <div style="flex:1;min-width:0;">
                            <div class="title" style="font-weight:600;margin-bottom:2px;">[${escapeHtml(c.code)}] ${escapeHtml(c.name)}${requiredBadge}${gpaBadge}</div>
                            <div class="meta" style="color:#374151;opacity:0.9;">${formatTimeRange(c.startTime, c.endTime)} · ${escapeHtml(c.room || '')} · ${escapeHtml(c.teacher || '')}</div>
                        </div>
                        <button class="unselect-btn" data-course-id="${c.id}" style="background:rgba(0,0,0,0.1);border:none;border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:12px;color:#666;margin-left:4px;flex-shrink:0;" title="取消选择">×</button>
                    </div>
                `;
            } else {
                const items = group.map(c => {
                    const requiredGroup = isRequiredCourse(c.code);
                    const requiredBadge = requiredGroup ? '<span style="background:#f59e0b;color:white;font-size:8px;padding:1px 3px;border-radius:3px;margin-left:3px;">必修</span>' : '';
                    const gpaBadge = c.gpa === true ? '<span style="background:#059669;color:white;font-size:8px;padding:1px 3px;border-radius:3px;margin-left:3px;">GPA</span>' : 
                                    c.gpa === false ? '<span style="background:#6b7280;color:white;font-size:8px;padding:1px 3px;border-radius:3px;margin-left:3px;">非GPA</span>' : '';
                    // 添加课程代码显示
                    return `
                        <div class="conf-item" style="background:rgba(255,255,255,0.6);border:1px dashed #fca5a5;border-radius:2px;padding:2px;margin:1px 0;position:relative;">
                            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                                <div style="flex:1;min-width:0;">
                                    <div class="conf-title" style="font-weight:600;margin-bottom:1px;">[${escapeHtml(c.code)}] ${escapeHtml(c.name)}${requiredBadge}${gpaBadge}</div>
                                    <div class="conf-meta" style="color:#374151;opacity:0.9;">${formatTimeRange(c.startTime, c.endTime)} · ${escapeHtml(c.room || '')} · ${escapeHtml(c.teacher || '')}</div>
                                </div>
                                <button class="unselect-btn" data-course-id="${c.id}" style="background:rgba(0,0,0,0.1);border:none;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:10px;color:#666;margin-left:4px;flex-shrink:0;" title="取消选择">×</button>
                            </div>
                        </div>
                    `;
                }).join('');
                block.innerHTML = `
                    <div class="title" style="font-weight:600;margin-bottom:2px;">时间冲突</div>
                    <div class="conf-list">${items}</div>
                `;
            }
			cell.appendChild(block);
		}
	}
}

/* 渲染：课程列表 */
function renderCourseList() {
	const selectedCodes = getSelectedCourseCodes();
	const rows = state.filteredCourses.map(c => {
		const isSelected = state.selectedIds.has(c.id);
		const canSelect = isSelected || canSelectCourse(c.id);
		const checked = isSelected ? 'checked' : '';
		const disabled = ''; // 不再禁用任何复选框
		const inThisWeek = isCourseInWeek(c, state.currentWeekNo);
		const weeksText = escapeHtml(c.weeks || '') + (inThisWeek ? '（本周）' : '');
		const credit = CODE_TO_CREDIT[c.code] ?? c.credit ?? '';
		
		// 检查是否为必修课程和冲突情况
		const requiredGroup = isRequiredCourse(c.code);
		const hasConflict = wouldConflictWithSelected(c.id);
		
		let rowClass = '';
		if (hasConflict) {
			rowClass = 'style="opacity:0.6;background:#fee2e2;border-left:4px solid #dc2626;"'; // 红色背景表示冲突
		} else if (requiredGroup) {
			rowClass = 'style="background:#fef3c7;border-left:4px solid #f59e0b;"'; // 橙色背景表示必修
		}
		
		const duplicateHint = selectedCodes.has(c.code) ? '<span style="color:#ef4444;font-size:11px;">（已选相同课程）</span>' : '';
		const conflictHint = hasConflict ? '<span style="color:#dc2626;font-size:11px;font-weight:600;">（时间冲突）</span>' : '';
		const requiredHint = requiredGroup ? `<span style="color:#f59e0b;font-size:11px;font-weight:600;">（${requiredGroup.description}）</span>` : '';
		const gpaHint = c.gpa === true ? '<span style="color:#059669;font-size:11px;font-weight:600;">（计入GPA）</span>' : 
						c.gpa === false ? '<span style="color:#6b7280;font-size:11px;">（不计GPA）</span>' : '';
		
		return `
			<tr ${rowClass}>
				<td><input type="checkbox" data-id="${c.id}" ${checked} ${disabled}></td>
				<td>${escapeHtml(c.code || '')}${duplicateHint}${conflictHint}${requiredHint}${gpaHint}</td>
				<td>${escapeHtml(c.name)}<div style="font-size:12px;color:#6b7280;">学分：${credit}</div></td>
				<td>${weekdayLabel(c.weekday)}</td>
				<td>${formatTimeRange(c.startTime, c.endTime)}</td>
				<td>${escapeHtml(c.teacher || '')}</td>
				<td>${escapeHtml(c.room || '')}</td>
				<td>${weeksText}</td>
			</tr>
		`;
	}).join('');
	courseTbodyEl.innerHTML = rows || `<tr><td colspan="8" style="text-align:center;color:#9ca3af;">无结果</td></tr>`;
	updateSelectedCredit();
}

function escapeHtml(s){ return String(s).replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m])); }
function weekdayLabel(w){ return ['','周一','周二','周三','周四','周五','周六','周日'][w] || ''; }

/* 过滤 */
function applyFilter() {
	const kw = state.searchKeyword.trim().toLowerCase();
	if (!kw) { state.filteredCourses = COURSES; return; }
	state.filteredCourses = COURSES.filter(c => {
		return [c.name, c.teacher, c.room].some(v => String(v||'').toLowerCase().includes(kw));
	});
}

function updateSelectedCredit() {
	let total = 0;
	for (const id of state.selectedIds) {
		const c = COURSES.find(x => x.id === id);
		if (!c) continue;
		const credit = CODE_TO_CREDIT[c.code] ?? c.credit ?? 0;
		total += Number(credit) || 0;
	}
	if (creditTotalEl) creditTotalEl.textContent = String(total);
	
	// 更新必修课程进度
	const progress = getRequiredCourseProgress('core');
	if (requiredProgressEl) {
		const color = progress.selected >= progress.required ? '#10b981' : (progress.selected > 0 ? '#f59e0b' : '#6b7280');
		requiredProgressEl.textContent = `${progress.selected}/${progress.required}`;
		requiredProgressEl.style.color = color;
	}
	
	// 更新GPA学分显示
	const gpaCredits = calculateGPACredits();
	if (gpaDisplayEl) {
		gpaDisplayEl.textContent = String(gpaCredits);
		gpaDisplayEl.style.color = gpaCredits > 0 ? '#059669' : '#6b7280';
	}
	
	// 更新冲突显示
	const conflictCount = calculateTotalConflicts();
	if (conflictDisplayEl) {
		conflictDisplayEl.textContent = String(conflictCount);
		conflictDisplayEl.style.color = conflictCount > 0 ? '#dc2626' : '#6b7280';
		// Debug log
		console.log('Conflict count updated:', conflictCount);
	}
}

function getSelectedCourseCodes() {
	const codes = new Set();
	for (const id of state.selectedIds) {
		const c = COURSES.find(x => x.id === id);
		if (c && c.code) codes.add(c.code);
	}
	return codes;
}

function canSelectCourse(courseId) {
	// 允许选择所有课程，不再禁止选择相同课程代码
	return true;
}

function wouldConflictWithSelected(courseId) {
	const course = COURSES.find(c => c.id === courseId);
	if (!course) return false;
	
	// 如果课程已经被选择，不算冲突
	if (state.selectedIds.has(courseId)) return false;
	
	// 只检查周末课程
	if (course.weekday !== 6 && course.weekday !== 7) return false;
	
	const selectedCourses = COURSES.filter(c => 
		state.selectedIds.has(c.id) && 
		(c.weekday === 6 || c.weekday === 7)
	);
	
	const courseWeeks = parseWeeks(course.weeks);
	const courseSlot = getTimeSlot(course.startTime);
	
	// 检查是否与任何已选课程在时间上冲突
	for (const selected of selectedCourses) {
		if (selected.weekday === course.weekday) {
			const selectedWeeks = parseWeeks(selected.weeks);
			const selectedSlot = getTimeSlot(selected.startTime);
			
			// 检查是否有重叠的周次且时间段相同
			const hasOverlapWeeks = [...courseWeeks].some(week => selectedWeeks.has(week));
			
			if (hasOverlapWeeks && selectedSlot === courseSlot) {
				// 进一步检查实际时间是否重叠
				if (timeRangesOverlap(course.startTime, course.endTime, selected.startTime, selected.endTime)) {
					return true;
				}
			}
		}
	}
	
	return false;
}

function timeRangesOverlap(start1, end1, start2, end2) {
	const start1Min = minutesSinceStart(start1);
	const end1Min = minutesSinceStart(end1);
	const start2Min = minutesSinceStart(start2);
	const end2Min = minutesSinceStart(end2);
	
	return start1Min < end2Min && start2Min < end1Min;
}

function isRequiredCourse(courseCode) {
	for (const group of Object.values(REQUIRED_GROUPS)) {
		if (group.codes.includes(courseCode)) return group;
	}
	return null;
}

function getRequiredCourseProgress(groupKey) {
	const group = REQUIRED_GROUPS[groupKey];
	if (!group) return { selected: 0, required: 0 };
	
	const selectedCodes = getSelectedCourseCodes();
	const selected = group.codes.filter(code => selectedCodes.has(code)).length;
	return { selected, required: group.required };
}

function calculateGPACredits() {
	let gpaCredits = 0;
	for (const id of state.selectedIds) {
		const course = COURSES.find(c => c.id === id);
		if (course && course.gpa === true) {
			const credit = CODE_TO_CREDIT[course.code] ?? course.credit ?? 0;
			gpaCredits += Number(credit) || 0;
		}
	}
	return gpaCredits;
}

function calculateTotalConflicts() {
	const selectedCourses = COURSES.filter(c => state.selectedIds.has(c.id) && (c.weekday === 6 || c.weekday === 7));
	
	// 按周×天×时段分组（考虑周次重叠）
	const byWeekDaySlot = new Map();
	
	for (const c of selectedCourses) {
		const weekSet = parseWeeks(c.weeks);
		if (weekSet.size === 0) continue; // 跳过无周次信息的课程
		
		for (const weekNo of weekSet) {
			const slot = getTimeSlot(c.startTime);
			const key = `${weekNo}-${c.weekday}-${slot}`;
			if (!byWeekDaySlot.has(key)) byWeekDaySlot.set(key, []);
			byWeekDaySlot.get(key).push(c);
		}
	}

	let conflictGroupCount = 0;
	for (const [key, courses] of byWeekDaySlot) {
		const groups = groupOverlaps(courses);

		for (const group of groups) {
			if (group.length > 1) {
				conflictGroupCount++;
			}
		}
	}

	return conflictGroupCount;
}

/* 导入/导出功能 */
function exportSelections() {
	const selectedCourses = COURSES.filter(c => state.selectedIds.has(c.id));
	const totalCredit = selectedCourses.reduce((sum, c) => sum + (CODE_TO_CREDIT[c.code] ?? c.credit ?? 0), 0);
	const gpaCredit = selectedCourses.filter(c => c.gpa === true).reduce((sum, c) => sum + (CODE_TO_CREDIT[c.code] ?? c.credit ?? 0), 0);
	
	const exportData = {
		selectedIds: Array.from(state.selectedIds),
		selectedCourses: selectedCourses,
		exportTime: new Date().toISOString(),
		totalCredit: totalCredit,
		gpaCredit: gpaCredit
	};
	
	const dataStr = JSON.stringify(exportData, null, 2);
	const dataBlob = new Blob([dataStr], { type: 'application/json' });
	
	const link = document.createElement('a');
	link.href = URL.createObjectURL(dataBlob);
	link.download = `选课记录_${dayjs().format('YYYY-MM-DD_HH-mm-ss')}.json`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	
	alert(`已导出 ${selectedCourses.length} 门课程，共 ${totalCredit} 学分，其中 ${gpaCredit} GPA学分`);
}

function importSelections(file) {
	if (!file) return;
	
	const reader = new FileReader();
	reader.onload = function(e) {
		try {
			const importData = JSON.parse(e.target.result);
			
			if (!importData.selectedIds || !Array.isArray(importData.selectedIds)) {
				alert('文件格式错误：缺少选课数据');
				return;
			}
			
			// 验证课程ID是否存在
			const existingIds = importData.selectedIds.filter(id => 
				COURSES.some(c => c.id === id)
			);
			
			// 验证课程代码不重复
			const usedCodes = new Set();
			const validIds = [];
			let duplicateCount = 0;
			
			for (const id of existingIds) {
				const course = COURSES.find(c => c.id === id);
				if (course && course.code) {
					if (usedCodes.has(course.code)) {
						duplicateCount++;
						continue; // 跳过重复代码的课程
					}
					usedCodes.add(course.code);
				}
				validIds.push(id);
			}
			
			const invalidCount = importData.selectedIds.length - existingIds.length;
			
			// 更新选择状态
			state.selectedIds = new Set(validIds);
			saveToLocalStorage();
			
			// 重新渲染
			renderCourseList();
			renderEvents();
			updateSelectedCredit();
			
			// 计算实际导入的学分信息
			const importedCourses = COURSES.filter(c => validIds.includes(c.id));
			const actualTotalCredit = importedCourses.reduce((sum, c) => sum + (CODE_TO_CREDIT[c.code] ?? c.credit ?? 0), 0);
			const actualGpaCredit = importedCourses.filter(c => c.gpa === true).reduce((sum, c) => sum + (CODE_TO_CREDIT[c.code] ?? c.credit ?? 0), 0);
			
			let message = `已导入 ${validIds.length} 门课程`;
			if (invalidCount > 0) {
				message += `，${invalidCount} 门课程不存在已跳过`;
			}
			if (duplicateCount > 0) {
				message += `，${duplicateCount} 门重复代码课程已跳过`;
			}
			message += `，共 ${actualTotalCredit} 学分，其中 ${actualGpaCredit} GPA学分`;
			alert(message);
			
		} catch (error) {
			alert('文件格式错误：' + error.message);
		}
	};
	reader.readAsText(file);
}

/* 课表图片下载功能 */
function downloadScheduleImage() {
	const selectedCourses = COURSES.filter(c => state.selectedIds.has(c.id) && (c.weekday === 6 || c.weekday === 7));
	console.log('Selected courses for image:', selectedCourses.length, selectedCourses);
	
	// Debug: Show course details
	selectedCourses.forEach(course => {
		const weekSet = parseWeeks(course.weeks);
		const slot = getTimeSlot(course.startTime);
		console.log(`Course: ${course.name}, weekday: ${course.weekday}, weeks: ${course.weeks} -> ${Array.from(weekSet)}, startTime: ${course.startTime} -> slot: ${slot}`);
	});
	
	// 创建 canvas
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	
	// 设置画布尺寸 - 更大的尺寸以获得更好的质量
	const scale = 2; // 提高分辨率
	canvas.width = 2400 * scale; // 增加宽度以容纳18周
	canvas.height = 750 * scale; // 增加高度以容纳晚上时段和教室信息
	ctx.scale(scale, scale);
	
	// 设置背景
	ctx.fillStyle = '#f8fafc';
	ctx.fillRect(0, 0, 2400, 750);
	
	// 设置字体
	ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'top';
	
	// 绘制标题
	ctx.fillStyle = '#1f2937';
	ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
	ctx.fillText('我的课程表', 1200, 20);
	
	// 绘制统计信息
	const totalCredits = (() => {
		let total = 0;
		for (const id of state.selectedIds) {
			const c = COURSES.find(x => x.id === id);
			if (!c) continue;
			const credit = CODE_TO_CREDIT[c.code] ?? c.credit ?? 0;
			total += Number(credit) || 0;
		}
		return total;
	})();
	const gpaCredits = calculateGPACredits();
	const conflictCount = calculateTotalConflicts();
	const requiredProgress = getRequiredCourseProgress('core');
	
	ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
	ctx.fillStyle = '#6b7280';
	const statsY = 60;
	ctx.textAlign = 'left';
	ctx.fillText(`已选学分: ${totalCredits}`, 50, statsY);
	ctx.fillText(`核心必修: ${requiredProgress.selected}/${requiredProgress.required}`, 200, statsY);
	ctx.fillText(`GPA学分: ${gpaCredits}`, 350, statsY);
	ctx.fillText(`时间冲突: ${conflictCount}`, 500, statsY);
	
	// 计算网格参数
	const startY = 100;
	const timeColWidth = 60;
	const cellWidth = 125; // 减小列宽以容纳18周
	const cellHeight = 90;
	const weekCount = 18;
	
	// 绘制表头
	ctx.fillStyle = '#fafafa';
	ctx.fillRect(0, startY, timeColWidth, cellHeight);
	ctx.strokeStyle = '#e5e7eb';
	ctx.strokeRect(0, startY, timeColWidth, cellHeight);
	
	ctx.fillStyle = '#1f2937';
	ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
	ctx.textAlign = 'center';
	ctx.fillText('时间', timeColWidth / 2, startY + 20);
	
	// 绘制周次表头
	for (let week = 1; week <= weekCount; week++) {
		const x = timeColWidth + (week - 1) * cellWidth;
		
		// 计算该周的实际日期
		const weekStart = getWeekStartByNo(week);
		const satDate = dayjs(weekStart).add(4, 'day'); // 周六
		const sunDate = dayjs(weekStart).add(5, 'day'); // 周日
		
		// 周六表头
		ctx.fillStyle = '#fafafa';
		ctx.fillRect(x, startY, cellWidth, cellHeight / 2);
		ctx.strokeRect(x, startY, cellWidth, cellHeight / 2);
		ctx.fillStyle = '#1f2937';
		ctx.font = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
		ctx.fillText(`第${week}周`, x + cellWidth / 2, startY + 5);
		ctx.fillText(`${satDate.format('M/DD')} 周六`, x + cellWidth / 2, startY + 17);
		
		// 周日表头
		ctx.fillStyle = '#fafafa';
		ctx.fillRect(x, startY + cellHeight / 2, cellWidth, cellHeight / 2);
		ctx.strokeRect(x, startY + cellHeight / 2, cellWidth, cellHeight / 2);
		ctx.fillStyle = '#1f2937';
		ctx.fillText(`第${week}周`, x + cellWidth / 2, startY + cellHeight / 2 + 5);
		ctx.fillText(`${sunDate.format('M/DD')} 周日`, x + cellWidth / 2, startY + cellHeight / 2 + 17);
	}
	
	// 绘制时间段
	const timeSlots = [
		{ name: '上午', time: '08:30-12:00' },
		{ name: '下午', time: '13:30-17:00' },
		{ name: '晚上', time: '18:00-21:10' }
	];
	
	timeSlots.forEach((slot, slotIndex) => {
		const y = startY + cellHeight + slotIndex * cellHeight;
		
		// 时间列
		ctx.fillStyle = '#fafafa';
		ctx.fillRect(0, y, timeColWidth, cellHeight);
		ctx.strokeRect(0, y, timeColWidth, cellHeight);
		
		ctx.fillStyle = '#6b7280';
		ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
		ctx.textAlign = 'center';
		ctx.fillText(slot.name, timeColWidth / 2, y + 10);
		ctx.fillText(slot.time, timeColWidth / 2, y + 25);
		
		// 绘制课程格子
		for (let week = 1; week <= weekCount; week++) {
			for (let day = 6; day <= 7; day++) { // 周六周日
				const x = timeColWidth + (week - 1) * cellWidth;
				const cellY = y + (day - 6) * (cellHeight / 2);
				
				// 绘制空格子
				ctx.fillStyle = '#ffffff';
				ctx.fillRect(x, cellY, cellWidth, cellHeight / 2);
				ctx.strokeRect(x, cellY, cellWidth, cellHeight / 2);
				
				// 查找该时间段的课程
				const coursesInSlot = selectedCourses.filter(course => {
					const weekSet = parseWeeks(course.weeks);
					const courseSlot = getTimeSlot(course.startTime);
					const expectedSlot = slotIndex === 0 ? 'morning' : slotIndex === 1 ? 'afternoon' : 'evening';
					const matches = weekSet.has(week) && course.weekday === day && courseSlot === expectedSlot;
					if (matches) {
						console.log(`Found course in week ${week}, day ${day}, slot ${expectedSlot}:`, course.name);
					}
					return matches;
				});
				
				// 绘制课程
				if (coursesInSlot.length > 0) {
					const course = coursesInSlot[0]; // 取第一个课程
					
					// 设置课程背景颜色
					if (coursesInSlot.length > 1) {
						ctx.fillStyle = '#fee2e2'; // 冲突课程
					} else if (isRequiredCourse(course.code)) {
						ctx.fillStyle = '#fef3c7'; // 必修课程
					} else if (course.gpa) {
						ctx.fillStyle = '#d1fae5'; // GPA课程
					} else {
						ctx.fillStyle = '#dbeafe'; // 普通课程
					}
					
					ctx.fillRect(x + 1, cellY + 1, cellWidth - 2, cellHeight / 2 - 2);
					
					// 绘制课程文字
					ctx.fillStyle = '#1f2937';
					ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
					ctx.textAlign = 'center';
					
					// 课程名称（截断过长的名称）
					let courseName = course.name;
					if (courseName.length > 8) {
						courseName = courseName.substring(0, 7) + '...';
					}
					ctx.fillText(courseName, x + cellWidth / 2, cellY + 3);
					
					// 老师
					ctx.font = '9px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
					ctx.fillStyle = '#6b7280';
					ctx.fillText(course.teacher, x + cellWidth / 2, cellY + 15);
					
					// 教室
					ctx.fillText(course.room || '', x + cellWidth / 2, cellY + 25);
				}
			}
		}
	});
	
	// 绘制图例
	const legendY = startY + cellHeight * 4 + 20;
	const legends = [
		{ text: '普通课程', color: '#dbeafe' },
		{ text: '必修课程', color: '#fef3c7' },
		{ text: 'GPA课程', color: '#d1fae5' },
		{ text: '冲突课程', color: '#fee2e2' }
	];
	
	ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
	legends.forEach((legend, index) => {
		const x = 50 + index * 150;
		
		// 绘制色块
		ctx.fillStyle = legend.color;
		ctx.fillRect(x, legendY, 12, 12);
		ctx.strokeStyle = '#e5e7eb';
		ctx.strokeRect(x, legendY, 12, 12);
		
		// 绘制文字
		ctx.fillStyle = '#1f2937';
		ctx.textAlign = 'left';
		ctx.fillText(legend.text, x + 18, legendY + 2);
	});
	
	// 转换为图片并下载
	canvas.toBlob(function(blob) {
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `课程表_${dayjs().format('YYYY-MM-DD')}.png`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, 'image/png', 1.0);
}

/* 本地存储功能 */
const STORAGE_KEY = 'course-selection-data';

function saveToLocalStorage() {
	try {
		const data = {
			selectedIds: Array.from(state.selectedIds),
			currentWeekNo: state.currentWeekNo,
			searchKeyword: state.searchKeyword,
			timestamp: Date.now()
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	} catch (error) {
		console.warn('无法保存到本地存储:', error);
	}
}

function loadFromLocalStorage() {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (!saved) return false;
		
		const data = JSON.parse(saved);
		if (!data || !Array.isArray(data.selectedIds)) return false;
		
		// 验证课程ID是否仍然有效
		const validIds = data.selectedIds.filter(id => 
			COURSES.some(c => c.id === id)
		);
		
		// 验证课程代码不重复（应用重复检查逻辑）
		const usedCodes = new Set();
		const finalValidIds = [];
		for (const id of validIds) {
			const course = COURSES.find(c => c.id === id);
			if (course && course.code) {
				if (usedCodes.has(course.code)) continue;
				usedCodes.add(course.code);
			}
			finalValidIds.push(id);
		}
		
		// 恢复状态
		state.selectedIds = new Set(finalValidIds);
		if (data.currentWeekNo && data.currentWeekNo >= 1 && data.currentWeekNo <= MAX_WEEKS) {
			state.currentWeekNo = data.currentWeekNo;
			state.currentWeekStart = getWeekStartByNo(state.currentWeekNo);
		}
		if (data.searchKeyword) {
			state.searchKeyword = data.searchKeyword;
			if (searchInputEl) searchInputEl.value = data.searchKeyword;
		}
		
		return finalValidIds.length > 0;
		
	} catch (error) {
		console.warn('无法从本地存储加载:', error);
		return false;
	}
}

function clearLocalStorage() {
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch (error) {
		console.warn('无法清除本地存储:', error);
	}
}

/* 事件绑定 */
function bindEvents() {
	searchInputEl.addEventListener('input', () => {
		state.searchKeyword = searchInputEl.value;
		saveToLocalStorage();
		applyFilter();
		renderCourseList();
	});
	courseTbodyEl.addEventListener('change', (e) => {
		const t = e.target;
		if (t && t.matches('input[type="checkbox"][data-id]')) {
			const id = Number(t.dataset.id);
			
			if (t.checked) {
				// 检查是否可以选择（防重复代码）
				if (canSelectCourse(id)) {
					state.selectedIds.add(id);
				} else {
					// 不允许选择，恢复checkbox状态并提示
					t.checked = false;
					const course = COURSES.find(c => c.id === id);
					if (course) {
						alert(`不能选择课程 "${course.name}"，因为已选择了相同代码 "${course.code}" 的其他课程。`);
					}
					return;
				}
			} else {
				state.selectedIds.delete(id);
			}
			
			// 保存到本地存储
			saveToLocalStorage();
			
			// 重新渲染以更新可选状态
			renderCourseList();
			renderEvents();
			updateSelectedCredit();
		}
	});
	clearSelectionBtn.addEventListener('click', () => {
		state.selectedIds.clear();
		saveToLocalStorage();
		renderCourseList();
		renderEvents();
		updateSelectedCredit();
	});
	exportBtn.addEventListener('click', () => {
		exportSelections();
	});
	importBtn.addEventListener('click', () => {
		importFileInputEl.click();
	});
	downloadImageBtn.addEventListener('click', () => {
		downloadScheduleImage();
	});
	importFileInputEl.addEventListener('change', (e) => {
		const file = e.target.files[0];
		if (file) {
			importSelections(file);
			e.target.value = ''; // 清空文件输入，允许重复选择同一文件
		}
	});
	calendarEl.addEventListener('click', (e) => {
		if (e.target && e.target.matches('.unselect-btn')) {
			e.preventDefault();
			e.stopPropagation();
			const courseId = Number(e.target.dataset.courseId);
			if (courseId && state.selectedIds.has(courseId)) {
				state.selectedIds.delete(courseId);
				saveToLocalStorage();
				// 重新渲染
				renderCourseList();
				renderEvents();
				updateSelectedCredit();
			}
		}
	});
	prevWeekBtn.addEventListener('click', () => {
		state.currentWeekNo = Math.max(1, state.currentWeekNo - 1);
		state.currentWeekStart = getWeekStartByNo(state.currentWeekNo);
		saveToLocalStorage();
		updateWeekTitle();
		renderCalendarGrid();
		renderEvents();
		updateSelectedCredit();
	});
	nextWeekBtn.addEventListener('click', () => {
		state.currentWeekNo = Math.min(MAX_WEEKS, state.currentWeekNo + 1);
		state.currentWeekStart = getWeekStartByNo(state.currentWeekNo);
		saveToLocalStorage();
		updateWeekTitle();
		renderCalendarGrid();
		renderEvents();
		updateSelectedCredit();
	});
	// Removed event listeners for non-existent DOM elements
	window.addEventListener('resize', () => {
		renderEvents();
	});
}

function updateWeekTitle() {
	const start = dayjs(state.currentWeekStart);
	const end = start.add(6, 'day');
	weekTitleEl.textContent = `第${state.currentWeekNo}周  ${start.format('YYYY/MM/DD')} - ${end.format('YYYY/MM/DD')} (周末课程视图)`;
}

/* 初始化 */
function init() {
	// 将 COURSES 的学分用映射覆盖
	for (const c of COURSES) {
		if (c.code && CODE_TO_CREDIT[c.code] != null) c.credit = CODE_TO_CREDIT[c.code];
	}
	
	// 尝试从本地存储加载数据
	const loaded = loadFromLocalStorage();
	
	// 如果没有加载到数据，使用默认值
	if (!loaded) {
		state.currentWeekNo = 1;
		state.currentWeekStart = getWeekStartByNo(state.currentWeekNo);
	}
	
	updateWeekTitle();
	renderCalendarGrid();
	applyFilter();
	renderCourseList();
	renderEvents();
	bindEvents();
	updateSelectedCredit();
	
	// 如果成功加载了数据，显示提示
	if (loaded) {
		console.log('已恢复上次的选课记录');
	}
}

document.addEventListener('DOMContentLoaded', init);