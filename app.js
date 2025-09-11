/* 全局常量与工具 */
const START_HOUR = 8;   // 日历起始小时
const END_HOUR = 21;    // 日历结束小时
const SLOT_MINUTES = 30; // 时间栅格分钟数
const TERM_ANCHOR_STR = '2025-09-20'; // 第一周锚点（周次从此日所在周计为第1周）

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

function minutesSinceStart(timeStr) {
	const [h, m] = timeStr.split(":").map(Number);
	return (h - START_HOUR) * 60 + m;
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

/* 渲染：日历栅格 */
function renderCalendarGrid() {
	calendarEl.innerHTML = '';
	const totalSlots = ((END_HOUR - START_HOUR) * 60) / SLOT_MINUTES;
	// 头部：时间列 + 7天标题
	// 第一行：空白角 + 7天表头
	const headerRow = document.createElement('div');
	headerRow.className = 'day-header-row';
	headerRow.style.display = 'contents';
	const corner = document.createElement('div');
	corner.className = 'day-header';
	corner.style.gridColumn = '1 / 2';
	corner.textContent = '';
	calendarEl.appendChild(corner);
	for (let i = 0; i < 7; i++) {
		const d = dayjs(state.currentWeekStart).add(i, 'day');
		const hd = document.createElement('div');
		hd.className = 'day-header';
		hd.textContent = `${d.format('ddd MM/DD')}`;
		calendarEl.appendChild(hd);
	}
	// 时间列 + 每天的栅格
	for (let slot = 0; slot < totalSlots; slot++) {
		const minutes = START_HOUR * 60 + slot * SLOT_MINUTES;
		const hour = Math.floor(minutes / 60);
		const min = minutes % 60;
		const label = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;

		const timeCell = document.createElement('div');
		timeCell.className = 'time-col';
		timeCell.textContent = label;
		calendarEl.appendChild(timeCell);

		for (let day = 1; day <= 7; day++) {
			const cell = document.createElement('div');
			cell.className = 'cell';
			cell.dataset.day = String(day);
			cell.dataset.slot = String(slot);
			calendarEl.appendChild(cell);
		}
	}
}

/* 渲染：已选课程到日历 */
function renderEvents() {
	// 清理旧事件
	const oldEvents = calendarEl.querySelectorAll('.event');
	oldEvents.forEach(e => e.remove());

	const selectedCourses = COURSES.filter(c => state.selectedIds.has(c.id) && isCourseInWeek(c, state.currentWeekNo));
	// 冲突检测：同一 weekday 时间区间重叠
	const byDay = new Map();
	for (const c of selectedCourses) {
		if (!byDay.has(c.weekday)) byDay.set(c.weekday, []);
		byDay.get(c.weekday).push(c);
	}
	const conflictIds = new Set();
	for (const [day, arr] of byDay) {
		arr.sort((a,b) => minutesSinceStart(a.startTime) - minutesSinceStart(b.startTime));
		for (let i = 0; i < arr.length; i++) {
			for (let j = i + 1; j < arr.length; j++) {
				const a1 = minutesSinceStart(arr[i].startTime);
				const a2 = minutesSinceStart(arr[i].endTime);
				const b1 = minutesSinceStart(arr[j].startTime);
				const b2 = minutesSinceStart(arr[j].endTime);
				if (Math.max(a1, b1) < Math.min(a2, b2)) {
					conflictIds.add(arr[i].id);
					conflictIds.add(arr[j].id);
				}
			}
		}
	}

	// 绘制块（绝对定位在日历容器内，贴合对应列与时段）
	for (const c of selectedCourses) {
		const startMin = minutesSinceStart(c.startTime);
		const endMin = minutesSinceStart(c.endTime);

		const dayIndex = c.weekday; // 1..7
		const firstCell = calendarEl.querySelector(`.cell[data-day="${dayIndex}"][data-slot="0"]`);
		if (!firstCell) continue;

		const columnLeft = firstCell.offsetLeft;
		const columnWidth = firstCell.clientWidth;
		const baseTop = firstCell.offsetTop; // slot=0 顶部
		const slotHeight = firstCell.clientHeight || 28;

		const top = baseTop + (startMin / SLOT_MINUTES) * slotHeight;
		const height = Math.max(20, ((endMin - startMin) / SLOT_MINUTES) * slotHeight);

		const block = document.createElement('div');
		block.className = 'event' + (conflictIds.has(c.id) ? ' conflict' : '');
		block.style.top = `${top}px`;
		block.style.left = `${columnLeft + 2}px`;
		block.style.width = `${Math.max(20, columnWidth - 4)}px`;
		block.style.height = `${height}px`;
		block.innerHTML = `
			<div class="title">${c.name}</div>
			<div class="meta">${formatTimeRange(c.startTime, c.endTime)} · 第${state.currentWeekNo}周 · ${c.room || ''} · ${c.teacher || ''}</div>
		`;
		calendarEl.appendChild(block);
	}
}

/* 渲染：课程列表 */
function renderCourseList() {
	const rows = state.filteredCourses.map(c => {
		const checked = state.selectedIds.has(c.id) ? 'checked' : '';
		const inThisWeek = isCourseInWeek(c, state.currentWeekNo);
		const weeksText = escapeHtml(c.weeks || '') + (inThisWeek ? '（本周）' : '');
		return `
			<tr>
				<td><input type="checkbox" data-id="${c.id}" ${checked}></td>
				<td>${escapeHtml(c.name)}</td>
				<td>${weekdayLabel(c.weekday)}</td>
				<td>${c.startTime}</td>
				<td>${c.endTime}</td>
				<td>${escapeHtml(c.teacher || '')}</td>
				<td>${escapeHtml(c.room || '')}</td>
				<td>${weeksText}</td>
			</tr>
		`;
	}).join('');
	courseTbodyEl.innerHTML = rows || `<tr><td colspan="8" style="text-align:center;color:#9ca3af;">无结果</td></tr>`;
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
		}
	});
	clearSelectionBtn.addEventListener('click', () => {
		state.selectedIds.clear();
		renderCourseList();
		renderEvents();
	});
	prevWeekBtn.addEventListener('click', () => {
		state.currentWeekNo = Math.max(1, state.currentWeekNo - 1);
		state.currentWeekStart = getWeekStartByNo(state.currentWeekNo);
		updateWeekTitle();
		renderCalendarGrid();
		renderEvents();
	});
	nextWeekBtn.addEventListener('click', () => {
		state.currentWeekNo = state.currentWeekNo + 1;
		state.currentWeekStart = getWeekStartByNo(state.currentWeekNo);
		updateWeekTitle();
		renderCalendarGrid();
		renderEvents();
	});
	reloadBtn.addEventListener('click', () => {
		// 已固化数据，这里仅刷新视图
		applyFilter();
		renderCourseList();
		renderEvents();
	});
	fileInputEl.addEventListener('change', () => {
		// 支持用户后续替换本地 Excel（可选），此处留空或后续扩展
		mappingHintEl.hidden = false;
		mappingHintEl.textContent = '当前版本已将 Excel 固化到前端。如需替换，请联系开发或在此扩展解析逻辑。';
	});
	window.addEventListener('resize', () => {
		// 视窗变化导致列宽/高度变化，重新定位事件块
		renderEvents();
	});
}

function updateWeekTitle() {
	const start = dayjs(state.currentWeekStart);
	const end = start.add(6, 'day');
	weekTitleEl.textContent = `第${state.currentWeekNo}周  ${start.format('YYYY/MM/DD')} - ${end.format('YYYY/MM/DD')}`;
}

/* 初始化 */
function init() {
	// 将起始周设为学期第1周
	state.currentWeekNo = 1;
	state.currentWeekStart = getWeekStartByNo(state.currentWeekNo);
	updateWeekTitle();
	renderCalendarGrid();
	applyFilter();
	renderCourseList();
	renderEvents();
	bindEvents();
}

document.addEventListener('DOMContentLoaded', init); 