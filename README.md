# ShopFloor PMS & Reliability Logger

A browser-based Preventive Maintenance Schedule (PMS), downtime tracking, and equipment reliability dashboard built for machine shops, lathes, and rotating equipment. Designed to run directly on **GitHub Pages** with zero backend dependencies and offline `localStorage` persistence.

**Live Demo:** [https://jeffry-lacanglacang.github.io/SHOPFLOOR-PMS-RELIABILITY-LOGGER/](https://jeffry-lacanglacang.github.io/SHOPFLOOR-PMS-RELIABILITY-LOGGER/)

---

## Overview

ShopFloor PMS & Reliability Logger helps maintenance teams, electricians, and shop supervisors track running hours, monitor mechanical and electrical PMS intervals, log scheduled and unscheduled downtime events, and evaluate key reliability metrics such as **Availability (%)**, **MTBF**, and **MTTR**.

The application ships as a self-contained single-page web application (`index.html`) with a dark industrial interface, custom HTML5 Canvas charts with interactive tooltips, CSV/JSON export and restore tools, and print-ready work order/checksheet formatting.

---

## Key Features

### 1. Equipment Fleet & Running Hours
- Monitor rotating shop equipment (such as engine lathes, turret lathes, radial drills, horizontal mills, and coolant pump skids) along with motor ratings, supply voltage/phase, speed ranges, and operational status (`Running`, `Idle`, `Scheduled PMS`, `Breakdown`).
- Quick-add shift running hours directly from each equipment card to automatically recalculate PMS remaining hours and interval health.
- Add, edit, or delete assets, with new equipment automatically populated with standard mechanical and electrical PMS tasks.

### 2. PMS Interval Matrix & Checklist
- Pre-loaded rotating equipment PMS catalog organized across **Daily / Shift**, **Weekly**, **Monthly**, **Quarterly**, and **Semi-Annual / Annual** intervals.
- Filter tasks by equipment, frequency tier, discipline (`Mechanical` or `Electrical`), and interval health state (`OK`, `DUE_SOON` at >=80% elapsed interval, or `OVERDUE`).
- Log task completions with meter hour readings, technician name, and inspection notes (such as Megohmmeter insulation resistance, runout, or lubricant grades), and create custom PMS tasks when needed.

### 3. Scheduled & Unscheduled Downtime Logger
- Record downtime events under **Unscheduled Mechanical**, **Unscheduled Electrical**, **Scheduled PMS**, and **Operational / Other** classifications with context-specific failure modes and job categories.
- Automatically calculate event duration in hours from start and end timestamps (with manual override support) while capturing root cause, corrective action, spare parts used, and assigned technician.

### 4. Completed PMS History
- Maintain an audit log of completed PMS work including timestamp, equipment, frequency tier, discipline, meter hour at completion, technician, and recorded inspection notes.

### 5. Reliability KPIs & Visual Analytics
- Track **Availability %**, **MTBF (Mean Time Between Failures)**, and **MTTR (Mean Time To Repair)** per machine alongside cumulative running hours and downtime hours.
- Explore interactive HTML5 Canvas visualizations with hover tooltips:
  - **Running Hours vs. PMS Interval Compliance** (grouped bar + compliance line chart)
  - **Availability %, MTBF & MTTR Comparison**
  - **Downtime Distribution by Equipment & Category** (stacked bars)
  - **Total Downtime Share by Failure Category** (donut chart)

### 6. Data Portability, Printing & Offline Storage
- All records are saved locally in the browser via `localStorage` under `shopfloor_pms_logger_v1`.
- Export PMS schedules and downtime logs to **CSV**, download or restore full **JSON** backups, print formatted reports/checksheets, or reset to the default 5-machine demo dataset.

---

## Tech Stack

- **HTML5** — Semantic layout, modals, forms, and print stylesheets
- **CSS3** — Custom properties, responsive grids, sticky headers/tabs, and dark industrial styling
- **Vanilla JavaScript (ES6+)** — State management, interval calculations, reliability math, CSV/JSON serialization, and HiDPI HTML5 Canvas charts

---

## Deployment on GitHub Pages

1. Push `index.html` (and any repository assets) to your GitHub repository.
2. In GitHub, go to **Settings > Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**, choose your branch (typically `main`) and `/ (root)`, then save.
4. Access the published app at `https://jeffry-lacanglacang.github.io/SHOPFLOOR-PMS-RELIABILITY-LOGGER/`.

---

## Author & Copyright

Created by **Jeffry Lacanglacang** (© 2026).
