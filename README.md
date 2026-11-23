# ShopFloor PMS & Reliability Logger

A browser-based Preventive Maintenance Schedule (PMS), downtime tracking, and equipment reliability dashboard built for machine shops, lathes, and rotating equipment[span_1](start_span)[span_1](end_span). Designed to run directly on **GitHub Pages** with zero backend dependencies and offline `localStorage` persistence[span_2](start_span)[span_2](end_span).

**Live Demo:** [https://jeffry-lacanglacang.github.io/SHOPFLOOR-PMS-RELIABILITY-LOGGER/](https://jeffry-lacanglacang.github.io/SHOPFLOOR-PMS-RELIABILITY-LOGGER/)

---

## Overview

ShopFloor PMS & Reliability Logger helps maintenance teams, electricians, and shop supervisors track running hours, monitor mechanical and electrical PMS intervals, log scheduled and unscheduled downtime events, and evaluate key reliability metrics such as **Availability (%)**, **MTBF**, and **MTTR**[span_3](start_span)[span_3](end_span).

The application ships as a self-contained single-page web application (`index.html`) with a dark industrial interface, custom HTML5 Canvas charts with interactive tooltips, CSV/JSON export and restore tools, and print-ready work order/checksheet formatting[span_4](start_span)[span_4](end_span).

---

## Key Features

### 1. Equipment Fleet & Running Hours
* Monitor rotating shop equipment (such as engine lathes, turret lathes, radial drills, horizontal mills, and coolant pump skids) along with motor ratings, supply voltage/phase, speed ranges, and operational status (`Running`, `Idle`, `Scheduled PMS`, `Breakdown`)[span_5](start_span)[span_5](end_span).
* Quick-add shift running hours directly from each equipment card to automatically recalculate PMS remaining hours and interval health[span_6](start_span)[span_6](end_span).
* Add, edit, or delete assets, with new equipment automatically populated with standard mechanical and electrical PMS tasks[span_7](start_span)[span_7](end_span).

### 2. PMS Interval Matrix & Checklist
* Pre-loaded rotating equipment PMS catalog organized across **Daily / Shift**, **Weekly**, **Monthly**, **Quarterly**, and **Semi-Annual / Annual** intervals[span_8](start_span)[span_8](end_span).
* Filter tasks by equipment, frequency tier, discipline (`Mechanical` or `Electrical`), and interval health state (`OK`, `DUE_SOON` at >=80% elapsed interval, or `OVERDUE`)[span_9](start_span)[span_9](end_span).
* Log task completions with meter hour readings, technician name, and inspection notes (such as Megohmmeter insulation resistance, runout, or lubricant grades), and create custom PMS tasks when needed[span_10](start_span)[span_10](end_span).

### 3. Scheduled & Unscheduled Downtime Logger
* Record downtime events under **Unscheduled Mechanical**, **Unscheduled Electrical**, **Scheduled PMS**, and **Operational / Other** classifications with context-specific failure modes and job categories[span_11](start_span)[span_11](end_span).
* Automatically calculate event duration in hours from start and end timestamps (with manual override support) while capturing root cause, corrective action, spare parts used, and assigned technician[span_12](start_span)[span_12](end_span).

### 4. Completed PMS History
* Maintain an audit log of completed PMS work including timestamp, equipment, frequency tier, discipline, meter hour at completion, technician, and recorded inspection notes[span_13](start_span)[span_13](end_span).

### 5. Reliability KPIs & Visual Analytics
* Track **Availability %**, **MTBF (Mean Time Between Failures)**, and **MTTR (Mean Time To Repair)** per machine alongside cumulative running hours and downtime hours[span_14](start_span)[span_14](end_span).
* Explore interactive HTML5 Canvas visualizations with hover tooltips:
  * **Running Hours vs. PMS Interval Compliance** (grouped bar + compliance line chart)[span_15](start_span)[span_15](end_span)
  * **Availability %, MTBF & MTTR Comparison**[span_16](start_span)[span_16](end_span)
  * **Downtime Distribution by Equipment & Category** (stacked bars)[span_17](start_span)[span_17](end_span)
  * **Total Downtime Share by Failure Category** (donut chart)[span_18](start_span)[span_18](end_span)

### 6. Data Portability, Printing & Offline Storage
* All records are saved locally in the browser via `localStorage` under `shopfloor_pms_logger_v1`[span_19](start_span)[span_19](end_span).
* Export PMS schedules and downtime logs to **CSV**, download or restore full **JSON** backups, print formatted reports/checksheets, or reset to the default 5-machine demo dataset[span_20](start_span)[span_20](end_span).

---

## Tech Stack

* **HTML5** — Semantic layout, modals, forms, and print stylesheets[span_21](start_span)[span_21](end_span)
* **CSS3** — Custom properties, responsive grids, sticky headers/tabs, and dark industrial styling[span_22](start_span)[span_22](end_span)
* **Vanilla JavaScript (ES6+)** — State management, interval calculations, reliability math, CSV/JSON serialization, and HiDPI HTML5 Canvas charts[span_23](start_span)[span_23](end_span)

---

## Deployment on GitHub Pages

1. Push `index.html` (and any repository assets) to your GitHub repository.
2. In GitHub, go to **Settings > Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**, choose your branch (typically `main`) and `/ (root)`, then save.
4. Access the published app at `https://jeffry-lacanglacang.github.io/SHOPFLOOR-PMS-RELIABILITY-LOGGER/`.

---

## Author & Copyright

Created by **Jeffry Lacanglacang** (© 2026)[span_24](start_span)[span_24](end_span).
