const GRID_SIZE = 20;

const WIRE_STYLES = {
    'L1':  { name: 'L1 (Brown)',   color: '#92400e', activeColor: '#f59e0b', dash: [] },
    'L2':  { name: 'L2 (Black)',   color: '#475569', activeColor: '#ef4444', dash: [] },
    'L3':  { name: 'L3 (Grey)',    color: '#64748b', activeColor: '#a855f7', dash: [] },
    'N':   { name: 'N (Blue)',     color: '#2563eb', activeColor: '#38bdf8', dash: [] },
    'PE':  { name: 'PE (Grn/Yel)', color: '#16a34a', activeColor: '#4ade80', dash: [6, 4] },
    'C1':  { name: 'C1 (Control)', color: '#dc2626', activeColor: '#ff3b30', dash: [] },
    'DC+': { name: 'DC+ (+DC)',    color: '#be123c', activeColor: '#fb7185', dash: [] },
    'DC-': { name: 'DC- (-DC)',    color: '#0369a1', activeColor: '#38bdf8', dash: [] }
};

const COMPONENT_CATEGORIES = [
    { id: 'sources',     name: 'Sources' },
    { id: 'protections', name: 'Protections' },
    { id: 'switches',    name: 'Switches & Buttons' },
    { id: 'contactors',  name: 'Contactors' },
    { id: 'coils',       name: 'Coils & Timers' },
    { id: 'contacts',    name: 'Auxiliary & Timer Contacts' },
    { id: 'motors',      name: 'Motors, Diodes & Signaling' }
];

const CATALOG = {
    'supply_3p_n_pe': {
        cat: 'sources', name: '3-Phase + N + PE Supply', defaultTag: 'X1', width: 100, height: 40,
        isSource: true,
        terminals: [
            { id: 'L1', label: 'L1', x: -40, y: 20, potential: 'L1' },
            { id: 'L2', label: 'L2', x: -20, y: 20, potential: 'L2' },
            { id: 'L3', label: 'L3', x: 0,   y: 20, potential: 'L3' },
            { id: 'N',  label: 'N',  x: 20,  y: 20, potential: 'N'  },
            { id: 'PE', label: 'PE', x: 40,  y: 20, potential: 'PE' }
        ]
    },
    'supply_1p_n': {
        cat: 'sources', name: '1-Phase Supply (L1 / N)', defaultTag: 'X2', width: 60, height: 40,
        isSource: true,
        terminals: [
            { id: 'L1', label: 'L1', x: -20, y: 20, potential: 'L1' },
            { id: 'N',  label: 'N',  x: 20,  y: 20, potential: 'N'  }
        ]
    },
    'transformer_ac': {
        cat: 'sources', name: 'AC Step-Down Transformer', defaultTag: 'T1', width: 80, height: 80,
        isTransformer: true,
        defaultPrimaryV: 230,
        defaultSecondaryV: 24,
        terminals: [
            { id: 'H1', label: 'H1', x: -20, y: -40 },
            { id: 'H2', label: 'H2', x: 20,  y: -40 },
            { id: 'X1', label: 'X1', x: -20, y: 40 },
            { id: 'X2', label: 'X2', x: 20,  y: 40 }
        ]
    },
    'supply_dc': {
        cat: 'sources', name: 'DC Supply (+DC / -DC)', defaultTag: 'G1', width: 60, height: 40,
        isSource: true,
        terminals: [
            { id: '+', label: '+DC', x: -20, y: 20, potential: 'DC+' },
            { id: '-', label: '-DC', x: 20,  y: 20, potential: 'DC-' }
        ]
    },
    'terminal_pe': {
        cat: 'sources', name: 'Protective Earth (PE)', defaultTag: 'PE', width: 40, height: 40,
        isSource: true,
        terminals: [
            { id: 'PE', label: 'PE', x: 0, y: -20, potential: 'PE' }
        ]
    },
    'mcb_1p': {
        cat: 'protections', name: '1-Pole Circuit Breaker', defaultTag: 'F1', width: 40, height: 80,
        isSwitch: true, switchType: 'toggle', defaultClosed: true, poles: 1,
        terminals: [
            { id: '1', label: '1', x: 0, y: -40 },
            { id: '2', label: '2', x: 0, y: 40 }
        ]
    },
    'mcb_2p': {
        cat: 'protections', name: '2-Pole Circuit Breaker', defaultTag: 'Q2', width: 60, height: 80,
        isSwitch: true, switchType: 'toggle', defaultClosed: true, poles: 2,
        terminals: [
            { id: '1', label: '1', x: -20, y: -40 }, { id: '2', label: '2', x: -20, y: 40 },
            { id: '3', label: '3', x: 20,  y: -40 }, { id: '4', label: '4', x: 20,  y: 40 }
        ]
    },
    'mcb_3p': {
        cat: 'protections', name: '3-Pole Circuit Breaker', defaultTag: 'Q1', width: 80, height: 80,
        isSwitch: true, switchType: 'toggle', defaultClosed: true, poles: 3,
        terminals: [
            { id: '1', label: '1', x: -20, y: -40 }, { id: '2', label: '2', x: -20, y: 40 },
            { id: '3', label: '3', x: 0,   y: -40 }, { id: '4', label: '4', x: 0,   y: 40 },
            { id: '5', label: '5', x: 20,  y: -40 }, { id: '6', label: '6', x: 20,  y: 40 }
        ]
    },
    'fuse_1p': {
        cat: 'protections', name: 'Fuse Link (1-Pole)', defaultTag: 'F2', width: 40, height: 80,
        isSwitch: true, switchType: 'toggle', defaultClosed: true, isFuse: true,
        terminals: [
            { id: '1', label: '1', x: 0, y: -40 },
            { id: '2', label: '2', x: 0, y: 40 }
        ]
    },
    'overload_relay': {
        cat: 'protections', name: 'Thermal Overload (95-96 / 97-98)', defaultTag: 'F3', width: 80, height: 80,
        isOverload: true, defaultClosed: false,
        terminals: [
            { id: '95', label: '95', x: -20, y: -40 }, { id: '96', label: '96', x: -20, y: 40 },
            { id: '97', label: '97', x: 20,  y: -40 }, { id: '98', label: '98', x: 20,  y: 40 }
        ]
    },
    'pb_no': {
        cat: 'switches', name: 'Push Button NO (Start)', defaultTag: 'S2', width: 40, height: 80,
        isSwitch: true, switchType: 'momentary_no', defaultClosed: false,
        terminals: [
            { id: '3', label: '3', x: 0, y: -40 },
            { id: '4', label: '4', x: 0, y: 40 }
        ]
    },
    'pb_nc': {
        cat: 'switches', name: 'Push Button NC (Stop)', defaultTag: 'S1', width: 40, height: 80,
        isSwitch: true, switchType: 'momentary_nc', defaultClosed: true,
        terminals: [
            { id: '1', label: '1', x: 0, y: -40 },
            { id: '2', label: '2', x: 0, y: 40 }
        ]
    },
    'pb_nonc': {
        cat: 'switches', name: 'Dual Push Button NO+NC', defaultTag: 'S3', width: 80, height: 80,
        isSwitch: true, switchType: 'momentary_nonc', defaultClosed: false,
        terminals: [
            { id: '1', label: '1', x: -20, y: -40 }, { id: '2', label: '2', x: -20, y: 40 },
            { id: '3', label: '3', x: 20,  y: -40 }, { id: '4', label: '4', x: 20,  y: 40 }
        ]
    },
    'pb_2step_nonc': {
        cat: 'switches', name: 'Two-Step Push Button (2NO + NC)', defaultTag: 'S4', width: 100, height: 80,
        isSwitch: true, switchType: 'twostep_nonc', defaultClosed: false,
        terminals: [
            { id: '1', label: '1', x: -20, y: -40 }, { id: '2', label: '2', x: -20, y: 40 },
            { id: '3', label: '3', x: 0,   y: -40 }, { id: '4', label: '4', x: 0,   y: 40 },
            { id: '5', label: '5', x: 20,  y: -40 }, { id: '6', label: '6', x: 20,  y: 40 }
        ]
    },
    'estop_nc': {
        cat: 'switches', name: 'Emergency Stop (Mushroom NC)', defaultTag: 'S0', width: 60, height: 80,
        isSwitch: true, switchType: 'estop', defaultClosed: true,
        terminals: [
            { id: '1', label: '1', x: 0, y: -40 },
            { id: '2', label: '2', x: 0, y: 40 }
        ]
    },
    'switch_toggle': {
        cat: 'switches', name: 'Maintained Selector Switch', defaultTag: 'SA1', width: 40, height: 80,
        isSwitch: true, switchType: 'toggle', defaultClosed: false,
        terminals: [
            { id: '1', label: '1', x: 0, y: -40 },
            { id: '2', label: '2', x: 0, y: 40 }
        ]
    },
    'limit_switch': {
        cat: 'switches', name: 'Limit / Roller Switch (NO)', defaultTag: 'SQ1', width: 40, height: 80,
        isSwitch: true, switchType: 'momentary_no', defaultClosed: false, isLimit: true,
        terminals: [
            { id: '13', label: '13', x: 0, y: -40 },
            { id: '14', label: '14', x: 0, y: 40 }
        ]
    },
    'contactor_3p': {
        cat: 'contactors', name: '3-Pole Main Contactor (1-6)', defaultTag: 'KM1', width: 80, height: 80,
        isContact: true, contactType: 'power3p',
        terminals: [
            { id: '1', label: '1', x: -20, y: -40 }, { id: '2', label: '2', x: -20, y: 40 },
            { id: '3', label: '3', x: 0,   y: -40 }, { id: '4', label: '4', x: 0,   y: 40 },
            { id: '5', label: '5', x: 20,  y: -40 }, { id: '6', label: '6', x: 20,  y: 40 }
        ]
    },
    'contactor_3p_no': {
        cat: 'contactors', name: '3P Contactor + 1NO (13-14)', defaultTag: 'KM1', width: 100, height: 80,
        isContact: true, contactType: 'power3p_no',
        terminals: [
            { id: '1',  label: '1',  x: -40, y: -40 }, { id: '2',  label: '2',  x: -40, y: 40 },
            { id: '3',  label: '3',  x: -20, y: -40 }, { id: '4',  label: '4',  x: -20, y: 40 },
            { id: '5',  label: '5',  x: 0,   y: -40 }, { id: '6',  label: '6',  x: 0,   y: 40 },
            { id: '13', label: '13', x: 20,  y: -40 }, { id: '14', label: '14', x: 20,  y: 40 }
        ]
    },
    'contactor_3p_nc': {
        cat: 'contactors', name: '3P Contactor + 1NC (21-22)', defaultTag: 'KM1', width: 100, height: 80,
        isContact: true, contactType: 'power3p_nc',
        terminals: [
            { id: '1',  label: '1',  x: -40, y: -40 }, { id: '2',  label: '2',  x: -40, y: 40 },
            { id: '3',  label: '3',  x: -20, y: -40 }, { id: '4',  label: '4',  x: -20, y: 40 },
            { id: '5',  label: '5',  x: 0,   y: -40 }, { id: '6',  label: '6',  x: 0,   y: 40 },
            { id: '21', label: '21', x: 20,  y: -40 }, { id: '22', label: '22', x: 20,  y: 40 }
        ]
    },
    'contactor_3p_no_nc': {
        cat: 'contactors', name: '3-Pole Contactor + NO & NC', defaultTag: 'KM1', width: 120, height: 80,
        isContact: true, contactType: 'power3p_no_nc',
        terminals: [
            { id: '1',  label: '1',  x: -40, y: -40 }, { id: '2',  label: '2',  x: -40, y: 40 },
            { id: '3',  label: '3',  x: -20, y: -40 }, { id: '4',  label: '4',  x: -20, y: 40 },
            { id: '5',  label: '5',  x: 0,   y: -40 }, { id: '6',  label: '6',  x: 0,   y: 40 },
            { id: '13', label: '13', x: 20,  y: -40 }, { id: '14', label: '14', x: 20,  y: 40 },
            { id: '21', label: '21', x: 40,  y: -40 }, { id: '22', label: '22', x: 40,  y: 40 }
        ]
    },
    'contactor_4p': {
        cat: 'contactors', name: '4-Pole Power Contactor (1-8)', defaultTag: 'KM1', width: 100, height: 80,
        isContact: true, contactType: 'power4p',
        terminals: [
            { id: '1', label: '1', x: -40, y: -40 }, { id: '2', label: '2', x: -40, y: 40 },
            { id: '3', label: '3', x: -20, y: -40 }, { id: '4', label: '4', x: -20, y: 40 },
            { id: '5', label: '5', x: 0,   y: -40 }, { id: '6', label: '6', x: 0,   y: 40 },
            { id: '7', label: '7', x: 20,  y: -40 }, { id: '8', label: '8', x: 20,  y: 40 }
        ]
    },
    'contactor_4p_2no2nc': {
        cat: 'contactors', name: '4-Pole Contactor (2NO + 2NC)', defaultTag: 'KM1', width: 100, height: 80,
        isContact: true, contactType: 'power4p_2no2nc',
        terminals: [
            { id: '1', label: '1', x: -40, y: -40 }, { id: '2', label: '2', x: -40, y: 40 },
            { id: '3', label: '3', x: -20, y: -40 }, { id: '4', label: '4', x: -20, y: 40 },
            { id: '5', label: '5', x: 0,   y: -40 }, { id: '6', label: '6', x: 0,   y: 40 },
            { id: '7', label: '7', x: 20,  y: -40 }, { id: '8', label: '8', x: 20,  y: 40 }
        ]
    },
    'coil': {
        cat: 'contactors', name: 'Contactor Coil (A1-A2)', defaultTag: 'KM1', width: 60, height: 80,
        isCoil: true, coilType: 'standard',
        terminals: [
            { id: 'A1', label: 'A1', x: 0, y: -40 },
            { id: 'A2', label: 'A2', x: 0, y: 40 }
        ]
    },
    'aux_no': {
        cat: 'contactors', name: 'Contactor Aux NO (13-14)', defaultTag: 'KM1', width: 40, height: 80,
        isContact: true, contactType: 'no',
        terminals: [
            { id: '13', label: '13', x: 0, y: -40 },
            { id: '14', label: '14', x: 0, y: 40 }
        ]
    },
    'aux_nc': {
        cat: 'contactors', name: 'Contactor Aux NC (21-22)', defaultTag: 'KM1', width: 40, height: 80,
        isContact: true, contactType: 'nc',
        terminals: [
            { id: '21', label: '21', x: 0, y: -40 },
            { id: '22', label: '22', x: 0, y: 40 }
        ]
    },
    'aux_co': {
        cat: 'contactors', name: 'Contactor Aux CO (11-12/14)', defaultTag: 'KM1', width: 60, height: 80,
        isContact: true, contactType: 'co',
        terminals: [
            { id: '11', label: '11', x: 0,   y: -40 },
            { id: '12', label: '12', x: -20, y: 40 },
            { id: '14', label: '14', x: 20,  y: 40 }
        ]
    },
    'coil_ton': {
        cat: 'coils', name: 'On-Delay Timer Coil (TON)', defaultTag: 'KT1', width: 60, height: 80,
        isCoil: true, coilType: 'ton', defaultDelay: 3.0,
        terminals: [
            { id: 'A1', label: 'A1', x: 0, y: -40 },
            { id: 'A2', label: 'A2', x: 0, y: 40 }
        ]
    },
    'coil_tof': {
        cat: 'coils', name: 'Off-Delay Timer Coil (TOF)', defaultTag: 'KT2', width: 60, height: 80,
        isCoil: true, coilType: 'tof', defaultDelay: 3.0,
        terminals: [
            { id: 'A1', label: 'A1', x: 0, y: -40 },
            { id: 'A2', label: 'A2', x: 0, y: 40 }
        ]
    },
    'coil_flasher': {
        cat: 'coils', name: 'Flasher / Pulse Relay Coil', defaultTag: 'KF1', width: 60, height: 80,
        isCoil: true, coilType: 'flasher', defaultDelay: 0.6,
        terminals: [
            { id: 'A1', label: 'A1', x: 0, y: -40 },
            { id: 'A2', label: 'A2', x: 0, y: 40 }
        ]
    },
    'coil_latch': {
        cat: 'coils', name: 'Impulse Latching Relay', defaultTag: 'KL1', width: 60, height: 80,
        isCoil: true, coilType: 'latch',
        terminals: [
            { id: 'A1', label: 'A1', x: 0, y: -40 },
            { id: 'A2', label: 'A2', x: 0, y: 40 }
        ]
    },
    'contact_no': {
        cat: 'contacts', name: 'Relay Contact NO (13-14)', defaultTag: 'KA1', width: 40, height: 80,
        isContact: true, contactType: 'no',
        terminals: [
            { id: '13', label: '13', x: 0, y: -40 },
            { id: '14', label: '14', x: 0, y: 40 }
        ]
    },
    'contact_nc': {
        cat: 'contacts', name: 'Relay Contact NC (21-22)', defaultTag: 'KA1', width: 40, height: 80,
        isContact: true, contactType: 'nc',
        terminals: [
            { id: '21', label: '21', x: 0, y: -40 },
            { id: '22', label: '22', x: 0, y: 40 }
        ]
    },
    'contact_co': {
        cat: 'contacts', name: 'Changeover Contact SPDT (11-12/14)', defaultTag: 'KA1', width: 60, height: 80,
        isContact: true, contactType: 'co',
        terminals: [
            { id: '11', label: '11', x: 0,   y: -40 },
            { id: '12', label: '12', x: -20, y: 40 },
            { id: '14', label: '14', x: 20,  y: 40 }
        ]
    },
    'contact_ton_no': {
        cat: 'contacts', name: 'Timer Contact NO (Delay-On)', defaultTag: 'KT1', width: 40, height: 80,
        isContact: true, contactType: 'no', timerSymbol: 'ton',
        terminals: [
            { id: '67', label: '67', x: 0, y: -40 },
            { id: '68', label: '68', x: 0, y: 40 }
        ]
    },
    'contact_ton_nc': {
        cat: 'contacts', name: 'Timer Contact NC (Delay-On)', defaultTag: 'KT1', width: 40, height: 80,
        isContact: true, contactType: 'nc', timerSymbol: 'ton',
        terminals: [
            { id: '55', label: '55', x: 0, y: -40 },
            { id: '56', label: '56', x: 0, y: 40 }
        ]
    },
    'motor_3p': {
        cat: 'motors', name: '3-Phase Induction Motor', defaultTag: 'M1', width: 80, height: 80,
        isMotor: true, motorType: '3p',
        terminals: [
            { id: 'U1', label: 'U1', x: -20, y: -40 },
            { id: 'V1', label: 'V1', x: 0,   y: -40 },
            { id: 'W1', label: 'W1', x: 20,  y: -40 },
            { id: 'PE', label: 'PE', x: 40,  y: 0 }
        ]
    },
    'motor_3p_2spd': {
        cat: 'motors', name: '2-Speed 3-Phase Induction Motor', defaultTag: 'M1', width: 100, height: 100,
        isMotor: true, motorType: '3p_2spd',
        terminals: [
            { id: '1U', label: '1U', x: -20, y: -40 },
            { id: '1V', label: '1V', x: 0,   y: -40 },
            { id: '1W', label: '1W', x: 20,  y: -40 },
            { id: '2U', label: '2U', x: -20, y: 40 },
            { id: '2V', label: '2V', x: 0,   y: 40 },
            { id: '2W', label: '2W', x: 20,  y: 40 },
            { id: 'PE', label: 'PE', x: 40,  y: 0 }
        ]
    },
    'motor_3p_sd': {
        cat: 'motors', name: '3-Phase Star-Delta Motor (6-Pin)', defaultTag: 'M1', width: 100, height: 100,
        isMotor: true, motorType: '3p_sd',
        terminals: [
            { id: 'U1', label: 'U1', x: -20, y: -40 },
            { id: 'V1', label: 'V1', x: 0,   y: -40 },
            { id: 'W1', label: 'W1', x: 20,  y: -40 },
            { id: 'W2', label: 'W2', x: -20, y: 40 },
            { id: 'U2', label: 'U2', x: 0,   y: 40 },
            { id: 'V2', label: 'V2', x: 20,  y: 40 }
        ]
    },
    'motor_1p': {
        cat: 'motors', name: '1-Phase AC Motor', defaultTag: 'M2', width: 60, height: 80,
        isMotor: true, motorType: '1p',
        terminals: [
            { id: 'U1', label: 'U1', x: -20, y: -40 },
            { id: 'U2', label: 'U2', x: 20,  y: -40 }
        ]
    },
    'motor_dc': {
        cat: 'motors', name: 'DC Permanent Magnet Motor', defaultTag: 'M3', width: 60, height: 80,
        isMotor: true, motorType: 'dc',
        terminals: [
            { id: 'A1', label: '+', x: -20, y: -40 },
            { id: 'A2', label: '-', x: 20,  y: -40 }
        ]
    },
    'pilot_lamp': {
        cat: 'motors', name: 'Pilot Indicator Lamp (X1-X2)', defaultTag: 'H1', width: 60, height: 80,
        isLamp: true, defaultColor: '#22c55e',
        terminals: [
            { id: 'X1', label: 'X1', x: 0, y: -40 },
            { id: 'X2', label: 'X2', x: 0, y: 40 }
        ]
    },
    'buzzer': {
        cat: 'motors', name: 'Acoustic Buzzer / Horn', defaultTag: 'H2', width: 60, height: 80,
        isBuzzer: true,
        terminals: [
            { id: 'X1', label: 'X1', x: 0, y: -40 },
            { id: 'X2', label: 'X2', x: 0, y: 40 }
        ]
    },
    'text_label': {
        cat: 'motors', name: 'Text Annotation / Title', defaultTag: 'NOTE', width: 120, height: 40,
        isLabel: true,
        terminals: []
    }
};

const state = {
    components: [],
    wires: [],
    selectedIds: new Set(),
    tool: 'select',
    activeWirePotential: 'C1',
    snapToGrid: true,
    isSimulating: false,
    shortCircuitError: null,
    soundEnabled: true,
    darkMode: true,
    view: {
        x: 80,
        y: 60,
        zoom: 1.0
    },
    history: [],
    historyIndex: -1,
    drawingWire: null,
    draggingComp: null,
    draggingWire: null,
    panning: null,
    spacePressed: false,
    activePointers: new Map(),
    pinchState: null,
    mouseWorld: { x: 0, y: 0 },
    hoveredTerminal: null,
    hoveredWirePoint: null,
    inspectorDraft: null,
    inspectorDirty: false,
    simRuntime: {
        coilTimers: {},
        coilEnergized: {},
        coilActive: {},
        latchState: {},
        energizedNodes: new Set(),
        nodePotentials: {},
        motorStates: {},
        lampStates: {},
        buzzerActive: false,
        motorAngle: 0,
        lastTick: 0,
        _findRoot: null
    }
};

let uidCounter = 1;
let activeMomentaryComp = null;
let toastTimer = null;
let buzzerSynth = null;
let clickSynth = null;
let buzzerLoopActive = false;

function genId(prefix = 'id') {
    return `${prefix}_${Date.now().toString(36)}_${uidCounter++}`;
}

function isTouchDevice() {
    return (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) || ('ontouchstart' in window);
}

function getHitTolerance(desktopPx, mobilePx) {
    const base = isTouchDevice() ? mobilePx : desktopPx;
    return Math.max(base, base / Math.max(0.5, state.view.zoom));
}

function deepCloneScene() {
    return {
        components: JSON.parse(JSON.stringify(state.components)),
        wires: JSON.parse(JSON.stringify(state.wires))
    };
}

function pushHistory() {
    const snapshot = deepCloneScene();
    state.history = state.history.slice(0, state.historyIndex + 1);
    state.history.push(snapshot);
    if (state.history.length > 40) state.history.shift();
    state.historyIndex = state.history.length - 1;
    updateHistoryButtons();
    updateStatusCounts();
}

function applySceneSnapshot(snap) {
    const cloned = JSON.parse(JSON.stringify(snap));
    state.components = cloned.components;
    state.wires = cloned.wires;
    state.selectedIds.clear();
    updateHistoryButtons();
    updateStatusCounts();
    updateFloatingActions();
    refreshInspectorIfOpen();
    render();
}

function undo() {
    if (state.isSimulating || state.historyIndex <= 0) return;
    state.historyIndex--;
    applySceneSnapshot(state.history[state.historyIndex]);
}

function redo() {
    if (state.isSimulating || state.historyIndex >= state.history.length - 1) return;
    state.historyIndex++;
    applySceneSnapshot(state.history[state.historyIndex]);
}

function updateHistoryButtons() {
    const disabledUndo = state.isSimulating || state.historyIndex <= 0;
    const disabledRedo = state.isSimulating || state.historyIndex >= state.history.length - 1;
    ['btn-undo', 'btn-mob-undo'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.disabled = disabledUndo;
    });
    ['btn-redo', 'btn-mob-redo'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.disabled = disabledRedo;
    });
}

function showToast(msg, isError = false) {
    const banner = document.getElementById('toast-banner');
    const txt = document.getElementById('toast-banner-text');
    const iconOk = document.getElementById('toast-icon-ok');
    const iconErr = document.getElementById('toast-icon-err');
    if (!banner || !txt) return;

    txt.textContent = msg;
    if (isError) {
        banner.classList.remove('bg-slate-900/95', 'dark:bg-blue-600');
        banner.classList.add('bg-red-600', 'dark:bg-red-600');
        if (iconOk) iconOk.classList.add('hidden');
        if (iconErr) iconErr.classList.remove('hidden');
    } else {
        banner.classList.remove('bg-red-600', 'dark:bg-red-600');
        banner.classList.add('bg-slate-900/95', 'dark:bg-blue-600');
        if (iconOk) iconOk.classList.remove('hidden');
        if (iconErr) iconErr.classList.add('hidden');
    }

    banner.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        banner.classList.add('hidden');
    }, isError ? 3200 : 2200);
}

// =========================================================================
// SIDEBAR OPEN / CLOSE HELPERS
// =========================================================================
function isResourcesSidebarOpen() {
    const sidebar = document.getElementById('left-sidebar');
    return sidebar && !sidebar.classList.contains('hidden');
}

function openResourcesSidebar() {
    const sidebar = document.getElementById('left-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (!sidebar) return;
    sidebar.classList.remove('hidden');
    sidebar.classList.add('flex');
    if (backdrop) backdrop.classList.remove('hidden');
    resizeCanvas();
}

function closeResourcesSidebar() {
    const sidebar = document.getElementById('left-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (!sidebar || sidebar.classList.contains('hidden')) return;
    sidebar.classList.add('hidden');
    sidebar.classList.remove('flex');
    if (backdrop) backdrop.classList.add('hidden');
    resizeCanvas();
}

function toggleResourcesSidebar() {
    if (isResourcesSidebarOpen()) closeResourcesSidebar();
    else openResourcesSidebar();
}

// =========================================================================
// JSON EXPORT & IMPORT
// =========================================================================
function getDefaultSchematicFilename() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    return `motor-control-schematic-${yyyy}-${mm}-${dd}.json`;
}

async function exportSchematicToFile() {
    const payload = {
        app: 'Motor Control Simulator',
        version: '1.0',
        exportedAt: new Date().toISOString(),
        ...deepCloneScene()
    };
    const jsonString = JSON.stringify(payload, null, 2);
    const filename = getDefaultSchematicFilename();

    if (typeof window.showSaveFilePicker === 'function') {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: filename,
                types: [{
                    description: 'Motor Control Schematic JSON',
                    accept: { 'application/json': ['.json'] }
                }]
            });
            const writable = await handle.createWritable();
            await writable.write(jsonString);
            await writable.close();
            showToast(`Exported: ${handle.name || filename}`);
            return;
        } catch (err) {
            if (err && err.name === 'AbortError') return;
        }
    }

    try {
        const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 150);
        showToast('Schematic exported (.json)');
    } catch (err) {
        showToast('Failed to export JSON file', true);
    }
}

function loadSchematicObject(parsed, sourceName = '') {
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.components) || !Array.isArray(parsed.wires)) {
        throw new Error('Invalid schematic JSON format');
    }

    const validComponents = parsed.components
        .filter(c => c && typeof c === 'object' && typeof c.type === 'string' && CATALOG[c.type])
        .map(c => {
            const def = CATALOG[c.type];
            return {
                id: typeof c.id === 'string' && c.id ? c.id : genId('comp'),
                type: c.type,
                tag: typeof c.tag === 'string' ? c.tag : def.defaultTag,
                x: Number.isFinite(Number(c.x)) ? Number(c.x) : 0,
                y: Number.isFinite(Number(c.y)) ? Number(c.y) : 0,
                rotation: Number.isFinite(Number(c.rotation)) ? (((Number(c.rotation) % 360) + 360) % 360) : 0,
                closed: typeof c.closed === 'boolean' ? c.closed : !!def.defaultClosed,
                step: Number.isFinite(Number(c.step)) ? Number(c.step) : 0,
                delay: Number.isFinite(Number(c.delay)) ? Number(c.delay) : (def.defaultDelay || 3.0),
                primaryV: Number.isFinite(Number(c.primaryV)) ? Number(c.primaryV) : (def.defaultPrimaryV || 230),
                secondaryV: Number.isFinite(Number(c.secondaryV)) ? Number(c.secondaryV) : (def.defaultSecondaryV || 24),
                color: typeof c.color === 'string' ? c.color : (def.defaultColor || '#22c55e'),
                comment: typeof c.comment === 'string' ? c.comment : '',
                terminalLabels: (c.terminalLabels && typeof c.terminalLabels === 'object') ? c.terminalLabels : {}
            };
        });

    const validWires = parsed.wires
        .filter(w => w && typeof w === 'object' && Array.isArray(w.points) && w.points.length >= 2)
        .map(w => ({
            id: typeof w.id === 'string' && w.id ? w.id : genId('wire'),
            potential: (typeof w.potential === 'string' && WIRE_STYLES[w.potential]) ? w.potential : 'C1',
            points: w.points
                .filter(p => p && Number.isFinite(Number(p.x)) && Number.isFinite(Number(p.y)))
                .map(p => ({ x: Math.round(Number(p.x)), y: Math.round(Number(p.y)) })),
            tag: typeof w.tag === 'string' ? w.tag : '',
            comment: typeof w.comment === 'string' ? w.comment : ''
        }))
        .filter(w => w.points.length >= 2);

    if (state.isSimulating) stopSimulation();
    state.components = validComponents;
    state.wires = validWires;
    state.selectedIds.clear();
    pushHistory();
    updateFloatingActions();
    refreshInspectorIfOpen();
    fitSchematicToScreen();

    showToast(sourceName ? `Imported "${sourceName}"` : 'Schematic imported (.json)');
}

function readAndLoadJsonFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const rawText = String(event.target?.result || '');
            const parsed = JSON.parse(rawText);
            loadSchematicObject(parsed, file.name);
        } catch (err) {
            showToast('Invalid JSON schematic file', true);
        }
    };
    reader.onerror = () => {
        showToast('Unable to read selected file', true);
    };
    reader.readAsText(file);
}

async function triggerImportFromFileExplorer() {
    if (typeof window.showOpenFilePicker === 'function') {
        try {
            const [fileHandle] = await window.showOpenFilePicker({
                multiple: false,
                types: [{
                    description: 'Motor Control Schematic JSON',
                    accept: { 'application/json': ['.json'] }
                }]
            });
            if (fileHandle) {
                const file = await fileHandle.getFile();
                readAndLoadJsonFile(file);
            }
            return;
        } catch (err) {
            if (err && err.name === 'AbortError') return;
        }
    }

    const fileInput = document.getElementById('json-file-input');
    if (fileInput) {
        fileInput.value = '';
        fileInput.click();
    }
}

// =========================================================================
// AUDIO SYNTHESIS
// =========================================================================
async function ensureAudioReady() {
    if (!state.soundEnabled || typeof Tone === 'undefined') return;
    try {
        if (Tone.context.state !== 'running') {
            await Tone.start();
        }
        if (!buzzerSynth) {
            buzzerSynth = new Tone.Synth({
                oscillator: { type: 'sawtooth' },
                envelope: { attack: 0.02, decay: 0.1, sustain: 0.8, release: 0.08 }
            }).toDestination();
            buzzerSynth.volume.value = -16;
        }
        if (!clickSynth) {
            clickSynth = new Tone.MembraneSynth({
                pitchDecay: 0.01,
                octaves: 2,
                envelope: { attack: 0.001, decay: 0.04, sustain: 0 }
            }).toDestination();
            clickSynth.volume.value = -14;
        }
    } catch (e) {}
}

function playClickSound() {
    if (!state.soundEnabled || !clickSynth) return;
    try {
        clickSynth.triggerAttackRelease('C2', '32n');
    } catch (e) {}
}

function setBuzzerSound(active) {
    if (!state.soundEnabled || !buzzerSynth) {
        if (buzzerLoopActive && buzzerSynth) {
            try { buzzerSynth.triggerRelease(); } catch (e) {}
            buzzerLoopActive = false;
        }
        return;
    }
    try {
        if (active && !buzzerLoopActive) {
            buzzerSynth.triggerAttack('A4');
            buzzerLoopActive = true;
        } else if (!active && buzzerLoopActive) {
            buzzerSynth.triggerRelease();
            buzzerLoopActive = false;
        }
    } catch (e) {}
}

// =========================================================================
// GEOMETRY & WIRE ROUTING HELPERS
// =========================================================================
function snapVal(v) {
    return state.snapToGrid ? Math.round(v / GRID_SIZE) * GRID_SIZE : Math.round(v);
}

function screenToWorld(clientX, clientY) {
    const canvas = document.getElementById('cad-canvas');
    const rect = canvas.getBoundingClientRect();
    const sx = clientX - rect.left;
    const sy = clientY - rect.top;
    return {
        x: (sx - state.view.x) / state.view.zoom,
        y: (sy - state.view.y) / state.view.zoom
    };
}

function rotatePoint(dx, dy, rotationDeg) {
    const rad = ((rotationDeg || 0) * Math.PI) / 180;
    const cos = Math.round(Math.cos(rad));
    const sin = Math.round(Math.sin(rad));
    return {
        x: dx * cos - dy * sin,
        y: dx * sin + dy * cos
    };
}

function getComponentTerminalsWorld(comp) {
    const def = CATALOG[comp.type];
    if (!def || !def.terminals) return [];
    return def.terminals.map(t => {
        const rp = rotatePoint(t.x, t.y, comp.rotation || 0);
        return {
            compId: comp.id,
            termId: t.id,
            label: (comp.terminalLabels && comp.terminalLabels[t.id]) || t.label,
            potential: t.potential || null,
            x: Math.round(comp.x + rp.x),
            y: Math.round(comp.y + rp.y)
        };
    });
}

function findTerminalAt(wx, wy, tolerance = getHitTolerance(13, 20)) {
    for (let i = state.components.length - 1; i >= 0; i--) {
        const comp = state.components[i];
        const terms = getComponentTerminalsWorld(comp);
        for (const t of terms) {
            if (Math.hypot(t.x - wx, t.y - wy) <= tolerance) {
                return t;
            }
        }
    }
    return null;
}

function projectPointOntoSegment(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const l2 = dx * dx + dy * dy;
    if (l2 === 0) {
        return { x: Math.round(x1), y: Math.round(y1), dist: Math.hypot(px - x1, py - y1) };
    }
    let t = ((px - x1) * dx + (py - y1) * dy) / l2;
    t = Math.max(0, Math.min(1, t));
    const cx = x1 + t * dx;
    const cy = y1 + t * dy;
    return {
        x: (Math.abs(dy) === 0 && state.snapToGrid) ? snapVal(cx) : Math.round(cx),
        y: (Math.abs(dx) === 0 && state.snapToGrid) ? snapVal(cy) : Math.round(cy),
        dist: Math.hypot(px - cx, py - cy)
    };
}

function findWireTapPointAt(wx, wy, tolerance = getHitTolerance(11, 18), excludeWireId = null) {
    for (let i = state.wires.length - 1; i >= 0; i--) {
        const w = state.wires[i];
        if (excludeWireId && w.id === excludeWireId) continue;
        const pts = w.points || [];
        for (let j = 0; j < pts.length; j++) {
            if (Math.hypot(pts[j].x - wx, pts[j].y - wy) <= tolerance) {
                return {
                    wireId: w.id,
                    x: Math.round(pts[j].x),
                    y: Math.round(pts[j].y),
                    isEndpoint: j === 0 || j === pts.length - 1
                };
            }
        }
    }

    let best = null;
    for (let i = state.wires.length - 1; i >= 0; i--) {
        const w = state.wires[i];
        if (excludeWireId && w.id === excludeWireId) continue;
        const pts = w.points || [];
        for (let j = 0; j < pts.length - 1; j++) {
            const proj = projectPointOntoSegment(wx, wy, pts[j].x, pts[j].y, pts[j + 1].x, pts[j + 1].y);
            if (proj.dist <= tolerance && (!best || proj.dist < best.dist)) {
                best = { wireId: w.id, x: proj.x, y: proj.y, dist: proj.dist, isEndpoint: false };
            }
        }
    }
    return best;
}

function findComponentAt(wx, wy) {
    for (let i = state.components.length - 1; i >= 0; i--) {
        const comp = state.components[i];
        const def = CATALOG[comp.type];
        if (!def) continue;
        const rot = ((comp.rotation || 0) % 180 + 180) % 180;
        const pad = isTouchDevice() ? 14 : 8;
        const hw = (rot === 0 ? def.width : def.height) / 2 + pad;
        const hh = (rot === 0 ? def.height : def.width) / 2 + pad;
        if (Math.abs(wx - comp.x) <= hw && Math.abs(wy - comp.y) <= hh) {
            return comp;
        }
    }
    return null;
}

function distToSegment(px, py, x1, y1, x2, y2) {
    const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
}

function findWireHitDetails(wx, wy, tolerance = getHitTolerance(10, 17)) {
    for (let i = state.wires.length - 1; i >= 0; i--) {
        const w = state.wires[i];
        const pts = w.points || [];
        for (let j = 0; j < pts.length; j++) {
            if (Math.hypot(wx - pts[j].x, wy - pts[j].y) <= tolerance) {
                return { wire: w, hitType: 'vertex', vertexIndex: j, segIndex: -1 };
            }
        }
        for (let j = 0; j < pts.length - 1; j++) {
            if (distToSegment(wx, wy, pts[j].x, pts[j].y, pts[j + 1].x, pts[j + 1].y) <= tolerance) {
                return { wire: w, hitType: 'segment', vertexIndex: -1, segIndex: j };
            }
        }
    }
    return null;
}

function simplifyWirePoints(pts) {
    if (!pts || pts.length <= 2) return pts ? pts.map(p => ({ x: Math.round(p.x), y: Math.round(p.y) })) : [];
    const dedup = [{ x: Math.round(pts[0].x), y: Math.round(pts[0].y) }];
    for (let i = 1; i < pts.length; i++) {
        const rx = Math.round(pts[i].x);
        const ry = Math.round(pts[i].y);
        const prev = dedup[dedup.length - 1];
        if (rx !== prev.x || ry !== prev.y) {
            dedup.push({ x: rx, y: ry });
        }
    }
    if (dedup.length <= 2) return dedup;
    const result = [dedup[0]];
    for (let i = 1; i < dedup.length - 1; i++) {
        const a = result[result.length - 1];
        const b = dedup[i];
        const c = dedup[i + 1];
        const collinearH = a.y === b.y && b.y === c.y;
        const collinearV = a.x === b.x && b.x === c.x;
        if (!collinearH && !collinearV) {
            result.push(b);
        }
    }
    result.push(dedup[dedup.length - 1]);
    return result;
}

function moveWireEndpointOrthogonal(wire, ptIndex, nx, ny) {
    const pts = wire.points;
    if (!pts || pts.length < 2) return;
    const rx = Math.round(nx);
    const ry = Math.round(ny);

    if (pts.length === 2) {
        const otherIdx = ptIndex === 0 ? 1 : 0;
        const other = pts[otherIdx];
        if (other.x === rx || other.y === ry) {
            pts[ptIndex] = { x: rx, y: ry };
        } else {
            const elbow = { x: rx, y: other.y };
            wire.points = ptIndex === 0
                ? [{ x: rx, y: ry }, elbow, { x: other.x, y: other.y }]
                : [{ x: other.x, y: other.y }, elbow, { x: rx, y: ry }];
        }
        return;
    }

    const adjIdx = ptIndex === 0 ? 1 : pts.length - 2;
    const nextIdx = ptIndex === 0 ? 2 : pts.length - 3;
    const oldEnd = { x: pts[ptIndex].x, y: pts[ptIndex].y };
    const adj = pts[adjIdx];
    const next = pts[nextIdx];

    const seg1Horizontal = oldEnd.y === adj.y && oldEnd.x !== adj.x;
    const seg1Vertical = oldEnd.x === adj.x && oldEnd.y !== adj.y;

    pts[ptIndex] = { x: rx, y: ry };

    if (seg1Vertical) {
        adj.x = rx;
        if (next && next.x === rx && next.y !== adj.y) {
            const elbow = { x: rx, y: adj.y };
            if (ptIndex === 0) wire.points.splice(1, 0, elbow);
            else wire.points.splice(pts.length - 1, 0, elbow);
        }
    } else if (seg1Horizontal) {
        adj.y = ry;
        if (next && next.y === ry && next.x !== adj.x) {
            const elbow = { x: adj.x, y: ry };
            if (ptIndex === 0) wire.points.splice(1, 0, elbow);
            else wire.points.splice(pts.length - 1, 0, elbow);
        }
    } else if (adj.x !== rx && adj.y !== ry) {
        const elbow = { x: rx, y: adj.y };
        if (ptIndex === 0) wire.points.splice(1, 0, elbow);
        else wire.points.splice(pts.length - 1, 0, elbow);
    }
}

function captureTerminalWireAttachments(compIds) {
    const attachments = [];
    const termLookup = new Map();
    for (const comp of state.components) {
        if (!compIds.has(comp.id)) continue;
        for (const t of getComponentTerminalsWorld(comp)) {
            const k = `${t.x},${t.y}`;
            if (!termLookup.has(k)) termLookup.set(k, []);
            termLookup.get(k).push({ compId: comp.id, termId: t.termId });
        }
    }

    for (const wire of state.wires) {
        const pts = wire.points || [];
        if (pts.length < 2) continue;
        const startKey = `${Math.round(pts[0].x)},${Math.round(pts[0].y)}`;
        if (termLookup.has(startKey)) {
            const ref = termLookup.get(startKey)[0];
            attachments.push({ wireId: wire.id, ptIndex: 0, compId: ref.compId, termId: ref.termId });
        }
        const endIdx = pts.length - 1;
        const endKey = `${Math.round(pts[endIdx].x)},${Math.round(pts[endIdx].y)}`;
        if (termLookup.has(endKey)) {
            const ref = termLookup.get(endKey)[0];
            attachments.push({ wireId: wire.id, ptIndex: endIdx, compId: ref.compId, termId: ref.termId });
        }
    }
    return attachments;
}

function applyTerminalWireAttachments(attachments, simplify = false) {
    if (!attachments || attachments.length === 0) return;
    const newTermPos = new Map();
    for (const comp of state.components) {
        for (const t of getComponentTerminalsWorld(comp)) {
            newTermPos.set(`${comp.id}:${t.termId}`, { x: t.x, y: t.y });
        }
    }

    const byWire = new Map();
    for (const att of attachments) {
        if (!byWire.has(att.wireId)) byWire.set(att.wireId, []);
        byWire.get(att.wireId).push(att);
    }

    for (const [wireId, wireAtts] of byWire.entries()) {
        const wire = state.wires.find(w => w.id === wireId);
        if (!wire || !wire.points || wire.points.length < 2) continue;

        const sorted = [...wireAtts].sort((a, b) => b.ptIndex - a.ptIndex);
        for (const att of sorted) {
            const target = newTermPos.get(`${att.compId}:${att.termId}`);
            if (!target) continue;
            const actualIdx = att.ptIndex === 0 ? 0 : wire.points.length - 1;
            moveWireEndpointOrthogonal(wire, actualIdx, target.x, target.y);
        }
        if (simplify) {
            wire.points = simplifyWirePoints(wire.points);
        }
    }
}

function computeJunctionDots() {
    const endpointCounts = new Map();
    const wireEndpoints = [];

    for (const w of state.wires) {
        const pts = w.points || [];
        if (pts.length === 0) continue;
        const p0 = { x: Math.round(pts[0].x), y: Math.round(pts[0].y) };
        const k0 = `${p0.x},${p0.y}`;
        endpointCounts.set(k0, (endpointCounts.get(k0) || 0) + 1);
        wireEndpoints.push({ wireId: w.id, x: p0.x, y: p0.y });

        if (pts.length > 1) {
            const pLast = { x: Math.round(pts[pts.length - 1].x), y: Math.round(pts[pts.length - 1].y) };
            const kLast = `${pLast.x},${pLast.y}`;
            endpointCounts.set(kLast, (endpointCounts.get(kLast) || 0) + 1);
            wireEndpoints.push({ wireId: w.id, x: pLast.x, y: pLast.y });
        }
    }

    const junctions = [];
    const seen = new Set();

    for (const [key, count] of endpointCounts.entries()) {
        if (count >= 3 && !seen.has(key)) {
            seen.add(key);
            const [x, y] = key.split(',').map(Number);
            junctions.push({ x, y });
        }
    }

    for (const ep of wireEndpoints) {
        const key = `${ep.x},${ep.y}`;
        if (seen.has(key)) continue;
        let tappedOtherWire = false;
        for (const w of state.wires) {
            if (w.id === ep.wireId) continue;
            const pts = w.points || [];
            for (let s = 0; s < pts.length - 1; s++) {
                if (distToSegment(ep.x, ep.y, pts[s].x, pts[s].y, pts[s + 1].x, pts[s + 1].y) <= 2.5) {
                    tappedOtherWire = true;
                    break;
                }
            }
            if (tappedOtherWire) break;
        }
        if (tappedOtherWire) {
            seen.add(key);
            junctions.push({ x: ep.x, y: ep.y });
        }
    }

    return junctions;
}

// =========================================================================
// ELECTRICAL SOLVER & SIMULATION
// =========================================================================
function addContactEdgesForComponent(comp, def, tMap, addCondEdge) {
    if (def.isSwitch) {
        const isClosed = !!comp.closed;
        if (def.switchType === 'twostep_nonc') {
            const step = comp.step || 0;
            if (step === 0) addCondEdge(tMap['1'], tMap['2']);
            if (step >= 1) addCondEdge(tMap['3'], tMap['4']);
            if (step >= 2) addCondEdge(tMap['5'], tMap['6']);
        } else if (def.switchType === 'momentary_nonc') {
            if (!isClosed) addCondEdge(tMap['1'], tMap['2']);
            else addCondEdge(tMap['3'], tMap['4']);
        } else if (isClosed) {
            if (def.poles === 2) {
                addCondEdge(tMap['1'], tMap['2']);
                addCondEdge(tMap['3'], tMap['4']);
            } else if (def.poles === 3) {
                addCondEdge(tMap['1'], tMap['2']);
                addCondEdge(tMap['3'], tMap['4']);
                addCondEdge(tMap['5'], tMap['6']);
            } else {
                addCondEdge(tMap['1'] || tMap['3'] || tMap['13'], tMap['2'] || tMap['4'] || tMap['14']);
            }
        }
        return;
    }

    if (def.isOverload) {
        if (!comp.closed) addCondEdge(tMap['95'], tMap['96']);
        else addCondEdge(tMap['97'], tMap['98']);
        return;
    }

    if (def.isContact) {
        const tag = (comp.tag || '').trim().toUpperCase();
        const actuated = tag ? !!state.simRuntime.coilActive[tag] : false;

        switch (def.contactType) {
            case 'no':
                if (actuated) addCondEdge(tMap['13'] || tMap['67'], tMap['14'] || tMap['68']);
                break;
            case 'nc':
                if (!actuated) addCondEdge(tMap['21'] || tMap['55'], tMap['22'] || tMap['56']);
                break;
            case 'co':
                if (!actuated) addCondEdge(tMap['11'], tMap['12']);
                else addCondEdge(tMap['11'], tMap['14']);
                break;
            case 'power3p':
                if (actuated) {
                    addCondEdge(tMap['1'], tMap['2']);
                    addCondEdge(tMap['3'], tMap['4']);
                    addCondEdge(tMap['5'], tMap['6']);
                }
                break;
            case 'power3p_no':
                if (actuated) {
                    addCondEdge(tMap['1'], tMap['2']);
                    addCondEdge(tMap['3'], tMap['4']);
                    addCondEdge(tMap['5'], tMap['6']);
                    addCondEdge(tMap['13'], tMap['14']);
                }
                break;
            case 'power3p_nc':
                if (actuated) {
                    addCondEdge(tMap['1'], tMap['2']);
                    addCondEdge(tMap['3'], tMap['4']);
                    addCondEdge(tMap['5'], tMap['6']);
                } else {
                    addCondEdge(tMap['21'], tMap['22']);
                }
                break;
            case 'power3p_no_nc':
                if (actuated) {
                    addCondEdge(tMap['1'], tMap['2']);
                    addCondEdge(tMap['3'], tMap['4']);
                    addCondEdge(tMap['5'], tMap['6']);
                    addCondEdge(tMap['13'], tMap['14']);
                } else {
                    addCondEdge(tMap['21'], tMap['22']);
                }
                break;
            case 'power4p':
                if (actuated) {
                    addCondEdge(tMap['1'], tMap['2']);
                    addCondEdge(tMap['3'], tMap['4']);
                    addCondEdge(tMap['5'], tMap['6']);
                    addCondEdge(tMap['7'], tMap['8']);
                }
                break;
            case 'power4p_2no2nc':
                if (actuated) {
                    addCondEdge(tMap['1'], tMap['2']);
                    addCondEdge(tMap['7'], tMap['8']);
                } else {
                    addCondEdge(tMap['3'], tMap['4']);
                    addCondEdge(tMap['5'], tMap['6']);
                }
                break;
        }
    }
}

function buildElectricalGraph() {
    const parent = new Map();

    function regPt(x, y) {
        const k = `${Math.round(x)},${Math.round(y)}`;
        if (!parent.has(k)) parent.set(k, k);
        return k;
    }

    function find(k) {
        if (!k || !parent.has(k)) return k;
        let root = k;
        while (parent.get(root) !== root) root = parent.get(root);
        let curr = k;
        while (parent.get(curr) !== root) {
            const nxt = parent.get(curr);
            parent.set(curr, root);
            curr = nxt;
        }
        return root;
    }

    function union(a, b) {
        if (!a || !b) return;
        const ra = find(a);
        const rb = find(b);
        if (ra !== rb) parent.set(ra, rb);
    }

    const compTermKeys = new Map();
    const anchorNodes = [];

    for (const comp of state.components) {
        const terms = getComponentTerminalsWorld(comp);
        const map = {};
        for (const t of terms) {
            const tx = Math.round(t.x);
            const ty = Math.round(t.y);
            const k = regPt(tx, ty);
            map[t.termId] = k;
            anchorNodes.push({ x: tx, y: ty, key: k });
        }
        compTermKeys.set(comp.id, map);
    }

    const wireSegs = [];
    for (const w of state.wires) {
        const pts = w.points || [];
        if (pts.length < 2) continue;
        const pStart = { x: Math.round(pts[0].x), y: Math.round(pts[0].y) };
        const pEnd = { x: Math.round(pts[pts.length - 1].x), y: Math.round(pts[pts.length - 1].y) };
        const kStart = regPt(pStart.x, pStart.y);
        const kEnd = regPt(pEnd.x, pEnd.y);

        for (let i = 1; i < pts.length; i++) {
            union(kStart, regPt(pts[i].x, pts[i].y));
        }

        anchorNodes.push({ x: pStart.x, y: pStart.y, key: kStart });
        anchorNodes.push({ x: pEnd.x, y: pEnd.y, key: kEnd });

        for (let s = 0; s < pts.length - 1; s++) {
            wireSegs.push({
                wireId: w.id,
                wireKey: kStart,
                x1: Math.round(pts[s].x),
                y1: Math.round(pts[s].y),
                x2: Math.round(pts[s + 1].x),
                y2: Math.round(pts[s + 1].y)
            });
        }
    }

    for (let i = 0; i < anchorNodes.length; i++) {
        for (let j = i + 1; j < anchorNodes.length; j++) {
            if (anchorNodes[i].x === anchorNodes[j].x && anchorNodes[i].y === anchorNodes[j].y) {
                union(anchorNodes[i].key, anchorNodes[j].key);
            }
        }
    }

    for (const seg of wireSegs) {
        for (const nd of anchorNodes) {
            if (nd.key === seg.wireKey) continue;
            if (distToSegment(nd.x, nd.y, seg.x1, seg.y1, seg.x2, seg.y2) <= 2.5) {
                union(seg.wireKey, nd.key);
            }
        }
    }

    const condAdj = new Map();
    const diodeAdj = new Map();

    function addCondEdge(u, v) {
        if (!u || !v) return;
        const ru = find(u);
        const rv = find(v);
        if (ru === rv) return;
        if (!condAdj.has(ru)) condAdj.set(ru, new Set());
        if (!condAdj.has(rv)) condAdj.set(rv, new Set());
        condAdj.get(ru).add(rv);
        condAdj.get(rv).add(ru);
    }

    function addDiodeEdge(u, v) {
        if (!u || !v) return;
        const ru = find(u);
        const rv = find(v);
        if (ru === rv) return;
        if (!diodeAdj.has(ru)) diodeAdj.set(ru, new Set());
        diodeAdj.get(ru).add(rv);
    }

    for (const comp of state.components) {
        const def = CATALOG[comp.type];
        const tMap = compTermKeys.get(comp.id);
        if (!def || !tMap) continue;
        addContactEdgesForComponent(comp, def, tMap, addCondEdge);
        if (def.isDiode) addDiodeEdge(tMap['A'], tMap['K']);
    }

    const nodePotentials = {};
    const energizedRoots = new Set();

    function propagateDirect(startKey, pot) {
        if (!startKey) return;
        const startRoot = find(startKey);
        const visited = new Set([startRoot]);
        const queue = [startRoot];
        while (queue.length > 0) {
            const curr = queue.shift();
            if (!nodePotentials[curr]) nodePotentials[curr] = new Set();
            nodePotentials[curr].add(pot);
            if (pot !== 'N' && pot !== 'PE' && pot !== 'DC-') {
                energizedRoots.add(curr);
            }
            const neighbors = condAdj.get(curr);
            if (neighbors) {
                for (const nxt of neighbors) {
                    if (!visited.has(nxt)) {
                        visited.add(nxt);
                        queue.push(nxt);
                    }
                }
            }
        }
    }

    for (const comp of state.components) {
        const def = CATALOG[comp.type];
        if (!def || !def.isSource) continue;
        const tMap = compTermKeys.get(comp.id);
        for (const t of def.terminals) {
            if (t.potential && tMap[t.id]) {
                propagateDirect(tMap[t.id], t.potential);
            }
        }
    }

    for (const comp of state.components) {
        const def = CATALOG[comp.type];
        if (!def || !def.isTransformer) continue;
        const tMap = compTermKeys.get(comp.id);
        const rH1 = tMap['H1'] ? find(tMap['H1']) : null;
        const rH2 = tMap['H2'] ? find(tMap['H2']) : null;
        if (hasValidPotentialDiff(nodePotentials[rH1], nodePotentials[rH2])) {
            propagateDirect(tMap['X1'], 'L1');
            propagateDirect(tMap['X2'], 'N');
        }
    }

    for (const [root, pots] of Object.entries(nodePotentials)) {
        const liveAC = ['L1', 'L2', 'L3'].filter(p => pots.has(p));
        if (liveAC.length >= 2) {
            return { shortCircuit: `Phase-to-Phase Short Circuit (${liveAC.join(' ↔ ')})!` };
        }
        if (liveAC.length >= 1 && (pots.has('N') || pots.has('PE'))) {
            return { shortCircuit: `Phase-to-${pots.has('N') ? 'Neutral' : 'Earth'} Short Circuit!` };
        }
        if (pots.has('DC+') && (pots.has('DC-') || pots.has('PE'))) {
            return { shortCircuit: 'DC +DC to -DC/PE Short Circuit!' };
        }
    }

    const dcPlusQueue = [];
    const dcPlusVisited = new Set();

    function seedDCPlus(root) {
        if (!root || dcPlusVisited.has(root)) return;
        dcPlusVisited.add(root);
        dcPlusQueue.push(root);
        if (!nodePotentials[root]) nodePotentials[root] = new Set();
        nodePotentials[root].add('DC+');
        energizedRoots.add(root);
    }

    for (const [anodeRoot, cathodes] of diodeAdj.entries()) {
        const aPots = nodePotentials[anodeRoot];
        const hasHotFeed = aPots && (aPots.has('L1') || aPots.has('L2') || aPots.has('L3') || aPots.has('N') || aPots.has('DC+'));
        if (hasHotFeed) {
            for (const kRoot of cathodes) seedDCPlus(kRoot);
        }
    }

    while (dcPlusQueue.length > 0) {
        const curr = dcPlusQueue.shift();
        for (const nxt of (condAdj.get(curr) || [])) seedDCPlus(nxt);
        for (const nxt of (diodeAdj.get(curr) || [])) seedDCPlus(nxt);
    }

    for (const [anodeRoot, cathodes] of diodeAdj.entries()) {
        const feedsDCPlus = Array.from(cathodes).some(kRoot => nodePotentials[kRoot] && nodePotentials[kRoot].has('DC+'));
        const aPots = nodePotentials[anodeRoot];
        if (feedsDCPlus && aPots && (aPots.has('L1') || aPots.has('L2') || aPots.has('L3') || aPots.has('N') || aPots.has('DC-'))) {
            const retVisited = new Set([anodeRoot]);
            const retQueue = [anodeRoot];
            while (retQueue.length > 0) {
                const rCurr = retQueue.shift();
                if (!nodePotentials[rCurr]) nodePotentials[rCurr] = new Set();
                nodePotentials[rCurr].add('DC-');
                for (const nxt of (condAdj.get(rCurr) || [])) {
                    if (!retVisited.has(nxt)) {
                        retVisited.add(nxt);
                        retQueue.push(nxt);
                    }
                }
            }
        }
    }

    for (const pots of Object.values(nodePotentials)) {
        if (pots.has('DC+') && pots.has('DC-')) {
            return { shortCircuit: 'Rectified DC+ to DC- Short Circuit!' };
        }
    }

    const adj = new Map();
    for (const [u, nbrs] of condAdj.entries()) {
        if (!adj.has(u)) adj.set(u, new Set());
        for (const v of nbrs) adj.get(u).add(v);
    }
    for (const [u, nbrs] of diodeAdj.entries()) {
        if (!adj.has(u)) adj.set(u, new Set());
        for (const v of nbrs) adj.get(u).add(v);
    }

    return { shortCircuit: null, find, adj, compTermKeys, nodePotentials, energizedRoots };
}

function hasValidPotentialDiff(potsA, potsB) {
    if (!potsA || !potsB) return false;
    const hotA = ['L1', 'L2', 'L3'].filter(p => potsA.has(p));
    const hotB = ['L1', 'L2', 'L3'].filter(p => potsB.has(p));

    if (hotA.length === 1 && potsB.has('N') && hotB.length === 0) return true;
    if (hotB.length === 1 && potsA.has('N') && hotA.length === 0) return true;
    if (hotA.length === 1 && hotB.length === 1 && hotA[0] !== hotB[0]) return true;

    const dcPlusA = potsA.has('DC+') && !potsA.has('DC-');
    const dcMinusB = potsB.has('DC-') && !potsB.has('DC+');
    const dcPlusB = potsB.has('DC+') && !potsB.has('DC-');
    const dcMinusA = potsA.has('DC-') && !potsA.has('DC+');
    return (dcPlusA && dcMinusB) || (dcPlusB && dcMinusA);
}

function updateCoilStates(comp, def, tagUpper, isEn, prevEn, delay, safeDt, isFirstPass) {
    let changed = false;

    if (def.coilType === 'standard') {
        if (state.simRuntime.coilActive[tagUpper] !== isEn) {
            state.simRuntime.coilActive[tagUpper] = isEn;
            changed = true;
            if (isEn) playClickSound();
        }
    } else if (def.coilType === 'latch') {
        if (isEn && !prevEn) {
            state.simRuntime.latchState[tagUpper] = !state.simRuntime.latchState[tagUpper];
            state.simRuntime.coilActive[tagUpper] = !!state.simRuntime.latchState[tagUpper];
            changed = true;
            playClickSound();
        }
    } else if (def.coilType === 'ton') {
        if (isEn) {
            if (isFirstPass) {
                state.simRuntime.coilTimers[tagUpper] = Math.min(delay, (state.simRuntime.coilTimers[tagUpper] || 0) + safeDt);
            }
            const active = (state.simRuntime.coilTimers[tagUpper] || 0) >= delay - 1e-4;
            if (state.simRuntime.coilActive[tagUpper] !== active) {
                state.simRuntime.coilActive[tagUpper] = active;
                changed = true;
                if (active) playClickSound();
            }
        } else {
            state.simRuntime.coilTimers[tagUpper] = 0;
            if (state.simRuntime.coilActive[tagUpper]) {
                state.simRuntime.coilActive[tagUpper] = false;
                changed = true;
            }
        }
    } else if (def.coilType === 'tof') {
        if (isEn) {
            state.simRuntime.coilTimers[tagUpper] = delay;
            if (!state.simRuntime.coilActive[tagUpper]) {
                state.simRuntime.coilActive[tagUpper] = true;
                changed = true;
                playClickSound();
            }
        } else {
            if (isFirstPass && (state.simRuntime.coilTimers[tagUpper] || 0) > 0) {
                state.simRuntime.coilTimers[tagUpper] = Math.max(0, (state.simRuntime.coilTimers[tagUpper] || 0) - safeDt);
            }
            const active = (state.simRuntime.coilTimers[tagUpper] || 0) > 0;
            if (state.simRuntime.coilActive[tagUpper] !== active) {
                state.simRuntime.coilActive[tagUpper] = active;
                changed = true;
            }
        }
    } else if (def.coilType === 'flasher') {
        if (isEn) {
            if (isFirstPass) {
                state.simRuntime.coilTimers[tagUpper] = (state.simRuntime.coilTimers[tagUpper] || 0) + safeDt;
            }
            const active = Math.floor((state.simRuntime.coilTimers[tagUpper] || 0) / delay) % 2 === 0;
            if (state.simRuntime.coilActive[tagUpper] !== active) {
                state.simRuntime.coilActive[tagUpper] = active;
                changed = true;
            }
        } else {
            state.simRuntime.coilTimers[tagUpper] = 0;
            if (state.simRuntime.coilActive[tagUpper]) {
                state.simRuntime.coilActive[tagUpper] = false;
                changed = true;
            }
        }
    }

    return changed;
}

function evaluateMotorState(comp, def, tMap, graph, areNodesConnected) {
    const getPh = s => s ? (s.has('L1') ? 'L1' : s.has('L2') ? 'L2' : s.has('L3') ? 'L3' : null) : null;
    const isValid3Ph = (a, b, c) => !!(a && b && c && a !== b && b !== c && a !== c);
    const getSeqDir = (a, b, c) => {
        const seq = `${a}-${b}-${c}`;
        return (seq === 'L1-L2-L3' || seq === 'L2-L3-L1' || seq === 'L3-L1-L2') ? 'CW' : 'CCW';
    };

    if (def.motorType === '3p') {
        const u = getPh(graph.nodePotentials[graph.find(tMap['U1'])]);
        const v = getPh(graph.nodePotentials[graph.find(tMap['V1'])]);
        const w = getPh(graph.nodePotentials[graph.find(tMap['W1'])]);
        return isValid3Ph(u, v, w)
            ? { running: true, dir: getSeqDir(u, v, w), mode: '3~', speedFactor: 1.0 }
            : { running: false };
    }

    if (def.motorType === '3p_2spd') {
        const u1 = getPh(graph.nodePotentials[graph.find(tMap['1U'])]);
        const v1 = getPh(graph.nodePotentials[graph.find(tMap['1V'])]);
        const w1 = getPh(graph.nodePotentials[graph.find(tMap['1W'])]);
        const u2 = getPh(graph.nodePotentials[graph.find(tMap['2U'])]);
        const v2 = getPh(graph.nodePotentials[graph.find(tMap['2V'])]);
        const w2 = getPh(graph.nodePotentials[graph.find(tMap['2W'])]);

        if (isValid3Ph(u2, v2, w2)) {
            return { running: true, dir: getSeqDir(u2, v2, w2), mode: 'HIGH', speedFactor: 2.0 };
        }
        if (isValid3Ph(u1, v1, w1)) {
            return { running: true, dir: getSeqDir(u1, v1, w1), mode: 'LOW', speedFactor: 1.0 };
        }
        return { running: false };
    }

    if (def.motorType === '3p_sd') {
        const rU1 = graph.find(tMap['U1']);
        const rV1 = graph.find(tMap['V1']);
        const rW1 = graph.find(tMap['W1']);
        const rU2 = graph.find(tMap['U2']);
        const rV2 = graph.find(tMap['V2']);
        const rW2 = graph.find(tMap['W2']);

        const u1 = getPh(graph.nodePotentials[rU1]);
        const v1 = getPh(graph.nodePotentials[rV1]);
        const w1 = getPh(graph.nodePotentials[rW1]);
        const u2 = getPh(graph.nodePotentials[rU2]);
        const v2 = getPh(graph.nodePotentials[rV2]);
        const w2 = getPh(graph.nodePotentials[rW2]);

        const has3Ph1 = isValid3Ph(u1, v1, w1);
        const has3Ph2 = isValid3Ph(u2, v2, w2);
        const star2 = !!(rU2 && rV2 && rW2 && areNodesConnected(rU2, rV2) && areNodesConnected(rU2, rW2) && !u2 && !v2 && !w2);
        const star1 = !!(rU1 && rV1 && rW1 && areNodesConnected(rU1, rV1) && areNodesConnected(rU1, rW1) && !u1 && !v1 && !w1);

        if (has3Ph1 && star2) return { running: true, dir: getSeqDir(u1, v1, w1), mode: 'Y (STAR)', speedFactor: 1.0 };
        if (has3Ph2 && star1) return { running: true, dir: getSeqDir(u2, v2, w2), mode: 'Y (STAR)', speedFactor: 1.0 };
        if (has3Ph1 && has3Ph2 && u2 !== u1 && v2 !== v1 && w2 !== w1) {
            return { running: true, dir: getSeqDir(u1, v1, w1), mode: 'Δ (DELTA)', speedFactor: 1.0 };
        }
        return { running: false };
    }

    if (def.motorType === '1p') {
        const p1 = graph.nodePotentials[graph.find(tMap['U1'])];
        const p2 = graph.nodePotentials[graph.find(tMap['U2'])];
        return hasValidPotentialDiff(p1, p2)
            ? { running: true, dir: 'CW', mode: '1~', speedFactor: 1.0 }
            : { running: false };
    }

    if (def.motorType === 'dc') {
        const p1 = graph.nodePotentials[graph.find(tMap['A1'])];
        const p2 = graph.nodePotentials[graph.find(tMap['A2'])];
        if (p1 && p2 && p1.has('DC+') && p2.has('DC-')) return { running: true, dir: 'CW', mode: 'DC+', speedFactor: 1.0 };
        if (p1 && p2 && p1.has('DC-') && p2.has('DC+')) return { running: true, dir: 'CCW', mode: 'DC-', speedFactor: 1.0 };
        return { running: false };
    }

    return { running: false };
}

function stepSimulation(dt) {
    if (!state.isSimulating || state.shortCircuitError) return;
    const safeDt = Math.min(Math.max(dt, 0.001), 0.1);

    let graph = null;
    for (let pass = 0; pass < 6; pass++) {
        graph = buildElectricalGraph();
        if (graph.shortCircuit) {
            triggerShortCircuit(graph.shortCircuit);
            return;
        }

        const nextEnergizedByTag = {};
        for (const comp of state.components) {
            const def = CATALOG[comp.type];
            if (!def || !def.isCoil) continue;
            const tagUpper = (comp.tag || '').trim().toUpperCase();
            if (!tagUpper) continue;
            const tMap = graph.compTermKeys.get(comp.id);
            const energized = hasValidPotentialDiff(
                graph.nodePotentials[graph.find(tMap['A1'])],
                graph.nodePotentials[graph.find(tMap['A2'])]
            );
            if (energized) nextEnergizedByTag[tagUpper] = true;
            else if (!(tagUpper in nextEnergizedByTag)) nextEnergizedByTag[tagUpper] = false;
        }

        let changed = false;
        for (const comp of state.components) {
            const def = CATALOG[comp.type];
            if (!def || !def.isCoil) continue;
            const tagUpper = (comp.tag || '').trim().toUpperCase();
            if (!tagUpper) continue;
            const isEn = !!nextEnergizedByTag[tagUpper];
            const prevEn = !!state.simRuntime.coilEnergized[tagUpper];
            const delay = Math.max(0.1, Number(comp.delay ?? def.defaultDelay ?? 3.0));

            if (updateCoilStates(comp, def, tagUpper, isEn, prevEn, delay, safeDt, pass === 0)) {
                changed = true;
            }
            state.simRuntime.coilEnergized[tagUpper] = isEn;
        }

        if (!changed) break;
    }

    graph = buildElectricalGraph();
    if (graph.shortCircuit) {
        triggerShortCircuit(graph.shortCircuit);
        return;
    }

    state.simRuntime.energizedNodes = graph.energizedRoots;
    state.simRuntime.nodePotentials = graph.nodePotentials;

    const motorStates = {};
    const lampStates = {};
    let anyBuzzer = false;
    let anyMotorSpinning = false;
    let maxSpeedFactor = 1;

    const areNodesConnected = (startRoot, targetRoot) => {
        if (!startRoot || !targetRoot) return false;
        if (startRoot === targetRoot) return true;
        const visited = new Set([startRoot]);
        const queue = [startRoot];
        while (queue.length > 0) {
            const curr = queue.shift();
            if (curr === targetRoot) return true;
            for (const nxt of (graph.adj.get(curr) || [])) {
                if (!visited.has(nxt)) {
                    visited.add(nxt);
                    queue.push(nxt);
                }
            }
        }
        return false;
    };

    for (const comp of state.components) {
        const def = CATALOG[comp.type];
        const tMap = graph.compTermKeys.get(comp.id);
        if (!def || !tMap) continue;

        if (def.isLamp) {
            lampStates[comp.id] = hasValidPotentialDiff(
                graph.nodePotentials[graph.find(tMap['X1'])],
                graph.nodePotentials[graph.find(tMap['X2'])]
            );
        } else if (def.isBuzzer) {
            if (hasValidPotentialDiff(
                graph.nodePotentials[graph.find(tMap['X1'])],
                graph.nodePotentials[graph.find(tMap['X2'])]
            )) {
                anyBuzzer = true;
            }
        } else if (def.isMotor) {
            const mState = evaluateMotorState(comp, def, tMap, graph, areNodesConnected);
            motorStates[comp.id] = mState;
            if (mState.running) {
                anyMotorSpinning = true;
                maxSpeedFactor = Math.max(maxSpeedFactor, mState.speedFactor || 1.0);
            }
        }
    }

    state.simRuntime.motorStates = motorStates;
    state.simRuntime.lampStates = lampStates;
    state.simRuntime.buzzerActive = anyBuzzer;
    setBuzzerSound(anyBuzzer);

    if (anyMotorSpinning) {
        state.simRuntime.motorAngle = (state.simRuntime.motorAngle + safeDt * 6.5 * maxSpeedFactor) % (Math.PI * 2);
    }

    state.simRuntime._findRoot = graph.find;
}

function triggerShortCircuit(message) {
    state.shortCircuitError = message;
    setBuzzerSound(false);
    const banner = document.getElementById('alert-banner');
    const txt = document.getElementById('alert-banner-text');
    if (txt) txt.textContent = message;
    if (banner) banner.classList.remove('hidden');
}

function resetSwitchStatesToDefault() {
    for (const comp of state.components) {
        const def = CATALOG[comp.type];
        if (!def || (!def.isSwitch && !def.isOverload)) continue;
        comp.closed = !!def.defaultClosed;
        if (def.switchType === 'twostep_nonc') comp.step = 0;
    }
}

function startSimulation() {
    ensureAudioReady();
    state.isSimulating = true;
    state.shortCircuitError = null;
    state.drawingWire = null;
    state.draggingComp = null;
    state.draggingWire = null;

    state.simRuntime = {
        coilTimers: {},
        coilEnergized: {},
        coilActive: {},
        latchState: {},
        energizedNodes: new Set(),
        nodePotentials: {},
        motorStates: {},
        lampStates: {},
        buzzerActive: false,
        motorAngle: 0,
        lastTick: performance.now(),
        _findRoot: null
    };

    resetSwitchStatesToDefault();

    document.getElementById('icon-play').classList.add('hidden');
    document.getElementById('icon-stop').classList.remove('hidden');
    document.getElementById('text-sim-toggle').textContent = 'Stop';
    const btn = document.getElementById('btn-sim-toggle');
    btn.classList.remove('bg-emerald-600', 'hover:bg-emerald-500');
    btn.classList.add('bg-rose-600', 'hover:bg-rose-500');

    document.getElementById('sim-banner').classList.remove('hidden');
    document.getElementById('alert-banner').classList.add('hidden');
    document.getElementById('status-dot').className = 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse';
    document.getElementById('status-text').textContent = 'SIMULATING LIVE';
    updateHistoryButtons();
    updateFloatingActions();
    stepSimulation(0.016);
    render();
}

function stopSimulation() {
    state.isSimulating = false;
    state.shortCircuitError = null;
    setBuzzerSound(false);
    resetSwitchStatesToDefault();

    document.getElementById('icon-play').classList.remove('hidden');
    document.getElementById('icon-stop').classList.add('hidden');
    document.getElementById('text-sim-toggle').textContent = 'Simulate';
    const btn = document.getElementById('btn-sim-toggle');
    btn.classList.remove('bg-rose-600', 'hover:bg-rose-500');
    btn.classList.add('bg-emerald-600', 'hover:bg-emerald-500');

    document.getElementById('sim-banner').classList.add('hidden');
    document.getElementById('alert-banner').classList.add('hidden');
    document.getElementById('status-dot').className = 'w-2 h-2 rounded-full bg-slate-400';
    document.getElementById('status-text').textContent = 'EDIT MODE';
    updateHistoryButtons();
    updateFloatingActions();
    render();
}

// =========================================================================
// CANVAS RENDERING
// =========================================================================
function roundRectPath(ctx, x, y, w, h, r) {
    if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
        return;
    }
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

function drawPoleSymbol(ctx, px, isClosed, opts = {}) {
    const { isNC = false, isFuse = false, isCrossed = false, stepClosed = null } = opts;
    const effectiveClosed = stepClosed !== null ? stepClosed : (isNC ? !isClosed : isClosed);

    ctx.beginPath();
    ctx.moveTo(px, -40);
    ctx.lineTo(px, -16);
    if (isNC) ctx.lineTo(px + 6, -16);
    ctx.moveTo(px, 40);
    ctx.lineTo(px, 16);
    ctx.moveTo(px, 16);
    if (effectiveClosed) {
        ctx.lineTo(px, -16);
    } else {
        ctx.lineTo(isNC ? px + 4 : px - 10, isNC ? -18 : -13);
    }
    ctx.stroke();

    if (isFuse) {
        ctx.strokeRect(px - 5, -12, 10, 24);
    } else if (isCrossed) {
        ctx.beginPath();
        ctx.moveTo(px - 4, -20); ctx.lineTo(px + 4, -12);
        ctx.moveTo(px + 4, -20); ctx.lineTo(px - 4, -12);
        ctx.stroke();
    }
}

function drawComponentBody(ctx, comp, def, isClosed, strokeMain, strokeMuted, isDark, tagUpper) {
    if (def.isTransformer) {
        ctx.beginPath();
        ctx.moveTo(-20, -40); ctx.lineTo(-20, -24);
        ctx.moveTo(20, -40);  ctx.lineTo(20, -24);
        ctx.arc(-10, -16, 10, Math.PI, 0, false);
        ctx.arc(10, -16, 10, Math.PI, 0, false);
        ctx.stroke();

        ctx.save();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-24, -4); ctx.lineTo(24, -4);
        ctx.moveTo(-24, 4);  ctx.lineTo(24, 4);
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(-10, 16, 10, 0, Math.PI, false);
        ctx.arc(10, 16, 10, 0, Math.PI, false);
        ctx.moveTo(-20, 24); ctx.lineTo(-20, 40);
        ctx.moveTo(20, 24);  ctx.lineTo(20, 40);
        ctx.stroke();

        const priV = comp.primaryV ?? def.defaultPrimaryV ?? 230;
        const secV = comp.secondaryV ?? def.defaultSecondaryV ?? 24;
        ctx.font = 'bold 8px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = isDark ? '#fbbf24' : '#b45309';
        ctx.fillText(`${priV}V→${secV}V`, 0, 0);
        return;
    }

    if (def.isSource) {
        ctx.fillStyle = isDark ? '#1e293b' : '#e2e8f0';
        roundRectPath(ctx, -def.width / 2 + 4, -14, def.width - 8, 22, 5);
        ctx.fill();
        ctx.stroke();

        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (const t of def.terminals) {
            const ws = WIRE_STYLES[t.potential] || WIRE_STYLES['C1'];
            ctx.strokeStyle = ws.activeColor;
            ctx.beginPath();
            ctx.moveTo(t.x, 8);
            ctx.lineTo(t.x, t.y);
            ctx.stroke();
            ctx.fillStyle = ws.activeColor;
            ctx.fillText(t.label, t.x, -3);
        }
        return;
    }

    if (def.isSwitch) {
        if (def.switchType === 'twostep_nonc') {
            const step = state.isSimulating ? (comp.step || 0) : (isClosed ? 2 : 0);
            drawPoleSymbol(ctx, -20, isClosed, { isNC: true, stepClosed: step === 0 });
            drawPoleSymbol(ctx, 0, isClosed, { stepClosed: step >= 1 });
            drawPoleSymbol(ctx, 20, isClosed, { stepClosed: step >= 2 });

            ctx.save();
            ctx.setLineDash([3, 3]);
            ctx.strokeStyle = strokeMuted;
            ctx.beginPath();
            ctx.moveTo(-36, 0); ctx.lineTo(15, 0);
            ctx.stroke();
            ctx.restore();

            ctx.beginPath();
            ctx.moveTo(-36, -8); ctx.lineTo(-40, -8); ctx.lineTo(-40, 8); ctx.lineTo(-36, 8);
            ctx.stroke();

            ctx.font = 'bold 7px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = step >= 1 ? '#10b981' : strokeMuted;
            ctx.fillText('L', 0, 27);
            ctx.fillStyle = step >= 2 ? '#f59e0b' : strokeMuted;
            ctx.fillText('H', 20, 27);
        } else if (def.switchType === 'momentary_nonc') {
            drawPoleSymbol(ctx, -20, isClosed, { isNC: true });
            drawPoleSymbol(ctx, 20, isClosed);
            ctx.save();
            ctx.setLineDash([3, 3]);
            ctx.strokeStyle = strokeMuted;
            ctx.beginPath();
            ctx.moveTo(-34, 0); ctx.lineTo(15, 0);
            ctx.stroke();
            ctx.restore();
        } else {
            const cols = def.poles === 3 ? [-20, 0, 20] : def.poles === 2 ? [-20, 20] : [0];
            for (const px of cols) {
                drawPoleSymbol(ctx, px, isClosed, {
                    isNC: def.switchType === 'momentary_nc' || def.switchType === 'estop',
                    isFuse: !!def.isFuse,
                    isCrossed: !!def.poles
                });
            }

            if (def.switchType === 'momentary_no' || def.switchType === 'momentary_nc') {
                ctx.save();
                ctx.setLineDash([3, 3]);
                ctx.strokeStyle = strokeMuted;
                ctx.beginPath();
                ctx.moveTo(-18, 0); ctx.lineTo(-5, 0);
                ctx.stroke();
                ctx.restore();
                ctx.beginPath();
                ctx.moveTo(-18, -8); ctx.lineTo(-22, -8); ctx.lineTo(-22, 8); ctx.lineTo(-18, 8);
                ctx.stroke();
            } else if (def.switchType === 'estop') {
                ctx.save();
                ctx.setLineDash([3, 3]);
                ctx.strokeStyle = '#ef4444';
                ctx.beginPath();
                ctx.moveTo(-18, 0); ctx.lineTo(-4, 0);
                ctx.stroke();
                ctx.restore();
                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.arc(-18, 0, 8, Math.PI * 0.5, Math.PI * 1.5);
                ctx.fill();
            } else if (def.isLimit) {
                ctx.beginPath();
                ctx.arc(-16, 0, 5, 0, Math.PI * 2);
                ctx.stroke();
            } else if (cols.length > 1) {
                ctx.save();
                ctx.setLineDash([3, 3]);
                ctx.strokeStyle = strokeMuted;
                ctx.beginPath();
                ctx.moveTo(cols[0] - 5, 0); ctx.lineTo(cols[cols.length - 1], 0);
                ctx.stroke();
                ctx.restore();
            }
        }
        return;
    }

    if (def.isOverload) {
        drawPoleSymbol(ctx, -20, isClosed, { isNC: true });
        drawPoleSymbol(ctx, 20, isClosed);
        ctx.save();
        ctx.strokeStyle = isClosed ? '#ef4444' : strokeMuted;
        ctx.beginPath();
        ctx.moveTo(-34, -8); ctx.lineTo(-28, -8); ctx.lineTo(-28, 8); ctx.lineTo(-34, 8);
        ctx.stroke();
        ctx.restore();
        return;
    }

    if (def.isCoil) {
        const energized = state.isSimulating && !!state.simRuntime.coilEnergized[tagUpper];
        const active = state.isSimulating && !!state.simRuntime.coilActive[tagUpper];

        ctx.beginPath();
        ctx.moveTo(0, -40); ctx.lineTo(0, -14);
        ctx.moveTo(0, 40);  ctx.lineTo(0, 14);
        ctx.stroke();

        if (energized || active) {
            ctx.fillStyle = active ? 'rgba(239, 68, 68, 0.25)' : 'rgba(245, 158, 11, 0.22)';
            ctx.fillRect(-18, -14, 36, 28);
            ctx.strokeStyle = active ? '#ef4444' : '#f59e0b';
        }
        ctx.strokeRect(-18, -14, 36, 28);

        if (def.coilType === 'ton') {
            ctx.beginPath();
            ctx.moveTo(-18, -14); ctx.lineTo(-10, 14);
            ctx.moveTo(-10, -14); ctx.lineTo(-18, 14);
            ctx.stroke();
        } else if (def.coilType === 'tof') {
            ctx.fillStyle = strokeMain;
            ctx.fillRect(-18, -14, 8, 28);
        } else if (def.coilType === 'flasher') {
            ctx.beginPath();
            ctx.moveTo(-14, 4); ctx.lineTo(-14, -4); ctx.lineTo(-9, -4); ctx.lineTo(-9, 4);
            ctx.stroke();
        } else if (def.coilType === 'latch') {
            ctx.beginPath();
            ctx.moveTo(-18, -6); ctx.lineTo(-12, 0); ctx.lineTo(-18, 6);
            ctx.stroke();
        }
        return;
    }

    if (def.isContact) {
        const drawMechBar = (xStart, xEnd) => {
            ctx.save();
            ctx.setLineDash([3, 3]);
            ctx.strokeStyle = strokeMuted;
            ctx.beginPath();
            ctx.moveTo(xStart, 0); ctx.lineTo(xEnd, 0);
            ctx.stroke();
            ctx.restore();
        };

        switch (def.contactType) {
            case 'power3p':
                [-20, 0, 20].forEach(px => drawPoleSymbol(ctx, px, isClosed));
                drawMechBar(-25, 20);
                break;
            case 'power3p_no':
            case 'power4p':
                [-40, -20, 0, 20].forEach(px => drawPoleSymbol(ctx, px, isClosed));
                drawMechBar(-45, 20);
                break;
            case 'power4p_2no2nc':
                [-40, 20].forEach(px => drawPoleSymbol(ctx, px, isClosed));
                [-20, 0].forEach(px => drawPoleSymbol(ctx, px, isClosed, { isNC: true }));
                drawMechBar(-45, 20);
                break;
            case 'power3p_nc':
                [-40, -20, 0].forEach(px => drawPoleSymbol(ctx, px, isClosed));
                drawPoleSymbol(ctx, 20, isClosed, { isNC: true });
                drawMechBar(-45, 22);
                break;
            case 'power3p_no_nc':
                [-40, -20, 0, 20].forEach(px => drawPoleSymbol(ctx, px, isClosed));
                drawPoleSymbol(ctx, 40, isClosed, { isNC: true });
                drawMechBar(-45, 42);
                break;
            case 'no':
                drawPoleSymbol(ctx, 0, isClosed);
                if (def.timerSymbol === 'ton') {
                    ctx.beginPath();
                    ctx.arc(-8, 4, 6, Math.PI * 0.5, Math.PI * 1.5);
                    ctx.stroke();
                }
                break;
            case 'nc':
                drawPoleSymbol(ctx, 0, isClosed, { isNC: true });
                if (def.timerSymbol === 'ton') {
                    ctx.beginPath();
                    ctx.arc(-8, 4, 6, Math.PI * 0.5, Math.PI * 1.5);
                    ctx.stroke();
                }
                break;
            case 'co':
                ctx.beginPath();
                ctx.moveTo(0, -40);  ctx.lineTo(0, -14);
                ctx.moveTo(-20, 40); ctx.lineTo(-20, 16); ctx.lineTo(-12, 16);
                ctx.moveTo(20, 40);  ctx.lineTo(20, 16);  ctx.lineTo(12, 16);
                ctx.moveTo(0, -14);
                if (!isClosed) ctx.lineTo(-14, 18);
                else ctx.lineTo(14, 16);
                ctx.stroke();
                break;
        }
        return;
    }

    if (def.isMotor) {
        const mState = state.isSimulating ? state.simRuntime.motorStates[comp.id] : null;
        const running = mState && mState.running;

        for (const t of def.terminals) {
            ctx.beginPath();
            if (t.id === 'PE') {
                ctx.moveTo(26, 0); ctx.lineTo(40, 0);
            } else if (t.y < 0) {
                ctx.moveTo(t.x, t.y); ctx.lineTo(t.x, -22);
            } else {
                ctx.moveTo(t.x, t.y); ctx.lineTo(t.x, 22);
            }
            ctx.stroke();
        }

        ctx.fillStyle = running ? 'rgba(16, 185, 129, 0.16)' : (isDark ? '#111827' : '#ffffff');
        if (running) ctx.strokeStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(0, 0, 26, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        if (running) {
            ctx.save();
            const ang = (mState.dir === 'CCW' ? -1 : 1) * state.simRuntime.motorAngle;
            ctx.rotate(ang);
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.55)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-20, 0); ctx.lineTo(20, 0);
            ctx.moveTo(0, -20); ctx.lineTo(0, 20);
            ctx.stroke();
            ctx.restore();
        }

        ctx.fillStyle = running ? '#10b981' : strokeMain;
        ctx.font = 'bold 13px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(def.motorType === 'dc' ? 'M=' : 'M', 0, -2);
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        const subLabel = def.motorType === 'dc' ? 'DC' : def.motorType === '1p' ? '1~' : def.motorType === '3p_2spd' ? '3~ 2S' : '3~';
        ctx.fillText(subLabel, 0, 11);
        return;
    }

    if (def.isLamp) {
        const lit = state.isSimulating && !!state.simRuntime.lampStates[comp.id];
        const lampColor = comp.color || def.defaultColor || '#22c55e';

        ctx.beginPath();
        ctx.moveTo(0, -40); ctx.lineTo(0, -16);
        ctx.moveTo(0, 40);  ctx.lineTo(0, 16);
        ctx.stroke();

        if (lit) {
            ctx.save();
            ctx.shadowColor = lampColor;
            ctx.shadowBlur = 18;
            ctx.fillStyle = lampColor;
            ctx.beginPath();
            ctx.arc(0, 0, 16, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        } else {
            ctx.fillStyle = isDark ? '#1e293b' : '#f1f5f9';
            ctx.beginPath();
            ctx.arc(0, 0, 16, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.strokeStyle = lit ? '#ffffff' : strokeMain;
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.moveTo(-11, -11); ctx.lineTo(11, 11);
        ctx.moveTo(11, -11);  ctx.lineTo(-11, 11);
        ctx.stroke();
        return;
    }

    if (def.isBuzzer) {
        const active = state.isSimulating && state.simRuntime.buzzerActive;
        ctx.beginPath();
        ctx.moveTo(0, -40); ctx.lineTo(0, -14);
        ctx.moveTo(0, 40);  ctx.lineTo(0, 14);
        ctx.stroke();

        ctx.fillStyle = active ? '#f59e0b' : (isDark ? '#1e293b' : '#f1f5f9');
        ctx.beginPath();
        ctx.moveTo(-14, -14); ctx.lineTo(14, -14); ctx.lineTo(14, 14); ctx.lineTo(-14, 14);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        return;
    }

    if (def.isDiode) {
        ctx.beginPath();
        ctx.moveTo(0, -40); ctx.lineTo(0, -10);
        ctx.moveTo(0, 40);  ctx.lineTo(0, 10);
        ctx.moveTo(-10, 10); ctx.lineTo(10, 10);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-10, -10); ctx.lineTo(10, -10); ctx.lineTo(0, 10);
        ctx.closePath();
        ctx.fill();
        return;
    }

    if (def.isLabel) {
        ctx.font = 'bold 12px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = isDark ? '#93c5fd' : '#1d4ed8';
        ctx.fillText(comp.comment || comp.tag || 'SECTION TITLE', 0, 0);
    }
}

function drawComponentBadges(ctx, comp, def, tagUpper) {
    if (state.isSimulating && def.isSwitch && def.switchType === 'twostep_nonc') {
        const step = comp.step || 0;
        const badgeLabel = step === 0 ? 'OFF (0)' : step === 1 ? 'LOW (1)' : 'HIGH (2)';
        ctx.fillStyle = step === 0 ? '#475569' : step === 1 ? '#059669' : '#d97706';
        roundRectPath(ctx, -28, -58, 56, 15, 4);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(badgeLabel, 0, -50.5);
    }

    if (state.isSimulating && def.isCoil && (def.coilType === 'ton' || def.coilType === 'tof')) {
        const delay = Number(comp.delay ?? def.defaultDelay ?? 3.0);
        const elapsed = Number(state.simRuntime.coilTimers[tagUpper] || 0);
        const remaining = def.coilType === 'ton' ? Math.max(0, delay - elapsed) : elapsed;
        ctx.fillStyle = '#2563eb';
        roundRectPath(ctx, -24, -32, 48, 15, 4);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${remaining.toFixed(1)}s`, 0, -24.5);
    }

    if (state.isSimulating && def.isMotor) {
        const mState = state.simRuntime.motorStates[comp.id];
        if (mState && mState.running) {
            ctx.fillStyle = mState.mode === 'HIGH' ? '#d97706' : '#059669';
            roundRectPath(ctx, -38, 46, 76, 16, 4);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 9px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${mState.dir} · ${mState.mode}`, 0, 54);
        }
    }
}

function drawComponent(ctx, comp, isSelected) {
    const def = CATALOG[comp.type];
    if (!def) return;

    const isDark = state.darkMode;
    const strokeMain = isDark ? '#e2e8f0' : '#1e293b';
    const strokeMuted = isDark ? '#64748b' : '#94a3b8';
    const tag = (comp.tag || '').trim();
    const tagUpper = tag.toUpperCase();

    ctx.save();
    ctx.translate(comp.x, comp.y);

    if (isSelected && !state.isSimulating) {
        const rot = ((comp.rotation || 0) % 180 + 180) % 180;
        const bw = (rot === 0 ? def.width : def.height) + 12;
        const bh = (rot === 0 ? def.height : def.width) + 12;
        ctx.save();
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.08)';
        roundRectPath(ctx, -bw / 2, -bh / 2, bw, bh, 6);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    ctx.save();
    ctx.rotate(((comp.rotation || 0) * Math.PI) / 180);
    ctx.strokeStyle = strokeMain;
    ctx.fillStyle = strokeMain;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const isClosed = state.isSimulating
        ? (def.isContact ? (tagUpper ? !!state.simRuntime.coilActive[tagUpper] : false) : !!comp.closed)
        : (typeof comp.closed === 'boolean' ? comp.closed : !!def.defaultClosed);

    drawComponentBody(ctx, comp, def, isClosed, strokeMain, strokeMuted, isDark, tagUpper);
    ctx.restore();

    if (!def.isLabel && tag) {
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.fillStyle = isDark ? '#93c5fd' : '#1e40af';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        const offsetX = (((comp.rotation || 0) % 180 + 180) % 180 === 0 ? def.width : def.height) / 2 + 6;
        ctx.fillText(tag, offsetX, -6);

        if (comp.comment) {
            ctx.font = '9px "Inter", sans-serif';
            ctx.fillStyle = strokeMuted;
            ctx.fillText(comp.comment, offsetX, 7);
        }
    }

    drawComponentBadges(ctx, comp, def, tagUpper);
    ctx.restore();

    for (const t of getComponentTerminalsWorld(comp)) {
        const isHovered = state.hoveredTerminal && state.hoveredTerminal.compId === t.compId && state.hoveredTerminal.termId === t.termId;
        ctx.save();
        ctx.fillStyle = isHovered ? '#3b82f6' : (isDark ? '#38bdf8' : '#0284c7');
        ctx.beginPath();
        ctx.arc(t.x, t.y, isHovered ? 5.2 : 3.2, 0, Math.PI * 2);
        ctx.fill();

        if (state.view.zoom >= 0.7) {
            ctx.font = '9px "JetBrains Mono", monospace';
            ctx.fillStyle = strokeMuted;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';
            ctx.fillText(t.label, t.x + 4, t.y - 2);
        }
        ctx.restore();
    }
}

function drawGrid(ctx, w, h, isDark) {
    if (!state.snapToGrid) return;
    const left = -state.view.x / state.view.zoom;
    const top = -state.view.y / state.view.zoom;
    const right = left + w / state.view.zoom;
    const bottom = top + h / state.view.zoom;
    const startX = Math.floor(left / GRID_SIZE) * GRID_SIZE;
    const startY = Math.floor(top / GRID_SIZE) * GRID_SIZE;

    ctx.lineWidth = 1 / state.view.zoom;
    for (let gx = startX; gx <= right; gx += GRID_SIZE) {
        ctx.strokeStyle = gx % 100 === 0
            ? (isDark ? '#1e293b' : '#cbd5e1')
            : (isDark ? '#131b2e' : '#e2e8f0');
        ctx.beginPath();
        ctx.moveTo(gx, top);
        ctx.lineTo(gx, bottom);
        ctx.stroke();
    }
    for (let gy = startY; gy <= bottom; gy += GRID_SIZE) {
        ctx.strokeStyle = gy % 100 === 0
            ? (isDark ? '#1e293b' : '#cbd5e1')
            : (isDark ? '#131b2e' : '#e2e8f0');
        ctx.beginPath();
        ctx.moveTo(left, gy);
        ctx.lineTo(right, gy);
        ctx.stroke();
    }
}

function drawWires(ctx) {
    for (const wire of state.wires) {
        const pts = wire.points || [];
        if (pts.length < 2) continue;
        const ws = WIRE_STYLES[wire.potential] || WIRE_STYLES['C1'];
        const isSelected = state.selectedIds.has(wire.id) && !state.isSimulating;

        let isEnergized = false;
        if (state.isSimulating && state.simRuntime._findRoot) {
            const r = state.simRuntime._findRoot(`${Math.round(pts[0].x)},${Math.round(pts[0].y)}`);
            isEnergized = state.simRuntime.energizedNodes.has(r);
        }

        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.setLineDash(ws.dash);

        if (isSelected) {
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 5.5;
            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
            ctx.stroke();
        }

        if (isEnergized) {
            ctx.shadowColor = ws.activeColor;
            ctx.shadowBlur = 10;
            ctx.strokeStyle = ws.activeColor;
            ctx.lineWidth = 3;
        } else {
            ctx.strokeStyle = ws.color;
            ctx.lineWidth = 2.2;
        }

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();

        if (isSelected) {
            ctx.setLineDash([]);
            for (let i = 0; i < pts.length; i++) {
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = '#2563eb';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(pts[i].x, pts[i].y, 4.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }
            for (let i = 0; i < pts.length - 1; i++) {
                const mx = (pts[i].x + pts[i + 1].x) / 2;
                const my = (pts[i].y + pts[i + 1].y) / 2;
                ctx.fillStyle = '#3b82f6';
                ctx.beginPath();
                ctx.arc(mx, my, 3.2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.restore();
    }
}

function render() {
    const canvas = document.getElementById('cad-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const isDark = state.darkMode;

    ctx.save();
    ctx.scale(dpr, dpr);

    ctx.fillStyle = isDark ? '#0b0f19' : '#f8fafc';
    ctx.fillRect(0, 0, w, h);

    ctx.translate(state.view.x, state.view.y);
    ctx.scale(state.view.zoom, state.view.zoom);

    drawGrid(ctx, w, h, isDark);
    drawWires(ctx);

    if (state.drawingWire && state.drawingWire.points.length > 0) {
        const pts = state.drawingWire.points;
        const ws = WIRE_STYLES[state.activeWirePotential] || WIRE_STYLES['C1'];
        const last = pts[pts.length - 1];
        const target = state.hoveredTerminal
            ? { x: state.hoveredTerminal.x, y: state.hoveredTerminal.y }
            : state.hoveredWirePoint
                ? { x: state.hoveredWirePoint.x, y: state.hoveredWirePoint.y }
                : { x: snapVal(state.mouseWorld.x), y: snapVal(state.mouseWorld.y) };

        ctx.save();
        ctx.strokeStyle = ws.activeColor;
        ctx.lineWidth = 2.2;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        if (target.x !== last.x && target.y !== last.y) ctx.lineTo(target.x, last.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
        ctx.restore();
    }

    if (state.hoveredWirePoint && !state.isSimulating) {
        ctx.save();
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(state.hoveredWirePoint.x, state.hoveredWirePoint.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    for (const j of computeJunctionDots()) {
        ctx.save();
        ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
        ctx.beginPath();
        ctx.arc(j.x, j.y, 3.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    for (const comp of state.components) {
        drawComponent(ctx, comp, state.selectedIds.has(comp.id));
    }

    ctx.restore();
}

function mainLoop(now) {
    if (state.isSimulating) {
        const dt = (now - (state.simRuntime.lastTick || now)) / 1000;
        state.simRuntime.lastTick = now;
        stepSimulation(dt);
        render();
    }
    requestAnimationFrame(mainLoop);
}

// =========================================================================
// EDITING ACTIONS & INSPECTOR
// =========================================================================
function generateNextTag(baseTag) {
    const match = baseTag.match(/^([A-Za-z]+)(\d*)$/);
    if (!match) return baseTag;
    const prefix = match[1];
    const used = new Set(state.components.map(c => (c.tag || '').toUpperCase()));
    let num = parseInt(match[2] || '1', 10);
    while (used.has(`${prefix}${num}`.toUpperCase())) num++;
    return `${prefix}${num}`;
}

function addComponentAt(type, wx, wy) {
    if (state.isSimulating) return;
    const def = CATALOG[type];
    if (!def) return;
    const comp = {
        id: genId('comp'),
        type,
        tag: generateNextTag(def.defaultTag),
        x: snapVal(wx),
        y: snapVal(wy),
        rotation: 0,
        closed: !!def.defaultClosed,
        step: 0,
        delay: def.defaultDelay || 3.0,
        primaryV: def.defaultPrimaryV || 230,
        secondaryV: def.defaultSecondaryV || 24,
        color: def.defaultColor || '#22c55e',
        comment: def.isLabel ? 'SECTION TITLE' : '',
        terminalLabels: {}
    };
    state.components.push(comp);
    state.selectedIds.clear();
    state.selectedIds.add(comp.id);
    pushHistory();
    updateFloatingActions();
    refreshInspectorIfOpen();
    render();
}

function rotateSelected() {
    if (state.isSimulating || state.selectedIds.size === 0) return;
    const compIds = new Set(state.components.filter(c => state.selectedIds.has(c.id)).map(c => c.id));
    if (compIds.size === 0) return;

    const attachments = captureTerminalWireAttachments(compIds);
    for (const comp of state.components) {
        if (compIds.has(comp.id)) {
            comp.rotation = (((comp.rotation || 0) + 90) % 360 + 360) % 360;
        }
    }
    applyTerminalWireAttachments(attachments, true);
    pushHistory();
    refreshInspectorIfOpen();
    render();
}

function duplicateSelected() {
    if (state.isSimulating || state.selectedIds.size === 0) return;
    const newIds = new Set();
    for (const comp of [...state.components]) {
        if (state.selectedIds.has(comp.id)) {
            const copy = JSON.parse(JSON.stringify(comp));
            copy.id = genId('comp');
            copy.x += GRID_SIZE * 2;
            copy.y += GRID_SIZE * 2;
            copy.tag = generateNextTag(comp.tag || CATALOG[comp.type].defaultTag);
            state.components.push(copy);
            newIds.add(copy.id);
        }
    }
    if (newIds.size > 0) {
        state.selectedIds = newIds;
        pushHistory();
        updateFloatingActions();
        refreshInspectorIfOpen();
        render();
    }
}

function deleteSelected() {
    if (state.isSimulating || state.selectedIds.size === 0) return;
    state.components = state.components.filter(c => !state.selectedIds.has(c.id));
    state.wires = state.wires.filter(w => !state.selectedIds.has(w.id));
    state.selectedIds.clear();
    pushHistory();
    updateFloatingActions();
    refreshInspectorIfOpen();
    render();
}

function updateFloatingActions() {
    const bar = document.getElementById('floating-quick-actions');
    if (!bar) return;
    bar.classList.toggle('hidden', state.isSimulating || state.selectedIds.size === 0);
}

function setInspectorDirty(dirty) {
    state.inspectorDirty = dirty;
    const badge = document.getElementById('prop-dirty-badge');
    const applyBtn = document.getElementById('prop-btn-apply');
    if (badge) badge.classList.toggle('hidden', !dirty);
    if (applyBtn) {
        if (dirty) {
            applyBtn.classList.remove('bg-blue-600', 'hover:bg-blue-500');
            applyBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-500', 'ring-2', 'ring-emerald-300');
        } else {
            applyBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-500', 'ring-2', 'ring-emerald-300');
            applyBtn.classList.add('bg-blue-600', 'hover:bg-blue-500');
        }
    }
}

function highlightActiveColorSwatch(colorVal) {
    document.querySelectorAll('#prop-color-swatches button').forEach(btn => {
        const isMatch = btn.dataset.color.toLowerCase() === (colorVal || '').toLowerCase();
        btn.classList.toggle('ring-2', isMatch);
        btn.classList.toggle('ring-blue-400', isMatch);
        btn.classList.toggle('scale-110', isMatch);
    });
}

function highlightActiveRotationBtn(rotVal) {
    document.querySelectorAll('.rot-btn').forEach(btn => {
        const isMatch = parseInt(btn.dataset.rot, 10) === (rotVal || 0);
        btn.classList.toggle('bg-blue-600', isMatch);
        btn.classList.toggle('text-white', isMatch);
        btn.classList.toggle('border-blue-400', isMatch);
        btn.classList.toggle('bg-slate-100', !isMatch);
        btn.classList.toggle('dark:bg-slate-800', !isMatch);
        btn.classList.toggle('text-slate-900', !isMatch);
        btn.classList.toggle('dark:text-white', !isMatch);
    });
}

function refreshInspectorIfOpen() {
    const panel = document.getElementById('properties-panel');
    if (!panel || panel.classList.contains('hidden')) return;
    populateInspector();
}

function populateInspector() {
    const emptyState = document.getElementById('prop-empty-state');
    const fields = document.getElementById('prop-fields-container');
    const footer = document.getElementById('prop-footer-actions');
    const titleEl = document.getElementById('prop-comp-type');

    setInspectorDirty(false);
    state.inspectorDraft = null;

    if (state.selectedIds.size !== 1) {
        titleEl.textContent = state.selectedIds.size > 1 ? `${state.selectedIds.size} Items Selected` : 'No Selection';
        emptyState.classList.remove('hidden');
        fields.classList.add('hidden');
        footer.classList.add('hidden');
        return;
    }

    const selId = Array.from(state.selectedIds)[0];
    const comp = state.components.find(c => c.id === selId);
    const wire = state.wires.find(w => w.id === selId);

    emptyState.classList.add('hidden');
    fields.classList.remove('hidden');
    footer.classList.remove('hidden');

    const xfmrGrp = document.getElementById('prop-xfmr-group');
    const timerGrp = document.getElementById('prop-timer-group');
    const colorGrp = document.getElementById('prop-color-group');
    const wireGrp = document.getElementById('prop-wire-group');
    const stateGrp = document.getElementById('prop-state-group');
    const rotGrp = document.getElementById('prop-rotation-group');
    const termGrp = document.getElementById('prop-terminals-group');

    if (wire) {
        state.inspectorDraft = {
            kind: 'wire',
            id: wire.id,
            tag: wire.tag || '',
            comment: wire.comment || '',
            potential: wire.potential || 'C1'
        };
        titleEl.textContent = 'Conductor Wire';
        document.getElementById('prop-tag').value = state.inspectorDraft.tag;
        document.getElementById('prop-comment').value = state.inspectorDraft.comment;
        document.getElementById('prop-wire-potential').value = state.inspectorDraft.potential;
        wireGrp.classList.remove('hidden');
        xfmrGrp.classList.add('hidden');
        timerGrp.classList.add('hidden');
        colorGrp.classList.add('hidden');
        stateGrp.classList.add('hidden');
        rotGrp.classList.add('hidden');
        termGrp.classList.add('hidden');
        return;
    }

    if (comp) {
        const def = CATALOG[comp.type];
        state.inspectorDraft = {
            kind: 'comp',
            id: comp.id,
            tag: comp.tag || '',
            comment: comp.comment || '',
            primaryV: comp.primaryV ?? def.defaultPrimaryV ?? 230,
            secondaryV: comp.secondaryV ?? def.defaultSecondaryV ?? 24,
            delay: comp.delay ?? def.defaultDelay ?? 3.0,
            color: comp.color || def.defaultColor || '#22c55e',
            closed: !!comp.closed,
            rotation: comp.rotation || 0,
            terminalLabels: JSON.parse(JSON.stringify(comp.terminalLabels || {}))
        };

        titleEl.textContent = def ? def.name : comp.type;
        document.getElementById('prop-tag').value = state.inspectorDraft.tag;
        document.getElementById('prop-comment').value = state.inspectorDraft.comment;
        wireGrp.classList.add('hidden');
        rotGrp.classList.remove('hidden');
        highlightActiveRotationBtn(state.inspectorDraft.rotation);

        xfmrGrp.classList.toggle('hidden', !(def && def.isTransformer));
        if (def && def.isTransformer) {
            document.getElementById('prop-pri-v').value = state.inspectorDraft.primaryV;
            document.getElementById('prop-sec-v').value = state.inspectorDraft.secondaryV;
        }

        const hasDelay = !!(def && def.isCoil && ['ton', 'tof', 'flasher'].includes(def.coilType));
        timerGrp.classList.toggle('hidden', !hasDelay);
        if (hasDelay) document.getElementById('prop-delay').value = state.inspectorDraft.delay;

        colorGrp.classList.toggle('hidden', !(def && def.isLamp));
        if (def && def.isLamp) highlightActiveColorSwatch(state.inspectorDraft.color);

        stateGrp.classList.toggle('hidden', !(def && (def.isSwitch || def.isOverload)));
        if (def && (def.isSwitch || def.isOverload)) {
            document.getElementById('prop-latched').checked = state.inspectorDraft.closed;
        }

        const termList = document.getElementById('prop-terminals-list');
        termList.innerHTML = '';
        if (def && def.terminals && def.terminals.length > 0) {
            termGrp.classList.remove('hidden');
            def.terminals.forEach(t => {
                const row = document.createElement('div');
                row.className = 'flex items-center justify-between gap-2';
                const lbl = document.createElement('span');
                lbl.className = 'font-mono font-bold text-slate-900 dark:text-white';
                lbl.textContent = `Pin ${t.id}:`;
                const inp = document.createElement('input');
                inp.type = 'text';
                inp.value = (state.inspectorDraft.terminalLabels && state.inspectorDraft.terminalLabels[t.id]) || t.label;
                inp.className = 'touch-target w-28 px-2.5 py-1.5 font-mono font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500';
                inp.addEventListener('input', () => {
                    if (!state.inspectorDraft) return;
                    state.inspectorDraft.terminalLabels[t.id] = inp.value;
                    setInspectorDirty(true);
                });
                inp.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        applyInspectorChanges();
                    }
                });
                row.appendChild(lbl);
                row.appendChild(inp);
                termList.appendChild(row);
            });
        } else {
            termGrp.classList.add('hidden');
        }
    }
}

function applyInspectorChanges() {
    if (!state.inspectorDraft) return;

    if (state.inspectorDraft.kind === 'wire') {
        const wire = state.wires.find(w => w.id === state.inspectorDraft.id);
        if (!wire) return;
        wire.tag = document.getElementById('prop-tag').value.trim();
        wire.comment = document.getElementById('prop-comment').value.trim();
        wire.potential = document.getElementById('prop-wire-potential').value;
    } else if (state.inspectorDraft.kind === 'comp') {
        const comp = state.components.find(c => c.id === state.inspectorDraft.id);
        if (!comp) return;
        const def = CATALOG[comp.type];
        const attachments = captureTerminalWireAttachments(new Set([comp.id]));

        comp.tag = document.getElementById('prop-tag').value.trim();
        comp.comment = document.getElementById('prop-comment').value.trim();
        comp.rotation = state.inspectorDraft.rotation;

        if (def && def.isTransformer) {
            const rawPri = parseFloat(document.getElementById('prop-pri-v').value);
            const rawSec = parseFloat(document.getElementById('prop-sec-v').value);
            comp.primaryV = Math.max(1, Number.isNaN(rawPri) ? 230 : rawPri);
            comp.secondaryV = Math.max(1, Number.isNaN(rawSec) ? 24 : rawSec);
        }
        if (def && def.isCoil && ['ton', 'tof', 'flasher'].includes(def.coilType)) {
            const rawDelay = parseFloat(document.getElementById('prop-delay').value);
            comp.delay = Math.max(0.2, Number.isNaN(rawDelay) ? 3.0 : rawDelay);
        }
        if (def && def.isLamp) {
            comp.color = state.inspectorDraft.color;
        }
        if (def && (def.isSwitch || def.isOverload)) {
            comp.closed = document.getElementById('prop-latched').checked;
            if (def.switchType === 'twostep_nonc') comp.step = comp.closed ? 2 : 0;
        }
        comp.terminalLabels = JSON.parse(JSON.stringify(state.inspectorDraft.terminalLabels || {}));
        applyTerminalWireAttachments(attachments, true);
    }

    setInspectorDirty(false);
    pushHistory();
    if (state.isSimulating) stepSimulation(0.016);
    render();
    showToast('Changes applied');
}

function setTool(toolName) {
    state.tool = toolName;
    state.drawingWire = null;
    const activeCls = 'touch-target px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400';
    const inactiveCls = 'touch-target px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white';
    document.getElementById('tool-select').className = toolName === 'select' ? activeCls : inactiveCls;
    document.getElementById('tool-wire').className = toolName === 'wire' ? activeCls : inactiveCls;
    render();
}

function zoomAtScreenPoint(factor, sx, sy) {
    const newZoom = Math.min(3.0, Math.max(0.3, state.view.zoom * factor));
    const actualFactor = newZoom / state.view.zoom;
    state.view.x = sx - (sx - state.view.x) * actualFactor;
    state.view.y = sy - (sy - state.view.y) * actualFactor;
    state.view.zoom = newZoom;
    document.getElementById('zoom-level-label').textContent = `${Math.round(newZoom * 100)}%`;
    render();
}

function fitSchematicToScreen() {
    const canvas = document.getElementById('cad-canvas');
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const vw = canvas.width / dpr;
    const vh = canvas.height / dpr;

    if (state.components.length === 0 && state.wires.length === 0) {
        state.view = { x: 80, y: 60, zoom: 1.0 };
        document.getElementById('zoom-level-label').textContent = '100%';
        render();
        return;
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const c of state.components) {
        minX = Math.min(minX, c.x - 60);
        minY = Math.min(minY, c.y - 60);
        maxX = Math.max(maxX, c.x + 80);
        maxY = Math.max(maxY, c.y + 60);
    }
    for (const w of state.wires) {
        for (const p of w.points) {
            minX = Math.min(minX, p.x);
            minY = Math.min(minY, p.y);
            maxX = Math.max(maxX, p.x);
            maxY = Math.max(maxY, p.y);
        }
    }

    const bw = Math.max(200, maxX - minX);
    const bh = Math.max(200, maxY - minY);
    const zoom = Math.min(1.3, Math.max(0.35, Math.min((vw - 80) / bw, (vh - 80) / bh)));
    state.view.zoom = zoom;
    state.view.x = (vw - bw * zoom) / 2 - minX * zoom;
    state.view.y = (vh - bh * zoom) / 2 - minY * zoom;
    document.getElementById('zoom-level-label').textContent = `${Math.round(zoom * 100)}%`;
    render();
}

// =========================================================================
// POINTER & KEYBOARD INTERACTIONS
// =========================================================================
function handleSimulationPointerDown(e, world) {
    const comp = findComponentAt(world.x, world.y);
    if (comp) {
        const def = CATALOG[comp.type];
        if (def && (def.isSwitch || def.isOverload)) {
            ensureAudioReady();
            playClickSound();
            if (def.switchType === 'twostep_nonc') {
                const nextStep = ((comp.step || 0) + 1) % 3;
                comp.step = nextStep;
                comp.closed = nextStep > 0;
            } else if (def.switchType === 'momentary_no' || def.switchType === 'momentary_nonc') {
                comp.closed = true;
                activeMomentaryComp = comp;
            } else if (def.switchType === 'momentary_nc') {
                comp.closed = false;
                activeMomentaryComp = comp;
            } else {
                comp.closed = !comp.closed;
            }
            state.simRuntime.lastTick = performance.now();
            stepSimulation(0.016);
            render();
            return true;
        }
    }
    state.panning = { startX: e.clientX - state.view.x, startY: e.clientY - state.view.y };
    return true;
}

function handleWireToolPointerDown(world, hitTerm, hitWireTap) {
    const startPt = hitTerm
        ? { x: hitTerm.x, y: hitTerm.y }
        : hitWireTap
            ? { x: hitWireTap.x, y: hitWireTap.y }
            : { x: snapVal(world.x), y: snapVal(world.y) };

    if (!state.drawingWire) {
        state.drawingWire = { points: [startPt] };
    } else {
        const pts = state.drawingWire.points;
        const last = pts[pts.length - 1];
        if (last.x !== startPt.x && last.y !== startPt.y) {
            pts.push({ x: startPt.x, y: last.y });
        }
        const prev = pts[pts.length - 1];
        if (prev.x !== startPt.x || prev.y !== startPt.y) {
            pts.push(startPt);
        }

        if (hitTerm || hitWireTap || (last.x === startPt.x && last.y === startPt.y)) {
            const cleanPts = simplifyWirePoints(pts);
            if (cleanPts.length >= 2) {
                const newWire = {
                    id: genId('wire'),
                    potential: state.activeWirePotential,
                    points: cleanPts,
                    tag: '',
                    comment: ''
                };
                state.wires.push(newWire);
                state.selectedIds.clear();
                state.selectedIds.add(newWire.id);
                pushHistory();
                updateFloatingActions();
                refreshInspectorIfOpen();
            }
            state.drawingWire = null;
        }
    }
    render();
}

function handleWireDragMove(dw, rawDx, rawDy, dx, dy) {
    const orig = dw.origPoints;
    const newPts = JSON.parse(JSON.stringify(orig));

    if (dw.mode === 'vertex') {
        const idx = dw.vertexIndex;
        const isEnd = idx === 0 || idx === orig.length - 1;
        const snapTarget = findTerminalAt(orig[idx].x + rawDx, orig[idx].y + rawDy, getHitTolerance(13, 20))
            || (isEnd ? findWireTapPointAt(orig[idx].x + rawDx, orig[idx].y + rawDy, getHitTolerance(11, 18), dw.wire.id) : null);
        const tx = snapTarget ? snapTarget.x : orig[idx].x + dx;
        const ty = snapTarget ? snapTarget.y : orig[idx].y + dy;

        newPts[idx] = { x: tx, y: ty };

        if (idx > 0 && idx < orig.length - 1) {
            const prevOrig = orig[idx - 1];
            const nextOrig = orig[idx + 1];
            if (prevOrig.x === orig[idx].x && idx - 1 > 0) newPts[idx - 1].x = tx;
            else if (prevOrig.y === orig[idx].y && idx - 1 > 0) newPts[idx - 1].y = ty;

            if (nextOrig.x === orig[idx].x && idx + 1 < orig.length - 1) newPts[idx + 1].x = tx;
            else if (nextOrig.y === orig[idx].y && idx + 1 < orig.length - 1) newPts[idx + 1].y = ty;
        }
    } else if (dw.mode === 'segment') {
        const sIdx = dw.segIndex;
        const pA = orig[sIdx];
        const pB = orig[sIdx + 1];

        if (!dw.startAnchored && !dw.endAnchored) {
            for (let i = 0; i < newPts.length; i++) {
                newPts[i].x = orig[i].x + dx;
                newPts[i].y = orig[i].y + dy;
            }
        } else {
            const isHoriz = pA.y === pB.y && pA.x !== pB.x;
            const isVert = pA.x === pB.x && pA.y !== pB.y;

            if (isHoriz) {
                newPts[sIdx].y = pA.y + dy;
                newPts[sIdx + 1].y = pB.y + dy;
                if (sIdx > 0) newPts[sIdx].x = pA.x + dx;
                if (sIdx + 1 < orig.length - 1) newPts[sIdx + 1].x = pB.x + dx;
                if (sIdx === 0 && dw.startAnchored) newPts.unshift({ x: pA.x, y: pA.y });
                if (sIdx + 1 === orig.length - 1 && dw.endAnchored) newPts.push({ x: pB.x, y: pB.y });
            } else if (isVert) {
                newPts[sIdx].x = pA.x + dx;
                newPts[sIdx + 1].x = pB.x + dx;
                if (sIdx > 0) newPts[sIdx].y = pA.y + dy;
                if (sIdx + 1 < orig.length - 1) newPts[sIdx + 1].y = pB.y + dy;
                if (sIdx === 0 && dw.startAnchored) newPts.unshift({ x: pA.x, y: pA.y });
                if (sIdx + 1 === orig.length - 1 && dw.endAnchored) newPts.push({ x: pB.x, y: pB.y });
            } else {
                if (!(sIdx === 0 && dw.startAnchored)) {
                    newPts[sIdx].x = pA.x + dx;
                    newPts[sIdx].y = pA.y + dy;
                }
                if (!(sIdx + 1 === orig.length - 1 && dw.endAnchored)) {
                    newPts[sIdx + 1].x = pB.x + dx;
                    newPts[sIdx + 1].y = pB.y + dy;
                }
            }
        }
    }

    dw.wire.points = newPts;
    if (dx !== 0 || dy !== 0) dw.moved = true;
    render();
}

function setupCanvasInteractions() {
    const canvas = document.getElementById('cad-canvas');
    const wrapper = document.getElementById('canvas-wrapper');
    const dropOverlay = document.getElementById('drop-file-overlay');
    let dragFileCounter = 0;

    wrapper.addEventListener('dragenter', (e) => {
        if (e.dataTransfer && Array.from(e.dataTransfer.types || []).includes('Files')) {
            e.preventDefault();
            dragFileCounter++;
            if (dropOverlay) dropOverlay.classList.remove('hidden');
        }
    });

    wrapper.addEventListener('dragover', (e) => {
        if (e.dataTransfer && Array.from(e.dataTransfer.types || []).includes('Files')) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        }
    });

    wrapper.addEventListener('dragleave', (e) => {
        if (e.dataTransfer && Array.from(e.dataTransfer.types || []).includes('Files')) {
            dragFileCounter = Math.max(0, dragFileCounter - 1);
            if (dragFileCounter === 0 && dropOverlay) dropOverlay.classList.add('hidden');
        }
    });

    wrapper.addEventListener('drop', (e) => {
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            e.preventDefault();
            dragFileCounter = 0;
            if (dropOverlay) dropOverlay.classList.add('hidden');
            readAndLoadJsonFile(e.dataTransfer.files[0]);
        }
    });

    canvas.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (state.drawingWire) {
            state.drawingWire = null;
            render();
        }
    });

    canvas.addEventListener('pointerdown', (e) => {
        if (isResourcesSidebarOpen()) closeResourcesSidebar();

        try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
        state.activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (state.activePointers.size === 2) {
            state.draggingComp = null;
            state.draggingWire = null;
            state.drawingWire = null;
            state.panning = null;
            const pts = Array.from(state.activePointers.values());
            const rect = canvas.getBoundingClientRect();
            const midX = (pts[0].x + pts[1].x) / 2 - rect.left;
            const midY = (pts[0].y + pts[1].y) / 2 - rect.top;
            const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
            state.pinchState = {
                initialDist: Math.max(10, dist),
                initialZoom: state.view.zoom,
                worldMidX: (midX - state.view.x) / state.view.zoom,
                worldMidY: (midY - state.view.y) / state.view.zoom
            };
            return;
        }

        if (state.activePointers.size > 2) return;

        if (e.button === 2 && state.drawingWire) {
            state.drawingWire = null;
            render();
            return;
        }

        const world = screenToWorld(e.clientX, e.clientY);
        state.mouseWorld = world;

        if (state.isSimulating) {
            handleSimulationPointerDown(e, world);
            return;
        }

        if (e.button === 1 || state.spacePressed) {
            state.panning = { startX: e.clientX - state.view.x, startY: e.clientY - state.view.y };
            return;
        }

        const hitTerm = findTerminalAt(world.x, world.y, getHitTolerance(14, 21));
        const hitWireTap = (!hitTerm && (state.tool === 'wire' || state.drawingWire))
            ? findWireTapPointAt(world.x, world.y, getHitTolerance(11, 18))
            : null;

        if (state.tool === 'wire' || hitTerm || (state.drawingWire && hitWireTap)) {
            handleWireToolPointerDown(world, hitTerm, hitWireTap);
            return;
        }

        const hitComp = findComponentAt(world.x, world.y);
        if (hitComp) {
            if (!state.selectedIds.has(hitComp.id)) {
                state.selectedIds.clear();
                state.selectedIds.add(hitComp.id);
            }

            const draggedCompIds = new Set(state.components.filter(c => state.selectedIds.has(c.id)).map(c => c.id));
            const initialCompPos = new Map();
            for (const c of state.components) {
                if (draggedCompIds.has(c.id)) initialCompPos.set(c.id, { x: c.x, y: c.y });
            }

            const attachments = captureTerminalWireAttachments(draggedCompIds);
            const initialWirePts = new Map();
            for (const att of attachments) {
                if (!initialWirePts.has(att.wireId)) {
                    const w = state.wires.find(item => item.id === att.wireId);
                    if (w) initialWirePts.set(att.wireId, JSON.parse(JSON.stringify(w.points)));
                }
            }

            state.draggingComp = {
                comp: hitComp,
                draggedCompIds,
                initialCompPos,
                attachments,
                initialWirePts,
                offsetX: world.x - hitComp.x,
                offsetY: world.y - hitComp.y,
                startX: hitComp.x,
                startY: hitComp.y,
                moved: false
            };
            updateFloatingActions();
            refreshInspectorIfOpen();
            render();
            return;
        }

        const wireHit = findWireHitDetails(world.x, world.y, getHitTolerance(11, 18));
        if (wireHit) {
            const w = wireHit.wire;
            state.selectedIds.clear();
            state.selectedIds.add(w.id);

            const allTermCoords = new Set();
            for (const c of state.components) {
                for (const t of getComponentTerminalsWorld(c)) allTermCoords.add(`${t.x},${t.y}`);
            }
            const pts = w.points;
            const startAnchored = pts.length > 0 && allTermCoords.has(`${Math.round(pts[0].x)},${Math.round(pts[0].y)}`);
            const endAnchored = pts.length > 1 && allTermCoords.has(`${Math.round(pts[pts.length - 1].x)},${Math.round(pts[pts.length - 1].y)}`);

            let workingPts = JSON.parse(JSON.stringify(pts));
            let activeSeg = wireHit.segIndex;

            if (wireHit.hitType === 'segment' && workingPts.length === 2 && (startAnchored || endAnchored)) {
                const p0 = workingPts[0];
                const p1 = workingPts[1];
                const midX = snapVal((p0.x + p1.x) / 2);
                const midY = snapVal((p0.y + p1.y) / 2);
                if (p0.x === p1.x) {
                    workingPts = [{ x: p0.x, y: p0.y }, { x: p0.x, y: midY }, { x: p1.x, y: midY }, { x: p1.x, y: p1.y }];
                    activeSeg = 1;
                } else if (p0.y === p1.y) {
                    workingPts = [{ x: p0.x, y: p0.y }, { x: midX, y: p0.y }, { x: midX, y: p1.y }, { x: p1.x, y: p1.y }];
                    activeSeg = 1;
                }
                w.points = JSON.parse(JSON.stringify(workingPts));
            }

            state.draggingWire = {
                wire: w,
                mode: wireHit.hitType,
                vertexIndex: wireHit.vertexIndex,
                segIndex: activeSeg,
                startWorld: { x: world.x, y: world.y },
                origPoints: workingPts,
                startAnchored,
                endAnchored,
                moved: false
            };

            updateFloatingActions();
            refreshInspectorIfOpen();
            render();
            return;
        }

        state.selectedIds.clear();
        updateFloatingActions();
        refreshInspectorIfOpen();
        state.panning = { startX: e.clientX - state.view.x, startY: e.clientY - state.view.y };
        render();
    });

    canvas.addEventListener('pointermove', (e) => {
        if (state.activePointers.has(e.pointerId)) {
            state.activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        }

        if (state.activePointers.size === 2 && state.pinchState) {
            const pts = Array.from(state.activePointers.values());
            const rect = canvas.getBoundingClientRect();
            const midX = (pts[0].x + pts[1].x) / 2 - rect.left;
            const midY = (pts[0].y + pts[1].y) / 2 - rect.top;
            const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
            const newZoom = Math.min(3.0, Math.max(0.3, state.pinchState.initialZoom * (dist / state.pinchState.initialDist)));

            state.view.zoom = newZoom;
            state.view.x = midX - state.pinchState.worldMidX * newZoom;
            state.view.y = midY - state.pinchState.worldMidY * newZoom;
            document.getElementById('zoom-level-label').textContent = `${Math.round(newZoom * 100)}%`;
            render();
            return;
        }

        const world = screenToWorld(e.clientX, e.clientY);
        state.mouseWorld = world;
        document.getElementById('status-coords').textContent = `X: ${Math.round(world.x)}, Y: ${Math.round(world.y)}`;

        state.hoveredTerminal = findTerminalAt(world.x, world.y, getHitTolerance(13, 20));
        state.hoveredWirePoint = (!state.hoveredTerminal && (state.tool === 'wire' || state.drawingWire))
            ? findWireTapPointAt(world.x, world.y, getHitTolerance(11, 18))
            : null;

        if (state.draggingComp && !state.isSimulating) {
            const nx = snapVal(world.x - state.draggingComp.offsetX);
            const ny = snapVal(world.y - state.draggingComp.offsetY);
            const dx = nx - state.draggingComp.startX;
            const dy = ny - state.draggingComp.startY;

            if (nx !== state.draggingComp.comp.x || ny !== state.draggingComp.comp.y) {
                for (const c of state.components) {
                    if (state.draggingComp.draggedCompIds.has(c.id)) {
                        const init = state.draggingComp.initialCompPos.get(c.id);
                        if (init) {
                            c.x = init.x + dx;
                            c.y = init.y + dy;
                        }
                    }
                }
                for (const [wireId, origPts] of state.draggingComp.initialWirePts.entries()) {
                    const w = state.wires.find(item => item.id === wireId);
                    if (w) w.points = JSON.parse(JSON.stringify(origPts));
                }
                applyTerminalWireAttachments(state.draggingComp.attachments, false);
                state.draggingComp.moved = true;
            }
            render();
            return;
        }

        if (state.draggingWire && !state.isSimulating) {
            const dw = state.draggingWire;
            const rawDx = world.x - dw.startWorld.x;
            const rawDy = world.y - dw.startWorld.y;
            const dx = state.snapToGrid ? Math.round(rawDx / GRID_SIZE) * GRID_SIZE : Math.round(rawDx);
            const dy = state.snapToGrid ? Math.round(rawDy / GRID_SIZE) * GRID_SIZE : Math.round(rawDy);
            handleWireDragMove(dw, rawDx, rawDy, dx, dy);
            return;
        }

        if (state.panning) {
            state.view.x = e.clientX - state.panning.startX;
            state.view.y = e.clientY - state.panning.startY;
            render();
            return;
        }

        if (state.drawingWire || state.hoveredTerminal || state.hoveredWirePoint) {
            render();
        }
    });

    function handlePointerRelease(e) {
        try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}
        state.activePointers.delete(e.pointerId);
        if (state.activePointers.size < 2) state.pinchState = null;

        if (activeMomentaryComp) {
            const def = CATALOG[activeMomentaryComp.type];
            if (def) {
                if (def.switchType === 'momentary_no' || def.switchType === 'momentary_nonc') activeMomentaryComp.closed = false;
                else if (def.switchType === 'momentary_nc') activeMomentaryComp.closed = true;
            }
            activeMomentaryComp = null;
            if (state.isSimulating) stepSimulation(0.016);
            render();
        }

        if (state.draggingComp) {
            if (state.draggingComp.moved) {
                for (const att of state.draggingComp.attachments) {
                    const w = state.wires.find(item => item.id === att.wireId);
                    if (w) w.points = simplifyWirePoints(w.points);
                }
                pushHistory();
            }
            state.draggingComp = null;
            render();
        }

        if (state.draggingWire) {
            if (state.draggingWire.moved) {
                state.draggingWire.wire.points = simplifyWirePoints(state.draggingWire.wire.points);
                pushHistory();
            } else {
                state.draggingWire.wire.points = simplifyWirePoints(state.draggingWire.wire.points);
            }
            state.draggingWire = null;
            render();
        }

        state.panning = null;
    }

    canvas.addEventListener('pointerup', handlePointerRelease);
    canvas.addEventListener('pointercancel', handlePointerRelease);

    canvas.addEventListener('dblclick', () => {
        if (state.drawingWire && state.drawingWire.points.length >= 2) {
            const cleanPts = simplifyWirePoints(state.drawingWire.points);
            if (cleanPts.length >= 2) {
                const newWire = {
                    id: genId('wire'),
                    potential: state.activeWirePotential,
                    points: cleanPts,
                    tag: '',
                    comment: ''
                };
                state.wires.push(newWire);
                state.selectedIds.clear();
                state.selectedIds.add(newWire.id);
                pushHistory();
                updateFloatingActions();
                refreshInspectorIfOpen();
            }
            state.drawingWire = null;
            render();
        }
    });

    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        zoomAtScreenPoint(e.deltaY < 0 ? 1.12 : 0.89, e.clientX - rect.left, e.clientY - rect.top);
    }, { passive: false });
}

// =========================================================================
// PALETTE & UI INITIALIZATION
// =========================================================================
function getSymbolMiniIcon(type) {
    const stroke = 'currentColor';
    if (type === 'transformer_ac') {
        return `<svg class="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><circle cx="9" cy="9" r="3.5"/><circle cx="15" cy="9" r="3.5"/><path d="M5 12h14"/><circle cx="9" cy="15" r="3.5"/><circle cx="15" cy="15" r="3.5"/></svg>`;
    }
    if (type === 'diode') {
        return `<svg class="w-6 h-6 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><path d="M12 3v6m0 6v6M7 15h10M7 9h10l-5 6-5-6z"/></svg>`;
    }
    if (type.startsWith('supply') || type === 'terminal_pe') {
        return `<svg class="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;
    }
    if (type.startsWith('mcb') || type.startsWith('fuse') || type === 'overload_relay') {
        return `<svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><path d="M12 2v6m0 14v-6m0 0l-5-7"/></svg>`;
    }
    if (type.startsWith('pb_') || type === 'estop_nc' || type === 'switch_toggle' || type === 'limit_switch') {
        return `<svg class="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><path d="M12 2v6m0 14v-6m0 0l-4-7M4 12h4"/></svg>`;
    }
    if (type.startsWith('coil')) {
        return `<svg class="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><path d="M12 2v5m0 15v-5"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>`;
    }
    if (type.startsWith('aux_') || type.startsWith('contact_')) {
        return `<svg class="w-6 h-6 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><path d="M12 2v6m0 14v-6m0 0l-4-7"/></svg>`;
    }
    if (type.startsWith('contactor_')) {
        return `<svg class="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><path d="M7 2v5m5-5v5m5-5v5M7 22v-5m5 5v-5m5 5v-5M7 17l-3-8m8 8l-3-8m8 8l-3-8"/></svg>`;
    }
    if (type.startsWith('motor_')) {
        return `<svg class="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><circle cx="12" cy="12" r="8"/><text x="12" y="15" text-anchor="middle" font-size="9" font-weight="bold" fill="currentColor" stroke="none">M</text></svg>`;
    }
    if (type === 'pilot_lamp') {
        return `<svg class="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><circle cx="12" cy="12" r="7"/><path d="M8 8l8 8M16 8l-8 8"/></svg>`;
    }
    if (type === 'buzzer') {
        return `<svg class="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><rect x="7" y="7" width="10" height="10"/></svg>`;
    }
    return `<svg class="w-6 h-6 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2"><path d="M4 6h16M4 12h10"/></svg>`;
}

function buildPalette(filterText = '') {
    const container = document.getElementById('palette-container');
    container.innerHTML = '';
    const q = filterText.trim().toLowerCase();

    for (const cat of COMPONENT_CATEGORIES) {
        const items = Object.entries(CATALOG).filter(([_, def]) => {
            if (def.cat !== cat.id) return false;
            if (!q) return true;
            return def.name.toLowerCase().includes(q) || def.defaultTag.toLowerCase().includes(q);
        });
        if (items.length === 0) continue;

        const sec = document.createElement('div');
        sec.className = 'space-y-1.5';

        const hdr = document.createElement('div');
        hdr.className = 'text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1';
        hdr.textContent = cat.name;
        sec.appendChild(hdr);

        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 gap-1.5';

        for (const [typeKey, def] of items) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'touch-target flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80 text-left transition active:scale-[0.98]';
            btn.innerHTML = `
                <div class="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                    ${getSymbolMiniIcon(typeKey)}
                </div>
                <div class="min-w-0 flex-1">
                    <div class="text-xs font-semibold text-slate-900 dark:text-white truncate">${def.name}</div>
                    <div class="text-[10px] font-mono text-slate-500 dark:text-slate-400">Tag: ${def.defaultTag}</div>
                </div>
            `;
            btn.addEventListener('click', () => {
                if (state.isSimulating) return;
                const canvas = document.getElementById('cad-canvas');
                const rect = canvas.getBoundingClientRect();
                const center = screenToWorld(rect.left + rect.width / 2, rect.top + rect.height / 2);
                addComponentAt(typeKey, center.x, center.y);
                setTool('select');
                closeResourcesSidebar();
            });
            grid.appendChild(btn);
        }

        sec.appendChild(grid);
        container.appendChild(sec);
    }
}

function updateStatusCounts() {
    const el = document.getElementById('status-counts');
    if (el) {
        el.textContent = `Components: ${state.components.length} · Wires: ${state.wires.length}`;
    }
}

function resizeCanvas() {
    const canvas = document.getElementById('cad-canvas');
    const wrapper = document.getElementById('canvas-wrapper');
    if (!canvas || !wrapper) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = wrapper.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    render();
}

function initUI() {
    document.getElementById('btn-launch-app').addEventListener('click', () => {
        ensureAudioReady();
        const launch = document.getElementById('launch-screen');
        launch.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => launch.classList.add('hidden'), 300);
        resizeCanvas();
        fitSchematicToScreen();
    });

    document.getElementById('btn-toggle-sidebar').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleResourcesSidebar();
    });

    const sidebarBackdrop = document.getElementById('sidebar-backdrop');
    if (sidebarBackdrop) {
        sidebarBackdrop.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeResourcesSidebar();
        });
    }

    document.addEventListener('pointerdown', (e) => {
        if (!isResourcesSidebarOpen()) return;
        const sidebar = document.getElementById('left-sidebar');
        const toggleBtn = document.getElementById('btn-toggle-sidebar');
        if (sidebar && !sidebar.contains(e.target) && (!toggleBtn || !toggleBtn.contains(e.target))) {
            closeResourcesSidebar();
        }
    }, true);

    document.getElementById('palette-search').addEventListener('input', (e) => {
        buildPalette(e.target.value);
    });

    document.getElementById('btn-sim-toggle').addEventListener('click', () => {
        if (state.isSimulating) stopSimulation();
        else startSimulation();
    });

    document.getElementById('tool-select').addEventListener('click', () => setTool('select'));
    document.getElementById('tool-wire').addEventListener('click', () => setTool('wire'));

    document.getElementById('wire-color-select').addEventListener('change', (e) => {
        state.activeWirePotential = e.target.value;
    });

    document.getElementById('btn-undo').addEventListener('click', undo);
    document.getElementById('btn-redo').addEventListener('click', redo);
    document.getElementById('btn-mob-undo').addEventListener('click', undo);
    document.getElementById('btn-mob-redo').addEventListener('click', redo);

    document.getElementById('btn-rotate').addEventListener('click', rotateSelected);
    document.getElementById('btn-duplicate').addEventListener('click', duplicateSelected);
    document.getElementById('btn-delete').addEventListener('click', deleteSelected);
    document.getElementById('mob-rotate').addEventListener('click', rotateSelected);
    document.getElementById('mob-duplicate').addEventListener('click', duplicateSelected);
    document.getElementById('mob-delete').addEventListener('click', deleteSelected);

    const fileMenu = document.getElementById('menu-file');
    document.getElementById('btn-file-menu').addEventListener('click', (e) => {
        e.stopPropagation();
        fileMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', () => fileMenu.classList.add('hidden'));

    document.getElementById('btn-export-json').addEventListener('click', () => {
        fileMenu.classList.add('hidden');
        exportSchematicToFile();
    });

    document.getElementById('btn-import-json').addEventListener('click', () => {
        fileMenu.classList.add('hidden');
        triggerImportFromFileExplorer();
    });

    document.getElementById('json-file-input').addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) readAndLoadJsonFile(file);
    });

    document.getElementById('btn-clear-canvas').addEventListener('click', () => {
        if (state.isSimulating) stopSimulation();
        state.components = [];
        state.wires = [];
        state.selectedIds.clear();
        pushHistory();
        updateFloatingActions();
        refreshInspectorIfOpen();
        render();
        showToast('Canvas cleared');
    });

    document.getElementById('btn-grid-toggle').addEventListener('click', () => {
        state.snapToGrid = !state.snapToGrid;
        render();
    });

    document.getElementById('btn-fit-view').addEventListener('click', fitSchematicToScreen);
    document.getElementById('btn-mob-fit').addEventListener('click', fitSchematicToScreen);

    document.getElementById('btn-zoom-in').addEventListener('click', () => {
        const canvas = document.getElementById('cad-canvas');
        const rect = canvas.getBoundingClientRect();
        zoomAtScreenPoint(1.2, rect.width / 2, rect.height / 2);
    });
    document.getElementById('btn-zoom-out').addEventListener('click', () => {
        const canvas = document.getElementById('cad-canvas');
        const rect = canvas.getBoundingClientRect();
        zoomAtScreenPoint(0.83, rect.width / 2, rect.height / 2);
    });

    document.getElementById('btn-sound-toggle').addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        document.getElementById('icon-sound-on').classList.toggle('hidden', !state.soundEnabled);
        document.getElementById('icon-sound-off').classList.toggle('hidden', state.soundEnabled);
        if (!state.soundEnabled) setBuzzerSound(false);
    });

    document.getElementById('btn-theme-toggle').addEventListener('click', () => {
        state.darkMode = !state.darkMode;
        document.documentElement.classList.toggle('dark', state.darkMode);
        render();
    });

    document.getElementById('btn-close-alert').addEventListener('click', () => {
        document.getElementById('alert-banner').classList.add('hidden');
        stopSimulation();
    });

    const propsPanel = document.getElementById('properties-panel');
    document.getElementById('btn-toggle-inspector').addEventListener('click', () => {
        propsPanel.classList.toggle('hidden');
        propsPanel.classList.toggle('flex');
        if (!propsPanel.classList.contains('hidden')) populateInspector();
        resizeCanvas();
    });
    document.getElementById('btn-close-props').addEventListener('click', () => {
        propsPanel.classList.add('hidden');
        propsPanel.classList.remove('flex');
        resizeCanvas();
    });

    ['prop-tag', 'prop-comment', 'prop-delay', 'prop-pri-v', 'prop-sec-v'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('input', () => {
            if (state.inspectorDraft) setInspectorDirty(true);
        });
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                applyInspectorChanges();
            }
        });
    });

    document.getElementById('prop-wire-potential').addEventListener('change', () => {
        if (state.inspectorDraft) setInspectorDirty(true);
    });

    document.getElementById('prop-latched').addEventListener('change', () => {
        if (state.inspectorDraft) setInspectorDirty(true);
    });

    document.querySelectorAll('#prop-color-swatches button').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!state.inspectorDraft) return;
            state.inspectorDraft.color = btn.dataset.color;
            highlightActiveColorSwatch(btn.dataset.color);
            setInspectorDirty(true);
        });
    });

    document.querySelectorAll('.rot-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!state.inspectorDraft) return;
            const rot = parseInt(btn.dataset.rot, 10);
            state.inspectorDraft.rotation = rot;
            highlightActiveRotationBtn(rot);
            setInspectorDirty(true);
        });
    });

    document.getElementById('prop-btn-apply').addEventListener('click', applyInspectorChanges);
    document.getElementById('prop-btn-reset').addEventListener('click', () => {
        populateInspector();
        showToast('Draft reverted');
    });

    document.getElementById('prop-btn-dup').addEventListener('click', duplicateSelected);
    document.getElementById('prop-btn-del').addEventListener('click', deleteSelected);

    window.addEventListener('keydown', (e) => {
        const tag = (e.target && e.target.tagName) || '';
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;

        if (e.code === 'Space') {
            state.spacePressed = true;
            return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
            e.preventDefault();
            if (e.shiftKey) redo();
            else undo();
            return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
            e.preventDefault();
            redo();
            return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
            e.preventDefault();
            duplicateSelected();
            return;
        }
        if (e.key === 'Delete' || e.key === 'Backspace') {
            deleteSelected();
        } else if (e.key.toLowerCase() === 'r') {
            rotateSelected();
        } else if (e.key.toLowerCase() === 'v') {
            setTool('select');
        } else if (e.key.toLowerCase() === 'w') {
            setTool('wire');
        } else if (e.key === 'Escape') {
            if (isResourcesSidebarOpen()) closeResourcesSidebar();
            if (state.drawingWire) {
                state.drawingWire = null;
                render();
            } else {
                state.selectedIds.clear();
                updateFloatingActions();
                refreshInspectorIfOpen();
                render();
            }
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.code === 'Space') state.spacePressed = false;
    });

    window.addEventListener('resize', resizeCanvas);
}

buildPalette();
pushHistory();
initUI();
setupCanvasInteractions();
resizeCanvas();
requestAnimationFrame(mainLoop);
