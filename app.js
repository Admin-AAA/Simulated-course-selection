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

// Excel 固化数据：示例结构。若你提供真实字段名，可替换。
// 字段：id, name, weekday(1-7, 周一为1), startTime("HH:mm"), endTime("HH:mm"), teacher, room
const COURSES = [
	{ id: 1, code: "GE6001", name: "学术写作、规范与伦理", className: "GE6001-03000-S01-PT", credit: 1, firstDate: "2025-12-27", teacher: "李红兵", capacity: 100, weeks: "15-18周", weekday: 6, startTime: "13:30", endTime: "17:00", room: "教一楼200" },
	{ id: 2, code: "GE6001", name: "学术写作、规范与伦理", className: "GE6001-03000-S02-PT", credit: 1, firstDate: "2025-12-28", teacher: "李红兵", capacity: 100, weeks: "15-18周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼200" },
	{ id: 3, code: "GE6001", name: "学术写作、规范与伦理", className: "GE6001-03000-S03-PT", credit: 1, firstDate: "2025-12-28", teacher: "李红兵", capacity: 100, weeks: "15-18周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "教一楼200" },
	{ id: 4, code: "MEM6001", name: "定量分析：模型与方法", className: "MEM6001-03000-S01-PT", credit: 3, firstDate: "2025-09-20", teacher: "周钢", capacity: 70, weeks: "1-2,5-14周", weekday: 6, startTime: "13:30", endTime: "17:00", room: "教一楼100" },
	{ id: 5, code: "MEM6001", name: "定量分析：模型与方法", className: "MEM6001-03000-S02-PT", credit: 3, firstDate: "2025-09-21", teacher: "周钢", capacity: 70, weeks: "1,4-14周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼100" },
	{ id: 6, code: "MEM6001", name: "定量分析：模型与方法", className: "MEM6001-03000-S03-PT", credit: 3, firstDate: "2025-09-21", teacher: "周钢", capacity: 70, weeks: "1,4-14周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "教一楼100" },
	{ id: 7, code: "MEM6001", name: "定量分析：模型与方法", className: "MEM6001-03000-S04-PT", credit: 3, firstDate: "2025-09-21", teacher: "潘常春", capacity: 60, weeks: "1,4-14周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "教一楼125" },
	{ id: 8, code: "MEM6002", name: "工程管理导论", className: "MEM6002-03000-S01-PT", credit: 2, firstDate: "2025-09-20", teacher: "全林", capacity: 100, weeks: "1-2,5-10周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "教一楼400" },
	{ id: 9, code: "MEM6003", name: "工程经济学", className: "MEM6003-03000-S01-PT", credit: 2, firstDate: "2025-09-20", teacher: "殷翔", capacity: 100, weeks: "1-2,5-10周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "教一楼300" },
	{ id: 10, code: "MEM6003", name: "工程经济学", className: "MEM6003-03000-S02-PT", credit: 2, firstDate: "2025-09-20", teacher: "殷翔", capacity: 100, weeks: "1-2,5-10周", weekday: 6, startTime: "13:30", endTime: "17:00", room: "教一楼300" },
	{ id: 11, code: "MEM6003", name: "工程经济学", className: "MEM6003-03000-S03-PT", credit: 2, firstDate: "2025-11-30", teacher: "杨忠直", capacity: 100, weeks: "11-18周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼400" },
	{ id: 12, code: "MEM6005", name: "质量与可靠性管理", className: "MEM6005-03000-S01-PT", credit: 2, firstDate: "2025-09-21", teacher: "苗瑞", capacity: 80, weeks: "1,4-10周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "教一楼200" },
	{ id: 13, code: "MEM6005", name: "质量与可靠性管理", className: "MEM6005-03000-S02-PT", credit: 2, firstDate: "2025-11-29", teacher: "苗瑞", capacity: 80, weeks: "11-18周", weekday: 6, startTime: "13:30", endTime: "17:00", room: "教一楼410" },
	{ id: 14, code: "MEM6005", name: "质量与可靠性管理", className: "MEM6005-03000-S03-PT", credit: 2, firstDate: "2025-11-30", teacher: "苗瑞", capacity: 80, weeks: "11-18周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "教一楼410" },
	{ id: 15, code: "MEM6006", name: "工程信息管理", className: "MEM6006-03000-S01-PT", credit: 2, firstDate: "2025-09-21", teacher: "蔡鸿明", capacity: 100, weeks: "1,4-10周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼400" },
	{ id: 16, code: "MEM6006", name: "工程信息管理", className: "MEM6006-03000-S02-PT", credit: 2, firstDate: "2025-11-29", teacher: "刘雨桐", capacity: 100, weeks: "11-18周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "教一楼300" },
	{ id: 17, code: "MEM6301", name: "人力资源与沟通管理", className: "MEM6301-03000-S01-PT", credit: 2, firstDate: "2025-11-30", teacher: "陶祁", capacity: 70, weeks: "11-18周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼425" },
	{ id: 18, code: "MEM6302", name: "领导力", className: "MEM6302-03000-S01-PT", credit: 2, firstDate: "2025-11-30", teacher: "张兴福", capacity: 100, weeks: "11-18周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "教一楼400" },
	{ id: 19, code: "MEM6304", name: "库存与供应链管理", className: "MEM6304-03000-S01-PT", credit: 2, firstDate: "2025-11-30", teacher: "张文杰", capacity: 50, weeks: "11-18周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼308" },
	{ id: 20, code: "MEM6304", name: "库存与供应链管理", className: "MEM6304-03000-S02-PT", credit: 2, firstDate: "2025-11-30", teacher: "张文杰", capacity: 50, weeks: "11-18周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "教一楼308" },
	{ id: 21, code: "MEM6305", name: "风险管理与高效决策", className: "MEM6305-03000-S01-PT", credit: 2, firstDate: "2025-09-21", teacher: "王春香", capacity: 70, weeks: "1,4-10周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼425" },
	{ id: 22, code: "MEM6309", name: "区块链与金融科技创新概论", className: "MEM6309-03000-S01-PT", credit: 2, firstDate: "2025-09-21", teacher: "范磊", capacity: 60, weeks: "1,4-10周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼125" },
	{ id: 23, code: "MEM6310", name: "运营管理", className: "MEM6310-03000-S01-PT", credit: 2, firstDate: "2025-09-20", teacher: "邵晓峰", capacity: 100, weeks: "1-2,5-10周", weekday: 6, startTime: "13:30", endTime: "17:00", room: "教一楼400" },
	{ id: 24, code: "MEM6311", name: "工程管理法律概论", className: "MEM6311-03000-S01-PT", credit: 2, firstDate: "2025-11-29", teacher: "王猛", capacity: 100, weeks: "11-18周", weekday: 6, startTime: "13:30", endTime: "17:00", room: "教一楼400" },
	{ id: 25, code: "MEM8301", name: "大数据与互联网思维", className: "MEM8301-03000-S01-PT", credit: 2, firstDate: "2025-09-20", teacher: "吴晨涛", capacity: 100, weeks: "1-2,5-10周", weekday: 6, startTime: "13:30", endTime: "17:00", room: "教一楼200" },
	{ id: 26, code: "MEM8302", name: "物联网技术与发展趋势", className: "MEM8302-03000-S01-PT", credit: 2, firstDate: "2025-09-20", teacher: "陈奕超", capacity: 60, weeks: "1-2,5-10周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "教一楼100" },
	{ id: 27, code: "MEM8302", name: "物联网技术与发展趋势", className: "MEM8302-03000-S02-PT", credit: 2, firstDate: "2025-11-29", teacher: "俞嘉地", capacity: 60, weeks: "11-18周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "教一楼100" },
	{ id: 28, code: "MEM8303", name: "人工智能", className: "MEM8303-03000-S01-PT", credit: 2, firstDate: "2025-11-29", teacher: "张晓凡", capacity: 100, weeks: "11-18周", weekday: 6, startTime: "13:30", endTime: "17:00", room: "教一楼300" },
	{ id: 29, code: "MEM8304", name: "网络信息安全理论与技术", className: "MEM8304-03000-S01-PT", credit: 2, firstDate: "2025-11-29", teacher: "李生红", capacity: 80, weeks: "11-18周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "教一楼400" },
	{ id: 30, code: "MEM8306", name: "新能源技术及应用", className: "MEM8306-03000-S01-PT", credit: 2, firstDate: "2025-09-20", teacher: "殳国华", capacity: 60, weeks: "1-2,5-10周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "教一楼425" },
	{ id: 31, code: "MEM8306", name: "新能源技术及应用", className: "MEM8306-03000-S02-PT", credit: 2, firstDate: "2025-11-29", teacher: "李然,吴超", capacity: 60, weeks: "11-18周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "教一楼425" },
	{ id: 32, code: "MEM8307", name: "大规模集成电路概述", className: "MEM8307-03000-S01-PT", credit: 2, firstDate: "2025-11-30", teacher: "毛志刚", capacity: 60, weeks: "11-18周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "教一楼125" },
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
	// 将时间转换为上午/下午
	const [h] = timeStr.split(":").map(Number);
	return h < 12 ? 'morning' : 'afternoon';
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
const prevWeekBtn = document.getElementById('prevWeekBtn');
const nextWeekBtn = document.getElementById('nextWeekBtn');
const reloadBtn = document.getElementById('reloadBtn');
const fileInputEl = document.getElementById('fileInput');
const mappingHintEl = document.getElementById('mappingHint');
const creditTotalEl = document.getElementById('creditTotal');

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
		const satHeader = document.createElement('div');
		satHeader.className = 'day-header';
		satHeader.textContent = `第${week}周-周六`;
		satHeader.dataset.week = String(week);
		satHeader.dataset.day = '6';
		calendarEl.appendChild(satHeader);
		
		const sunHeader = document.createElement('div');
		sunHeader.className = 'day-header';
		sunHeader.textContent = `第${week}周-周日`;
		sunHeader.dataset.week = String(week);
		sunHeader.dataset.day = '7';
		calendarEl.appendChild(sunHeader);
	}
	
	// 上午/下午行
	const timeSlots = ['morning', 'afternoon'];
	for (const slot of timeSlots) {
		const timeCell = document.createElement('div');
		timeCell.className = 'time-col';
		timeCell.textContent = slot === 'morning' ? '上午' : '下午';
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
			block.className = 'event' + (group.length > 1 ? ' conflict group' : '');
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
			block.style.background = group.length > 1 ? '#fee2e2' : '#dbeafe';
			block.style.border = group.length > 1 ? '1px solid #fca5a5' : '1px solid #93c5fd';
			block.style.color = '#0b1220';

			if (group.length === 1) {
				const c = group[0];
				block.innerHTML = `
					<div class="title" style="font-weight:600;margin-bottom:2px;">${c.name}</div>
					<div class="meta" style="color:#374151;opacity:0.9;">${formatTimeRange(c.startTime, c.endTime)} · ${c.room || ''} · ${c.teacher || ''}</div>
				`;
			} else {
				const items = group.map(c => `
					<div class="conf-item" style="background:rgba(255,255,255,0.6);border:1px dashed #fca5a5;border-radius:2px;padding:2px;margin:1px 0;">
						<div class="conf-title" style="font-weight:600;margin-bottom:1px;">${c.name}</div>
						<div class="conf-meta" style="color:#374151;opacity:0.9;">${formatTimeRange(c.startTime, c.endTime)} · ${c.room || ''} · ${c.teacher || ''}</div>
					</div>
				`).join('');
				block.innerHTML = `
					<div class="title" style="font-weight:600;margin-bottom:2px;">时间冲突（${group.length}）</div>
					<div class="conf-list">${items}</div>
				`;
			}
			cell.appendChild(block);
		}
	}
}

/* 渲染：课程列表 */
function renderCourseList() {
	const rows = state.filteredCourses.map(c => {
		const checked = state.selectedIds.has(c.id) ? 'checked' : '';
		const inThisWeek = isCourseInWeek(c, state.currentWeekNo);
		const weeksText = escapeHtml(c.weeks || '') + (inThisWeek ? '（本周）' : '');
		const credit = CODE_TO_CREDIT[c.code] ?? c.credit ?? '';
		return `
			<tr>
				<td><input type="checkbox" data-id="${c.id}" ${checked}></td>
				<td>${escapeHtml(c.code || '')}</td>
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
}

/* 事件绑定 */
function bindEvents() {
	searchInputEl.addEventListener('input', () => {
		state.searchKeyword = searchInputEl.value;
		applyFilter();
		renderCourseList();
	});
	courseTbodyEl.addEventListener('change', (e) => {
		const t = e.target;
		if (t && t.matches('input[type="checkbox"][data-id]')) {
			const id = Number(t.dataset.id);
			if (t.checked) state.selectedIds.add(id); else state.selectedIds.delete(id);
			renderEvents();
			updateSelectedCredit();
		}
	});
	clearSelectionBtn.addEventListener('click', () => {
		state.selectedIds.clear();
		renderCourseList();
		renderEvents();
		updateSelectedCredit();
	});
	prevWeekBtn.addEventListener('click', () => {
		state.currentWeekNo = Math.max(1, state.currentWeekNo - 1);
		state.currentWeekStart = getWeekStartByNo(state.currentWeekNo);
		updateWeekTitle();
		renderCalendarGrid();
		renderEvents();
		updateSelectedCredit();
	});
	nextWeekBtn.addEventListener('click', () => {
		state.currentWeekNo = Math.min(MAX_WEEKS, state.currentWeekNo + 1);
		state.currentWeekStart = getWeekStartByNo(state.currentWeekNo);
		updateWeekTitle();
		renderCalendarGrid();
		renderEvents();
		updateSelectedCredit();
	});
	reloadBtn.addEventListener('click', () => {
		applyFilter();
		renderCourseList();
		renderEvents();
		updateSelectedCredit();
	});
	fileInputEl.addEventListener('change', () => {
		mappingHintEl.hidden = false;
		mappingHintEl.textContent = '当前版本已将 Excel 固化到前端。如需替换，请联系开发或在此扩展解析逻辑。';
	});
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
	state.currentWeekNo = 1;
	state.currentWeekStart = getWeekStartByNo(state.currentWeekNo);
	updateWeekTitle();
	renderCalendarGrid();
	applyFilter();
	renderCourseList();
	renderEvents();
	bindEvents();
	updateSelectedCredit();
}

document.addEventListener('DOMContentLoaded', init); 