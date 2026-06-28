import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────
   CARD 1 — Diagnostic Shuffler (GNSS Subsystems)
   3 stacked cards rotating every 3 s with spring bounce
───────────────────────────────────────────────────── */
const subsystems = [
  {
    label: 'RF FRONT-END',
    status: 'NOMINAL',
    value: '-94 dBm',
    detail: 'NavIC L5 · GPS L1/L2 · GLONASS',
    color: '#E63B2E',
  },
  {
    label: 'SIGNAL PROCESSOR',
    status: 'LOCKED',
    value: '18 SVs',
    detail: 'DOP: 0.8 · SNR: 42 dB · Fix: 3D',
    color: '#4ade80',
  },
  {
    label: 'PX4 INTERFACE',
    status: 'TX/RX',
    value: '5 Hz',
    detail: 'uBlox F9P · UART2 · MAVLink',
    color: '#facc15',
  },
];

const DiagnosticShuffler = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((p) => (p + 1) % subsystems.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-56 h-48 shrink-0 select-none" style={{ perspective: '800px' }}>
      {subsystems.map((sys, i) => {
        const offset = (i - active + subsystems.length) % subsystems.length;
        const isTop = offset === 0;
        const zIdx = subsystems.length - offset;
        const translateY = offset * 14;
        const scale = 1 - offset * 0.06;
        const opacity = offset > 1 ? 0 : 1 - offset * 0.4;

        return (
          <div
            key={sys.label}
            className="absolute inset-0 rounded-2xl border border-paper/15 bg-[#111] p-4 flex flex-col justify-between"
            style={{
              zIndex: zIdx,
              transform: `translateY(${translateY}px) scale(${scale})`,
              opacity,
              transition: 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease',
              transformOrigin: 'center top',
              boxShadow: isTop ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9px] text-paper/40 tracking-widest uppercase">
                {sys.label}
              </span>
              <span
                className="font-mono text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full"
                style={{ color: sys.color, background: sys.color + '22' }}
              >
                {sys.status}
              </span>
            </div>
            <div
              className="font-mono font-bold text-3xl leading-none mb-1"
              style={{ color: sys.color }}
            >
              {sys.value}
            </div>
            <div className="font-mono text-[9px] text-paper/35 leading-relaxed">
              {sys.detail}
            </div>
          </div>
        );
      })}

      {/* Dot indicators */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        {subsystems.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ background: i === active ? '#E63B2E' : 'rgba(255,255,255,0.2)' }}
          />
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   CARD 2 — Telemetry Typewriter (WiFi Sensor Logs)
   Character-by-character terminal feed with live cursor
───────────────────────────────────────────────────── */
const LOG_LINES = [
  '> BOOT  ESP8266 NodeMCU v3.1',
  '> INIT  WiFi stack ... OK',
  '> CONN  SSID "IOT_NET_5G" ... ACK',
  '> IP    192.168.1.42 assigned',
  '> SENS  BME280 temp=28.4°C hum=61%',
  '> TX    payload 48B → MQTT broker',
  '> BATT  Li-ion 3.84V (82%) nominal',
  '> SLEEP entering deep-sleep 30s ...',
  '> WAKE  RTC alarm triggered',
  '> SENS  BME280 temp=28.6°C hum=60%',
];

const TelemetryTypewriter = () => {
  const [lines, setLines] = useState(['']);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [blink, setBlink] = useState(true);
  const termRef = useRef(null);

  useEffect(() => {
    const blinkId = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(blinkId);
  }, []);

  useEffect(() => {
    if (lineIdx >= LOG_LINES.length) {
      // restart loop after 1.8 s pause
      const restartId = setTimeout(() => {
        setLines(['']);
        setLineIdx(0);
        setCharIdx(0);
      }, 1800);
      return () => clearTimeout(restartId);
    }

    const currentLine = LOG_LINES[lineIdx];

    if (charIdx < currentLine.length) {
      const id = setTimeout(() => {
        setLines((prev) => {
          const next = [...prev];
          next[lineIdx] = currentLine.slice(0, charIdx + 1);
          return next;
        });
        setCharIdx((c) => c + 1);
      }, 28 + Math.random() * 20);
      return () => clearTimeout(id);
    } else {
      // line done — pause then advance
      const id = setTimeout(() => {
        setLines((prev) => [...prev, '']);
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, 260);
      return () => clearTimeout(id);
    }
  }, [lineIdx, charIdx]);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="w-64 rounded-2xl overflow-hidden border border-paper/15 shrink-0 bg-[#0a0a0a]">
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] border-b border-paper/10">
        <div className="w-2.5 h-2.5 rounded-full bg-[#E63B2E]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#facc15]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#4ade80]" />
        <div className="flex-1 text-center">
          <span className="font-mono text-[9px] text-paper/30 tracking-widest">SENSOR_TELEMETRY.log</span>
        </div>
        {/* Live indicator */}
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#E63B2E] animate-pulse" />
          <span className="font-mono text-[8px] text-[#E63B2E] font-bold tracking-widest">LIVE</span>
        </div>
      </div>

      {/* Log output */}
      <div
        ref={termRef}
        className="h-44 overflow-hidden p-3 font-mono text-[10px] leading-5 text-[#4ade80]/80 space-y-0.5 flex flex-col"
        style={{ scrollBehavior: 'auto' }}
      >
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre">
            {line}
            {i === lines.length - 1 && (
              <span
                className="inline-block w-[5px] h-[11px] bg-[#4ade80] ml-0.5 align-middle"
                style={{ opacity: blink ? 1 : 0, transition: 'opacity 0.1s' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   CARD 3 — Execution Flow Scheduler (ESP32 Core Grid)
   Weekly grid, animated cursor, click to highlight tasks
───────────────────────────────────────────────────── */
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const TASKS = [
  { id: 'wifi', label: 'WiFi TX', col: 0, row: 0, span: 2, color: '#E63B2E' },
  { id: 'mqtt', label: 'MQTT', col: 2, row: 0, span: 1, color: '#facc15' },
  { id: 'ble',  label: 'BLE HID', col: 3, row: 0, span: 2, color: '#818cf8' },
  { id: 'sens', label: 'Sensors', col: 0, row: 1, span: 1, color: '#4ade80' },
  { id: 'dma',  label: 'DMA', col: 1, row: 1, span: 2, color: '#fb923c' },
  { id: 'ota',  label: 'OTA', col: 3, row: 1, span: 1, color: '#22d3ee' },
  { id: 'idle', label: 'Idle', col: 4, row: 1, span: 1, color: '#6b7280' },
];

const ExecutionFlowScheduler = () => {
  const [activeTask, setActiveTask] = useState(null);
  const [cursorCol, setCursorCol] = useState(0);

  // Animate cursor sweep
  useEffect(() => {
    let col = 0;
    const id = setInterval(() => {
      col = (col + 1) % DAYS.length;
      setCursorCol(col);
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-60 shrink-0 select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="font-mono text-[9px] text-paper/40 tracking-widest uppercase">ESP32 Dual-Core Schedule</span>
        <span className="font-mono text-[8px] text-[#E63B2E] font-bold">CORE_0 / CORE_1</span>
      </div>

      {/* Day columns header */}
      <div className="grid grid-cols-5 gap-1 mb-1 px-1">
        {DAYS.map((d, i) => (
          <div
            key={d}
            className="text-center font-mono text-[8px] py-0.5 rounded transition-all duration-300"
            style={{
              color: i === cursorCol ? '#E63B2E' : 'rgba(255,255,255,0.25)',
              fontWeight: i === cursorCol ? 'bold' : 'normal',
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid rows (Core 0 / Core 1) */}
      {[0, 1].map((row) => (
        <div key={row} className="grid grid-cols-5 gap-1 mb-1 px-1">
          {DAYS.map((_, col) => {
            const task = TASKS.find((t) => t.col === col && t.row === row);
            const isActive = task && activeTask === task.id;
            const isCursorCol = col === cursorCol;

            if (!task) {
              return (
                <div
                  key={col}
                  className="h-9 rounded-lg border border-paper/5 transition-colors duration-300"
                  style={{ background: isCursorCol ? 'rgba(255,255,255,0.04)' : 'transparent' }}
                />
              );
            }

            return (
              <button
                key={col}
                onClick={() => setActiveTask(isActive ? null : task.id)}
                className="h-9 rounded-lg border flex items-center justify-center transition-all duration-300"
                style={{
                  background: isActive ? task.color + '33' : isCursorCol ? task.color + '18' : task.color + '12',
                  borderColor: isActive ? task.color + 'aa' : isCursorCol ? task.color + '55' : task.color + '25',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: isActive ? `0 0 12px ${task.color}44` : 'none',
                }}
              >
                <span
                  className="font-mono text-[8px] font-bold leading-none"
                  style={{ color: task.color }}
                >
                  {task.label}
                </span>
              </button>
            );
          })}
        </div>
      ))}

      {/* Active task detail */}
      <div
        className="mt-2 px-3 py-2 rounded-xl border border-paper/10 font-mono text-[9px] text-paper/50 text-center transition-all duration-300"
        style={{ minHeight: '32px', background: 'rgba(255,255,255,0.03)' }}
      >
        {activeTask
          ? (() => {
              const t = TASKS.find((t) => t.id === activeTask);
              return (
                <span style={{ color: t?.color }}>
                  ● {t?.label} — active on Core {t?.row}
                </span>
              );
            })()
          : 'Click a task to inspect'}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   CARD 4 — BLE HID Motion Tracker (IMU Mouse)
   Live coordinate canvas showing drift path + click flash
───────────────────────────────────────────────────── */
const BLEMotionTracker = () => {
  const canvasRef = useRef(null);
  const posRef = useRef({ x: 112, y: 90 });
  const pathRef = useRef([{ x: 112, y: 90 }]);
  const rafRef = useRef(null);
  const velRef = useRef({ x: 0.8, y: 0.5 });
  const [click, setClick] = useState(false);
  const [coords, setCoords] = useState({ x: 112, y: 90 });
  const [packet, setPacket] = useState(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    // Smooth drift with slight random walk
    velRef.current.x += (Math.random() - 0.5) * 0.4;
    velRef.current.y += (Math.random() - 0.5) * 0.4;
    velRef.current.x = Math.max(-2.5, Math.min(2.5, velRef.current.x));
    velRef.current.y = Math.max(-2.5, Math.min(2.5, velRef.current.y));

    const next = {
      x: Math.max(6, Math.min(W - 6, posRef.current.x + velRef.current.x)),
      y: Math.max(6, Math.min(H - 6, posRef.current.y + velRef.current.y)),
    };

    // Bounce off walls
    if (next.x <= 6 || next.x >= W - 6) velRef.current.x *= -1;
    if (next.y <= 6 || next.y >= H - 6) velRef.current.y *= -1;

    posRef.current = next;
    pathRef.current.push({ ...next });
    if (pathRef.current.length > 80) pathRef.current.shift();

    setCoords({ x: Math.round(next.x * 10), y: Math.round(next.y * 10) });
    setPacket((p) => p + 1);

    // Draw
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 0.5;
    for (let gx = 0; gx < W; gx += 20) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
    }
    for (let gy = 0; gy < H; gy += 20) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
    }

    // Trail gradient
    const path = pathRef.current;
    for (let k = 1; k < path.length; k++) {
      const alpha = (k / path.length) * 0.6;
      ctx.beginPath();
      ctx.moveTo(path[k - 1].x, path[k - 1].y);
      ctx.lineTo(path[k].x, path[k].y);
      ctx.strokeStyle = `rgba(230,59,46,${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Cursor dot
    const grd = ctx.createRadialGradient(next.x, next.y, 0, next.x, next.y, 14);
    grd.addColorStop(0, 'rgba(230,59,46,0.7)');
    grd.addColorStop(1, 'rgba(230,59,46,0)');
    ctx.beginPath();
    ctx.arc(next.x, next.y, 14, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(next.x, next.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#E63B2E';
    ctx.fill();

    // Crosshairs
    ctx.strokeStyle = 'rgba(230,59,46,0.3)';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(next.x, 0); ctx.lineTo(next.x, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, next.y); ctx.lineTo(W, next.y); ctx.stroke();
    ctx.setLineDash([]);

    rafRef.current = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 30);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      clearTimeout(rafRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  // Periodic simulated BLE click
  useEffect(() => {
    const id = setInterval(() => {
      setClick(true);
      setTimeout(() => setClick(false), 180);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-60 shrink-0">
      {/* Canvas */}
      <div
        className="relative rounded-2xl overflow-hidden border border-paper/15"
        style={{ background: '#080808' }}
      >
        <canvas ref={canvasRef} width={224} height={140} className="block" />

        {/* Click flash overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-100"
          style={{ background: 'rgba(230,59,46,0.15)', opacity: click ? 1 : 0 }}
        />

        {/* BLE label */}
        <div className="absolute top-2 left-2 flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#818cf8] animate-pulse" />
          <span className="font-mono text-[8px] text-[#818cf8] font-bold tracking-widest">BLE HID</span>
        </div>

        {/* Click badge */}
        <div
          className="absolute top-2 right-2 font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-full transition-all duration-150"
          style={{
            background: click ? 'rgba(230,59,46,0.4)' : 'rgba(255,255,255,0.06)',
            color: click ? '#E63B2E' : 'rgba(255,255,255,0.25)',
            border: `1px solid ${click ? '#E63B2E55' : 'transparent'}`,
          }}
        >
          CLICK
        </div>
      </div>

      {/* Telemetry row */}
      <div className="mt-2 flex items-center justify-between px-1">
        <span className="font-mono text-[9px] text-paper/30">
          X: <span className="text-[#E63B2E]">{coords.x}</span>
          {' '}Y: <span className="text-[#E63B2E]">{coords.y}</span>
        </span>
        <span className="font-mono text-[9px] text-paper/30">
          PKT #{String(packet % 9999).padStart(4, '0')}
        </span>
        <span className="font-mono text-[9px] text-[#4ade80]">125 Hz</span>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────── */

const projects = [
  {
    number: '01',
    subtitle: 'NavIC-Enabled GNSS Module — PX4 Compatible',
    title: 'Precision Navigation System',
    description:
      'Multi-constellation GNSS module engineered for PX4-based flight systems with NavIC support. Covers RF front-end conditioning and complete GNSS signal processing.',
    tags: ['RF Design', 'NavIC', 'PX4', 'GNSS'],
    Visual: DiagnosticShuffler,
  },
  {
    number: '02',
    subtitle: 'ESP8266 Standalone Breakout Board',
    title: 'Battery-Powered WiFi Node',
    description:
      'Self-sustained ESP8266 system designed to operate independently using Li-ion power without any USB dependency. Purpose-built for wireless sensor deployments.',
    tags: ['ESP8266', 'Li-ion', 'WiFi', 'Power Design'],
    Visual: TelemetryTypewriter,
  },
  {
    number: '03',
    subtitle: 'ESP32 4-Layer IoT Board',
    title: 'High-Performance IoT Core',
    description:
      '4-layer embedded system board optimized for signal integrity and reliable communication. Handles signal routing, power distribution, and multi-peripheral integration.',
    tags: ['ESP32', '4-Layer PCB', 'Signal Integrity', 'IoT'],
    Visual: ExecutionFlowScheduler,
  },
  {
    number: '04',
    subtitle: 'IMU-Based Mouse Gun System — BLE HID',
    title: 'Motion-Controlled Interaction',
    description:
      'IMU-driven BLE HID system that translates physical motion into real-time cursor control. Covers data acquisition, motion mapping, and BLE HID transmission.',
    tags: ['IMU', 'BLE HID', 'Embedded', 'Motion Capture'],
    Visual: BLEMotionTracker,
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      const totalScroll = track.scrollWidth - window.innerWidth;

      // Horizontal scroll
      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Progress bar — connected to the same scroll range
      gsap.to('#projects-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden bg-black"
      style={{ height: '100vh' }}
    >
      {/* Sticky label */}
      <div className="absolute top-8 left-8 md:left-16 z-20 pointer-events-none">
        <div className="font-mono text-signal text-[10px] font-bold uppercase tracking-widest">
          ● Selected Projects
        </div>
      </div>

      {/* Slide count */}
      <div className="absolute top-8 right-8 md:right-16 z-20 pointer-events-none">
        <div className="font-mono text-paper/30 text-[10px] uppercase tracking-widest">
          {projects.length} Systems
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
        style={{ width: `${projects.length * 100}vw` }}
      >
        {projects.map((project, i) => {
          const { Visual } = project;
          return (
            <div
              key={project.number}
              className="relative h-full bg-black flex items-center justify-center px-16 md:px-24 shrink-0"
              style={{ width: '100vw' }}
            >
              {/* Subtle divider line between slides */}
              {i > 0 && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-1/3 bg-paper/10" />
              )}

              <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                {/* Left — text */}
                <div>
                  <div className="font-mono text-signal font-bold mb-3 text-xs tracking-[0.2em] uppercase">
                    Project {project.number}
                  </div>
                  <div className="font-mono text-paper/35 text-[11px] mb-5 leading-relaxed">
                    {project.subtitle}
                  </div>
                  <h3 className="font-serif italic text-5xl md:text-6xl lg:text-7xl text-paper mb-7 leading-tight">
                    {project.title}
                  </h3>
                  <p className="font-mono text-paper/55 text-sm leading-relaxed mb-8 max-w-md">
                    {project.description}
                  </p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-3 py-1 rounded-full border border-paper/15 text-paper/45"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right — interactive visual */}
                <div className="hidden md:flex justify-center items-center">
                  <Visual />
                </div>
              </div>

              {/* Slide number watermark */}
              <div
                className="absolute bottom-10 right-10 md:right-16 font-mono text-paper/5 font-bold select-none pointer-events-none"
                style={{ fontSize: '8rem', lineHeight: 1 }}
              >
                {project.number}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll progress bar — animated by GSAP above */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-paper/10 z-20">
        <div
          id="projects-progress"
          className="h-full bg-signal origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </section>
  );
}
