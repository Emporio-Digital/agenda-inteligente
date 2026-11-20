'use client'

import { useState } from 'react'
import Link from 'next/link'
import AppointmentRow from './appointment-row'

interface AgendaBoardProps {
  appointments: any[]
  professionals: any[]
  filterProId?: string
  currentProName?: string
  showPast: boolean
  tenantName: string
  refreshSlot?: React.ReactNode
}

export default function AgendaBoard({
  appointments,
  professionals,
  filterProId,
  currentProName,
  showPast,
  tenantName,
  refreshSlot,
}: AgendaBoardProps) {
  const [selectedDate, setSelectedDate] = useState('')

  const todayBr = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())

  const filteredAppointments = (!showPast && selectedDate)
    ? appointments.filter((appt) => {
        const apptDateBr = new Intl.DateTimeFormat('en-CA', {
          timeZone: 'America/Sao_Paulo',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(new Date(appt.date))
        return apptDateBr === selectedDate
      })
    : appointments

  const formattedDate = selectedDate
    ? `${selectedDate.slice(8, 10)}/${selectedDate.slice(5, 7)}`
    : ''

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-12">
      <div className="w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              {/* CARD SUA AGENDA / FILTRO DE DATA NATIVO */}
              <div className="relative">
                <div
                  className={`bg-white/90 border border-slate-200/90 border-l-4 ${
                    showPast ? 'border-l-amber-500' : 'border-l-blue-600'
                  } pl-3.5 pr-3 py-2 rounded-xl flex items-center justify-between gap-2.5 shadow-sm transition-all ${
                    !showPast ? 'hover:border-blue-400 cursor-pointer' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base select-none leading-none">
                      {showPast ? '⚠️' : '📅'}
                    </span>
                    <div className="grid items-center">
                      {!showPast && (
                        <span
                          aria-hidden="true"
                          className="col-start-1 row-start-1 invisible pointer-events-none select-none text-base md:text-lg font-black uppercase italic tracking-tight whitespace-nowrap"
                        >
                          Sua Agenda
                        </span>
                      )}
                      <h2
                        className={`col-start-1 row-start-1 text-base md:text-lg font-black uppercase italic tracking-tight whitespace-nowrap ${
                          showPast
                            ? 'text-amber-600'
                            : selectedDate
                            ? 'text-blue-600'
                            : 'text-slate-700'
                        }`}
                      >
                        {showPast ? 'Pendentes' : selectedDate ? formattedDate : 'Sua Agenda'}
                      </h2>
                    </div>
                  </div>

                  {!showPast && (
                    selectedDate ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedDate('')
                        }}
                        aria-label="Limpar filtro de data"
                        title="Limpar data"
                        className="relative z-20 w-5 h-5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-black transition-colors shrink-0 cursor-pointer"
                      >
                        ✕
                      </button>
                    ) : (
                      <span className="w-5 h-5 flex items-center justify-center text-[10px] text-slate-400 font-bold leading-none shrink-0">
                        ▾
                      </span>
                    )
                  )}
                </div>

                {!showPast && (
                  <input
                    type="date"
                    value={selectedDate}
                    min={todayBr}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    onClick={(e) => {
                      try {
                        ;(e.currentTarget as any).showPicker?.()
                      } catch {}
                    }}
                    aria-label="Filtrar agenda por data"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-base z-10"
                  />
                )}
              </div>

              <div className="hidden md:flex">{refreshSlot}</div>
            </div>

            {showPast && (
              <Link
                href="/admin"
                className="text-[10px] text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 px-3.5 py-1.5 rounded-xl uppercase tracking-widest mt-2 flex items-center gap-2 transition-all w-max shadow-sm font-bold"
              >
                ← Voltar para Agenda
              </Link>
            )}

          </div>

          <div>
            {professionals.length > 0 && (
              <details className="relative group" key={filterProId || 'default'}>
                <summary className="list-none bg-white text-slate-900 border border-slate-200 px-5 py-2.5 rounded-2xl flex items-center gap-3 cursor-pointer hover:border-blue-500/50 shadow-sm transition-all select-none">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Filtrar:
                  </span>
                  <span className="font-bold text-sm text-blue-600">{currentProName}</span>
                  <span className="text-xs text-blue-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>

                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col z-50 animate-in fade-in slide-in-from-top-2">
                  <Link
                    href="/admin"
                    className={`px-5 py-4 text-sm font-bold border-b border-slate-100 hover:bg-slate-50 transition-colors flex items-center justify-between ${
                      !filterProId || filterProId === 'all' ? 'text-blue-600' : 'text-slate-600'
                    }`}
                  >
                    Todos
                    {(!filterProId || filterProId === 'all') && <span>✓</span>}
                  </Link>
                  {professionals.map((pro) => (
                    <Link
                      key={pro.id}
                      href={`/admin?proId=${pro.id}`}
                      className={`px-5 py-4 text-sm font-bold border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors flex items-center justify-between ${
                        filterProId === pro.id ? 'text-blue-600' : 'text-slate-600'
                      }`}
                    >
                      {pro.name}
                      {filterProId === pro.id && <span>✓</span>}
                    </Link>
                  ))}
                </div>
              </details>
            )}
          </div>
        </div>

        {/* GRID DE CARDS */}
        <div className="pb-20">
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] p-12 text-center border border-slate-200 shadow-sm">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                Sem agendamentos para este filtro
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAppointments.map((appt) => (
                <AppointmentRow key={appt.id} appt={appt} tenantName={tenantName} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}