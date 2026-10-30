import { FormEvent, ReactNode, useMemo, useState } from 'react'

type Page = 'today' | 'progress' | 'calendar'

type Habit = {
  id: number
  name: string
  category: string
  code: string
  color: string
  completed: boolean
  history: boolean[]
}

const initialHabits: Habit[] = [
  {
    id: 1,
    name: 'Minum 8 gelas air',
    category: 'Kesehatan',
    code: 'H2O',
    color: 'blue',
    completed: true,
    history: [true, true, true, true, true, false, false],
  },
  {
    id: 2,
    name: 'Membaca 20 menit',
    category: 'Pengembangan diri',
    code: 'Aa',
    color: 'yellow',
    completed: true,
    history: [true, true, false, true, true, false, false],
  },
  {
    id: 3,
    name: 'Olahraga pagi',
    category: 'Kebugaran',
    code: 'RUN',
    color: 'red',
    completed: false,
    history: [true, false, true, true, false, false, false],
  },
  {
    id: 4,
    name: 'Meditasi 10 menit',
    category: 'Ketenangan',
    code: 'ZEN',
    color: 'green',
    completed: true,
    history: [true, true, true, true, true, false, false],
  },
]

const weekDays = ['S', 'S', 'R', 'K', 'J', 'S', 'M']
const weekDayNames = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9M9 20v-7h6v7" />
      </>
    ),
    progress: (
      <>
        <path d="M4 20V10M10 20V4M16 20v-7M2 20h20" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    code: <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />,
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21H9.6v-.09A1.7 1.7 0 0 0 8.5 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3V9.6h.09A1.7 1.7 0 0 0 4.6 8.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.5 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.16.38.37.72.6 1 .3.36.7.58 1.1.6h.1v4h-.1a1.7 1.7 0 0 0-1.7.4Z" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
  }

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      {paths[name]}
    </svg>
  )
}

function Sidebar({ page, onChange }: { page: Page; onChange: (page: Page) => void }) {
  const links: { id: Page; label: string; icon: string }[] = [
    { id: 'today', label: 'Hari ini', icon: 'home' },
    { id: 'progress', label: 'Progres', icon: 'progress' },
    { id: 'calendar', label: 'Kalender', icon: 'calendar' },
  ]

  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => onChange('today')} aria-label="Ke halaman hari ini">
        <span className="brand-mark">H</span>
        <span>habit.</span>
      </button>

      <nav className="main-nav" aria-label="Navigasi utama">
        {links.map((link) => (
          <button
            className={`nav-item ${page === link.id ? 'active' : ''}`}
            key={link.id}
            onClick={() => onChange(link.id)}
          >
            <Icon name={link.icon} />
            <span>{link.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="utility-nav">
          <button className="nav-item">
            <Icon name="code" />
            <span>Kode C</span>
          </button>
          <button className="nav-item">
            <Icon name="settings" />
            <span>Pengaturan</span>
          </button>
        </div>
        <div className="profile">
          <span className="avatar">AR</span>
          <span className="profile-copy">
            <strong>Andi Ramadhan</strong>
            <small>Pemula konsisten</small>
          </span>
          <span className="dots">•••</span>
        </div>
      </div>
    </aside>
  )
}

function PageHeader({
  title,
  subtitle,
  onAdd,
}: {
  title: string
  subtitle: string
  onAdd?: () => void
}) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">JUMAT, 30 OKTOBER 2026</p>
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </div>
      {onAdd && (
        <button className="primary-button" onClick={onAdd}>
          <Icon name="plus" size={17} />
          Tambah kebiasaan
        </button>
      )}
    </header>
  )
}

function HabitBadge({ habit }: { habit: Habit }) {
  return <span className={`habit-badge ${habit.color}`}>{habit.code}</span>
}

function CheckButton({
  checked,
  onClick,
  label,
}: {
  checked: boolean
  onClick?: () => void
  label: string
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={checked}
      className={`check-button ${checked ? 'checked' : ''}`}
      onClick={onClick}
    >
      {checked && '✓'}
    </button>
  )
}

function TodayPage({
  habits,
  toggleHabit,
  onAdd,
}: {
  habits: Habit[]
  toggleHabit: (id: number) => void
  onAdd: () => void
}) {
  const completed = habits.filter((habit) => habit.completed).length
  const percentage = habits.length ? Math.round((completed / habits.length) * 100) : 0
  const remaining = habits.length - completed

  return (
    <>
      <PageHeader
        title="Selamat pagi, Andi."
        subtitle="Selesaikan satu per satu. Hari ini adalah kesempatan baru."
        onAdd={onAdd}
      />

      <section className="focus-card">
        <div className="focus-copy">
          <p className="eyebrow light">FOKUS HARI INI</p>
          <h2>
            {remaining > 0
              ? `${remaining} kebiasaan lagi untuk hari yang hebat.`
              : 'Semua kebiasaan hari ini selesai.'}
          </h2>
          <p>
            {completed} dari {habits.length} kebiasaan sudah kamu selesaikan.
          </p>
        </div>
        <div
          className="progress-ring hero-ring"
          style={{ '--progress': `${percentage * 3.6}deg` } as React.CSSProperties}
        >
          <div>
            <strong>{percentage}%</strong>
            <small>hari ini</small>
          </div>
        </div>
      </section>

      <div className="today-grid">
        <section className="card habit-list-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">JUMAT, 30 OKTOBER</p>
              <h3>Daftar kebiasaanmu</h3>
            </div>
            <small>
              {completed}/{habits.length} selesai
            </small>
          </div>
          <div className="habit-list">
            {habits.map((habit, index) => (
              <div className="habit-row" key={habit.id}>
                <HabitBadge habit={habit} />
                <div className="habit-copy">
                  <strong className={habit.completed ? 'done' : ''}>{habit.name}</strong>
                  <small>
                    {habit.category} · Setiap hari
                  </small>
                </div>
                <div className="habit-streak">
                  <strong>{habit.history.filter(Boolean).length}</strong>
                  <small>hari pekan ini</small>
                </div>
                <CheckButton
                  checked={habit.completed}
                  label={`${habit.completed ? 'Batalkan' : 'Tandai'} ${habit.name}`}
                  onClick={() => toggleHabit(habit.id)}
                />
              </div>
            ))}
            {!habits.length && (
              <div className="empty-state">Belum ada kebiasaan. Tambahkan kebiasaan pertamamu.</div>
            )}
          </div>
        </section>

        <aside className="today-aside">
          <section className="card consistency-card">
            <p className="eyebrow">KONSISTENSI</p>
            <strong className="big-number">61%</strong>
            <small>progres minggu ini</small>
            <div className="mini-week">
              {weekDays.map((day, index) => (
                <div key={`${day}-${index}`}>
                  <span>{day}</span>
                  <i className={index < 4 ? 'filled' : index === 4 ? 'today' : ''}>
                    {index === 0 || index === 3 ? '✓' : ''}
                  </i>
                </div>
              ))}
            </div>
          </section>
          <section className="quote-card">
            <span className="quote-mark">“</span>
            <blockquote>Kita adalah apa yang kita lakukan berulang kali.</blockquote>
            <p className="eyebrow">CATATAN HARI INI</p>
          </section>
        </aside>
      </div>
    </>
  )
}

function ProgressPage({
  habits,
  onAdd,
  toggleHistory,
}: {
  habits: Habit[]
  onAdd: () => void
  toggleHistory: (id: number, index: number) => void
}) {
  const completed = habits.filter((habit) => habit.completed).length

  return (
    <>
      <PageHeader
        title="Lihat perkembanganmu."
        subtitle="Langkah kecil hari ini, perubahan besar nanti."
        onAdd={onAdd}
      />
      <div className="progress-overview">
        <section className="card weekly-card">
          <div className="weekly-title">
            <div>
              <p className="eyebrow">PROGRES MINGGUAN</p>
              <h3>Kamu di jalur yang tepat.</h3>
            </div>
            <span className="trend">↗ &nbsp; 12% dari minggu lalu</span>
          </div>
          <div className="chart-layout">
            <div
              className="progress-ring large-ring"
              style={{ '--progress': '219.6deg' } as React.CSSProperties}
            >
              <div>
                <strong>61%</strong>
                <small>tercapai</small>
              </div>
            </div>
            <div className="week-bars">
              {[4, 3, 3, 4, 3, 0, 0].map((value, index) => (
                <div className="bar-column" key={weekDayNames[index]}>
                  <small>
                    {value}/{Math.max(habits.length, 4)}
                  </small>
                  <span className="bar-track">
                    <i
                      className={index === 4 ? 'orange' : ''}
                      style={{ height: `${Math.max(value * 22, 15)}%` }}
                    />
                  </span>
                  <em className={index === 4 ? 'orange-text' : ''}>{weekDayNames[index]}</em>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="record-card">
          <p className="eyebrow light">REKOR TERBAIK</p>
          <div className="record-number">
            12 <span>hari</span>
          </div>
          <p>Terus pertahankan ritmemu!</p>
          <div className="record-days">
            {[true, true, true, true, true, false, false].map((done, index) => (
              <i className={done ? 'done' : ''} key={index}>
                {done ? '✓' : ''}
              </i>
            ))}
          </div>
          <div className="record-labels">
            <span>Sen</span>
            <span>Hari ini</span>
            <span>Min</span>
          </div>
        </section>
      </div>

      <section className="progress-list-section">
        <div className="progress-list-title">
          <div>
            <p className="eyebrow">KEBIASAAN HARI INI</p>
            <h3>
              {completed} dari {habits.length} selesai
            </h3>
          </div>
          <strong>{habits.length ? Math.round((completed / habits.length) * 100) : 0}%</strong>
        </div>
        <div className="progress-habit-list">
          {habits.map((habit) => (
            <div className="progress-habit-row" key={habit.id}>
              <HabitBadge habit={habit} />
              <div className="habit-copy">
                <strong>{habit.name}</strong>
                <small>{habit.category}</small>
              </div>
              <div className="history-boxes">
                {habit.history.map((done, index) => (
                  <div className="history-day" key={index}>
                    <span>{weekDays[index]}</span>
                    <CheckButton
                      checked={done}
                      label={`${weekDayNames[index]} untuk ${habit.name}`}
                      onClick={() => toggleHistory(habit.id, index)}
                    />
                  </div>
                ))}
              </div>
              <span className="dots">•••</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

const calendarCells = Array.from({ length: 35 }, (_, index) => {
  if (index < 3) return null
  const day = index - 2
  return day <= 31 ? day : null
})

function CalendarPage({
  habits,
  toggleHabit,
}: {
  habits: Habit[]
  toggleHabit: (id: number) => void
}) {
  const [selectedDay, setSelectedDay] = useState(30)
  const completed = habits.filter((habit) => habit.completed).length

  return (
    <>
      <PageHeader
        title="Kalender kebiasaan."
        subtitle="Riwayat konsistensimu tersusun berdasarkan tanggal."
      />
      <section className="calendar-intro">
        <div>
          <p className="eyebrow">KALENDER AKTIVITAS</p>
          <h2>Pantau konsistensimu setiap hari.</h2>
        </div>
        <div className="month-switcher">
          <button aria-label="Bulan sebelumnya">←</button>
          <strong>Oktober 2026</strong>
          <button aria-label="Bulan berikutnya">→</button>
        </div>
      </section>
      <div className="calendar-layout">
        <section className="card calendar-card">
          <div className="calendar-weekdays">
            {weekDayNames.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="calendar-grid">
            {calendarCells.map((day, index) => (
              <button
                className={`${day === selectedDay ? 'selected' : ''} ${day === 30 ? 'has-progress' : ''}`}
                disabled={!day}
                key={index}
                onClick={() => day && setSelectedDay(day)}
              >
                {day && <span>{day}</span>}
                {day === 30 && <i>3/4</i>}
              </button>
            ))}
          </div>
        </section>
        <aside className="card date-summary">
          <p className="eyebrow">RINGKASAN TANGGAL</p>
          <h2>{selectedDay} Oktober</h2>
          <p>
            {completed} dari {habits.length} kebiasaan selesai
          </p>
          <div className="summary-progress">
            <i style={{ width: `${habits.length ? (completed / habits.length) * 100 : 0}%` }} />
          </div>
          <div className="summary-list">
            {habits.map((habit) => (
              <div className="summary-row" key={habit.id}>
                <HabitBadge habit={habit} />
                <span>{habit.name}</span>
                <CheckButton
                  checked={habit.completed}
                  label={`Status ${habit.name}`}
                  onClick={() => toggleHabit(habit.id)}
                />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  )
}

function AddHabitModal({
  onClose,
  onAdd,
}: {
  onClose: () => void
  onAdd: (habit: Omit<Habit, 'id' | 'completed' | 'history'>) => void
}) {
  const [name, setName] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    const cleanName = name.trim()
    if (!cleanName) return
    const colors = ['blue', 'yellow', 'red', 'green']
    onAdd({
      name: cleanName,
      category: 'Kesehatan',
      code: cleanName
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 3)
        .toUpperCase(),
      color: colors[Math.floor(Math.random() * colors.length)],
    })
    onClose()
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        aria-labelledby="add-habit-title"
        aria-modal="true"
        className="modal"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <p className="eyebrow">KEBIASAAN BARU</p>
          <h2 id="add-habit-title">Apa yang ingin kamu mulai?</h2>
          <p>Tulis satu kebiasaan yang sederhana dan mudah dilakukan setiap hari.</p>
        </div>
        <form onSubmit={submit}>
          <input
            aria-label="Nama kebiasaan"
            autoFocus
            onChange={(event) => setName(event.target.value)}
            placeholder="Contoh: Jalan kaki 15 menit"
            value={name}
          />
          <div className="modal-actions">
            <button className="cancel-button" onClick={onClose} type="button">
              Batal
            </button>
            <button className="primary-button modal-submit" type="submit">
              Simpan kebiasaan
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>('today')
  const [habits, setHabits] = useState<Habit[]>(initialHabits)
  const [showAdd, setShowAdd] = useState(false)

  const pageTitle = useMemo(
    () => ({ today: 'Hari ini', progress: 'Progres', calendar: 'Kalender' })[page],
    [page],
  )

  function toggleHabit(id: number) {
    setHabits((current) =>
      current.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed: !habit.completed,
              history: habit.history.map((done, index) =>
                index === 4 ? !habit.completed : done,
              ),
            }
          : habit,
      ),
    )
  }

  function toggleHistory(id: number, index: number) {
    setHabits((current) =>
      current.map((habit) => {
        if (habit.id !== id) return habit
        const history = [...habit.history]
        history[index] = !history[index]
        return { ...habit, history, completed: index === 4 ? history[index] : habit.completed }
      }),
    )
  }

  function addHabit(habit: Omit<Habit, 'id' | 'completed' | 'history'>) {
    setHabits((current) => [
      ...current,
      {
        ...habit,
        id: Date.now(),
        completed: false,
        history: [false, false, false, false, false, false, false],
      },
    ])
  }

  return (
    <div className="app-shell">
      <Sidebar page={page} onChange={setPage} />
      <main className="main-content" aria-label={pageTitle}>
        {page === 'today' && (
          <TodayPage habits={habits} onAdd={() => setShowAdd(true)} toggleHabit={toggleHabit} />
        )}
        {page === 'progress' && (
          <ProgressPage
            habits={habits}
            onAdd={() => setShowAdd(true)}
            toggleHistory={toggleHistory}
          />
        )}
        {page === 'calendar' && <CalendarPage habits={habits} toggleHabit={toggleHabit} />}
      </main>
      {showAdd && <AddHabitModal onAdd={addHabit} onClose={() => setShowAdd(false)} />}
    </div>
  )
}
