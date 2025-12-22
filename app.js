/* 全局常量与工具 */
const TERM_ANCHOR_STR = '2026-03-02'; // 第一周锚点（周次从此日所在周计为第1周）
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
    { id: 1, code: "MEM6002", name: "工程管理导论", className: "MEM6002-03000-S01-PT", credit: 2, firstDate: "2026-03-08", teacher: "黄丹", capacity: 100, weeks: "1-8周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "工程馆107", gpa: true },
    { id: 2, code: "MEM6301", name: "人力资源与沟通管理", className: "MEM6301-03000-S01-PT", credit: 2, firstDate: "2026-05-16", teacher: "陶祁", capacity: 100, weeks: "11-18周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "工程馆102", gpa: true },
    { id: 3, code: "MEM6303", name: "工程管理实践案例分析", className: "MEM6303-03000-S01-PT", credit: 2, firstDate: "2026-03-08", teacher: "李柠", capacity: 100, weeks: "1-8周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "工程馆218", gpa: true },
    { id: 4, code: "MEM6305", name: "风险管理与高效决策", className: "MEM6305-03000-S01-PT", credit: 2, firstDate: "2026-05-10", teacher: "王春香", capacity: 100, weeks: "10-17周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "工程馆218", gpa: true },
    { id: 5, code: "MEM6306", name: "系统创新与工程实践", className: "MEM6306-03000-S01-PT", credit: 2, firstDate: "2026-03-08", teacher: "郭朝晖", capacity: 100, weeks: "1-4周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "工程馆214", gpa: true },
    { id: 6, code: "MEM6306", name: "系统创新与工程实践", className: "MEM6306-03000-S01-PT", credit: 2, firstDate: "2026-03-08", teacher: "郭朝晖", capacity: 100, weeks: "1-4周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "工程馆214", gpa: true },
    { id: 7, code: "MEM6307", name: "社会创新与创业发展", className: "MEM6307-03000-S01-PT", credit: 2, firstDate: "2026-05-10", teacher: "卢永彬", capacity: 100, weeks: "10-17周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "工程馆102", gpa: true },
    { id: 8, code: "MEM6310", name: "运营管理", className: "MEM6310-03000-S01-PT", credit: 2, firstDate: "2026-03-08", teacher: "徐丽群", capacity: 100, weeks: "1-8周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "工程馆204", gpa: true },
    { id: 9, code: "MEM8303", name: "人工智能", className: "MEM8303-03000-S01-PT", credit: 2, firstDate: "2026-05-10", teacher: "张晓凡", capacity: 100, weeks: "10-17周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "工程馆218", gpa: false },
    { id: 10, code: "MEM8305", name: "移动互联网前沿技术", className: "MEM8305-03000-S01-PT", credit: 2, firstDate: "2026-03-08", teacher: "孔令和", capacity: 100, weeks: "1-8周", weekday: 7, startTime: "13:30", endTime: "17:00", room: "工程馆107", gpa: false },
    { id: 11, code: "MEM8305", name: "移动互联网前沿技术", className: "MEM8305-03000-S02-PT", credit: 2, firstDate: "2026-05-16", teacher: "沈耀", capacity: 100, weeks: "11-18周", weekday: 6, startTime: "08:30", endTime: "12:00", room: "工程馆107", gpa: false },
    { id: 12, code: "MEM8308", name: "新型电力系统技术概论", className: "MEM8308-03000-S01-PT", credit: 2, firstDate: "2026-05-10", teacher: "王志新", capacity: 100, weeks: "10-17周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "工程馆110", gpa: false },
    { id: 13, code: "MEM8309", name: "智能机器人", className: "MEM8309-03000-S01-PT", credit: 2, firstDate: "2026-05-10", teacher: "王景川", capacity: 100, weeks: "10-17周", weekday: 7, startTime: "08:30", endTime: "12:00", room: "工程馆222", gpa: false },
    { id: 14, code: "必选A", name: "学术英语", className: "请看课表", credit: "2", firstDate: "2026-03-07", teacher: "", capacity: 0, weeks: "1-8周", weekday: 6, startTime: "08:00", endTime: "11:30", room: "工程馆", gpa: "true" },
    { id: 15, code: "必选B", name: "新中特", className: "请看课表", credit: "2", firstDate: "2026-03-07", teacher: "", capacity: 0, weeks: "1-8周", weekday: 6, startTime: "12:55", endTime: "16:25", room: "工程馆", gpa: "true" },
    { id: 16, code: "必选C", name: "自然辩证法概论", className: "请看课表", credit: "1", firstDate: "2026-05-16", teacher: "", capacity: 0, weeks: "11-14周", weekday: 6, startTime: "12:55", endTime: "16:25", room: "工程馆", gpa: "true" },
];

/* 状态 */
let state = {
	selectedIds: new Set([14, 15, 16]),
	currentWeekStart: startOfWeek(dayjs(TERM_ANCHOR_STR).toDate()),
	currentWeekNo: 1,
	filteredCourses: COURSES,
	searchKeyword: "",
	recommendPlans: [], // Stores generated plans (array of Set<id>)
	currentPlanIndex: -1,
    isCompressed: true,
    compressedGroups: [],
    isListCompressed: true,
    expandedGroups: new Set()
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
const toggleCompressBtn = document.getElementById('toggleCompressBtn');
const toggleListCompressBtn = document.getElementById('toggleListCompressBtn');
const exportICSBtn = document.getElementById('exportICSBtn');
const recommendBtn = document.getElementById('recommendBtn'); // New button
const downloadImageBtnList = document.getElementById('downloadImageBtnList');
const exportICSBtnList = document.getElementById('exportICSBtnList');
const recommendBtnList = document.getElementById('recommendBtnList'); // New button
const prevWeekBtn = document.getElementById('prevWeekBtn');
const nextWeekBtn = document.getElementById('nextWeekBtn');

const creditTotalEl = document.getElementById('creditTotal');
const requiredProgressEl = document.getElementById('requiredProgress');
const gpaDisplayEl = document.getElementById('gpaDisplay');
const conflictDisplayEl = document.getElementById('conflictDisplay');

/* 压缩视图逻辑 */
function calculateCompressedWeeks() {
    if (!state.isCompressed) {
        return Array.from({length: MAX_WEEKS}, (_, i) => ({
            start: i + 1,
            end: i + 1,
            label: `第${i + 1}周`
        }));
    }

    const weekSignatures = [];
    for (let w = 1; w <= MAX_WEEKS; w++) {
        // Find all courses active in this week
        const activeCourses = [];
        for (const id of state.selectedIds) {
            const c = COURSES.find(x => x.id === id);
            if (c && isCourseInWeek(c, w) && (c.weekday === 6 || c.weekday === 7)) {
                activeCourses.push(c.id);
            }
        }
        activeCourses.sort();
        weekSignatures.push({ week: w, signature: activeCourses.join(',') });
    }

    const groups = [];
    if (weekSignatures.length === 0) return [];

    let currentGroup = { start: weekSignatures[0].week, end: weekSignatures[0].week, signature: weekSignatures[0].signature };
    
    for (let i = 1; i < weekSignatures.length; i++) {
        const ws = weekSignatures[i];
        if (ws.signature === currentGroup.signature) {
            currentGroup.end = ws.week;
        } else {
            groups.push(currentGroup);
            currentGroup = { start: ws.week, end: ws.week, signature: ws.signature };
        }
    }
    groups.push(currentGroup);
    
    // Add labels
    groups.forEach(g => {
        g.label = g.start === g.end ? `第${g.start}周` : `第${g.start}-${g.end}周`;
    });
    
    return groups;
}

/* 渲染：周末专用日历栅格 */
function renderCalendarGrid() {
	calendarEl.innerHTML = '';
    
    state.compressedGroups = calculateCompressedWeeks();
    const groups = state.compressedGroups;
    
    // Update grid columns
    calendarEl.style.gridTemplateColumns = `80px repeat(${groups.length * 2}, 180px)`;
	
    // 左上角空块
	const corner = document.createElement('div');
	corner.className = 'time-col'; // Use time-col style for top-left corner too
    corner.style.zIndex = '21';
    corner.style.background = 'var(--gray-50)';
    corner.style.position = 'sticky';
    corner.style.top = '0';
    corner.style.left = '0';
	corner.innerHTML = '<i class="ri-time-line"></i>';
	calendarEl.appendChild(corner);
	
	// 生成周次×周末列标题
	groups.forEach((group, index) => {
        // For compressed view, we don't show specific dates if it spans multiple weeks
        // Or we show the date of the first week?
        // User requirement: "周上方描述好当前是第几周-第几周"
        
        const weekStart = getWeekStartByNo(group.start);
		const satDate = dayjs(weekStart).add(4, 'day'); // 周六
		const sunDate = dayjs(weekStart).add(5, 'day'); // 周日
        
        const dateLabelSat = group.start === group.end ? `${satDate.format('M/DD')} 周六` : '周六';
        const dateLabelSun = group.start === group.end ? `${sunDate.format('M/DD')} 周日` : '周日';

		const satHeader = document.createElement('div');
		satHeader.className = 'day-header';
		satHeader.innerHTML = `<div>${group.label}</div><div style="font-weight:400;margin-top:2px;">${dateLabelSat}</div>`;
		satHeader.dataset.groupIndex = String(index);
		satHeader.dataset.day = '6';
		calendarEl.appendChild(satHeader);
		
		const sunHeader = document.createElement('div');
		sunHeader.className = 'day-header';
		sunHeader.innerHTML = `<div>${group.label}</div><div style="font-weight:400;margin-top:2px;">${dateLabelSun}</div>`;
		sunHeader.dataset.groupIndex = String(index);
		sunHeader.dataset.day = '7';
		calendarEl.appendChild(sunHeader);
	});
	
	// 上午/下午/晚上行
	const timeSlots = [
        { key: 'morning', label: '上午', time: '08:30-12:00' }, 
        { key: 'afternoon', label: '下午', time: '13:30-17:00' }, 
        { key: 'evening', label: '晚上', time: '18:00-21:10' }
    ];
    
	for (const slot of timeSlots) {
		const timeCell = document.createElement('div');
		timeCell.className = 'time-col';
		timeCell.innerHTML = `<div style="text-align:center;"><div>${slot.label}</div><div style="font-size:10px;opacity:0.8;margin-top:4px;">${slot.time}</div></div>`;
		calendarEl.appendChild(timeCell);
		
		groups.forEach((group, index) => {
			for (let day = 6; day <= 7; day++) {
				const cell = document.createElement('div');
				cell.className = 'cell';
				cell.dataset.groupIndex = String(index);
				cell.dataset.day = String(day);
				cell.dataset.slot = slot.key;
				calendarEl.appendChild(cell);
			}
		});
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
	// 按 GroupIndex×天×时段分组
	const byGroupDaySlot = new Map();
    
    state.compressedGroups.forEach((group, groupIndex) => {
        // Find courses active in this group (check start week)
        const activeInGroup = selectedCourses.filter(c => 
            (c.weekday === 6 || c.weekday === 7) && 
            isCourseInWeek(c, group.start)
        );
        
        for (const c of activeInGroup) {
            const slot = getTimeSlot(c.startTime);
            const key = `${groupIndex}-${c.weekday}-${slot}`;
            if (!byGroupDaySlot.has(key)) byGroupDaySlot.set(key, []);
            byGroupDaySlot.get(key).push(c);
        }
    });
	
	for (const [key, courses] of byGroupDaySlot) {
		const [groupIndex, day, slot] = key.split('-');
		const groups = groupOverlaps(courses);
		
		for (const group of groups) {
			const cell = calendarEl.querySelector(`.cell[data-group-index="${groupIndex}"][data-day="${day}"][data-slot="${slot}"]`);
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
				// conflict styles handled by class
			} else if (hasRequiredCourse) {
				// required styles handled by class
			} else {
				// default styles handled by class
			}

			if (group.length === 1) {
				const c = group[0];
				const requiredGroup = isRequiredCourse(c.code);
				const requiredBadge = requiredGroup ? '<span class="badge badge-warning" style="margin-left:0;">必修</span>' : '';
				const gpaBadge = c.gpa === true ? '<span class="badge badge-success" style="margin-left:0;">GPA</span>' : 
								c.gpa === false ? '<span class="badge badge-gray" style="margin-left:0;">非GPA</span>' : '';
                // 添加课程代码显示
                block.innerHTML = `
                    <div class="title" title="${escapeHtml(c.name)}">[${escapeHtml(c.code)}] ${escapeHtml(c.name)}</div>
                    <div style="display:flex;gap:4px;margin-bottom:4px;">${requiredBadge}${gpaBadge}</div>
                    <div class="meta"><i class="ri-time-line" style="vertical-align:middle"></i> ${formatTimeRange(c.startTime, c.endTime)}</div>
                    <div class="meta"><i class="ri-map-pin-line" style="vertical-align:middle"></i> ${escapeHtml(c.room || '')}</div>
                    <div class="meta"><i class="ri-user-line" style="vertical-align:middle"></i> ${escapeHtml(c.teacher || '')}</div>
                    <button class="unselect-btn" data-course-id="${c.id}" title="取消选择"><i class="ri-close-line"></i></button>
                `;
            } else {
                const items = group.map(c => {
                    const requiredGroup = isRequiredCourse(c.code);
                    // Simplified badges for conflict list
                    return `
                        <div class="conf-item">
                            <div class="conf-title">[${escapeHtml(c.code)}] ${escapeHtml(c.name)}</div>
                            <div class="conf-meta">${formatTimeRange(c.startTime, c.endTime)} · ${escapeHtml(c.room || '')}</div>
                            <button class="unselect-btn" data-course-id="${c.id}" style="position:static;margin-left:auto;opacity:1;background:none;color:var(--danger);" title="取消选择"><i class="ri-delete-bin-line"></i></button>
                        </div>
                    `;
                }).join('');
                block.innerHTML = `
                    <div class="title" style="color:var(--danger);display:flex;align-items:center;gap:4px;"><i class="ri-alert-line"></i> 时间冲突</div>
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
    
    if (state.isListCompressed) {
        // 分组渲染逻辑
        const groups = new Map();
        state.filteredCourses.forEach(c => {
            if (!groups.has(c.code)) {
                groups.set(c.code, []);
            }
            groups.get(c.code).push(c);
        });
        
        let html = '';
        if (groups.size === 0) {
            html = `<tr><td colspan="8" style="text-align:center;color:var(--gray-400);padding:32px;">无搜索结果</td></tr>`;
        } else {
            for (const [code, courses] of groups) {
                const first = courses[0];
                // 检查该组是否有选中的课程
                const selectedInGroup = courses.filter(c => state.selectedIds.has(c.id));
                const isSelected = selectedInGroup.length > 0;
                const checked = isSelected ? 'checked' : '';
                
                // 组头行
                const requiredGroup = isRequiredCourse(code);
                const credit = CODE_TO_CREDIT[code] ?? first.credit ?? '';
                
                // 准备显示的数据
                let displayData = {
                    weekday: '',
                    time: '',
                    teacher: '',
                    room: '',
                    weeks: ''
                };

                if (isSelected && selectedInGroup.length === 1) {
                    // 单选状态：显示选中课程的信息
                    const s = selectedInGroup[0];
                    displayData.weekday = weekdayLabel(s.weekday);
                    displayData.time = formatTimeRange(s.startTime, s.endTime);
                    displayData.teacher = escapeHtml(s.teacher || '');
                    displayData.room = escapeHtml(s.room || '');
                    displayData.weeks = escapeHtml(s.weeks || '');
                } else {
                    // 未选或多选：显示汇总信息
                    // 老师去重
                    const teachers = [...new Set(courses.map(c => c.teacher).filter(Boolean))];
                    displayData.teacher = teachers.map(escapeHtml).join(', ');
                    
                    // 教室去重
                    const rooms = [...new Set(courses.map(c => c.room).filter(Boolean))];
                    displayData.room = rooms.map(escapeHtml).join(', ');
                    
                    // 周次
                    const allWeeks = [...new Set(courses.map(c => c.weeks))];
                    if (allWeeks.length === 1) {
                        displayData.weeks = escapeHtml(allWeeks[0]);
                    } else {
                        displayData.weeks = `<span style="color:var(--gray-500);font-size:12px">多个班次</span>`;
                    }

                    // 星期/时间
                    const weekdays = [...new Set(courses.map(c => c.weekday))].sort();
                    displayData.weekday = weekdays.map(weekdayLabel).join(', ');
                    displayData.time = `<span style="color:var(--gray-500);font-size:12px">可选 ${courses.length} 个班次</span>`;
                }

                // 徽章
                const requiredBadge = requiredGroup ? `<span class="badge badge-warning">${requiredGroup.description}</span>` : '';
                const gpaBadge = first.gpa === true ? '<span class="badge badge-success">GPA</span>' : 
                                first.gpa === false ? '<span class="badge badge-gray">非GPA</span>' : '';
                const creditBadge = `<span class="badge badge-gray">${credit}学分</span>`;
                
                const hasMultiple = courses.length > 1;
                const isExpanded = state.expandedGroups.has(code);
                const expandIcon = hasMultiple 
                    ? (isExpanded ? '<i class="ri-arrow-down-s-line"></i>' : '<i class="ri-arrow-right-s-line"></i>')
                    : '<span style="display:inline-block;width:16px;"></span>'; // 占位对齐

                // 如果只有一门课，强制显示详细信息（覆盖上面的汇总逻辑）
                if (!hasMultiple) {
                    const s = courses[0];
                    displayData.weekday = weekdayLabel(s.weekday);
                    displayData.time = formatTimeRange(s.startTime, s.endTime);
                    displayData.teacher = escapeHtml(s.teacher || '');
                    displayData.room = escapeHtml(s.room || '');
                    displayData.weeks = escapeHtml(s.weeks || '');
                }

                html += `
                    <tr class="group-row ${isSelected ? 'row-selected' : ''}" data-code="${code}" style="cursor:${hasMultiple ? 'pointer' : 'default'};">
                        <td class="w-checkbox">
                            <input type="checkbox" class="group-checkbox" data-code="${code}" ${checked}>
                        </td>
                        <td class="w-code" data-label="代码">
                            <div style="display:flex;align-items:center;gap:4px;">
                                ${expandIcon} ${escapeHtml(code)}
                            </div>
                        </td>
                        <td class="w-name" data-label="课程名">
                            <div style="font-weight:500;">${escapeHtml(first.name)}</div>
                            <div style="display:flex;gap:4px;margin-top:2px;flex-wrap:wrap;">${requiredBadge}${gpaBadge}${creditBadge}</div>
                        </td>
                        <td class="w-day" data-label="星期">${displayData.weekday}</td>
                        <td class="w-time" data-label="时间">${displayData.time}</td>
                        <td class="w-teacher" data-label="老师">${displayData.teacher}</td>
                        <td class="w-room" data-label="教室">${displayData.room}</td>
                        <td class="w-weeks" data-label="周次">${displayData.weeks}</td>
                    </tr>
                `;

                if (isExpanded && hasMultiple) {
                    html += renderCourseRows(courses, selectedCodes, true);
                }
            }
        }
        courseTbodyEl.innerHTML = html;
    } else {
        // 原始渲染逻辑
        const rows = renderCourseRows(state.filteredCourses, selectedCodes, false);
        courseTbodyEl.innerHTML = rows || `<tr><td colspan="8" style="text-align:center;color:var(--gray-400);padding:32px;">无搜索结果</td></tr>`;
    }
	updateSelectedCredit();
}

function renderCourseRows(courses, selectedCodes, isGrouped) {
    return courses.map(c => {
		const isSelected = state.selectedIds.has(c.id);
		const canSelect = isSelected || canSelectCourse(c.id);
		const checked = isSelected ? 'checked' : '';
		const disabled = ''; // 不再禁用任何复选框
		const inThisWeek = isCourseInWeek(c, state.currentWeekNo);
		const weeksText = escapeHtml(c.weeks || '') + (inThisWeek ? ' <span class="badge badge-primary">本周</span>' : '');
		const credit = CODE_TO_CREDIT[c.code] ?? c.credit ?? '';
		
		// 检查是否为必修课程和冲突情况
		const requiredGroup = isRequiredCourse(c.code);
		const hasConflict = wouldConflictWithSelected(c.id);
		
		let rowClass = '';
		if (hasConflict && !isSelected) {
			rowClass = 'class="row-conflict"';
		} else if (isSelected) {
            rowClass = 'class="row-selected"';
        } else if (requiredGroup) {
			rowClass = 'class="row-required"';
		}
        
        // 如果是分组模式，稍微缩进，并且可能隐藏某些重复信息（如代码、名称）
        // 但为了清晰，保留所有列，只是背景色可能区分
        const indentStyle = isGrouped ? 'style="background-color:var(--gray-50);"' : '';
		
		const duplicateHint = selectedCodes.has(c.code) && !isSelected ? '<div style="font-size:11px;color:var(--danger);margin-top:2px;">已选同名课程</div>' : '';
		const conflictHint = hasConflict && !isSelected ? '<span class="badge badge-danger">冲突</span>' : '';
		const requiredHint = requiredGroup ? `<span class="badge badge-warning">${requiredGroup.description}</span>` : '';
		const gpaHint = c.gpa === true ? '<span class="badge badge-success">GPA</span>' : 
						c.gpa === false ? '<span class="badge badge-gray">非GPA</span>' : '';
		
		return `
			<tr ${rowClass} ${indentStyle}>
				<td class="w-checkbox" ${isGrouped ? 'style="padding-left:24px;"' : ''}><input type="checkbox" data-id="${c.id}" ${checked} ${disabled}></td>
				<td class="w-code" data-label="代码">${escapeHtml(c.code || '')}</td>
				<td class="w-name" data-label="课程名">
                    <div style="font-weight:500;">${escapeHtml(c.name)}</div>
                    ${duplicateHint}
                </td>
				<td class="w-day" data-label="星期">${weekdayLabel(c.weekday)}</td>
				<td class="w-time" data-label="时间">${formatTimeRange(c.startTime, c.endTime)}</td>
				<td class="w-teacher" data-label="老师">${escapeHtml(c.teacher || '')}</td>
				<td class="w-room" data-label="教室">${escapeHtml(c.room || '')}</td>
				<td class="w-weeks" data-label="周次">
                    <div style="margin-bottom:2px;">${weeksText}</div>
                    <div style="display:flex;flex-wrap:wrap;gap:4px;">
                        ${conflictHint}${requiredHint}${gpaHint}
                        <span class="badge badge-gray">${credit}学分</span>
                    </div>
                </td>
			</tr>
		`;
	}).join('');
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
		// const color = progress.selected >= progress.required ? '#10b981' : (progress.selected > 0 ? '#f59e0b' : '#6b7280');
		requiredProgressEl.textContent = `${progress.selected}/${progress.required}`;
		// requiredProgressEl.style.color = color;
	}
	
	// 更新GPA学分显示
	const gpaCredits = calculateGPACredits();
	if (gpaDisplayEl) {
		gpaDisplayEl.textContent = String(gpaCredits);
        // Remove inline color style, use class if needed, but here we just update text
		// gpaDisplayEl.style.color = gpaCredits > 0 ? '#059669' : '#6b7280';
	}
	
	// 更新冲突显示
	const conflictCount = calculateTotalConflicts();
	if (conflictDisplayEl) {
		conflictDisplayEl.textContent = String(conflictCount);
        // Remove inline color style
		// conflictDisplayEl.style.color = conflictCount > 0 ? '#dc2626' : '#6b7280';
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

/* ICS日历导出功能 */
// function exportICSCalendar() {
// 	const selectedCourses = COURSES.filter(c => state.selectedIds.has(c.id));
//
// 	if (selectedCourses.length === 0) {
// 		alert('请先选择要导出的课程');
// 		return;
// 	}
//
// 	// ICS文件头部
// 	let icsContent = [
// 		'BEGIN:VCALENDAR',
// 		'VERSION:2.0',
// 		'PRODID:-//Course Selection System//Course Calendar//CN',
// 		'CALSCALE:GREGORIAN',
// 		'METHOD:PUBLISH',
// 		'X-WR-CALNAME:我的课程表',
// 		'X-WR-TIMEZONE:Asia/Shanghai',
// 		'X-WR-CALDESC:从选课系统导出的课程表'
// 	].join('\r\n') + '\r\n';
//
// 	// 为每门课程的每个上课时间创建事件
// 	selectedCourses.forEach(course => {
// 		// 只处理周末课程
// 		if (course.weekday !== 6 && course.weekday !== 7) return;
//
// 		const weekSet = parseWeeks(course.weeks);
// 		if (weekSet.size === 0) return;
//
// 		// 为每个上课周次创建事件
// 		for (const weekNo of weekSet) {
// 			const weekStart = getWeekStartByNo(weekNo);
// 			const courseDate = dayjs(weekStart).add(course.weekday - 2, 'day'); // 转换为实际日期
//
// 			// 创建开始和结束时间
// 			const startDateTime = courseDate.hour(parseInt(course.startTime.split(':')[0])).minute(parseInt(course.startTime.split(':')[1]));
// 			const endDateTime = courseDate.hour(parseInt(course.endTime.split(':')[0])).minute(parseInt(course.endTime.split(':')[1]));
//
// 			// 格式化日期时间为ICS格式 (YYYYMMDDTHHMMSS)
// 			const dtStart = startDateTime.format('YYYYMMDD[T]HHmmss');
// 			const dtEnd = endDateTime.format('YYYYMMDD[T]HHmmss');
// 			const dtStamp = dayjs().format('YYYYMMDD[T]HHmmss[Z]');
//
//             // 生成唯一的UID
//             const uid = `${course.id}-${weekNo}-${dtStart}@course-selection-system`;
//
// 			// 创建课程描述
// 			const description = [
// 				`课程代码: ${course.code}`,
// 				`授课老师: ${course.teacher || '未指定'}`,
// 				`教室: ${course.room || '未指定'}`,
// 				`学分: ${CODE_TO_CREDIT[course.code] || course.credit || '未知'}`,
// 				`第${weekNo}周`,
// 				course.gpa === true ? '计入GPA' : course.gpa === false ? '不计入GPA' : ''
// 			].filter(Boolean).join('\\n');
//
// 			// 创建事件
// 			const event = [
// 				'BEGIN:VEVENT',
// 				`UID:${uid}`,
// 				`DTSTART:${dtStart}`,
// 				`DTEND:${dtEnd}`,
// 				`DTSTAMP:${dtStamp}`,
// 				`SUMMARY:${course.name}`,
// 				`DESCRIPTION:${description}`,
// 				`LOCATION:${course.room || ''}`,
// 				`STATUS:CONFIRMED`,
// 				`TRANSP:OPAQUE`,
// 				'END:VEVENT'
// 			].join('\r\n') + '\r\n';
//
// 			icsContent += event;
// 		}
// 	});
//
// 	// ICS文件结尾
// 	icsContent += 'END:VCALENDAR\r\n';
//
// 	// 创建并下载文件
// 	const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
// 	const url = URL.createObjectURL(blob);
// 	const link = document.createElement('a');
// 	link.href = url;
// 	link.download = `课程表_${dayjs().format('YYYY-MM-DD')}.ics`;
// 	document.body.appendChild(link);
// 	link.click();
// 	document.body.removeChild(link);
// 	URL.revokeObjectURL(url);
//
// 	// 统计信息
// 	const totalEvents = selectedCourses.reduce((sum, course) => {
// 		const weekSet = parseWeeks(course.weeks);
// 		return sum + weekSet.size;
// 	}, 0);
//
// 	const totalCredits = selectedCourses.reduce((sum, c) => sum + (CODE_TO_CREDIT[c.code] ?? c.credit ?? 0), 0);
//
// 	alert(`ICS日历文件已生成！\n已导出 ${selectedCourses.length} 门课程，${totalEvents} 个课程事件\n总学分：${totalCredits}\n\n可导入到手机日历、Outlook、Google Calendar等应用中。`);
// }

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

function exportICSCalendar() {
	const selectedCourses = COURSES.filter(c => state.selectedIds.has(c.id));
	if (selectedCourses.length === 0) {
		alert('请先选择课程');
		return;
	}
	
	let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Course Selection System//Course Schedule//EN
`;
	
	selectedCourses.forEach(course => {
		const weekSet = parseWeeks(course.weeks);
		if (weekSet.size === 0) return; // 跳过无周次信息的课程
		
		// 计算课程的开始和结束日期
		const firstDate = dayjs(course.firstDate);
		const startTime = course.startTime;
		const endTime = course.endTime;
		
		// 生成每个周次的VEVENT
		for (const weekNo of weekSet) {
			const weekStart = getWeekStartByNo(weekNo);
			const courseDate = dayjs(weekStart).add(course.weekday - 2, 'day'); // weekday 1=周一, 7=周日
			
			const eventStart = courseDate.format('YYYYMMDD') + 'T' + startTime.replace(':', '') + '00';
			const eventEnd = courseDate.format('YYYYMMDD') + 'T' + endTime.replace(':', '') + '00';
			
			const uid = `course-${course.id}-week${weekNo}-${eventStart}@course-selection`;
			const summary = `${course.code} ${course.name}`;
			const location = course.room || '';
			const description = `教师: ${course.teacher || ''} | 学分: ${CODE_TO_CREDIT[course.code] ?? course.credit ?? ''}`;
			
			icsContent += `BEGIN:VEVENT
UID:${uid}
DTSTART:${eventStart}
DTEND:${eventEnd}
SUMMARY:${summary}
LOCATION:${location}
DESCRIPTION:${description}
END:VEVENT
`;
		}
	});
	
	icsContent += 'END:VCALENDAR';
	
	// 直接下载文件
	const dataBlob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
	const link = document.createElement('a');
	link.href = URL.createObjectURL(dataBlob);
	link.download = `课程表_${dayjs().format('YYYY-MM-DD')}.ics`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	
	alert(`已导出 ${selectedCourses.length} 门课程到ICS日历文件`);
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
			state.recommendPlans = [];
			saveToLocalStorage();
			
			// 重新渲染
			renderCourseList();
			refreshCalendar();
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
	
	// 新布局：单行表头 + 3 行时间段；列顺序为 Week1(周六,周日), Week2(周六,周日) ...
	const startY = 100;
	const timeColWidth = 70;
	const weekCount = 18; // 总周数
	const splitWeek = 9; // 第一行结束周（含）
	const days = [6, 7];
	// 行1: 1-9周, 行2: 10-18周
	const firstRowWeeks = Array.from({length: splitWeek}, (_,i)=> i+1); // 1..9
	const secondRowWeeks = Array.from({length: weekCount - splitWeek}, (_,i)=> i+1+splitWeek); //10..18

	// 计算每行列数（周*2天）
	const row1Cols = firstRowWeeks.length * days.length;
	const row2Cols = secondRowWeeks.length * days.length;
	// 设定统一列宽（按较大行保证总宽<=2400）
	let cellWidth = Math.floor((2400 - timeColWidth) / Math.max(row1Cols, row2Cols));
	if (cellWidth < 60) cellWidth = 60; // 给文本更宽一些
	const headerHeight = 48;
	const timeRowHeight = 108;

	const timeSlots = [
		{ key: 'morning', name: '上午', time: '08:30-12:00' },
		{ key: 'afternoon', name: '下午', time: '13:30-17:00' },
		{ key: 'evening', name: '晚上', time: '18:00-21:10' }
	];

	// 预缓存周六/周日日期
	function drawRow(weeksArray, offsetY) {
		// 生成周 meta
		const metas = weeksArray.map(w=>{
			const ws = getWeekStartByNo(w);
			return {week: w, sat: dayjs(ws).add(4,'day'), sun: dayjs(ws).add(5,'day')};
		});
		// 表头
		ctx.fillStyle = '#fafafa';
		ctx.fillRect(0, offsetY, timeColWidth, headerHeight);
		ctx.strokeStyle = '#e5e7eb';
		ctx.strokeRect(0, offsetY, timeColWidth, headerHeight);
		ctx.fillStyle = '#1f2937';
		ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
		ctx.textAlign = 'center';
		ctx.fillText('时间', timeColWidth/2, offsetY + 14);
		let x = timeColWidth;
		ctx.font = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
		for (const meta of metas) {
			for (const d of days) {
				const date = d===6? meta.sat: meta.sun;
				ctx.fillStyle = '#fafafa';
				ctx.fillRect(x, offsetY, cellWidth, headerHeight);
				ctx.strokeStyle = '#e5e7eb';
				ctx.strokeRect(x, offsetY, cellWidth, headerHeight);
				ctx.fillStyle = '#1f2937';
				ctx.fillText(`第${meta.week}周`, x + cellWidth/2, offsetY + 6);
				ctx.fillText(`${date.format('M/DD')} ${d===6? '六':'日'}`, x + cellWidth/2, offsetY + 22);
				x += cellWidth;
			}
		}
		// 时间段行
		let rowBaseY = offsetY + headerHeight;
		for (const slot of timeSlots) {
			ctx.fillStyle = '#fafafa';
			ctx.fillRect(0, rowBaseY, timeColWidth, timeRowHeight);
			ctx.strokeStyle = '#e5e7eb';
			ctx.strokeRect(0, rowBaseY, timeColWidth, timeRowHeight);
			ctx.fillStyle = '#6b7280';
			ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
			ctx.textAlign = 'center';
			ctx.fillText(slot.name, timeColWidth/2, rowBaseY + 12);
			ctx.fillText(slot.time, timeColWidth/2, rowBaseY + 30);
			x = timeColWidth;
			for (const meta of metas) {
				for (const d of days) {
					ctx.fillStyle = '#ffffff';
					ctx.fillRect(x, rowBaseY, cellWidth, timeRowHeight);
					ctx.strokeStyle = '#e5e7eb';
					ctx.strokeRect(x, rowBaseY, cellWidth, timeRowHeight);
					const coursesInCell = selectedCourses.filter(course => {
						if (course.weekday !== d) return false;
						if (getTimeSlot(course.startTime) !== slot.key) return false;
						return parseWeeks(course.weeks).has(meta.week);
					});
					if (coursesInCell.length) {
						let bg = '#dbeafe';
						if (coursesInCell.length > 1) bg = '#fee2e2';
						else if (isRequiredCourse(coursesInCell[0].code)) bg = '#fef3c7';
						else if (coursesInCell[0].gpa) bg = '#d1fae5';
						ctx.fillStyle = bg;
						ctx.fillRect(x+1, rowBaseY+1, cellWidth-2, timeRowHeight-2);
						ctx.textAlign = 'center';
						let ty = rowBaseY + 6;
						for (const course of coursesInCell) {
							let name = course.name;
							if (name.length > 6) name = name.slice(0,5)+'...';
							ctx.fillStyle = '#1f2937';
							ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
							ctx.fillText(name, x + cellWidth/2, ty); ty += 14;
							ctx.font = '9px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
							ctx.fillStyle = '#374151';
							ctx.fillText(course.teacher, x + cellWidth/2, ty); ty += 12;
							ctx.fillText(course.room || '', x + cellWidth/2, ty); ty += 12;
							if (ty > rowBaseY + timeRowHeight - 10) break;
						}
					}
					x += cellWidth;
				}
			}
			rowBaseY += timeRowHeight;
		}
		return rowBaseY;
	}

	const row1EndY = drawRow(firstRowWeeks, startY);
	const gap = 24; // 两行间距
	const row2StartY = row1EndY + gap;
	const row2EndY = drawRow(secondRowWeeks, row2StartY);
	const legendY = row2EndY + 20;
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

/* 推荐方案功能 */
function generateRecommendations() {
	const selectedCodes = getSelectedCourseCodes();
	if (selectedCodes.size === 0) {
		return false;
	}

	// 1. Group available sections by code
	const sectionsByCode = new Map();
	for (const code of selectedCodes) {
		const sections = COURSES.filter(c => c.code === code);
		if (sections.length > 0) {
			sectionsByCode.set(code, sections);
		}
	}

	// 2. Generate Cartesian product
	const codes = Array.from(sectionsByCode.keys());
	const combinations = [];
	
	function backtrack(index, currentSelection) {
		if (index === codes.length) {
			combinations.push(new Set(currentSelection));
			return;
		}
		
		const code = codes[index];
		const sections = sectionsByCode.get(code);
		for (const section of sections) {
			currentSelection.push(section.id);
			backtrack(index + 1, currentSelection);
			currentSelection.pop();
		}
	}
	
	backtrack(0, []);

	// 3. Score plans
	let scoredPlans = combinations.map(ids => {
		const score = calculatePlanScore(ids);
		return { ids, score };
	});

    // Filter out scores < 80
    scoredPlans = scoredPlans.filter(p => p.score >= 80);

	// 4. Sort by score desc
	scoredPlans.sort((a, b) => b.score - a.score);

    // Limit queue length to max 10
    if (scoredPlans.length > 10) {
        scoredPlans.length = 10;
    }

	// 5. Update state
	// Filter out the exact current plan to ensure we switch to something else if possible, 
    // or just keep all and let the index cycle handle it.
    // Requirement says "Find other permutations". 
    // Let's keep all but identify the current one to maybe skip or start after it.
    // For simplicity, we just store all sorted plans.
	state.recommendPlans = scoredPlans;
	state.currentPlanIndex = -1;
    
    // Try to find current plan index
    const currentIdsStr = Array.from(state.selectedIds).sort().join(',');
    const currentPlanIdx = scoredPlans.findIndex(p => Array.from(p.ids).sort().join(',') === currentIdsStr);
    
    // Logic:
    // 1. If current plan is not in list, start from beginning (-1)
    // 2. If current plan is in list but not the best (score < max), reset to -1 to jump to best next
    // 3. If current plan is one of the best, keep index so we cycle to next best
    
    if (currentPlanIdx !== -1) {
        const maxScore = scoredPlans[0].score;
        const currentScore = scoredPlans[currentPlanIdx].score;
        
        if (currentScore < maxScore) {
            // Current plan is suboptimal, next click should show optimal
            state.currentPlanIndex = -1;
        } else {
            // Current plan is optimal (or equal best), next click shows next option
            state.currentPlanIndex = currentPlanIdx;
        }
    } else {
        state.currentPlanIndex = -1;
    }

	return true;
}

function calculatePlanScore(selectedIds) {
	let score = 100;
	const courses = COURSES.filter(c => selectedIds.has(c.id));
	
	// Check conflicts
    let conflicts = 0;
	// Simple pair-wise check
    // Optimizing: filter only weekend courses for conflict check as per existing logic
    const weekendCourses = courses.filter(c => c.weekday === 6 || c.weekday === 7);
    
    for (let i = 0; i < weekendCourses.length; i++) {
        for (let j = i + 1; j < weekendCourses.length; j++) {
            const c1 = weekendCourses[i];
            const c2 = weekendCourses[j];
            if (c1.weekday === c2.weekday) {
                // Check weeks overlap
                const w1 = parseWeeks(c1.weeks);
                const w2 = parseWeeks(c2.weeks);
                const hasWeekOverlap = [...w1].some(w => w2.has(w));
                if (hasWeekOverlap) {
                    // Check time overlap
                    if (timeRangesOverlap(c1.startTime, c1.endTime, c2.startTime, c2.endTime)) {
                        conflicts++;
                    }
                }
            }
        }
    }
    
	score -= conflicts * 100; // Heavy penalty for conflicts

	// Check optimization: Same room for AM/PM on same day
	// Group by (weekday + date/weeks?) 
    // Simplified: Just check if same weekday courses are in same room
    const byDay = new Map();
    for (const c of weekendCourses) {
        if (!byDay.has(c.weekday)) byDay.set(c.weekday, []);
        byDay.get(c.weekday).push(c);
    }
    
    for (const [day, dayCourses] of byDay) {
        // If multiple courses on same day have same room, bonus
        // Check pairs
        for (let i = 0; i < dayCourses.length; i++) {
            for (let j = i + 1; j < dayCourses.length; j++) {
                if (dayCourses[i].room === dayCourses[j].room && dayCourses[i].room) {
                    score += 10;
                }
            }
        }
    }

	return score;
}

function applyNextRecommendation() {
    // If no plans or user modified selection (how to track? we can check if current state matches plan)
    // We'll rely on state.recommendPlans being cleared on manual change.
    if (!state.recommendPlans || state.recommendPlans.length === 0) {
        const success = generateRecommendations();
        if (!success) return; // generateRecommendations 内部有 alert
        
        // 如果生成后还是空的（都被过滤了）
        if (state.recommendPlans.length === 0) {
            alert("当前选择没有评分 >= 80 的推荐方案");
            return;
        }
    }
    
    // 如果只有一个方案，且就是当前这个
    if (state.recommendPlans.length === 1) {
         // 检查当前是否已经是这个方案
         const plan = state.recommendPlans[0];
         const currentIdsStr = Array.from(state.selectedIds).sort().join(',');
         const planIdsStr = Array.from(plan.ids).sort().join(',');
         
         if (currentIdsStr === planIdsStr) {
             alert(`当前已是唯一推荐方案，得分: ${plan.score}`);
             return;
         }
    }

    // Cycle to next plan
    let nextIndex = state.currentPlanIndex + 1;
    let message = "";
    
    if (nextIndex >= state.recommendPlans.length) {
        nextIndex = 0;
        message = "没有更多更好方案了，已回到第一个推荐方案。\n";
    }
    
    const plan = state.recommendPlans[nextIndex];
    state.currentPlanIndex = nextIndex;
    state.selectedIds = new Set(plan.ids);
    
    saveToLocalStorage();
    renderCourseList();
    refreshCalendar();
    updateSelectedCredit();
    
    const rank = nextIndex + 1;
    const total = state.recommendPlans.length;
    
    // 提示用户
    alert(`${message}当前方案 (${rank}/${total}) 得分: ${plan.score}`);
}

function refreshCalendar() {
    if (state.isCompressed) {
        renderCalendarGrid();
    }
    renderEvents();
}

/* 事件绑定 */
function bindEvents() {
	searchInputEl.addEventListener('input', () => {
		state.searchKeyword = searchInputEl.value;
		saveToLocalStorage();
		applyFilter();
		renderCourseList();
	});
    courseTbodyEl.addEventListener('click', (e) => {
        // 处理行展开/折叠
        const groupRow = e.target.closest('.group-row');
        // 如果点击的是复选框或其容器，不触发展开
        if (groupRow && !e.target.closest('.w-checkbox') && !e.target.matches('input')) {
            const code = groupRow.dataset.code;
            
            // 检查该组是否有多个课程
            const groupCourses = state.filteredCourses.filter(c => c.code === code);
            if (groupCourses.length <= 1) return; // 只有一门课，不展开

            if (state.expandedGroups.has(code)) {
                state.expandedGroups.delete(code);
            } else {
                state.expandedGroups.add(code);
            }
            renderCourseList();
        }
    });
	courseTbodyEl.addEventListener('change', (e) => {
		const t = e.target;
        
        // 处理压缩视图的组复选框
        if (t && t.classList.contains('group-checkbox')) {
            const code = t.dataset.code;
            const groupCourses = state.filteredCourses.filter(c => c.code === code);
            
            if (groupCourses.length === 0) return;

            if (t.checked) {
                // 选中：默认选第一个
                // 清理同代码的其他选择（单选逻辑）
                const allCoursesWithCode = COURSES.filter(c => c.code === code);
                allCoursesWithCode.forEach(c => state.selectedIds.delete(c.id));
                
                // 选中该组第一个
                state.selectedIds.add(groupCourses[0].id);
            } else {
                // 取消选中：清除该组所有已选
                const allCoursesWithCode = COURSES.filter(c => c.code === code);
                allCoursesWithCode.forEach(c => state.selectedIds.delete(c.id));
            }
            
            state.recommendPlans = [];
            saveToLocalStorage();
            renderCourseList();
            refreshCalendar();
            updateSelectedCredit();
            return;
        }

		if (t && t.matches('input[type="checkbox"][data-id]')) {
			const id = Number(t.dataset.id);
			
			if (t.checked) {
                // 互斥逻辑：选中某门课时，自动取消同代码的其他课程
                const currentCourse = COURSES.find(c => c.id === id);
                if (currentCourse) {
                    const sameCodeIds = Array.from(state.selectedIds).filter(sid => {
                        const c = COURSES.find(x => x.id === sid);
                        return c && c.code === currentCourse.code && c.id !== id;
                    });
                    sameCodeIds.forEach(sid => state.selectedIds.delete(sid));
                }

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
			
			// 清除推荐方案缓存
			state.recommendPlans = [];
			// 保存到本地存储
			saveToLocalStorage();
			
			// 重新渲染以更新可选状态
			renderCourseList();
			refreshCalendar();
			updateSelectedCredit();
		}
	});
	clearSelectionBtn.addEventListener('click', () => {
		state.selectedIds.clear();
		state.recommendPlans = [];
		saveToLocalStorage();
		renderCourseList();
		refreshCalendar();
		updateSelectedCredit();
	});
	exportBtn.addEventListener('click', () => {
		exportSelections();
	});
    if (toggleCompressBtn) {
        toggleCompressBtn.addEventListener('click', () => {
            state.isCompressed = !state.isCompressed;
            toggleCompressBtn.innerHTML = state.isCompressed ? 
                '<i class="ri-expand-left-right-line"></i> 原始视图' : 
                '<i class="ri-contract-left-right-line"></i> 压缩视图';
            toggleCompressBtn.classList.toggle('btn-primary', state.isCompressed);
            toggleCompressBtn.classList.toggle('btn-outline', !state.isCompressed);
            
            renderCalendarGrid();
            renderEvents();
        });
    }
    if (toggleListCompressBtn) {
        toggleListCompressBtn.addEventListener('click', () => {
            state.isListCompressed = !state.isListCompressed;
            toggleListCompressBtn.innerHTML = state.isListCompressed ? 
                '<i class="ri-expand-left-right-line"></i> 原始视图' : 
                '<i class="ri-contract-left-right-line"></i> 压缩视图';
            toggleListCompressBtn.classList.toggle('btn-primary', state.isListCompressed);
            toggleListCompressBtn.classList.toggle('btn-outline', !state.isListCompressed);
            
            renderCourseList();
        });
    }
    // 移除旧的组头点击事件
	if (recommendBtn) {
		recommendBtn.addEventListener('click', () => {
			applyNextRecommendation();
		});
	}
	if (recommendBtnList) {
		recommendBtnList.addEventListener('click', () => {
			applyNextRecommendation();
		});
	}
	importBtn.addEventListener('click', () => {
		importFileInputEl.click();
	});
	downloadImageBtn.addEventListener('click', () => {
		downloadScheduleImage();
	});
    if (downloadImageBtnList) {
        downloadImageBtnList.addEventListener('click', () => {
            downloadScheduleImage();
        });
    }
	exportICSBtn.addEventListener('click', () => {
		exportICSCalendar();
	});
    if (exportICSBtnList) {
        exportICSBtnList.addEventListener('click', () => {
            exportICSCalendar();
        });
    }
	importFileInputEl.addEventListener('change', (e) => {
		const file = e.target.files[0];
		if (file) {
			importSelections(file);
			e.target.value = ''; // 清空文件输入，允许重复选择同一文件
		}
	});
	calendarEl.addEventListener('click', (e) => {
		const btn = e.target.closest('.unselect-btn');
		if (btn) {
			e.preventDefault();
			e.stopPropagation();
			const courseId = Number(btn.dataset.courseId);
			if (courseId && state.selectedIds.has(courseId)) {
				state.selectedIds.delete(courseId);
				state.recommendPlans = [];
				saveToLocalStorage();
				// 重新渲染
				renderCourseList();
				refreshCalendar();
				updateSelectedCredit();
			}
		}
	});
	prevWeekBtn.addEventListener('click', () => {
		state.currentWeekNo = Math.max(1, state.currentWeekNo - 1);
		state.currentWeekStart = getWeekStartByNo(state.currentWeekNo);
		saveToLocalStorage();
		updateWeekTitle();
		// renderCalendarGrid(); // No need to re-render grid on week change unless we want to highlight? 
        // Actually original code did re-render. But grid is static 1-18.
        // If compressed, grid depends on selection, not currentWeekNo.
        // So we don't need to re-render grid here.
		renderEvents();
		updateSelectedCredit();
	});
	nextWeekBtn.addEventListener('click', () => {
		state.currentWeekNo = Math.min(MAX_WEEKS, state.currentWeekNo + 1);
		state.currentWeekStart = getWeekStartByNo(state.currentWeekNo);
		saveToLocalStorage();
		updateWeekTitle();
		// renderCalendarGrid();
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
    
    // 初始化列表压缩按钮状态
    if (toggleListCompressBtn) {
        toggleListCompressBtn.innerHTML = state.isListCompressed ? 
            '<i class="ri-expand-left-right-line"></i> 原始视图' : 
            '<i class="ri-contract-left-right-line"></i> 压缩视图';
        toggleListCompressBtn.classList.toggle('btn-primary', state.isListCompressed);
        toggleListCompressBtn.classList.toggle('btn-outline', !state.isListCompressed);
    }

    // 初始化日历压缩按钮状态
    if (toggleCompressBtn) {
        toggleCompressBtn.innerHTML = state.isCompressed ? 
            '<i class="ri-expand-left-right-line"></i> 原始视图' : 
            '<i class="ri-contract-left-right-line"></i> 压缩视图';
        toggleCompressBtn.classList.toggle('btn-primary', state.isCompressed);
        toggleCompressBtn.classList.toggle('btn-outline', !state.isCompressed);
    }
    
    // 初始化推荐弹窗
    initRecommendModal();
}

function initRecommendModal() {
    const modal = document.getElementById('recommendModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const modalRecommendBtn = document.getElementById('modalRecommendBtn');
    
    // 修改为前5次打开都会弹出
    let viewCount = parseInt(localStorage.getItem('recommendTipViewCount') || '0');
    const hasSeenLegacy = localStorage.getItem('hasSeenRecommendTip');

    // 兼容旧数据：如果以前标记过已读，视为已看1次
    if (viewCount === 0 && hasSeenLegacy) {
        viewCount = 1;
    }

    if (viewCount >= 5) {
        // 超过5次不再显示
        modal.style.display = 'none';
        return;
    }

    // 显示弹窗
    modal.style.display = 'flex';
    // 强制重绘以触发过渡动画
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });

    // 计数加1并保存
    viewCount++;
    localStorage.setItem('recommendTipViewCount', viewCount.toString());
    // 清理旧标记
    if (hasSeenLegacy) {
        localStorage.removeItem('hasSeenRecommendTip');
    }

    // 15秒后自动关闭
    const autoCloseTimer = setTimeout(() => {
        closeModal();
    }, 15000);

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // 等待动画结束
        if (autoCloseTimer) clearTimeout(autoCloseTimer);
    }

    // 绑定关闭事件
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // 点击遮罩层关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 弹窗内的体验按钮
    if (modalRecommendBtn) {
        modalRecommendBtn.addEventListener('click', () => {
            closeModal();
            applyNextRecommendation();
        });
    }
}

document.addEventListener('DOMContentLoaded', init);
