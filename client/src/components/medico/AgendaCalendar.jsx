import {
  Calendar,
  dayjsLocalizer
} from 'react-big-calendar'

import dayjs from 'dayjs'

import localizedFormat
from 'dayjs/plugin/localizedFormat'

import localeData
from 'dayjs/plugin/localeData'

import 'dayjs/locale/es'

import
'react-big-calendar/lib/css/react-big-calendar.css'

dayjs.extend(localizedFormat)
dayjs.extend(localeData)
dayjs.locale('es')

const localizer =
  dayjsLocalizer(dayjs)

const mockTurnos = [
  {
    id: 1,
    title: 'María Gómez',
    start: new Date(
      2026,
      5,
      14,
      9,
      0
    ),
    end: new Date(
      2026,
      5,
      14,
      9,
      30
    )
  }
]

export default function AgendaCalendar() {

  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        culture="es"
        events={mockTurnos}
        startAccessor="start"
        endAccessor="end"
        defaultView="day"
      />
    </div>
  )
}